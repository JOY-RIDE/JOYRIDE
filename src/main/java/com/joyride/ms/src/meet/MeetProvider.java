package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetDetailRes;
import com.joyride.ms.src.meet.dto.MeetFilterReq;
import com.joyride.ms.src.meet.dto.MeetListRes;
import com.joyride.ms.src.user.UserDao;
import com.joyride.ms.util.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.joyride.ms.util.BaseResponseStatus.*;

@Slf4j
@Service
public class MeetProvider {

    private final MeetDao meetDao;
    private final UserDao userDao;

    public MeetProvider(MeetDao meetDao, UserDao userDao) {
        this.meetDao = meetDao;
        this.userDao = userDao;
    }
    @Transactional(readOnly = true)
    public MeetDetailRes retrieveMeetById(Integer meetId) throws BaseException {
        try {
            return meetDao.selectMeetById(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public List<MeetListRes> retrieveMeetByFilter(MeetFilterReq meetFilterReq) throws BaseException {
        try {
            return meetDao.selectMeetByFilter(meetFilterReq);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public List<MeetListRes> retrieveMeetByHost(Integer userId) throws BaseException {
        try {
            return meetDao.selectMeetByHost(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public List<MeetListRes> retrieveMeetByJoin(Integer userId) throws BaseException {
        try {
            return meetDao.selectMeetByJoin(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public List<MeetListRes> retrieveMeetByBookMark(Integer userId) throws BaseException {
        try {
            return meetDao.selectMeetByBookMark(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetJoinById(Integer userId ,Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetJoinById(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetById(Integer userId ,Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetById(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetStatus(Integer meetId) throws BaseException {
        try {
             return meetDao.checkMeetStatus(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetFull(Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetFull(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetGender(Integer userId, Integer meetId) throws BaseException {
        try {
            String gender = userDao.selectById(userId).getGender();
            if (gender.isEmpty() != true)
                return meetDao.checkMeetGender(gender,meetId);
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetBirth(Integer userId, Integer meetId) throws BaseException {
        try {
            Integer birthYear = userDao.selectById(userId).getBirthYear();
            if(birthYear != null)
                return meetDao.checkMeetBirth(birthYear,meetId);
            return 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
    @Transactional(readOnly = true)
    public int checkMeetBookMark(Integer userId, Integer meetId) throws BaseException {
        try {
            return meetDao.checkMeetBookMark(userId,meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

}
