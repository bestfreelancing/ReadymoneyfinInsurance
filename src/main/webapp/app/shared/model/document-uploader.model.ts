export interface IDocumentUploader {
  email?: string;
  phone?: string;
  centerId?: string;
}

export class DocumentUploader implements IDocumentUploader {
  constructor(public email?: string, public phone?: string, public centerId?: string) {}
}
