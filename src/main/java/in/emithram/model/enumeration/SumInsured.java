package in.emithram.model.enumeration;

public enum SumInsured {
    LIFE_INSURANCE("Life Insurance"),HEALTH_INSURANCE("Health Insurance"),TOP_UP_HEALTH_INSURANCE("TopUp Insurance");

    private String value;


    SumInsured(String sumInsuredValue) {
        this.value = sumInsuredValue;
    }

    public String getValue() {
        return value;
    }
}
