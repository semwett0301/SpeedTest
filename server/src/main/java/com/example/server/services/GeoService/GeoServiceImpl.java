package com.example.server.services.GeoService;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Objects;

@Service
public class GeoServiceImpl implements GeoService {
    private final DatabaseReader databaseReader;

    final ResourceLoader resourceLoader;

    @Autowired
    public GeoServiceImpl(ResourceLoader resourceLoader) throws IOException {
        String dbLocation = "geo-lite.mmdb";

        Resource res = resourceLoader.getResource("classpath:" + dbLocation);
        File f = new File(res.getFile().toURI());

        databaseReader = new DatabaseReader.Builder(f).build();
        this.resourceLoader = resourceLoader;
    }

    @Override
    public String getCountry(String ip) throws IOException, GeoIp2Exception {
        return getCityResponse(ip).getCountry().getName();
    }

    @Override
    public String getCity(String ip) throws IOException, GeoIp2Exception {
        return getCityResponse(ip).getCity().getName();
    }

    private CityResponse getCityResponse(String ip) throws IOException, GeoIp2Exception {
        InetAddress currentAddress = getAddress(ip);
        return databaseReader.city(currentAddress);
    }

    private InetAddress getAddress(String ip) throws UnknownHostException {
        return InetAddress.getByName(ip);
    }
}
