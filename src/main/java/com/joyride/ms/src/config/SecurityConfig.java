package com.joyride.ms.src.config;

import com.joyride.ms.src.auth.AuthService;
import com.joyride.ms.src.auth.PrincipalOAuth2UserService;
import com.joyride.ms.src.jwt.JwtTokenProvider;
import com.joyride.ms.src.jwt.filter.JwtAuthorizationFilter;
import com.joyride.ms.src.jwt.handler.CustomAccessDeniedHandler;
import com.joyride.ms.src.jwt.handler.CustomAuthenticationEntryPointHandler;
import com.joyride.ms.src.jwt.handler.OAuth2SuccessHandler;
import com.joyride.ms.src.user.UserProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

    private final PrincipalOAuth2UserService principalOAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthService authService;
    private final UserProvider userProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @Autowired
    public SecurityConfig(PrincipalOAuth2UserService principalOAuth2UserService, OAuth2SuccessHandler successHandler, JwtTokenProvider jwtTokenProvider, AuthService authService, UserProvider userProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.principalOAuth2UserService = principalOAuth2UserService;
        this.successHandler = successHandler;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authService = authService;
        this.userProvider = userProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {

        http
                .addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider, userProvider, authenticationManagerBuilder.getObject()),
                        UsernamePasswordAuthenticationFilter.class);

        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable() // 세션 사용 안하므로
                // exception handling 새로 만든 클래스로
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPointHandler())
                .accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 안함
                .and()
                .formLogin().disable() // form 태그 만들어서 로그인을 안함
                .httpBasic().disable() // 기본 방식 안쓰고 Bearer(jwt) 방법 사용할 것
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/courses/**").permitAll()
                .antMatchers(HttpMethod.GET,"/meets").permitAll()
                .antMatchers(HttpMethod.GET,"/meets/detail/{meetId}").permitAll()

                // swagger
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/swagger/**").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/health").permitAll()
                .and()
                .authorizeRequests()
                .anyRequest().authenticated()
                // .antMatchers("/").permitAll()
                .and()
                .oauth2Login()
                // .redirectionEndpoint().baseUri("/auth/token")
                // .and()
                .userInfoEndpoint().userService(principalOAuth2UserService)
                .and()
                .successHandler(new OAuth2SuccessHandler(jwtTokenProvider, authService));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
