import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { DocumentUploader } from '../model/document-uploader.model';

@Injectable({
  providedIn: 'root',
})
export class LocalInsuranceService {
  constructor(private storage: LocalStorageService) {}

  public getDocumentUploader(): DocumentUploader {
    return new DocumentUploader(this.storage.retrieve('email'), this.storage.retrieve('phone'), this.storage.retrieve('officeId'));
  }

  public saveDocumentUploader(documentUploader?: AbstractControl | null): void {
    if (documentUploader) {
      this.storage.store('email', documentUploader?.get('email')!.value);
      this.storage.store('phone', documentUploader?.get('phone')!.value);
      this.storage.store('officeId', documentUploader?.get('officeId')!.value);
    }
  }
}
