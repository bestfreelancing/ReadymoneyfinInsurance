package in.emithram.model.enumeration;

public enum MotorPolicyCoverage {

    THIRD_PARTY("Third party"), BUMPER_TO_BUMPER("Bumper to bumper"), FULL_COVER("Full cover");

    private String value;


    MotorPolicyCoverage(String policyCoverage) {
        this.value = policyCoverage;
    }

    public String getValue() {
        return value;
    }
}
