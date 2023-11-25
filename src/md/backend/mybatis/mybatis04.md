# 四、动态SQL

**标签方式**

| 标签          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| `<sql>`       | 定义可重用的 SQL 片段，可以在其他语句中引用。                |
| `<include>`   | 引用 `<sql>` 标签中定义的 SQL 片段。                         |
| `<if>`        | 根据条件判断是否执行 SQL 片段。                              |
| `<trim>`      | 根据条件对 SQL 语句进行修剪，去除不必要的部分。              |
| `<where>`     | 定义 WHERE 子句，用于在查询语句中添加条件。如果where后面的字符串是以AND或者OR开头的，就将它们剔除。 |
| `<set>`       | 定义 SET 子句，用于在更新语句中设置要更新的列和值。如果该标签包含的元素中有返回值，就插入一个set，如果set后面的字符串是以,结尾的，就将这个逗号剔除。 |
| `<foreach>`   | 遍历集合或数组，并将元素应用于 SQL 语句中的参数。            |
| `<choose>`    | 类似于 Java 中的 switch 语句，根据条件选择不同的 SQL 片段。  |
| `<when>`      | `<choose>` 标签中的条件分支，用于定义条件和对应的 SQL 片段。 |
| `<otherwise>` | `<choose>` 标签中的默认分支，当所有条件不满足时执行的 SQL 片段。 |



**注解方式**

| 注解              | 作用                                          |
| ----------------- | --------------------------------------------- |
| `@SelectProvider` | 使用提供的类或方法生成动态 SQL 查询语句。     |
| `@InsertProvider` | 使用提供的类或方法生成动态 SQL 插入语句。     |
| `@UpdateProvider` | 使用提供的类或方法生成动态 SQL 更新语句。     |
| `@DeleteProvider` | 使用提供的类或方法生成动态 SQL 删除语句。     |
| `@Lang`           | 指定语言驱动，用于支持自定义的动态 SQL 语言。 |

## 4.1 if 标签

- if标签的test属性必填，该属性值是一个符合OGNL要求的判断表达式，一般只用true或false作为结果。
- 判断条件property != null 或 property == null，适用于任何类型的字段，用于判断属性值是否为空。
- 判断条件property != '' 或 property == ''，仅适用于String类型的字段，用于判断是否为空字符串。
- 当有多个判断条件时，使用and或or进行连接，嵌套的判断可以使用小括号分组。

```xml
<!-- 用户信息综合查询
    #{userCustom.sex}:取出pojo包装对象中性别值
    ${userCustom.username}：取出pojo包装对象中用户名称
 -->
<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <if test="userCustom.sex!=null and userCustom.sex != '' ">
            AND user.sex=#{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username != '' ">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </where>
</select>
```



## 4.2 choose、when、otherwise 标签

```xml
<select id="selectByIdOrUserName" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT  id,name,password,email,FROM user WHERE 1 = 1
    <choose>
        <when test="id != null">
            AND id = #{id}
        </when>
        <when test="userName != null and userName != ''">
            AND user_name = #{userName}
        </when>
        <otherwise>
            AND 1 = 2
        </otherwise>
    </choose>
</select>
```



## 4.3 trim、where、set 标签

trim 是一个比较通用的标签用于去除sql语句中多余的and关键字，逗号，或者给sql语句前拼接 “where“、“set“以及“values(“ 等前缀，或者添加“)“等后缀。

属性

- `prefix`：给sql语句拼接的前缀。
- `suffix`：给sql语句拼接的后缀
- `prefixOverrides`：去除sql语句前面的关键字或者字符。
- `suffixOverrides`：去除sql语句后面的关键字或者字符。

```xml
<select id="selectByUserWhere" resultType="com.zwwhnly.mybatisaction.model.SysUser">
    SELECT id,
    user_name,
    user_password,
    user_email,
    create_time
    FROM sys_user
    <where>
        <if test="userName != null and userName != ''">
            AND user_name LIKE CONCAT('%',#{userName},'%')
        </if>
        <if test="userEmail != null and userEmail != ''">
            AND user_email = #{userEmail}
        </if>
    </where>
</select>

<update id="updateByIdSelectiveSet">
    UPDATE sys_user
    <set>
        <if test="userName != null and userName != ''">
            user_name = #{userName},
        </if>
        <if test="userPassword != null and userPassword != ''">
            user_password = #{userPassword},
        </if>
        <if test="userEmail != null and userEmail != ''">
            user_email = #{userEmail},
        </if>
        <if test="userInfo != null and userInfo != ''">
            user_info = #{userInfo},
        </if>
        <if test="headImg != null">
            head_img = #{headImg,jdbcType=BLOB},
        </if>
        <if test="createTime != null">
            create_time = #{createTime,jdbcType=TIMESTAMP},
        </if>
        id = #{id},
    </set>
    WHERE id = #{id}
</update>

<trim prefix="WHERE" prefixOverrides="AND">
	<if test="state != null">
	  state = #{state}
	</if> 
	<if test="title != null">
	  AND title like #{title}
	</if>
	<if test="author != null and author.name != null">
	  AND author_name like #{author.name}
	</if>
</trim>
```



## 4.4 foreach 标签

向sql传递数组或List，mybatis使用foreach解析

在用户查询列表和查询总数的statement中增加多个id输入查询。两种方法，sql语句如下：

- `SELECT * FROM USER WHERE id=1 OR id=10 OR id=16`
- `SELECT * FROM USER WHERE id IN(1,10,16)`

一个使用OR,一个使用IN


- 在输入参数类型中添加`List<Integer> ids`传入多个id

foreach包含属性讲解：

- open：整个循环内容开头的字符串。
- close：整个循环内容结尾的字符串。
- separator：每次循环的分隔符。
- item：从迭代对象中取出的每一个值。
- index：如果参数为集合或者数组，该值为当前索引值，如果参数为Map类型时，该值为Map的key。
- collection：要迭代循环的属性名。

```xml
<if test="ids!=null">
    <!-- 使用实现下边的sql拼接：
     AND (id=1 OR id=10 OR id=16)
     -->
    <foreach collection="ids" item="user_id" open="AND (" close=")" separator="or">
        <!-- 每个遍历需要拼接的串 -->
        id=#{user_id}
    </foreach>

    <!-- 实现  “ and id IN(1,10,16)”拼接 -->
    <!-- <foreach collection="ids" item="user_id" open="and id IN(" close=")" separator=",">
        每个遍历需要拼接的串
        #{user_id}
    </foreach> -->
</if>
```



## 4.5 sql 标签

```xml
<!-- 定义sql片段
id：sql片段的唯 一标识

经验：是基于单表来定义sql片段，这样话这个sql片段可重用性才高
在sql片段中不要包括 where
 -->
<sql id="query_user_where">
    <if test="userCustom!=null">
        <if test="userCustom.sex!=null and userCustom.sex!=''">
            AND user.sex = #{userCustom.sex}
        </if>
        <if test="userCustom.username!=null and userCustom.username!=''">
            AND user.username LIKE '%${userCustom.username}%'
        </if>
    </if>
</sql>

<select id="findUserList" parameterType="com.iot.mybatis.po.UserQueryVo"
        resultType="com.iot.mybatis.po.UserCustom">
    SELECT * FROM user
    <!--  where 可以自动去掉条件中的第一个and -->
    <where>
        <!-- 引用sql片段 的id，如果refid指定的id不在本mapper文件中，需要前边加namespace -->
        <include refid="query_user_where"></include>
        <!-- 在这里还要引用其它的sql片段  -->
    </where>
</select>
```
