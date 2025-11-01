package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class WealthWayApplication {

    private static final Logger logger = LoggerFactory.getLogger(WealthWayApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(WealthWayApplication.class, args);
        logger.info("✅ Aplicația WealthWay a pornit cu succes! 🚀");
    }
}
