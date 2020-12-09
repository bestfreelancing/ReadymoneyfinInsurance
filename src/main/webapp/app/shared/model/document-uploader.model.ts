export interface IDocumentUploader {
  email?: string;
  phone?: string;
  officeId?: string;
}

export class DocumentUploader implements IDocumentUploader {
  constructor(public email?: string, public phone?: string, public officeId?: string) {}
}
