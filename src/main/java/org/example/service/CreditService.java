package org.example.service;

import org.example.model.Credit;
import org.example.repository.CreditRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class CreditService {

    private final CreditRepository repo;

    public CreditService(CreditRepository repo) {
        this.repo = repo;
    }

    // 🔹 Obține toate creditele
    public List<Credit> getAll() {
        return repo.findAll();
    }

    // 🔹 Creează sau actualizează un credit
    public Credit save(Credit credit) {
        if (!credit.isValid()) {
            throw new IllegalArgumentException("Datele creditului nu sunt valide.");
        }
        return repo.save(credit);
    }

    // 🔹 Șterge un credit după ID
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Creditul cu ID-ul " + id + " nu există.");
        }
        repo.deleteById(id);
    }

    // 🔹 Calculează suma totală a ratelor lunare active pentru o anumită lună
    public double getTotalActiveMonthlyRate(YearMonth month) {
        List<Credit> credits = repo.findAll();
        LocalDate monthStart = month.atDay(1);

        return credits.stream()
                .filter(credit -> {
                    LocalDate start = credit.getStartDate();
                    LocalDate end = start.plusMonths(credit.getMonths());
                    return !monthStart.isBefore(start) &&
                            monthStart.isBefore(end) &&
                            credit.getPaidMonths() < credit.getMonths();
                })
                .mapToDouble(Credit::getMonthlyRate)
                .sum();
    }
}
