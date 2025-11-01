package org.example.controller;

import org.example.model.Budget;
import org.example.repository.BudgetRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    private final BudgetRepository budgetRepository;

    public BudgetController(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    // 1. Obține toate bugetele
    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    // 2. Creează un buget nou
    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        if (!budget.isValid()) {
            throw new IllegalArgumentException("Datele bugetului nu sunt valide.");
        }
        return budgetRepository.save(budget);
    }

    // 3. Editează un buget existent
    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        updatedBudget.setId(id);
        if (!updatedBudget.isValid()) {
            throw new IllegalArgumentException("Datele bugetului nu sunt valide.");
        }
        return budgetRepository.save(updatedBudget);
    }

    // 4. Șterge un buget
    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetRepository.deleteById(id);
    }

    // 5. Caută după categorie (parțial, ignorând majuscule)
    @GetMapping("/search")
    public List<Budget> searchByCategory(@RequestParam String query) {
        return budgetRepository.findByCategoryContainingIgnoreCase(query);
    }

    // 6. Găsește bugete într-un interval
    @GetMapping("/interval")
    public List<Budget> getByInterval(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return budgetRepository.findByStartDateBetween(start, end);
    }

    // 7. Bugete expirate (endDate < azi)
    @GetMapping("/expired")
    public List<Budget> getExpiredBudgets() {
        return budgetRepository.findByEndDateBefore(LocalDate.now());
    }

    // 8. Bugete active (startDate < azi < endDate)
    @GetMapping("/active")
    public List<Budget> getActiveBudgets() {
        LocalDate today = LocalDate.now();
        return budgetRepository.findByStartDateBeforeAndEndDateAfter(today, today);
    }
}
