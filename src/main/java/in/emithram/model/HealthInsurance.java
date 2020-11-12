package in.emithram.model;

import in.emithram.model.enumeration.Insured;
import in.emithram.model.enumeration.SumInsured;

import java.util.List;

public class HealthInsurance {

    private Insured insured;
    private Boolean married;
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
}
