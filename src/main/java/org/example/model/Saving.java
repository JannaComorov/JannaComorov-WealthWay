package org.example.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Saving {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDate date;

    private String note;

    public Saving() {}

    public Saving(double amount, LocalDate date, String note) {
        this.amount = amount;
        this.date = date;
        this.note = note;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    // ✅ Validare pentru controller
    public boolean isValid() {
        return amount >= 0 && date != null;
    }

    @Override
    public String toString() {
        return "Saving{" +
                "id=" + id +
                ", amount=" + amount +
                ", date=" + date +
                ", note='" + note + '\'' +
                '}';
    }
}
