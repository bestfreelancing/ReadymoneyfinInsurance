import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IHealthInsurance } from 'app/shared/model/health-insurance.model';
import { IMotorInsurance } from '../model/motor-insurance.model';
import { MotorAdditionalCover } from '../model/enumerations/motor-additional-cover.model';
import { MotorPolicyCoverage } from '../model/enumerations/motor-policy-coverage.model';
import { Relationship } from '../model/enumerations/relationship.model';
import { SumInsured } from '../model/enumerations/sum-insured.model';

@Injectable({ providedIn: 'root' })
export class InsuranceResourceService {
  public resourceUrl = SERVER_API_URL + 'api/insurance';

  constructor(protected http: HttpClient) {}

  public applyForHealthInsuranceUsingPOST(healthInsurance: IHealthInsurance): Observable<HttpResponse<IHealthInsurance>> {
    return this.http.post<IHealthInsurance>(this.resourceUrl + '/health', healthInsurance, { observe: 'response', reportProgress: true });
  }

  public applyForMotorInsuranceUsingPOST(motorInsurance: IMotorInsurance): Observable<HttpResponse<IMotorInsurance>> {
    return this.http.post<IMotorInsurance>(this.resourceUrl + '/motor', motorInsurance, { observe: 'response', reportProgress: true });
  }

  public getMotorAdditionalCoversUsingGET(): Observable<HttpResponse<MotorAdditionalCover[]>> {
    return this.http.get<MotorAdditionalCover[]>(this.resourceUrl + '/motor-additional-covers', { observe: 'response' });
  }

  public getMotorPolicyCoversUisngGET(): Observable<HttpResponse<MotorPolicyCoverage[]>> {
    return this.http.get<MotorPolicyCoverage[]>(this.resourceUrl + '/motor-policy-coverages', { observe: 'response' });
  }

  public getRelationshipsUsingGET(): Observable<HttpResponse<Relationship[]>> {
    return this.http.get<Relationship[]>(this.resourceUrl + '/relationships', { observe: 'response' });
  }

  public getSumInsuredListUsingGET(): Observable<HttpResponse<SumInsured[]>> {
    return this.http.get<SumInsured[]>(this.resourceUrl + '/sum-insured-list', { observe: 'response' });
  }

  public getOrderIdUsingGET(amount: string, receipt: string): Observable<HttpResponse<string>> {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'text',
      observe: 'response',
    };
    return this.http.get<HttpResponse<string>>(this.resourceUrl + '/get-order-id/' + amount + '/' + receipt, requestOptions);
  }
}
