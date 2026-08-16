package anudip.service;

import anudip.entity.User;
import anudip.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

public void deleteUser(Long id) {
    userRepository.deleteById(id);
}

    public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
}



public User updateUser(Long id, User updatedUser) {

    User existingUser = userRepository.findById(id).orElse(null);

    if (existingUser == null) {
        return null;
    }

    existingUser.setName(updatedUser.getName());
    existingUser.setMobile(updatedUser.getMobile());
    existingUser.setEmail(updatedUser.getEmail());
    existingUser.setPassword(updatedUser.getPassword());
    existingUser.setRole(updatedUser.getRole());

    return userRepository.save(existingUser);
}
}