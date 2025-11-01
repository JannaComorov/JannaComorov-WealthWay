package org.example.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private LocalDate startDate;
    private LocalDate endDate;
    private double amount;

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Income> incomes;

    public Budget() {}

    public Budget(String category, LocalDate startDate, LocalDate endDate, double amount) {
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public List<Income> getIncomes() { return incomes; }

    public void setIncomes(List<Income> incomes) {
        this.incomes = incomes;
        if (incomes != null) {
            incomes.forEach(income -> income.setBudget(this));
        }
    }

    // ✅ Validare simplă pentru controller
    public boolean isValid() {
        return category != null && !category.trim().isEmpty()
                && startDate != null && endDate != null
                && endDate.isAfter(startDate)
                && amount >= 0;
    }

    // 🔎 Pentru debugging/logare
    @Override
    public String toString() {
        return "Budget{" +
                "id=" + id +
                ", category='" + category + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                '}';
    }
}
