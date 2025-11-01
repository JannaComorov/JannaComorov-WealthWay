package org.example.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:5173") // Permite accesul din aplicația React
public class HomeController {

    // Mesaj de întâmpinare pentru verificarea API-ului
    @GetMapping
    public String home() {
        return "✨ Bine ai venit la WealthWay API!";
    }

    // Endpoint pentru verificarea stării API-ului (health check)
    @GetMapping("/health")
    public String healthCheck() {
        return "✅ API-ul WealthWay este activ și funcționează corect!";
    }
}
