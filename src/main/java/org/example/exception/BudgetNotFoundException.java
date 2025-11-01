package org.example.exception;

// Excepție personalizată pentru bugete care nu sunt găsite
public class BudgetNotFoundException extends RuntimeException {
    public BudgetNotFoundException(String message) {
        super(message);
    }
}
