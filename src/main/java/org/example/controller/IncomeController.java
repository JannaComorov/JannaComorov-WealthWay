package org.example.controller;

import org.example.model.Income;
import org.example.service.IncomeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:5173") // Pentru frontend React
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    // 1. Obține toate veniturile
    @GetMapping
    public List<Income> getAll() {
        return incomeService.getAll();
    }

    // 2. Creează un venit nou
    @PostMapping
    public Income create(@RequestBody Income income) {
        if (!income.isValid()) {
            throw new IllegalArgumentException("Datele venitului nu sunt valide.");
        }
        return incomeService.save(income);
    }

    // 3. Editează un venit existent
    @PutMapping("/{id}")
    public Income update(@PathVariable Long id, @RequestBody Income income) {
        income.setId(id);
        if (!income.isValid()) {
            throw new IllegalArgumentException("Datele venitului nu sunt valide.");
        }
        return incomeService.save(income);
    }

    // 4. Șterge un venit
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        incomeService.delete(id);
    }
}
