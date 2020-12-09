package in.emithram.model.enumeration;

public enum Gender {
    MALE("Male"),FEMALE("Female"),OTHER("Other");

    private String value;


    Gender(String gender) {
        this.value = gender;
    }

    public String getValue() {
        return value;
    }
}
