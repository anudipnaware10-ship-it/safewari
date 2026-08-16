package anudip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import anudip.entity.RouteStop;
import anudip.entity.WaterPoint;
import anudip.repository.RouteStopRepository;
import anudip.repository.WaterPointRepository;

@Service
public class WaterPointService {

    @Autowired
    private WaterPointRepository waterPointRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    // Add Water Point
    public WaterPoint addWaterPoint(WaterPoint waterPoint) {

        Long stopId = waterPoint.getRouteStop().getId();

        RouteStop routeStop = routeStopRepository.findById(stopId)
                .orElseThrow(() -> new RuntimeException("Route Stop not found"));

        waterPoint.setRouteStop(routeStop);

        return waterPointRepository.save(waterPoint);
    }

    // Get All Water Points
    public List<WaterPoint> getAllWaterPoints() {
        return waterPointRepository.findAll();
    }

    // Get Water Point By Id
    public WaterPoint getWaterPointById(Long id) {

        return waterPointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water Point not found"));
    }

    // Get Water Points By Route Stop
    public List<WaterPoint> getWaterPointsByRouteStop(Long stopId) {

        RouteStop routeStop = routeStopRepository.findById(stopId)
                .orElseThrow(() -> new RuntimeException("Route Stop not found"));

        return waterPointRepository.findByRouteStop(routeStop);
    }

    // Update Water Point
    public WaterPoint updateWaterPoint(Long id, WaterPoint updatedWaterPoint) {

        WaterPoint existing = waterPointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Water Point not found"));

        existing.setCampName(updatedWaterPoint.getCampName());
        existing.setAvailable(updatedWaterPoint.isAvailable());
        existing.setContactNumber(updatedWaterPoint.getContactNumber());
        existing.setOpeningTime(updatedWaterPoint.getOpeningTime());
        existing.setClosingTime(updatedWaterPoint.getClosingTime());
        existing.setDescription(updatedWaterPoint.getDescription());

        return waterPointRepository.save(existing);
    }

    // Delete Water Point
    public String deleteWaterPoint(Long id) {

        if (!waterPointRepository.existsById(id)) {
            return "Water Point not found.";
        }

        waterPointRepository.deleteById(id);

        return "Water Point deleted successfully.";
    }
}