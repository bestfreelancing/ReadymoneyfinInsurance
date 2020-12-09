package in.emithram.model.enumeration;

public enum MotorAdditionalCover {

    HIGHWAY_ASSISTANCE("Highway Assistance"), ENGINE_PROTECTION("Engine Protection"), OTHER("Other");

    private String value;


    MotorAdditionalCover(String value) {
        this.value = value;
    }


    public String getValue() {
        return value;
    }
}
