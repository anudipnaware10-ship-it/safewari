package anudip.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import anudip.entity.User;
import anudip.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String mobile) throws UsernameNotFoundException {

        User user = userRepository.findByMobile(mobile)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with mobile: " + mobile));

        return new CustomUserDetails(user);
    }
}