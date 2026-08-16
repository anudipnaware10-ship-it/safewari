package anudip.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import anudip.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findByName(String name);

}
