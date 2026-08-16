package anudip.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import anudip.entity.RouteStop;
import anudip.entity.WaterPoint;

public interface WaterPointRepository extends JpaRepository<WaterPoint, Long> {

    // Find all water points for a particular route stop
    List<WaterPoint> findByRouteStop(RouteStop routeStop);

    // Find all available water points
    List<WaterPoint> findByAvailableTrue();

}