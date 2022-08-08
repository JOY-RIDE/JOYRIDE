package com.joyride.ms.src.jwt;

import com.joyride.ms.src.auth.AuthProvider;
import com.joyride.ms.src.auth.model.Token;
import com.joyride.ms.util.BaseException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

import static com.joyride.ms.util.BaseResponseStatus.DIFFERENT_REFRESH_TOKEN;
import static com.joyride.ms.util.BaseResponseStatus.EXPIRED_JWT;

@Slf4j
@Component
@Getter
public class JwtTokenProvider {
    private final AuthProvider authProvider;
    private final Long JWT_ACCESS_TOKEN_EXPTIME;
    private final Long JWT_REFRESH_TOKEN_EXPTIME;
    private final String  JWT_ACCESS_SECRET_KEY;
    private final String  JWT_REFRESH_SECRET_KEY;
    private Key accessKey;
    private Key refreshKey;

    @Autowired
    public JwtTokenProvider(
            AuthProvider authProvider,
            @Value("${jwt.time.access}") Long JWT_ACCESS_TOKEN_EXPTIME,
            @Value("${jwt.time.refresh}") Long JWT_REFRESH_TOKEN_EXPTIME,
            @Value("${jwt.secret.access}") String JWT_ACCESS_SECRET_KEY,
            @Value("${jwt.secret.refresh}") String JWT_REFRESH_SECRET_KEY
        )
        {
            this.authProvider = authProvider;
            this.JWT_ACCESS_TOKEN_EXPTIME = JWT_ACCESS_TOKEN_EXPTIME;
            this.JWT_REFRESH_TOKEN_EXPTIME = JWT_REFRESH_TOKEN_EXPTIME;
            this.JWT_ACCESS_SECRET_KEY = JWT_ACCESS_SECRET_KEY;
            this.JWT_REFRESH_SECRET_KEY = JWT_REFRESH_SECRET_KEY;
        }

    @PostConstruct
    public void initialize() {
        byte[] accessKeyBytes = Decoders.BASE64.decode(JWT_ACCESS_SECRET_KEY);
        this.accessKey = Keys.hmacShaKeyFor(accessKeyBytes);

        byte[] secretKeyBytes = Decoders.BASE64.decode(JWT_REFRESH_SECRET_KEY);
        this.refreshKey = Keys.hmacShaKeyFor(secretKeyBytes);
    }

    // JWT 토큰 생성

    public Token createToken(Long userId) {
        Claims claims = Jwts.claims().setSubject(userId.toString()); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.
        Date now = new Date();

        String accessToken = Jwts.builder()
                                .setClaims(claims) // 정보 저장
                                .setIssuedAt(now) // 토큰 발행 시간 정보
                                .setExpiration(new Date(now.getTime() + JWT_ACCESS_TOKEN_EXPTIME)) // set Expire Time
                                .signWith(accessKey, SignatureAlgorithm.HS256)  // 사용할 암호화 알고리즘과
                                .compact();

        String refreshToken =  Jwts.builder()
                                .setClaims(claims) // 정보 저장
                                .setIssuedAt(now) // 토큰 발행 시간 정보
                                .setExpiration(new Date(now.getTime() + JWT_REFRESH_TOKEN_EXPTIME)) // set Expire Time
                                .signWith(refreshKey, SignatureAlgorithm.HS256) // 사용할 암호화 알고리즘과
                                // signature 에 들어갈 secret값 세팅
                                .compact();

        return new Token(accessToken, refreshToken);
    }

    public String createAccessToken(Long userId) {
        Claims claims = Jwts.claims().setSubject(userId.toString()); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + JWT_ACCESS_TOKEN_EXPTIME)) // set Expire Time
                .signWith(accessKey, SignatureAlgorithm.HS256)  // 사용할 암호화 알고리즘과
                .compact();
    }

    public String createRefreshToken(Long userId) {
        Claims claims = Jwts.claims().setSubject(userId.toString()); // JWT payload 에 저장되는 정보단위, 보통 여기서 user를 식별하는 값을 넣는다.

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + JWT_REFRESH_TOKEN_EXPTIME)) // set Expire Time
                .signWith(refreshKey, SignatureAlgorithm.HS256) // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();
    }

    // 토큰에서 회원 정보 추출
    public String getUseridFromAcs(String token) {
        return Jwts.parserBuilder().setSigningKey(accessKey).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public String getUseridFromRef(String token) {
        return Jwts.parserBuilder().setSigningKey(refreshKey).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // Refresh 토큰 유효성 검사
    public void AssertRefreshTokenEqualAndValid(String token) throws BaseException {
        try {
            Jwts
                    .parserBuilder().setSigningKey(refreshKey).build()
                    .parseClaimsJws(token);
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw new BaseException(EXPIRED_JWT);
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        if (!authProvider.isRefreshTokenEqual(token))
            throw new BaseException(DIFFERENT_REFRESH_TOKEN);
    }

    // Jwt 토큰 유효성 검사
    public boolean validateToken(String jwtHeader) throws BaseException{
        try {
            Jwts
                    .parserBuilder().setSigningKey(accessKey).build()
                    .parseClaimsJws(jwtHeader);
            return true;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
