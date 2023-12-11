### 一、基础命令[#](#1614246285)

#### 1.连接服务端[#](#1293120670)

```x86asm
Copyredis-cli

或

redis-cli -h ip地址 -p 端口
```

#### 2.选择数据库[#](#3909082582)

```markdown
CopyRedis默认支持16个数据库，对外都是以一个从0开始递增数命令。

select 1

get test



说明：

    1.redis不支持自定义数据库名称称

    2.redis不支持为每个数据库设置访问密码

    3.redis的多个数据库之间不是完全隔离，flushall命令会清空所有数据
```

#### 3.设置数据库数量[#](#1741624676)

```undefined
Copyredis.conf文件中找到databases的关键字修改后边的数字即可
```

#### 4.设置数据[#](#3806910270)

```vbnet
Copyset key value
```

#### 5.获取数据[#](#3862978707)

```vbnet
Copyget key
```

#### 6.判断是否存在[#](#1379411581)

```perl
Copyexists key
```

#### 7.刪除数据[#](#946591177)

```css
Copydel key
```

#### 8.判断key类型[#](#2644832016)

```haskell
Copytype key
```

#### 9.递增数字[#](#1992255984)

```dart
Copyincr num
```

#### 10.自定义递增数字[#](#1288293769)

```dart
Copyincrby num 2
```

#### 11.递减数字[#](#1972425745)

```dart
Copydecr num
```

#### 12.自定义递减数字[#](#871550871)

```dart
Copydecrby num 3
```

#### 13.向尾部追加值[#](#1095840878)

```python
Copyset str hello

append str "world"

get str
```

#### 14.获取字符串长度[#](#2940877841)

```vbnet
Copystrlen key
```

#### 15.同时设置/获取多个键值[#](#1977082697)

```x86asm
Copymset k1 v1 k2 v2 k3 v3

get k1

mget k1 k3
```

#### 16.设置生存时间(单位：秒)[#](#615743277)

```sql
Copyset user jack

expire user 10 #10秒后被删除
```

#### 17.清除生存时间[#](#3827755573)

```sql
Copyset user jack

expire user 60

persist user      #永久保存
```

#### 18.查看生存时间[#](#2946320803)

```markdown
Copyttl key

TTL返回值：

        大于0的数字：剩余生存时间，单位为秒

        -1 ： 没有生存时间，永久存储

        -2 ： 数据已经被删除
```