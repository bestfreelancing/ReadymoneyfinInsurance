package in.emithram.model;

public class RazorpayVerification {

    private String signature, orderId, paymentId;

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    @Override
    public String toString() {
        return "RazorpayVerification{" +
            "signature='" + signature + '\'' +
            ", orderId='" + orderId + '\'' +
            ", paymentId='" + paymentId + '\'' +
            '}';
    }
}
