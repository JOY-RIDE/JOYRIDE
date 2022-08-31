package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetCreateReq;
import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetListRes;
import com.joyride.ms.util.BaseException;
import com.joyride.ms.util.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/meets")
public class MeetController {
    private final MeetProvider meetProvider;
    private final MeetService meetService;

    public MeetController(MeetProvider meetProvider, MeetService meetService) {
        this.meetProvider = meetProvider;
        this.meetService = meetService;
    }


    /**
     * 4.1 모임 생성 API
     * [POST] /meets
     *
     * @param request
     * @return
     */
    @PostMapping("")
    public BaseResponse<Integer> postMeet(HttpServletRequest request, @RequestBody MeetCreateReq meetCreateReq) {
        try {
            Integer userId = Integer.parseInt(request.getAttribute("user_id").toString());
            Integer meetId = meetService.createMeet(userId, meetCreateReq);
            return new BaseResponse<>(meetId);
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 4.2 모임 리스트 조회 API
     * [GET] /meets
     *
     * @param request
     * @return
     */
    @GetMapping("")
    public BaseResponse<List<MeetListRes>> getMeet(HttpServletRequest request) {
        try{
            return new BaseResponse<>(meetProvider.retrieveMeet());
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

    /**
     * 4.3 모임 세부 조회 API
     * [GET] /meets/:meetId
     *
     * @param request
     * @return
     */
    @GetMapping("{meetId}")
    public BaseResponse<MeetDetailRes> getMeetDetail(HttpServletRequest request, @PathVariable("meetId") Integer meetId) {
        try{
            return new BaseResponse<>(meetProvider.retrieveMeetById(meetId));
        } catch (BaseException e) {
            return new BaseResponse<>(e.getStatus());
        }
    }

}
