package in.emithram.model;

import in.emithram.model.enumeration.MotorAdditionalCover;
import in.emithram.model.enumeration.MotorPolicyCoverage;
import in.emithram.model.enumeration.SumInsured;

public class MotorInsurance extends Insurance {

    private String previousYearClaimDetails;
    private Boolean anyClaimInPreviousYear;
    private Boolean anyAccidentsInPreviousYear;
    private Integer previousNcv;
    private Integer currentNcv;
    private String make;
    private String model;
    private String subModel;
    private MotorPolicyCoverage policyCoverage;
    private MotorAdditionalCover additionalCoverNeeded;

    public String getPreviousYearClaimDetails() {
        return previousYearClaimDetails;
    }

    public void setPreviousYearClaimDetails(String previousYearClaimDetails) {
        this.previousYearClaimDetails = previousYearClaimDetails;
    }

    public Boolean getAnyClaimInPreviousYear() {
        return anyClaimInPreviousYear;
    }

    public void setAnyClaimInPreviousYear(Boolean anyClaimInPreviousYear) {
        this.anyClaimInPreviousYear = anyClaimInPreviousYear;
    }

    public Boolean getAnyAccidentsInPreviousYear() {
        return anyAccidentsInPreviousYear;
    }

    public void setAnyAccidentsInPreviousYear(Boolean anyAccidentsInPreviousYear) {
        this.anyAccidentsInPreviousYear = anyAccidentsInPreviousYear;
    }

    public Integer getPreviousNcv() {
        return previousNcv;
    }

    public void setPreviousNcv(Integer previousNcv) {
        this.previousNcv = previousNcv;
    }

    public Integer getCurrentNcv() {
        return currentNcv;
    }

    public void setCurrentNcv(Integer currentNcv) {
        this.currentNcv = currentNcv;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSubModel() {
        return subModel;
    }

    public void setSubModel(String subModel) {
        this.subModel = subModel;
    }

    public MotorPolicyCoverage getPolicyCoverage() {
        return policyCoverage;
    }

    public void setPolicyCoverage(MotorPolicyCoverage policyCoverage) {
        this.policyCoverage = policyCoverage;
    }

    public MotorAdditionalCover getAdditionalCoverNeeded() {
        return additionalCoverNeeded;
    }

    public void setAdditionalCoverNeeded(MotorAdditionalCover additionalCoverNeeded) {
        this.additionalCoverNeeded = additionalCoverNeeded;
    }
}
