package com.example.server.controllers;

import com.example.server.model.dto.ResponseIp;
import com.example.server.services.GeoService.GeoService;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/network")
@CrossOrigin(origins = "http://localhost:3000")
public class NetworksController {
    private final HttpServletRequest request;
    private final GeoService geoService;
    private String buffer;

    @Autowired
    public NetworksController(HttpServletRequest request, GeoService geoService) {
        this.request = request;
        this.geoService = geoService;

        this.buffer = "x";
        for (var i = 0; i < 23; i++) {
            this.buffer += this.buffer;
        }
    }

    @GetMapping("/ip")
    public ResponseIp getUserIP() throws IOException, GeoIp2Exception {
        return new ResponseIp(request.getRemoteAddr(), geoService.getCountry(request.getRemoteAddr()), geoService.getCity(request.getRemoteAddr()));
    }

    @GetMapping("/ping")
    public ResponseEntity<?> getPing() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tx")
    public ResponseEntity<?> getTx(@RequestBody String buffer) {
        if (!this.buffer.equals(buffer)) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/rx")
    public ResponseEntity<String> getRx() {
        return ResponseEntity
                .ok()
                .header("Content-Type", "application/octet-stream")
                .body(buffer);
    }


}
