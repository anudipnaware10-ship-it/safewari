package anudip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import anudip.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}