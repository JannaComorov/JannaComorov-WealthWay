package org.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.Objects;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Descrierea este obligatorie")
    @Column(nullable = false)
    private String description;

    @Min(value = 1, message = "Suma trebuie să fie mai mare ca 0")
    @Column(nullable = false)
    private double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalType type;

    public enum GoalType {
        LUNAR,
        LONG_TERM
    }

    // Constructori
    public Goal() {}

    public Goal(String description, double amount, GoalType type) {
        this.description = description;
        this.amount = amount;
        this.type = type;
    }

    public Goal(Long id, String description, double amount, GoalType type) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.type = type;
    }

    // Getteri și Setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public GoalType getType() { return type; }
    public void setType(GoalType type) { this.type = type; }

    // ✅ Validare pentru controller
    public boolean isValid() {
        return description != null && !description.trim().isEmpty()
                && amount > 0
                && type != null;
    }

    // Compatibil cu Java 15 (fără pattern matching)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Goal)) return false;
        Goal goal = (Goal) o;
        return Double.compare(goal.amount, amount) == 0 &&
                Objects.equals(id, goal.id) &&
                Objects.equals(description, goal.description) &&
                type == goal.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description, amount, type);
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", type=" + type +
                '}';
    }
}
