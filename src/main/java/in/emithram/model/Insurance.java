package in.emithram.model;

import javax.validation.constraints.Pattern;

public class Insurance {

    protected DocumentUploader documentUploader;

    protected String insuredName;
    protected String insuredAddress;

    @Pattern(regexp = "^[0-9]{6}+$")
    protected String insuredPinCode;

    @Pattern(regexp = "^[6789][0-9]{9}+$")
    protected String insuredPhone;

    @Pattern(regexp = "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$")
    protected String insuredEmail;

    @Pattern(regexp = "^[0-9]+\\.?[0-9]+$")
    protected String insureAmount;

    protected RazorpayVerification razorpayVerification;

    public String getInsuredName() {
        return insuredName;
    }

    public void setInsuredName(String insuredName) {
        this.insuredName = insuredName;
    }

    public String getInsuredAddress() {
        return insuredAddress;
    }

    public void setInsuredAddress(String insuredAddress) {
        this.insuredAddress = insuredAddress;
    }

    public String getInsuredPinCode() {
        return insuredPinCode;
    }

    public void setInsuredPinCode(String insuredPinCode) {
        this.insuredPinCode = insuredPinCode;
    }

    public String getInsuredPhone() {
        return insuredPhone;
    }

    public void setInsuredPhone(String insuredPhone) {
        this.insuredPhone = insuredPhone;
    }

    public String getInsuredEmail() {
        return insuredEmail;
    }

    public void setInsuredEmail(String insuredEmail) {
        this.insuredEmail = insuredEmail;
    }

    public DocumentUploader getDocumentUploader() {
        return documentUploader;
    }

    public void setDocumentUploader(DocumentUploader documentUploader) {
        this.documentUploader = documentUploader;
    }

    public String getInsureAmount() {
        return insureAmount;
    }

    public void setInsureAmount(String insureAmount) {
        this.insureAmount = insureAmount;
    }

    public RazorpayVerification getRazorpayVerification() {
        return razorpayVerification;
    }

    public void setRazorpayVerification(RazorpayVerification razorpayVerification) {
        this.razorpayVerification = razorpayVerification;
    }

    @Override
    public String toString() {
        return "Insurance{" +
            "documentUploader=" + documentUploader +
            ", insuredName='" + insuredName + '\'' +
            ", insuredAddress='" + insuredAddress + '\'' +
            ", insuredPinCode='" + insuredPinCode + '\'' +
            ", insuredPhone='" + insuredPhone + '\'' +
            ", insuredEmail='" + insuredEmail + '\'' +
            ", insureAmount='" + insureAmount + '\'' +
            ", razorpayVerification=" + razorpayVerification +
            '}';
    }
}
