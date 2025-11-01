package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.model.enums.TransactionType;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, message = "Descrierea trebuie să aibă cel puțin 3 caractere")
    @Column(nullable = false)
    private String description;

    @NotNull
    @Min(value = 1, message = "Suma trebuie să fie pozitivă")
    @Column(nullable = false)
    private double amount;

    @NotNull(message = "Tipul tranzacției nu poate fi null")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    public Transaction() {}

    public Transaction(String description, double amount, TransactionType type, LocalDate date) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }

    // Getteri & Setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    // ✅ Validare personalizată pentru controller
    public boolean isValid() {
        return description != null && description.trim().length() >= 3
                && amount >= 1
                && type != null
                && date != null;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", type=" + type +
                ", date=" + date +
                '}';
    }
}
