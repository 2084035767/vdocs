# 六、高级特性

## 6.1 Bean Aware

Aware接口是Spring Framework中提供的一组标记接口，用于在Bean装配的过程中获取Spring容器中提供的一些核心组件或运行时上下文等信息。通过使用Aware接口，我们可以在Bean实例化和初始化过程中获取到Spring容器中其他组件，方便Bean类实现更复杂的业务逻辑。

常见的Spring框架中的Bean Aware接口和对应的功能

| Bean Aware 接口                  | 功能                                      |
| -------------------------------- | ----------------------------------------- |
| `BeanNameAware`                  | 获取当前Bean的名称                        |
| `BeanFactoryAware`               | 获取所属的BeanFactory                     |
| `ApplicationContextAware`        | 获取所属的ApplicationContext              |
| `MessageSourceAware`             | 获取MessageSource用于国际化               |
| `ApplicationEventPublisherAware` | 获取ApplicationEventPublisher用于发布事件 |
| `ResourceLoaderAware`            | 获取ResourceLoader用于加载资源            |
| `EnvironmentAware`               | 获取Environment用于访问配置属性           |
| `ServletConfigAware`             | 获取ServletConfig                         |
| `ServletContextAware`            | 获取ServletContext                        |
| `BeanClassLoaderAware`           | 获取加载当前Bean的ClassLoader             |
| `BeanPostProcessor`              | 在Bean的初始化前后进行自定义处理          |
| `BeanFactoryPostProcessor`       | 在BeanFactory的初始化前后进行自定义处理   |
| `InitializingBean`               | 在Bean的属性设置完成后执行初始化逻辑      |

**使用**

```java
// BeanNameAware接口获取的资源就是BeanName
@Component
public class Student implements BeanNameAware {   //我们只需要实现这个接口就可以了

    @Override
    public void setBeanName(String name) {   //Bean在加载的时候，容器就会自动调用此方法，将Bean的名称给到我们
        System.out.println("我在加载阶段获得了Bean名字："+name);
    }
}


//BeanClassLoaderAware使我们在Bean加载阶段就获取到当前Bean的类加载器
@Component
public class Student implements BeanClassLoaderAware {

    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        System.out.println(classLoader);
    }
}
```



## 6.2 任务调度

Spring框架为我们提供了更加便捷的方式进行任务调度。简单来说就是定时任务。



### 异步任务

异步任务是指不进入主线程，而进入任务队列的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程。

| 注解           | 描述                                                 |
| -------------- | ---------------------------------------------------- |
| `@Async`       | 标记方法为异步，新开一个线程执行。                   |
| `@EnableAsync` | 开启异步任务执行，配合`@Async`使用（配置类或主类上） |

::: waring

添加`@Async`注解要求方法的返回值只能是void或Future类型

:::

```java
@Component
public class Student {
    public void syncTest() throws InterruptedException {
        System.out.println(Thread.currentThread().getName()+"我是同步执行的方法，开始...");
        Thread.sleep(3000);
        System.out.println("我是同步执行的方法，结束！");
    }

    @Async
    public void asyncTest() throws InterruptedException {
        System.out.println(Thread.currentThread().getName()+"我是异步执行的方法，开始...");
        Thread.sleep(3000);
        System.out.println("我是异步执行的方法，结束！");
    }
}
```



### 定时任务

定时任务是一种自动化执行特定操作的方式，可以根据预定的时间、日期或间隔周期性地执行某些任务。

| 注解                | 描述                                                 |
| ------------------- | ---------------------------------------------------- |
| `@Scheduled`        | 标记方法为定时任务                                   |
| `@EnableScheduling` | 开启定时任务，配合`@Scheduled`使用（配置类或主类上） |

`@Scheduled`中几个参数如下

- `fixedDelay`：在上一次定时任务执行完之后，间隔多久继续执行。
- `fixedRate`：无论上一次定时任务有没有执行完成，两次任务之间的时间间隔。
- `cron`：使用cron表达式来指定任务计划。



::: tip 推荐

推荐阅读 [cron表达式]()

:::

```java
@Scheduled(fixedRate = 2000)   //单位是毫秒，这里是每两秒钟打印一次
public void task(){
    System.out.println("我是定时任务！"+new Date());
}
```



## 6.3 Spring 监听事件

监听器可以在使用过程时监听某些事件的发生，然后对这些事件做出响应处理。监听器对应用场景很多,用户的每一个操作都可以被定义为一个事件，通过监听器就能对某些业务场景中的事件进行监听。

### 事件(event)

spring定义了一个标准的事件抽象类ApplicationEvent，继承了这个抽象类就是一个Application事件。

```java
// 自定义事件需要继承ApplicationEvent
public class CustomEvent extends ApplicationEvent {

    private String message;

    public CustomEvent(Object source, String message) {
        super(source);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

```

Spring常见内置事件

1. `ContextRefreshedEvent`：当应用程序上下文被初始化或刷新时触发。这通常发生在应用程序启动时或在热部署期间。
2. `ContextStartedEvent`：当应用程序上下文启动时触发。可以在这个事件中执行一些启动相关的操作。
3. `ContextStoppedEvent`：当应用程序上下文停止时触发。可以在这个事件中执行一些停止相关的操作。
4. `ContextClosedEvent`：当应用程序上下文关闭时触发。这个事件是在应用程序关闭之前触发的，可以在这个事件中执行一些清理资源的操作。
5. `RequestHandledEvent`：当HTTP请求处理完成时触发。可以在这个事件中记录请求处理的统计信息或执行其他相关的操作。



### 监听器(listener)

spring定义了一个标准的监听器接口ApplicationListener，实现了这个接口的类就是一个Application监听器。

```java
@Component
public class CustomEventListener implements ApplicationListener<CustomEvent> {

    @Override
    public void onApplicationEvent(CustomEvent event) {
        // 在自定义事件发生时触发此方法
        String message = event.getMessage();
        System.out.println("接收到自定义事件，消息内容：" + message);
        // 在这里添加你的逻辑代码
    }
}


// 发送事件
public class SomeClass implements ApplicationEventPublisherAware {

    private ApplicationEventPublisher eventPublisher;

    public void someMethod() {
        // 在某个方法中触发自定义事件
        CustomEvent customEvent = new CustomEvent(this, "Hello, Custom Event!");
        eventPublisher.publishEvent(customEvent);
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }
}
```

## 参考三三

- [Java 全栈知识体系](https://pdai.tech/)
- [柏码(itbaima.net)](https://itbaima.net/document)
