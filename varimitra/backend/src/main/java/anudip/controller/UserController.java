package anudip.controller;

import anudip.entity.User;
import anudip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public String test() {
        return "User Controller Working";
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
public List<User> getAllUsers() {
    return userService.getAllUsers();
}

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
public User updateUser(@PathVariable Long id,
                       @RequestBody User user) {

    return userService.updateUser(id, user);
}

@DeleteMapping("/{id}")
public String deleteUser(@PathVariable Long id) {

    userService.deleteUser(id);

    return "User deleted successfully.";
}


}