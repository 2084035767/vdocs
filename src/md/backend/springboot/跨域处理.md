## 全局配置CORS跨域

本文讲述 springboot 项目支持 cors 跨域的全局配置方法。springboot 的 CORS 跨域配置，支持全局配置(全局配置类)和局部配置(注解), 本文主要讲解全局配置的方法。springboot 版本不同, 全局配置 CORS 的方法不同。

## springboot

springboot 版本<2.0

```java
@Configuration
public class CorsConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(true)
                .allowedMethods("*")
                .maxAge(3600);
    }
}
 
        Copied!
    
```

springboot 版本>=2.0

```java
/**
 * 全局CORS跨域配置
 */
@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer{
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        // 允许跨域访问资源定义： /api/ 所有资源
        corsRegistry.addMapping("/api/**")
                // 将允许跨域访问的域名传给函数 allowedOrigins，支持配置多个域名
                .allowedOrigins("http://www.frontpage.com")
                // 允许发送Cookie
                .allowCredentials(true)
                // 允许所有方法
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD");
    }
}
 
```