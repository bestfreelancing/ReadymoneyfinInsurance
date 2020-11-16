import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError } from 'ng-jhipster';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.scss'],
})
export class MotorComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    rcBook: [],
    rcBookContentType: [],
    policyType: [],
    additionalCover: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ insurance }) => {
      this.updateForm(insurance);
    });
  }

  updateForm(insurance: any): void {
    this.editForm.patchValue({
      id: insurance.id,
      rcBook: insurance.rcBook,
      rcBookContentType: insurance.rcBookContentType,
      policyType: insurance.policyType,
      additionalCover: insurance.additionalCover,
    });
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
        new JhiEventWithContent<AlertError>('blobEnumApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const insurance = this.createFromForm();
    /*if (insurance.id !== undefined) {
      this.subscribeToSaveResponse(this.insuranceService.update(insurance));
    } else {
      this.subscribeToSaveResponse(this.insuranceService.create(insurance));
    }*/
  }

  private createFromForm(): any | null {
    /*     return {
          ...new Insurance(),
          id: this.editForm.get(['id'])!.value,
          rcBookContentType: this.editForm.get(['rcBookContentType'])!.value,
          rcBook: this.editForm.get(['rcBook'])!.value,
          policyType: this.editForm.get(['policyType'])!.value,
          additionalCover: this.editForm.get(['additionalCover'])!.value,
        }; */
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
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
}
