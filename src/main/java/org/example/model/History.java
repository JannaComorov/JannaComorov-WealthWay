package org.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String month; // ex: "2025-06"

    @Column(nullable = false)
    private double venituri;

    @Column(nullable = false)
    private double cheltuieli;

    @Column(nullable = false)
    private double economii;

    @Column(nullable = false)
    private double credite;
}
