# django



## Django 介绍

Django 是一个开放源代码的 Web 应用框架，由 Python 写成。利用 Django 和相关的 html 和 CSS 知识，我们可以轻松构建出一个简单的网站。本文主要介绍使用 Django 的一些准备工作。

### 安装 Django

首先，你需要 Python 环境。这里以 Python3 环境为例。安装有两种方式：**命令行安装**和**使用开发软件 Pycharm**。

**注意**

如果下载速度很慢，你可以尝试更换成国内镜像源。例如`pip install Django -i https://pypi.tuna.tsinghua.edu.cn/simple`

### 开始使用 Django

#### 新建 Django 项目

下载完 Django 库后，我们需要在我们的项目文件夹中新建一个 Django 项目，这将告诉 Django，这不是一个纯 Python 项目。首先我们在 Pycharm 的终端或者命令行窗口运行以下指令：

```
django-admin startproject <projectname> .
```

其中，`<projectname>`是项目名称。

如果你使用的是Pycharm

Professional Edition，那么你可以直接在创建项目之初就创建Django项目，而无需上述的多步操作。但需要注意，在项目的`setting.py`中`TEMPLATES`中第一个字典的键`DIRS`存在`[os.path.join(BASE_DIR, templates)]`，它将影响静态文件查找位置，最好删去。

注意，上述的命令语句千万不要忘记末尾的`.`。遗漏了这个句点将在后续项目部署上需要额外的复杂操作。

最后运行`python manage.py runserver`，检查 Django 是否能正确运行。若可以，则初步配置成功。

#### Django 项目中的文件结构

```
<projectname>
├─manage.py       【项目管理、启动项目、创建应用、数据管理】【无需更改】
│
└─<projectname>
   ├─__init__.py
   ├─settings.py  【项目配置文件】【例如注册应用、链接数据库】
   ├─urls.py      【url和函数对应关系】【主要编写的部分】
   ├─asgi.py      【接收网络请求】【无需更改】
   └─vsgi.py      【接收网络请求】【无需更改】
```

#### 新建应用

根据项目的业务逻辑，我们将其分为多个应用来分开管理。我们先新建第一个应用，在终端输入命令

```
python manage.py startapp <appname>
```

于是我们得到这样的目录。

```
<projectname>
├─manage.py       【项目管理、启动项目、创建应用、数据管理】【无需更改】
│
├─<appname>
|  ├─__init__.py
|  ├─admin.py     【后台管理界面】
|  ├─apps.py      【启动类】
|  ├─models.py    【在数据库中创建对应表】
|  ├─tests.py     【测试类】
|  ├─views.py     【函数】
|  └─migrations   【数据库迁移记录】
|       └─__init__.py
|
└─<projectname>
   ├─__init__.py
   ├─settings.py  【项目配置文件】【例如注册应用、链接数据库】
   ├─urls.py      【url和函数对应关系】【主要编写的部分】
   ├─asgi.py      【接收网络请求】【无需更改】
   └─vsgi.py      【接收网络请求】【无需更改】
```

新建应用后，我们需要对其**注册**。我们找到应用下的`apps.py`，找到其启动类类名，以下是一个例子。

```
## filename: apps.py
from django.apps import AppConfig


class App01Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app01'
```

于是我们修改`settings.py`中的内容：

```
## filename: settings.py
## 省略

INSTALLED_APPS = [
    ## 省略

    '<appname>.apps.APP01Config',

]

#省略
```

于是，新的应用已经注册完毕，我们可以在该应用上开发了。

## 操作MySQL数据库

使用 django 操作 mysql 数据库。

### 前言

数据库是 web 应用中很重要的组成部分之一。Django 框架自带了 sqlite3 数据库，然而在使用的广泛程度上，MySQL 的应用场景更加多。本篇主要解释如何将数据库换成 MySQL，以及一些基本用法。

### 更换默认数据库为 MySQL

#### 创建数据库

由于 django 的 orm 只能完成对于表的操作，因此数据库的创建需要我们自行完成，这里以本地 MySQL 数据库为例。在 MySQL 终端输入

完成数据库的创建。然后运行 `use {db_name}` ，若提示为 empty set（空的数据库），则创建成功。

#### 安装第三方依赖

首先我们需要安装第三方包 `pymysql` （你也可以使用`mysqlclient`），这个第三方包能够帮助 Django 完成对 MySQL 数据库的增删改查操作，

如果安装缓慢，可以参考本系列的第一篇文章，将安装源换成国内镜像站。

#### 更改项目配置文件

在项目目录下找到`setting.py`，找到`DATABASES`，这里默认是

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

其中， `ENGINE` 指明了数据库类型， `NAME` 指明了数据库名称。默认情况下，Django 使用内部集成的 sqlite3.我们修改之，

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'webapp', ## 数据库名字
        'USER': 'root',
        'PASSWORD': '{你的密码}',
        'HOST': '127.0.0.1', ## MySQL 在哪个 ip
        'PORT': '3306', ## 端口号
    }
}
```

其中，`HOST`是主机 ip，这里使用的是本地，因此是`127.0.0.1`，`PORT`是端口号，本地 MySQL 的端口号是`3306`。然后，你需要在项目的`_init_.py`中添加：

```
import pymysql

pymysql.install_as_MySQLdb()
```

## 使用 Django 操作 MySQL 的表

### 创建表

表的操作都可以用 python 语法完成，其中 orm 会将其翻译成 SQL 语句，对于我们来说，无需自己再写 SQL 语句了。

在**已注册的应用**下的`models.py`中新建类，例如我们要创建一个用户信息的表，那么我们可以写成

```
from django.db import models

class UserInfo(models.Model):
name = models.CharField(max_length=32)
password = models.CharField(max_length=64)
age = models.IntegerField(default=0)
```

然后，我们在终端运行

这时，Django 自动为我们创建了表，其相当于

```sql
create table app01_userinfo(
    id bigint auto_increment primary key,
    name varchar(32),
    password varchar(64),
    age int
)
```

在 MySQL 终端输入

终端输出

```
mysql> show tables;
+----------------------------+
| Tables_in_webapp |
+----------------------------+
| app01_userinfo |
| auth_group |
| auth_group_permissions |
| auth_permission |
| auth_user |
| auth_user_groups |
| auth_user_user_permissions |
| django_admin_log |
| django_content_type |
| django_migrations |
| django_session |
+----------------------------+
11 rows in set (0.00 sec)
```

这表明，`app01_userinfo`的表已经被创建。当然，这里其他的表示 Django 内部的其他类，我们这里无需在意。接下来我们检查字段。MySQL 终端输入

观察到输出

```
mysql> desc app01_userinfo;
+----------+-------------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+----------------+
| id | bigint | NO | PRI | NULL | auto_increment |
| name | varchar(32) | NO | | NULL | |
| password | varchar(64) | NO | | NULL | |
| age | int | NO | | NULL | |
+----------+-------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```

其中，`name`，`password`和`age`都是我们所定义的字段，`id`是 Django 自动创建的字段。

### 修改表

当然，我们也免不了修改表的字段数，例如，我们不需要`age`这一个字段了，我们只需要在`models.py`下删除之。

```python
from django.db import models

class UserInfo(models.Model):
name = models.CharField(max_length=32)
password = models.CharField(max_length=64)

- age = models.IntegerField(default=0)
```

然后重新在终端执行`makemigrations`和`migrate`二连，我们就可以观察到这一字段消失了。

有时候，我们也会为表中新增字段，例如：

```python
from django.db import models

class UserInfo(models.Model):
name = models.CharField(max_length=32)
password = models.CharField(max_length=64)
age = models.IntegerField(default=0)

- sex = models.CharField(max_length=4)
```

执行数据迁移二连，我们会发现控制台有警报。

这是因为，当我们添加字段时，如果表中有数据，那么这些数据的新字段的值我们就不得而知。因此，会产生上述的告警。控制台给了我们两种解决方式：

1. 为已有的数据分配初始值来填补这些空缺；
2. 在`models.py`中声明初始值。

对于选择 1，我们可以将已有的数据的该字段的值赋值成为我们指定的值，这里不多说了。对于选择 2，则需要为该字段指定默认值，那么上述语句可以被重写成

```python
class UserInfo(models.Model):
name = models.CharField(max_length=32)
password = models.CharField(max_length=64)
age = models.IntegerField(default=0)

- sex = models.CharField(max_length=4)

* sex = models.CharField(max_length=4, default='male')
```

于是，控制台告警消失，并且之前所有已存在的数据的新字段都被赋值为初始值。当然了，你也可以声明该字段允许为空，例如：

```python
class UserInfo(models.Model):
name = models.CharField(max_length=32)
password = models.CharField(max_length=64)
age = models.IntegerField(default=0)

- sex = models.CharField(max_length=4, default='male')

* sex = models.CharField(max_length=4,blank=True,null=True)
```

这样也是可以的。

## 使用 Django 操作 MySQL 中的数据

我们依然可以用 python 语句来操作 MySQL 中的数据。

### 创建数据

创建数据的语法是：

```
{类名}.objects.create(参数列表)
```

例如我们需要在`app01_userinfo`中插入一段记录，以下就是一个例子：

```
UserInfo.objects.create(name="Felix", password="123", age=19)
```

这句 python 会被 orm 翻译成 SQL 语句：

```
insert into app01_userinfo(name, password, age)value("Felix", "123", 19)
```

### 删除数据

删除数据的语法是：

```
{类名}.objects.filter(筛选条件).delete()
```

如果你要清空数据，那么可以写成

```
{类名}.objects.all().delete()
```

当然，过滤函数还有许多写法，这里只展示了`filter()`和`all()`。

### 查找数据

查找数据的语法是

```
{类名}.objects.filter(筛选条件)
```

函数的返回值是一个`QuerySet`类型，在 python 中，其可以被理解成**结构体对象的列表**，例如

[<UserInfo: UserInfo object (1)>, <UserInfo: UserInfo object (2)>, <UserInfo: UserInfo object (3)>]

如果我们要读取其内部值，就可以用简单的 python 语法实现，这里举个例子：

```
user_info_list = UserInfo.objects.all()
for obj in user_info_list:
print(obj.id, obj.name, obj.password, obj.age)
```

当然，如果我们明确知道表中只有一行数据，那么我们可以避免使用循环，直接用

```
obj = UserInfo.objects.all().first()
```

获取对象即可。

### 更新数据

更新数据，首先要找到需要更新的记录，因此，前一部分与查找是很相似的。`update()`函数完成后续的更新操作，例如：

```
UserInfo.objects.filter(id=2).update(password = "999")
```

则被筛选出的记录的`password`字段都会被更新成`999`。

## models数据类型处理

如何在 django 中处理不同的数据类型？

## Django 中数据类型的处理

首先来看一下最近一个练手项目(用户管理系统)中基础的**部门表**和**用户表**的定义。

```python
from django.db import models


## 员工管理系统
class Department(models.Model):
    """这是部门的表：id, title"""
    title = models.CharField(verbose_name='标题', max_length=32)


class UserInfo(models.Model):
    """员工表"""
    name = models.CharField(verbose_name='姓名', max_length=16)
    password = models.CharField(verbose_name='密码', max_length=64)
    age = models.IntegerField(verbose_name='年龄')
    account = models.DecimalField(verbose_name='账户余额', max_digits=10,
                                  decimal_places=2, default=0)
    create_time = models.DateTimeField(verbose_name='入职时间')

    depart = models.ForeignKey(to="Department", to_field="id", on_delete=models.CASCADE)

    ## 性别选项
    gender_choices = (
        (1, "男"),
        (2, "女"),
    )
    gender = models.SmallIntegerField(verbose_name="性别", choices=gender_choices)


```

针对上面出现的类型，这里做一些相应地解释。

### CharField

`CharField`是基础的字符串类型，上述案例中，`verbose_name=`参数在许多函数中都出现了，实际上，这个参数主要是便于开发者自己了解每一个字段代表什么含义，由于我们是 Django 开发，因此我们使用注释的方案也可以，具体看个人喜好。对于 CharField 来说，`max_length=`是必要的，因为在创建 MySQL 表时，我们需要指定每一个`varchar`的字节数。

### DecimalField

是 Python 中十进制浮点数的实例。上述例子中含有两个参数，`max_digits=`表示数字位数，这是**同时包含整数部分和小数部分的位数**。`decimal_places=`表示小数位数。`default=`用于在使用`UserInfo.objects.create()`时没有指定`account`参数值的时候的默认值。

### DateTimeField

`DateTimeField`是专门存储时间的字段类型，格式为`Y-m-d H:m:s`。当我们要输出这个值时，我们通常要先对其进行格式化。我们使用`strftime({format})`来达到这个目的。format 的格式包含以下多种选择。

```
%y 两位数的年份表示（00-99）
%Y 四位数的年份表示（000-9999）
%m 月份（01-12）
%d 月内中的一天（0-31）
%H 24小时制小时数（0-23）
%I 12小时制小时数（01-12）
%M 分钟数（00=59）
%S 秒（00-59）
%a 本地简化星期名称
%A 本地完整星期名称
%b 本地简化的月份名称
%B 本地完整的月份名称
%c 本地相应的日期表示和时间表示
%j 年内的一天（001-366）
%p 本地A.M.或P.M.的等价符
%U 一年中的星期数（00-53）星期天为星期的开始
%w 星期（0-6），星期天为星期的开始
%W 一年中的星期数（00-53）星期一为星期的开始
%x 本地相应的日期表示
%X 本地相应的时间表示
%Z 当前时区的名称
%% %号本身
```

当然，我们最常用的还是

```
time.strftime("%Y-%m-%d %H:%m:%s")  ## 精确到秒的时间记录
time.strftime("%Y-%m-%d")  ## 精确到日期的时间记录
```

在 Django 模板语法中，一般是不允许出现括号的。在前端页面，我们需要改写成

```
<span>{{ time|date:"Y-m-d" }}</span>
```

在 Pycharm 中按住Ctrl查看上述案例中`date`的源码，可以发现其也是一个函数，只不过使用了特殊的`|`符号表示而已。

### ForeignKey

`ForeignKey`表示的是外键，也就是将表与表之间建立联系的一种方式。在上述案例中，由于我们需要知晓员工的所属部门，因此我们使用外键将`depart`字段与`Department`中的`id`字段相关联。在 Django 自动生成表的时候，`depart`字段会被命名成`depart_id`。使用`ForeignKey`的时候，我们需要指定参数`to=`和`to_field=`，前者指定与哪张表关联，后者指定关联的字段名。当然了，由于关联的原因，我们还需要指定`on_delete=`，这个参数指定当`Department`表中的数据删除时，`UserInfo`中对应这些数据的记录将要如何操作。`models.CASCADE`表示**级联删除**，即**删除所有与被删除数据相关联的记录**；还可以选择`models.SET_NULL`，这样所有关联数据的该字段将会被**置空**。但这有一个前提，你需要在参数列表指定该字段可以为空，即

```
department = models.ForeignKey(to="Department", to_field="id", null=True, blank=True, on_delete=models.SET_NULL)
```

在读取数据中，我们需要先获取`UserInfo`的记录，再通过外链访问`Department`，即

```
obj = models.UserInfo.objects.fileter({筛选条件}).first()  ## 获取满足筛选条件的第一个对象
print(obj.depart_id)  ## 访问obj.depart_id，我们得到的是部门id
title = models.Department.objects.filter(id=obj.depart_id).first().title  ## 再次筛选，取出title字段才是我们要的部门名称

title = models.Department.objects.filter(id=models.UserInfo.objects.filter({筛选条件}).first().depart_id).first().title
## 合并上述语句我们得到非常之长的一句数据库查询语句
```

显然，这句语句太长了，Django 提供了另一种通过外键查询另一张表的方式，在上述例子中

```
obj = models.UserInfo.objects.fileter({筛选条件}).first()  ## 获取满足筛选条件的第一个对象
print(obj.depart.title)  ## 这时直接输出了部门名字
```

在这种书写方式下，`obj.depart`直接返回根据`depart_id`查询到的第一个`object`。由于我们这个案例中 ID 值唯一，于是直接访问其`.title`即可。

于是在前端页面，我们可以通过如下的模板语法访问每一个人对应的部门的名称：

```
<tbody>
  {% for obj in userinfo_list %}
  <tr>
    <td>{{ obj.name }}</td>
    <td>{{ obj.depart.title }}</td>
  </tr>
  {% endfor %}
</tbody>
```

### SmallIntegerField

该数据类型常应用于固定的枚举型，例如上例中的性别。在绝大多数情况下，性别是不会继续添加的，因此我们可以用元组的嵌套来指定这种对应关系：

```
gender_choices=(
    (1, "男"),
    (2, "女")
)
```

相比于存储汉字，在数据库中存储短整型占用更少的存储空间。这种情况下，你需要为`SmallIntegerField`指定参数`choices=`。这个参数接受一个嵌套元组用来指定对应关系。

当然，这会带来一个问题，我们访问`obj.gender`时，会输出整型而非我们想要的汉字“男”或“女”，同样的，Django 提供了一个函数：

```
obj.get_gender_display()  ## 这个函数名称会随着你对字段名命名的不同而变化

## 命名规则
obj.get_{字段名称}_display()
```

在前端页面，你可以使用模板语法来完成这个功能：

```
{{ obj.get_gender_display }}
```

需要注意的是：**你依然不需要在函数末尾添加括号。**

## Django 的 html 模板

这部分不是本文的重点，但也是Django开发中十分重要的一部分，其可以大大增加代码复用率。因此也一并写在这里。

很多时候，许多 HTML 文件都具备一部分的相同结构，例如，所有页面都有页面顶部的导航栏(navigation bar)，都需要引入相同的 css 和 js 等文件。Django 提供模板页面来解决这个问题。我们只需要在模板文件中需要被插入的结构加入：

```
<!DOCTYPE html>
<html>
  <!--省略以上html内容-->

  {% block {板块名称} %} {% endblock %}

  <!--省略以下html内容-->
</html>
```

然后再需要使用的页面引入该模板即可，如果模板名称为`layout.html`，那么就可以写成这样：

```
{% extends 'layout.html' %} {% block {模块名称} %}

<!--这里是你的html-->

{% endblock %}
```

渲染该页面时，Django 会自动将其与模板`layout.html`拼接。一个模板中可以有多个这样的结构，一个 HTML 文件中也可以由多个这样的结构组成。

## 为ModelForm表单添加样式、如何拼接GET参数

为 django 中的 modelform 添加样式。

### ModelForm 表单

得益于 ModelForm 表单，我们不必在前端写复杂的 html 代码来实现表单。我们只需要一个简单的循环，以及对每一个字段的引用就可以做到了：

```
<form method="post" novalidate>
  {% csrf_token %} {% for field in form %}
  <div class="form-group">
    <label for="exampleInputEmail1">{{ field.label }}</label>
    {{field}}
    <span style="color: red">{{ field.errors.0 }}</span>
  </div>
  {% endfor %}
  <button type="submit" class="btn btn-success">确认提交</button>
</form>
```

但是正是因为`input`框由 django 的 ModelForm 为我们自动生成，为其添加样式(例如 BootStrap)就变得比较困难。在 django 中存在解决这个问题的途径。

#### 第一种：修改 ModelForm 类的 widget 属性

widget 属性决定了每一个字段通过 django 渲染出的 html 代码格式。例如要为`username`字段添加`class="form-control"`的类名，那么我们就可以在定义 ModelForm 类时：

```
class ExampleModelForm(models.ModelForm):

    class Meta:
        model = models.Administrator
        fields = ["username"]
        widgets = {
            "username": forms.CharField(attrs={"class":"form-control"})
        }
```

在字典中我们还可以添加其他键值关系，这样在前端渲染`input`时，就会带上我们所指定的`class="form-control"`。同样的，在 widgets 字典中还可以指定多个字段自己的 widget 属性。

但是这样做会带来一个问题，例如我们对所有输入框都要应用 BootStrap 的样式，那么在 widgets 中逐个添加是否有些繁琐了呢？当然，我们也有办法解决这个问题。

#### 第二种：重写**init**方法

在创造这个`ExampleModelForm`类时，其存在默认的`__init__(self)`方法。我们重写这个方法。

```
class BootStrapModelForm(forms.ModelForm):
def **init**(self, *args, \*\*kwargs):
super().**init**(*args, \*\*kwargs) ## 循环每个字段为其插件进行设置
for name, field in self.fields.items(): ## 字段中有属性，则增加
if field.widget.attrs:
field.widget.attrs["class"] = "form-control"
field.widget.attrs["placeholder"] = field.label
else:
field.widget.attrs = {
"class": "form-control", ## 还可以添加其他的标签，例如 placeholder
"placeholder": field.label
}
```

对上述代码做出一些解释。`super().__init__(*args,**kwargs)`是必须执行的，其初始化父类。然后，我们对存在的所有字段进行遍历，并对其中的`field`设置`widget`。其中，判断句`if`是为了防止覆盖原本的`attrs`属性。对于重写后的`__init__(self)`方法，我们可以单独将其作为一个父类，之后需要使用的所有 ModelForm 都改为继承此父类即可。

### 拼接 URL

在访问 url 时，许多网站采用 GET 方式传参，这种参数一般显式地拼接在 url 后，例如

https://127.0.0.1:8000/index/?page=4

在开发中，这样的参数可能不止一个，对于多个参数，在点击超链接时为了防止参数的损失，解决方式之一就是对超链接进行后端的拼接。django 自然也支持这个操作。例如我们需要对上述 url 拼接一个`key=12`的参数使得其能够携带两个参数，我们首先要获取已有的参数。在访问 url 时，`request`变量会携带所有与这次 url 访问有关的信息，因此，我们要从这里动手脚。当然，出于保护机制，django 不允许直接修改`request`的值，因此，我们需要拷贝一份。

```
query_dict = .deep(request.GET)
```

说明一下上一行代码：`request.GET`携带了以 GET 方式传递的所有参数，其类型是一个字典。然后，我们要对`query_dict`添加键值关系，`setlist()`方法支持这种操作。例如我们来添加`key=12`。

```
query_dict.setlist("key", 12)
```

这样，新的键值关系就被我们添加完成了。此时`query_dict`的值应该是

```
query_dict = {
"page": 4,
"key": 12
}
```

 最后，我们拼接 url。

```
url = "https://127.0.0.1:8000/index/?{}".format(query_dict.urlencode())

print(url)

## "https://127.0.0.1:8000/index/?page=4&key=12"
```