package org.example.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double permanent;

    @Column(nullable = false)
    private double required;

    @Column(nullable = false)
    private double other;

    @Column(nullable = false)
    private String date;

    public Expense() {}

    public Expense(double permanent, double required, double other, String date) {
        this.permanent = permanent;
        this.required = required;
        this.other = other;
        this.date = date;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPermanent() {
        return permanent;
    }

    public void setPermanent(double permanent) {
        this.permanent = permanent;
    }

    public double getRequired() {
        return required;
    }

    public void setRequired(double required) {
        this.required = required;
    }

    public double getOther() {
        return other;
    }

    public void setOther(double other) {
        this.other = other;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", permanent=" + permanent +
                ", required=" + required +
                ", other=" + other +
                ", date='" + date + '\'' +
                '}';
    }
}
