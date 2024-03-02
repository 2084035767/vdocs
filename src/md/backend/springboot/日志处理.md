# Spring boot 日志

## 一. Java中常用的日志框架

### 1. 关于System.out.println

我们在项目开发中经常需要打印日志，输出一些调试信息，对于简单的小案例，可能就直接使用Java自带的System.out.println语句进行输出就可以了。那有的朋友可能会问，既然已经有这样的输出语句了，为什么Java中还有大量的专业日志框架呢？

我们可以仔细想想，如果项目非常大，很多地方都需要打印日志，这样就会带来一个非常麻烦的问题：

- 一旦哪天程序员决定不要显示这些System.out.println的东西了，就只能一行行的把这些垃圾语句注释掉；
- 如果哪天又需调试变量值，则只能再一行行去掉这些注释恢复System.out.println语句。

这样不是太麻烦吗？

### 2. Java中常用的日志框架

- java.util.logging
- commons-logging
- log4j
- logback
- slf4j等

### 3. Log4J日志框架

Log4J是Apache的一个开源项目，通过使用Log4J，我们可以控制日志信息是输送到控制台还是文本文件等我们期望输出到的地方，另外我们也可以控制每一条日志的输出格式。并且可以通过定义每一条日志信息的级别，能够更加细致地控制日志的生成过程。

我们可以通过一个配置文件来灵活地进行上面的配置，而不需要修改应用的代码。Log4J作为前几年比较流行的日志框架，给我们应用开发和维护带来了很大的便捷。

### 4. Logback日志框架

但是现在log4j已经逐渐被Logback取代了，因为Logback相对log4j更具优势。

#### 4.1 Logback的主要特性

- 更快的执行速度：
  基于先前的Log4j，Logback 重写了内部的实现，在某些特定的场景上，Logback可以比log4j的执行速度快上10倍。
- 更小的内存消耗：
  在保证Logback的组件更快执行的同时，所需的内存更加的少；
- 充分的测试：
  Logback 历经了几年时间的充分测试，这正是人们选择Logback而不是Log4j的重要原因。

#### 4.2 Logback的构成

- logback-core:
  logback-core是其它模块的基础，其它模块基于它构建;
- logback-classic:
  logback-classic类似于Log4J，它被认为是 Log4J的一个改进版，并且它实现了简单日志门面 SLF4J。
- logback-access:
  logback-access主要作为一个与 Servlet容器交互的模块，比如说tomcat或者 jetty，提供一些与 HTTP访问相关的功能。

那Sl4J又是什么呢？

### 5. slf4j框架:(The Simple Logging Facade for Java)

即面向Java的简单日志门面框架。简答讲slf4j是一系列的日志接口，slf4j是作为一个抽象的日志框架，但是并没有提供真正的实现。slf4j为各种日志框架提供了一个统一的入口，使用户可以用统一的接口来输出日志，动态地决定要使用的具体的实现框架，比如Logback，Log4j，common-logging等框架都实现了这些接口。

## 二. SpringBoot整合Logback日志

### 1. SpringBoot的默认日志框架

在SpringBoot内部中，默认就集成了LogBack的日志依赖，所以我们其实在实际开发中不需要直接添加该依赖。
你会发现spring-boot-starter其中包含了 spring-boot-starter-logging，Spring Boot为我们提供了很多默认的日志配置，所以，只要将spring-boot-starter-logging作为依赖加入到当前应用的classpath，则“开箱即用”。

SpringBoot默认使用LogBack来记录日志信息，默认根据base.xml中的配置内容来输出到控制台和文件之中。

我们可以通过查看spring-boot-starter-parent依赖关系：








在SpringBoot中整合日志其实非常简单，过程如下。

### 3. 创建web项目

我们按照之前的经验，创建一个web程序，并将之改造成Spring Boot项目，具体过程略。

### 4. 添加依赖包

```xml
xml复制代码<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <!--简化bean代码-->
    <dependency>
        <groupId>org.projectlombok</groupId>
         <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

### 5. logback的日志等级

日志级别从低到高分为：
TRACE < DEBUG < INFO < WARN < ERROR < FATAL

### 6. SpringBoot默认的base.xml配置文件

SpringBoot的日志是根据level来控制的，根据不同的level来显示不同的日志内容。那么在哪里控制日志level呢？一般我们要在resources目录下配置spring-logback.xml文件来控制，如果我们什么配置都没写，那么Springboot会采用默认的配置。



这里就是Springboot对logback配置的地方，base.xml里，可以看到root level=INFO，这个代表该项目默认是输出最低为info级别的日志。然后看到有两个append-ref，分别为console何file，这两个分别对应上面引用的两个include resource里的xml，每个名字对应一个处理类。

ConsoleAppender和FixedWindowRollingPolicy都是logback提供的两个Appender处理类，Appender类代表了对日志的处理方法，这个可以自定义。系统提供了很多个Appender，基本满足了大部分场景的需求，像Console就是输出到控制台的，System.out.print之类的，而File的就是输出到日志文件的。

### 7. 自定义的logback-spring.xml文件详解

#### 7.1 配置文件的精简结构

```xml
xml复制代码<configuration scan="true" scanPeriod="60 seconds" debug="false">  
<!-- 属性文件:在properties/yml文件中找到对应的配置项 -->
    <springProperty scope="context" name="logging.path" source="logging.path"/>
    <contextName>魔力小佳佳</contextName> 

    <appender>
        //xxxx
    </appender>   

    <logger>
        //xxxx
    </logger>

    <root>             
       //xxxx
    </root>  
</configuration>
```

这个文件在springboot中默认叫做logback-spring.xml，我们只要新建一个同名文件放在resources下面，配置即可生效。

- **contextName**

每个logger都关联到logger上下文，默认上下文名称为“default”。但可以使用contextName标签设置成其他名字，用于区分不同应用程序的记录。

- **property**

用来定义变量值的标签，property标签有两个属性，name和value；其中name的值是变量的名称，value的值时变量定义的值。通过property定义的值会被插入到logger上下文中。定义变量后，可以使“${name}”来使用变量。如上面的xml所示。

- **logger**

用来设置某一个包或者具体的某一个类的日志打印级别以及指定appender。

- **root**

根logger，也是一种logger，且只有一个level属性。

- **appender**

负责日志的组件。

#### 7.2 常用的appender的种类

- ConsoleAppender：把日志添加到控制台；
- FileAppender：把日志添加到文件；
- RollingFileAppender：滚动记录文件，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件,它是FileAppender的子类。

#### 7.3 filter

filter其实是appender里的子元素，它作为过滤器存在，执行一个过滤器会有返回DENY，NEUTRAL，ACCEPT三个枚举值中的一个。

- DENY：日志将立即被抛弃不再经过其他过滤器；
- NEUTRAL：有序列表里的下个过滤器过接着处理日志；
- ACCEPT：日志会被立即处理，不再经过剩余过滤器。

#### 7.4 常用的过滤器：

- **ThresholdFilter**：临界值过滤器，过滤掉低于指定临界值的日志。当日志级别等于或高于临界值时，过滤器返回NEUTRAL；当日志级别低于临界值时，日志会被拒绝。

```xml
xml复制代码<filter class="ch.qos.logback.classic.filter.ThresholdFilter">
  <level>INFO</level>
</filter>
```

- **LevelFilter**：级别过滤器，根据日志级别进行过滤。如果日志级别等于配置级别，过滤器会根据onMath(用于配置符合过滤条件的操作) 和 onMismatch(用于配置不符合过滤条件的操作)接收或拒绝日志。

```xml
xml复制代码<filter class="ch.qos.logback.classic.filter.LevelFilter">
    <level>INFO</level>   
    <onMatch>ACCEPT</onMatch>   
    <onMismatch>DENY</onMismatch>   
</filter>
```

### 8. 创建logback-spring.xml文件

#### 8.1 创建logback-spring.xml配置文件

我们可以在resource目录下创建一个命名为logback-spring.xml的配置文件。



```xml
xml复制代码<?xml version="1.0" encoding="UTF-8"?>
<!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果设置为WARN，则低于WARN的信息都不会输出 -->
<!-- scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true -->
<!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
<!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 -->
<configuration  scan="true" scanPeriod="10 seconds">

    <!--<include resource="org/springframework/boot/logging/logback/base.xml" />-->

    <contextName>logback</contextName>

    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
    <property name="log.path" value="F:/logs/" />

    <!-- 彩色日志,需要在idea中安装grep console插件 -->
    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
    <conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
    <conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />

    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN" value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>

    <!--输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
        <encoder>
            <Pattern>${CONSOLE_LOG_PATTERN}</Pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!--输出到文件-->
    <!-- 时间滚动输出 level为 DEBUG 日志 -->
    <appender name="DEBUG_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_debug.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/debug/log-debug-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录debug级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>debug</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 INFO 日志 -->
    <appender name="INFO_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_info.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 每天日志归档路径以及格式 -->
            <fileNamePattern>${log.path}/info/log-info-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录info级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>info</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 WARN 日志 -->
    <appender name="WARN_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_warn.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/warn/log-warn-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录warn级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 ERROR 日志 -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/log_error.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/error/log-error-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录ERROR级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!--
        <logger>用来设置某一个包或者具体的某一个类的日志打印级别、
        以及指定<appender>。<logger>仅有一个name属性，
        一个可选的level和一个可选的addtivity属性。
        name:用来指定受此logger约束的某一个包或者具体的某一个类。
        level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，
              还有一个特俗值INHERITED或者同义词NULL，代表强制执行上级的级别。
              如果未设置此属性，那么当前logger将会继承上级的级别。
        addtivity:是否向上级logger传递打印信息。默认是true。
    -->
    <!--<logger name="org.springframework.web" level="info"/>-->
    <!--<logger name="org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor" level="INFO"/>-->
    <!--
        使用mybatis的时候，sql语句是debug下才会打印，而这里我们只配置了info，所以想要查看sql语句的话，有以下两种操作：
        第一种把<root level="info">改成<root level="DEBUG">这样就会打印sql，不过这样日志那边会出现很多其他消息
        第二种就是单独给dao下目录配置debug模式，代码如下，这样配置sql语句会打印，其他还是正常info级别：
     -->

    <!--
        root节点是必选节点，用来指定最基础的日志输出级别，只有一个level属性
        level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，
        不能设置为INHERITED或者同义词NULL。默认是DEBUG
        可以包含零个或多个元素，标识这个appender将会添加到这个logger。
    -->

    <!--开发环境:打印控制台-->
    <springProfile name="dev">
        <logger name="com.yyg.boot" level="debug"/>
    </springProfile>

    <root level="debug">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="DEBUG_FILE" />
        <appender-ref ref="INFO_FILE" />
        <appender-ref ref="WARN_FILE" />
        <appender-ref ref="ERROR_FILE" />
    </root>

    <!--生产环境:输出到文件-->
    <!--<springProfile name="pro">-->
    <!--<root level="info">-->
    <!--<appender-ref ref="CONSOLE" />-->
    <!--<appender-ref ref="DEBUG_FILE" />-->
    <!--<appender-ref ref="INFO_FILE" />-->
    <!--<appender-ref ref="ERROR_FILE" />-->
    <!--<appender-ref ref="WARN_FILE" />-->
    <!--</root>-->
    <!--</springProfile>-->

</configuration>
```

#### 8.2 关于root节点

root节点是必选节点，用来指定最基础的日志输出级别，只有一个level属性，不区分大小写，默认是DEBUG。


上图的节点好比一个方法，这个方法的意思是全局打印等级为INFO，而且四个变量都执行，即正常的控制台输出和warn、info、error的三个文件输出，可以到对应的控制台和日志文件里面看到的确有日志。

反之倘若我们level定为Debug，或者去除name为“WARN”的则是输出Debug以上等级的日志，WARN.log日志文件也不会再有日志打印进去。

### 9. 创建Controller打印日志

我们可以在类上添加Lombok插件中的@Slf4j注解，在需要打印的类名上加上该注解即可，用来替代下面语句的编写：

```ini
private Loggerlogger = LoggerFactory.getLogger(this.getClass());
```

日志类：

```kotlin
kotlin复制代码package com.yyg.boot.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author 一一哥Sun
 * @Date Created in 2020/5/14
 * @Description Description
 */
@Slf4j
@RestController
public class LogController {

    @GetMapping("/log")
    public String showLog(){

        log.debug("debug级别的日志信息...");
        log.info("info级别的日志信息...");
        log.warn("warn级别的日志信息...");
        log.error("error级别的日志信息...");

        return "ok";
    }

}
```

### 10. 创建application.yml

在这个application.yml配置文件中，可以在这里设置log的级别。

```yaml
yaml复制代码server:
  port: 8080
spring:
  application:
    name: log-demo
#设置log级别
logging:
  level:
    root: debug
  #设置存储位置
  #path: ./logs
  #设置配置文件的名称位置
  #config: classpath:/logback-dev.xml
```

### 11. 创建入口类

```typescript
typescript复制代码package com.yyg.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @Author 一一哥Sun
 * @Date Created in 2020/5/14
 * @Description Description
 */
@SpringBootApplication
public class LogApplication {

    public static void main(String[] args){
        SpringApplication.run(LogApplication.class,args);
    }

}
```

## 三. 启动项目进行测试



并且在我们的磁盘中也可以看到输出了日志文件。


## 四. 屏蔽某个或某些类的日志记录

如果我们在项目中需要屏蔽某个或者多个包中不需要输出日志的类，那么我们可以修改application.yml添加对应配置:



Log2Controller类内容如下：



可以看到此时控制台没有对应的日志信息输出。


## 五. 多环境配置

我们开发中会有不同的环境，我们可以根据不同的环境(prod:生产环境，test:测试环境，dev:开发环境)来定义不同的日志输出，可以在logback-spring.xml中使用 springProfile节点来定义，方法如下：


我们可以在启动服务的时候通过指定 profile(如不指定使用默认)，如指定prod 的方式为：

```ini
java -jar xxx.jar –spring.profiles.active=dev
```

来加载不同环境下的日志配置。

另外在application.yml配置文件中，也有对应的profiles.active属性来控制。获
