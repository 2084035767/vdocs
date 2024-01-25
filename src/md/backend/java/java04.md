# 四、进阶知识



## 4.1 基本类型包装类

## 4.2 数组

## 4.3 字符串

## 4.4 异常和注解

## 1、注解

注解是 java 这一门编程语言中很重要的一个知识点，利用注解，我们可以很方便实现很多功能。
它可以用于创建文档，跟踪代码中的依赖性，甚至执行基本编译时检查。
注解不会影响代码的正常运行，他与我们的代码处于两个时空中，但是注解和我们的代码又在某些方面相互影响。
java 中，所有的注解都继承了 Annotation 接口。
java 中，已经预定义了很多注解，以方便我们的使用，我们可以在编程过程中直接对这些注解进行调用，实现我们所需要的功能。
以下列出了一些平时会用到的注解：

### 1.1、基础注解

`@Override`:
表示该方法是重写的方法。
`@Deprecated`:
表示该方法是过时的方法，我们在一些旧版本的 API 文档中警方会看到这个注解。

### 1.2、元注解

在我们自定义注解的过程中，就会使用到这些元注解，它可以帮助我们构建自己的自定义注解，就是用在注解中的注解。

`@Target`:
表示该注解可以被放在哪个位置。
它的参数类型如下所示：

```
COPYElementType.TYPE：能修饰类、接口或枚举类型
ElementType.FIELD：能修饰成员变量
ElementType.METHOD：能修饰方法
ElementType.PARAMETER：能修饰参数
ElementType.CONSTRUCTOR：能修饰构造器
ElementType.LOCAL_VARIABLE：能修饰局部变量
ElementType.ANNOTATION_TYPE：能修饰注解
ElementType.PACKAGE：能修饰包
```

`@Retention`:
用于声明生命周期。
参数类型如下所示：

```
COPYRetentionPolicy.SOURCE：源码阶段
RetentionPolicy.CLASS： 编译阶段
RetentionPolicy.RUNTIME：运行阶段
```

`@Inherited`:
表示注解可以被子类继承。即子类继承父类以后，也可以继承父类的注解。

`@Documented`:
表示生成 API 。

`@Repeatable`:
表示注解在同一个地方可以出现多次，如果不加这个注解的话，同一个地方注解只能出现一次。

## 2、自定义注解

对于自定义注解，说起来其实十分简单，用`@interface`修饰一个我们所创建的“类”，然后再加上我们需要的一些元注解，就可以实现一个自定义注解了。

对于创建的自定义注解，我们需要考虑以下几个问题：

1. 注解用在什么地方？
2. 注解什么时候使用？
3. 注解想要实现什么功能？

在考虑好上面的这些问题之后，通过合理使用元注解，我们就能解决以上的一些问题。
可以说自定义注解和元注解之间的关系密不可分！就比如说盖楼时我们必须打地基一样。

自定义注解可以有很多种形式，以下是几个自定义注解的例子。

### 2.1、自定义注解可以存放变量

首先我们创建一个以下的自定义注解：

```java
import java.lang.annotation.*;

@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface testInt1 {
    int id();
    String name();
    int age();
}
```

可以看出来，这个自定义注解中有三个变量，分别是`id`，`name`，`age`。
别处通过注解，可以很方便的使用它们。

当我们创建一个类，标上这个注解的时候，他会提示我们所需要的三个变量





如果我们想拿到注解中我们设置好的结果，通过以下的方法即可拿到：

```java
@testInt1(id = 1,name = "chenyicai",age = 22)
public class l1 {

    public static void f1(){
        testInt1 testInt1=l1.class.getAnnotation(demo1.testInt1.class);

        System.out.println(testInt1.id());
        System.out.println(testInt1.name());
        System.out.println(testInt1.age());
    }

    public static void main(String[] args) {
        f1();
    }
}
```

### 2.2、自定义注解实现某个功能

上面的用法通常不太常见，我们更多所见到的，是通过注解来实现某个功能，所以下面就是一个这样的例子。

因为参数校验是位于业务逻辑执行执行，可以考虑将其拆分。
所以这个注解可以简单实现检验一个参数是否为空等检验功能。
由于并不是所有的方法，都需要校验(某些方法允许空参数)，所以考虑使用自定义注解，让开发者进行灵活控制。

首先创建以下的一个注解：

```java
//仅仅用于请求字段的非空校验
@Target(ElementType.FIELD)
//需要jvm运行时使用
@Retention(RetentionPolicy.RUNTIME)
//使用validator时必须添加，指定与NotNullValidator自定义校验器配合使用
@Constraint(validatedBy = isNotNullValidator.class)
@Inherited
@Documented
//@interface 代表此类是注解类
public @interface isNotNull {

    // 默认错误信息
    String message() default "不能为空";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
```

然后是注解用于检验的类

```java
public class isNotNullValidator implements ConstraintValidator<isNotNull,Object>{
    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        //此时name是当前非空校验的字段名
        String name = String.valueOf(((ConstraintValidatorContextImpl) constraintValidatorContext)
                .getConstraintViolationCreationContexts().get(0).getPath());
        System.out.println(name + " value is " + String.valueOf(o));

        //o是字段的值，我们需要校验是否为空
        if(null == o ||""==o){
            // 获取到注解中message的值
            System.err.println(((ConstraintValidatorContextImpl) constraintValidatorContext)
                    .getConstraintViolationCreationContexts().get(0).getMessage());
            //返回false代表校验失败
            return false;
        }
        //返回true代表校验成功
        return true;
    }
}
```

然后在需要验证的字段上添加上这个注解

```java
@Data
public class Users {

    private int id;
    @isNotNull(message = "姓名不能为空")
    private String name;
}
```

最后创建一个控制器类，来检验我们的代码

```java
@RestController
public class TestController {

    @GetMapping("/add")
    public Object addUser(@Valid Users users){
        return "111";
    }
}
```

