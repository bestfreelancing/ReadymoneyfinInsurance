package in.emithram.service.mail;

import in.emithram.model.HealthInsurance;
import in.emithram.model.Insurance;
import in.emithram.model.MotorInsurance;
import io.github.jhipster.config.JHipsterProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayInputStream;
import java.util.Locale;

@Service
public class MotorInsuranceMailService extends InsuranceMailService {

    Logger log = LoggerFactory.getLogger(MotorInsurance.class);

    @Value("${application.insurance.motor-insurance.template}")
    private String template;

    public MotorInsuranceMailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender, MessageSource messageSource, SpringTemplateEngine templateEngine) {
        super(jHipsterProperties, javaMailSender, messageSource, templateEngine);
    }

    @Async
    public void sendMail(Insurance insurance) {
        MotorInsurance motorInsurance = (MotorInsurance) insurance;
        Locale locale = Locale.forLanguageTag("en");
        Context context = new Context(locale);
        context.setVariable("insurance", motorInsurance);
        log.info("template for motor insurance: {}", template);
        MimeMessageHelper messageHelper = sendEmailFromTemplate(context,motorInsurance,template,"motor-insurance.title");
        try {
            if(messageHelper != null) {
/*                messageHelper.addAttachment("rc-book-"+motorInsurance.getInsuredPhone(),
                    new InputStreamResource(new ByteArrayInputStream(motorInsurance.getRcBook())),
                    motorInsurance.getRcBookContentType());*/
                messageHelper.addAttachment("rc-book-"+motorInsurance.getInsuredPhone(),
                    new ByteArrayDataSource(motorInsurance.getRcBook(),motorInsurance.getRcBookContentType()));

                messageHelper.addAttachment("insurance-"+motorInsurance.getInsuredPhone(),
                    new ByteArrayDataSource(motorInsurance.getInsurance(), motorInsurance.getInsuranceContentType()));

                javaMailSender.send(messageHelper.getMimeMessage());
            }
        }
        catch (MailException | MessagingException e) {
            e.printStackTrace();
        }
    }
}
