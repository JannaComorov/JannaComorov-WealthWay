package org.example.dtos;

import jakarta.validation.constraints.NotNull;

public class ExpenseUpsertReqDto {

    @NotNull(message = "alte is required")
    private double alte;

    @NotNull(message = "obligatorii is required")
    private double obligatorii;

    @NotNull(message = "permanente is required")
    private double permanente;

    public ExpenseUpsertReqDto() {}

    public ExpenseUpsertReqDto(double alte, double obligatorii, double permanente) {
        this.alte = alte;
        this.obligatorii = obligatorii;
        this.permanente = permanente;
    }

    public double getAlte() {
        return alte;
    }

    public void setAlte(double alte) {
        this.alte = alte;
    }

    public double getObligatorii() {
        return obligatorii;
    }

    public void setObligatorii(double obligatorii) {
        this.obligatorii = obligatorii;
    }

    public double getPermanente() {
        return permanente;
    }

    public void setPermanente(double permanente) {
        this.permanente = permanente;
    }
}

