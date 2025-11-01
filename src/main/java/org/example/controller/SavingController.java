package org.example.controller;

import org.example.model.Saving;
import org.example.service.SavingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "http://localhost:5173") // Pentru integrarea cu React
public class SavingController {

    private final SavingService service;

    public SavingController(SavingService service) {
        this.service = service;
    }

    // 1. Returnează toate economiile
    @GetMapping
    public List<Saving> getAll() {
        return service.getAll();
    }

    // 2. Salvează o economie nouă
    @PostMapping
    public Saving save(@RequestBody Saving saving) {
        if (!saving.isValid()) {
            throw new IllegalArgumentException("Datele economiei nu sunt valide.");
        }
        return service.save(saving);
    }

    // 3. Editează o economie existentă
    @PutMapping("/{id}")
    public Saving update(@PathVariable Long id, @RequestBody Saving saving) {
        saving.setId(id);
        if (!saving.isValid()) {
            throw new IllegalArgumentException("Datele economiei nu sunt valide.");
        }
        return service.save(saving);
    }

    // 4. Șterge o economie
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
