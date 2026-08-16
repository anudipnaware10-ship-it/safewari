package anudip.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import anudip.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMobile(String mobile);

}