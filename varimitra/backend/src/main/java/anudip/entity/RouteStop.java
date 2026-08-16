package anudip.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "route_stops")
public class RouteStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stopNumber;

    private String stopName;

    private double distanceFromStart;

    private Double latitude;

    private Double longitude;

    private String district;

    private String taluka;

    private boolean haltPoint;

    @ManyToOne
    @JoinColumn(name = "route_id")
    @JsonBackReference
    private Route route;

    // Default Constructor
    public RouteStop() {
    }

    // Parameterized Constructor
    public RouteStop(Long id,
                     int stopNumber,
                     String stopName,
                     double distanceFromStart,
                     Double latitude,
                     Double longitude,
                     String district,
                     String taluka,
                     boolean haltPoint,
                     Route route) {

        this.id = id;
        this.stopNumber = stopNumber;
        this.stopName = stopName;
        this.distanceFromStart = distanceFromStart;
        this.latitude = latitude;
        this.longitude = longitude;
        this.district = district;
        this.taluka = taluka;
        this.haltPoint = haltPoint;
        this.route = route;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getStopNumber() {
        return stopNumber;
    }

    public void setStopNumber(int stopNumber) {
        this.stopNumber = stopNumber;
    }

    public String getStopName() {
        return stopName;
    }

    public void setStopName(String stopName) {
        this.stopName = stopName;
    }

    public double getDistanceFromStart() {
        return distanceFromStart;
    }

    public void setDistanceFromStart(double distanceFromStart) {
        this.distanceFromStart = distanceFromStart;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public boolean isHaltPoint() {
        return haltPoint;
    }

    public void setHaltPoint(boolean haltPoint) {
        this.haltPoint = haltPoint;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}