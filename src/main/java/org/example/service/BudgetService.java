package org.example.service;

import org.example.exception.BudgetNotFoundException;
import org.example.model.Budget;
import org.example.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    // 🟢 Returnează toate bugetele
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    // ✅ Găsește un buget după ID sau aruncă excepție
    public Budget getBudgetById(Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> new BudgetNotFoundException("Bugetul cu ID-ul " + id + " nu a fost găsit."));
    }

    // ➕ Creează un buget nou (cu validare sumă)
    public Budget addBudget(Budget budget) {
        if (budget.getAmount() <= 0) {
            throw new IllegalArgumentException("Suma trebuie să fie pozitivă.");
        }
        return budgetRepository.save(budget);
    }

    // 🔄 Actualizează un buget existent
    public Budget updateBudget(Long id, Budget newBudget) {
        return budgetRepository.findById(id).map(budget -> {
            if (newBudget.getAmount() <= 0) {
                throw new IllegalArgumentException("Suma trebuie să fie pozitivă.");
            }
            budget.setAmount(newBudget.getAmount());
            budget.setCategory(newBudget.getCategory());
            budget.setStartDate(newBudget.getStartDate());
            budget.setEndDate(newBudget.getEndDate());
            return budgetRepository.save(budget);
        }).orElseThrow(() -> new BudgetNotFoundException("Bugetul cu ID-ul " + id + " nu a fost găsit."));
    }

    // 🗑️ Șterge un buget după ID
    public boolean deleteBudget(Long id) {
        if (budgetRepository.existsById(id)) {
            budgetRepository.deleteById(id);
            return true;
        } else {
            throw new BudgetNotFoundException("Bugetul cu ID-ul " + id + " nu a fost găsit.");
        }
    }
}
