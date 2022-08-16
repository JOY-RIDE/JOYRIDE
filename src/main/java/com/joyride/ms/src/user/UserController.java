package com.joyride.ms.src.user;

import com.joyride.ms.src.user.dto.GetUserRes;
import com.joyride.ms.src.user.model.User;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import com.joyride.ms.util.BaseResponseStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserProvider userProvider;
    private final UserService userService;

    @Autowired
    public UserController(UserProvider userProvider, UserService userService) {
        this.userProvider = userProvider;
        this.userService = userService;
    }

    /**
     * 2.1 프로필 조회 api :todoId
     * [GET] /users/:userId
     *
     * @param request
     * @return profileImgUrl, nickname, gender, manner, old, introduce, bicycleType, bicycleCareer
     * @throws BaseException
     */
    @GetMapping("{userId}")
    public BaseResponse<GetUserRes> getProfile(HttpServletRequest request, @PathVariable("userId") Integer userId) {
        try {
            User user = userProvider.retrieveById(userId);
            GetUserRes getUserRes = new GetUserRes(user.getProfile_img_url(), user.getNickname(),user.getGender(),user.getManner(),user.getOld(), user.getIntroduce(), user.getBicycleType(), user.getBicycleCareer());
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
            return new BaseResponse<>(BaseResponseStatus.SUCCESS);
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
    public BaseResponse<BaseResponseStatus> signout(HttpServletRequest request) {
        try {
            Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());
            /* remove refreshToken */
            userService.removeRefreshToken(userId);
            return new BaseResponse<>(BaseResponseStatus.SUCCESS);
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

