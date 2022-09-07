package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetListRes;
import com.joyride.ms.util.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Slf4j
@Service
public class MeetProvider {

    private final MeetDao meetDao;

    public MeetProvider(MeetDao meetDao) {
        this.meetDao = meetDao;
    }

    public List<MeetListRes> retrieveMeet() throws BaseException {
        try {
            return meetDao.selectMeet();
        } catch (Exception e) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public MeetDetailRes retrieveMeetById(Integer meetId) throws BaseException {
        try {
            return meetDao.selectMeetById(meetId);
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
}
