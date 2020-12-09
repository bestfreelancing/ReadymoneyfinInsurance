import { Component, NgZone, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent, JhiAlertService } from 'ng-jhipster';

import { IHealthInsurance, HealthInsurance } from 'app/shared/model/health-insurance.model';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDocumentUploader } from 'app/shared/model/document-uploader.model';
import { FamilyMember } from 'app/shared/model/family-member.model';
import { LocalInsuranceService } from 'app/shared/providers/insurance.service';
import { InsuranceResourceService } from 'app/shared/api/insurance-resource.service';
import { PaymentService } from 'app/shared/providers/payment.service';
import { IRazorpayModel, razorpayOptions } from 'app/shared/model/razorpay-model';

@Component({
  selector: 'jhi-health',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.scss'],
})
export class HealthInsuranceComponent implements OnInit {
  isSaving = false;
  documentuploaders: IDocumentUploader[] = [];
  paymentOptions: IRazorpayModel = razorpayOptions as IRazorpayModel;

  editForm = this.fb.group({
    id: [],
    insuredName: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    insuredAddress: [null, [Validators.required]],
    insuredPinCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    insuredPhone: [null, [Validators.required, Validators.pattern('^[6789][0-9]{9}$')]],
    insuredEmail: [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$')]],
    insureAmount: [null, [Validators.required, Validators.pattern('^[0-9]+\\.?[0-9]+$')]],
    adhar: [null, [Validators.required]],
    adharContentType: [],
    insured: [null, [Validators.required]],
    married: [false, [Validators.required]],
    sumInsured: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    anyoneSmokesInTheFamily: [false, [Validators.required]],
    documentUploader: this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$')]],
      phone: [null, [Validators.required, Validators.pattern('^[6789][0-9]{9}$')]],
      officeId: [null, [Validators.required]],
    }),
    familyMembers: this.fb.array([]),
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localInsuranceService: LocalInsuranceService,
    private insuranceService: InsuranceResourceService,
    private router: Router,
    private paymentService: PaymentService,
    private zone: NgZone,
    private alertService: JhiAlertService
  ) {}

  ngOnInit(): void {
    const storedData = this.localInsuranceService.getDocumentUploader();
    this.documentUploader?.patchValue(storedData);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    // eslint-disable-next-line no-console
    console.log('image upload event', event);

    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('blobEnumApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    // window.history.back();
    this.router.navigateByUrl('/health-insurance');
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToPaymentInitiateResponse(
      this.insuranceService.getOrderIdUsingGET(
        this.editForm.get('insureAmount')!.value * 100 + '',
        'receipt_' + this.editForm.get('insuredPhone')!.value
      )
    );
    // this.subscribeToSaveResponse(this.insuranceService.applyForHealthInsuranceUsingPOST(healthInsurance));
  }

  continueAfterSuccessfulPayment(response: any): void {
    const healthInsurance = this.createFromForm();
    healthInsurance.razorpayVerification = {
      signature: response.razorpay_signature,
      paymentId: response.razorpay_payment_id,
      orderId: this.paymentOptions['order_id'],
    };

    // eslint-disable-next-line no-console
    console.log('Health insurance to be saved', healthInsurance);

    this.subscribeToSaveResponse(this.insuranceService.applyForHealthInsuranceUsingPOST(healthInsurance));
  }

  checkoutPayment(orderId: string | null): void {
    // eslint-disable-next-line no-console
    console.log('Ordern id from server: ', orderId);
    this.paymentOptions.amount = this.editForm.get(['insureAmount'])!.value * 100;
    this.paymentOptions.prefill!.name = this.editForm.get(['insuredName'])!.value;
    this.paymentOptions.prefill!.email = this.documentUploader?.get('email')!.value;
    this.paymentOptions.prefill!.contact = this.documentUploader?.get('phone')!.value;
    this.paymentOptions['order_id'] = orderId ? orderId : undefined;
    this.paymentOptions.handler = (response: any) => {
      this.zone.run(() => {
        // eslint-disable-next-line no-console
        console.log('Payment successful', response);
        this.continueAfterSuccessfulPayment(response);
      });
    };
    this.paymentOptions.modal!.ondismiss = () => {
      this.zone.run(() => {
        this.isSaving = false;
        this.router.navigateByUrl('/health-insurance');
      });
    };

    const rzp1 = new this.paymentService.nativeWindow['Razorpay'](this.paymentOptions);
    rzp1.open();
    rzp1.on('payment.failed', (response: any) => {
      this.zone.run(() => {
        // eslint-disable-next-line no-console
        console.info('Payment failed', response);
        this.alertService.error('error.payment');
        this.isSaving = false;
      });
    });
  }

  private createFromForm(): IHealthInsurance {
    this.localInsuranceService.saveDocumentUploader(this.documentUploader);

    const familyMembersArray: FamilyMember[] = [];

    this.familyMembers?.controls.map(e => {
      familyMembersArray.push(new FamilyMember(e.get('relation')!.value, e.get('dateOfBirth')!.value));
    });

    return {
      ...new HealthInsurance(),
      id: this.editForm.get(['id'])!.value,
      insuredName: this.editForm.get(['insuredName'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value,
      insuredAddress: this.editForm.get(['insuredAddress'])!.value,
      insuredPinCode: this.editForm.get(['insuredPinCode'])!.value,
      insuredPhone: this.editForm.get(['insuredPhone'])!.value,
      insuredEmail: this.editForm.get(['insuredEmail'])!.value,
      insureAmount: this.editForm.get(['insureAmount'])!.value,
      adharContentType: this.editForm.get(['adharContentType'])!.value,
      adhar: this.editForm.get(['adhar'])!.value,
      insured: this.editForm.get(['insured'])!.value,
      married: this.editForm.get(['married'])!.value,
      sumInsured: this.editForm.get(['sumInsured'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      anyoneSmokesInTheFamily: this.editForm.get(['anyoneSmokesInTheFamily'])!.value,
      documentUploader: {
        email: this.documentUploader?.get('email')!.value,
        phone: this.documentUploader?.get('phone')!.value,
        officeId: this.documentUploader?.get('officeId')!.value,
      },
      familyMembers: familyMembersArray,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHealthInsurance>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected subscribeToPaymentInitiateResponse(result: Observable<HttpResponse<string>>): void {
    // eslint-disable-next-line no-console
    console.info('Subscribing to order id', result);
    result.subscribe(
      (data: HttpResponse<string>) => this.checkoutPayment(data.body),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  /*   trackById(index: number, item: IDocumentUploader): any {
      return item.id;
    } */

  get documentUploader(): AbstractControl | null {
    return this.editForm.get('documentUploader');
  }

  get familyMembers(): FormArray | null {
    return this.editForm?.get('familyMembers') as FormArray;
  }

  public addFamilyMember(): void {
    this.familyMembers!.push(
      this.fb.group({
        relation: [null, [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
      })
    );
    // eslint-disable-next-line no-console
    console.log('add family member', this.familyMembers?.controls);
  }

  public removeFamilyMember(index: number): void {
    // eslint-disable-next-line no-console
    console.log('deleting family member at index:', index, this.familyMembers?.controls[index]);
    this.familyMembers?.controls.splice(index, 1);
  }
}
