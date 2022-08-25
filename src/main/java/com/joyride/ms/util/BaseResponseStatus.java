package com.joyride.ms.util;

import lombok.Getter;

/**
 * 에러 코드 관리
 */
@Getter
public enum BaseResponseStatus {
    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),


    /**
     * 2000 : Request 오류
     */
    // Common
    REQUEST_ERROR(false, 2000, "입력값을 확인해주세요."),
    EMPTY_JWT(false, 2001, "JWT를 입력해주세요."),
    INVALID_JWT(false, 2002, "유효하지 않은 JWT입니다."),
    EXPIRED_JWT(false, 2003, "만료된 JWT입니다."),
    INVALID_USER_JWT(false,2004,"권한이 없는 유저의 접근입니다."),
    INVALID_AUTH(false, 2005, "유효하지 않은 회원 정보입니다."),
    DIFFERENT_REFRESH_TOKEN(false, 2006, "유저 정보와 일치하지 않는 refresh token입니다."),

    // users
    USERS_EMPTY_USER_ID(false, 2010, "유저 아이디 값을 확인해주세요."),
    USERS_EMPTY_USER_EMAIL(false, 2011, "유저 이메일 값을 확인해주세요."),
    USERS_DELETED_USER(false,2012,"삭제된 유저입니다."),
    USERS_DISACCORD_PASSWORD(false, 2112, "비밀번호가 일치하지 않습니다"),

    // category 도메인 에러
    DUPLICATE_CATEGORY(false, 2104, "같은이름의 카테고리가 이미 존재합니다."),

    INVALID_PROVIDER(false, 2013, "올바르지 않은 provider입니다. (예: google)"),

    // 300대 -> 3. todo 도메인 에러
    USERS_CATEGORY_NOT_EXISTS(false, 2301, "해당하는 유저와 일치하는 카테고리가 없습니다."),
    USERS_TODO_NOT_EXISTS(false, 2302, "해당하는 유저와 일치하는 투두가 없습니다."),

    // [POST] /users
    POST_USERS_EMPTY_EMAIL(false, 2015, "이메일을 입력해주세요."),
    POST_USERS_INVALID_EMAIL(false, 2016, "이메일 형식을 확인해주세요."),
    POST_USERS_EXISTS_EMAIL(false,2017,"중복된 이메일입니다."),

    POST_POSTS_INVALID_CONTENTS(false, 2018, "제한 글자 수를 초과하였습니다."),
    POST_POSTS_EMPTY_IMGURL(false, 2019, "게시물의 이미지를 입력해주세요."),
    POSTS_EMPTY_POST_ID(false, 2020, "게시물 아이디 값을 확인해주세요."),

    POST_USERS_EMPTY_PASSWORD(false, 2030, "비밀번호를 입력해주세요."),
    POST_USERS_INVALID_PASSWORD(false, 2031, "비밀번호 형식을 확인해주세요."),


    //400
    USERS_DIARY_NOT_EXISTS(false, 2402, "해당하는 유저와 일치하는 일기가 없습니다."),

    POST_USERS_EXISTS_NICKNAME(false, 2032, "중복된 닉네임입니다."),

    //500
   COURSE_REVIEW_NOT_EXISTS(false, 2500, "해당 코스리뷰가 없습니다."),

    /**
     * 3000 : Response 오류
     */
    // Common
    RESPONSE_ERROR(false, 3000, "값을 불러오는데 실패하였습니다."),

    // [POST] /users
    FAILED_TO_LOGIN(false,3014,"없는 아이디거나 비밀번호가 틀렸습니다."),

    MODIFY_FAIL_POST(false, 3020, "게시물 수정에 실패하였습니다."),
    DELETE_FAIL_POST(false, 3021, "게시물 삭제에 실패하였습니다."),



    /**
     * 4000 : Database, Server 오류
     */
    DATABASE_ERROR(false, 4000, "데이터베이스 연결에 실패하였습니다."),
    SERVER_ERROR(false, 4001, "서버와의 연결에 실패하였습니다."),

    //[PATCH] /users/{userIdx}
    MODIFY_FAIL_USERNAME(false,4014,"유저네임 수정 실패"),


    DELETE_USER_FAIL(false, 4008, "유저 정보 삭제에 실패하였습니다."),

    PASSWORD_ENCRYPTION_ERROR(false, 4011, "비밀번호 암호화에 실패하였습니다."),
    PASSWORD_DECRYPTION_ERROR(false, 4012, "비밀번호 복호화에 실패하였습니다."),




    // 5000 : AWS관련 오류
    AWS_ACCESS_DENIED(false,5001 ,"접근 권한이 없습니다."),
    AWS_FILE_NOT_FOUND(false,5002 ,"파일 키에 해당하는 파일이 존재하지 않습니다."),
    AWS_FILE_CONVERT_FAIL(false, 5003, "파일 변환에 실패했습니다.");

    // 6000 : 필요시 만들어서 쓰세요


    private final boolean isSuccess;
    private final int code;
    private final String message;

    private BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}