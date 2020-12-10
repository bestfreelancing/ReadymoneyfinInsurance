package in.emithram.web.rest;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import in.emithram.model.HealthInsurance;
import in.emithram.model.Insurance;
import in.emithram.model.MotorInsurance;
import in.emithram.model.enumeration.MotorAdditionalCover;
import in.emithram.model.enumeration.MotorPolicyCoverage;
import in.emithram.model.enumeration.Relationship;
import in.emithram.model.enumeration.SumInsured;
import in.emithram.service.mail.InsuranceMailService;
import in.emithram.service.payment.PaymentService;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("api/insurance")
public class InsuranceResource {

    private Logger logger = LoggerFactory.getLogger(InsuranceResource.class);


    @Autowired
    private InsuranceMailService healthInsuranceMailService;

    @Autowired
    private InsuranceMailService motorInsuranceMailService;

    @Autowired
    private PaymentService razorpayPaymentService;

    @PostMapping("/motor")
    public ResponseEntity<Insurance> applyForMotorInsurance(@Valid @RequestBody MotorInsurance motorInsurance) throws URISyntaxException, PaymentVerificationFailedException {

        logger.debug("New application for motor insurance {}", motorInsurance);

        if(motorInsurance.getRazorpayVerification()!= null && razorpayPaymentService.verifyPayment(motorInsurance.getRazorpayVerification())!=true) {
            throw new PaymentVerificationFailedException("Payment verification failed","readymoneyfin","Signature not matched");
        }

        this.motorInsuranceMailService.sendMail(motorInsurance);

        return ResponseEntity.created(new URI("/insurance/motor/" + motorInsurance.getInsuredEmail()))
            .headers(HeaderUtil.createEntityCreationAlert("readymoneyfin", true, "motorInsurance", motorInsurance.getMake()+" "+motorInsurance.getModel()))
            .body(motorInsurance);
    }

    @PostMapping("/health")
    public ResponseEntity<Insurance> applyForHealthInsurance(@Valid @RequestBody HealthInsurance healthInsurance) throws URISyntaxException {

        logger.debug("New application for health insurance {}", healthInsurance);

        if(healthInsurance.getRazorpayVerification() != null && razorpayPaymentService.verifyPayment(healthInsurance.getRazorpayVerification())!=true) {
            throw new PaymentVerificationFailedException("Payment verification failed","readymoneyfin","Signature not matched");
        }

        this.healthInsuranceMailService.sendMail(healthInsurance);

        return ResponseEntity.created(new URI("/insurance/motor/" + healthInsurance.getInsuredEmail()))
            .headers(HeaderUtil.createEntityCreationAlert("readymoneyfin", true, "healthInsurance", healthInsurance.getInsuredName()))
            .body(healthInsurance);
    }

    @GetMapping("/motor-additional-covers")
    public ResponseEntity<List<MotorAdditionalCover>> getMotorAdditionalCovers() {
        List<MotorAdditionalCover> motorAdditionalCoverList = Arrays.asList(MotorAdditionalCover.values());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Total values", String.valueOf(motorAdditionalCoverList.size()));
        return ResponseEntity.ok().headers(headers).body(motorAdditionalCoverList);
    }

    @GetMapping("/motor-policy-coverages")
    public ResponseEntity<List<MotorPolicyCoverage>> getMotorPolicyCoverages() {
        List<MotorPolicyCoverage> motorPolicyCoverageList = Arrays.asList(MotorPolicyCoverage.values());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Total values", String.valueOf(motorPolicyCoverageList.size()));
        return ResponseEntity.ok().headers(headers).body(motorPolicyCoverageList);
    }

    @GetMapping("/relationships")
    public ResponseEntity<List<Relationship>> getRelationships() {
        List<Relationship> relationships = Arrays.asList(Relationship.values());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Total values", String.valueOf(relationships.size()));
        return ResponseEntity.ok().headers(headers).body(relationships);
    }

    @GetMapping("/sum-insured-list")
    public ResponseEntity<List<SumInsured>> getMotorSumInsuredList() {
        List<SumInsured> sumInsuredList = Arrays.asList(SumInsured.values());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Total values", String.valueOf(sumInsuredList.size()));
        return ResponseEntity.ok().headers(headers).body(sumInsuredList);
    }

    @GetMapping("/get-order-id/{amount}/{receipt}")
    public ResponseEntity<String> getOrderId(@PathVariable String amount, String receipt) throws RazorpayException {
        logger.debug("Getting payment order id=> amount: {}, receipt: {}",amount,receipt);
        Order order =razorpayPaymentService.initiatePayment(amount,receipt);
        String id = order.get("id").toString();
        return ResponseEntity.ok().body(id);
    }

}

class PaymentVerificationFailedException extends AbstractThrowableProblem {

    public PaymentVerificationFailedException(String defaultMessage, String entityName, String errorKey) {
        super(null,defaultMessage, Status.BAD_REQUEST, null,null,null,getAlertParameters(entityName, errorKey));
    }
    private static Map<String, Object> getAlertParameters(String entityName, String errorKey) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("message", "error." + errorKey);
        parameters.put("params", entityName);
        return parameters;
    }
}
