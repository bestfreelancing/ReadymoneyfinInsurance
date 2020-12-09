package in.emithram.model.enumeration;

public enum Insured {

    SELF("Self"),SPOUSE("Spouse");

    private String value;

    Insured(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
