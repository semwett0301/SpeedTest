package com.example.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/network")
public class NetworksController {
    private final HttpServletRequest request;
    private String buffer;

    @Autowired
    public NetworksController(HttpServletRequest request) {
        this.request = request;

        this.buffer = "x";
        for (var i = 0; i < 23; i++) {
            this.buffer += this.buffer;
        }
    }

    @GetMapping("/ip")
    public String getUserIP() {
        return request.getRemoteAddr();
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
