import { Component, NgZone, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent, JhiAlertService } from 'ng-jhipster';

import { IMotorInsurance, MotorInsurance } from 'app/shared/model/motor-insurance.model';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDocumentUploader } from 'app/shared/model/document-uploader.model';
import { LocalInsuranceService } from 'app/shared/providers/insurance.service';
import { InsuranceResourceService } from 'app/shared/api/insurance-resource.service';
import { IRazorpayModel, razorpayOptions } from 'app/shared/model/razorpay-model';
import { PaymentService } from 'app/shared/providers/payment.service';

@Component({
  selector: 'jhi-motor',
  templateUrl: './motor-insurance.component.html',
  styleUrls: ['./motor-insurance.component.scss'],
})
export class MotorInsuranceComponent implements OnInit {
  paymentOptions: IRazorpayModel = razorpayOptions as IRazorpayModel;
  isSaving = false;
  documentuploaders: IDocumentUploader[] = [];
  ncbSlabs: number[] = [0, 20, 25, 35, 45, 50];

  editForm = this.fb.group({
    id: [],
    insuredName: [null, [Validators.required]],
    insuredAddress: [null, [Validators.required]],
    insuredPinCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    insuredPhone: [null, [Validators.required, Validators.pattern('^[6789][0-9]{9}$')]],
    insuredEmail: [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$')]],
    insureAmount: [null, [Validators.required, Validators.pattern('^[0-9]+\\.?[0-9]+$')]],
    rcBook: [null, [Validators.required]],
    rcBookContentType: [],
    insurance: [null, [Validators.required]],
    insuranceContentType: [],
    previousYearClaimDetails: [null, [Validators.required]],
    anyClaimInPreviousYear: [false, [Validators.required]],
    anyAccidentsInPreviousYear: [false, [Validators.required]],
    previousNcb: [null, [Validators.required]],
    currentNcb: [null, [Validators.required]],
    make: [null],
    model: [null],
    subModel: [null],
    policyCoverage: [null, [Validators.required]],
    additionalCoverNeeded: [null],
    documentUploader: this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$')]],
      phone: [null, [Validators.required, Validators.pattern('^[6789][0-9]{9}$')]],
      officeId: [null, [Validators.required]],
    }),
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected insuranceService: InsuranceResourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localInsuranceService: LocalInsuranceService,
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
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('readyfin.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    // window.history.back();
    // window.history.pushState(null, "motor-insurance", '/motor-insurance');
    // this.router.navigateByUrl('/motor-insurance');
    this.router.navigateByUrl('/motor-insurance');
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToPaymentInitiateResponse(
      this.insuranceService.getOrderIdUsingGET(
        this.editForm.get('insureAmount')!.value * 100 + '',
        'receipt_' + this.editForm.get('insuredPhone')!.value
      )
    );
    // this.checkoutPayment();

    // this.subscribeToSaveResponse(this.insuranceService.applyForMotorInsuranceUsingPOST(motorInsurance));
  }
  continueAfterSuccessfulPayment(response: any): void {
    const motorInsurance = this.createFromForm();
    motorInsurance.razorpayVerification = {
      signature: response.razorpay_signature,
      paymentId: response.razorpay_payment_id,
      orderId: this.paymentOptions['order_id'],
    };

    // eslint-disable-next-line no-console
    console.log('Motor insurance to be saved', motorInsurance);

    this.subscribeToSaveResponse(this.insuranceService.applyForMotorInsuranceUsingPOST(motorInsurance));
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
        this.router.navigateByUrl('/motor-insurance');
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

  private createFromForm(): IMotorInsurance {
    this.localInsuranceService.saveDocumentUploader(this.documentUploader);

    return {
      ...new MotorInsurance(),
      id: this.editForm.get(['id'])!.value,
      insuredName: this.editForm.get(['insuredName'])!.value,
      insuredAddress: this.editForm.get(['insuredAddress'])!.value,
      insuredPinCode: this.editForm.get(['insuredPinCode'])!.value,
      insuredPhone: this.editForm.get(['insuredPhone'])!.value,
      insuredEmail: this.editForm.get(['insuredEmail'])!.value,
      insureAmount: this.editForm.get(['insureAmount'])!.value,
      rcBookContentType: this.editForm.get(['rcBookContentType'])!.value,
      rcBook: this.editForm.get(['rcBook'])!.value,
      insuranceContentType: this.editForm.get(['insuranceContentType'])!.value,
      insurance: this.editForm.get(['insurance'])!.value,
      previousYearClaimDetails: this.editForm.get(['previousYearClaimDetails'])!.value,
      anyClaimInPreviousYear: this.editForm.get(['anyClaimInPreviousYear'])!.value,
      anyAccidentsInPreviousYear: this.editForm.get(['anyAccidentsInPreviousYear'])!.value,
      previousNcb: this.editForm.get(['previousNcb'])!.value,
      currentNcb: this.editForm.get(['currentNcb'])!.value,
      make: this.editForm.get(['make'])!.value,
      model: this.editForm.get(['model'])!.value,
      subModel: this.editForm.get(['subModel'])!.value,
      policyCoverage: this.editForm.get(['policyCoverage'])!.value,
      additionalCoverNeeded: this.editForm.get(['additionalCoverNeeded'])!.value,
      documentUploader: {
        email: this.documentUploader?.get('email')!.value,
        phone: this.documentUploader?.get('phone')!.value,
        officeId: this.documentUploader?.get('officeId')!.value,
      },
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotorInsurance>>): void {
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

  public calculateCurrentNcb(): void {
    const previousValue = this.editForm.get('previousNcb')!.value;

    const index = this.ncbSlabs.indexOf(Number.parseInt(previousValue, 10));
    const ncbSlabLastIndex = this.ncbSlabs.length - 1;

    // eslint-disable-next-line no-console
    console.log('current Ncb: previous value, index, cnbIndex', previousValue, index, ncbSlabLastIndex);

    if (index >= 0) {
      const currentValue =
        this.editForm.get('anyClaimInPreviousYear')!.value === true
          ? this.ncbSlabs[0]
          : index >= ncbSlabLastIndex
          ? this.ncbSlabs[ncbSlabLastIndex]
          : this.ncbSlabs[index + 1];

      // eslint-disable-next-line no-console
      console.log('current Ncb', currentValue);
      this.editForm.get('currentNcb')!.setValue(currentValue);
    }
  }
}
