import { Moment } from 'moment';
import { Relationship } from 'app/shared/model/enumerations/relationship.model';

export interface IFamilyMember {
  relation?: Relationship;
  dateOfBirth?: Moment;
}

export class FamilyMember implements IFamilyMember {
  constructor(public relation?: Relationship, public dateOfBirth?: Moment) {}
}
