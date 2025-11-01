package org.example.model;

public class FinanceSummary {
    private double totalVenituri;
    private double totalCheltuieli;
    private double totalEconomii;
    private double totalRateCredite;

    public FinanceSummary() {}

    public FinanceSummary(double totalVenituri, double totalCheltuieli, double totalEconomii, double totalRateCredite) {
        this.totalVenituri = totalVenituri;
        this.totalCheltuieli = totalCheltuieli;
        this.totalEconomii = totalEconomii;
        this.totalRateCredite = totalRateCredite;
    }

    public double getTotalVenituri() { return totalVenituri; }
    public void setTotalVenituri(double val) { this.totalVenituri = val; }

    public double getTotalCheltuieli() { return totalCheltuieli; }
    public void setTotalCheltuieli(double val) { this.totalCheltuieli = val; }

    public double getTotalEconomii() { return totalEconomii; }
    public void setTotalEconomii(double val) { this.totalEconomii = val; }

    public double getTotalRateCredite() { return totalRateCredite; }
    public void setTotalRateCredite(double val) { this.totalRateCredite = val; }

    @Override
    public String toString() {
        return "FinanceSummary{" +
                "totalVenituri=" + totalVenituri +
                ", totalCheltuieli=" + totalCheltuieli +
                ", totalEconomii=" + totalEconomii +
                ", totalRateCredite=" + totalRateCredite +
                '}';
    }
}
