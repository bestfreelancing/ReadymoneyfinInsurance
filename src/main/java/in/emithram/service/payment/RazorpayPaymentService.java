package in.emithram.service.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.emithram.model.RazorpayVerification;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.SignatureException;

@Service
public class RazorpayPaymentService implements PaymentService {

    Logger logger = LoggerFactory.getLogger(RazorpayPaymentService.class);

    @Autowired
    RazorpayClient razorpayClient;

    @Value("${payment.razorpay.secret}")
    private String secretKey;

    private String HMAC_SHA256_ALGORITHM = "HmacSHA256";

    @Override
    public Order initiatePayment(String amount, String receipt) throws RazorpayException {

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount); // amount in the smallest currency unit
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receipt);

        Order order = razorpayClient.Orders.create(orderRequest);
        logger.debug("Payment order created {}",order);
        return order;
    }

    @Override
    public Boolean verifyPayment(RazorpayVerification razorpayVerification) {

        logger.debug("Payment to be verified {}",razorpayVerification);
        try {
            String signature = calculateRFC2104HMAC(razorpayVerification.getOrderId()+"|"+razorpayVerification.getPaymentId());
            logger.debug("Matching signature {} with server generated {}",razorpayVerification.getSignature(),
                signature);
                return (signature.equals(razorpayVerification.getSignature()));
        } catch (SignatureException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * Computes RFC 2104-compliant HMAC signature.
     * * @param data
     * The data to be signed.
     * @return
     * The Base64-encoded RFC 2104-compliant HMAC signature.
     * @throws
     * java.security.SignatureException when signature generation fails
     */
    private String calculateRFC2104HMAC(String data)
        throws java.security.SignatureException
    {
        String result;
        try {

            // get an hmac_sha256 key from the raw secret bytes
            SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(), HMAC_SHA256_ALGORITHM);

            // get an hmac_sha256 Mac instance and initialize with the signing key
            Mac mac = Mac.getInstance(HMAC_SHA256_ALGORITHM);
            mac.init(signingKey);

            // compute the hmac on input data bytes
            byte[] rawHmac = mac.doFinal(data.getBytes());

            // base64-encode the hmac
            result = DatatypeConverter.printHexBinary(rawHmac).toLowerCase();

        } catch (Exception e) {
            throw new SignatureException("Failed to generate HMAC : " + e.getMessage());
        }
        return result;
    }
}
