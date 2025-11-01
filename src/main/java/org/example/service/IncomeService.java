package org.example.service;

import org.example.model.Income;
import org.example.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    // 🔹 Returnează toate veniturile
    public List<Income> getAll() {
        return incomeRepository.findAll();
    }

    // 🔹 Creează sau actualizează un venit (cu validare)
    public Income save(Income income) {
        if (!income.isValid()) {
            throw new IllegalArgumentException("Datele venitului nu sunt valide.");
        }
        return incomeRepository.save(income);
    }

    // 🔹 Șterge un venit după ID (cu verificare)
    public void delete(Long id) {
        if (!incomeRepository.existsById(id)) {
            throw new IllegalArgumentException("Venitul cu ID-ul " + id + " nu există.");
        }
        incomeRepository.deleteById(id);
    }
}
