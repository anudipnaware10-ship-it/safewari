package anudip.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import anudip.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
