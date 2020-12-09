package in.emithram.service.mail;

import in.emithram.model.Insurance;
import io.github.jhipster.config.JHipsterProperties;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@PropertySource({"classpath:config/application-dev.yml","classpath:config/application-prod.yml"})
public abstract class InsuranceMailService {

    private final Logger log = LoggerFactory.getLogger(InsuranceMailService.class);

    protected static final String USER = "user";

    protected static final String BASE_URL = "baseUrl";

    protected final JHipsterProperties jHipsterProperties;

    protected final JavaMailSender javaMailSender;

    protected final MessageSource messageSource;

    protected final SpringTemplateEngine templateEngine;

    protected List<String> recipients;

    @Value("${application.insurance.recipients}")
    private String recipientProperty;

    public InsuranceMailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
                                MessageSource messageSource, SpringTemplateEngine templateEngine) {

        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;

        //getRecipientsFromProperties();
    }

    @PostConstruct
    private void getRecipientsFromProperties() {
        log.info("recipient-property: {}",recipientProperty);
        String[] recipientArrayToBeProcessed = recipientProperty.split("\\s*\\,\\s*");

        log.info("recipients: {} and size: {}",recipientArrayToBeProcessed,recipientArrayToBeProcessed.length);

        recipients = Arrays.stream(recipientArrayToBeProcessed).filter(e -> {
            String email = e.trim();

            Pattern pattern = Pattern.compile("^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$");

            Matcher matcher = pattern.matcher(email);
            log.info("recipients element and validity: {},{}",email,matcher.matches());
            return matcher.matches();
        }).collect(Collectors.toList());
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            //message.addAttachment();
            //javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        }  catch (MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }

    public abstract void sendMail(Insurance insurance);

    @Async
    public MimeMessageHelper sendEmailFromTemplate(Context context, Insurance insurance, String templateName, String titleKey) {
        if (insurance.getDocumentUploader().getEmail() == null) {
            log.debug("Email doesn't exist for insurance '{}'", insurance);
            return null;
        }
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, context.getLocale());
        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());
            message.setTo(insurance.getDocumentUploader().getEmail());
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, true);
            //message.addAttachment();
            //javaMailSender.send(mimeMessage);
            log.debug("CC recipients {}", recipients);
            recipients.forEach(e-> {
                try {
                    message.addCc(e);
                    log.debug("CC recipient added '{}'", e);
                } catch (MessagingException messagingException) {
                    messagingException.printStackTrace();
                }
            });
            return message;
        }  catch (MessagingException e) {
            log.warn("Email could not be sent {}", e);
        }
        return null;
    }

    /*@Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }*/
}
