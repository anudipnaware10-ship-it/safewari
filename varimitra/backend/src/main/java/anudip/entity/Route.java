package anudip.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String routeName;

    private String startLocation;

    private String endLocation;

    private double totalDistance;

    @JsonManagedReference
@OneToMany(mappedBy = "route", cascade = CascadeType.ALL)
private List<RouteStop> stops = new ArrayList<>();

    // Default Constructor
    public Route() {
    }

    // Parameterized Constructor
    public Route(Long id, String routeName, String startLocation,
                 String endLocation, double totalDistance) {
        this.id = id;
        this.routeName = routeName;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.totalDistance = totalDistance;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public List<RouteStop> getStops() {
        return stops;
    }

    public void setStops(List<RouteStop> stops) {
        this.stops = stops;
    }
}