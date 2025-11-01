package org.example.controller;

import org.example.dtos.ExpenseUpsertReqDto;
import org.example.model.Expense;
import org.example.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    // 1. Returnează toate cheltuielile
    @GetMapping
    public List<Expense> getAll() {
        return service.getAll();
    }

    // 2. Salvează o cheltuială nouă
    @PostMapping
    public Expense save(@RequestBody ExpenseUpsertReqDto expense) {
        return service.save(expense);
    }

    // 3. Editează o cheltuială existentă
    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody ExpenseUpsertReqDto expense) {
        return service.edit(expense, id);
    }

    // 4. Șterge o cheltuială
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
