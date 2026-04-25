package com.hsareceipts.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
@Profile("dev")
public class DevJwtDecoder {

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder decoder =
            NimbusJwtDecoder.withJwkSetUri("http://keycloak:8080/realms/receipts/protocol/openid-connect/certs")
                            .build();

        // Disable issuer validation in dev
        decoder.setJwtValidator(JwtValidators.createDefault());

        return decoder;
    }
    
}
