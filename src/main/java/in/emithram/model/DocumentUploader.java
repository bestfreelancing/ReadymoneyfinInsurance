package in.emithram.model;

import javax.validation.constraints.Pattern;

public class DocumentUploader {

    @Pattern(regexp = "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$")
    private String email;

    @Pattern(regexp = "^[6789][0-9]{9}+$")
    private String phone;

    private String centerId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCenterId() {
        return centerId;
    }

    public void setCenterId(String centerId) {
        this.centerId = centerId;
    }

    @Override
    public String toString() {
        return "DocumentUploader{" +
            "email='" + email + '\'' +
            ", phone='" + phone + '\'' +
            ", officeId='" + centerId + '\'' +
            '}';
    }
}
