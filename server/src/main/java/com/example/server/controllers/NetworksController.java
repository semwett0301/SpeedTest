package com.example.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/network")
public class NetworksController {
    @Autowired
    private HttpServletRequest request;

    @GetMapping("/ip")
    public String getUserIP() {
        return request.getRemoteAddr();
    }

    @GetMapping("/ping")
    public ResponseEntity<?> getPing() {
        return ResponseEntity.ok().build();
    }
}
