package org.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // dezactivează CSRF pentru a permite POST-uri din frontend
                .authorizeHttpRequests()
                .requestMatchers("/api/**").permitAll() // permite acces liber la toate rutele din /api
                .anyRequest().permitAll();

        return http.build();
    }
}
