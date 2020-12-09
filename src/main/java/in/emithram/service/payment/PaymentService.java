package in.emithram.service.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import in.emithram.model.RazorpayVerification;

public interface PaymentService {
    Order initiatePayment(String amount, String receipt) throws RazorpayException;

    Boolean verifyPayment(RazorpayVerification razorpayVerification);
}
