package com.example.server.controllers;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class ControllerAdviser {
    @ExceptionHandler({IOException.class, GeoIp2Exception.class})
    public ResponseEntity<?> handleIO() {
        return ResponseEntity.internalServerError().build();
    }
}
