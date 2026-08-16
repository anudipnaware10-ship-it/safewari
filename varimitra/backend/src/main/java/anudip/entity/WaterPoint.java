package anudip.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "water_points")
public class WaterPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String campName;

    private boolean available;

    private String contactNumber;

    private String openingTime;

    private String closingTime;

    private String description;

    @ManyToOne
    @JoinColumn(name = "route_stop_id")
    private RouteStop routeStop;

    // Default Constructor
    public WaterPoint() {
    }

    // Parameterized Constructor
    public WaterPoint(Long id,
                      String campName,
                      boolean available,
                      String contactNumber,
                      String openingTime,
                      String closingTime,
                      String description,
                      RouteStop routeStop) {

        this.id = id;
        this.campName = campName;
        this.available = available;
        this.contactNumber = contactNumber;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.description = description;
        this.routeStop = routeStop;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCampName() {
        return campName;
    }

    public void setCampName(String campName) {
        this.campName = campName;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RouteStop getRouteStop() {
        return routeStop;
    }

    public void setRouteStop(RouteStop routeStop) {
        this.routeStop = routeStop;
    }
}