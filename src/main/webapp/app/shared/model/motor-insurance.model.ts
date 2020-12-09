import { IDocumentUploader } from 'app/shared/model/document-uploader.model';
import { MotorPolicyCoverage } from 'app/shared/model/enumerations/motor-policy-coverage.model';
import { MotorAdditionalCover } from 'app/shared/model/enumerations/motor-additional-cover.model';
import { IRazorpayVerification } from './razorpay-verification-model';

export interface IMotorInsurance {
  id?: number;
  insuredName?: string;
  insuredAddress?: string;
  insuredPinCode?: string;
  insuredPhone?: string;
  insuredEmail?: string;
  insureAmount?: string;
  rcBookContentType?: string;
  rcBook?: any;
  insuranceContentType?: string;
  insurance?: any;
  previousYearClaimDetails?: string;
  anyClaimInPreviousYear?: boolean;
  anyAccidentsInPreviousYear?: boolean;
  previousNcb?: number;
  currentNcb?: number;
  make?: string;
  model?: string;
  subModel?: string;
  policyCoverage?: MotorPolicyCoverage;
  additionalCoverNeeded?: MotorAdditionalCover;
  documentUploader?: IDocumentUploader;
  razorpayVerification?: IRazorpayVerification;
}

export class MotorInsurance implements IMotorInsurance {
  constructor(
    public id?: number,
    public insuredName?: string,
    public insuredAddress?: string,
    public insuredPinCode?: string,
    public insuredPhone?: string,
    public insuredEmail?: string,
    public insureAmount?: string,
    public rcBookContentType?: string,
    public rcBook?: any,
    public insuranceContentType?: string,
    public insurance?: any,
    public previousYearClaimDetails?: string,
    public anyClaimInPreviousYear?: boolean,
    public anyAccidentsInPreviousYear?: boolean,
    public previousNcb?: number,
    public currentNcv?: number,
    public make?: string,
    public model?: string,
    public subModel?: string,
    public policyCoverage?: MotorPolicyCoverage,
    public additionalCoverNeeded?: MotorAdditionalCover,
    public documentUploader?: IDocumentUploader,
    public razorpayVerification?: IRazorpayVerification
  ) {
    this.anyClaimInPreviousYear = this.anyClaimInPreviousYear || false;
    this.anyAccidentsInPreviousYear = this.anyAccidentsInPreviousYear || false;
  }
}
