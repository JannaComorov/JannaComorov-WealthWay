package org.example.service;

import org.example.model.Saving;
import org.example.repository.SavingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavingService {

    private final SavingRepository repo;

    public SavingService(SavingRepository repo) {
        this.repo = repo;
    }

    // 🔹 Obține toate economiile
    public List<Saving> getAll() {
        return repo.findAll();
    }

    // 🔹 Creează sau editează o economie (cu validare)
    public Saving save(Saving saving) {
        if (!saving.isValid()) {
            throw new IllegalArgumentException("Datele economiei nu sunt valide.");
        }
        return repo.save(saving);
    }

    // 🔹 Șterge o economie dacă există
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Economia cu ID-ul " + id + " nu există.");
        }
        repo.deleteById(id);
    }
}
