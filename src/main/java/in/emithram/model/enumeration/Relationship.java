package in.emithram.model.enumeration;

public enum Relationship {
    FATHER("Father"),MOTHER("Mother"),DAUGHTER("Daughter"),SON("Son"),SISTER("Sister"),
    BROTHER("Brother"),GRANDFATHER("Grandfather"),GRANDMOTHER("Grandmother"),WIFE("Wife"),
    HUSBAND("Husband");

    private String value;


    Relationship(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
