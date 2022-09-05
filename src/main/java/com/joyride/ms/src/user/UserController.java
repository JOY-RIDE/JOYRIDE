package com.joyride.ms.src.user;

import com.joyride.ms.src.s3.AwsS3Service;
import com.joyride.ms.src.s3.dto.PostProfileImgRes;
import com.joyride.ms.src.user.dto.GetUserRes;
import com.joyride.ms.src.user.dto.PatchUserReq;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import com.joyride.ms.util.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.joyride.ms.util.BaseResponseStatus.SUCCESS;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserProvider userProvider;
    private final UserService userService;
    private final AwsS3Service awsS3Service;


    @Autowired
    public UserController(UserProvider userProvider, UserService userService, AwsS3Service awsS3Service) {
        this.userProvider = userProvider;
        this.userService = userService;
        this.awsS3Service = awsS3Service;
    }

    /**
     * 2.1 프로필 조회 api :todoId
     * [GET] /users/:userId
     *
     * @param request
     * @return profileImgUrl, nickname, gender, manner, birthYear, introduce, bicycleType, bicycleCareer
     * @throws BaseException
     */
    @GetMapping("{userId}")
    public BaseResponse<GetUserRes> getProfile(HttpServletRequest request, @PathVariable("userId") Integer userId) {
        try {
            User user = userProvider.retrieveById(userId);
            GetUserRes getUserRes = new GetUserRes(user.getProfile_img_url(), user.getNickname(),user.getGender(),user.getManner(),user.getBirthYear(), user.getIntroduce(), user.getBicycleType(), user.getBicycleCareer());
            return new BaseResponse<>(getUserRes);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 2.2 유저 삭제 API
     * [PATCH] /users/status
     *
     * @param request
     * @return
     */
    @PatchMapping("/status")
    public BaseResponse<BaseResponseStatus> patchUserStatus(HttpServletRequest request) {
        try {
            Integer user_id = Integer.parseInt(request.getAttribute("user_id").toString());
            userService.removeUser(user_id);
            return new BaseResponse<>(SUCCESS);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 2.3 로그아웃 API
     * [POST] /users/signout
     *
     * @param request
     * @return
     */
    @PostMapping("/signout")
    public BaseResponse<BaseResponseStatus> signout(HttpServletRequest request, HttpServletResponse response) {
        try {
            Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());
            /* remove refreshToken */
            userService.removeRefreshToken(userId);
            Cookie cookie = new Cookie("refreshToken",null);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            return new BaseResponse<>(SUCCESS);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 2.4 프로필 수정 API
     *
     * @param request
     * @return
     */

    @PatchMapping("/profile")
    public BaseResponse<BaseResponseStatus> patchProfile(@Validated HttpServletRequest request, @RequestBody PatchUserReq patchUserReq , BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
            return new BaseResponse<>(errors);
        }
        try {
            Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());
            userService.modifyProfile(userId, patchUserReq);
            return new BaseResponse<>(SUCCESS);
        } catch (BaseException e) {
            return new BaseResponse(e.getStatus());
        }
    }

    /**
     * 2.5 프로필 사진 수정 API
     *
     * @param request
     * @return
     */
    @PatchMapping("/profile-img")
    public BaseResponse<PostProfileImgRes> uploadProfileImg(@RequestParam("profile-img") MultipartFile multipartFile, HttpServletRequest request) {

        try {
            Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());

            String profile_img_fileKey = userProvider.retrieveById(userId).getProfile_img_url();
            if (!profile_img_fileKey.equals("https://bucket-joyride.s3.ap-northeast-2.amazonaws.com/profile/default-img.png"))
                awsS3Service.fileDelete(profile_img_fileKey.substring(55));

            String dirName = "profile/info/" + userId + "/profile-img";
            String profile_img_url = awsS3Service.upload(multipartFile, dirName);
            return new BaseResponse<>(userService.setProfileImg(userId, profile_img_url));
        } catch (BaseException e) {
            return new BaseResponse(e.getStatus());
        }
    }

    /**
     * 2.6 프로필 사진 삭제 API
     *
     * @param request
     * @return
     */

    @PatchMapping("/profile-img/default")
    public BaseResponse<String> deleteProfileImg(HttpServletRequest request) throws BaseException {
        Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());

        try {
            String filekey = userProvider.retrieveById(userId).getProfile_img_url();
            if (filekey.equals("https://bucket-joyride.s3.ap-northeast-2.amazonaws.com/profile/default-img.png"))
                return new BaseResponse<>("삭제에 성공하였습니다.");

            filekey = userProvider.retrieveById(userId).getProfile_img_url().substring(55);
            awsS3Service.fileDelete(filekey);
            userService.modifyProfileImgToDefault(userId);
            return new BaseResponse<>("삭제에 성공하였습니다.");
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
    * 보관기간 1달 지난 유저 삭제
    *
    *
    *
    */
    @Scheduled(cron = "0 0 0 1/1 * ?")
    public void UserRemove() throws BaseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String targetDate = dateFormat.format(new Date());

        try {
            userService.removeUserExpired(targetDate);
            log.info("보관기간이 만료된 비활성화 계정들을 삭제하는데 성공했습니다.");
        } catch (BaseException e) {
            log.error(e.getMessage(), "유저 삭제 실패 | UserController/UserRemove()");
        }
    }

}

