import { SERVER_API_URL } from 'app/app.constants';

export interface IRazorpayModel {
  key?: string;
  description?: string;
  amount?: number;
  name?: string;
  currency?: string;
  image?: string;
  order_id?: string;
  handler?: any;
  modal?: {
    ondismiss?: any;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    address?: string;
  };
  theme?: {
    color: string;
  };
}

export const razorpayOptions = {
  key: 'rzp_test_fnBfiEz5tZiSS1', // Enter the Key ID generated from the Dashboard
  amount: 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: 'INR',
  description: 'Readymoneyfin insurance payment',
  image: SERVER_API_URL + '/content/images/logo.png',
  order_id: 'order_G50O8qQhVzFrpc', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  receipt: 'receipt_sample',
  handler(response: any): void {
    // eslint-disable-next-line no-console
    console.log('Payment successful', response);
  },
  modal: {
    ondismiss(): void {},
  },
  prefill: {
    name: 'Gaurav Kumar',
    email: 'gaurav.kumar@example.com',
    contact: '9999999999',
  },
  notes: {
    address: 'Readymoneyfin-Emithram',
  },
  theme: {
    color: '#2c3e50',
  },
};

export class RazorpayModel {}
