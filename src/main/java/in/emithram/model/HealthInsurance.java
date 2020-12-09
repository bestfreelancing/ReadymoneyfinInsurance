package in.emithram.model;

import in.emithram.model.enumeration.Gender;
import in.emithram.model.enumeration.Insured;
import in.emithram.model.enumeration.SumInsured;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class HealthInsurance extends Insurance {


    private byte[] adhar;
    private String adharContentType;

    private Insured insured;
    private Boolean married;
    private Gender gender;
    private LocalDate dateOfBirth;
    private SumInsured sumInsured;
    private List<FamilyMember> familyMembers;
    private Boolean anyoneSmokesInTheFamily;

    public Insured getInsured() {
        return insured;
    }

    public void setInsured(Insured insured) {
        this.insured = insured;
    }

    public Boolean getMarried() {
        return married;
    }

    public void setMarried(Boolean married) {
        this.married = married;
    }

    public SumInsured getSumInsured() {
        return sumInsured;
    }

    public void setSumInsured(SumInsured sumInsured) {
        this.sumInsured = sumInsured;
    }

    public List<FamilyMember> getFamilyMembers() {
        return familyMembers;
    }

    public void setFamilyMembers(List<FamilyMember> familyMembers) {
        this.familyMembers = familyMembers;
    }

    public Boolean getAnyoneSmokesInTheFamily() {
        return anyoneSmokesInTheFamily;
    }

    public void setAnyoneSmokesInTheFamily(Boolean anyoneSmokesInTheFamily) {
        this.anyoneSmokesInTheFamily = anyoneSmokesInTheFamily;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public byte[] getAdhar() {
        return adhar;
    }

    public void setAdhar(byte[] adhar) {
        this.adhar = adhar;
    }

    public String getAdharContentType() {
        return adharContentType;
    }

    public void setAdharContentType(String adharContentType) {
        this.adharContentType = adharContentType;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public String toString() {
        return "HealthInsurance{" +
            ", adharContentType='" + adharContentType + '\'' +
            ", insured=" + insured +
            ", married=" + married +
            ", gender=" + gender +
            ", dateOfBirth=" + dateOfBirth +
            ", sumInsured=" + sumInsured +
            ", familyMembers=" + familyMembers +
            ", anyoneSmokesInTheFamily=" + anyoneSmokesInTheFamily +
            ", documentUploader=" + documentUploader +
            ", insuredName='" + insuredName + '\'' +
            ", insuredAddress='" + insuredAddress + '\'' +
            ", insuredPinCode='" + insuredPinCode + '\'' +
            ", insuredPhone='" + insuredPhone + '\'' +
            ", insuredEmail='" + insuredEmail + '\'' +
            ", insureAmount='" + insureAmount + '\'' +
            '}';
    }
}
