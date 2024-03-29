package com.joyride.ms.src.meet;

import com.joyride.ms.src.meet.dto.MeetCommentCreateReq;
import com.joyride.ms.src.meet.dto.MeetCreateReq;
import com.joyride.ms.util.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.joyride.ms.util.BaseResponseStatus.DATABASE_ERROR;

@Slf4j
@Service
public class MeetService {

    private final MeetDao meetDao;

    public MeetService(MeetDao meetDao) {
        this.meetDao = meetDao;
    }

    @Transactional
    public Integer createMeet(Integer userId, MeetCreateReq meetCreateReq, String meeting_img_url) throws BaseException {
        try {
            Integer meetId = meetDao.insertMeet(userId,meetCreateReq, meeting_img_url);
            return meetId;
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void createMeetJoin(Integer userId,Integer meetId) throws BaseException {
        try {
            meetDao.insertMeetJoin(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void createMeetBookMark(Integer userId,Integer meetId) throws BaseException {
        try {
            meetDao.insertMeetBookMark(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public int createMeetComment(Integer userId, MeetCommentCreateReq meetCommentCreateReq) throws BaseException {
        try {
            return meetDao.insertMeetComment(userId, meetCommentCreateReq);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void removeMeetJoinById(Integer userId,Integer meetId) throws BaseException {
        try {
            meetDao.deleteMeetJoin(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void removeMeetById(Integer meetId) throws BaseException {
        try {
            meetDao.deleteMeet(meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void removeMeetBookMark(Integer userId,Integer meetId) throws BaseException {
        try {
            meetDao.deleteMeetBookMark(userId, meetId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }

    @Transactional
    public void removeMeetComment(Integer userId, Integer commentId) throws BaseException {
        try {
            meetDao.deleteMeetComment(userId, commentId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
