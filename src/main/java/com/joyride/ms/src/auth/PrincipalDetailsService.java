package com.joyride.ms.src.auth;

import com.joyride.ms.src.auth.model.PrincipalDetails;
import com.joyride.ms.src.user.UserProvider;
import com.joyride.ms.util.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailsService implements UserDetailsService {

    private final UserProvider userProvider;

    @Autowired
    public PrincipalDetailsService(UserProvider userProvider) {
        this.userProvider = userProvider;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            return new PrincipalDetails(userProvider.retrieveByEmail(email));
        } catch (BaseException e) {
            throw new RuntimeException(e);
        }
    }
}