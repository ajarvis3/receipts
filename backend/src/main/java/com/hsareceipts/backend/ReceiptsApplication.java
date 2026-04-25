package com.hsareceipts.backend;

import com.hsareceipts.backend.config.StorageProps;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProps.class)
public class ReceiptsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReceiptsApplication.class, args);
    }
}

