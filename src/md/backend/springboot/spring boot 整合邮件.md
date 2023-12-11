# spring boot 整合邮件

邮件发送概述

- Spring 提供了一个 JavaMailSender 接口，实现发送邮件功能。
- Spring Boot 提供了一个对应的`spring-boot-starter-mail`依赖。
- Spring Boot 通过创建一个默认的 JavaMailSender进一步自定义。
- 发送邮件的场景：用户注册验证、忘记密码验证、监控告警、信息推送等。



常用邮箱系统提供商

> 某些邮箱需要开启SMTP功能，请自寻方法。

1. Gmail:
   - SMTP服务器地址: smtp.gmail.com
   - 端口号: 587 或 465（启用SSL加密）
2. Outlook.com/Hotmail.com:
   - SMTP服务器地址: smtp.office365.com
   - 端口号: 587 或 465（启用SSL加密）
3. Yahoo Mail:
   - SMTP服务器地址: smtp.mail.yahoo.com
   - 端口号: 587 或 465（启用SSL加密）
4. AOL Mail:
   - SMTP服务器地址: smtp.aol.com
   - 端口号: 587 或 465（启用SSL加密）

- 126邮箱SMTP服务器地址:smtp.126.com，端口号:465或者994
- 163邮箱SMTP服务器地址:smtp.163.com，端口号:465或者994
- qq邮箱SMTP服务器地址:smtp.qq.com，端口号:465或587
- yeah邮箱SMTP服务器地址:smtp.yeah.net，端口号:465或者994



Spring Boot整合邮件发送实现步骤



添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>

<!-- thymeleaf 模板邮件需要-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```



在application.yml配置

```yml
spring:
#邮件配置 
  mail:
    host: smtp.qq.com #发送邮件服务器
    username: xxxxx@qq.com #发送邮件的邮箱地址
    password: xxxxx #客户端授权码，不是邮箱密码
    from: xxxxx@qq.com # 发送邮件的地址，和上面username一致
    protocol: smtp # 传输协议
    default-encoding: UTF-8 # 编码方式
    #以下可以配置或者不配置
    properties:
      mail:
        smtp:
          port: 465 #端口号465或587
          auth: true # 身份验证
        starttls:
          enable: true # 启用STARTTLS（安全传输层协议）
          required: true # 使用STARTTLS进行加密通信
```

定义发送邮件的服务类

定义邮件发送接口

```java
public interface MailService {

    /**
     * 发送文本邮件
     *
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    void sendSimpleMail(String to, String subject, String content);

    /**
     * 发送HTML邮件
     *
     * @param to      收件人
     * @param subject 主题
     * @param content 内容
     */
    void sendHtmlMail(String to, String subject, String content);

    /**
     * 发送带附件的邮件
     *
     * @param to       收件人
     * @param subject  主题
     * @param content  内容
     * @param filePath 附件
     */
    void sendAttachmentsMail(String to, String subject, String content, String filePath);

    /**
     * 发送模板邮件
     * @param to 收件人
     * @param subject 主题
     * @param fileName 邮件模板文件名称
     * @param model 邮件数据载体
     */
    void sendModelMail(String to, String subject, String fileName, Object model);

}
```

定义邮件发送实现类

```java
@Slf4j
public class MailServiceImpl implements MailService {

    // 注入JavaMailSender
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
	private TemplateEngine templateEngine;

    // 引用配置中的地址
    @Value("${spring.mail.from}")
    private String from;

    @Override
    public void sendSimpleMail(String to, String subject, String content) {
        //创建SimpleMailMessage对象
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(from); //邮件发送人
            message.setTo(to); //邮件接收人
            message.setSubject(subject); //邮件主题
            message.setText(content); //邮件内容
            mailSender.send(message); //发送邮件
            log.info("html邮件已经发送"); //日志信息
        } catch (MessagingException e) {
            log.error("发送邮件时发生异常！", e);
        }

    }

    @Override
    public void sendHtmlMail(String to, String subject, String content) {
        //获取MimeMessage对象
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(from);
            messageHelper.setTo(to);
            message.setSubject(subject);
            messageHelper.setText(content, true); //邮件内容，html格式
            mailSender.send(message);
            log.info("html邮件已经发送");
        } catch (MessagingException e) {
            log.error("发送邮件时发生异常！", e);
        }
    }


    @Override
    public void sendAttachmentsMail(String to, String subject, String content, String filePath) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);

            //FileSystemResource file = new FileSystemResource(new File(filePath));
            ClassPathResource resource = new ClassPathResource(filePath);
            FileSystemResource file = new FileSystemResource(resource.getFile());
            helper.addAttachment(Objects.requireNonNull(file.getFilename()), file);
            //可以同时添加多个附件,只需要在这里直接添加第2,第3...附件就行了.
            //helper.addAttachment(fileName2, file2);
            mailSender.send(message);
            log.info("附件邮件已经发送");
        } catch (MessagingException e) {
            log.error("发送邮件时发生异常！", e);
        } catch (IOException e) {
            e.printStackTrace();
            log.error("发送附件时发生异常！", e);
        }
    }

    @Override
    public void sendModelMail(String to, String subject, String fileName, Object model) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(model, true);
            mailSender.send(mimeMessage);

            log.info("邮件已经发送...");
        } catch (MessagingException e) {
            log.error("发送邮件时发生异常！", e);
        } catch (TemplateException e) {
            e.printStackTrace();
            log.error("发送邮件时发生异常！", e);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```



创建邮件测试类



```java
public class MailServiceTest {

    @Autowired
    private MailService MailService;

    @Test
    void sendSimpleMailTest(){
MailService.sendHtmlMail("2084035767@qq.com", "主题：这是模板邮件","邮件内容");
    }
    
    @Test
    void sendHtmlMailTest(){
MailService.sendHtmlMail("收件箱@qq.com", "HTML邮件主题", "<h1>邮件主题</h1><br/><p><font color='red'>邮件内容</font></p>");
    }
    
    @Test
    void sendAttachmentsMailTest(){
MailService.sendHtmlMail("收件箱@qq.com", "主题:带附件的邮件", "有附件的邮件", "static/touxiang.png");
    }
    
    @Test
    void sendModelMailTest(){
        //创建邮件正文
    Context context = new Context();
    context.setVariable("id", "006");
    String emailContent = templateEngine.process("emailTemplate", context);
MailService.sendHtmlMail("收件箱@qq.com", "主题:新员工入职欢迎邮件--模板邮件", "mail.ftl", emailContent);
    }

}
```



thymeleaf创建页面模板

```html
<!DOCTYPE html>
<html lang="zh" xmlns:th="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <head>
    <meta charset="UTF-8"/>
    <title>Title</title>
  </head>
<body>
您好,这是验证邮件,请点击下面的链接完成验证,<br/>
<a href="#" th:href="@{ http://www.ityouknow.com/neo/{id}(id=${id}) }">激活账号</a>
</body>
</html>
```

在application.yml文件中对进行配置

```yaml
spring:
    thymeleaf:
    prefix: classpath:/templates/
    suffix: .html
```