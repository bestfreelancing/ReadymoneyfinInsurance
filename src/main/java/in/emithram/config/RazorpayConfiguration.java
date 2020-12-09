package in.emithram.config;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfiguration {

    Logger log = LoggerFactory.getLogger(RazorpayConfiguration.class);

    @Value("${payment.razorpay.key}")
    private String key;
    @Value("${payment.razorpay.secret}")
    private String secret;

    @Bean
    public RazorpayClient getRazorpayClientBean() throws RazorpayException {
        log.debug("creating razorpay bean, key: {} and secret: {}",key,secret);
        return new RazorpayClient(key,secret);
    }
}
