package org.example.service;

import org.example.dtos.ExpenseUpsertReqDto;
import org.example.model.Expense;
import org.example.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    // 🔹 Returnează toate cheltuielile
    public List<Expense> getAll() {
        return repo.findAll();
    }

    // 🔹 Salvează sau editează o cheltuială (cu validare)
    public Expense save(ExpenseUpsertReqDto expense) {
        Expense newExpense = new Expense();
        newExpense.setOther(expense.getAlte());
        newExpense.setPermanent(expense.getPermanente());
        newExpense.setRequired(expense.getObligatorii());
        newExpense.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")));
        return repo.save(newExpense);
    }

    public Expense edit(ExpenseUpsertReqDto expense, Long id) {
        Expense newExpense = new Expense();
        newExpense.setId(id);
        newExpense.setOther(expense.getAlte());
        newExpense.setPermanent(expense.getPermanente());
        newExpense.setRequired(expense.getObligatorii());
        newExpense.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")));
        return repo.save(new Expense());
    }

    // 🔹 Șterge o cheltuială după ID (cu verificare)
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Cheltuiala cu ID-ul " + id + " nu există.");
        }
        repo.deleteById(id);
    }
}
