package in.emithram.model;

import in.emithram.model.enumeration.Gender;
import in.emithram.model.enumeration.Relationship;

import java.time.LocalDate;

public class FamilyMember {

    private Relationship relation;
    private LocalDate dateOfBirth;

    public Relationship getRelation() {
        return relation;
    }

    public void setRelation(Relationship relation) {
        this.relation = relation;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Override
    public String toString() {
        return "FamilyMember{" +
            "relationship=" + relation +
            ", dateOfBirth=" + dateOfBirth+
            '}';
    }
}
