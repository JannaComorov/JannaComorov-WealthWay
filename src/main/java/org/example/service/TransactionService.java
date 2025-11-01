package org.example.service;

import org.example.exception.TransactionNotFoundException;
import org.example.model.Transaction;
import org.example.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // 🟢 Obține toate tranzacțiile
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // ✅ Obține o tranzacție după ID (fără Optional)
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException("Tranzacția cu ID-ul " + id + " nu a fost găsită."));
    }

    // 🟢 Adaugă o tranzacție (cu validare)
    public Transaction addTransaction(Transaction transaction) {
        if (transaction.getAmount() <= 0) {
            throw new IllegalArgumentException("Suma tranzacției trebuie să fie pozitivă.");
        }
        return transactionRepository.save(transaction);
    }

    // 🟢 Actualizează o tranzacție existentă
    public Transaction updateTransaction(Long id, Transaction newTransaction) {
        return transactionRepository.findById(id).map(transaction -> {
            if (newTransaction.getAmount() <= 0) {
                throw new IllegalArgumentException("Suma tranzacției trebuie să fie pozitivă.");
            }
            transaction.setDescription(newTransaction.getDescription());
            transaction.setAmount(newTransaction.getAmount());
            transaction.setType(newTransaction.getType());
            transaction.setDate(newTransaction.getDate());
            return transactionRepository.save(transaction);
        }).orElseThrow(() -> new TransactionNotFoundException("Tranzacția cu ID-ul " + id + " nu a fost găsită."));
    }

    // 🔴 Șterge o tranzacție
    public boolean deleteTransaction(Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return true;
        } else {
            throw new TransactionNotFoundException("Tranzacția cu ID-ul " + id + " nu a fost găsită.");
        }
    }
}
