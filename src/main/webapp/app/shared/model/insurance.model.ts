import { Insured } from 'app/shared/model/enumerations/insured.model';
import { MotorAdditionalCover } from 'app/shared/model/enumerations/motor-additional-cover.model';

export interface IInsurance {
  id?: number;
  rcBookContentType?: string;
  rcBook?: any;
  policyType?: Insured;
  additionalCover?: MotorAdditionalCover;
}

export class Insurance implements IInsurance {
  constructor(
    public id?: number,
    public rcBookContentType?: string,
    public rcBook?: any,
    public policyType?: Insured,
    public additionalCover?: MotorAdditionalCover
  ) {}
}
