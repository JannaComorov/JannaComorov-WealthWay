package org.example.service;

import org.example.repository.HistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.example.model.History;


@Service
public class HistoryService {

    private final HistoryRepository repository;

    public HistoryService(HistoryRepository repository) {
        this.repository = repository;
    }

    /**
     * Salvează sau actualizează istoricul pentru o lună.
     * Dacă luna există deja, actualizează valorile.
     * Dacă nu există, creează un nou rând în baza de date.
     */
    public History saveOrUpdate(History history) {
        return repository.findByMonth(history.getMonth())
                .map(existing -> {
                    existing.setVenituri(history.getVenituri());
                    existing.setCheltuieli(history.getCheltuieli());
                    existing.setEconomii(history.getEconomii());
                    existing.setCredite(history.getCredite());
                    return repository.save(existing);
                })
                .orElseGet(() -> repository.save(history));
    }

    /**
     * Caută istoricul unei luni specifice.
     */
    public Optional<History> findByMonth(String month) {
        return repository.findByMonth(month);
    }

    /**
     * Returnează toate înregistrările istorice.
     */
    public List<History> getAll() {
        return repository.findAll();
    }
}
