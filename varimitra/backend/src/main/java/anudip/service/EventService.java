package anudip.service;

import anudip.entity.Event;
import anudip.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Create Event
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    // Get All Events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get Event By ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    // Update Event
    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setDate(updatedEvent.getDate());
            event.setLocation(updatedEvent.getLocation());
            event.setOrganizer(updatedEvent.getOrganizer());

            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // Delete Event
    public String deleteEvent(Long id) {
        eventRepository.deleteById(id);
        return "Event deleted successfully";
    }
}