package in.emithram.service.mail;

import in.emithram.model.HealthInsurance;
import in.emithram.model.Insurance;
import io.github.jhipster.config.JHipsterProperties;
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
public class HealthInsuranceMailService extends InsuranceMailService{

    @Value("${application.insurance.health-insurance.template}")
    private String template;

    public HealthInsuranceMailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender, MessageSource messageSource, SpringTemplateEngine templateEngine) {
        super(jHipsterProperties, javaMailSender, messageSource, templateEngine);
    }

    @Async
    public void sendMail(Insurance insurance) {
        HealthInsurance healthInsurance = (HealthInsurance) insurance;
        Locale locale = Locale.forLanguageTag("en");
        Context context = new Context(locale);
        context.setVariable("insurance",healthInsurance);
        MimeMessageHelper messageHelper = sendEmailFromTemplate(context,healthInsurance,template,"health-insurance.title");
        try {
            if(messageHelper != null) {
                messageHelper.addAttachment("adhar-"+healthInsurance.getInsuredPhone(),
                    new ByteArrayDataSource(healthInsurance.getAdhar(), healthInsurance.getAdharContentType()));

                javaMailSender.send(messageHelper.getMimeMessage());
            }
        }
        catch (MailException | MessagingException e) {
            e.printStackTrace();
        }
    }
}
