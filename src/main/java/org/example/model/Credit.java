package org.example.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Credit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private int months;

    @Column(nullable = false)
    private int paidMonths;

    @Column(nullable = false)
    private double monthlyRate;

    @Column(nullable = false)
    private LocalDate startDate;

    public Credit() {}

    public Credit(String description, double totalAmount, int months, int paidMonths, double monthlyRate, LocalDate startDate) {
        this.description = description;
        this.totalAmount = totalAmount;
        this.months = months;
        this.paidMonths = paidMonths;
        this.monthlyRate = monthlyRate;
        this.startDate = startDate;
    }

    // Getters și Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public int getMonths() { return months; }
    public void setMonths(int months) { this.months = months; }

    public int getPaidMonths() { return paidMonths; }
    public void setPaidMonths(int paidMonths) { this.paidMonths = paidMonths; }

    public double getMonthlyRate() { return monthlyRate; }
    public void setMonthlyRate(double monthlyRate) { this.monthlyRate = monthlyRate; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public boolean isValid() {
        return description != null && !description.trim().isEmpty()
                && totalAmount >= 0
                && months > 0
                && paidMonths >= 0
                && startDate != null
                && monthlyRate >= 0;
    }

    @Override
    public String toString() {
        return "Credit{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", totalAmount=" + totalAmount +
                ", months=" + months +
                ", paidMonths=" + paidMonths +
                ", startDate=" + startDate +
                ", monthlyRate=" + monthlyRate +
                '}';
    }
}
