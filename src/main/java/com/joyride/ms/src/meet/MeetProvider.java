package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetFilterReq;
import com.joyride.ms.src.meet.dto.MeetListRes;
import com.joyride.ms.util.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Slf4j
@Service
public class MeetProvider {

    private final MeetDao meetDao;

    public MeetProvider(MeetDao meetDao) {
        this.meetDao = meetDao;
    }

    public MeetDetailRes retrieveMeetById(Integer meetId) throws BaseException {
        try {
            return meetDao.selectMeetById(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<MeetListRes> retrieveMeetByFilter(MeetFilterReq meetFilterReq) throws BaseException {
        try {
            return meetDao.selectMeetByFilter(meetFilterReq);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int checkMeetJoinById(Integer userId ,Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetJoinById(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int checkMeetById(Integer userId ,Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetById(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int checkMeetStatus(Integer meetId) throws BaseException {
        try {
             return meetDao.checkMeetStatus(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int checkMeetFull(Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetFull(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int checkFilterNull(Integer age,String bicycleTypes,String gender,Integer participationFee,String location,Integer maxNumOfParticipants,Integer minNumOfParticipants,Integer pathDifficulty,Integer ridingSkill) {
        if (age == null && bicycleTypes == null && gender == null && participationFee == null && location == null && maxNumOfParticipants == null &&
        minNumOfParticipants == null && pathDifficulty == null && ridingSkill == null) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
