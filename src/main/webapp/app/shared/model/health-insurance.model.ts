import { IFamilyMember } from 'app/shared/model/family-member.model';
import { IDocumentUploader } from 'app/shared/model/document-uploader.model';
import { Insured } from 'app/shared/model/enumerations/insured.model';
import { SumInsured } from 'app/shared/model/enumerations/sum-insured.model';
import { Gender } from './enumerations/gender.model';
import { Moment } from 'moment';
import { IRazorpayVerification } from './razorpay-verification-model';

export interface IHealthInsurance {
  id?: number;
  insuredName?: string;
  dateOfBirth?: Moment;
  insuredAddress?: string;
  insuredPinCode?: string;
  insuredPhone?: string;
  insuredEmail?: string;
  insureAmount?: string;
  adharContentType?: string;
  adhar?: any;
  insured?: Insured;
  married?: boolean;
  sumInsured?: SumInsured;
  gender?: Gender;
  anyoneSmokesInTheFamily?: boolean;
  familyMembers?: IFamilyMember[];
  documentUploader?: IDocumentUploader;
  razorpayVerification?: IRazorpayVerification;
  anyPreExistingIllness?: boolean;
  illnessDetails?: string;
}

export class HealthInsurance implements IHealthInsurance {
  constructor(
    public id?: number,
    public insuredName?: string,
    public dateOfBirth?: Moment,
    public insuredAddress?: string,
    public insuredPinCode?: string,
    public insuredPhone?: string,
    public insuredEmail?: string,
    public insureAmount?: string,
    public adharContentType?: string,
    public adhar?: any,
    public insured?: Insured,
    public married?: boolean,
    public sumInsured?: SumInsured,
    public gender?: Gender,
    public anyoneSmokesInTheFamily?: boolean,
    public familyMembers?: IFamilyMember[],
    public documentUploader?: IDocumentUploader,
    public razorpayVerification?: IRazorpayVerification,
    public anyPreExistingIllness?: boolean,
    public illnessDetails?: string
  ) {
    this.married = this.married || false;
    this.anyoneSmokesInTheFamily = this.anyoneSmokesInTheFamily || false;
  }
}
