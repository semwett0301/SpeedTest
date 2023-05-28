package com.example.server.services.GeoService;

public interface GeoService {
    String getCountry(String ip);

    String getCity(String ip);
}
