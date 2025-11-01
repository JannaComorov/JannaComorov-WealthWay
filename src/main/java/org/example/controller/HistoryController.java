package org.example.controller;

import org.example.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.model.History;


import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:5173")
public class HistoryController {

    private final HistoryService service;

    public HistoryController(HistoryService service) {
        this.service = service;
    }

    /**
     * 🔄 Salvează sau actualizează istoricul pentru o lună.
     */
    @PostMapping
    public ResponseEntity<History> saveHistory(@RequestBody History history) {
        History result = service.saveOrUpdate(history);
        return ResponseEntity.ok(result);
    }

    /**
     * 📅 Găsește istoric pentru o lună (ex: 2025-04).
     */
    @GetMapping
    public ResponseEntity<History> getByMonth(@RequestParam String month) {
        return service.findByMonth(month)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * 🔁 Returnează tot istoricul salvat (opțional, pentru testare/admin).
     */
    @GetMapping("/all")
    public ResponseEntity<List<History>> getAllHistory() {
        return ResponseEntity.ok(service.getAll());
    }
}
