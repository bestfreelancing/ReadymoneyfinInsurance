export interface IRazorpayVerification {
  signature?: string;
  orderId?: string;
  paymentId?: string;
}

export class RazorpayVerification implements IRazorpayVerification {
  constructor(public signature?: string, public orderId?: string, public paymentId?: string) {}
}
