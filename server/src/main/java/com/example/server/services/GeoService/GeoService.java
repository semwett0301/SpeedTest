package com.example.server.services.GeoService;

import com.maxmind.geoip2.exception.GeoIp2Exception;

import java.io.IOException;
import java.net.UnknownHostException;

public interface GeoService {
    String getCountry(String ip) throws IOException, GeoIp2Exception;

    String getCity(String ip) throws IOException, GeoIp2Exception;
}
