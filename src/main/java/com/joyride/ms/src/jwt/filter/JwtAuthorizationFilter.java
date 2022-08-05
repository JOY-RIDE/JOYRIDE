package com.joyride.ms.src.jwt.filter;

import com.joyride.ms.src.jwt.JwtTokenProvider;
import com.joyride.ms.src.user.UserProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserProvider userProvider;
    private final AuthenticationManager authenticationManager;

    public JwtAuthorizationFilter(JwtTokenProvider jwtTokenProvider, UserProvider userProvider, AuthenticationManager authenticationManager) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userProvider = userProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(request.getRequestURI().startsWith("/auth")
                || request.getRequestURI().startsWith("/favicon")){ // "/auth/*" uri들은 jwt체크 불필요
            log.info("JWT 인증 통과");
            chain.doFilter(request,response);
            return;
        }
        log.info("JWT 인증 시작");
        String requestUri = request.getRequestURI();
        try {
            String jwtHeader = request.getHeader("Authorization");

            if (StringUtils.hasText(jwtHeader) && jwtTokenProvider.validateToken(jwtHeader)) {
                Long userId = Long.parseLong(jwtTokenProvider.getUseridFromAcs(jwtHeader));

                Collection<GrantedAuthority> userAuthorities = new ArrayList<>();
                userAuthorities.add(new GrantedAuthority() {
                    @Override
                    public String getAuthority() {
                        return "ROLE_USER";
                    }
                });

                Authentication authentication = new UsernamePasswordAuthenticationToken(userId, "", userAuthorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                request.setAttribute("user_id", userId);
            }
            else {
                if (!StringUtils.hasText(jwtHeader)) {
                    request.setAttribute("unauthorization", "401 인증키 없음.");
                }
            }

        } catch (Exception e) {
            logger.error("Could not set user authentication in security context", e);
        }
        chain.doFilter(request, response);

    }


}

