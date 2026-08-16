package anudip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import anudip.entity.Route;
import anudip.entity.RouteStop;
import anudip.repository.RouteRepository;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    // Add Route with Stops
    public Route addRoute(Route route) {

        // Set Route reference in every RouteStop
        for (RouteStop stop : route.getStops()) {
            stop.setRoute(route);
        }

        return routeRepository.save(route);
    }

    // Get All Routes
    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    // Get Route By Id
    public Route getRouteById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    // Delete Route
    public String deleteRoute(Long id) {

        if (routeRepository.existsById(id)) {
            routeRepository.deleteById(id);
            return "Route deleted successfully.";
        }

        return "Route not found.";
    }

}