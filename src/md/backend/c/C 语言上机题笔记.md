# [C 语言上机题笔记](#/C/C-Code?id=c-语言上机题笔记)

> C语言程序设计第四版——谭浩强著，此书中的代码题大部分已经在本文中展示，以及南开大学 C 语言上机题库 100 题的作答，如果有作答不正确的地方或者可优化的地方，欢迎指正，谢谢！

## [001 屏幕输出指定信息](#/C/C-Code?id=_001-屏幕输出指定信息)

【题目】要求再屏幕上输出以下一行信息

This is a C program.

【代码】

```c
#include <stdio.h> 

int main(){
    printf("This is a C program.\n");
    return 0;
} 
```

## [002 求两个整数之和](#/C/C-Code?id=_002-求两个整数之和)

【题目】a + b = ?

【代码】

```c
#include <stdio.h> 

int main(){
    int a,b,sum;
    a = 123;
    b = 456;
    sum = a + b;
    printf("sum = %d\n",sum); 
    return 0;
} 
```

## [003 求两个整数中较大者](#/C/C-Code?id=_003-求两个整数中较大者)

【题目】求两个整数中较大者

【代码】

```c
#include <stdio.h> 

int max(int x,int y);

int main(){
    int a,b,c;
    scanf("%d,%d",&a,&b);
    c = max(a,b);
    printf("max = %d\n",c);
    return 0;
} 
//求两个整数中较大者 
int max(int x,int y){
    return x>y?x:y; 
}
```

## [004 求三个整数中的最大者](#/C/C-Code?id=_004-求三个整数中的最大者)

【题目】编写一个 C 程序，输入 a，b，c 三个整数，输出其中最大者

【代码】

- Example 01：

```c
#include <stdio.h> 

int max(int x,int y,int z);

int main(){
    int a,b,c,d;
    scanf("%d,%d,%d",&a,&b,&c);
    d = max(a,b,c);
    printf("max = %d\n",d);
    return 0;
} 
//求3个整数中较大者 
int max(int x,int y,int z){
    int t;
    if(x>y) {
        if(x>z){
            t = x;
        }else {
            t = z;
        }
    }else if(y<z){
            t = z;
        }else{
            t = y;
        }
    return t; 
}
```

- Example 02：对 01 代码进行了优化

```c
#include <stdio.h> 

int max(int x,int y,int z);

int main(){
    int a,b,c,d;
    scanf("%d,%d,%d",&a,&b,&c);
    d = max(a,b,c);
    printf("max = %d\n",d);
    return 0;
} 
//求3个整数中较大者 
int max(int x,int y,int z){
    int max = x;
    if(max<y){
        max = y;
    }
    if(max<z){
        max = z;
    }
    return max; 
}
```

## [005 求1×2×3×4×5](#/C/C-Code?id=_005-求1×2×3×4×5)

【题目】求1×2×3×4×5

【代码】

```c
#include <stdio.h> 

int factorial(int n);

int main(){
    int result;
    result = factorial(5); 
    printf("1×2×3×4×5 = %d\n",result);
    return 0;
} 
//求1×2×3×4×5 (5! 阶乘)
int factorial(int n){
    int i=2,t=1;
    while(i<=n){
        t *= i;
        i++;
    }
    return t; 
}
```

## [006 求多项式1-1/2+1/3-1/4+...+1/99-1/100](#/C/C-Code?id=_006-求多项式1-1213-14199-1100)

【题目】求多项式1-1/2+1/3-1/4+...+1/99-1/100

【代码】

```c
#include <stdio.h> 

double sum(int n);

int main(){
    printf("%lf\n",sum(100));
    return 0;
}

double sum(int n){
    int sign = 1;
    double result = 1.0;
    int i = 2;
    while(i<=n){
        sign = -sign;
        result += (double)sign/i;
        i++;
    }
    return result;
}
```

## [007 输出给定小写字母](#/C/C-Code?id=_007-输出给定小写字母)

【题目】给定一个大写字母，要求用小写字母输出

【代码】

```c
#include <stdio.h> 

int main(){
    char c1,c2;
    c1 = 'A';
    c2 = c1 + 32;
    printf("%c\n",c2);
    printf("%d\n",c2);
    return 0;
}
```

## [008 从键盘输入字符输出](#/C/C-Code?id=_008-从键盘输入字符输出)

【题目】从键盘输入BOY 3个字符，然后把他们输出到屏幕

【代码】

```c
#include <stdio.h> 

int main(){
    char a,b,c;
    a = getchar();
    b = getchar();
    c = getchar();
    putchar(a);
    putchar(b);
    putchar(c);
    putchar('\n');
    return 0;
}
```

## [009 输出任意小写字母](#/C/C-Code?id=_009-输出任意小写字母)

【题目】`改写 007`，从键盘上输入一个大写字母，在显示屏上显示对应的小写字母

【代码】

```c
#include <stdio.h> 

int main(){
    char c1,c2;
    c1 = getchar();
    c2 = c1 + 32;
    putchar(c2);
    putchar('\n');
    return 0;
}
```

## [010 判别是否为大写字母](#/C/C-Code?id=_010-判别是否为大写字母)

【题目】输入一个字符，判别它是否为大写字母，如果是，将它转换成小写字母；如果不是，则不转换。然后输出最后得到的字符

【代码】

```c
#include <stdio.h> 

int main(){
    char c;
    scanf("%c",&c);
    c = (c>='A'&&c<='Z')?(c+32):c;
    printf("%c\n",c); 
    return 0;
}
```

## [011 成绩按等级输出](#/C/C-Code?id=_011-成绩按等级输出)

【题目】要求按照考试成绩的等级输出百分制分数段，A等为85分以上，B等为70 ~ 84，C等60 ~ 69，D等为60分以下。成绩的等级由键盘输入

【代码】

```c
#include <stdio.h> 

int main(){
    char grade;
    scanf("%c",&grade);
    printf("Your score：");
    switch(grade){
        case 'A': printf("85-100\n");break;
        case 'B': printf("70-84\n");break;
        case 'C': printf("60-69\n");break;
        case 'D': printf("<60\n");break;
        default:  printf("enter data error！\n");
    }

    return 0;
}
```

## [012 判断闰年](#/C/C-Code?id=_012-判断闰年)

【题目】写一程序，判断某一年是否为闰年

【代码】

```c
#include <stdio.h> 
#include <stdbool.h>

bool isLeap(int year);

int main(){
    int year;
    scanf("%d",&year);
    if(isLeap(year)){
        printf("%d is ",year);
    }else{
        printf("%d is not ",year);
    }
    printf("a leap year.\n");

    return 0;
}

bool isLeap(int year){
    bool leap = false;
    if((year%4==0 && year%100!=0)||(year%400==0)){
        leap = true;
    }
    return leap;
}
```

## [013 求1+2+3+...+100](#/C/C-Code?id=_013-求123100)

【题目】

【代码】

- Example 01：[ while 语句实现 ]

```c
#include <stdio.h> 

int sum(int n);

int main(){
    printf("%d\n",sum(100));
    return 0;
}

int sum(int n){
    int result = 0;
    int i = 1;
    while(i<=n){
        result += i;
        i++;
    }
    return result;
}
```

- Example 02：[ do...while 语句实现 ]

```c
#include <stdio.h> 

int sum(int n);

int main(){
    printf("%d\n",sum(100));
    return 0;
}

int sum(int n){
    int result = 0;
    int i = 1;
    do{
        result += i;
        i++;
    }while(i<=n);
    return result;
}
```

- Example 03：[ for 语句实现 ]

```c
#include <stdio.h> 

int sum(int n);

int main(){
    printf("%d\n",sum(100));
    return 0;
}

int sum(int n){
    int result = 0;
    int i;
    for(i=1;i<=n;i++){
        result += i;
    }
    return result;
}
```

## [014 输出以下4*5的矩阵](#/C/C-Code?id=_014-输出以下45的矩阵)

【题目】输出以下4*5的矩阵

1 2 3 4 5

2 4 6 8 10

3 6 9 12 15

4 8 12 16 20

【代码】

```c
#include <stdio.h> 

int main(){
    int i,j;
    for(i=1;i<=4;i++){
        for(j=1;j<=5;j++){
            printf("%d\t",i*j);
            if(j%5 == 0){
                printf("\n");
            }        
        }
        printf("\n");
    }
    return 0;
}
```

## [015 求最大公约数和最小公倍数](#/C/C-Code?id=_015-求最大公约数和最小公倍数)

【题目】输入两个正整数m和n，求其最大公约数和最小公倍数

【思路】

- 思路一：辗转相除法
  - 有两整数a和b：
  - ① a%b得余数c
  - ② 若c=0，则b即为两数的最大公约数
  - ③ 若c≠0，则a=b，b=c，再回去执行①
- 思路二：相减法
  - 有两整数a和b：
  - ① 若a>b，则a=a-b
  - ② 若a<b，则b=b-a
  - ③ 若a=b，则a（或b）即为两数的最大公约数
  - ④ 若a≠b，则再回去执行①
- 思路三：穷举法
  - ① i= a(或b)
  - ② 若a，b能同时被i整除，则i即为最大公约数，结束
  - ③ i–，再回去执行②

【代码】

- Example 01：[ 辗转相除法求最大公约数 ]

```c
#include <stdio.h> 

int main(){
    int m,n,a,b,c;
    scanf("%d,%d",&m,&n);
    a = m;
    b = n;
    // 辗转相除法求最大公约数 
    while(b){
        c = a%b;
        a = b;
        b = c;
    }
    printf("最大公约数为%d\n",a);
    //最小公倍数=两整数的乘积÷最大公约数
    printf("最小公倍数为%d\n",m*n/a);

    return 0;
}
```

- Example 02：

```c
#include <stdio.h> 

int gcd(int a,int b);

int main(){
    int m,n;
    scanf("%d,%d",&m,&n);
    int a = gcd(m,n);
    printf("最大公约数为%d\n",a);
    //最小公倍数=两整数的乘积÷最大公约数
    printf("最小公倍数为%d\n",m*n/a);

    return 0;
}
//求最大公约数
int gcd(int a,int b)
{
    int c;
    // 辗转相除法求最大公约数 
    while(b){
        c = a%b;
        a = b;
        b = c;
    }
    return a;
}
```

- Example 03：

```c
#include <stdio.h> 

int gcd(int a,int b);

int main(){
    int m,n;
    scanf("%d,%d",&m,&n);
    int a = gcd(m,n);
    printf("最大公约数为%d\n",a);
    //最小公倍数=两整数的乘积÷最大公约数
    printf("最小公倍数为%d\n",m*n/a);

    return 0;
}
//求最大公约数
int gcd(int a,int b)
{
    int g;
    if(b==0)g=a;
    else g=gcd(b,a%b);
    return g;
}
```

- Example 04：[相减法]

```c
#include <stdio.h> 

int gcd(int a,int b);

int main(){
    int m,n;
    scanf("%d,%d",&m,&n);
    int a = gcd(m,n);
    printf("最大公约数为%d\n",a);
    //最小公倍数=两整数的乘积÷最大公约数
    printf("最小公倍数为%d\n",m*n/a);

    return 0;
}
//求最大公约数
int gcd(int a,int b)
{
    // 相减法求最大公约数 
    while(a != b){
        if(a>b){
            a -= b;
        }else{
            b -= a;
        }
    }
    return a;
}
```

- Example 05：[穷举法]

```c
#include <stdio.h> 

int gcd(int a,int b);

int main(){
    int m,n;
    scanf("%d,%d",&m,&n);
    int a = gcd(m,n);
    printf("最大公约数为%d\n",a);
    //最小公倍数=两整数的乘积÷最大公约数
    printf("最小公倍数为%d\n",m*n/a);

    return 0;
}
//求最大公约数
int gcd(int a,int b)
{
    int c;
    // 穷举法求最大公约数 
    for(c=a;c>0;c--){
        if(a%c==0&&b%c==0){
            break;
        }
    }
    return c;
}
```

## [016 数组元素逆序输出](#/C/C-Code?id=_016-数组元素逆序输出)

【题目】对10个数组元素依次赋值为0,1,2,3,4,5,6,7,8,9 要求按逆序输出

【代码】

- Example 01：( 直接赋初值)

```c
#include <stdio.h> 

int main(){
    int i,a[10]={0,1,2,3,4,5,6,7,8,9};

    for(i=9;i>=0;i--){
        printf("%d ",a[i]);
    }
    printf("\n");

    return 0;
}
```

- Example 02：( for 循环赋初值)

```c
#include <stdio.h> 

int main(){
    int i,a[10];
    for(i=0;i<10;i++){
        a[i] = i;
    }
    for(i=9;i>=0;i--){
        printf("%d ",a[i]);
    }
    printf("\n");

    return 0;
}
```

## [017 数组求Fibonacci数列问题](#/C/C-Code?id=_017-数组求fibonacci数列问题)

【题目】使用数组求Fibonacci数列问题

【代码】

```c
#include <stdio.h> 
#define _Max 20

int main(){
    int i;
    int f[_Max]={1,1};
    for(i=2;i<_Max;i++){
        f[i] = f[i-2] + f[i-1];
    }
    for(i=0;i<_Max;i++){
        if(i%5==0){
            printf("\n");
        }
        printf("%12d",f[i]);
    }
    printf("\n");

    return 0;
}
```

## [018 对n个数升序排序](#/C/C-Code?id=_018-对n个数升序排序)

【题目】对n个数按升序排序

【代码】

- Example 01：( 冒泡法排序 )

```c
#include <stdio.h> 
#define N 5

int main(){
    int a[N];
    int i,j,t;
    printf("input %d numbers:\n",N);
    for(i=0;i<N;i++){
        scanf("%d",&a[i]);
    }
    printf("\n");
    for(i=0;i<N-1;i++){
        for(j=0;j<N-1-i;j++){
            if(a[j]>a[j+1]){
                t = a[j];
                a[j] = a[j+1];
                a[j+1] = t;
            }
        }
    }
    for(i=0;i<N;i++){
        printf("%d ",a[i]);
    }
    printf("\n");

    return 0;
}
```

## [019 二维数组行列元素互换](#/C/C-Code?id=_019-二维数组行列元素互换)

【题目】将一个二维数组行与列的元素互换，存到另一个二维数组中，比如：

�=[123456]�=[142536]a=[142536]b=⎣⎢⎡123456⎦⎥⎤

【代码】

```c
#include <stdio.h> 
#define M 2
#define N 3

int main(){

    int a[M][N] = {{1,2,3},{4,5,6}};
    int b[N][M];
    int i,j;
    printf("array a：\n");
    for(i=0;i<M;i++){
        for(j=0;j<N;j++){
            printf("%5d",a[i][j]);
            b[j][i] = a[i][j];
        }
        printf("\n");
    }
    printf("array b：\n");
    for(i=0;i<N;i++){
        for(j=0;j<M;j++){
            printf("%5d",b[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

## [020 输出已知的字符串](#/C/C-Code?id=_020-输出已知的字符串)

【题目】输出一个已知的字符串。

【代码】

- Example 01：利用字符数组

```c
#include <stdio.h>

int main(){
    char c[15] = {'I',' ','a','m'};
    int i;
    for(i=0;i<15;i++){
        printf("%c",c[i]);
    }
    printf("\n");
    return 0;
} 
```

- Example 02：

```c
#include <stdio.h>

int main(){
    char c[15] = {"I am"};
    printf("%s\n",c);
    return 0;
} 
```

- Example 03：使用 puts(str);

```c
#include <stdio.h>

int main(){
    char c[15] = {"I am"};
    puts(c);
    return 0;
} 
```

## [021 统计单词个数](#/C/C-Code?id=_021-统计单词个数)

【题目】输入一行字符，统计其中有多少个单词，单词之间用空格分隔开。

【思路】

![img](data:image/jpeg;base64,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)

【代码】

```c
#include <stdio.h> 

int main(){
    char string[81];
    int i,num = 0,word = 0;
    char c;
    gets(string);
    for(i=0;(c=string[i])!='\0';i++){
        if(c == ' '){
            word = 0;
        }else if(word == 0){
            word = 1;
            num++;
        }
    }
    printf("There are %d words in this line.\n",num);

    return 0;
}
```

## [022 字符串中找最大者](#/C/C-Code?id=_022-字符串中找最大者)

【题目】有3个字符串，要求找出其中最大者

【思路】

![img](data:image/jpeg;base64,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)

【代码】

```c
#include <stdio.h>
#include <string.h> 

int main(){
    char str[3][20];    //定义二维字符数组 
    char string[20];    //定义一维字符数组，作为交换字符串时候的临时字符数组     
    int i;
    for(i=0;i<3;i++){
        gets(str[i]);
    }
    if(strcmp(str[0],str[1])>0){
        strcpy(string,str[0]);
    }else{
        strcpy(string,str[1]);
    }
    if(strcmp(str[2],string)>0){
        strcpy(string,str[2]);
    }
    printf("\nThe largest string is：%s\n",string);

    return 0;
}
```

## [023 筛选法求素数](#/C/C-Code?id=_023-筛选法求素数)

【题目】用筛选法求 100 之内的素数

【代码】

```c
#include <string.h> 

int main(){
    int i,j,a[100];
    for(i=2;i<100;i++){
        a[i] = i;
        for(j=2;j<=i;j++){
            if(j<i && a[i]%j==0){
                break;
            }
            if(a[i] == j){
                printf("%5d",a[i]);
            }
        }

    }
    return 0;
}
```

## [024 选择法排序](#/C/C-Code?id=_024-选择法排序)

【题目】用选择法对 10 个整数排序

【代码】

- Example 01：

```c
#include <stdio.h>
#include <string.h> 

int main(){
    int i,j,a[10],t;
    for(i=0;i<10;i++){
        scanf("%d",&a[i]);
    }
    for(j=1;j<10;j++){
        for(i=0;i<10-j;i++){
            if(a[i]>a[i+1]){
                t = a[i];
                a[i] = a[i+1];
                a[i+1] = t;
            }
        }
    }
    for(i=0;i<10;i++){
        printf("%5d",a[i]);
    }
    return 0;
}
```

- Example 02：

```c
#include <stdio.h>
#define N 10

void sort(int array[],int n);

int main(){
    int a[N];
    int i;
    for(i=0;i<N;i++){
        scanf("%d",&a[i]);
    }
    sort(a,N);
    for(i=0;i<N;i++){
        printf("%d ",a[i]);
    }
    printf("\n");
    return 0;
}

void sort(int array[],int n){
    int i,j,k,t;
    for(i=0;i<n-1;i++){
        k = i;
        for(j=i+1;j<n;j++){
            if(array[j]<array[k]){
                k = j;
            }
        }
        t = array[k];
        array[k] = array[i];
        array[i] = t;
    }
}
```

## [025 对角线元素之和](#/C/C-Code?id=_025-对角线元素之和)

【题目】求一个3×3矩阵对角线元素之和

【代码】

```c
#include <stdio.h>
#include <string.h> 

int main(){
    int i,j,a[3][3],s1,s2;
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            scanf("%d",&a[i][j]);
        }
    } 
    s1 = a[0][0] + a[1][1] + a[2][2];
    s2 = a[0][2] + a[1][1] + a[2][0];
    printf("s1 = %d, s2 = %d\n",s1,s2);
    return 0;
}
```

## [026 用递归方法求 n！](#/C/C-Code?id=_026-用递归方法求-n！)

【题目】用递归方法求 n！

【思路】

![image-20200318165046564](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmkAAAC+CAYAAABu1ZhsAAAgAElEQVR4nOydd1xUx9f/PwtLFQFBRFBRIdjRiA0bWIgFQQU1SjRBJdZo7F2xoElQBMWCvWCBgCDFAjawYBeRIoggvS11l7Kw7fz+4Mf9ue6CGPN9Hp/nt+/Xa1+w586ZO3d27twzZ87MZRERQYECBQoUKFCgQME3hdJ/dwEUKFCgQIECBQoUyKK8Y8eOHf/dhWjk8uXLEAqF0NPTA5vNljleXV0NFouF2tpaqKmpScnLyspQXV3dog+LxYKqqiqjLxQKweFwPqvXunXrFl8Lj8dDUlIS2rZtC2Vl5a+rmGa4ceMG7t27B3Nzc/B4PKipqUFJ6duyvauqqqCkpNRsPVRVVUn9pp+DiFqkw+FwPlsnRISysjKoq6uDxWKBz+ejrKwMqqqqcstcV1eHM2fOoHfv3kw7TUtLg0gkQlpaWpPtVx4FBQWoqqqClpYWWCxWi3Q+RSwWo6ysDEQk1a6/BiJCeXk5NDQ0Wlyu+vp6lJaWQktLi5HV1dUhISEBrVq1+qLf9z9BRUUFNDQ0ZOQcDge5ubnQ1dWVaic8Hg/Z2dnQ19f/18pQWFiI6upq5OXl4erVq9DT00ObNm3+tfy/lsLCQqiqqrao/VZUVKCiogLZ2dmoqKhA27Zt/wtK+D+LiooK1NfXQ11d/avyKS4uRkFBATQ1NaGiovLVeX18jyr4tmF9K9OdpaWlcHBwwLNnz7Bv3z5899136NevH7y8vFBdXQ2goXFpa2ujsrISN2/eZHTDwsKwZ88eCIXCFp1r+fLlmD9/PvM9OTkZc+bM+azeuXPn0K9fPynZw4cPcf78eUgkEgDAkCFDMGvWLFy4cAHLly9HVlYWOnfu3KJy/RP27NmDkJAQnD9/Hrt27UKnTp2wf//+fy1/iUSC8vJyqQ64vr4eYWFhUFNTw5MnT8DhcDBlyhS5+tnZ2bh58ybGjBmDdevWMfLCwkIEBwfDzs4OpqamWL16NebOnYu+ffsyaebPn4+RI0fCxcVFxsji8/lwdHSEsbFxs+VPTk7G6tWrMXPmTEb24sULmJmZQU9PD0CDkT5z5kw4OTlhzpw5OHHiBC5duoRDhw5JlaeR0tJSGBgYgMPhwMDAAABgZGSEBQsWICEhAVZWVlizZk2LOtOzZ8/Cx8cH0dHR0NXVbTZtfn4+kpOTMW7cOCk5h8PB8uXLMWHCBMybN++z52yK3bt3o6CgAGpqaigvL8eHDx8QEhKCyspKHDx4ED/88AOKi4vx9OlT/PnnnzA0NJTSf/HiBXNvLVy4EAAQExODsWPHYv/+/Vi5cuU/LltT5OXl4dWrV59Nl56ejgcPHuDw4cPo1KmT1LFDhw7h2LFjuHHjhtS9euDAAXh4eKCwsPAflY3P5+PWrVsAgNzcXMTFxeH169cAgJKSEgwcOBB9+vTB7t27/1H+LSUrKwtv3rz5bLqioiIcP34cS5cuxa+//ip1jMPh4OnTpyAiREdHg8fjISsrC+Xl5cjIyICmpiauX7+OgQMH/qcu438ka9euhba2Ntzc3L5I7/Xr18jJyUFycjLS09ORmJiIvLw8rFu3DqtXr/6qMo0dOxbTp0/HkiVLviqf/wSpqano1KkTWrVq1aL0PB4PT58+Rbdu3dClSxdIJBJcuHABampqmDVrVovyCA0NhUgkwvTp07+m6AgLC0OPHj3QvXv3r8rnU1o23P8v4OrVq3j+/DnYbDbWr18PiUSCo0eP4u3bt3jw4AEkEgnU1dUhEAjw/fffS+nq6ekhNTUVx44dw4wZM6Cqqgp7e3sMHToUQENnq62tzRhmPXr0kNKvra1FfHw89uzZAwCIjY1FZGQk5s6dCzMzM9y8eROPHj2SaTgCgQAnTpyAv78/1NXVwefz8ebNG/z6669Yvnw5AKBLly5Mel9fXyxevPjfrbj/S9u2bbFy5UqMHDkSHTp0wOLFi6GmpvbVXryNGzdi3759yMvLQ4cOHQA0eG5qamqQnp4ObW1taGtrIzk5WUY3ICAA6urqmDp1KkxNTaWOcblceHt7Q0VFBYsWLcLkyZOxdetW+Pv7M/V89uxZsNls/PzzzzJGmkQiQWpqKvz8/NCuXTsAwLBhwzBo0CAcOHAALBYLcXFxGDhwIN6/fy+lm5mZiUWLFuHJkyeMITVkyBD8/PPPsLW1xalTp+Dt7Q1zc/Mm68XGxgbq6uqQSCR4/fo1qqurMWTIEGzbtg1jxozBokWLGO9Yc16J6dOnY/fu3dizZw/27dsndX18Ph8aGhrMtXO5XEyePBlz5szB4cOHoaKiAmVlZQiFQqSmpuLvv/9u8jwt4dq1a3B1dcWCBQvA5/NhYWGBuro6SCQS3Lx5E8bGxsy98OOPP2LChAlS+oMGDUJaWpqUQc/j8QAAmpqaLS5HREQErly5An9/fwgEgmbTcrlcpu3Fxsbi5s2bWLZsGdq3b493797Bz88Ptra2GD16NIYMGYI3b97IGGkAoKWlJeMpv3fvHnbv3g2JRPKPvNPl5eXYsmULZs6cCWVlZXz33Xe4cuUKrly5ImVoi0QisFisZu/V6upq+Pv7Y82aNfjll1+wa9cuZpDxOdTU1JCVlYWamhoAgKqqKoYMGQJ7e3vY29ujd+/eAABzc3N4e3tDLBZL6WdlZaFPnz4AgO+//x52dnZ49OgR7O3t8fFEDBFBLBY3ex0ikQhRUVF4+fIlevfujalTp7bY6/wtIxQKmbbKYrGgpKQEsViM9PR0rFq1Cnw+nxnIP336FPfu3cP27dulPN8ODg6Ijo5mvotEIhAR5s2bB0dHRzg5Ock8uxoJCQlBYmIioyeRSMBms3HmzBlMnToVHh4eUFFRgYqKCpKSkjBq1Kj/VFW0CF9fX/Tr1w9Dhw6V8tTv2bMHb968QUJCQpO6AoEAIpEI+/fvh7+/P9LT02FlZYUHDx5ASUkJRUVFKC4ubrGRxuPx8Ouvv0IikeDHH39sNi2fz8ejR48wfPhwqKurS/ULjx8/Rnx8PLZv396i87aUb+LuSEpKgru7OwYNGoRdu3bht99+g7a2NpYsWYIlS5Zg1qxZKCsrw/Xr1/HTTz816TE7ffo0zp07BwAwNTWFjY0NYmNjwWKxmIelhoYG0+F8ipmZGTp27Ii4uDh07NgREyZMgLGxMfh8PmJjY/Hdd99JpRcIBMjJycH06dMREBCA4cOHo66uDgcOHAAADB48GKNGjUJERARKS0u/ykArKCjAlStXUFdXJyV/+PAhiouLcfToUYjFYrRr1w41NTXo1KkTU5dfQ25uLvO30UjT1NRkPDYfPnxgDLDS0lJkZWUxo2k+n4/i4mJs3ry5yfwXLVoEADAxMcH9+/cRFxeHkSNHMsc7d+7cZCfesWNHqSm0gQMHwtTUlLnpLS0tYWJiAicnJyk9Ozs77N27FzNmzMC+ffsQEBCA7OxsDB8+HNOnTwcRISgoCFOmTEFhYSFjyPF4PCQmJoLL5SI3NxerV6+GkZERamtrAQC3bt1CUlISNDQ04OPjg9jYWIwePRqbNm0CAHh7e8u03cYH9IsXL7B3715GXlpaCk9PT5w8eRIuLi5gs9no1asXYmJi8NdffzGes/bt26OkpAS1tbWIjY0F0ODRGjhwIEaMGNFkvTdFRkYGYmNjIRAIZAyTzZs3w9LSEnZ2djIGWnMoKSmha9euLU7/7NkzdOzYsUVpe/fuzRgZANCtWzesXbsWJiYmAICgoCBs2bKl2YdSYWEh2rRpA7FYjJcvX2LgwIEICgpCWVkZJk+ejBs3bkBHR0eqXX6O0tJSXLp0Cb/88ouUXCAQICgoCPHx8YwsMTERSkpKOH/+fJP5OTo6YujQoQgJCUFYWBiWLl2KgICAFpXFyMgIK1aswL179yCRSGBra4ucnBwADfVnY2MDoVCIoqIimJqayhixgYGBcHNzw7Bhw5h7KzQ0FBUVFUybAxraf3FxMRYvXiwzkG5k06ZNyMzMxMKFC3Hx4kXExMTg8OHDLbqOb5mIiAgcOXIEvXr1wvv37zF69Ghcv34dDx8+hK6uLl6+fIlbt24xhjLQMAhovI8yMzOxceNGbNy4kTkeHR2Nffv2YcqUKdDW1kZZWRliY2MRGxvLPFsa6datGzPLtHr1alhZWcHR0RFnz54Fl8vF4MGD0aNHD1y5cgUA0LNnz/+impFPfn4+duzYgbCwMFhZWTHyhQsXYvLkycz3x48fo2fPnlIhAX/88Qfq6+vx+PFjGBsbw8fHB7a2tv+4LPb29mjVqhXCwsKkjDSxWIygoCA4ODgwjgM2m42oqCgsXrwYXl5eaNu2LYYPH85cU3MD+3/KN2Gkbdy4Ebm5uSgtLcWCBQtQUFAADQ0N9O3bFxs2bEBoaChmz56NPn36ICsrC7Nnz5abz6xZszB+/HhMnjwZXbt2xZ07d5iRHofDwYYNG6Cvr4/JkydDW1tbRn/u3LlQU1NDVVUVAMDV1RVKSkrg8/loblb4Y29ZUlISY0lzuVzo6emBx+PBz8/vH9cPAOjr68PJyYkZjTVSWlqK/Px8TJkyBQYGBozR4+LiIvcav5SSkhLmPJ9CRLCysmLifIRCIdhsNoKDgzFo0CB06NABxcXFLTqPqakp9PX18eHDB+ZhqKqq2uzDuqCgAL6+vky8R3x8PPLy8pr9rYAGr4mLiwsEAgFMTU2lpuH69++PoKAgsNlsxMfHSxkqYrEYr1+/hp2dHQQCAVasWIGSkhIsWLAAkyZNwpo1a+Dl5QUTExPMmzcP8+bNk/K+mpiYQE9PD2ZmZoxs+vTpqK+vh4WFhczIb9myZdDU1ISysjKys7ORnJyM8ePHw93dHdbW1hgxYgQuXbqEN2/eIDMzE3/++ScGDRqE/fv3w9fX9x8ZaW/fvoWGhgYEAoGMB/JjMjMzv8jw+hJ2796NmJgYZrDzJbRu3brFcXleXl44ePAgysrKIBaL0a9fP6ioqCA4OBiLFi1CZGQkDAwMYGxsjB9//BH+/v4YNGhQi/LW0dHBrFmzkJOTgy1btqC0tBRr1qxBfX09evXqhYCAAAwcOBAbNmz47Ij/2rVrePjwIVxdXWFra4u2bdti0qRJLSrHx0ydOhXm5uaYNm0aDh48iKqqKuzZswfXr19Hv379cObMGezevRtr166V0isqKgIA3L17F5cuXcKVK1dQW1uL7OxsRERE4Nq1a5g6dSpqa2uhqakpM5j9mEePHsHJyQnjxo2Djo4Opk+f/r/CSLO3t8cPP/yAVq1aoaamBhoaGliyZAl0dHQwb948WFtbw9bWFhwOB4MHDwbQ0EYaSUtLw9OnTwEAFy5cgKWlJYCGgW5gYCBu3rwJW1tbmJubg8vlIiYmRspI69OnD/r06QM3NzeMHTsWR44cwePHj2FrawuJRILAwEB069btv7BGmsfNzQ3h4eFS1w00THdWV1fjwIEDyMzMxPnz5+Ho6IijR48yz5nVq1dDU1MTnp6eqK+vh62tLT58+IDo6GjMmTMHly9fxtixY1FRUQEXFxfs2rWLGTTMnz8fd+/elSkPj8dDWFiYVLgDEYHD4WDcuHEIDw8HAKioqGDHjh3w8fHBhQsXmHvl/fv3uHLlCjMgX7JkCQYPHvxV4SeNfBNGmo+PD/Lz81FYWIi+ffuiqqoKgwcPxr1797Bt2zaYmprir7/+gqmpKdq3by8VXwQAOTk5qK+vZ+JggIaHiJ6eHpydneHs7Ixnz55BWVkZp06dajJGrNEF7+3tjePHj+PIkSPo1KkToqKisGLFiibL7+HhAQ8PDwANN56zszMOHDiA3r17Y+PGjbC2tmas7X+KmpoaOnbsiLdv3yIlJQVjxoxBmzZtoKOjg/z8fGhpacHExATv37+Hu7s7fv31V1hbWzebZ1paGlq3bg1DQ0OkpaUhPT0do0aNkgoqdXZ2xt27dzFgwAC5eWhra+PBgwcwNjbG3r174eXlxRit8oK0m8PT01PKsFBVVZWZJv0YFRUVGBgYMFNpeXl56Nq1KxMr1ZyRMXXqVMZjsGTJEvTs2ZMZKOzcuRPdu3eXCfZt06YNli1bhtLSUhgbG6OkpATHjx9HUVERunTpAhMTE4hEIqioqKBVq1Z4+fIl0yEDwLRp02TKMWbMGFRWVsLb2xtsNhs8Hg/l5eVShj/Q4IFZuXIlunTpgokTJ8LNzQ0uLi5wcXHB+/fvYWtri2vXrgHAV7nbHRwcsGDBAtTX1yMmJqbJdG/fvpUx0qKjo8Hn82XSikQi3L59Gz/88MM/Lte/QUFBAdq0acO0y1WrVsHIyAirV6/G8ePH8fbtW3h5eTHeh+LiYkRERDBG3KhRoxATE9MiQ01FRYWJA+vSpQvq6+sxadIkdOjQAWPGjEFJSQnKyspQWFiIgwcPYtKkSU0OPvv27YvJkyfDwsICQMOD7J+EEk+bNg12dnaYMWMGXF1d0b17d5w5cwZOTk4oKirC06dPZQw0AFIzAOHh4TA0NMTgwYMxbtw42Nra4tmzZ1i8eDEOHz6Mrl27NhuU/uTJE+b/kpKS/zWLDVRVVZnBgbOzM1gsFvr16wcbGxv4+/sjLCwMkZGRyMjIwL1792SeByNGjGDup8rKSkgkEowcORJ37tyBh4cHIiIi4OjoiO7duyMzM1MmNhoAbt68iZiYGISEhEBTUxPLli3DuHHj4O7uDmVl5S9a+PafRlVVFadOnYKBgYGUkWZoaAgbGxv89NNPcHFxga+vL/T19ZnBclVVFe7fvw+gYYpXXV0d7969w4sXL1BdXY3Q0FBwuVykpqbi4MGDuHfvHn744QfGSNu8eTO8vb0ZA1kkEmHZsmUICgrCxYsXYWNj02xoxoYNGzBnzhwIBAK4ubkhKCgIf/zxB4AGJ0VGRgbc3NyQn5/POHu+lm/CSDM1NcWRI0cwdepU9OjRAykpKejZsydSUlJw/PhxuLq64s6dO5BIJBg7dqzUVEvjatBr165JeZk6d+6MLVu2wNjYGDk5OYiOjoarq2uz5bhw4QL69OmDixcvIi8vDzt37oSVlRWePHkit1PU0NCAp6cnjh8/juDgYHh4eMDCwgIdO3bEpk2bmIDjlJQU+Pr6omvXrhg9evRXdUytW7eGl5cXLly4gNDQUAANK4iCg4MxdepUTJkyBSNGjGg2LqS0tBS+vr44f/48LCwsYG9vj1evXuHkyZPMiK2RpmIgGtHX12emHDt37swYTi0lPDyccW9/PC2ZnZ39WV0DAwNMnz6dueGePHkCMzMzODs7M2nOnDkjpRMUFITTp08jPz8f1tbWOHLkCAIDA+Hu7o5p06bhxo0bcHR0hLa2NgwMDJpc2ZiYmIiEhASwWCyYmZnh6NGjiI+Px/Pnz6GqqopXr14hPj4e165dkwn0/5jk5GSkpKTA3t4ewP+L4Tp37pzUyNfc3BweHh7Yv38/7t27h6NHjzLHNDU1ZRYdPHz4EObm5mjfvv1n6/FjDh48iODgYMZr+E9onEprxMLCAhwOBwKB4F9bfQo0dNjbtm1jptcTExORnp6OixcvMtctEAhw4cIF5OXlwdPTEzo6Okwnz2Kx0L9/fwBgpqccHBzw9u1bzJw5E4GBgQAAKysrHDt2DPb29khMTGyxN+369etwdHRESkoKzMzMZFaJBgUFISUlBSNGjICRkVGT+ZiYmDBlARoGM97e3i2sJWkePnyI+vp6FBcXo76+Hvfv30dtbS2KioqQkZEhVycuLg7v3r1rMs+EhAQ4OjrCyMioRQHfcXFxePv2Lby9vaWm+MViMQICAuDv74/169fD2toadXV1uHjxIoKDg3H69GkYGxujqqoKZ8+eRXV1tUwoxbJly2BoaIht27YxsvXr12PhwoWMhy8hIQEXL16Eg4PDF01ht5SePXtCVVUV7u7uqK6uhoqKCtTV1TFo0CC4uroybe7TOjl48CCMjY3h5+eHXbt2AWiYXmuMuQ0PD8eLFy8wYsQIdO7cmZnSBxpCHH777Teoqakxi+D09PRw6tSpzw7W5RETEwMOh4PRo0ejuLgYBw4cgJOTE+zs7P5JlcjFzMwMXC4XTk5O2LZtG7Zs2QIdHR18+PAB2tramD17tszArnFnhjdv3iA+Pp5ZWDZs2DDcuXMHV69exc6dO8Hj8eDs7IyLFy9KLWr71MvLZrNhaGiI6dOnY+LEiQAaYkkTEhLkhkjo6upi0qRJCA0NRX5+Pnx9fZk+TVNTEz/99NMXhYK0hG/CSAMaPFC1tbXMxQcGBkJVVRXa2trIzc3Fhg0bUF9fj2fPnqF9+/bw9/fH6NGjUVdXh1mzZjFTbVVVVcxyfz6fD1dXV3C5XGhoaDQ5+mSz2TAxMUFISAhCQkIANBh/ubm5jKtf3lxzbW0tPD09MXPmTISGhqJjx47Myrfy8nJs3LgRw4cPh5ubGzPVGhkZKWWkVVZWgsvltngFaKdOnbB69Wps2LCBeYhaWlrCz88PBw4cwP79+/Hzzz83m4dIJMK4cePQs2dPzJ49G507d4anpyfOnTsnEzPVp08f9OjR4z+2fcLH8QdFRUUwMDCAsrIynj17BiUlpWa9cXw+HxkZGcwIkcvlorS0tFkP2owZMzBmzBiMGTMGffv2ZYJtjYyMwOPxoKKigk6dOjGB55cuXWLqUyKRoLCwEJMnT0aHDh1gbm6OmJgYzJgxA4WFhThy5Ajc3NxQXV0NLy+vz167QCBAVFQUTp8+zZxj48aN8PPzQ319vUx6R0dHWFpaYuzYsTh+/Dji4uLQp08fFBUVITU1FQ4ODozB4uPjg1mzZuHIkSOfLcfHrFixAgsWLEBdXR0WLFgATU1NVFVVyUyzN4eHhwcqKiqwefNmJCQkID8/Hzo6Oqiurm5xsHtLEIvFGDBgACoqKgA0xJbp6OhAIBAwMolEwmwVIW+Q1nh/t27dGoWFhRgzZgwOHToktV2HRCJBXV0dPDw8mjW4P8XLywvl5eWwtrZGaWkpHj58iPz8fLx8+RJAQ9s/ceIE3r9/j1OnTmHMmDHN5tf44HF1dZWZTWgpNTU1qKiogKqqKpSUlJjvjVtFyGPWrFmora1FRUUFwsPDUVdXh2fPnqFdu3awtbWFvr4+9u7dC2tra9jY2GDdunXNbjnB5/Pxxx9/QCwWS6UTCoU4ffo0oqOjoaGhAWtra/B4PBw/fhyvXr1CSEgIli1bhidPnmDFihXQ1taGjY0N45U6efIk094bjbTp06cjODgYt27dYuIArayswOfzwefzGSOttrZWJt63KXg8Ho4ePYpZs2Yx05Ifw2KxcPr0aQQFBUnJKyoqwGKx5HpqRo4ciZEjR6K+vh737t2DtrY2Xr9+DYFAgPT0dAANCzju3r0LiUTCyBpRVVXF8OHDMXjwYISGhmLYsGFwd3fHlClT0KtXL+a51hL8/Pzg4+ODpKQkODk5gc1mQywWIyws7F8x0v7++2+kpqYiKCgI3bp1Q0hICEaOHAlTU1MEBAQgOTkZbdq0kbuyXktLC+PHj4dQKASLxUJ+fj709PRgZWWFO3fuQCQSITY2lvE6A5AyZj+lvr4e6enpiImJYQbFXC4XHA5Hrr2wdOlSlJeX4++//4ZIJGJ2nmiktrYW5eXlABoWiIjFYkycOPGrFsd8M0Ya0BDEOmfOHBw9ehRLly7F9u3bsXr1aujq6sLFxQUeHh5o3bo1Fi5cyFSgpqYmNm3ahOPHj2PRokXw9PTEvHnzMG3aNJw+fRrZ2dkICwvDqFGjcP36dbnn/fDhA7OlxMuXL2FsbIy5c+ciPDwcFhYWePjwIUJCQlBSUiLlJaqrq0NkZCR+/fVXlJWVYdKkSRg6dChMTU1RVlaGu3fv4u7du6iqqoKxsTF27twp45maOnUqEhMTERQU9NlOuhEbGxucOXMGjx8/ZlZirV+/nvFGfo727dujffv2mDt3LjM1GxAQAKFQKBXECTRM21hZWTW5uq0x5kZDQ6PZ0XZzlJSU4I8//oC6ujrc3NygoaGB+Ph4tGrVqtkl/RUVFbh16xbT0d+/fx8mJiaMx6Jx0cOn6OvrM4Zdq1atsHTpUsTHx+PEiRPQ0tJCTEwMdHV1ERQUhKqqKsaA4nA4cHR0hL6+Prp06YJu3bph7969+PXXX6WmLyorK5Geno6oqChMmjRJZuqykcePH0NZWVkq7q6qqgp6enpSnczHBAYGYsKECczKPAD47bffMGzYMGzZsoVJN378eLkezZycHCgrKzOLQORx9+5dZGRk4MKFCwCAV69eMcZMc7x//x6dOnXC8ePH4eTkhP79+yMzMxO///47YmNjkZiYCBsbm8/m01J0dXWlBiQZGRlITk7G/PnzGU/ahg0b8Pvvv8sdFRMR7ty5wxhRHA4HNjY2ePz4MRYsWAA7Ozu0a9cOHA4H4eHh+OOPP+TGSL59+xa9evWSkp0+fRrXr19HRUUFCgoKoKyszAyqjh8/DlNTU3z48AEbNmxAfn4+wsPDm/WO1dfXY/369XB2dm7RdkFNMWHCBMyYMQMAsGPHDtjZ2cHJyQnZ2dkIDAyERCLB7du3YW1tDQ0NDRQUFGDfvn2oqakBESEvLw8rVqzA27dvIRQKMW3aNPD5fAQHByMgIADv3r3DjRs3ZBbrfMzw4cPx9u1bBAQEwNXVFffu3UPHjh3BZrMxZMgQ5ObmMt4ILS0tDBgwAFwul+k7TUxMMGzYMIjFYqkp96FDh2Lo0KFSwfmjR4/GmzdvpLzrbm5u8PX1lQqez8vLg7+/f4vqMCUlBVwuF2pqaujfv7+Mt11FRQX79u2TGSyfO3dO7kIuoVCIV69eITAwEEVFRcjMzMTly5eRlZWF2tpaxvPbrVs3JCQkICYmBgUFBVL3Ur9+/Zj7NTs7GxkZGeDxeBg8ePAXxyaPGTMG3333HWxsbNC2bVt4e3tj3bp1/9oAq3///ujcuTOioqKYfs7BwQF+fn5YuXIl8vPz8eOPP8ps8dNIbW0tDpwoG2QAACAASURBVB8+jI4dO0IsFmP69OkYPnw4kpKSsGbNGqSlpaGsrAzl5eUoKytDdnZ2k06Quro6JCYmIioqillQGBUVJXfaH2hwJrm6umLixImwtrbGoUOHAABv3ryBQCDApUuXmIF/cnIy1NXVMWDAgM9uFdUs9I2QlJRELBaLWCwWASAlJSUyMzMjNzc36tSpE2VkZJCGhgbNnTuXiIji4uIY3T/++IMAUFBQEHXt2pWUlJTIwcGBduzYIZUfi8Wihw8fSp03Li6OlJSUyMnJibZs2UIjRoygmzdvEgBycXEhIiIfHx9isVi0dOlSKd2qqiqytram8vJyateuHcXHx5NYLKarV68Sm80mNzc3cnNzoz59+tDs2bPlXreLiwv16tWLxGJxi+vK39+ftLS0KCAggHbv3k2WlpZUUFBA/fv3Jzc3txbl8ezZMzIzM6OUlBQiIlq/fj1t2rRJJh2fz6cdO3YQj8eTOSaRSGjw4MFUVFREQqGQNm/eTB07dmSOnzt3jhYsWCD3/CkpKWRqako1NTU0bdo0srGxYeqgoqKCrK2tycjIqMnyR0ZG0vDhw6myspKRLV++nA4cOCBVvs6dO1NycrKM/vDhw+nYsWNERCQSiWjp0qUEgMzNzen9+/dERLRq1SraunWrlJ5IJKLy8nKaO3cu1dTUEBGRtbU1KSkpEZvNZtqZsrIy6evr04kTJ5q8ht27d1ObNm1IIpEwslGjRlHv3r1l0paXl9ORI0dIV1dXqg2fPHmStLW1KTIykmJiYujDhw9Nno+IqFevXtS2bVt69OiRzLEhQ4bQiRMnSCwW08iRI2nOnDlUV1dHoaGh1NhV3Lx5k1gsFl27dk1Kt76+nn755RfasGEDSSQSGjp0KO3YsYMsLS0pJiaGPDw8aNiwYc2W7WOio6NJU1OzxemJiPbs2UOWlpZUWFjIyDQ0NCg6OlpueolEQr/99hstX76cnj9/Tm3btiUiotu3b5OKigqJRCISi8WUnZ1NFhYWcu/Rt2/fkrKyMqmqqkrJL1++TJ6eniQSiUgkEhEAcnV1pdatW5ONjQ2x2Wz6+eefqXXr1uTm5kZXrlxp9tqCg4PJ1dWVhEIhEUn3f404OzuToaEhvXjxQkrOZrOZtqmsrMx8B8B8V1ZWJgBMulWrVhER0Zs3b+iPP/6grKwsEovFZG9vTwMGDKDvv/+eAJC6ujrZ2NiQiooK9e7dm9zc3Oj58+dNXoePj49U/ffv35/OnDkjJROJRFL3hFgsblL2KZ/K5eUnT9ao+yWfT/UbaXx2qaurM3XdWMfy2nRZWRkNGzaMrK2tKTk5mQ4fPkwAmI+SkhIBIBaLxfQva9askcrjxo0bUr8zi8UiNptNLBaLRo4cSc7OzuTh4UFERO3ataOgoCC5ZW9k8uTJZGhoSNnZ2URE1KNHD5l29bUsWLCAzp8/LyULDg6WevbKo6CggObPn0/u7u505coVOnHiBFlaWlL37t2pqqqKTE1NacWKFZScnEympqZ06NChJvMqKioiAFRWVsbIlixZQpMnT25SJyoqikaPHi3VFmbOnEmampp07949mXbytXwzW9PfuHEDdnZ2SE5ORvfu3fHo0SNkZGTg8uXLMDQ0xMSJE1FXV4eIiAgMGjQIHh4e4PF4ICImjuf27duoqqpCeHg4Ro0aBS6XC01NTWzZsgXLly+HmpoaTp48KXXeqKgoKCsrY+bMmSAi9OrVC7a2tti8eTMEAgHS0tLQsWNHDBo0CJcvX5ZxMzeioqKCzMxMBAYGoq6uDmw2G2vWrMHOnTuxbt26JmObzp07h+Tk5M/uw1RdXY0LFy7AxsYGgYGBSEhIkJryYLFYCAkJQWBgIKZPn47o6GiIRKIm84uIiICRkRE6deqE8vJyREVFoVu3bqisrJRKx2KxYGlp2eS0o5OTE7S0tMBms7Fnz54mvVefUldXh/r6esycORODBg1CTEwMUwdHjhxBbW0tJkyYgBUrVsjdciUwMBDDhw+XWiH1KS3ZKf/NmzeYMmUKqqqqUFlZiZqaGly5cgUTJkxASEiIjCdPWVkZYrEYmZmZUvL169dDKBRiy5YtWLlyJUQiEbNaWR5ZWVm4ePEili1bJlPOpUuXyqQXiURITU2FRCJh0ufm5uLMmTM4duwYxo8fj5KSEixcuJBZZi8PiUTCeI0+hs/nQyAQ4MGDB/jtt99gbGyM8PBwqfvFz88PLi4uMDIykonL+vDhA+NVZbFY8PT0ZAKgbWxsYG5ujtevX+Pq1atNlk0ejdOWn4PH48Hf3x+Ojo5ScXhisRj5+flydVgsFtasWYN3795h8ODBMvEvysrKUFJSgpKSErP31afQ/90bTCgUSk2zOzs7M6P6TZs2wdXVFa6urtDW1sbBgwcxYcIEEBHi4+Oxc+dOuYtKGikvL8eff/6JjRs3gs1mIy8vD+vXr5dJFxsbi+LiYhw8eFBKnpycjOrqavzyyy/w9/eHUCiEUCgEEUEkEkEoFCI9PR1jx46FUCiEWCxmpuv79u2LTZs2oU2bNrhx4wY4HA6CgoLQv39/+Pv7Y9u2bWjdujWio6ORlJSEnTt3NhmzFxUVBTc3Nzx+/BhAw0p4DocjFQPbuF/cx/dE49tK5Mk+5VO5vPzkyRp1v+TTVP8yceJEbN++HXw+n6lroVAoFUf6MXp6eoiNjcX9+/dhYGCA0NBQrFixAmfOnIGBgQFu3rwJDQ0NPHjwgNlvzdPTU+acjedZtWoVtmzZAqFQCIlEggcPHgCA1HYpzVFYWIi8vDx4e3vDxMQEcXFxzOzBp+levnzJTO99DdXV1Th//jz27NmDefPmMRugFxQUSKUrLy+Hra0tJkyYADabjdDQUCxYsAA3btzAkSNH0KpVKzg7O+P777+HiYkJTp06hWXLljV5Xl9fX0yePFkqllIikTQ5+xEYGIjNmzdjxowZTDu4desWnjx5wkynh4eHS7WTr+arzbx/CX19ffLw8CCRSERDhgyh6Oho6tSpE92/f5+Ki4spNzeXNDU1aePGjVRcXMxYvrW1tWRhYUEuLi7MyCMxMZGePHlCS5YsoRMnTpBAIKDa2lry8vIif39/5pylpaU0cOBAat++Pb148YI2b95Mffv2pbKyMqqsrKT6+nqys7MjfX19KigooO3bt1NFRQWjHxUVRa1ataJevXoRAGrTpg2Zm5vTsWPHiMViUffu3cnCwoLat29Pc+bMkXvdM2bMIAsLi8/WT05ODhkZGdHChQsZDw4RMZ60wsJCEolEdPv2bWKxWNSmTRu5HplG+vbtS5GRkUREVFxcTJ06daIJEyYwnrVGnjx5QkePHpU6Z0txcXFp0pMWERFBysrKFBQURAKBgCnH+PHjqX///pSamkqVlZU0dOhQmbr78OED6ejoUEhIiJT8U08aEcn1pD19+pTatWtHU6dOpeXLl1NiYiJVVVUREZG5uTklJiaSr68vBQYGyh0tl5SUkI2NjZQnzdfXl4iItm3bxnghcnJy6Pbt23Kvf9KkSWRra0vV1dWMLCMjg7p160ZHjhyRq8Pn80lbW5vxgrm7u1NERARzXCwW09q1a0lTU5PxBn7Ku3fvaM6cOTLepatXr5Kamhozyi4qKiJ/f38KCgpiPGkikYjOnTtHGRkZMvlOmzaNDh48yNTXnj17SF9fnxmxCwQCsre3J3NzcwoODpZbtka8vLzI1NSUlJSUyM7OjgoKCppN33i+gQMHEpfLlZID+Kx3ecGCBQSAdHV16cKFC4wnrZHc3Fzq27evXN26ujpav349KSkpUX19vdSx8vJyGjhwIB09epS4XC6VlZVRhw4dKD4+nioqKmjatGlkYmJCq1evptzc3CbLFxoaSmw2mywsLMjCwoKZLfiUlJQUMjc3p4CAALn5zJ07lwIDA+UeKywsZGYp5F3j8uXLycbGhjIzM0ksFtO8efPI39+f+Hw+LVmyhIyMjGjt2rXN/lZ8Pp/69+9Pc+bMoaNHj9KoUaNo586dTab/nwqLxSIrKyv6/vvvae3atWRra0u7du2izp07f9Y7PHbsWNqzZw/V1tZSUFAQGRgYUH19PV28eJH09fVpy5Ytnz3/mjVraOvWrcThcOjcuXPk5+dHr1+/pqysLCL6vCft1atXZGhoyPRvTk5ONGjQILp37x6TpqamhmbOnElbtmyh8ePHU15eXkuqRopGTxqfz6exY8fSgAEDKDIyknmOAaB9+/ZJ6YSGhtLly5dJIBDQn3/+KfNsEAgEZGdnx3gAmyMqKop0dHTo6NGjUv38okWL6NSpU3J14uLiqF+/flReXs7IJk+eTBcuXCCJRELPnj0jQ0ND5nnwb/BNxKSdP38ePB4PxsbGzNzuuHHjYGBggNatW6Ndu3ZITk6GRCKBrq4us9oFaAiQzsnJwe3btzFmzBj8+eefGDZsGHR0dGBra4tdu3ZJbc2hpKSEgoICrF69GiwWC+vWrYOmpiYGDhyIuLg4cLlcqWBQZWVlbNiwAe3bt8enrzldt24dOnbsiLZt2zJ74cydOxcBAQFgsVjMiP7T4MKPqaqqQlFREZKSkprcZBdoWDDw8aiicTfzxtWEysrKUFZWhq2tLZ4/f46kpKRm91/6+DUx7dq1k1mR10hYWBj++usvlJSUtOjVJkKhEB4eHvD29kZ1dbVUnNTH9O3bF9HR0bCyskJSUhIuXLiA1NRUdOnSBYcPH2ZW4Tg5OUlt/Mnn8+Ht7Y2FCxfC0dGxyXLMmzcPUVFRMqsJly9fjtu3b8PNzQ3Pnj1DUlISysrKUFZWxuSfkJDAxKs8ePAARkZGTFCpn58fIiMjZc7XGFP34MEDGBgY4MSJE7h8+TIASHkK8vLycOjQIRQWFuLEiRNo1aoV/Pz88OLFCxw+fBhaWlpyPWmA9G82fPhwPH78GA4ODrh//z60tLQgEAhw69YttGrVCj///DPCw8Nl4tK0tLQgFotlVphZWFjg2LFjmDt3LiNrbD9hYWEAGu4FFxcXKT2RSITDhw+jpKQEkydPRm5uLo4dO4bnz5/j7NmzcHBwANDgafbw8ICjoyNcXV2Rn5/PvJXjU1atWoVVq1Yx524upobD4eD06dNITk7G48ePv/i9hvfu3UNqairS09Ph4+MDX19f7Ny5E0DDfkwdOnRAZWVlkzugExHat2+PV69eSbW1a9eu4eTJk5g5cyYWLVrEjKgbvW66urq4cuUKtm/fjitXriAqKgo//fST3I2f+/btKzMDIG8hk5aWFnr27Cl3e4amKC4uxokTJ2BkZISIiAiZ4xwOBwEBASgoKMDdu3dlvFfq6uo4evQo9PT0cPXqVQQFBWH69OnYtGmTzGpWdXV1PH36FHfu3AGHw8Hu3bu/emuibxElJSWMGTMGPXr0gFgsZjZbnjJlCk6dOgWgYePTxrhQiUSCu3fvYtasWVi0aBFWrVolNXOhqqqK2bNnQ1NTE7t374aXlxdmzZoltXK9sLAQmZmZqKiowP3791FSUoKoqCjMmjULPXr0QLdu3fDixQtkZWV99vWJYrEYnp6ezAIHMzMzEJHU4iGBQIDCwkKcOnUKv//+O0pKSpqNc/2Y6upqJCUlISQkBHl5ebhw4QKWLl0KBwcH5v4dMWIEtm7dirFjx0rpfvr6QXlbQ33uLSVAQ/zq1q1bMWDAACxZsgS5ubkoLy9HdXU1zp4922R8eJcuXaCpqYlWrVqhrKyMiX8dOXIkcnJyYGhoiPnz5zPtvzH+86v418y9ryAzM5N+++03xjotKysjT09PunPnDtXV1RERUUJCAjk7O9Pdu3eldAsKCig6OpqJ1cjKyqI7d+5QYGCg1Ofw4cPk7e1Nc+fObdLKFovFlJycLPVJTU2l2tpauemLioooKytLxtuSmpoq5S1ISUmhZ8+eyc0jLS2NHj9+3IJakobP59OePXtIWVmZvL29mev/t3n16hUtXbqUMjMzv0jv4cOHFB4eLjeW7WPq6+vpzp07FB0dLXcUXlxcTEVFRcz37OxsqbiWj3n9+jWlpaURUYOHdeXKlXTkyBEp74qHhwcT/1NVVUURERE0Y8YMmjFjBhNn8/Fn2rRp9PLlS0Y/OTmZevfuTdu3b2diX6ytrWnt2rWfrZO3b9/S1KlTaevWrTKxY7GxseTq6kqhoaFN6j969IhcXFwoNTWVQkJCmLb96NEjpr0WFxfTuXPnaPDgwVRcXCyTx/v376W8wS0hNDSUOnfuLPdYRUUFHT58mEpLS+n06dO0detWioqKatLzmpGRQTExMU16+r6EqqoqOn78OAUHBzfpiXJ2dpbyAHzM9u3bafPmzUx/UFlZSWlpaYwnrbHtxsfHk46Ojtw8CgsL6fr16zLy2NhYevfunYy8devWFBUVJSXLzc39R56IT0lLS6PExMQmj8vzpNXV1THxqYsXL5bRyc7OptjYWJk+sNGT9jG5ubmUnJws5WX4/4GysjIKCwtj7kc2m03Lli2TeQbNnj2b1NTUyN3dnb7//nu6dOkSETW0Ow8PD5l22uhJ+5jMzEzmnv8YLy8vxgt348YNSkpKkup7uVwu+fv70+jRowkAPXny5KuumcfjUe/evcnR0ZFsbGy+qP3OnTuXevfuTY8ePaKzZ8+SoaEhTZw4kemHP/0sWrSIOByOTD5DhgyRmU0RCARka2vbrCctKiqKRo0aRUuXLqXS0lIianhmL168mFRUVKhr165NxvaWl5fT0KFDqb6+nlasWEFsNpuMjY2pV69e5OzsTDt27KBly5aRlZUV6erqtrhOmuObecG6AgUKFHwLZGVlIT8//z/i5bl48eJXrc78VoiMjESXLl0+u4/i/y+cPXuW8ca3FFNT02ZXwUZERGDDhg14+/bt1xaPITc3Fzk5Of+tHszQ0FBYWVkxM01isRjBwcFSszkfv8f40qVLcl/7ZG5ujhs3bkh5lYVCIWbPng1vb2+5nr2oqCgcO3YMM2fOlJlpKikpQUhICPPWHnlUVlZi9uzZCA0NRUpKCoqLi+Vu0h0bG4u5c+c2ux1US1EYaQoUKFCgQIECBd8g38zqTgUKFChQoECBAgX/D4WRpkCBAgUKFChQ8A2iMNIUKFCgQIECBQq+QRRGmgIFChQoUKBAwTeIwkhToECBAgUKFCj4BlEYaQoUKFCgQIECBd8gCiNNgQIFChQoUKDgG0RhpClQoECBAgUKFHyDfNZI4/P5X7Rrbm1tLYqKimTkXC4X79+/R1VV1ZeVsIVUVFQgOzv7s+8l+59GcXGxXHlJSQny8/PR0r2I6+vrweVy/82ifbO8f/8eNTU1/93F+GIEAoHcXcuzsrK+OK+ysrL/dfeCAgUKFPz/xmeNtOzsbMyePRvBwcEtyvDVq1eYNGlSk5+YmJgW5fPu3TusXLkSPB5PSv7gwQM8e/ZMJv3Vq1exePHiJo2af5Mff/wRiYmJX6xXVVWFNWvWYMOGDS3WOXToULP12dIHcXZ2NiZNmvSPyg0AKSkpePjwoZTs8uXLePny5T/Kr6W8efMGU6dORW5uLgAgPT0dkyZNajL9q1ev4ODggOfPnwNoeEH0kiVLsHXrVmzYsEFu2/kckZGRWLlyZYvSikQiTJo0CYWFhYyspqYGa9euRVxcXLO6OTk5mD9/vox84cKFuHfv3heV2cPDA15eXl+ks3r1aly+fFnms3HjRty6datZ3SlTpuDy5csQi8WM7PDhwzh79uwXleFrWbhwIaKiov7j58nNzcX8+fNx/fr1f6QvkUjg4+ODR48eSclfvnyJy5cvf1Fefn5+WLdu3T8amMTExOD333//V15f00hRURE2btz4r+X3v4mEhASpvuFLyM7OxtOnT//lEin41mF/KggNDcXevXsxfvx4AA2GRUVFBc6fP4+kpCQADQ8dgUCA8ePHY+LEiVL6NTU1iIuLk/Hw1NfXQ0tLC3V1dTKFeP78OUJCQiAUCiEWi/Hu3TsAwN27dxESEgIejwcigr6+PjgcDubNm4chQ4Yw+nV1ddiyZQv69u0LgUCATZs2YcSIEXj58iWqq6uhpKQEXV1d+Pn5YcGCBVi9evVXVdrVq1cxZ84cWFhYNJtOJBJh9+7d+OWXXxhZZWUlzpw5I/N+MCUlJXTs2BFstvRPwuFwoKysjPDwcCl5ZmYm7Ozsmjx3XV0dKioqoK6uzshqa2thaWkJDofDyF69egWRSARbW1uw2WwIBAIUFRVBJBIBaPjdIiIiUFJSAh8fH7Rv354pY0VFBfP+NH19/WbroqVcvHgRYWFh+Ouvv2BmZoZ+/fpBRUUF9vb2uH79Onbu3Ik2bdqgsrISurq6MvolJSV4//49Ro8eDaCh/d69exdjx46Fqakphg0bhsTERPTq1UtG18rKCrNnz8bChQsBAGpqagAaHsgtNUbLy8uRkZEBJaX/N/7h8Xi4fPkyHBwcmtTLzs5GRUUFEhISADS8g666uhoikQgZGRl4//49evfujZqaGujp6cm99o/JycmBiYkJ853P56OyshIGBgYybayRx48f49atW8z1N/LkyRNUVVVh3LhxTZ6vuroa9+/fx48//sjIkpKSwOPxMG/evGbL+m8RHh6OkydPQllZmem/mqIpj38jR48ehaGhIRYtWgRtbW2Z41wuF3fv3mWMdz6fD5FIBC0tLbBYrM+WVSgUIjw8HFwuFyNGjAAAEBHOnDmDgIAA/PTTTzI6IpEIeXl5kEgkUvJnz57h2bNnmDNnDnR1daGqqorCwkL4+flh27ZtMvcml8uFjo4OAMDIyAjXrl3Do0ePpAYRHA4HbDYbenp6csvP5XIhkUjQpk0bmWMcDgdeXl7466+/PlsPzVFVVYX6+nqIRCLmPY+fwuPxUFNTg7Zt20JFReWrziePmpoaKCsrS/WjQMNvUVJSAiMjoy/Kr1+/fhgzZgxCQ0PRunXrz6YPDw+HRCLBlClT8OTJEzg7O4OIEBISAoFAADs7O7ntsyWcO3cOmzZtws2bN/H9998DAOLj4+Hg4ICTJ09iwoQJ/yjff8KBAwdw8eJFnDhxApaWli3S0dXVxfr167F582aIxWIUFRVBU1OTOV5TUwNVVVW0a9dORvfp06dYv349Hjx4wMh27dqF7OxsnD59utnz3rp1C3Z2dggNDYW9vT0qKirg6OiItWvXIjg4GCtXrkS/fv1aeOWfR6q35vF4OHToEPr27QsrKyvExcXBysoK06ZNg0QiAZfLRZs2bbB161ZUV1ejXbt2MkZaI2FhYXjw4AFMTU1hbm6Oly9fwsjISO4LebW0tDBgwACcOnUKSkpKcHNzA9AwbXX9+nUcP34c6urq2LNnD5ycnGQaT2BgILS1tTF+/HhMmDABOjo6GD9+PMaNG4e1a9diyJAhGDt2LPz8/NC5c+cvrqSrV6+isLAQS5cuBQB07NgR3333HYCGh7KnpyecnZ1ljLYnT57gwIEDzAhXKBSid+/e2L9/P0JDQwEAHz58wJEjR6Crq4vXr1+jS5cuMucvLy/HmjVrpGRcLhcmJiZSxsDHREZG4tChQ7C2tmbObWpqCkNDQ/j4+AAASktLcenSJRgbG+Py5cvo27cvuFwuIiMjkZGRAV9fX7i4uKBr165IS0vDsGHDEBoaij///BNz5sxBcHAwkpKSpG6Mr2XOnDnw8fHB/v378ddff2Hnzp0oLi5GQUEBdu3ahatXr8LGxgZTpkzByZMn0a1bN7n55ObmoqqqijHaDh8+DC6Xi0mTJiE2NhaXLl1Cv379pIyKq1evYsaMGejTpw9CQkJw6NAh5tjnDPKqqipwuVxs2rQJq1atQl1dHV69eoUBAwbg9u3b0NbWxtChQ8Hj8RAXFwdzc3PmBcAVFRUYOHAg3N3dmfwyMzPh7++PvLw8FBYWIioqCklJSXj//j3mz58vVe6muH//PjIzM5n6ePLkCXbv3g0XF5cmdX744QeZe7Rnz56YOnVqs+eytLSEtra2jAEo78XI/wkaPe8bN27EmzdvkJ+fL/cFy40kJibCz88PZmZmco+npKQgNTWVuec/JTc3F8XFxTh//jzzXVtbG46OjjJez7Fjx8oMqIRCIYRCIZYvX87IeDwe3r17x3jncnJywGazYWxsDKDhoRMRESHjPT969ChGjx6Nu3fvQkNDA9nZ2WjXrh1MTEyQlpaGoUOHMmnfvHmD33//HQMHDmRk9fX1AIC///6b8UBfv34dRkZGOH/+vJSx33itGzduhIuLS5OG+8eDaABITU3Fy5cvmQfm7du3MXfuXPTu3VuufnFxMTw9PfHu3TtIJBJcu3ZNJk3jINjf3x+XLl1i+rp/g7y8PHh7eyM9PR3Tpk2TGmgDDUb5X3/9hW7duuG3335rMp9z587B3Nxc6oXmAwYMYAy0a9eugcvlYvbs2XL1L168CB0dHdjb2wMABg8eDAAwMTHBrFmzcOXKFZw5c+YfG2q6urowNzcHEeH58+ewtLTEqFGjsHfvXkyYMAFlZWXYu3cv1qxZI9fY+afk5eUhLy8PVlZWAICBAwfCzc0NgYGBaN++PUQiETQ1NREYGIg+ffo0+ds2lqm4uBj29vaYNm0azMzMkJaWhitXrqB///7w8/OT0snNzcWuXbswatQoCAQCxMTEoEuXLmjdujXy8/NRX1+PyMhIFBUVNfuy9caBPofDYe45MzMzDBgwgHFy/CvQR2RkZBCLxaLa2lrasGEDsdlsOnv2LBERCQQC+vXXX2nTpk10584dKi0tJYlEQp9y8+ZNmjVrFgmFQqqrqyOBQEAikYgEAgF16tSJEhISZHSIiDgcDg0ePJh27tzJyPT09Cg2NpZWrVpFixYtIpFIRD179qTnz58zaerq6uiHH36grKwsevToEenp6VFhYSH5+/sTEdGoUaMoMzOTXr16RQYGBiQWi+Wevzl+//13srGxYb7r6urS/fv3aePGjaSqqkoAaM+erEzi4AAAIABJREFUPVI6QqGQJkyYQL///juVlJTQsGHDqEePHszxU6dO0bBhw8jHx4e2bNlCdXV1cutzwYIFtGPHDqqrq5P6ZGVl0fz580koFMro8Hg8+u6772jt2rWUmJhIO3bsIJFIRCKRiHbs2EEnT56kqqoqunHjBs2cOZPq6upk6iUnJ4csLCzo4cOHRETk6elJ06ZNIyIiTU1NCg0NpR07dtDy5cu/uD4/x+3bt+nHH38kiUTCXO/Lly+pQ4cO9PjxYwoKCiJ1dXVKT09ndBISEkhNTY1UVFQIAE2ZMoWsrKxIRUWFevXqRVu2bCFTU1MaOXIkbd++nbZt20a+vr4y53779i316NGDtm3bRu7u7uTu7k69evUiZWVlcnd3J0tLS2rTpg3dv39fSm/ZsmWkqqpKSkpKpKKiQioqKtS9e3dKS0ujlStX0g8//ECtWrUiVVVVYrPZZG1tzeg+ePCAtLS0KCkpibp06ULu7u7k7+9PIpGIhEIhmZub0/nz55nfsCVteObMmXTz5k2ZdiOvvTQyZMgQcnBwoB07dkh9+vTpQ7du3Wr2fGvXrqVdu3ZJyZSVlen/sPfm8VRu7///a++NbcqUKRnSSSShDEWDNDilaDg5mgdFpyLlVNJIo+o0aEKJdBJFGlSmimgkIREqUyLzPNt7/f7wcP/a7b1R57w/n/f3+/V8PHpk3/ea7nWvew3Xda1rXbp0qdey/lNaWlrIokWLyIQJEwibzSYvXrwg+vr6pKysjG8cNpvdYz0ePHiQrFq1iu/9RYsWkWXLlhFDQ0MybNgw0tLSQiIiIsiZM2eItLQ0WbduHdm2bRtRUVEh9+7do+LV19eTWbNmESaTSdTU1Mju3buJkpISefPmDcnOziY0Go1Mnz6dMJlMIiQkRIYPH07ev3/PkXdGRgYZOnQo2bBhA2EymQQAYTAYhMlkEiaTSQQEBMi5c+d4ltvW1pZ4enpytYvY2Fjy+fNn0traSuLj44mUlBSZN28eyc3N5YhfUlJCtLS0yMWLF3n2V4QQ4u/vT6ysrEhnZyexsrIiwcHBJDIyktDpdOLu7k6WL19O6HQ6sbe351u/bDabtLe3k9TUVDJr1iyeYVpbW8miRYsIAHL79m2+af0MKSkpJCYmhlhYWJBDhw7xDNPZ2UkEBASIl5cX33Tmz59Pzp49S/0GQLZu3Ur9njlzJtHQ0OAZNysri4iLi5PHjx8TQgj5/fffiZ2dHXW/oaGBqKiokJKSkh96tm4CAgKIgoICMTExIR4eHkRAQIAwmUzCYDAIjUaj2iCAHt/Vz+Dn50dUVVWpPnbNmjWEyWSSDRs2EHl5eTJt2jQyZMgQQqfTybhx40hFRQVXGpKSksTb25t4eXmRL1++EH19fdLW1kbi4uJIY2MjCQ8PJ5GRkVzx1qxZQxwdHQmLxSKxsbHE3d2d7Nu3j+jo6JDRo0eT/fv3EwMDAyIqKsqz7NHR0YTBYJA3b96Q+/fvk8TEREKj0QghhMTFxRFRUVFSXl5OTp8+TV6/fv2P64pj2Tt06FCw2WxERkYiPj4ecXFx+Pz5M7S0tPDkyRN4enpiw4YNCA8P71HFFRISAgUFBQwbNgympqZIS0vrdWYpJycHAwMDjmudnZ04deoUsrOzISIignXr1qGlpYUjzPbt25GZmQkrKysoKipi+PDhWLhwIZ48eYKUlBTMnDkTYmJi0NLSws6dO/lKnnpDU1MT0dHRKCoqQnNzM44dO4b169fDwMAAy5Yt45LuMRgM7N27F83Nzdi4cSPk5OTg6+uLXbt2YezYsViwYAFYLBYOHDgAV1dXSrXGi7S0NK7VQF1dHZqbm3mGj4yMhKamJhYvXgw1NTV8+PABKioqiIqKgru7O5ycnLB8+XJMmjQJEydO5Jk3jUYDjUaDvLw8SktLOVQsYmJiUFJSQlpa2o9UYZ8xNTXF2LFj0dnZidjYWBBC8OnTJzQ3NyMnJweZmZlgMBgcUpBRo0ahtbUVUVFRmDVrFvz8/FBUVAQDAwO4u7vDxsYGDAYDbW1tcHV1RW1tLaWqYLPZ8PDwQE1NDVauXAkZGRksWbIEFRUVqKmpQVlZGdTU1DBu3Dg4OzvzVFPY29sjKSmJsnnbvHkzsrOzkZmZiSdPnuDhw4eQkZFBXV0dTE1NOaRZGRkZmDBhArZv346SkhLk5OTgzZs3GD58OJqamtDc3IyioiKkp6ejubkZd+7cgaOjI5dU+M2bN1BUVISSkhJqamrQ0NAAJpOJuro63LhxAzNmzICKikqPdT948GCMGjUKTCYTYmJikJCQ6NOq8NatW1wSOhaLhaSkJJ52dv8W1dXV2LlzJwghiIuLw8GDB2FlZQVPT09YWlpi//790NfX51JL+fv7w8HBAQ8ePOhVNfo9Dx8+RH19PS5fvgx3d3doa2tDWFgYs2fPxtmzZ2FoaIjz58+jvr4ez58/55ACDBgwAAMHDoStrS0WLFgAAAgICICgoCAOHz4MLy8vSrq2detWPH36FMrKyhz5s9lstLe3w87ODnZ2dti0aRPU1dXh7OyMxsZGODk5cdgGduPl5YWYmBjY2dmhoKAAs2fPhrOzM1auXImwsDC0tLQgMDAQbW1tiI6OpqQ233Lv3j1oaWlhzZo1XPd8fX2RkpKCp0+fQlZWFhEREUhNTcXGjRvR2dmJhQsXYu/evQC6+pdvpXnfQ6PRICgoyFc1D6BHdSzQZRtXUlLC9/63fK9i6/7dk30gg8FAZmYm7O3tYWtrCwUFhT6l/S2EEA5p6rf4+vqivb0dDx48wMePH5GYmIhly5bh4sWLVJjdu3dj7ty5UFdXx4ULF/okUYuJiUFYWBhyc3PR0dEBHR0d7N27FytWrMDFixfh6OiIPXv2YPDgwThw4ADy8/N7lBb+KK9fv8auXbuwf/9+jnbU/Vxnz54FAGzcuBF5eXlwdXXleK4LFy6gsrISra2tuHTpEkaPHk3VPY1Gw8GDB7Fo0SK8f/+eSzMVHh4ONTU1rFy5Eg4ODpgwYQJlhlJfX48PHz7A0tISnZ2dUFZWxtatW7Fjxw5Krb948WLU19eDzWZj9+7dALragbm5OdasWYPExESMHz8eO3fuBNDVP30/r/lROL6AtrY2+Pr64vbt24iIiEB5eTmWLFkCeXl57Nq1CxcvXsSlS5cwb948FBcXY+jQoVwJqqqqQk1NDf7+/ggMDMTgwYMxePBgNDc3Y+LEiVBXV+eKk5OTg7i4OGRmZuLWrVsIDw/HnTt3ICcnh/3798PX1xcKCgpwdXXFvHnzOOKuWrUKIiIiaG9vh6KiIuh0OgYOHIj8/Hw0NjYiJycHOTk5MDAw+ClbtIcPH+LRo0eQlZWlBlMFBQUcPHgQurq6iIuLA8D9IdJoNAwZMgRz587FggULsH79etjZ2SE8PBxMJhPv3r2Dg4MDJCQkcPPmzR4/gtu3byM/Px9nzpyhGmv3AMxr0rlgwQJYWlpCXFwc169fx6FDh/DHH39ATEwMdDod06ZNg5CQEISEhHjmd/PmTaSmpiI3NxeRkZEICwvD5MmTAYCyF/xPkJmZicTERLx+/RoWFhawtLTE0aNHoa+vj9raWrS3t+P169coLCzsNS17e3vk5uYCAHx8fFBWVoaIiAjIycnBzc0N9+7dg6enJxYsWAA6nY7Nmzdj1KhRGDhwIIyMjKCpqQlNTU0AoGz0elPdfdtJq6urIzY2FocOHYKmpiY1mEhKSnLYt7BYLGRkZODcuXNobGxEeno6zp8/Dz8/P0q1NWfOHGRnZyM6Ohrm5uZobGzEhw8fuCZplpaWmDhxIqZOnQptbW1kZ2fDx8cHbW1t2LRpE9zc3HDo0KEen6Gurg4VFRX4+PEjjI2NkZKSgnfv3vWqSvr06RPP6z3Zff1TioqKsGbNGowZMwaHDx+GgIAAnj59iqlTp2LatGmg0+n47bffIC8vjw0bNkBHRwfTp08H0PWu2Gw2vL29ERERASaTiY8fP1LmG97e3lTY73nx4gX8/PwgKyvLcf3169c8bW55oaWlRQ0O27ZtQ3FxMVJTU3H+/HkqjLq6Ot68eQNxcXGeaURERADompyXlJRAWVkZzc3NKC0thY6ODlf4JUuWYMaMGVS7Pnr0KBYvXoyxY8dCTEwMU6ZMAYAebQ9jY2P5Tiq6VUPz58+Hi4sLTExM4OPjA3V1da6NCRoaGnztzPoKnU6n+jBeZiKJiYm4cuUKDA0NERERgeLiYq4wysrKEBISgre390/ZEQ0fPhxMJpPLHvNbsrOzOVTO38NvM9fmzZs57Dm739H39WZsbAwmk9njQv9bLCwsYGFhgerqakyePBkXLlyAgIAAli9fjrCwMLx+/ZqaHK9btw4yMjJ9srPsK52dnZg7dy7mz5/fa9jJkydj4sSJHNe67TWPHDkCFxcXLFq0CCUlJRw2kNOmTUNBQQGXIGnKlCmwtrZGYGAgREREYGBggMLCQowaNQr379+HsLAwXrx4gY6ODty7dw/29vYcAoqTJ08iPj4eUVFROHv2LB48eIAtW7bA398ftra22LVrF+zt7Xm2x5+FY5JWVVWFzs5OPHr0CCkpKZg7dy7WrVuHnTt3Yv369Vi/fj3WrFmD27dv87VDotFolPGsv78/7t27h4EDB6KqqgoyMjLUhCw5OZmyfaHT6WAymWAwGBg3bhysra0hLS2N8vJyPH78GDExMfjll1+QkJCA1NRUjvx0dXVx7949nD9/HgICAqDT6RAUFMSiRYtQUVEBQUFBapJ1/PhxKCsr92llX1dXhy1btkBERAQCAgI4fvw4NSNmMBg9rvC6yczMxLFjx6Cvr49bt27h2bNniI6OhrS0NOzs7LBr1y6Ym5tTneb3sFgsGBkZ4eLFi2CxWGhsbOT4WEaPHg1vb2/cuXMHoaGhlDEwnU6nOvbS0lLMmDEDd+7coSRPvX3MgoKCkJaWhqysLAoKCmBnZ0ftmHv16hU6Ojqo3ZZ5eXlobGzkO5D8CAwGA0wmExEREdDS0gKLxUJ9fT0cHBxQWFiIqKgobNu2DUDXAJ2TkwMNDQ1qolpVVYX4+HgQQuDg4IA7d+7AysoK9fX1EBMTg4qKCjo6OqCnpwc9PT2OgUxKSgpRUVHIysqCn58fx667uLg4tLS0UNeamprg5uaGrVu3YtGiRVS4tLQ0KkxeXh6Kiorg7OyMsrIyHD16FA4ODpTBf7exOIvFgpWVFWU/xGAwsH37dqxduxa6urpU2jExMVi3bh12796NtLQ0yiaym6qqKtTW1mLdunXUYPstmzZt4ursgK4NC93vsqGhASoqKhg5ciRlKzRo0CDKvujWrVsICAjAmTNnuCaINBoN165dg5iYGP744w+kpKQAANf32k1nZ2efpRxNTU04d+4crK2tYWFhgba2NgQHB+PGjRtYvnw5li5dSoVlMpkQEREBg8HA9OnTUVpailWrViE8PJwyju6GTqfDwMCAklR92x6MjY0hIiLCszyioqLw9fUFADx+/BgFBQUoLy9HQEAAGhoaepQQffnyBenp6Rg0aBCKiooAgLJ927hxI3bs2AEPDw/qW/6e4uJiFBYWYtu2bRg9ejQAwN3dHWPHjqUmmM+fP+c5IZGVlYWsrCza29vh7e0NQggePnwIbW1tXLt2jaMe+fH161eei/NvSU5OhpycHFgsFurq6nqUdv0TuiX9NBqN5wTLxsYGNjY2AEBJ8P4TzJs3j+8kLSsrC+/fv4ePjw+1YHn9+jVOnTqFO3fuIC8vj69GRE1NjfrOzM3NMWzYMCgpKVF1ymKxQAiBtrZ2n8aj77l79y6amprg5OSE3NxcKCkp4ebNmxAXF0dbWxuKiorQ2tqKHTt24Pfff8fUqVN/OI/W1lY0NjZyLGjGjRuH/Px8qv3SaDRISEggOzsbkpKSEBUVhaCgIISFhdHQ0IDx48dTk9zKykqUlpaitbUVLBYLKSkpePHiBVauXEml3y28MDQ05BrrpKSk0NjYiCNHjuDgwYNUfRJCoKCgADExMejp6SErKwseHh6URKwbBQUFSqq2YMECZGdno6WlBb6+vqioqEBqaip27twJBQUFxMfH97qjvy9wvFklJSW4uLjg0KFD+Pvvv7Fx40bY29sD6BKVnzx5EtbW1pgwYQIsLS0xYcIEjg/248ePlOh37Nix+PXXX+Hm5gYREREcO3YMCQkJiIuLw5MnTzg+XA0NDWhoaCA5ORmKiorU6qF7J5qamhrExcVRUlICIyMjnh/97t27UVFRAVFRUQwcOBANDQ04cuQITp48icrKSlRXV2P48OF8O97vkZSUpMSvzs7OXB18X+hu1KtXr0ZCQgJCQ0MpQ8ldu3Zhw4YN0NLSwuzZs6kG+y0FBQXw9fXFnj17qN2cR44cwefPn3Hjxg14eXkhMTEREhISfCdeixcvRlxcHG7cuMFzcvr8+XPIyclBQ0ODumZtbY3i4mJcuXIFJ0+eBNAltn3x4gWA/3+HqpGREdVR/BtoaWlRqnV1dXW0t7dDWloaN27cQEBAACoqKiiXDu7u7pg+fTrCw8OpCeKcOXOQmpoKQggEBATwxx9/4O7duzAwMICNjQ0KCgrQ1taGVatWIT4+nstAfuTIkfjzzz9haWnJMcgFBwfjyJEjHNe2bduGESNGcMTv3n0HdHXERkZG2LVrF+rr6zFjxgwICwvD2toatbW11IYHISEhWFpaUguNiooKmJqa4vLlyxxb9b9+/Yq8vDz8/vvviImJwcGDBzncgrS0tIDNZnPs3O0LdXV1VJm7xffFxcXw8PDA8OHDOSahQFd7+t7XYXFxMURERGBra4vdu3ejtbUVioqKUFdXh4mJCW7fvs218aC+vr7P7jm6Vc5PnjyBhYUFWCwWpKWl4e3t3etGIDExMdy4cYPnPTqdTj3z94wdO5av9GD27NmU8f7z588xevRoLFiwAAsWLEBwcDCSk5N7fabXr19Tz6+kpITLly/D0NAQS5cu5bn5oJuGhgY0NTVBTk6Oem9z585FQ0MD9bu1tRX79++Hrq4udHV1uZ5DQEAAQ4cOha2tLXbu3Mlh1N4bTCaT2mjAi+6+XVNTE+3t7X1O92cxNDTkuauTzWbDz8+P0nTwY9KkScjLy4O9vT3fTUj/hOjoaDAYDMjIyODTp0/Ys2cPBg0ahMWLF1OSeX4ajW4qKiqQlpYGPT09rFmzBps3b0ZJSQkcHR0xduxYhISE/PAkLSAgAH///TcaGxuhra0NNpuN48ePw9/fH8bGxggICEBYWBjU1dUhLCyMnJwcajxLTk6mFhi9ERcXh7S0NAQEBHCMMTNmzKA2Y9FoNMjJyUFfXx8uLi6YMWMGmEwmxMXFUVVVxbF4am5uRkVFBfLz89HZ2QlCCExNTanNeZ2dnWCz2RATE8Pnz5+5FrM1NTVwcnKiJLstLS0oLi7GgAEDKK8BxcXFGDZsGNeGGaBrwRgWFkbVl5+fH4qLi6Grqws5OTmIiYmhoaEBVlZWPM0FfgaON1tWVobNmzcjNjYW9fX1yM/Px7hx47Bq1Sq0tbUhPj4eX758QUxMDCIiIqChoYGoqCgoKioiNzcXM2bMwIoVK+Dm5obLly/D0tIS+/btw9atWzF+/HhMnDgRcXFxmDp1Kt+dIs3NzYiJiUFDQwMlBk5NTYWSkhKsra0hIiLCc5W5detWsFgsCAoKgs1mY+fOnaioqADQ5SQ0MjISampqePToESwtLTk+7HPnzsHR0RH37t3r0QfXt9y9exdmZmYYPnw4hISEwGazqfyBrt1bT548wapVqzB9+nQICQkhOjqakkix2WxUVVXh/v37ePDgAdatW4d9+/bB1dUVbDYbT58+xaFDh3D48GFMmjQJjo6OmD59OlxcXCgfaQsXLkRGRgZqa2s5VGgPHz7Es2fPqN9jxoxBR0cHnJ2dQQhBcHAwXr58idraWoSFhYHBYCAhIYFno+x2gNs9IX/8+DGV1969e6nn/k8gJyeHhw8fIjo6Gp6enqDRaNSKuHv1+a0Ez9bWFnZ2drC3t6dUVV5eXrh58ybS09MRHByMQYMGYeHChYiIiMDp06exevVqAF0f9+PHj1FfX4/ly5dDWloaLBYLu3fvxtChQ/H7779DSkoKEhISfO0aDQ0NsXDhQgBASUkJYmNjwWQyISQkBBkZGdTW1qKmpobLrvLQoUNwd3eHuLg4WlpasGTJEixZsgR3797F9OnTISIigpiYGNTW1uLWrVs881ZWVkZHRwfOnz/PpZLu6f10D+RsNhsmJiZgMBh4/vw5MjIy0NLSgunTp4MQgszMTLx69QouLi5cA0J8fDxkZGTg7u6Ot2/f4t27d7h37x4GDRoEW1tbeHl5YdasWRzfnIyMzE9LN0RFRTFnzpyfittXundutba2QkBAgOOZv5V8q6iooKKiAkOHDoWoqGivLhloNBrodDqmTp0KNzc3AF02vMrKyhAVFYWFhQW1k/t7W8D8/HyEh4eDTqeDzWaDRqNBU1OTkoR9+PABbDYbTU1NyMvLg6mpKdzc3LBr1y4AXW5SutWxJiYmCA0NhaqqKhITE0EIQW1tLSorK/Hlyxfs2LEDWlpaOHr0KBgMBlUGERER1NbW8n2+vLw8sNlsdHZ2Yu/evVBTU+vzwvhn4Ne26XQ6tVu9J7q9FPwTR9/dNtPfc+TIEQQFBeHBgwcQERGBjo4OtLW10d7eDnl5ecjLyyMrKwuTJ0/Gs2fPeJoCAV3mLiYmJjh69CiCgoKwYMECvH//HlVVVZg/fz7ExMR4xmtvb0dDQwOEhYU5wmhoaKCsrAxMJhODBg3CunXrAHQtOEJCQvDo0SO0tbXB09MTu3fv5pIQlpeXIy8vr0910y0N/L7NSEtL4/3795g0aRLVzul0OuTl5TF06FB8/fqVUjd+i6qqKlRVVdHR0QEXFxfo6+vDxsYGZWVlEBAQAJvNxtu3b1FXV4e3b99yuVpKSEjAsGHDKGm3vLw8REREMHDgQKirq6OsrAzTpk1DVFQUFi9ejIyMDGry/vbtW6xevRo5OTkghEBKSgrHjx/H9u3bYWxsjIULFyIrKwutra2wsbFBXV0dOjs7f0rK+S0csSMjI7Fu3ToEBQVhzpw5MDQ0hK2tLbS1tZGVlYWCggKoqKjg9evXyMrKwvDhw6GoqEiJzb28vDB+/Hjs27cPERER8PLywvPnz/Hy5UucOHEC9fX1SExM5CnRycrKQk5ODvLy8tDU1ISBAwdSftm8vb0xbdo0sFgsxMXFoampidJLs9ls1NbWIjY2llIDEUJw4sQJajC8ffs2GAwGUlJSQKfTUVJSwrECT09PBwAsXLiwzyciWFtbQ09PD9evX4efnx8KCgqQmJhIGU8/ffoUxcXFiI2NxcePH5GSkgIzMzMqfrdN2ebNm2FgYID29nZqglhYWIibN2/iwIEDUFdXh4ODA+WO5ObNm6itraV8uZw4cYJLUjB06FCuhlFTU4OQkBBKNaCjowNBQUHMmTMHAgICXBPfnJwclJWVwdDQEIsXL8b27dshISGBY8eOwcfHB6GhoVS4pKQkDqPxmpoaeHt7g8lkYsWKFVy2O32lpaWF6uj279+P48eP4969e0hJScGNGze4tkc7OTkhKiqKK5358+fDzMwMnz9/RkdHBxwcHPDHH39wrJxzcnKwdOlSGBsbU+LsR48e4ejRo0hISMCQIUOwcuVKTJ48mUO0zo9udR/QJZX18fEBnU7nOcDNmjULSkpKMDY25lgk3Lx5E/fu3YOXlxcA8HRf8y3m5uaYPXs2ZR9ZVlYGBQUFVFVV9WojkZ+fj8rKSo73mJOTg/Pnz1MDoYiICL5+/cphyN7a2opr167B2dkZQJdD3IcPH+Lp06eUlPPJkye4detWn9yG/Ldx5coVKCsr8/RJ+PXrVwQHB2PGjBmYPXs2ZRPT0tLCV4UlJCTUo8saGxsb6j3fu3ePQ40nJSWFiRMnQlNTE7W1tWAymZCVlcWbN28wYsQIuLi4IDk5Gffv34eenh6cnJw4+rmHDx9ybfZRV1eHm5sbaDQanjx5gidPngAApbH4Xl2pqamJw4cPUy6Evqd7k4abmxtCQ0Mxf/58alH3rZS3qKiIci3yT6ivr+crCRw3bhylufhP8uzZM74bDBQUFHo05tfW1kZtbS1SUlJ4TtIaGhpw/vx5+Pv7Q15eHikpKfDy8kJGRgamTp3aow/CW7duYfny5TAzM8PVq1cpwcjjx4/R0NCA9vZ2DtciOTk5lH/J8PBwiImJ8fQn2S0k+KdER0fD1NSU49qlS5eQn5+PDx8+oKWlBWvWrOEp0U5MTERbWxtOnz6NoqIibNy4Ea6urnj69Cm+fPmC06dPUyYJ36KsrIyZM2eirq4OcnJy+PTpE1JTU5GamoqCggLk5+dTGxd27tzJsUBRUFDAb7/9BktLSxgaGnJ8mxcvXkRubi4iIiIgJiaGv//+G9u3b8eFCxdgbW39zyqK37ZPKysrkpaWxnHN3d2dbN68mWf49vZ28vr1azJhwgSio6ND6urqSHx8PJGUlCQHDhwgbDabZGZmkkGDBpH29nYqXmVlJTE3NycSEhLk119/JTU1NZTrgaamJtLU1EQMDQ3J/v37qd9tbW1U/NbWVmJnZ0cqKipIeHg4efjwIcnKyiJnzpyhwpw6dYpMnTqV7xbXkpISMmXKFLJr1y6e9zdu3EiOHDlC/dbV1SVfv36lnpuQLhcQ3S4qvr1OCCERERFk6dKlXOnq6upSLk6+paOjg7S1tZH8/HwyYsQIMnnyZFJXV0eSk5OJsrIytSU7Li6OCAgIcNQHP65evUo0NTXJ169fyZw5c4iFhQUJDQ3lCpeRkUF0dHSIuLg4mTVrFqmoqKCeZdy4ceTw4cMkMzOT2hb/6tUr4u7uzpGGh4cHCQ4OJqGhoWTnzp29lu17DAwMSFhYGLG2tibrwz4uAAAgAElEQVQ7duwgFRUVJD09nSgrK5PS0lIyZcoUMnXqVNLS0sIVt3urfzcrV64kN27cIIQQsmfPHuLq6sozTxaLRQ4fPkw9V21tLVm1ahW5efMmFSY3N5fo6emRZcuWccVPT08n2trahM1mk9DQUGJpaUlmzJjBs3wSEhI8y5CZmUmGDBlC/W5paSFjx44llZWVJDo6mixcuJBnvPr6evL06VPS1NREjh8/Tu7evUsIIWTHjh3E0dGREELI/fv3yeTJk0lVVRXPNDw8PAidTqfC79ixg2zfvp1n2G9JSEggo0aN4mjvRkZGHN+Li4sL0dTUJOXl5b2m90+xtrYmqampvYZzcnIiAgICvYYbP3488fPz43lv+/btREtLi7S2thJTU1MyadIksm/fPiIgIEAGDhxIZGVliaCgIKmvr6fiFBcXEz09PQ63DlpaWuTTp09c6Wtra5PAwECOa4sXLyZycnIc/0RFRQmTySSysrJETk6OCAkJkdOnT/f6bIR0uXkYMmQIERAQIMuWLSPPnz/vMXxBQQEZNmwYuXbtGt8wjY2NZMWKFQQAsbW1JS0tLSQyMpIICAiQuXPnEn19fSIkJEQcHBx6LV9GRgYZMWIE3/ttbW2kqamp13R+lpUrV/J1wUEIIfPmzSOWlpYc77gbT09PsmTJEo5rO3fu5HDBQQgh0tLS5NmzZzzTnzlzJtm2bRvlLubChQuUG5/envvixYsEAFFRUSEZGRlc9wMCAsioUaOo3ydPniQiIiJk5cqVZPTo0URVVfWnXFb1FWFhYTJv3jzq9+DBg8mlS5eocb6n53N3dyfOzs7k7t27RFpamly5coUQQsiAAQOImpoaxzzl4sWLXPFdXFzIhQsXyNGjR6l/hoaGxMjIiPptbW3N15WPkJAQ9feqVavIhQsXSHl5Odm6dStxdHQkDQ0NpKKigjQ3N/9U3XxLj3I4b29vambNYrEQHx/Pd1UQExODv//+G4cPH4aqqioOHjyIpKQkPHnyBB8/fsSSJUvw9etXSoLTjaCgIIyMjGBtbY0VK1agra2NcnwLdKnbFBQU8PnzZ+Tl5SExMRH5+fn4448/MHToUKSnp6OjowNiYmLIzMyEhoYG0tPTOfT8vYkb2Ww25OXl+ToUFBcXR2BgIGVrUlpaCkdHR44wdXV1ePbsGV6/fs1lJ1FXV4eEhARcv36dIw4/tQGLxUJgYCCePXuGY8eOUbtl79+/j/3792PAgAG4evUqzp8/T6lbeVFZWYnc3FwcOHAADAYDQUFBUFBQgL+/Py5fvgx7e3ucOnUK/v7+lFRJWVkZ06ZNg7W1NczNzdHZ2YmrV69SEgMnJycUFhaitLQU169fR3JyMiIjIzlUVwwGA5KSkqipqemTV+1u7ty5gwsXLmDYsGHYu3cvDA0NMWfOHJSVleHTp0/o6OhAVVUV5Yz306dPGDhwILXbqaGhAQkJCTxt5Dw8PPD+/XvK3UZ+fj7ExMSwa9cuDBo0CHQ6HXFxcRAUFERhYSHWrVuHkpISTJ8+HTY2NpSXfzExMVy7dg1jx47l2pH7+fNnHDhwACNGjEBDQwMlKaitrUVwcDBkZGQQFBQEOTm5PtWHsLAw7t+/j8zMTEray4vnz58jKioK48ePh6WlJUxNTeHj40MZxpqammLRokVITU2FqakpoqKiOCRriYmJeP/+PYqKivD27VtYW1vjw4cP0NTU5GqzQNexaDQaDdXV1di4cSPOnj0LBoOBV69eYcOGDRg+fDilRga61Ll37tzB+PHjcenSJZ4bGP6n+e2333D27Fns2LGD766+2tpa5OXl4fHjxxzPA3R5LM/Ozsa9e/fAZDJx4cIFBAcHQ1BQENra2oiMjASTycSMGTN4SgJCQkKQnp6OyspKjutv3ryhdppWVFRwnSwRFBRE/V1eXg4JCQk4OztDSkoKR44cAdD1PntTuzY1NSE6Ohp79uyBlZUVjh49ihs3bmDHjh2QkpKCg4MDTE1NuSTsampqiI6OhouLC1RVVXlKsW7fvo2cnByEhIRg06ZNcHV1xcyZMzFu3DjcunWLcmnTkxq+vr4eQUFBlH3qwoULcerUKY6djWw2G4GBgYiJicGpU6d6dF78o9TU1FAnrcTGxkJbWxtWVlaUqQOLxcLt27dRW1uLoKAgnv1cZWUlysrKkJaWRo0HWVlZkJKSQmZmJgYMGABVVVVKBf4tHR0dlK3Zli1bQKfT8fz5c4SHh0NDQwMNDQ2UaYe2tjbP971mzRq8evWKGne/53s7602bNmHZsmWYMmUKamtrUVdXh6tXr+LXX3/l617kZ7lw4QLMzMxgbGyMgwcPUrsoxcTEenWO3tzcjLy8PDg5OUFDQwOrVq2Crq4uVq9ejQkTJsDMzIw6HrKwsBDh4eFcLmMEBAQgLS3NcWLG+PHjkZGRQUk0u//vy6a4AQMGUDZp3XEqKipQV1fH12F2X+lx9jJ27FiOl6+urs53i/nEiRPx66+/wtPTE2VlZRg1ahQ2bNgAFRUVqKio4OrVqxAUFOQ6KkRCQoLqXIAuQ8OIiAhKxN7U1AR5eXkwGAyEhYWhsrISzc3NlAuQ6OhobNq0CSIiInBxcUFFRQU8PDw4JlzZ2dlcBoTfl+HQoUN8bQI2bNiAX3/9FZWVlSguLoaNjQ2XWk1VVRWbN2/mqZIqKiqClpYWR11276TlBZ1Ox6xZs7Bs2TJ4eHjAz88P06ZNQ1BQEGRkZJCfn4/Dhw9DTEyM67gooGsH5okTJ5Cbm0s14hkzZlAdiYyMDFxcXDBmzBg4OTnhwYMH1CRNSkqK2iwAdH243Z69jYyMAACKioqYOnUqZV/3vX+s1atX48SJE5CWlv4hFVdkZCQmTJgANzc3FBYWYs+ePXBwcKDcb1RWVnKI2eXl5bF7927KlQGLxcLz5895Drq8VJQMBoNji7agoCCGDh0KERERKCoqQlFREeXl5XBycsKAAQMgIyOD9evXw83NjbJ37EZGRgbe3t5UuzMxMaEMp8XFxWFiYoK1a9eitrYWV69e7XOdCAkJoaysDB4eHpRK8VsiIiLg4OBA2cJJS0tzLEqsrKwokf1vv/2Gc+fOUerbjo4OHDlyBI8ePcKVK1cwePBgKCoqQkVFBQ8fPsTbt2+5zsEcPHgw9U7XrFkDNzc3mJiYYMOGDXjx4gWOHDkCAwMDjnoVEhJCYGAg/v777//YTr8fxdjYGHFxcQgMDOzRTciMGTOwceNGjmvv3r3D4cOHceTIEaoDHjlyJA4cOIBHjx5BUFAQSkpKYLFYuHr1KsegIyoqCn19fezfvx8qKiqor6+Hj48PNaGXlJTEli1bkJCQAAUFBZ47dbtJTEyEv78/nj17xqH672kSXFBQgMjISFy+fBmamprYt28fZs2aBSaTieXLl8PKygqnT5/G8uXL4efnx9P2b+jQoTh37hw+fvzIcb22thabN29GTU0NTp8+Tdn9sFgsKCsrU7tHFRQU8PDhwx492EtISGDdunWUb8yKigou1xMdHR2Ii4tDWFgYli5d+q9O0gQFBWFmZgYzMzNKtfwt3WdKh4eH8z2iLScnB01NTfj06RPevXsHFRUVTJo0CeLi4oiKisKyZcv45h8eHo43b97g6tWryMvLw5IlS1BXV4etW7fCyMgILS0tiIyMhJOTE7Ux4ciRIxzq3dzcXFRXV3P0593s3buX4xSHbkP4mzdvQktLCy4uLnj06BH27NmDv/76izqu7t8gKSkJV69exaVLlzB48GDK3U1lZSUCAgK4bHaBrs0x3fXcXQdjxowBnU7H2rVrYW9vD0NDQ5w4cQI+Pj64ceMGdHV18ffffyMzMxNZWVkcqtv79+9jzpw5HOrWbhu+bv+FvHj16hUePnzItcB48uQJ5s6di9TUVKSkpFCTY3V1dZ4mOD/EP5bF9fPTdKvh/m2SkpJIcXHxfyTt/y1yc3OJt7c39c/X15d8/vy513hJSUmkurr6f6CE/5zq6mqO0zS+JSkpidTU1PC8d+XKFVJZWdmnPDIyMkh2djYhpEsln5SURDo7O3+uwN/wvVrufwtvb2+e3sn/Tf4nnjUsLKxPqhJ/f3+ydu3aPn0Lr1+/Jrq6usTb27tHT+jdJgXfnzbQGwcPHqRU7f9TvHjxgufJIf+nkJOTQyZOnEjS09M5rv/999+kqqqKLF++nKxevbrHZwwKCiL379//oXyTkpLI+PHjSVJSEgkLCyN6enrEzc2NOmGmm9DQUKKvr/9DaffGzp07uca+N2/eEBMTE6Krq0t0dXWJgoIC9e/w4cPUtxAVFUVcXFyoeBcuXCArV64kmZmZ1LXU1FRiampKpeXm5sZVhvHjx5Pk5GSOa0FBQWTLli09lr28vJyYmJiQoUOHUtc2bdpEbt261fcK+EFohPxL/hP66aeffvrpp59+eiAtLa1Xl1bfbrwaNmwYX7+BJSUlkJWV7dWNSV/4+PEjBgwY0Ktqt7i4GHQ6nZJ+FxYWQkJCgkN1+m/SP0nrp59++umnn376+S/k5w6y7Keffvrpp59++unnP0r/JK2ffvrpp59++unnv5D+SVo//fTTTz/99NPPfyH9k7R++vkH9PUMu3766aeffvr5Ufonaf3085OkpKTwPR6nn3766aeffv4p/bs7++mnn3766aeffv4L6Zek9dNPP/30008//fwX0uskrb29HaWlpf8TZflXKS4u/ulyZ2ZmIi8v76filpaW8jzW4mepq6tDWloadQxJP/3830pjYyPf82z76aeffv5fpNdJWkVFBVavXo0rV678Kxnm5+fD2NgYd+7c+VfS40VtbS0cHR1hZmb2U/FXrFiB/fv3/1Tc06dPw9bW9qfi8iIpKQlWVlZ48+bNv5ZmP/85/Pz8eF4vLi6Gn58ffv31V67zMLvJy8tDfHw8x7V3795hypQp+PDhw0+V58qVKygvL//heGw2GwcOHOB55mlPTJ48GZcuXfrh/ICuMz6fPn3K1dfk5OQgKyvrp9L8EaKjo2FmZtbjYfa98e7dOwQHB3NNNr9/r30hNDQUJ06c+Omy/PXXX/Dx8fnp+HV1dQgJCfnp+Gw2G7dv30ZbW9tPp/F/G2w2G/fv38fz58+pa/X19cjIyMCbN29QWFj4v1i6fv4b4XnA+suXL6GqqkodEvz582csX76cup+cnIyRI0dSBwez2Wxs2bIFr1694kjn69evqKyshI6ODsd1QUFBxMTEwMLCAiIiIv/2MyExMREJCQlgsVhobW2FsLAwz3BlZWW4du0al5Tqw4cPYLFYOHLkCHWgfGpqKqSkpHDu3DnqpHuga3cfIQR0etd8d9KkSfD09MS2bdvg5OQEAOjs7ERQUBBWr17Ncch6972oqChERETA3d2d635rayvKy8uhoaFBXWtubgaLxaIOTK+rq4O4uDh1kDYvCgsLERISgtbWVsjKysLe3p7jKI3W1lZcvnwZnZ2dcHBw+FeO2QCApqYmpKenIyEhAbq6urC0tOQKU1NTg2vXrmHIkCGwsLCAoKDgv5J3N58/f4aXlxeEhISgqKgIe3t7jnZ38uRJ6Ovrw8zMjHqPP8KDBw9w4sQJWFhYQFZWFv7+/sjMzMT58+fh7OxMHV5Pp9Nha2sLcXFxnum0trZi1apVOH78OObPnw+gq/7evn2LvLw8jjbwLfX19Thz5gymTZsGPT09jvYeHR0NX19fPHv27IeeqaKiAt7e3igpKcHly5d7DNvc3IyqqioAgKmpKf766y+MGjUKnZ2dGDZsGMrLy1FfX4/MzEzcvn0bqampKCkp4UqHTqfD398f+fn5HP1NbGwsDh8+jOjoaK6+pJva2lq8f/8e/Exsr127BhkZGTg7O3Mc/v4txcXFyM3NpQ7yrqysBIPB+KHjXkJCQnDr1i2YmppSB0J/+fIFs2fPxtOnT/keh5OVlQURERFK+i8pKYnk5GQ8e/YMU6ZMQXNzMxX29u3bWLt2LXW4ezcNDQ1gMBhUvywlJQUHBwdUV1djx44dHHkpKytDQkKix2cpLy/H7t27cfbsWTx9+rRPz//06VNERkZix44dEBQUxLx58/Dx40dkZ2cjKysLVlZWUFdX5zqwvC+8f/8enZ2daGpqAovFgoqKCioqKtDW1gYVFRUq/4sXL0JWVhaenp4YOnQo3/TOnTuHy5cvIywsDGpqaj3mXVlZiY8fP4LNZvdazpaWFgQHB2PUqFFwdnbmuMdiseDl5YVx48ZRh3vv3r0bhYWFsLKywl9//YXY2FgoKyv3mk83p0+fxqtXr3D69Gm+bfs/ibOzMyIjI5Gbm9vnOFZWVhATE8OlS5c4xlOgq88rLy9HaWkpxwHo3bS2tsLLywvDhg3Db7/9Rl0PCAiAtrY2xo4d2+dylJWVQVFREVVVVZCRkQHQ9Y4qKyt7PR4KAK5evYpr167B09MTurq6fc73R+A5SZs8eTI2bNiA48eP84w0adIkxMXFYdy4cQC6OldeKz4fHx+kp6fD29v7XyxyzxQVFWHjxo04duwYmpubcfToUbi6uvLsFCQlJTFz5kyUl5cjLi6O456goCAEBATQ3t6OT58+wcPDA2JiYhzpdHZ24vDhw5CUlKQG/ZaWFsyfPx9NTU3w9/cH0NVxJCQk4OXLl7h37x5HPpGRkXjw4AEOHDgAOTk5rjK+efMGNBoNIiIicHR0hKurKzIyMnD69GnIysoC6GpoNjY2cHBw4FknhYWFcHBwwMKFCzFmzBjs3bsXDAYDf/zxB8ezuLi4QFhYGFOmTIG2tnZfqrtXsrOz8eDBA9y9exeEEJ6TtJcvX8LR0RFGRkYwNjbmWQ8/S1FRERYvXox9+/ZBREQEGzduRGNjI8egZWtri927d0NQUBATJkz44TwsLS0xdepUakDt5u7du7Czs8Pw4cPx7t075ObmUpOvnuAV5tdff+UbXkREBGpqapgwYQJ8fX1hZ2dH3du1axfHu4yNjYWmpiZUVVV7LMOSJUswc+ZMtLW1ITQ0FDY2NnzDdnR04MKFC6itrQUhBMOGDcO6deuQl5eHmzdvwsPDAwMGDMCiRYuwatUqeHh48EynoqICRUVFuHbtGsf1mJgYjBkzhmtS8i0FBQWIjIyEpqYmz/s1NTX48OED3wUbADx58gQNDQ34888/qTQtLCygpKTEJQlzcnLiORiEhYVh8eLFHIP+lStXMHXqVGqyzovQ0FDMmjUL+fn5AAAFBQXcuHEDCgoKKC4uRl1dHRVWT08PLBaLK407d+4gJCSEmhx2T4QvX77MIYl8/PgxbGxscOzYMa7F2LJly7By5UpMnTqVuvb7779Tf584cQJjxozB5MmTeT7Hw4cPERYWhj///BOCgoIYNmwYxMTEMG7cOAQGBuLSpUsICQnp9ezG7yGE4OvXr2hvb6fOTKyursaxY8fQ2tpKaT50dHTg5eUFGo0GeXn5HtOMiYnB0qVLe52gAV2q+IKCAq56P3ToEAYNGoRVq1ZxXDc3N+8xvTlz5lB/R0dHY8mSJVi9ejXOnTuH6urqHidpdXV1yMrKgomJCXWtrKyMWvxlZGSAwWD8a314T3z48AGBgYEc7ZMf5eXleP78OdhsNlRUVHD9+nX4+vrizZs3sLKyQllZGZKSklBTU4PPnz9DVlYWjx49Ao1G40intbUVV65c4dBatLa2IiIiAmfPnuU49/N7li5dypUWAKxdu5Ya2zs6OlBQUABtbW0EBARwhG9qakJpaSmGDRsGAJg5cyaWLVsGJSUljvLcvHkTOjo6fPujH4LXqetMJpPcvXuXEEJIYWEh0dHR4bg/cuRIUlBQ0Ovp7a6uruTPP//82cPff5ji4mIyZswY8scff5DGxkbS0dFBtm3bRhwcHEhzczPfeElJSWTkyJHE09OTeHp6EklJSaKvr088PT3Jli1bCADS2dnJFe/KlSuETqeT6upqkpaWRq5du0ZaW1tJZmYm2b59O4mKiiKEELJlyxZy5coVrvitra1k4MCBJCEhgevepk2biLi4OGEwGERERIQMGDCA0Gg0MnfuXBIUFEQGDRpEiouLCSGE6OnpEWdnZ77PFxAQQOTl5UlycjIhhJAbN24QERERjjD5+flEWFiY6Ovrk5KSEr5p/SzLly8nhw4d4nnv06dPhEajESMjI1JeXt5jOiwWi7S1tVF/d3R09Bg+Pj6efNvM4+PjiY6ODikqKuIIFx4eTkRFRXtsJz3R2NhIrK2tyYABA4i0tDSRlpYmdDqdSEhIEGlpaSIqKkoAkAcPHvBNIyMjg6iqqnJc8/Ly4tv+vmf69OnE3d2daGhoED09PeLu7k6cnJyIsLAwcXV1JXZ2dkRGRobMnDmTbxqdnZ3E3d2dyMnJkZycHMJms8nMmTNJXFxcj3Xd2NhIVq1aRcrLy0lqaipRVVUlly9fJoQQIiIiQmJiYnos+4oVKwidTifCwsJkx44dRFVVlYSFhZG0tDSipqZG5syZQ9zd3cmkSZOIsrIyVxttbW0l1dXVpL29nWf6x44dI7///jvf/HNycoi2tjZxd3cnampqxNLSkrx9+5aUlpaS1atXk9GjRxNPT0+ydu1awmQyyfv37zniNzU1UeVfsGAB0dLSIjY2NuTDhw9ERESEmJiYEA8PD2Jvb08A8PzmCwoKyKRJk6h+SElJifzyyy/E09OT7Nu3j/zyyy/k9u3bfMsvJydHgoODSVtbG2lsbCQsFou0tLSQ6upqqv0sXLiQKCsrk2vXrvF8n3Q6nfj6+hJCCMnNzSXDhg0jXl5e1H0rKyu+fU1JSQnR0dEh3t7ehBBC3NzcyIQJE0hNTQ0VZunSpeTTp0+kvr6e77voiZcvXxIfHx9SXV1NqquribOzM3FxcaF+u7q6kpcvX/KMm5WVReh0OvUeZWRkyOLFi4m7uzvHPwaDQdasWdOn8nh4eJB169b1KWxaWhq5ffs2MTc3J05OTkReXp74+PgQGo1GZs2aRXbt2kU0NDTI+vXribGxMdHX1+eZTmpqKmEwGNRvLy8vYmlpSf3+888/iYCAQJ/K9E9oa2sjioqK5MCBAyQ4OJgsW7aM7/fXzYkTJ8iiRYvIoUOHyI4dO8igQYOIpKQkiY+PJ3Pnzu3xG2Wz2aS+vp68f/+eTJ48mdTU1JDa2lrS2dlJPn/+TEaNGkUePXpEWlpaSE1NDamvrydsNpsjjejoaFJXV0caGhpIS0sLuXv3LgFAvnz5QlpaWkhtbS2pq6vj20+np6cTERERqo/n9U9ERITQaDTCZDJ/vFJ5wFOSBoBSX/wThgwZgg0bNkBSUhIGBgY8pSj/FsXFxVi/fj0sLS3h7OwMGxsb2NraYufOnfDw8MC0adOwfPlyzJo1i+cqhc1mo729nfo9fPhwtLe3o6Ojg2+esbGx2LVrF8TExECj0eDq6oqYmBhMnz4df/31F7Wa2rJlC0/RqaOjI6ZMmYKJEydy3Vu2bBmWLVsGe3t7nDhxAkJCQpg1axY2bNiA8vJyCAsLY/DgwVQ6hoaGfMupp6cHFxcXKCkpgRCCxMRELsnMkCFDMGTIEJ7xi4qKEBIS0ifbEgkJCS4Rf290r/wHDBjQq6rz48eP2L17N0JCQnD9+nU0NDTwlSACgJqaGnbv3k39PnnyJLS1tblUPfPmzYOVlRUcHR1/yqZKTEwMioqKePv2LVWPGhoauH//PoYPH47r169T0il+ZGdn83WO+/jxY0yfPr3HMvj6+kJKSgp2dna4e/cutZKeN28epkyZAjs7O4SFhfWovjt27BhevHiB58+fw9fXF2ZmZvDx8cHKlSuhp6eH1atX81Q5iomJQVlZGcePH8egQYOgo6OD3377DV+/fsXvv/+OmpoaAF2S5nfv3sHIyIgj/tevX6Gjo4NTp06hubkZQUFBYDAYSExMhLm5OaX+HDRoELy8vCAgwNl13bp1C0uXLsWtW7dgZWXVYz3xIigoCGvWrIGdnR1iY2MRGhpKqQ0BwMXFBUuXLkVCQgKCgoKgpaXFEf/o0aMwNzfHtm3bICgoiN27d0NZWRnx8fEwNjZGQEAASktLkZ6eDllZWZ6SzJaWFpSWlmLcuHGg0WhISUnBp0+fsHr1akhISCA3N5enSQOLxcKJEycwdOhQjBw5EvHx8di8eTP27t2L7Oxs+Pj44NmzZ1BXV4eDgwOCg4P51gOdToe6unqPdfW91KiblJQUfPz4EQ8ePEBFRQWCg4OhpKSEM2fOUGGGDx+OTZs24d27d4iKiupRusiLwYMHY/78+fjw4QNERUWRnJwMOp2OkydPAuiSWtLpdL4qLyMjI7i6uiIuLg62trbQ19dHWloaRxgTExOMHj36h8rVF/Ly8vD69WsUFhZi5syZOHz4MB4/fgwlJSX8+eefKCgogJKSEqytrbFgwYIe0+pNpbdo0aJ/s+hctLe3Y/369TAzM8O8efOgpKSE0tJSODk5wc3Nja90cvPmzTh48CCUlJQwduxY3L17FyEhIZg0aRJcXV2xefNmvnmWlZVh9uzZqKmpga6uLlxcXBAaGoqEhAS8fv0a7e3tSExMRGJiIk6ePImRI0ciIiKCUmMCgIWFBUaNGgUDAwOsWLECxsbGkJKSwps3byAmJoZDhw6hqqqKpw34o0ePsHLlShw4cABGRkZobW2FmZkZvn79isDAQEybNg0mJiY4duwYysrKOKTR/wSuSVp8fDxYLBY2btwINzc3sFgs1NTUcNhK9VXvXVhYCGNjY3z8+BFnzpyBiooKrl69ihEjRvwrhe8mPDwcGzZswPXr12FiYoK6ujpUVVXht99+g7i4ODw9PXHu3Dns2bMHO3fuxJQpU3D16lUOUf/UqVNhb28PoEtNO2XKFMyZMwc1NTVITEzkma+fnx8YDAZSUlJQXl6OwMBABAYGQkREBIKCgtRL4qfbTkpKgqOjI897Y8aMQVlZGQDAzMwML168ANClis1cS4EAACAASURBVL5x48YP1c/o0aOpTicxMRERERF49OgRVzg1NTUqz29RVFTEihUr+Nr7fEtPdnH8kJSUBNA1qen+mx/y8vKorKzE06dP8ejRIw61JS+GDBmCffv2AeiyF4qMjMSLFy945rNhwwasXbsW+fn5vQ5U/NiyZQulhqitrYW/vz/k5OSQm5vbp/rjB6/38j3FxcX48uULJkyYgAcPHmDgwIFYuHAh9a7nzp3LVw1TUVEBDw8PVFZW4vz581BWVkZaWhr09fWhqqqKO3fuwNzcHAEBAZgyZQrmz5+P+fPnQ1RUFPb29rh37x4aGxtBCAGNRgOLxcIvv/wCFouFtrY2FBcX4/Pnzzh69ChaW1tx4sQJrF69msp/1qxZCAsLg7m5OZqbmzFkyBBMmDABzs7OcHd3p+zx6HQ6JCUluSZpMjIyoNFo+OuvvxAaGgo6nY7CwkLMnj0bQJcRfU8biZSVlbFy5UoO26/y8nJ8/Pix13rvRltbGxYWFgAAOTk5SElJITg4GCEhIVBUVIS6ujoEBARgYmLCdxDLy8ujytzR0YHOzk6MGDECjo6OuHnzJs6ePcsVh8Fg4OjRo6DRaBgwYABGjBiB9evXY9++fViwYAEsLS2p/HpTw7HZbBQUFPC9/+nTJ773pk2bRqlrAcDDwwOHDx/mUo1297M/YuvXjbKyMrS1tXH06FHQ6XS0t7eDwWBQ3/jnz597HF+6x64RI0YgLy8P0tLSMDc3x5kzZzBv3jwoKytDTk4OBgYGfS5TYGAgJCUlMXr0aA7V8PfMmzcPs2fPRnJyMurq6hAZGYnnz59DRUWFei937tzBxIkTkZaW1qOqrLcxuC8q3H/CggULICoqiosXL8Lb2xuRkZF4+PAhPD09YWBgAC8vL8yfP5+nzbmysjKePXuGjo4OqKurY9y4cUhMTMS8efOQnZ0NoGvBEh4ejiVLllDxhISEICwsjDVr1sDJyQnt7e149eoVBg4ciBs3buDQoUPU98dgMPDq1StKAPA9jY2NGDx4MJKTkyElJQURERGYm5sjPDycr1lFTEwMdHV1YW1tDUVFRYwfPx4zZszA7NmzsWfPHri4uAAA1q9fDyaTydVH/SxcqUyePBkhISEwMTGBkpISsrOzYWFhgZiYGGr1GB0d3Se7IRaLhalTp+LAgQOIjY3Ftm3bsGrVKrx8+ZIj3JMnT1BRUdGnAm/atAkjRoxAbGwsgK4VcHR0NCIiIrikSd06ekFBQWzatAnGxsYoKyvDxIkTqQman58fMjIy0NjYCF9fX1RWVlKD69evX9Hc3IyysjLs27ePy5amOw0JCQmsWLEC48ePx8mTJ6lJXV8mLD1Jjmpra6lVQEtLC1gs1j968R8+fICNjQ0uX77M06B20qRJiIiI4Mqjs7MTNTU1fTKaFRQU/GGbsm77CQaD8f+xd+bxVKb//3/Zt+xGKcVUtpT2MqGd9tK+kWlKe5qmQsuUNimtIw2iTUSkRSUtk0QRqoksiex7ODhLnOP6/eFx7p/TOQeV+Uyfz/d+Ph4eda7tvu7tut7Xe7luIf+D1nz48AGHDx/GsGHDMHr0aBgbGyMuLg7Z2dmwsLAQ65APtEx+gYGBePr0KYYMGSKyjJWVFbhcrkh/n44yYMAA9OrVC9nZ2eBwOFBWVkavXr2QmZkppH0RhZqaGhYuXIgTJ05AR0eHWuXHxsYK+VPw2bNnD54/f45Xr15h6NChuHbtGo4ePYp169YhLy8P9fX1+OGHH8RqmOLj4/Hnn39CW1ubiubja5VHjx4NoEXL+ezZM8pJmRBCPd9nz56l2jp8+DDll9TY2AhlZWXY2dnB3Nwcubm50NXVxZkzZwRWt0DLoMlisZCeng4OhwMWiwVPT09ISEjg4sWL2LJlC9TV1duNvJw9ezalYW6NtbV1m/5oJSUlcHd3B4vFQlZWFtzd3VFUVISkpCSUlJSI9cFqTXFxMeUPVF9fD19fX2zZsgWHDx/GmjVrqElX1Co9Pz8faWlpAtGUmzdvhpqaGvbs2QOgxf8lKysLI0aMEKrP1wy/efMGR44cwYwZM3D8+HEkJCRARkamwwExJiYmiIiIwP3791FfX4+ysjKcP39eYKEq7jrKy8tTQRdubm6QlJSEjo4Onj9/DgUFBaipqaGiogIWFhbf5OCekpKCTZs2QUNDAw8ePACbzabG4tjYWAG/UHEUFBRg1qxZGDRoECQkJPDo0SPweDz8+uuvX9SX8PBwWFpaQkVFBc7Ozjh16hS2b99OCdqfQwgBk8lEQ0MDzMzMkJaWhoKCAkyYMAGamppISkqCnZ0dsrKycOzYMUyePFmojeTkZMTExFDz0d27d1FeXo6dO3dCVlYWz549+2YtDoPBEApYA1oW+d7e3hg5ciQcHR2hrKyMPn36QE9PD1JSUti5cycaGxvh5uYGNzc3LFu2DGvXroWWlhaCgoKoL7R8+PABISEhGDNmDCWIJSQkQEdHB1wuF56enhg4cCBqa2uxfv16AC0Lsa5du0JWVpYa67lcLsLCwlBaWorx48dT6U+ePIGioqLI597a2hofP35EbGwsMjMzwWQyUVxcjLCwMGRnZ4scP4CWsQ1oWTC/fPkSrq6u8PX1xfTp0zFv3jwqAOLzQIhvRWjGP3PmDMLCwqioCUVFRaiqqgpMMCUlJfDy8oKLi0uHD2RtbY3Q0FDcvXtXKE9VVbXDWobLly8L/La0tMTcuXPbHID5iIoUmTZtGmpqajBhwgRoaGigoqICISEhsLCwgIODA8rLyxEUFIS///4bmzdvhouLCzUQ8TE2NkZQUBC2b98OaWlpIZNVXV0dHj582CGn8dZwOBxqJZKZmdmm83h7lJaWYvv27YiOjsbAgQPFllNTUxO6lpWVlbh+/bqAOVgcKioqbaqsxTF//vx2t4qQl5fHokWLqEhFvpZHUVGxTYE4Ly8PS5cuhYeHh5CZrbOxtbWlru/58+cxf/58GBoaQk1NDdXV1cjOzsazZ8/g4OAgsp8TJ07E4MGDMWnSJLx58wZlZWUIDAxEeHg4CgsLqSi21jg5OWHbtm1wdnaGgoICFBQUYGJigpCQEJw8eRIeHh5tTj4qKipwc3NrV3soKyuLrVu3isybOnUqDA0NERkZCaAlYCEuLg6//PILXr9+jdWrV1PvhihTzZ07d1BZWYmwsDA0NTWhsrISixYtgqmpKVauXIkFCxbA29u7XS28uPM0NzdvU/jm3w8Gg4G7d+/Czs6Oeg9cXV3bPCafxMREXL58GTweD+np6XB0dMS6detw7do12NnZ4dq1awAgcoEkLy9PBQLxkZKSgoyMDJWuqKiI69evixTS+JiYmGDAgAHYuHEj7t+/3+ai53OePXuGO3fuQFtbGwoKCsjOzsbUqVOxfPlyODk5AQBlkmsLNpuN1NRULF68GI6Ojjh8+DCkpaXh6uqKjIwMxMfHf5OQZmxsDCcnJ0hJSaGgoABNTU3U/cvLy2szwORzrl+/DgkJCXTr1k1s5HBbvH37FpaWlti+fTusra2xcuVKODo6ityjs6CgAPb29nj16hWCg4OxefNmrFmzBpcuXaJcLGbOnIkdO3ZAS0tL7GJ32rRpMDMzowIjGAwGkpKSsHz5ckhLS2PmzJkiNUjJycl4+/Zth87r5s2byMrKgpeXFyX0Hjt2DG/evMHy5cvbnIv27t0Le3t7FBUVQUdHh7JaLF26lBLIzp49i+PHj+Ps2bMoKytD165d4evrC01NTUhLS0NXVxe3bt0SCNTj76OYnJyMixcvUufe3NyM3bt3Y9u2bdSCUZwyo7UmOSgoiHJpCggIgKSkJEpLSxEUFIS5c+eKjaavrKzE3LlzMX/+fFy5cuWLtO1fg9CZ5OTktLsthqKiIrKysr74YIaGhiJ9EL400qc136LWjYyMRHJyMrp27Upp9/ib0SYnJ2Pt2rUYNWoUqqurISMjAwMDAwET6eeatVGjRuHIkSO4du0aZGVlqfy8vDzcuXMHUVFRAloHdXV1+Pv7w87OTuRDJSkpCQ6Hg9zcXCQmJn7R4PM5gYGBmD17NiVAZGdnCz2Ev/76K96/f09t7cFHT08P27dv/+pjdwT+ti5toaOjA1lZWRw4cADPnz/HpUuXUFpa2qb/RVNTE3x9fbFq1SrK3FVZWQk1NTUhLaaHhwe0tbWFBkcOhwMHBwdERUXh2rVrAr5h79+/p7QO9+7dQ21tLerr61FQUAA5OTnMmTMHlpaWKCwsxN27d9G9e3c8fvwYysrKQkJ7TEwMXFxcoKenBx8fH9TX1yMmJgZeXl5ITEzE69evRQpp/AlPVVUVkpKS1OpRVVUVqqqqUFdXx8mTJ9G/f38sW7ZM6LwHDBjQ5nXvCFOmTEFhYSF69+6N8vJyDBs2DKamppg3bx5lBmiL+vp66OnpYc+ePWCxWIiLi0PPnj0hKyuL7du3Y8KECeBwOIiNjYWCgsIXm9X51622thZycnJCYxzfj7CmpgYyMjKIjY3F4sWLoays3KaGtjVz5syhVts5OTnUgmfp0qVYvXo1tQj5XBjLzMxEaGioUHssFgtycnJISEhAQ0MDEhISUFJSgoCAANjZ2VER9c3NzcjIyKDqTZ8+HRUVFaiursbevXsxd+5canI+c+YMLl++jNjYWKHF2rlz5xAUFCS0GXdrrWd1dTXMzc1RVlYm9jq8f/8ebDYbV69exc6dOzF06FDIysqivr4ey5YtoyLjPqexsRFHjx7FrFmzhMYCvqWFzWaDyWSCyWRCRkYGUlJSkJWVxadPn6jFfmFhIdavXw8rKyssWLCgTS0i/95KSEh81bYgrRk2bBjCw8NFbldSWVkJR0dHdOvWjTq3iIgIBAUFAWhZADU2NkJSUhKKiop4//49srKyRApDBw4cwJIlS6hnVl9fH1lZWdR1lZKSgqenJxwdHQXe7aamJjCZzA6dy8SJEzFx4kQBkzQ/6rkj9O3bV+R97t27N0aOHIk7d+5ASkoK69atQ3x8PJYsWYKgoCB4eXmhsbERMjIyQm5ClZWVKC0thZqaGnUeXbt2xeLFi6Guro6rV6+iS5cuaGhoEGmhqqysFHIV2rt3LyQlJREYGAgFBQX8/vvvePbsGSQlJZGRkSFyUdi/f39ERUVh/vz52Lhxo9CeiCwWC4WFhdDT0+uQ8qg9RIqbX2KP/x5pbGzs0M7lM2bMQEZGBtLS0gTSJSQkIC8vjx9//BEfPnyAiooK1q5dK6RGnzZtmlCbmZmZyMjIwPjx49G7d2/qJq9fv15oEPD29sbkyZPx9u1bkdotPT09WFtbw8rKCkwmU2ArEwaDQfnCPXz4EGw2W6ywm5CQgPPnzyM5ORlAy55vq1evxosXLwTKMRgMyqb/n8bNza1DZlI2m43Ro0fD3NwcLBZLrKM9n9TUVOTk5ODQoUMAWiZPNzc3HD9+XOB4NTU1CA8Px4wZM4T81err6/Hq1SvU19cLBdTwB6Py8nKEhYXhxIkTIjUN165dw/379wWcqFvz8OFDFBYWQl9fH1paWjh27Bj27duHmTNnokePHjAyMsLRo0c77BT//v17HDhwADk5Obh+/Tpu3rxJBXS09gXrLLS0tHD9+nUYGBhAWloajx8/hqKiIkxNTSElJQUTE5MOr+I/x8TEBEePHqUG/UGDBrW7x5c4bty4AWVlZYH9lVrz5s0bcDgcShP2xx9/AECbQklHCA4ORp8+fURuStytWzeRY8nFixehq6uL+fPno7KyEmlpabC0tMT69esFBL3m5mbExsYK1O3bty8OHDgAHo8HLS0tKr9///7w8PAAl8sV2U9RgS3izD/icHJywtSpUyEpKQklJSV4eHhAX18fSkpK8PT0FFuPyWRi586d8PLywp07dwTcEvibvF69epW6PwwGg5qrEhISYGhoiMePH6N3797o378/5OXlwePxRApptbW1lPN7ZyJOOPnhhx/g6+sLOTk5IWtQTU0NTpw4gbq6OlRWViInJwd3796FkZGRSCHt8uXLmDlzptg+9OzZE35+frC2thYQ0n766SeBbTv+DfiuGObm5khPT4eRkREWLlyIKVOmICwsrENtjBo1irpvvr6+AFpMjDNmzKC0Wn///TdWrlwpUM/Hx0fIZaeurg5FRUXw8/ODjIwMysrKUFlZSW2JdeTIEQAt/qne3t4CbllmZmY4fvw44uLiBJ6l0tJSREdHw93d/YvN56IQENLYbDYKCgpgZGREnUxNTQ0qKirQ3NxMqc7Dw8OFtC2i+BZH6W9BVlZWrMPg52hqasLZ2Zn6XVBQgGvXrmHEiBEwMTGBpqYmMjMzRZoNPveBa25uxpo1a+Di4oKJEydS0abLly+HmZmZUBumpqZwdnbGgQMHcPXqVaF8FRUVbNmyBc7OzpCQkMCSJUuo+8Bms+Hr6wtdXV1cvXq1TSfc7du3IysrS+Ce8TfabU3Xrl3b3A/rayCEIDIyEm/evEF4eDgWLFggUiM4ePDgDplmdHV1sXv3bgDokO/J6dOnER4eLjBQL168WEggDAgIgJycHOX/0xq+4/+QIUPa7ePnAhr/HWhLqCCEwM7ODmvXrqU0Pvn5+Th16hQyMjIgLy+PqVOnwtvbGwsWLEBoaKhQPwghiIuLg6WlJZ49e4Y5c+bAw8OD2oh2zJgxePfu3Tftpi+O5uZmLF++HP7+/iguLgaTycSmTZswdOhQ/Pnnn5g8eXKHNuckhIDH44k0Sy5ZsoQqI4r79++Dy+VSgQviuHDhgtgvghBC4OrqiuXLl2Pbtm3o168fFRns7OwMV1dXEELE+mYWFhaivr4eioqKQv3kT6qi9nBSU1PDzp07hYJ5eDwe8vLyKF82QghcXFyExh1paWmsXbtWII3JZOLhw4cYN24c/vrrLxBC4OXlBUlJyTavT+vACT6pqantBhzwcXJyQm1tLbZt2wagxc1l6tSpqKmpwa1bt9qsKy0tjT59+iAnJwe5ubkCQhr/nBMSEqCvr089D59jY2ODH3/8Efb29m0ei8VigRCCM2fOAAD17z+JuOh5bW1tSngdNmwYRowY0eZiTFFRsVP3kvxPEhUVhYyMDMyaNQsMBgOqqqr45Zdf4O3tjfr6eixcuBCBgYFf1baDg4OAG8nnlqLff/9daGy5ceMGnj59iq1bt0JZWRnnz59HQUGB0P5o2traIvd39PHxgb+/P4KDg7Fw4cKv2gy9PQSEtKamJnTp0gXp6ekICwtDRUUFOBwOFi1aBB8fH8qX4vXr121uewC0DBIZGRnfZMr8VoqKitqdHFprFa5du4a0tDSwWCz0798fixYtAgCRzputSUlJwYsXL+Dj44P58+fDyckJKioqiI6OhpubGywsLDBz5kyhTToBYOXKlVRUGn9g4/Pq1Ss4OTlRQQ8HDx5EcHAwli5dim7dusHPzw9Ai6bncxNKazw8PKgtEPh8vgUAg8GApaUlCgoKEB8f/1X+GaIoKiqCrKwsDh06hKysLMTHx0NPT0/AvJudnQ0jIyNMmDAB4eHh7UZ4fgmbN28Wirj6/KsOYWFhKC8vR1RUlNh2UlNTMWzYsC/eRoa/1UBycrKQLyPQ8s7t3r0bP/30E/bs2YPKykp4e3vjxo0biIyMpFblvXv3hoODA37//XcsX74cZ8+epVT6Fy5cQFRUFJqbm/Hy5UskJydjx44dkJOTE/gKiIODA4qLi5GYmAhDQ8Oviq4TxaZNm7Br1y6MHTsWTk5OUFRUxODBg2Fra4uCggKREYmiyMjIwJo1a/D3338LuFM8efIEdXV11HMkauPs+fPn448//sDq1avFPrsNDQ14//497ty5IyTUcDgc+Pn5oV+/ftQK3MPDA2w2Gw8ePMDWrVtx5MgR3Lx5U6z5NjU1FS4uLuDxeEhKSqLM68nJydRngEJDQ0X6xrb+VNiLFy/QvXt3jB8/Hj179qSEt45ECHM4HMTHx+PIkSMwMDBAWFgY6uvrcfLkScrU5ODgIKS5Y7FYqKyshJycHDIzM8FgMJCdnQ0Gg4GcnBxERERg+PDhuHfvnkhBDmjRBldWVlKf/EtISICfnx/69OmDpqYmHD58GCUlJRgzZgyMjIyEhEVlZWWcOnUKFy5caHcLis8pKiqCtrZ2hwPQbG1txX4PuaampsPtfCmEEKHjcrlcNDQ0gMFggMlk4uXLl5CRkUF6ejrlC8gnPT2dMlsWFRUBaJl/OBwO9XWdx48ff1Pw0z9FWloazp07hz///JOKIF6+fDmuXbuG5cuXd1irGRcX12bAXWlpqdjtoj5/d1ksFrhcLnbu3AlpaWlUVFR0eO579eoVrly5gnXr1iE/Px+TJk2ChYUFrK2tYWFh0aE2OsTnG6cxmUzCZDLb3FwtICCAvH//vs0yLBaLHD9+nJSVlXVsx7ZOpKCggIwZM6bd8/icnJwcMmrUKDJo0CCSnJzcbvnDhw8TQ0NDoqWlRdzd3UlaWppQGTabTUJDQ4mqqmqbbVVXV1P/r6qqIs7OzsTU1JTcvn2bSi8pKSFFRUWkrq6O5ObmUul1dXWkoaGhI6colsbGRhIcHEz27t1LPn78+E1tfc2xnZycyKVLlzq0aWtnU1hY2O6zUltbS8rLy8Xml5WVkaFDhwqlczgckpKSQnR0dEhwcLBQPovFImFhYaShoYG8ePGC9O/fn8yZM4faqPjztgICAsiVK1cIj8ej0ocMGUKOHDlCPn78SBgMBgkNDSVTp04lcnJyRFNTU+BPSkqKbN26ldoQWBwNDQ1EUVGR2tS6LZ48eUJYLBbJysoiXbp0Ibt37yZ79+4lc+fOJenp6VS5EydOkOnTp4ts49ChQyQqKopwuVxSWlpKrly5QjgcDiGEkPLycnLy5EmirKxMZGRkBNrk09jYSN69e0c2btzY7p+ojbh9fX3Jjh07CJvNFsoLCgqiNoJmsVgi782dO3fIlStXSHNzM+FyudSGq4QQ8vHjRxIQEECUlJRI165dSWJiYpvX083NjVhaWhIZGRmybt26NsvySUlJIV5eXqRPnz5kxIgR5Nq1a0Ln8uzZM9K3b1+ir68vVL+pqYmcO3eOBAUFEQaDQaqqqkhpaSnJysoihYWF1Dty/vx5oqioKPL4U6dOJQUFBaSqqorMnj2b/PDDDyQgIIBUVFSQ8vJycvfuXTJkyBDSrVs3YmhoSHbs2CHQBofDIefPnxfY/PZzvLy8iI2NjVD6mTNnyMCBA4mmpqbYjUjT09MFNn1tzadPn8iWLVuIoaEhkZWVJWfOnBHbh9ZISkp2eDPbnJwcYmBgQFRVValn8PLly6RHjx6ksLCQxMTEkM2bN5Pdu3eTnTt3ko0bNwq1ce7cOdKlSxfy22+/kcOHD5PDhw+TzZs3k23btpGTJ08SLy8v4ujoSCQlJcmbN2861K9vJTw8nDg4OLRb7vfffyeXL18mGRkZZMCAAWTEiBGEEEJsbGzIjBkzqHnn0qVLxNjYWKh+bm4uMTExITY2NuTRo0fk119/JWZmZqSwsJA0NDSQFStWEC8vL7Jw4UIiKSnZ5obJRUVFxMvLi7i7u5Nx48ZRm5hzOBxSW1vb7rl4e3sTU1NTcurUKWqcys3NJbNnzybq6urE3t7+qzds/hyRXxyg6RhhYWH/SLs1NTXk9evX/0jbNN8v+fn5/8qiRhQ8Ho+8fv263R3ExZGdnS2Ulp6eLrC4+BJYLBa5c+fOV9XtCA8fPvzH2ubT1tcmPic+Pp5s3bq1Q2XZbDbZvHkzCQwMJI8fP26zbF5e3jeNWx8/fhRZ/+rVqyQvL494e3uTBQsWkMDAQLFtpKSktJnfFjdu3CCurq4i806ePElWrlwpsOBtTX5+frvCV0hICFmzZg2prKxsty9FRUUkMDBQpNAujqSkJLJ06VKqj48ePSI///xzh+t3hOTkZDJ58uRObbMtfHx8yL59+9otV1JSQng8Hqmuria//PILOXXqFPH39yfbt28X+IJIREQEmTdvnlD9+vp6cvPmTYG0uLg4gd+bN28mpqamIgXc1pSVlZHFixcTAwMDsmHDhnYXrUwmk1y/fp3s2LGDjBs3jlhbW5Pnz5+LbHfXrl1k8uTJpLi4uM02O4oEIf+S4xgNDQ0NDQ3NfzX19fWQkpIS+ELHl9T93L+dv63G17hjNDc3U25O7fmH8fcB7NGjR7t9ZzKZSE9Ph4qKCvV1lbb48OEDdHV12/2CTkeghTQaGhoaGhoamu+Qzg9FoKGhoaGhoaGh+WZoIY2GhoaGhoaG5juEFtJoaGhoaGhoaL5DaCGNhoaGhoaGhuY7hBbSaGhoaGhoaGi+Q2ghjYaGhoaGhobmO4QW0mhoaGhoaGhovkNoIY2GhoaGhoaG5jtErJB248aNf+wjszQ0NDQ0NDQ0NG0jJKQxmUy4u7sjMTFR4HMNjY2NOH78OPbs2YMtW7YgOjpaqLGamhro6+tj+/btndrJkJAQuLq6Yu/evfDw8ACHw+mUdj99+gQ/Pz+MHz8e1tbWGDZsGPLy8gTK8Hg87NmzBwMGDEBZWZlA3rNnz7B8+XIUFxd3Sn++FCaTCXt7e1haWqKqqupf6cPX0tjYiPPnz2PevHn4+PHjf+y4CQkJuHDhAn755ReR+Rs2bMC5c+fabMPLywuLFi1CXV3dP9FFGhoaGhoaACKENF9fX1y9ehW///475OXlqXR/f39cvXoVCxcuxLhx4+Dq6oqsrCyBurdu3UJ+fj4KCgo6rYOPHz/GqlWrMHToUCxbtgxPnjzBnTt3OqXtR48e4bfffsPNmzdx8+ZNGBsbw9PTE01NTVQZCQkJlJWVIS0tDSkpKQL1zc3NYW1tjdmzZ3fqOXeUsrIyXL16FbW1tfj06dN//PjfQlBQEO7cuYNz585BU1PzP3bcW7duoaqqClevXhWZf/DgQYSGhsLd3V1sG2/fvkVoaChevnz5T3WThoaGhoZGUEirGbuDNgAAIABJREFUqqpCaGgoEhMThT44amxsjHHjxsHQ0BBTpkyBkpKSgDADAA4ODgAAFRUVoQOVlpaiqqqqQ3+NjY1UPV1dXZiZmcHS0hI//vgjZs+ejYaGBrEnxGAw8P79e3C5XLBYLCHtV2uYTCYUFBSgrKwMRUVFTJ48GRkZGUKaOikpKQCArKys4MWTlMSSJUtgamoKb29voevxT9OnTx9ISkpCSkoKEhISAnlNTU34+PFjh653dXX1N/WjpqYGHz58AI/HQ11dXbuaMTabjXPnzmHXrl0in5V/End3d0yePBkaGhoi81VVVeHl5QVfX1+kp6eLLMN/DkxNTf+xftLQ0NDQ0Ei3/lFXV0dN+p8zfvx4jB8/HgAQHh4OdXV19O/fX6AM31Q4ePBgofoBAQHg8XjtdkhCQgKLFy+GgYEBAMDAwABxcXEAgJycHNy5cwdHjx4VWz85ORn29vZ4+PAhdu3ahUGDBmH37t0iy44fP57SypWXl2PHjh3Ytm2bgIDa3NxMaan09PREtuPu7o5Ro0Zh5cqVVL87mw8fPoDNZqNfv34C6XzB8vNrW1xcjODgYEpwrK+vR01NDXr16gWg5V7JyMhAQkIC8vLyOHXqlED9qKgodO3aFYMGDUJ0dDSio6Ph4uICHR0dob7FxcXBxcUFUVFR2LBhA6ZPn47Vq1eLPZfr169DSkoKvXv3bve8P378iOTkZEyaNKndsp2FoaEhRo0ahcuXL+PgwYNCAnBtbS00NDREvic0NDQ0NDSdBmnFpk2byLFjx4g4YmJiiKKiIgFAnjx5IrIMABIZGSm2ja+BwWAQCwsLAoD8/PPP7Za/cOECmTp1Kvns9MRSV1dHJk+eTKZMmSIy38nJqd225syZQ+Lj4zt0vI6wceNGAoD4+fmR+/fvEwAi+2BjY0OGDBlCSktLO+W4paWlZPHixQQAMTExIbt27SIODg6kS5cuJDQ0VGy9o0ePkkWLFhFdXd12jzFv3jyya9cukXmJiYkEAFmwYAGpqqoienp6BACJiIgghBBSUlJCBg0aRF2P9v5evXoldIzU1FTSs2fPNvuYk5NDJk2aRLhcrlBeZWUlGTNmDGEyme2eKw0NDQ0NzdcioEmbOXMmzp07h+bmZkhKCgd+DhgwANevX8eNGzfg6+sLY2NjaGtrC5QZN26cSGEwNDS0Q9GiEhISmD59uoDWSlFREUePHkVSUhJCQkKQkpKCoUOHCtVNTk7GyZMnoaamhrt376JHjx7Yu3cvAGDPnj1ijxkcHIx+/frh2LFjIvOnTJkCLy+vdvveWaSkpGDkyJF4/vw5nJ2dceDAAdy/fx9z584VKjt69Gjcu3cPMjIyAuklJSWIjIzskAlWWVmZMlUrKipi7969mDhxIrZu3YoePXpg7dq1uHPnjkgT4f3793Hp0iVISUkhJCQEhoaG7V5zNpsNOTk5ofSCggK8fPkSW7ZswbFjxyAvL4+YmBgMHDiQKqOjo4OLFy92OFhj0KBBHSr3JZSWlqK6urpDmmEaGhoaGpqvRUBI09fXx8uXL8Hj8UQKaRoaGrCxsYGlpSXGjRuHu3fv4ueffxYo069fP6ipqQnVHTFiRIejMj93JJeWloa5uTnMzc3R2NiIS5cuiRTSzMzMcPLkSVy7dg2jR4+GpKQk1q9f3+axwsPDkZiY2KYQlp+f326fc3Nz2y3TUYYOHQpFRUWkpaXBzc0N69evh5eXF+bMmSNUdvXq1Xj//j3U1dUF0tXU1KCqqoqysjLKVPjkyROMHj0at2/fpgIdDAwMYGFhQdVTUVGBiooKRowYAXt7e6xZswYhISGor6+HlZWV0PGtrKwwZMgQ+Pn5YerUqVBQUGj3mo8fPx5Pnz4VSu/VqxfWrFmDsWPHYsqUKfDx8UFycjKampowceJEqpyZmRnMzMzaPMa38ubNG7F5ampqtLnzfwBCCAoLCykXABoaGprvDQEhTVlZGZKSkkhJSYG5ublAQQcHB9ja2mL27NlQVFSEvLy8SKGrrq5OICqUz48//vhVHTx16hTy8/Nx/PhxAC0C3OdRpXxkZWVRXFyMffv24dGjRzhy5Aj27t0rVgDLycnBqVOncO7cOSoQIjw8HLa2tlBQUKDKGRsbY9OmTWL7mJ+fDykpKZHnyGAwUF1djW7dugm02R4RERHo1asXVq5cCS6Xi/DwcDg7OwuVk5aWhrS0tJBQraioiEWLFgmkmZiYAICQX9vnxMTEQE1NDevWrUNzczOSkpKwc+dOkdovBQUFpKamIjg4GFFRUdi2bRvOnj3b5jYsvXr1QmpqKt69ewdDQ0OBvKKiIqSnp+PWrVuQk5PDjRs3MGHCBIHtYP4TBAUFYebMmSIFMUVFxTbvJYPBAJfL/Y9GrdJ8ORISErSARkND810jMLNraGjA3d0dtra2KCkpEShYX1+PBw8egMvlIi0tDXl5eejTp49Qgx4eHjA2Nu60DjY1NeHKlSvUPmDXr18XeVw++vr6uHjxIoyNjXHkyBGsXLlSbNlbt25BUVERL1++RGhoKHbv3o3ExERISwvIrhg6dKhIUyMAVFRUYN68ebCysoKWlpZAXlVVFRwcHODt7Y2dO3d29JQBAPfu3YOtrS00NTXR3NyMhoYGDB8+XKgcl8vFunXrvqjt9oiKioKWlhZ+/PFHsNlsREdHQ0pKSuw2IwYGBvD19UXPnj1x7NgxsdeKD/96hYSECOXdunULvXv3hqmpKTgcDt6+fYvff/+9U86rowQGBiImJgaWlpYi81VUVHDw4EGRQuubN28wa9YszJw5E7Gxsf90V2loaGho/pcR5aj2/PlzMmfOHMJgMKi0uro6MnLkSKKlpUW0tbWJv7+/UL1Pnz6RLVu2kMuXL3eq49yMGTOItrY20dTUJEuWLCH19fWd0u6KFStI9+7dBf4OHjwoUKa5uZmkpKSQrVu3EjabLZDH4/HI6dOnyZw5c0S2Hx8fT3bs2EF4PB6xsbHpcL/S09OJmZkZef36NSGEkMOHDxNlZWXSrVs3obIRERHkwoULpLGxscPtt8fkyZPJmzdvCCGENDQ0EHNzczJz5kySmZnZacf4+PEjmTBhAomKihJwzh8+fDhxc3MjhBBSVlZG1NTUiKamJrl7926nHLe+vp5s2LCBdO/endjZ2Qnd04KCAjJmzBiSkpIito2CggISHh5OeDyeUJ6bmxu5d+8eSUhIIJs3b+6UPtPQ0NDQ/N9EghBCRAlvL168gIGBgZCvU1FREeTl5YW0RgCQmJgIc3NzLFmyBEFBQZ0qTNbW1oLBYIjdBuOfgsViwd7eHhEREbh9+zamTZtG5aWnp+Px48dwdHQU2kMNaLlWGzduhL6+PhgMRrs72bc+ZmVlJXWuzc3NiI+Px/Dhw4VMyQoKCuBwOHj16tU/4iT/T1JRUYGgoCAsWLAAPXr0AACBoBAej4e3b99CRUUF+vr6nXLMhIQEKpgiMTERtra26Nu3L5Xv4+ODQYMGCZn7W2NpaYn4+HgkJSVh2LBhAnkXLlxAdHQ05OTkICEhgfPnz3dKv2loaGho/u8hVkj7Gng8HoqKiiAtLU1Nuv/tEELw9u1bFBQUwMbGRsAUyuVyISkpKTLIgg+bzUZTUxPk5eVFCnLfyr1798BgMDBv3rz/Skd2/uP3+V5k/xZNTU1CkbKfU1VVhfDwcDg4OAj5pjU1NeHChQvQ0NDAtGnTRPpn0tDQ0NDQdIROFdJoaGhoaGhoaGg6B/EqIBoaGhoaGhoamn8NWkijoaGhoaGhofkOoYU0GhoaGhoaGprvEFpIo6GhoaGhoaH5DqGFNBoaGhoaGhqa7xBaSKOhoaGhoaGh+Q6hhTQaGhoaGhoamu8QWkijoaGhoaGhofkOoYU0GhoaGhoaGprvkO9WSAsMDMTRo0eRnZ2NvLy8f7UvGRkZyM7O7tQ2s7Oz8enTp05ts6amBqWlpW2WIYQgIyOj3bZqa2tRUlJC/f7w4QOePn0KNpvdZr179+4hNze3Yx0Ww4sXL76pPgAwGAz89ddfKCoq+ua2vicyMjKQlJSE5uZmKu3GjRt48uTJv9grGhoaGpp/Aun2i/w71NbWIjQ0FMOGDcPUqVOxa9cuuLi4/Cvfp/Tx8cHp06fB4/HElqmoqICzszO0tbURHByMqqoq7NixQ2TZ2NhYPH78GGvXrsXp06ep9Ly8POTn52PMmDEAgH379mH69OkYMmQIVWbfvn1YvHgxDAwMhNrNyMiAlZUVxo4dCwAYNWqU0HcoY2Ji8OTJE1y6dAlLly4Vez4lJSWYOHEiwsLCYGFhASsrK6ipqSEyMhI//vij2HoPHjzA69ev4erqKrZMe/z000/Yu3cvdu3a9dVtvH//HkuXLoWHhwccHBy+qo2cnBxcuXIFVlZWSElJQUNDAwBg9+7diI2NRWNjIyZOnIjXr18jMTERq1ev/ur+doS0tDQMHDgQEydORGRkJO7du4eZM2fi7t27+OGHH6jn5msJCAjA4MGDBZ63/6s8ffoUNTU1mDlz5r/dFRoamv/DfLdCmoSEBDQ0NDB27Fj4+flh7dq1sLS0RH19PWxsbNr9CHZbFBcXY9q0aTAwMICPjw80NTWFyqSlpcHAwABycnIAgIULF1J59fX14HK5UFdXp9IUFBSwbNkysNlssZNlU1MTTp48CR0dHdy6dQt6enoC+Xl5eZg2bRoiIyMxfvx4DB8+HPv27cONGzeoMu/evYO9vT0SEhKE2ieEQF9fH35+fmhubsa7d+/g4eGB6dOnY9q0aVBRUcH8+fMxfPhwNDY2CtT18vJCdHQ09u/fD11dXbBYLAwaNAhTpkyBm5sbqqqqcPDgQXz48EFISLt9+zbS09OxatUqqh8BAQFCx8jKygIAHDx4EEpKSiKvEQAcOHAAp0+fFhLSKisrAQA//PADlfbXX3/B0dERgYGBkJWVRc+ePdG1a1cQQtDc3PzVAhoA9OnTB/v378fy5csxY8YMZGdnY8eOHdi9ezceP34MHx8fzJ49G3FxcaipqcGYMWNgbGwssq3IyEicPXuW0oANHDgQTk5O6Nq1K1Xm3bt32LdvH1RVVeHt7S1Q/9OnTwgJCUG3bt1QU1ODyZMnQ01NDfn5+QgODoa5uTlsbW2hrKyMzMxMnD9/Hv3796fqnz17Fn5+fgJtvnr1CgYGBujSpQuV1qNHD5w+fRq6urrtXp/169cL9RNoWSwcOHAAQ4YMwZYtW4Ty//jjD5iammLChAki233//j0ePXqEX375ReA9r62txZUrVwTKTp06Veg9Esft27dRWlqKkpISpKamYsCAASgvL0dBQQH09fWhpqYGJpOJ3NxclJWVwcDAAKNGjYKWllab7ebn5yMqKgpr1qwRSOfxeAgPD0diYiI2btzY5uLma3jy5AnS09MhJSWFqVOnCt0zBoOBkJAQaGlpYerUqVBQUBBqIzIyEpMmTYKsrKzIYyQkJEBJSQkDBgwQmc/lcvH69WsMGjQI0tLfz3TC4/Hw6tUr/P333xg7diz69OkjVKaiogK3b9/GyJEjYWpq2ul9ePXqFbKysjBu3DiB9/xbefDgAV6+fImysjJkZ2dj3LhxUFRUFCpXV1eH8PBwqKqqIiAgQOA9efv2LdasWQMzMzNoa2sDaBl/GAwGhg8fDgBgMpnw9/fH0qVL4eXlBQBoaGjA3bt38fHjx3b7mZeXh9OnT+PYsWMC78a9e/fw4cOHDp3r3bt3MX/+fCxZskTg+aqrq4Ouri4cHByovgHAypUroaioiCNHjkBeXl6oPSaTiWfPnsHa2hpAy7i6d+9eNDQ0YO/evbh37x5WrlyJK1eutLtAU1JSQlJSEvr169ehc/la/vW3KicnB2vXrhUwrQFAdXU1JCQksHz5cnC5XGhoaGDu3LngcDg4e/YsFi1a9NXHzMrKQmZmJggh4HA4IsvY2NggNDQUVlZWAEBprkJCQhAcHCxkAlVWVsb48ePbPC6DwYCXlxcMDAwwbdo0seUsLCwAAIaGhnjx4gWSk5MxbNgwKt/Z2Vls3cGDB1MDkoGBAS5evAhzc3Nqwk5ISICxsTFmzJghUM/a2hrbtm2Drq4uLCwskJubCxMTE1RUVMDHxwfLli2Dl5cXpKWlhQTEvLw83LlzB5s2baLSRo0aJWCSA1oGrZKSEkhISABouQ+PHj0SOofy8nKUlJTgzJkzAulBQUGQl5dHaGgoNXGOHz8e06dPR3x8PF6/fo0pU6agrq4OBQUFYLPZVBt+fn7Yt2/fV2lGpk2bhmnTpuHNmzdQVlam0ufNmwcvLy/4+PjA29sbffv2FdvG06dP4ebmRgn9ampqQouDT58+ITY2FjIyMqioqKAGT6DlWsXFxSE+Ph6HDx+GvLw85syZg0WLFuHly5eIiYnBb7/9hqdPn0JXVxcqKioCbS9ZsgS2trYCab1798aRI0dgbm5OpUlLSwssPsTx+PFjBAcHixTSOBwOnjx5gszMTJFC2sKFC2Fvbw8ejwcbGxuBvJycHMyaNQsXLlwQmvRfvHiBixcvYujQoQAAPT09aGhotNtXPuPGjQMAsFgsKs3X1xd1dXXYs2cP5OTkKE09i8WCtLQ0VFVV2233zJkzOHr0qJCQJikpiaSkJJw4cQKjR4/uVCHt2rVrOHjwIE6cOIGsrCxs3LgRgYGBAgK3goICNmzYgEGDBsHKykqkkBYTEwMGgwE7OzuhvL///hv79u1DYGCg2H6wWCz4+fnh5MmT35WQ5u3tjfv37+PRo0e4ePGiSCHt9u3bWLVqFRwcHBAQENBpx2axWFi7di10dXVx7NgxPH78uFOFtP79+6N79+5tlklOTsbp06dx5swZ6OjooFu3bkJlCgsLERQUBAUFBRBCcPr0aXz48AHr1q0D0LIoevjwoYCALicnh6FDhwrNm0eOHAGDwcDBgweptNGjR2PZsmVC75CpqSl69uwpkObv74+YmBi4ubkJjKOjR4+GiooKJCUFPbPevHmDpqYmoef26tWr2Lt3LzXOfo6cnByCgoKQkpICV1dXyMnJYezYsZg1axaGDRuGM2fOYNOmTVBTUxNZ/8SJE+jXrx8mTZoEAwMDFBcXIyYmRqhcSEgItm7d2ima+H/9rerTpw/u37+PpqYmcDgcahJcv349oqOj4erqCiMjI7DZbFRUVHR41dwWo0aNgqysLLp06SL2ZqqoqKB79+7Iy8tDXV0d/vjjD5SVlUFSUhI1NTWU8PY5L1++hJOTEyWp379/H42Njbhz5w60tbUxcODAdvvH75Oqqir09fWRkJAgIKSJ6zPQ8nLGxMRATU0NampqSEpKolZTbDYbPj4+kJGREXrojY2N4e/vj+LiYtja2oLBYEBbWxulpaVYsGABjh49iuDgYJEaPACQlZUV6JeJiYlQGS0tLWhpaVGrPmlpaURHR2POnDlUmczMTJw6dQqmpqb48OGDgDaIr6mrra2FpqYm4uPjISMjg61bt+LRo0coKSlBbW0tlJSU8ObNG7BYLJSWlqJv377Q0dH54meH73+3c+dOHD9+HAwGAxUVFVQ+f9KTl5eHpKRku5OUiYmJyImST0NDA9hsNlRUVAQEtLq6OuzatQunT5+Gvr4+jI2NceHCBQwcOBDTp0+HoaEhDA0NceLECcjJyQloGvkoKSkJaS8lJCSgpqYmsnx73Lx5E01NTSLz6uvr2/Rd7Nq1K4KDg7Fu3TpoampSQldWVhZcXV0RGhoqcN/5fPr0CdOnT/9qM7iSkhI8PDxgbm4OTU1NcLlcREZGYufOncjPz4eSkhLKy8uRkpICCQkJ/Pbbb+22mZqaiqioKJF5fG3uP8HNmzfRo0cPjBkzBiNHjsQff/yB6upqASGtLfcMPrt27cKqVatACMHChQspjVp6ejp2796NY8eOibQ0AC1aCRcXFxQWFnbOSXUiTk5OcHJyQo8ePcSW0dDQ6NA1+lIUFRVx8eJFAC3jWWejo6MDHR0dPHnyhBrTuFwuysvLMWDAAKioqODjx4+Ql5eHkZGRSAGNT69evaj/a2hogMFgUOOBrKwsFBUVBQQhGRkZkQKvnJwcbGxsOqSR7Nq1KyQkJKCqqgplZWU0NTWhqKgIhw8fphZtPB4PFRUVUFBQEBKY/Pz8EBERgaamJpSUlGD9+vXYtWsX0tLSwOFwoKqqiidPniA2NhYSEhL4/fffqbrS0tJwdXXF8OHDoampieDgYACAubk51q5dCyMjI/z11184duwYAgIChITAqKgoFBcXw8bGBtLS0pCVlRVpFXr58iXlHvOt/OtCGp9Hjx4hKCiIWrWZmJjg2rVrqK+vR1NTE44fP44rV67g/PnzlDpWHDdv3oSVlRU0NDQQFhYGAJg/fz6Vz38xNTU1RV7gd+/eoaSkBBs2bICmpibev3+P+fPnw83NDTo6Oli+fDksLS3FHr+xsZE6XnFxMd69eydSHd0eampq8PT0hJGREZWWn5/fZh0dHR1UVVVBQkICsrKy0NHRAZPJBIPBQENDA6ZNm4Z3796JrKuoqAgXFxfU1NRg+vTpmDdvHvLy8lBeXg4PDw8EBgaKNVF1lIyMDLDZbCgoKKBPnz64efOmUJlz584hICAAI0eOFNsOIYRasa5atQovX76Ei4sLJk+eDKBFi/jixQvs378fAL7K7FlcXIzm5mYcPHgQM2bMQGZmJiZNmvTF7fCJiIiArKwsevfuTQkmrVFVVRWYZPlwuVwcOHCAWqlWVVVRJtGPHz/Cx8cH9fX1kJSUxNq1a3Hjxo12tWGFhYXgcrmoqqoSSHdzc8Pw4cPb1PSGhYWhf//+0NfXF5mvr6/fruCnpaWFQ4cOYfXq1di0aRP69esHFxcXuLi4iBTQOot79+7hwYMH2LdvH2bPno0RI0agS5cuWLFiBVavXg1tbW08ffoUN2/e7JCQdv78edjZ2WH79u0i88UJac3NzfDz8xOpSRbFsmXLBLTff/zxB2pqagC0CNtdu3YVcgHpiACirq6Os2fP4uDBg+BwOHB0dMSzZ8+wf/9+eHp6ilxs8QkNDUW/fv0EtMv/TfA1y6I0nLm5uUhJSelQO+rq6rCysmpz8fxPMG7cONja2mLgwIHIz89HUFAQ/P39YW9v32ETXOt5MTs7G0wmk7JqNTU1dVjI5HK5uHfvHqWFa4vq6mqsWrUKjY2NUFdXB5fLxYMHD8Bms3H27FmqvcLCQnTp0kVIU7V7924sXLgQK1euxIcPHxAaGor169fjzJkz2LNnDwwMDFBeXo4HDx5AUlJSQEgDWhQSW7duhYWFBRwdHal0Gxsb7NmzB3p6erCxsRGpXTYxMUH37t0pa5CxsbFI9yZPT882ZYQv4bsR0vj+V1ZWVnj69CmAFrPXtWvX8OrVKxw9ehTOzs5tTj4VFRWwtbXF8+fP4e7ujmfPnkFGRgbXr18HIYQqp6SkhC5dukBNTU1As9HQ0IBt27bhxo0b6NWrF3x8fKCnp0epP3V0dKiyn5uTWtO9e3fqJenXrx9KS0tFTr7iSE9PR79+/SAtLU2ZPvlkZma2OQH26NED8+bNo37z7fb8B4nL5eLXX38Fi8WiTEU6Ojrg8XioqqrC9evXYW1tjY8fP2LmzJno1q0b5Yvl4OAAQgiampra9Ank8Xg4dOiQkE/aX3/9hfHjx7epTWKxWGhsbERgYCDu3bsHHo8HT09PbN++Hbt376bKSUhIwMbGBhMnTkR6ejqSk5Ph7++P6upqyMrKgsvlQkJCArW1tZCWlqbaXLJkSYc1R3379oWkpCQuX76MxMREVFZWCpjKvgQFBQWEh4fD0tISbm5usLCwgI+Pj4BGs1+/ftDX1weTyRSoq6ysjN69eyMzMxNcLhcDBw6Em5sb7OzsMGDAAGhra2PEiBHYunUrmEwmmEwmOBwO5OXlUV1djaVLl+L169cCbXK5XHA4HCxfvlxoYPX19RUbJfz27VusWLECdXV1OHnypMgyurq6UFdXbzcAoU+fPnj48CGMjIzw7t07pKamtiugHT58GN7e3mhqaoK7uztWrFjxRcFEdnZ2aGpqgoWFBfr374+NGzdi/PjxMDMzQ8+ePTFjxgwkJSV1aDHi4+MDDocjts+SkpKYMWMG/vzzT0yfPl0ob82aNUIm0o6ipqYGJSUllJWVYfbs2TAxMREy/Xbp0gVdunSBrq5um+OPmpoa3Nzc8PPPPyMzMxOpqam4fPmygDb3c6qqqvD69Wt4eHjA09Pzi/vf2NiIc+fOYfTo0dRYyWQyER0djbFjx1LnUlhYiKSkJEyfPl2s39zX8urVKwAQqf3p3bs3rl+/3qF2Pn369I9o5NqD/wzZ2NggOzsbcXFxsLe3B4B2/Sj58JUYhBBs3rwZhBCcOnUKQMt82tZCuTVKSkoIDg6GgoICNm7cCBcXF6irqwtZbACgW7duqKqqwqpVq7By5UrIyMjA19cXv/zyCxYvXoyffvqJ0oSK0uIymUzMmzcPVlZWePPmDU6cOAEOhwMmk4mdO3dS5SIiIvDzzz9TvxsbG9HY2IimpiZs3rwZKioqGDduHKSlpTFp0iQ8fvyYys/JyenQeYujsrIStbW1AprKr+W7EdI0NTUxYcIEAcfgvn374saNG+jbty/i4uLaVaVKSkrCw8MDY8aMQWRkJK5cuYLIyEgkJSUJlXVyckJ6erpAWmVlJVavXg1XV1ds2rSpU0yrXwNfiGhsbERxcTG10isqKoK6unqbgmp6ejoeP35M/a6srERUVBS1oufxeCgtLRUwR5WWlqKmpoYyDVy+fBl1dXXw9vYGg8FAXl4e9u/fDy6Xi7S0NKxdu1bIv4lPRUUF+vTpAzMzMyEtwl9//dXuuV+4cAHdu3fH9OnToaioiNraWkhKSqK2tlZkeV9fXwQFBeHdu3c4fPgwSkpKoKenh+joaMjJyWH79u3o1q0bmpqa8OzZMyhU8mDvAAAgAElEQVQqKgqsnjpCr1690L9/f8TFxX211uDXX3+FmpoaJCQkKP+wt2/fCvh78IWr1gML0OLczR845eXlkZOTg9zcXLx//x6lpaVQV1dHUFAQpk6diqKiIly9ehVr1qzBxo0boaGhIdIcV1lZCX19fQQFBbWpNWtNU1MTAgICEBkZ2WY5NpuNpqamDpn28/LyICcnByMjIxQUFLQppBkZGSEqKgqWlpYoLi6Gvb09zMzMBHzq2uPBgwdU9HNbW/u012ZlZSVevHiBAwcOCAnAoqitrRWaOPPz8zu8XU2fPn2EBvyqqips3bqVWpyKElZ/++03lJSUtKvJV1JSwvDhw+Hi4gJHR8d2ff0iIiIwePDgDvVdFKGhoVi7di10dHQozc2KFSsQGhqKhQsXIiQkBEDLfSgpKcGFCxe+KQhIFO31X5Q/5f8qEhIS0NfXF3Dol5OTa9Nc3Jq3b99i3bp1GD16NP744w8MHDgQJ0+eFFAYiIMQgtzcXDx+/BipqalYsWJFm+V5PJ7QfLB9+3ZMmDAB+/btw4YNG6jn9++//6ZMqM+fP0dMTAxu3LgBQ0NDhIaGomvXrujRowd+++033L59GwcPHgSbzW53Kys+N27cQHFxsVC6kpKSyMCFr+G7EdKAFv+In376CQ4ODujfvz969+6NIUOGIDg4uEMOvFpaWtSAtHnzZujp6eHhw4dCq1ig5YZ93mZ7jr3h4eEYO3YsUlNT25zYsrOzcfjwYQBAfHx8u/3+HL6Qtn37dsjJycHd3R1Aixm3d+/eIn0C+GRkZCA2Npb6XVlZiejoaEp7Jc78oq6uTqlwBw4ciFu3buHMmTO4evUqRo0ahQ0bNuDTp0+YO3euUJBHa+7evYvVq1eLVPV+rhUUhb+/P7p160aZLfPz8yEpKYlRo0aJrXPv3j3s2LGD8gMEgODgYEybNg0nTpwQKCtqIvP09MS8efPE3v/Ro0fD09MTp06dwqFDh0SWqaysxN9//y1WMGktWOvo6MDU1FRISFNUVBRpMpk2bRrl9C4hIQEpKSlIS0tj69atAP6/Bnnw4MFwcXHBli1b2tUu/fDDD5CSkmpTI/w5+fn5yMrKwujRo1FaWgoWi0VFSbZGSUmpQ6Yff39/bNmyBTExMTAwMICtrS1UVFTEmgn4vndAi8bYyckJvr6+XySklZeXC5zP1xIQEIDFixeje/fubQpp+fn54PF4QgIaX0MsLy+PBw8eYM6cOWCz2QgLC0NJSQkcHBwQFhaG8ePHIzs7G2fOnBES0nR0dHDhwgXU1tbC0tISS5cuFYrwjI+P71DAQkREBKKjo1FVVYWdO3fi5s2bmDt3rsiyr169gq+vL27fvt1uu+LgT/6tg6BmzZqF0NBQzJo1i0qbMmUKYmJiOhRt/DWsWbNGrM9dR4NSBg8eLBDM9N8Ef54CWp6V6upqKo3D4XzRPpN9+/aFra0tJk2ahF9//RV2dnbtCml815v8/HzExsZ2yIeTzWZj8eLFkJWVBY/HQ0NDA96+fQs5OTkoKSlBQkKCeq5at2dhYYGRI0dCWVkZt27dAtASgDNu3Dh4enri+fPnCAoKgp6eHqKiouDs7NyusGZtbS2kNElMTERERMT/lpBWU1OD2NhYhISEQFpaGp6enggPDwcAHDp0CHFxcXBwcMDFixfbfVnv378PU1NTTJw4EUBLFIgodfxPP/30xRudcjgcjBw5Empqaujfvz9SU1PRtWtXIbNAly5dqGjQxMTEDq9G+JSXl2PFihXQ0tKiTEoFBQU4ePAgevbsidzcXLGRhHPnzsWePXuo32/fvsX69esFzJ379u1r8/gjR46Ev78/ioqKcOnSJfj7+6OsrAxVVVWoq6ujJko+/M1n8/Pz0dzc3Ob2GhUVFWLNpR8/fgSDwcDs2bOptJycHKHtTvhkZmbC3d0dSUlJcHNzo16KBQsWoGfPnti/fz+Cg4NhZGQkVkCMjIyEs7MzIiIicPfuXbFaygsXLmDFihVwdHTEkiVLqPSCggK8efMGzc3N4HK5IusymUy4u7tjz549lMmmvLxcSECSkJAQubqXk5NDWloaNSmWlZWhoqICZmZm1HUrKipCeno6fvnlF6SlpSE4OLjTfbs0NDTQu3dv2Nvbg8VioaKiAq6urlixYoVA8AfQvpbiwYMHCAgIQHx8PNXPc+fOwdnZGc3NzRg9erRQncTERCgpKVHlWSyWkIYoNzcXEyZMwKBBg3D+/Hkhp2NR7X4NRkZGuHjxIi5evEhFitvZ2cHT01PALUJPT0+kwCwlJSWwRyIfDw8P6v8+Pj4ij83hcPDw4UOMGjUKGhoa0NTUxIwZM3D8+HEcP35coKyFhUWbiyqgxRHby8sLgYGB0NTUxMGDB7F+/XrU1NRg2bJlQmbG6upqqKqqws/PDywWC0eOHAGTyYS1tbXAQqm0tBT79++HsrKygDAAtERlt3ZBAYDFixdj8eLFAmn+/v5i+x0XF4cTJ05g5cqVmDJlSpvnKA6+A7soqqurv6rN/xSEEFy+fBnPnz9HaWlph7U/reHPU4QQxMbGoqqqikpjMBhf5d6hoKCAQ4cO4ddffxWZX1NTQ7XbpUsXSEpKYt68eTAyMhIbmNYaeXl5BAYGUtsf8Rd3AODo6Ijo6Gg4OTkBEByHpKWlIS0tLeBus2zZMmhpaWHXrl3gcrnQ1dWFgYEBMjIykJiY2G5flJSUhOaMyZMnUwvozuBfF9Jev36NDRs2oKKiAqdPnxYKyQdazG8zZ86EjY0NVq9eDUdHR5Hq+/z8fCQkJMDBwQHq6uo4d+4cVFVVUVxcLLT5q729vdAg0Zra2lrU1dUJTKR2dnYwNzeHtLQ09PX1sXfvXowbN05ASNPS0oK9vT01aVlbW3/xlwX+X3t3Hg/l+v8P/EXZicZWhBantIj245yi5bQnWp20aj2ttHw7lbbTdor2FFGcUuq0CJEKJZ8iEVmSyhIqS8LY17l/f3SaX3NmhrGEOu/n4+HxMPd93dd1zTzGeM+1vO/p06djxYoVMDU1hby8PKqrq2FlZQUVFRUsX74cM2fOhLu7O9/0r5+fn9DF3PVhZ2cHd3d3uLu7o3Pnzjhz5gzS09Px22+/oX379twA+LNp06YhKSkJHh4ekJWVrXXRKpvNRk1NjcAgzcnJCRkZGQLX6QgaSdPU1MTw4cN57lBw7do1JCcn4+bNm1BTU4OGhgaWL1+OiRMnChwF+7wV/PHjxygoKBAYpAUEBCAkJAQJCQlYsmQJz/smMTER58+fh5qamtAcaWJiYnjx4gWePn0KIyMjeHt7IyUlhRtkfWn8+PECj3fp0gULFy4EAJw/fx7Ozs7c0eJ3797B39+f5x+hsNGBxmCxWNycRJWVlTAwMMDevXthaGjIV3bSpElCA7VTp07hyZMnuHjxIrp27co9rq2tDXt7eyxcuBDr1q3j+8d79uxZ7tTz58f/fq8UFBSgvLwcT58+xdu3b/mCtPqsDa3NlClTuF8mrl+/jpkzZ+LChQt85QYOHFjn9E19paamYtWqVdi3bx8sLS3B4XCQnp4ucHruc/oNYVxcXLhTQJ9H6JWVleHi4sL9kvPv6fdRo0Zxv6iVlpbi48ePWLRoEV9ahefPn8PR0REA+IK0puDp6QlPT08EBgaCzWY3qI7PO7NbQkZGBgICAhqcp01MTAxjx46FsbExcnJy6rU5LTU1FQoKCjxfrjIyMqCrq8s9xmazG5yahMViCR2JTE9PR35+Prp37w4NDQ1wOBwEBgYiLi4OISEhdU4zt23bljtq2a5dO56ga9euXfD19RX57/zo0aOYMGEC9u3bh1u3bsHExAT9+/eHr6+vwM+1hIQE6Ojo4NmzZ1BWVha6vrqgoKDJdne2+G2hOBwO2rZtixs3bmDMmDEoKipCZmYmCgsLuWV0dHTg7OwMcXFxHD58GAcPHhRYF8Mw0NXVxe+//w7g06hRUVERX0RcUVEBe3t7uLm5CV3rlJaWhuDgYERFRSEnJwempqaIiopCYWEh8vLyEBUVheTkZPj5+fEMqWpra2PVqlXcxwoKClBSUsLLly8RHByMwMBAoa9FcHAwxMXFMW/ePMyaNQtVVVXw9fXlBkX37t3DlClTICcnx3c3g9LSUgQHBwvNy1JdXY3MzExkZWXxnYuLi8OKFSvQvn172NvbQ0lJCeHh4Txv0rFjx8Lf31/gjiczMzOYmZnh5s2bsLOzg4uLCwYMGMD34+bmho4dOwoM0DIzM+Hm5oZLly6BxWKhqKgIhYWFiIyMhJSUlMA/BgUFBZ4kwzExMXBycoK3tzfExMSQmZmJnj17Ql1dHSdPnsTjx4/5AnNDQ0N8+PABkyZN4puuuHbtGqqrq/H333/j/fv3iImJwc8//8yzSHjMmDFwc3NDQkKC0BHEz7tmra2tsXr1avz555+4ceMG36hwcXEx2Gw2d9fel1gsFrS0tKClpYX58+dDR0cHvr6+3GOysrLc3z8/FqSkpKTB37q/5OjoiMrKStjb2/Ot7SwqKgKbzRb65eTFixfYsGEDT4D2mZaWFm7evInq6mq+kck5c+bAw8MDd+7cwc6dO6GsrMz3pa5///6YOXMmlJSUBE433Lp1i/s7wzB4/vw5z3mGYVBZWSnw70SQkpIS+Pj4oEOHDgLX/pWUlGDx4sVC8zE2RM+ePTF48GD4+/sjKiqKu9FD0F1I9PT0oKWlJXQa6dq1azh8+DDfEgoFBQXY2tpy1wn92+f3WXZ2Nvz9/fH27Vu+jUIjR47EggUL6jWlXh9mZmYwMDAQOEpeWFiI58+fo6qqCsHBwUKTr/7f//2fwNetsd6/f4+oqChER0fj1atXePPmDV/KmgULFuDjx4+YPXt2g26l5+joCBMTE2hpaWHAgAE8o6h1BQjv379vslHl+jIwMICmpiY3OG7Tpg3Mzc2xdetWkfKKcTgc7mdYbm4uz+exqqoqrKys0KZNG4GfowC4G7MyMzNhYWEBY2NjrF27FsrKynj58iX09PTg6emJxYsX812roaEBdXV1LF++HL169eKuX/v3z8ePH1FUVNSQl4dPi4+k9e/fn2eLbWRkJOzs7BAfH88zIjNkyBAEBQUhPz9f6Jqszp07c+eagU95tQRl4n737h1cXFygq6uLhQsXCkxcN2HCBLi6uiIxMRHq6uoYPHgw3z/43r17842sCFJTU4NXr17BxsYGxcXFQt+IZmZmGDRoEIYNG4YzZ86guLgYFRUV2LRpE3766Sfuh93ChQt58nWx2Wxs2LABAwYMEJoZPC8vD7t370ZYWBi6devG801j3LhxsLS0hI+PD0JCQuDq6opbt25BWVkZlZWVePXqFVasWMENriQlJbF06VLuSMmZM2fg5eWFuXPncm819WWg+tmWLVuQkJCAyspKnqArMDAQGzduhImJCcaOHYvCwkKcOXMGQUFBiImJ4ZtK+9KXd2MYPXo0Pnz4AFNTUxgZGUFdXR3FxcUwMTHBmzdvsG/fPly9epVvvdTnHWr/3hQgLS2NyZMnY/PmzejXrx8kJCTg7OzMHUX97N+JgQUZMmQInjx5gujoaBw4cEBgEPX06VMsXboUKioqiIiIEJpQsVOnTvDy8oKYmBjWr1+Pd+/eiTx1X1pair179yI0NFSk8sKYmppyP+T/nVgzPDwcS5cuhaGhIXx8fPimk77MEC6ItLS0wNfU2NgYgYGBCA0NxcCBA2FtbS1wqkpWVhbOzs5ClwR8viXbl/+gBwwYgA4dOiA8PBw+Pj4iJ2aVkpLCli1bYGNjw7druKysDGvWrMH169dx79497rrCpuDo6MhN4CwnJ4e///6bb+QiPj4e48aNQ7du3XDjxg2BIxunT58WmkdLUVGRm+9LmKSkJOzevRtpaWno1q0bz3tWTEwMffv25Rt5byr9+/dH9+7dBaZKKSoqQkJCAvbv34/4+Hi8fPmSbzT+3r172LBhAywsLLhf7JtKVlYWnj17hq1bt6Kmpgbnzp3Dxo0beb6gcjgcrFixAvHx8cjJyRH4paU2gjZAxcXFITU1tc57+Z48eVLo6GZJSQkyMjLAZrNFmvItKipq0LTo5cuX8fz5c1RXV8Pb2xslJSV48uQJFBQUkJ2djaCgIMycOZPvutLSUpw+fZqbUP7LNEJf/v9/+PAhX07F48ePw9nZGUVFRdi5cyf279+Prl27cv/ee/TogYCAAKSnpwt83547dw73799HREQEjh49igsXLggMiNXU1ERaRy8SphXy8vJiWCwWExsb+1XbSUxM/Kr1N5fo6Ghm6tSpAs9dv36dSUtL4z4eM2YMY2lpyZSWltZap6+vL7Nnzx6BP6dPn+aWi4iIYPbs2dPgvp87d46RlpZmHjx4wHduxIgRzPjx45mysjKh1z9+/JhxdHRk8vLyam3H29ubWbZsGVNVVdXgvn5p7969zJYtW5qkri+5u7szkZGRIpePiopipKSkGAMDA5Gvyc/PZ0aNGsVMmzaNSU9Pb0g3a5Wdnc0cP36cefr0aZPX3Vh1vb7Z2dnM2LFjmcDAwCZp7969e8yECRNa7LNmwoQJzPTp05ni4uJmb5vD4TAPHjyo9e+3MdhsNhMaGtrg652cnBhpaWlm7ty5Tdgr0dnb2zMyMjKMlZVVk9WZn5/PmJiYMBISEoy5uTlTVFTEc76mpoYxNzdndu/ezXftsWPHmLVr1zJ5eXmMo6Mj07ZtW0ZcXJwpKSmptc0XL14wurq6PP8XahMTE8Po6Ogw06dPZ2JjYwX+j7G1tWW0tbWZnTt38l2vqqrKPHz4kGEYhomLi2OmT5/OPbdr1y6mR48ejLi4OKOvr88kJydzz+3Zs4fR0dFhUlNTmdjYWKZTp06MoqIiY2try9ja2jJ6enrM/PnzuY+3bt3KnDlzhvv+ra6uZi5fvsx07tyZCQoKqvU5SkhIcPvYWGIMU8cwECFfUXBwMPr169d03zr+g5KTk6GmpvbNJhUlpKWUlZXVudnpW/Px40dER0fDwMCAb3Q3JSUFQUFBmDx5Mt+tqtLT01FaWspdW3vz5k1kZWVh4cKFte4WLykpQXR0tMjJW4uKihAdHV3ndKuXlxfk5OR4NqOI4tmzZ3j8+DHMzc15RolTUlJQUVHBTdCcnZ2NyMhIoaOOYmJiMDc3h5GREYBPtyUMDAzEvHnzMHz4cG42BEHCwsLQr1+/JtnhSUEaIYQQQkgtSkpK0LZt22a/swQFaYQQQgghrVCL7+4khBBCCCH8KEgjhBBCCGmFKEgjhBBCCGmFKEgjhBBCCGmFKEgjhBBCCGmFKEgjhBBCCGmFKEgjhBBCCGmFRA7Srl27xncj5fpcK+xG5nVd9/79+wa1+aXk5GSkpaU1uh5CCCGEkOYiNJntu3fvYGxsjE2bNmHJkiUYMWIETExMsHPnzvo3IiaGp0+fws/PDyNHjsTPP/8s0nUGBgbYtWsXzMzMuMfKy8shJSXFc0uGtLQ0eHh4oLKyUmA90dHRiIiIwJUrV0RumxBCCCGkJbUVdiI6Oho5OTno1KkTAGDt2rXw9PREVVUVJCQkGtSYkZERli1bhlu3bkFbW5vnnJ+fHyIiIniOZWdn49KlS4iOjuYei4yMxIkTJ9ClSxfuMSUlJQwbNgw1NTUC2x0+fDiAT3e4J4QQQgj5FggdSZsxYwbk5eXh5uYGAGCz2TA3N4eXl5fAm2FHRkbi/v37AhvZuHEjrK2tIScnBzc3N5SWlmL27Nk4cuQIJCUlAQDFxcUoLy/nuW748OEwMzPD2rVreY4rKSmhbVuh8SUhhBBCyDdPYKQTHByMhIQE3L17l3tMXl4egwcPxvz583Hu3Dm+QK2mpgbl5eXo1asXX32ampqoqKiAjIwMTExMIC4ujj59+oDD4fDUn5iYiKSkJO4xFouFyspKBAYGIicnB48ePULfvn2xbt06bpDG4XCQlpYGOTk55OTk8LSrpqaGsrIySEpKoqamBrdu3UJ+fj5Wr14NWVnZBrxchBBCCCHNg28k7d27dzA0NIS7uztGjx6NNm3acM/l5ORAT08P/fv3x+nTp9GtWzeRGjE3N8f27dvRv3//Wsu5u7vzTGNaWVlh0aJFGDp0KPeYnJwcevfuzTMCN378eEyePBl+fn5ITU2FpaUlAgICUFlZiTlz5sDb2xv5+fl48+YNJCQkEBgYiEGDBonUd0IIIYSQlsATpFVVVcHe3h7Jyck4e/YsAMDHxwcWFhYoKysDADx79gzjxo1DdnY2tm3bhg0bNqBdu3YoLS1FSkoKd11YZWUltm3bBm1tbfz444948uQJnJycBHYiOTkZxcXFfMe3bt2KX375hbumDACOHTsGTU1NbNmyBTIyMjzlnz9/jo4dO4LFYmH16tVQUVHBmjVroKCgQNOjhBBCCPmm8EQuf//9N6qqquDi4sI9tnHjRqxZs4b72NDQEJcvX4aTkxO6du2KgoICtGvXDsXFxYiKikJFRQUcHBzQs2dPTJs2DQCgqKiIrKwsoZ1ITEzkSbWRmpqKEydOoLi4GL6+vnB2duaeMzIyAgCUlJTwBGnJyckYOHAgrK2tsX//fu7xwMBAvHz5Elu3bhXafnl5OcLDw2FiYiL8lSKEEEIIaUY8QRqbzcaOHTu4j0+ePAlpaWls2LABwKf1X+Li4hg+fDjP6Bbwaf3XvHnzAHwafTMyMsKSJUsAfNop+uTJEzAMw5M647OJEydyf6+pqcGaNWtQXl6O2NhYbN++HT179oSqqipWrVqF/Px8+Pj4QEVFhXsNwzDw9PTEoEGDsGnTJp66Z8yYgUWLFsHGxgaHDx+GuDh/ari//voLy5cvx8SJE+Hr6yvaK0cIIYQQ8hXxRCwrV67k/p6SkgJ7e3vs2LEDqqqqKC4uxoEDB1BRUVHvRtTU1CAnJ4cLFy7UWu7zov5Tp07B398f+vr6mDp1KpYsWYLffvsNvXv3xl9//QUNDQ2e6x4/fow9e/Zg8uTJUFJS4qt3x44dePjwIXbt2iUwOW7Pnj3xyy+/8O0iJYQQQghpKULvOODm5oYVK1ZgypQpAABZWVkUFhZi9uzZIlUcEhKC48ePo0ePHti2bRvmzJmDzZs349GjR6ioqMDx48dRWlrKLX/r1i2MGTMGEhIS6Ny5MzePmoWFBWRkZNC1a1ccOnQIffr04WmnpqYGHh4e2L9/P8+07Je0tbVhb28PJycn3Lhxg+/8sGHDcP36dYwaNUqk50YIIYQQ8rXxraYvLS1FSEgI3r59i3Xr1uH169fcc5MmTcKECROwaNEiHD16FAoKCgA+TTdGRkbiw4cPcHV1RVpaGhQUFJCTk4MrV67AwMAAAPDmzRs4Ozvjw4cPSEpK4qbgePbsGS5cuAAPDw/o6uri9evXiImJQXJyMoKDgxEUFIQRI0bAwMAAx44dg4aGBnr27AkA2Lt3L3Jzc7FgwQJuG1VVVSgoKOCZEh00aBBGjx7Nt9kAAO7evQtLS0ts3boV69ata6rXlhBCCCGkwfiCtKioKJiamkJOTg6PHj0CAAwdOhQ6OjrQ19fHzp07sWnTJixevJi7iJ9hGNy7dw+xsbFYtmwZNDQ0oKmpyTf1ePz4caxbtw5TpkyBsbEx93jXrl3h4eEB4NPIWGRkJMLCwmBubg4rKysoKirCzc0NS5cuxcSJE6GpqYnk5GQAnzYZ2NnZQUZGBrm5ufD29sbJkyfx4cMH2NjYcNuQl5eHnZ0dpKWl+V4EIfl8CSGEEEJajNA7DtTG0tIS27dvh56eXoMatbOzg5OTE8LDw6GqqspzjsPhYM6cOZg3bx7GjRvHd62vry8GDRoEdXV1ofV7enrC19cXrq6uDeofIYQQQkhLa1CQRgghhBBCvi6hGwcIIYQQQkjLoSCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNEEIIIaQVoiCNkG9UfHw8jh492tLdIEIwDIOSkhLQnfcIIQ1FQRoh36CkpCScOnUKY8aMqfe1gYGB2L17N1JSUr5CzwTLz8/HnTt3sHv3bjx//rzZ2m1JkZGROHnyJDgcTkt3pcmkp6cjLi6O73hAQAD8/PxaoEeEfN8oSCPkG8MwDPr16wdra2v06tWr3te7u7tj+/bt8PLy+gq9E8zV1RUBAQHYsWMHMjIymq3dlhIbGwtTU1P8+uuvaNOmTUt3B8CnQHnlypWQlZXFzp07UVVVJfK1SUlJkJaWRpcuXXDq1Cm+86NHj8bhw4fx7NmzpuwyIf95FKQR8o158OABVFVV0aNHjwZdr6qqCgDo2LFjU3arVuvXr8fBgwcxa9asZmuzpSQmJmLx4sW4fPkytLW1W7o7XPv27UO3bt2Qm5uLxMREXLp0SeRrlZSUEB8fj927dwst4+TkBBsbGwQEBDRFdwkhoCCNkG9OWVkZZs6c2eDrNTQ0AAA6OjpN1SXyBQcHByxbtgzDhw9v6a5weXh4IDg4GJaWlpCVlcX27duxYcMGka9XUVGBrq4uN8AX5IcffsCUKVOwbt065OTkNEW3CfnPa9vSHSCE1I+EhARkZGT4jtfU1CA0NBSlpaUYMWIEnj59CldXV6xYsQL9+vXjljMwMAAA/PTTT7W2k56eDg8PD1RUVNTZJ3l5eaxfv76ez+T7FBwcDDMzM77jhYWFCAsLg7q6OvT19eHl5QU/Pz/s27cPHTp0EFhXeHg4HBwcuI/bt28PSUlJZGdnAwCMjIwQFhYGbW1tbN68GfLy8gLriYuLQ4cOHbjt9OrVCzU1NfD09MTUqVMb+5S5rK2tceTIETx//hxqampNVi8h/1UUpBHynZg2bRoYhoG/vz/Mzc0xfvx4ZGZmIjQ0lCdIE5WqqiqmT58u0sL31rLuqjUoKyuDlpYWz7HU1FScOqijVjsAAA6+SURBVHUKcXFxiImJgZGREaZPnw4fHx+MHTsWFhYWAutSVVXlGTVlsViQkpJCZmYm95iWlhZkZGQgISEhtE++vr5YsmRJI5+ZaH766Se8fv0aI0aMaJb2CPmeUZBGyHfCy8sLZ8+exe3btzFkyBBYWVnBwcEBUlJSPOW6du0KPT29OusTFxeHtLS0SEGarKxsg/v9veFwOHyvWZcuXWBvb4+DBw8iJCQEmzZtgoqKCoDaX7uOHTtCWVmZ7/gPP/zAd6y2IA2AwNHXr0FJSalZ2iHkv4CCNEK+E5WVlbh16xYsLCywfv16PH36FFlZWRg2bBhPubKyMpSWltZZX25uLmxsbDB48GBkZmbWmjpj4sSJsLa2bvRz+B5oaGjg7du3AnfeOjg4YOfOnRg8eDDc3d3BYrFgamoqtK47d+4gJiZGpHZtbGygqKgo8JyRkRECAgLqHE1zcnJCXl4eVq9eDQUFBZHa/bf4+HhMmjSpQdcSQnhRkEbId6KsrAze3t548+YNAODy5cto164dunfvzlNOWloac+fOrbM+TU1NXLp0CRISEuBwOKipqRFalqY7/z9zc3O4u7vz5bD766+/UFVVhTFjxqCmpgYPHz7ExIkTa63L1NS0zjKftW0r/OO8X79+cHZ2Rm5uLlRUVBASEoKysjK+HcKrVq0Ch8NBQUEB7OzsRGr3S+7u7nj16hXU1dXrfS0hhB/t7iTkOxEXF4fRo0eDxWKBzWYjJCQEAwcOxMuXL3nKderUCVOmTBGpzs9TaOLi4pCQkBD6Iy5e+0dJTk4OLl68iJSUFLi6uuLFixcNe5LfgBkzZiA1NRXBwcE8xxMSEmBgYABDQ0NUVlbi4cOH0NbWRmpqqtC62rRpU+vr/uWPmJiY0HqWL18OJSUlXLt2DRUVFbh+/To2b96M3r1785SbPXs25OXloaury1dHVlYWMjIy8PLlS+Tl5fGdz8zMhJ2dHf78808MGDCgrpeJECICCtII+U7k5eXB1tYWMjIykJKSwtSpU6Gpqcm3punSpUuwtLTExYsXm61vsrKy6N27NxwcHNC3b1+ehe/fm86dO+PKlSvYu3cvbt++zT3OYrHg5OQE4NOol4WFBSQlJZttDdeZM2cQHR2NESNGoEOHDti4cSNfGRcXF+jr6/NNV759+xaXLl1CRUUFqqurYWVlxReorV+/Hr/++iusrKy+6vMg5L9EjKEbyxHyTQkMDMSjR4+wY8eOBl1va2uL8+fPw87O7j+RXLalFBQUwNbWFocOHYK0tHRLd0ckLi4uUFZWrndajosXL6K8vByLFi36Sj0j5L+JgjRC6ikmJgZ+fn6wsbFpkV2NjQ3SiouLkZKSgr59+zZxzwghhDQlmu4kpJ48PDxga2uLnTt3tnRXGkReXp4CNEII+QZQkEZIA3Xq1Kmlu0AIIeQ7Rik4CKmngQMHAkCL3Tw7JCREpASzhBBCvm0UpBHyj7y8PERFRUFRURH6+vq4dOkS7ty5g127dvHkGvs8Vfjzzz/XWd+BAwcgKyuL7OxsfPz4ERoaGnj//j1fWWVlZZw6darOPr5+/RoZGRncXYKEEEK+XxSkEfKP/fv349WrVwgPD8fgwYNhZWWF69evo0OHDjh69Ci3XG1JQ7+koKCAmTNngsViIS8vD2w2GyoqKsjNzeUrKyxT/JdcXV3h5uaGffv2QVJSUvQnRggh5JtEQRoh/7Czs8Mff/yB4OBg7N69m5vIdfz48Tzl2rdvD0NDwzoDJXFxcXTp0gU1NTWQl5fnHu/YsWO9+vXgwQOcPXsWL168QEhISLPdg5EQQkjLoiCNkC8EBwdj165d6Nu3L44ePYqamhoMGTKEp4y0tDSGDRtWa4Z3AGCz2fDw8MDHjx9FaltYSg0Wi4X58+cjIiICy5cvx5EjR9C+fXvRnhAhhJBvFgVphPyDYRjExcXhwIEDAID09HRs3bqVLyN8VVUVioqK6pz2ZLFYWLVqVaP7pa+vDwAYNWoUrl69CgsLC/j6+tKUJyGEfOcoBQch/xg1ahR+/PFHDB48GFlZWfDy8kJERASio6N5yikqKsLNza1FEtmampqiW7duSE9Pb/a2CSGENC8K0gj5h7GxMdatWwfgU8LXHj16oGvXrtDR0eEpd/DgQejp6SEwMLDZ+ygtLY3x48fj+vXrzd42IYSQ5kXTnYT848s7CMjLy8Pf319guerqauTk5OD169f45Zdfmqt7XLKysigvL2/2dgkhhDQvGkkjpJ6srKzg4+ODxYsXt3RXWoyXlxcePXrUon3IzMxEWFgY3/GkpCQEBQXVeX18fDwyMzO/RtcAfFq7GB8fT4mHCSENRkEaIfWkrq6OoUOHclN0/JdUV1fj2rVruHHjBvr169cifcjIyECfPn3Qs2dPODg48J3X1dWFg4MDvLy8hNaRkJAAfX19rFy5EqWlpU3ex8LCQowbNw5JSUkQF2/Yx+znBMjV1dVN0qfnz59jy5YtkJeXx4MHD/jOnzhxAp6enk3WHiGk8Wi6kxAiMg8PD/zxxx+IiIhokY0TAKCkpIRbt27h/v37uHv3rsAyx48fx/z588FisWBsbMx3PiUlBcCn0bjy8vImfS7v3r2DlZUVVq9eDXNz8wbX4+Pjg7CwMCgqKsLMzAyGhoZ8O43rIysrC3369BF63tLSErNmzYKsrCzGjRvX4HYIIU2HRtIIISLJy8vD6dOnERMTAxaL1WL9UFBQgLa2NlRVVYWW6dSpE5YuXYpp06YhLS2N77yuri4AQENDA9LS0k3av6tXr8LIyKhRARoALFmyBI6OjrC0tISfnx86derEs26yvkaNGgVLS0uh55WVleHp6YlDhw4hOzu7we0QQpoOBWmEfCdqampw9+5d+Pv7o7y8HL6+vjh37hwSExNrvS4uLg5sNrvO+nNzc1FeXg45OTm+cxwOB0lJSYiJiQHwaV2Yh4cH3r1717An00hiYmL49ddfIS0tjdDQUL7zGhoaAD5tEBH1Nl+icnFxwfDhwwWei4mJwZs3b8AwDGJjY3HhwgUUFBQIrUtKSgqDBg2Cvb09UlNToaCggDlz5sDW1hb/+9//UFZW1qR9l5OTw9ChQ7Fx48YmrZcQ0jA03UnId+K3337DlStXwOFwsGXLFnTv3h0LFiyAg4MD9PT0BF7j7e0Na2trDBgwAI6OjlBTU6u1DXV1dYHHT5w4gWPHjqGyshJr1qxBYWEhvLy8wOFwMGfOHJ6yt2/fxtu3b0V6TqNGjUKXLl1EKivI5MmTBQapnxMBs1isJk8KXF5eznfrr48fP+LYsWNwdXWFnp4eZsyYgaioKHh4eKBdu3aYPHlynfWqqqpi/fr1yMvLQ3p6Otzc3LBr1y7MmjULY8eOhaamZqP7LiYmBhMTE7i4uDS6LkJI49FIGiHfCWdnZ9jY2KC4uBjKysoYP3482rZty3Pf0C8VFxfjxIkTSEtLg6enZ6Nyr6moqODIkSPIzc3Fq1evsHnzZvTs2ZOvHJvNRmFhYZ31PX36FOHh4Q3uz2fCnru0tDRMTU3Ru3fvRrchKjMzM5w+fRqhoaFITEzEwYMHhfavNiwWC4aGhjh27BjOnDmD8vJyjBw5EgcPHhT5FmS1kZSURElJSaPrIYQ0Ho2kEfKdqKqqQkxMDMaNG4elS5fi5s2bUFdXx08//SSwvKysLIYPH4779+9DQUFB6Gjbl2JjY8EwDN99S6dPn4558+ZBR0cHhw4dQm5uLoKDg7F27VqecoqKipg5c2ad7TRVepM7d+5g0aJFAs8NGDAAWlpaTdLOl0pLS1FcXMxzTFlZGcrKyujevTumTp2KI0eOwNvbG2w2W+DGBlFJSkoiLy8PkpKSePv2LQoLC6GsrNzYp0AIaSUoSCPkO1FcXAxfX19kZGSAYRgcPXoUysrK+OGHHwSWFxcXx9atWzFq1CiwWCz06NGj1vpVVFSgo6ODu3fv8u3+KykpQXh4OKKjo6GoqIjLly+jc+fOQgPE5hAbG4vXr1/D0NBQ4PnQ0FCh07eNoampiTdv3mDgwIE8xyMiIlBWVobff/8dwKe1gKtWrar3js3Kyko8efIE7u7uiIiIwOzZsxEXF9ckfedwODh//jwWLlzYJPURQhqHpjsJ+cYUFBSAYRi+41evXsW4ceOgqKiIjIwMZGVlwdjYGK9evaq1PiMjozoDNODTNNuyZcuwcuVKJCcn85xLTU1F+/btuVNlLi4u6N69+1fbJfj+/XskJCQgISEB79+/5ztfWFiIAwcOYO7cuRg2bJjAOhwdHTFjxowm79vvv/+OQ4cO8W2auHPnDpSVldGlSxeUl5fD29sbmpqa+PDhg0j1pqWlwd7eHsuXL4eXlxdGjhyJBw8eYP369fXqH4fDETrlXF1djcjISEybNq1edRJCvg4K0gj5xsjLy/NNNwKf0k4sW7YMMjIykJKSgqSkJHR0dJp0Ss/S0hIHDhzA0qVLedY/+fr6YtmyZZCVlUVxcTHKy8vx6NEjgQFUY2VmZuLKlStgs9nQ0NDA2LFj+dq5evUqNDQ0cPz4caH1eHl5wdnZuclvsWVmZoYff/wR27Zt4zl++/ZtHDp0CPLy8uBwOMjLy4OXl1edgezLly9hbm6OqVOnQkNDA/v27cOBAwdgYWEBBQUFkft19epVGBoaory8HNu2bcP9+/f5ysyePRszZ87EkCFDRK6XEPL1iDGCvpITQlq1zp07IywsjG8XYXNJSkqCqqoqFBUVW6T92iQlJcHPzw8LFiwQ2r/g4GCMGDECI0aMgKenZ6OSxArj5uaGdu3aNXhUKigoCPfv38fjx4+xfPlyGBsb15obTlTV1dUICQnB0KFDeXa2uru7IyUlBTt27Gh0G4SQpkFBGiHfoGfPnsHHxwcbNmxoscz/37LS0lKEhoZCTU0Nffr0afCtm76msLAwyMnJoVu3bgJz0zW10tJSei8R0spQkEbINyoxMREsFqvO3GaEEEK+TRSkEUIIIYS0Qq1vjJ8QQgghhFCQRgghhBDSGlGQRgghhBDSCv0//zlMFUe/7tUAAAAASUVORK5CYII=)

【代码】

```c
#include <stdio.h>
int fac(int n); 

int main(){
    int n;
    int y;
    scanf("%d",&n);
    y = fac(n);
    printf("%d!=%d\n",n,y);

    return 0;
}

int fac(int n){
    int f;
    if(n<0){
        printf("n<0,data error!");
    }else if(n==0||n==1){
        f = 1;
    }else{
        f = fac(n-1)*n;
    }
}
```

## [027 Hanoi(汉诺)塔问题](#/C/C-Code?id=_027-hanoi汉诺塔问题)

【题目】

![image-20200318170450483](data:image/png;base64,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)

【代码】

```c
#include <stdio.h>

void hanoi(int n,char one,char two,char three);
void move(char x,char y);

int main(){
    int m;
    scanf("%d",&m);
    hanoi(m,'A','B','C');
    return 0;
}

void hanoi(int n,char one,char two,char three){
    if(n == 1){
        move(one,three);
    }else{
        hanoi(n-1,one,three,two);
        move(one,three);
        hanoi(n-1,two,one,three);
    }
}

void move(char x,char y){
    printf("%c->%c\n",x,y);
}
```

## [028 数组输出元素](#/C/C-Code?id=_028-数组输出元素)

【题目】输入10个数，要求输出其中值最大的元素和该数是第几个数。

【代码】

```c
#include <stdio.h>
#define N 10

int max(int x,int y);

int main(){
    int a[N];
    int i,t,number = 0;
    printf("enter 10 integer numbers：");
    for(i=0;i<N;i++){
        scanf("%d",&a[i]);
    } 
    printf("\n");
    t = a[0];
    for(i=1;i<N;i++){
        if(max(t,a[i])>t){
            t = max(t,a[i]);
            number = i;
        }
    }
    printf("The largest number is %d\nit is the %d number.\n",t,number+1);
    return 0;
}

int max(int x,int y){
    return x>y?x:y;
}
```

## [029 删除字符串中指定字符](#/C/C-Code?id=_029-删除字符串中指定字符)

【题目】有一个字符串，内有若干个字符，现输入一个字符，要求程序将字符串中该字符删去。

【代码】

```c
#include <stdio.h>
#define N 80

void enterString(char str[]);
void deleteString(char str[],char ch);
void printString(char str[]);

int main(){
    char c,str[N];
    enterString(str);
    scanf("%c",&c);  //要求删的字符
    deleteString(str,c);
    printString(str); 
    return 0;
}

void enterString(char str[]){
    gets(str);
}

void deleteString(char str[],char ch){
    int i,j;
    for(i=0,j=0;str[i]!='\0';i++){
        if(str[i]!=ch){
            str[j++] = str[i];
        }
    }
    str[j] = '\0';
}

void printString(char str[]){
    printf("%s\n",str);
}
```

## [030 指针访问整型变量](#/C/C-Code?id=_030-指针访问整型变量)

【题目】通过指针变量访问整型变量

【代码】

```c
#include <stdio.h>

int main(){
    int a = 100;
    int *p;
    p = &a;
    printf("*p = %d\n",*p);
    return 0;
}
```

## [031 逆序的三位数](#/C/C-Code?id=_031-逆序的三位数)

【题目】

程序每次读入一个正三位数，然后输出逆序的数字。

注意，当输入的数字含有结尾的 0 时，输出不应带有前导的 0 。比如输入 700 ，输出应该是 7 。

提示：用 %10 可以得到个位数，用 /100 可以得到百位数...。将这样得到的三个数字合起来：百位 * 100 + 十位 * 10 + 个位，就得到了结果。

【输入格式】

每个测试是一个3位的正整数。

【输出格式】

输出逆序的数。

【输入样例】

123

【输出样例】

321

【时间限制】

500ms内存限制：32000kb

【参考代码】

- C 版

```c
#include <stdio.h>
int main()
{
    int t1,t2,mt1,mt2,mt3;

    scanf("%d",&t1);    //输入

    mt1=t1/100; mt2=(t1-mt1*100)/10; mt3=t1%10;
    t2=mt3*100+mt2*10+mt1;

    printf("%d\n",t2);    //输出

    return 0;
}
```

## [032 数位数](#/C/C-Code?id=_032-数位数)

- Example 01：先判断后执行

  ```c
  int main()
  {
    int x;
    int count = 0;
  
    printf("请输入一个任意数："); 
    scanf("%d",&x); 
  
    count++;
    x /= 10;
    while(x > 0)
    {
        count++;
        x /= 10;
    }
  
    printf("该数有 %d 位！\n",count);
  
    return 0;
  }
  ```

- Example 02：先执行后判断

  ```c
  #include <stdio.h>
  //数位数 
  int main()
  {
    int x;
    int count = 0;
  
    printf("请输入一个任意数："); 
    scanf("%d",&x); 
  
    do
    {
        x /= 10;
        count++;
    }while(x>0);
  
    printf("该数有 %d 位！\n",count);
  
    return 0;
  }
  ```

## [033 求阶乘n！](#/C/C-Code?id=_033-求阶乘n！)

【题目】写一个程序，让用户输入n,然后计算输出n! 【代码】

- `Example 01：`

```c
#include <stdio.h>
//求阶乘n！ 
//题目：写一个程序，让用户输入n,然后计算输出n! 
int main()
{
    int n;
    int i=1;
    int fact = 1;//阶乘 

    printf("请输入一个任意数n："); 
    scanf("%d",&n); 

/*    while(i<=n)
    {
        fact *= i; 
        i++;
    }*/
    for(i=2;i<=n;i++)
    {
        fact *= i; 
    }

    printf("%d!= %d\n",n,fact);

    return 0;
}
```

- `Example 02:`

```c
#include <stdio.h>

int main()
{
    int n;
    int i=1;
    int fact = 1;//阶乘 

    printf("请输入一个任意数n："); 
    scanf("%d",&n); 

    for(i=n;i>1;i--)
    {
        fact *= i; 
    }

    printf("%d!= %d\n",n,fact);

    return 0;
}
```

## [034 猜数游戏](#/C/C-Code?id=_034-猜数游戏)

【题目】系统随机生成数字，猜数字

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

//主函数 
int main(){

    srand(time(0));
    int number = rand()%100 + 1;//[0,100]
    int count = 0;
    int a = 0;

    printf("我已经想好了一个1到100之间的数。");

    do{
        printf("请猜这个1到100之间的数：");
        scanf("%d",&a);

        count++;
        if(a>number){
            printf("你猜的数大了\n"); 
        } else if(a<number){
            printf("你猜的数小了\n"); 
        }
    }while(a!=number);

    printf("太好了，你用了 %d 次就猜到了答案。\n",count);

    return 0;
}
```

## [035 整数逆序](#/C/C-Code?id=_035-整数逆序)

- 跟 `001` 逻辑一样，但是这个地方用到了循环结构

```c
#include <stdio.h>

//主函数 
int main(){

    int x,digit;
    int result = 0;

    scanf("%d",&x);

    while(x>0){
        digit = x%10;
        result = result*10 + digit;
        x /= 10;
    }

    printf("%d",result);

    return 0;
}
```

## [036 判断素数](#/C/C-Code?id=_036-判断素数)

- `Example 01`

```c
#include <stdio.h>

//主函数 
int main(){

    int x;
    int i;

    scanf("%d",&x);

    for(i=2;i<x;i++){
        if(x%i == 0){
            break;
        }
    }

    if(i<x){
        printf("%d 不是素数",x);
    }else{
        printf("%d 是素数",x);
    }

    return 0;
}
```

- `Example 02`

```c
#include <stdio.h>

//主函数 
int main(){

    int x;
    int i;
    int isPrime = 1;

    scanf("%d",&x);

    for(i=2;i<x;i++){
        if(x%i == 0){
            isPrime = 0;
            break;
        }
    }

    if(isPrime == 1){
        printf("%d 是素数",x);
    }else{
        printf("%d 不是素数",x);
    }

    return 0;
}
```

- Example 03：使用子函数调用的方式：去掉偶数，从3到x-1，每次加2

```c
int isPrime(int x){
    int result = 1;
    int i;
    if(x == 1 || (x%2 == 0 && x != 2)){
        result = 0;
    }
    for(i=3;i<x;i+=2){
        if(x%i == 0){
            result = 0;
            break;
        }
    }
    return result;
}
```

- Example 04：无须到x-1，到sqrt(x)就够了

```c
int isPrime(int x){
    int result = 1;
    int i;
    if(x == 1 || (x%2 == 0 && x != 2)){
        result = 0;
    }
    for(i=3;i<sqrt(x);i+=2){
        if(x%i == 0){
            result = 0;
            break;
        }
    }
    return result;
}
```

> 注：sqrt(x) 返回类型 double，引入 #include <math.h>

- Example 05：判断是否能被已知的且<x的素数整除

```c
#include <stdio.h>

int isPrime(int x,int knownPrimes[],int numberOfKnownPrimes);

int main(){

    const int number = 100;
    int prime[number];
    prime[0] = 2;
    int j;
    for(j=1;j<number;j++){
        prime[j] = 0;
    }
    int count = 1;
    int i = 3;
    while(count < number){
        if(isPrime(i,prime,count)){
            prime[count++] = i;
        }
        i++;
    } 
    for(i=0;i<number;i++){
        printf("%d",prime[i]);
        if((i+1)%5){
            printf("\t");
        }else{
            printf("\n");
        }
    }

    return 0;
}

int isPrime(int x,int knownPrimes[],int numberOfKnownPrimes){
    int result = 1;
    int i;
    for(i=0;i<numberOfKnownPrimes;i++){
        if(x%knownPrimes[i]==0){
            result = 0;
            break;
        }
    }
    return result; 
}
```

## [037 输出100以内的素数](#/C/C-Code?id=_037-输出100以内的素数)

```c
#include <stdio.h>

//主函数 
int main(){

    int x;

    for(x=2;x<100;x++){
        int i;
        int isPrime = 1;
        for(i=2;i<x;i++){
            if(x%i == 0){
                isPrime = 0;
                break;
            }
        }

        if(isPrime==1){
            printf("%d ",x);
        }
    }
    printf("\n");

    return 0;
}
```

## [038 凑硬币](#/C/C-Code?id=_038-凑硬币)

【题目】如何用1角、2角和5角的硬币凑出10元以下的金额呢？

【代码】

```c
#include <stdio.h>

//主函数 
int main(){

    int x;
    int one,two,five;

    scanf("%d",&x);

    for(one=1;one<x*10;one++){
        for(two=1;two<x*10/2;two++){
            for(five=1;five<x*10/5;five++){
                if(one+two*2+five*5==x*10){
                    printf("%d 个1角 + %d 个2角 + %d 个5角 = %d 元\n",one,two,five,x);
                }
            }
        }
    }

    return 0;
}
```

## [039 求平均数](#/C/C-Code?id=_039-求平均数)

- `Example 01：`

```c
#include <stdio.h>

int main(){

    int number;
    int sum = 0;
    int count = 0;
    do{
        scanf("%d",&number);

        if(number != -1){
            sum += number;
            count ++;
        }
    }while(number != -1);

    printf("%f\n",1.0*sum/count);    
    return 0;
}
```

- `Example 02:`

```c
#include <stdio.h>

int main(){

    int number;
    int sum = 0;
    int count = 0;

    scanf("%d",&number);

    while(number != -1){
        sum += number;
        count ++;
        scanf("%d",&number);
    }

    printf("%f\n",1.0*sum/count);    
    return 0;
}
```

## [040 水仙花数](#/C/C-Code?id=_040-水仙花数)

【题目】计算所有N位水仙花数

【说明】水仙花数是指一个N位正整数（N>=3），它的每个位上的数字的N次幂之和等于它本身。

【输入格式】

输入在一行中给出一个正整数N（3<=N<=7）

【输出格式】

按递增顺序输出所有N位水仙花数，每个数字占一行

【代码】

- Example 01：

```c
#include <stdio.h>

int main()
{
    int n;
    int first = 1;
    int i = 1;    
    scanf("%d",&n);    
    while(i<n){
        first *= 10;
        i++;
    }
    //遍历100-999
    i = first;
    while(i<first*10){
        int t = i;
        int sum = 0;
        do{
            int d = t%10;
            t /= 10;
            int p = 1;
            int j = 0;
            //int p = d;
            //int j = 1;
            while(j<n){
                p *= d;
                j++;
            }
            sum += p;
        } while(t>0);
        if(sum == i){
            printf("%d\n",i);
        }
        i++;
    } 

    return 0;
}
```

## [041 打印九九乘法表](#/C/C-Code?id=_041-打印九九乘法表)

- Example 01：

```c
#include <stdio.h>

int main()
{
    int n;
    scanf("%d",&n); 
    int i,j;
    i=1;
    while(i<=n){
        j=1;
        while(j<=i){
            printf("%d*%d=%d",j,i,i*j);
            if(i*j<10){
                printf("   ");
            }else{
                printf("  ");
            }
            j++;
        }
        printf("\n");
        i++;
    }

    return 0;
}
```

## [042 统计素数并求和](#/C/C-Code?id=_042-统计素数并求和)

【题目】要求统计给定整数M和N区间内素数的个数并对它们求和。

【代码】

- Example 01：

```c
#include <stdio.h>

int main()
{
    int m,n;
    int i;
    int count = 0;
    int sum = 0;

    scanf("%d %d",&m,&n); 

    if(m==1){
        m=2;
    }
    for(i=m;i<=n;i++){
        int isPrime = 1;
        int k;
        for(k=2;k<i-1;k++){
            if(i%k == 0){
                isPrime = 0;
                break;
            }
        }
        //判断i是否素数
        if(isPrime){
            count++;
            sum += i;
        }        
    }

    printf("%d %d\n",count,sum);

    return 0;
}
```

- Example 02：

```c
#include <stdio.h>

int isPrime(int i){
    int result = 1;
    int k;
    for(k=2;k<i-1;k++){
        if(i%k == 0){
            result = 0;
            break;
        }
    }
    return result;
}

int main(){
    int m,n;
    int i;
    int count = 0;
    int sum = 0;

    scanf("%d %d",&m,&n); 

    if(m==1){
        m=2;
    }
    for(i=m;i<=n;i++){

        //判断i是否素数
        if(isPrime(i)){
            count++;
            sum += i;
        }        
    }

    printf("%d %d\n",count,sum);

    return 0;
}
```

## [043 猜数游戏](#/C/C-Code?id=_043-猜数游戏)

【题目】



【代码】

- Example 01:

```c
#include <stdio.h>

int main()
{
    int number,n;
    int inp;
    int finished = 0;
    int cnt = 0;
    scanf("%d %d",&number,&n);
    do{
        scanf("%d",&inp);
        cnt++;
        if(inp<0){
            printf("Game Over\n");
            finished = 1;
        }else if(inp>number){
            printf("Too big\n");        
        }else if(inp<number){
            printf("Too small\n");
        }else{
            if(cnt==1){
                printf("Bingo!\n");
            } else if(cnt<=3){
                printf("Lucky You!\n");
            }else{
                printf("Good Guess!\n");
            }
            finished = 1;
        } 
        if(cnt==n){
            if(!finished){
                printf("Game Over\n");
                finished = 1;
            }
        }
    } while(!finished);

    return 0;
}
```

## [044 求序列前N项和](#/C/C-Code?id=_044-求序列前n项和)

【题目】计算序列2/1+3/2+5/3+8/5+...的前N项之和。

【代码】

- Example 01:

```c
#include <stdio.h>

int main()
{
    int n;
    double dividend,divisor;
    double sum = 0.0;
    int i;
    double t;
    scanf("%d",&n);
    dividend = 2;
    divisor = 1;
    for(i=1;i<=n;i++){
        sum += dividend/divisor;
        t = dividend;
        dividend += divisor;
        divisor = t;
    } 
    printf("%.2f\n",sum);

    return 0;
}
```

## [045 约分最简分式](#/C/C-Code?id=_045-约分最简分式)

【代码】

- Example 01：

```c
#include <stdio.h>

int main()
{
    int dividend,divisor;
    scanf("%d/%d",&dividend,&divisor);
    int a = dividend;
    int b = divisor;
    int t;
    while(b>0){
        t = a%b;
        a = b;
        b = t;
    }
    printf("%d/%d\n",dividend/a,divisor/a);

    return 0;
}
```

## [046 念数字](#/C/C-Code?id=_046-念数字)

【题目】输入一个整数，输出每个数字对应的拼音

【代码】

- Example 01：

```c
#include <stdio.h>

int main()
{
    int x;
    scanf("%d",&x);
    if(x<0){
        printf("fu ");
        x = -x;
    }
    int mask = 1;
    int t = x;
    while(t>9){
        t /= 10;
        mask *= 10;
    }
    do{
        int d = x / mask;
        switch(d){
            case 0: printf("ling");break;
            case 1: printf("yi");break;
            case 2: printf("er");break;
            case 3: printf("san");break;
            case 4: printf("si");break;
            case 5: printf("wu");break;
            case 6: printf("liu");break;
            case 7: printf("qi");break;
            case 8: printf("ba");break;
            case 9: printf("jiu");break;
        }
        if(mask>9){
            printf(" ");
        }
        x %= mask;
        mask /= 10;
    }while(mask>0);
    printf("\n"); 

    return 0;
}
```

## [047 求a的连续和](#/C/C-Code?id=_047-求a的连续和)

【题目】S = a + aa + aaa + ... +aaa...a（n个a）

例如：S = 2 + 22 + 222 （3个2）

【代码】

- Example 01：

```c
#include <stdio.h>

int main()
{
    int a,n;
    scanf("%d %d",&a,&n);
    int sum = 0;
    int i;
    int t = 0;
    for(i=0;i<n;i++){
        t = t*10 + a;
        sum += t;
    } 
    printf("%d\n",sum);

    return 0;
}
```

## [048 输出平均数和大于平均数的数](#/C/C-Code?id=_048-输出平均数和大于平均数的数)

【代码】

- Example 01：

```c
#include <stdio.h>

int main(){

    int x;
    double sum = 0;
    int count = 0;
    int number[100];    
    scanf("%d",&x);        
    while(x != -1){
        number[count] = x;
        sum += x;
        count ++;
        scanf("%d",&x);
    }
    if(count>0){
        printf("%f\n",sum/count);
        int i;
        for(i=0;i<count;i++){
            if(number[i]>sum/count){
                printf("%d\n",number[i]);
            }
        }
    }

    return 0;
}
```

> 注：数据超过100时咋办？

- Plan A：采用动态的下标
- Plan B：进行说明，if 判断

## [049 统计个数](#/C/C-Code?id=_049-统计个数)

【题目】写一个程序，输入数量不确定的[0,9]范围内的整数，统计每一种数字出现的次数，输入-1表示结束

【代码】

- Example 01：

```c
#include <stdio.h>

int main(){

    int x;
    int count[10];
    int i;
    for(i=0;i<10;i++){
        count[i]=0;
    }
    scanf("%d",&x);
    while(x!=-1){
        if(x>=0&&x<=9){
            count[x]++;
        }
        scanf("%d",&x);
    }
    for(i=0;i<10;i++){
        printf("%d:%d\n",i,count[i]);
    }

    return 0;
}
```

- Example 02：

```c
#include <stdio.h>

int main(){

    const int number = 10;
    int x;
    int count[number];
    int i;
    for(i=0;i<number;i++){
        count[i]=0;
    }
    scanf("%d",&x);
    while(x!=-1){
        if(x>=0&&x<=9){
            count[x]++;
        }
        scanf("%d",&x);
    }
    for(i=0;i<number;i++){
        printf("%d:%d\n",i,count[i]);
    }

    return 0;
}
```

## [050 搜索数字](#/C/C-Code?id=_050-搜索数字)

【题目】查找数字是否在数组中，找到返回在数组中的位置，找不到返回-1

【代码】

- Example 01：使用数组

```c
#include <stdio.h>

int search(int key,int a[],int length);//声明 

int main(){

    int a[] = {2,4,6,7,1,3,};
    int x;
    int loc;
    printf("请输入一个数字：");
    scanf("%d",&x);
    loc = search(x,a,sizeof(a)/sizeof(a[0]));
    if(loc != -1){
        printf("%d在第%d个位置上\n",x,loc);
    } else{
        printf("%d不存在\n",x);
    }

    return 0;
}

int search(int key,int a[],int length){
    int result = -1;
    int i;
    for(i=0;i<length;i++){
        if(a[i] == key){
            result = i;
            break;
        }
    }
    return result;
} 
```

## [051 素数表](#/C/C-Code?id=_051-素数表)

【代码】

- Example 01：

```c
#include <stdio.h>

int main(){

    const int maxNumber = 100;
    int isPrime[maxNumber];
    int i;
    int x;
    for(i=0;i<maxNumber;i++){
        isPrime[i] = 1;
    }
    for(x=2;x<maxNumber;x++){
        if(isPrime[x]){
            for(i=2;i*x<maxNumber;i++){
                isPrime[i*x] = 0;
            }
        }
    }
    for(i=2;i<maxNumber;i++){
        if(isPrime[i]){
            printf("%d\t",i);
        }
    }
    printf("\n");

    return 0;
}
```

# [南开 100 题 - C 语言版](#/C/南开100题C语言版?id=南开-100-题-c-语言版)

## [001 成绩存入数组](#/C/南开100题C语言版?id=_001-成绩存入数组)

【题目】m 个人的成绩存放在 score 数组中，请编写函数 fun, 它的功能是：将低于平均分的人作为函数值返回，将低于平均分的分数放在 below 所指定的函数中。

【代码】

```c
#include <stdio.h>

int fun(double score[], int m, double below[]){
    int i, k = 0;
    double aver = 0.0;
    for (i = 0; i < m; i++){
        aver += score[i];
    }
    aver /= m;
    for (i = 0; i < m; i++){
        if (score[i] < aver){
            below[k++] = score[i];
        }
    }
    return k;
}

int main(){//main function is used to Test fun function
    double score[] = {78,65,45,68,90};
    double below[5];
    int i = fun(score, 5, below);
    printf("%d\n", i);
    return 0;
}
```

## [002 被 7 或者 11 整除的数](#/C/南开100题C语言版?id=_002-被-7-或者-11-整除的数)

【题目】请编写函数 fun，它的功能是：求出 1 到 100 之内能被 7 或者 11 整除，但不能同时被 7 和 11 整除的所有整数，并将他们放在 a 所指的数组中，通过 n 返回这些数的个数。

【代码】

```c
#include <stdio.h>

void fun(int a[], int *n){
    int i, j = 0;
    for (i = 2; i < 100; i++){
        if ((i % 7 ==0 || i % 11 == 0) && i % 77 != 0){
            a[j++] = i;
        }
    }
    *n = j;
}

int main(){//main function is used to Test fun function
    int n = 0;
    int a[1000];
    fun(a, &n);
    printf("%d\n",n);
    return 0;
}
```

## [003 求出能整除 x 且不是偶数的整数](#/C/南开100题C语言版?id=_003-求出能整除-x-且不是偶数的整数)

【题目】请编写函数 void fun(int x, int pp[], int *n), 它的功能是：求出能整除 x 且不是偶数的各整数，并按从小到大的顺序放在 pp 所指的数组中，这些除数的个数通过形参 n 返回。

【代码】

```c
#include <stdio.h>

void fun(int x, int pp[], int *n){
    int i, j = 0;
    for (i = 1; i < x; i++){
        if (x % i == 0 && i %2 != 0){
            pp[j++] = i;
        }
        *n = j;
    }
}

int main(){//main function is used to Test fun function
    int n = 0;
    int pp[1000];
    fun(6, pp, &n);
    printf("%d\n",n);
    return 0;
}
```

## [004 统计字母出现的次数](#/C/南开100题C语言版?id=_004-统计字母出现的次数)

【题目】请编写一个函数 void fun(char *tt, int pp[]), 统计在 tt 字符中" a "到" z " 26 各字母各自出现的次数，并依次放在 pp 所指的数组中。

【代码】

```c
#include <stdio.h>
#include <string.h>

void fun(char *tt, int pp[]){
    int i, j = 0;
    for (i = 0; i < strlen(tt); i++){
        if (tt[i] >= 'a' && tt[i] <= 'z'){
            j = tt[i] - 'a' ;
            pp[j] = pp[j] + 1;
        }
    }
}

int main(){//main function is used to Test fun function
    char tt[] = {'a','b','a'}; 
    int i;
    int pp[26];
    //int pp[26] = {0};
    for (i = 0; i < 26; i++){
        pp[i] = 0;
    } 
    fun(&tt, pp);

    for (i = 0; pp[i] != '\0'; i++){
        if (pp[i] > 0){
            char c = i + 'a';
            printf("%c = %d\n", c, pp[i]);
        }
    }    
    return 0;
}
```

## [005 指定素数输入数组](#/C/南开100题C语言版?id=_005-指定素数输入数组)

【题目】请编写一个函数 void fun(int m, int k, int xx[]), 该函数的功能是：将大于整数 m 且紧靠 m 的 k 个素数存入 xx 所指的数组中。

【代码】

```c
#include <stdio.h>
#include <math.h>

void fun(int m, int k, int xx[]) {
    int i, j, count = 0;
    for (i = m + 1;count < k ; i++) {
        for (j = 2; j <= sqrt(i); j++) {
            if (i % j == 0) {
                break;
            }
        }
        if (j > sqrt(i)) {
            xx[count++] = i;
        }
    }
}

int main() {
    int a[100];
    fun(3,5,a);
    int i;
    for (i = 0; i < 5; i++) {
        printf("%d ", a[i]);
    }
}
```

## [006 删除指定下标的字符](#/C/南开100题C语言版?id=_006-删除指定下标的字符)

【题目】请编写一个函数void fun(char a[],char[],int n),其功能是：删除以各字符串中指定下标的字符。其中，a指向原字符串，删除后的字符串存放在b所指的数组中，n中存放指定的下标。

【代码】

```c
#include <stdio.h>
#include <string.h>

 void fun(char a[], char b[], int n) {
     int i, j = 0;
     for (i = 0; i < strlen(a); i++) {
         if (i != n) {
             b[j++] = a[i];
         }
     }
     b[j] = '\0';
 }

 int main() {
     char a[] = "Hello";
     char b[10];
     fun(a, b, 2);
     puts(b);
    return 0;
 }
```

## [007 元素下标存放k中](#/C/南开100题C语言版?id=_007-元素下标存放k中)

【题目】请编写一个函数int fun(int *s,int t,int *k),用来求出数组的最大元素在数组中的下标并存放在k所指的储存单元中。

【代码】

```c
#include <stdio.h>
#include <string.h>

int fun(int *s, int t, int *k) {
    int i, max;
    max = s[0];
    for (i = 1; i < t; i++) {
        if (s[i] > max) {
            max = s[i];
            *k = i;
        }
    }
    return 0;
}

int main() {
    int a[4];
    int i;
    for (i = 0; i < 4; i++) {
        scanf("%d", &a[i]);
    } 
    int value = 0;

    fun(&a, 4, &value);
    printf("%d", value);
    return 0;
}
```

## [008 计算并输出下列多项式值](#/C/南开100题C语言版?id=_008-计算并输出下列多项式值)

【题目】编写函数fun,功能是：根据以下公式计算s,计算结果作为函数值返回；n通过形参传入。s=1+1/(1+2)+1/(1+2+3)+.......+1/(1+2+3+4+......+n)

【代码】

```c
#include <stdio.h> 

double fun(int n) {
    int i, j, t;
    double s = 0.0;
    for (i = 1; i <= n; i++) {
        t = 0;
        for (j = 1; j <= i; j++) {
            t += j;
        }
        s += 1.0/t;
    }
    return s;
}

int main() {
    printf("%lf\n", fun(10));
    return 0;
}
```

## [009 求值](#/C/南开100题C语言版?id=_009-求值)

【题目】编写一个函数fun，它的功能是：根据以下公式求P的值，结果由函数值带回。m与n为两个正整数，且要求m>n。p=m!/n!(m-n)!

【代码】

```c
#include <stdio.h>

double fun(int m, int n) {
    double p, t = 1.0;
    int i;
    for (i = 1; i <= m; i++) {
        t *= i;
    }
    p = t;
    for (t = 1.0, i = 1; i <= n; i++) {
        t *= i;
    }
    p /= t;
    for (t = 1.0, i = 1; i <= m - n; i++) {
        t *= i;
    }
    p /= t;
    return p;
}

int main() {
    printf("%lf",fun(10,9)); 
    return 0;
}
```

## [010 简单迭代](#/C/南开100题C语言版?id=_010-简单迭代)

【题目】编写函数fun,它的功能是：利用以下的简单迭代方法求方程cos(x)-x=0的一个实根。

迭代步骤如下：(1)取x1初值为0.0；(2)x0=x1,把x1的值赋各x0;

(3)x1=cos(x0),求出一个新的x1;

(4)若x0-x1的绝对值小于0.000001，则执行步骤(5),否则执行步骤(2);

(5)所求x1就是方程cos(x)-x=0的一个实根，作为函数值返回。

程序将输出Root=0.739085。

【代码】

```c
#include <stdio.h>
#include <math.h> 

double fun() {
    double x0, x1 = 0.0;
    do {
        x0 = x1;
        x1 = cos(x0);
    } while (fabs(x0 - x1) >= 1e-6);
    return x1;
}

int main() {
    printf("%lf", fun());
    return 0;
}
```

## [011 数组左下半三角元素中的值全部置成0](#/C/南开100题C语言版?id=_011-数组左下半三角元素中的值全部置成0)

【题目】下列程序定义了N×N的二维数组，并在主函数中自动赋值。请编写函数fun(int a[][N]),该函数的功能是：使数组左下半三角元素中的值全部置成0。

【代码】

```c
#include <stdio.h>
#define N 3

int fun(int a[][N]) {
    int i, j;
    for (i = 0; i < N; i++) {
        for (j = 0; j <= i; j++) {
            a[i][j] = 0;
        }
    }
}

int main() {

    int a[][3] = {{1,2,3},{2,3,4},{3,4,5}};
    fun(a);
    int i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

## [012 数组周边元素的平均值返回给主函数](#/C/南开100题C语言版?id=_012-数组周边元素的平均值返回给主函数)

【题目】下列程序定义了N×N的二维数组，并在主函数中赋值。请编写函数fun,函数的功能使求出数组周边元素的平均值并作为函数值返回给主函数中的s。

【代码】

```c
#include <stdio.h>
#define N 3

double fun(int w[][N]) {
    int i, j;
    double s = 0.0;
    for (i = 0; i < N; i++) {
        s += w[0][i];
    } 
    for (i = 0; i < N; i++) {
        s += w[N - 1][i];
    } 
    for (i = 0; i < N; i++) {
        s += w[i][0];
    } 
    for (i = 0; i < N; i++) {
        s += w[i][N - 1];
    } 
    s = s - w[0][0] - w[0][N - 1] - w[N - 1][0] - w[N - 1][N - 1];
    return s/(4 * N - 4);
}  

int main() {
    int a[][3] = {{1,2,3},{2,3,4},{3,4,5}};
    printf("%lf", fun(a));
    return 0;
}
```

## [013 求出二维函数组每列中最小元素](#/C/南开100题C语言版?id=_013-求出二维函数组每列中最小元素)

【题目】请编写一个函数void fun(int tt [M] [N] ,int pp[N]),tt指向一个M行N列的二维函数组，求出二维函数组每列中最小元素，并依次放入pp所指定一维数组中。二维数组中的数已在主函数中赋予。

【代码】

```c
#include <stdio.h>
#define M 3
#define N 3

void fun(int tt[M][N], int pp[N]) {
    int i, j, min;
    for (j = 0; j < N; j++) {
        min = tt[0][j];
        for (i = 1; i < N; i++) {
            if (tt[i][j] < min) {
                min = tt[i][j];
            }
        }
        pp[j] = min;
    } 
}

int main() {
    int a[][3] = {{1,2,3},{2,3,4},{3,4,5}};
    int b[3];
    fun(a, b);
    int i;
    for (i = 0; i < 3; i++) {
        printf("%d ", b[i]);
    }
    return 0;
}
```

## [014 二维数组周边元素之和，作为函数值返回](#/C/南开100题C语言版?id=_014-二维数组周边元素之和，作为函数值返回)

【题目】请别写函数fun,函数的功能使求出二维数组周边元素之和，作为函数值返回。二维数组中的值在主函数中赋予。

【代码】

```c
#include <stdio.h>
#define N 3

int fun(int w[][N]) {
    int i, j;
    int s = 0;
    for (i = 0; i < N; i++) {
        s += w[0][i];
    } 
    for (i = 0; i < N; i++) {
        s += w[N - 1][i];
    } 
    for (i = 0; i < N; i++) {
        s += w[i][0];
    } 
    for (i = 0; i < N; i++) {
        s += w[i][N - 1];
    } 
    s = s - w[0][0] - w[0][N - 1] - w[N - 1][0] - w[N - 1][N - 1];
    return s;
}  

int main() {
    int a[][3] = {{1,2,3},{2,3,4},{3,4,5}};
    printf("%d", fun(a));
    return 0;
}
```

## [015 w后n－1位的数作为函数值返回](#/C/南开100题C语言版?id=_015-w后n－1位的数作为函数值返回)

【题目】请编写一个函数unsigned fun(unsigned w),w使一个大于10的无符号整数，若w是n(n≥2)位的整数，则函数求出w后n－1位的数作为函数值返回。

【代码】

```c
#include <stdio.h>

unsigned fun(unsigned w) {
    unsigned t, s = 0, s1 = 1;
    t = w;    
    while (t > 10) {
        s = s + t % 10 * s1;
        s1 = s1 * 10;
        t = t / 10;
    }
    return s;
}

int main() {
    unsigned t = 123;
    printf("%u", fun(t));
    return 0;
}
```

## [016 值保留2位小数](#/C/南开100题C语言版?id=_016-值保留2位小数)

【题目】请编写一个函数float fun(double h),函数的功能使对变量h中的值保留2位小数，并对第三位进行四舍五入(规定h中的值位正数)。

【代码】

```c
#include <stdio.h>

float fun(double h) {
    int t;
    float s;
    h = h * 1000;
    t = (h + 5) / 10;
    s = t / 100.0;
    return s;
}

int main() {
    printf("%.2lf\n", 123.4567);
    printf("%.2lf", fun(123.4567));
    return 0;
}
```

## [017 字符串中的内容逆置](#/C/南开100题C语言版?id=_017-字符串中的内容逆置)

【题目】请编写一个函数fun(char *s)，该函数的功能使把字符串中的内容逆置。

【代码】

```c
#include <stdio.h>
#include <string.h>

void fun(char *s) {
    char ch;
    int i;
    for (i = 0; i < (strlen(s) - 1) / 2; i++) {
        ch = s[i];
        s[i] = s[strlen(s) - 1 - i];
        s[strlen(s) - 1 - i] = ch;
    }
}

int main() {
    char s[100];
    gets(s);
    fun(&s);
    puts(s);
    return 0;
}
```

## [018 矩阵(3行3列)的转置](#/C/南开100题C语言版?id=_018-矩阵3行3列的转置)

【题目】编写程序，实现矩阵(3行3列)的转置(即行列互换)。

【代码】

```c
#include <stdio.h>

void fun(int array[3][3]) {
    int i, j, temp;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < i; j++) {
            temp = array[i][j];
            array[i][j] = array[j][i];
            array[j][i] = temp;
        }
    }
}

int main() {
    int s[3][3];
    int i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            scanf("%d", &s[i][j]);
        }
    }
    fun(s);
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            printf("%d ", s[i][j]);
        }
        printf("\n");
    }
    return 0;
}
```

## [019 从字符中删除指定的字符](#/C/南开100题C语言版?id=_019-从字符中删除指定的字符)

【题目】编写函数fun,该函数的功能是：从字符中删除指定的字符，同一字母的大、小写按不同字符处理。

【代码】

```c
#include <stdio.h>

void fun(char s[], char c) {
    int i = 0;
    char *p;
    p = s;
    while (*p) {
        if ((*p) != c) {
            s[i++] = *p;
        } 
        p++;
    }
    s[i] = '\0';
}

int main() {
    char s[100];
    gets(s);
    puts(s);
    char c = 'a';
    fun(s, c);
    puts(s);
    return 0;
}
```

## [020 求出小于或等于lim的所有素数并放在aa数组中](#/C/南开100题C语言版?id=_020-求出小于或等于lim的所有素数并放在aa数组中)

【题目】编写函数int fun(int lim,int aa[MAX]),该函数的功能是求出小于或等于lim的所有素数并放在aa数组中，该函数返回所求的素数的个数。

【代码】

```c
#include <stdio.h>
#include <math.h>
#define Max 100

int fun(int lim, int aa[Max]) {
    int i, j, k = 0;
    for (i = 2; i <= lim; i++) {
        for (j = 2; j <= sqrt(i); j++) {
            if (i % j == 0) {
                break;
            }
        }
        if (j > sqrt(i)) {
            aa[k++] = i;
        }
    }
    return k;
}

int main() {
    int lim = 9;
    int aa[Max];
    int k = fun(lim, aa);
    printf("%d\n", k);
    int i; 
    for (i = 0; i < k; i++) {
        printf("%d ", aa[i]);
    }
    return 0;
}
```

## [021 字符按ASCII码降序排列](#/C/南开100题C语言版?id=_021-字符按ascii码降序排列)

【题目】请编写函数fun,对长度为7个字符的字符串，除首尾字符外，将其余5个字符按ASCII码降序排列。

【代码】

```c
#include <stdio.h>

void fun(char *s, int num) {
    char t;
    int i, j;
    for (i = 1; i < num - 2; i++) {
        for (j = i + 1; j < num - 1; j++) {
            if (s[i] - s[j] < '0') {
                t = s[i];
                s[i] = s[j];
                s[j] = t;
            }
        }
    }
} 

int main() {
    char s[7] = "HelloCC";
    fun(&s, 7);
    int i;
    for (i = 0; i < 7; i++) {
        printf("%c ", s[i]);
    }
    return 0;
}
```

## [022 带头节点的链表结构求最高分](#/C/南开100题C语言版?id=_022-带头节点的链表结构求最高分)

【题目】N名学生的成绩已在主函数中放入一个带头节点的链表结构中，h指向链表的头节点。请编写函数fun，它的功能是：找出学生的最高分，由函数值返回。

【代码】

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct student {
    struct student *next;
    double score;
} Student;

double fun(Student *h) {
    double max;
    Student *q = h;
    max = h->score;
    do {
        if (q->score > max) {
            max = q->score;
        }
        q = q->next;
    } while (q);
    return max;
}

Student *Create() {
    double score;
    scanf("%lf", &score);
    Student *student;
    if (score == -1) {
        return NULL;
    } else {
        student = (Student *)malloc(sizeof(Student));
        student->score = score;
        student->next = Create();
    }
    return student;
}

int main() {
    Student *h;
    h = Create();
    double max = fun(&h);
    printf("%lf", max);
    return 0;
}
```

## [023 判断字符串是否为回文](#/C/南开100题C语言版?id=_023-判断字符串是否为回文)

【题目】请编写函数fun，该函数的功能是：判断字符串是否为回文?若是则函数返回1，主函数中输出YES，否则返回0，主函数中输出NO。回文是指顺读和倒读都是一样的字符串。

【代码】

```c
#include <stdio.h>

int fun(char *str) {
    int i, n = 0, flag = 1;
    char *p = str;
    while (*p) {
        n++;
        p++;
    }
    for (i = 0; i < n / 2; i++) {
        if (str[i] != str[n - 1 - i]) {
            flag = 0;
            break;
        }
    }
    return flag;
}

int main() {
    char str[100];
    gets(str);
    if (fun(&str) == 1) {
        printf("true"); 
    } else {
        printf("false");
    }
    return 0;
}
```

## [024 将一个字符串转换为一个整数](#/C/南开100题C语言版?id=_024-将一个字符串转换为一个整数)

【题目】请编写一个函数fun，它的功能是：将一个字符串转换为一个整数(不得调用C语言提供的将字符串转换为整数的函数)。

【代码】

```c
#include <stdio.h>
#include <string.h>

long fun(char *p) {
    long s = 0, t;
    int i = 0, j, n = strlen(p), k, s1;
    if (p[0] == '-') {
        i++;
    }
    for (j = i; j < n; j++) {
        t = p[j] - '0';
        for (k = j; k < n - 1; k++) {
            t *= 10;
        }
        s += t;
    }
    if (p[0] == '-') {
        return -s;
    }
    return s;
}

int main() {
    char a[100];
    gets(a);
    printf("%ld", fun(&a));
    return 0;
}
```

## [025 函数返回较长的字符串](#/C/南开100题C语言版?id=_025-函数返回较长的字符串)

【题目】请编写一个函数fun，它的功能是：比较两个字符串的长度，(不得调用C语言提供的求字符串长度的函数)，函数返回较长的字符串。若两个字符串长度相同，则返回第一个字符串。

【代码】

```c
#include <stdio.h>

char *fun(char *s, char *t) {
    char *p, *s1 = s, *t1 = t;
    int n = 0, m = 0;
    while (*s1) {
        n++;
        s1++;
    }
    while (*t1) {
        m++;
        t1++;
    }
    if (n >= m) {
        p = s;
    } else {
        p = t;
    }
    //puts(p);
    return p;
}

int main() {
    char a[100];
    gets(a);
    char b[100];
    gets(b);
    char *c;    
    c = fun(a, b);
    puts(c);

    return 0;
}
```

## [026 根据公式求值](#/C/南开100题C语言版?id=_026-根据公式求值)

【题目】请编写一个函数fun，它的功能是：根据以下公式求X的值(要求满足精度0.0005，即某项小于0.0005时停止迭代)：

X/2=1+1/3+1×2/3×5+1×2×3/3×5×7+1×2×3×4/3×5×7×9+...+1×2×3×...×n/3×5×7×(2n+1)

程序运行后，如果输入精度0.0005，则程序输出为3.14...。

【代码】

```c
#include <stdio.h>

double fun(double eps) {
    double s = 1.0, n = 1.0, x = 0;
    while (fabs(s) >= eps) {
        x += s;
        s *= n / (2 * n + 1);
        n++;
    }
    x = x * 2;
    return x;
}

int main() {
    printf("%lf", fun(0.0005));
    return 0;
}
```

## [027 整数放在数组a中，返回数的个数](#/C/南开100题C语言版?id=_027-整数放在数组a中，返回数的个数)

【题目】请编写一个函数fun,它的功能是：求出1到m之内(含m)能被7或11整除的所有整数放在数组a中，通过n返回这些数的个数。

【代码】

```c
#include <stdio.h>

void fun(int m, int *a, int *n) {
    int i, j = 0;
    *n = 0;
    for (i = 1; i <= m; i++) {
        if (i % 7 == 0 || i % 11 == 0) {
            a[j] = i;
            j++;
        }
    }
    *n = j;
}

int main() {
    int a[100];
    int m = 12;
    int n;
    fun(m, a, &n);
    printf("%d", n);
    return 0;
}
```

## [028 找出一维整型数组元素中最大的值和它所在的下标](#/C/南开100题C语言版?id=_028-找出一维整型数组元素中最大的值和它所在的下标)

【题目】请编写一个函数fun，它的功能是：找出一维整型数组元素中最大的值和它所在的下标，最大的值和它所在的下标通过形参传回。数组元素中的值已在主函数中赋予。主函数中x是数组名，n是x中的数据个数，max存放最大值，index存放最大值所在元素的下标。

【代码】

```c
#include <stdio.h>

void fun(int a[], int n, int *max, int *index) {
    int i;
    *max = a[0];
    *index = 0;
    for (i = 0; i < n; i++) {
        if (a[i] > *max) {
            *max = a[i];
            *index = i;
        }
    }    
}

int main() {
    int a[] = {1,2,5,4};
    int max, index;
    fun(a, 4, &max, &index);
    printf("a[%d] = %d", index, max);
    return 0;
}
```

## [029 字符串换字母](#/C/南开100题C语言版?id=_029-字符串换字母)

【题目】请编写一个函数fun，它的功能是：将ss所指字符串中所有下标为奇数位置上的字母转换为大写(若该位置上不是字母，则不转换)。

【代码】

```c
#include <stdio.h>
#include <string.h>

void fun(char *ss) {
    int i, n = strlen(ss);
    for (i = 0; i < n; i++) {
        if (i % 2 != 0) {
            if (ss[i] >= 'a' && ss[i] <= 'z') {
                ss[i] -= 32;
            }
        }

    }
}

int main() {
    char a[100];
    gets(a);
    fun(a);
    puts(a);
    return 0;
}
```

## [030 求二维数组中最大元素](#/C/南开100题C语言版?id=_030-求二维数组中最大元素)

【题目】请编写一个函数fun，它的功能是：求出一个2×M整型二维数组中最大元素的值，并将此值返回调用函数。

【代码】

```c
#include <stdio.h>
#define M 2

int fun(int a[][M]) {
    int i, j, max = a[0][0];
    for (i = 0; i < 2; i++) {
        for (j = 0; j < M; j++) {
            if (a[i][j] >max) {
                max = a[i][j];
            }
        }
    }
    return max;
}

int main() {
    int a[2][M];
    int i, j;
    for (i = 0; i < 2; i++) {
        for (j = 0; j < M; j++) {
            scanf("%d", &a[i][j]);
        }
    }
    int max = fun(a);
    printf("%d", max);

    return 0;
}
```

## [031 查找字符并删除](#/C/南开100题C语言版?id=_031-查找字符并删除)

【题目】请编写函数fun，其功能是：将s所指字符串中除了下标为偶数、同时ASCII值也为偶数的字符外，其余的全都删除；串中剩余字符所形成的一个新串放在t所指的一个数组中。

【代码】

```c
#include <stdio.h>
#include <string.h> 

void fun(char *s, char t[]) {
    int i, j = 0, n = strlen(s);
    for (i = 0; i < n; i++) {
        if (i % 2 == 0 && s[i] % 2 == 0) {
            t[j++] = s[i];
        }
    }
    t[j] = '\0';
} 
//测试
int main() {
    char s[100];
    char t[100];
    gets(s);
    fun(s, t);
    puts(t);
    return 0;
}
```

## [032 查找字符并删除](#/C/南开100题C语言版?id=_032-查找字符并删除)

【题目】请编写函数fun，其功能是：将s所指字符串中除了下标为奇数、同时ASCII值也为奇数的字符之外，其余的所有字符都删除，串中剩余字符所形成的一个新串放在t所指的一个数组中。

【代码】

```c
#include <stdio.h>
#include <string.h> 

void fun(char *s, char t[]) {
    int i, j = 0, n = strlen(s);
    for (i = 0; i < n; i++) {
        if (i % 2 != 0 && s[i] % 2 != 0) {
            t[j++] = s[i];
        }
    }
    t[j] = '\0';
} 

int main() {
    char s[100];
    char t[100];
    gets(s);
    fun(s, t);
    puts(t);
    return 0;
}
```

## [033 将字符串中的前导 * 号全部删除](#/C/南开100题C语言版?id=_033-将字符串中的前导-号全部删除)

【题目】假定输入的字符串中只包含字母和 * 号。请编写函数 fun()，它的功能是：将字符串中的前导 * 号全部删除，中间和后面的 * 号不删除。

【代码】

```c
#include <stdio.h>
#include <string.h> 

void fun(char *a) {
    char *p=a;
    while (*p== '*') {
        p++;
    }
    strcpy (a,p);
} 

int main() {
    char a[100];
    gets(a);
    fun(a);
    puts(a);
    return 0;
}
```

## [035 把分数最高的学生数据放在h所指的数组中](#/C/南开100题C语言版?id=_035-把分数最高的学生数据放在h所指的数组中)

【题目】学生的记录由学号和成绩组成，N名学生的数据已在主函数中放入结构体数组s中，请编写函数fun，它的功能使：把分数最高的学生数据放在h所指的数组中，注意：分数最高的学生可能不止一个，函数返回分数最高的学生的人数。

【代码】

```c
#include <stdio.h>
#include <stdlib.h>
#define N 3

typedef struct student {
    int id;
    double score;
} Student;

int fun(Student s[], Student t[] ) {
    double max;
    int i, j = 0;
    max = s[0].score;
    for (i = 1; i < N; i++) {
        if (s[i].score > max) {
            max = s[i].score;
        }
    }
    for (i = 0; i < N; i++) {
        if (s[i].score == max) {
            t[j].score = s[i].score;
            t[j].id = s[i].id;
            j++;
        }
    }
    return j;
}

int main() {
    Student s[N];
    double score;
    int id;
    int i;
    for (i = 0; i < N; i++) {    
        scanf("%d %lf", &id, &score);
        s[i].score = score;
        s[i].id = id;
    }
    Student t[100];
    printf("%d", fun(s, t));
    return 0;
}
```

## [035 删除字符串中的所有空格](#/C/南开100题C语言版?id=_035-删除字符串中的所有空格)

【题目】请编写一个函数，用来删除字符串中的所有空格。

【代码】

```c
#include <stdio.h>

void fun(char *str) {
    int i = 0;
    char *p = str;
    while (*p) {
        if (*p != ' ') {
            str[i++] = *p;
        }
        p++;
    }
    str[i] = '\0';
}

int main() {
    char a[100];
    gets(a);
    fun(a);
    puts(a);
    return 0;
}
```

## [038 求出ss所指字符串中指定字符的个数，并返回此值。](#/C/南开100题C语言版?id=_038-求出ss所指字符串中指定字符的个数，并返回此值。)

【题目】请编写函数fun，它的功能是：求出ss所指字符串中指定字符的个数，并返回此值。

【代码】

```c
#include <stdio.h>

int fun(char *a, char c) {
    int n = 0;
    while (*a) {
        if (*a == c) {
            n++;
        }
        a++;
    }
    return n;
}

int main() {
    char a[100];
    gets(a);
    int num = fun(a, 'c');
    printf("%d", num);
    return 0;
}
```

## [039 移动一维数组中的内容](#/C/南开100题C语言版?id=_039-移动一维数组中的内容)

【题目】请编写函数fun，该函数的功能是：移动一维数组中的内容，若数组中由n个整数，要求把下标从0到p(p小于等于n－1)的数组元素平移到数组的最后。

【代码】

和 40 题差不多

## [040 移动字符串中内容](#/C/南开100题C语言版?id=_040-移动字符串中内容)

【题目】请编写函数fun，该函数的功能是移动字符串中内容，移动的规则如下：把第1到第m个字符，平移到字符串的最后，把第m＋1到最后的字符移到字符串的前部。

【代码】

```c
#include <stdio.h>
#include <string.h>
#define N 100

void fun(char *w, int m) {
    char b[N];
    int n = strlen(w);
    int i, j = 0;
    for (i = 0; i < m; i++) {
        b[j] = w[i];
        j++;
    }
    for (i = 0; i < n - m; i++) {
        w[i] = w[i + m];
    }
    for (j = 0; j < m; j++) {
        w[i++] = b[j];
    }
    w[i] = '\0';
}

int main() {
    char a[N];
    gets(a);
    fun(a, 3);
    puts(a);
    return 0;
}
```



## [095](#/C/南开100题C语言版?id=_095)

【题目】假定输入的字符串中只包含字母和 * 号。请编写函数fun，它的功能是：使字符串中尾部的 * 号不得多于n个；若多于n个，则删除多于的 * 号；若少于或等于n个，则什么也不做，字符串中间和前面的 * 号不删除。

【代码】

## [096 相邻两个元素之平均值的平方根之和](#/C/南开100题C语言版?id=_096-相邻两个元素之平均值的平方根之和)

【题目】请编写函数fun，其功能使：计算并输出给定数组(长度为9)中每相邻两个元素之平均值的平方根之和

【代码】

```c
#include <stdio.h> 
#include <math.h>

double fun(double a[9]) {
    int i, j = 1;
    double s = 0.0;
    for (i = 0; i < 9; i++) {
        if (j <= 8) {
            s += sqrt((a[i] + a[i + 1]) / 2);
            j++;
        }
    }
    return s;
}

int main() {
    double a[9] = {1,1,1,1,1,1,1,1,1};
    printf("%lf\n", fun(a));
    return 0;
}
```

## [097 计算并输出下列多项式值](#/C/南开100题C语言版?id=_097-计算并输出下列多项式值)

【题目】请编写函数fun，其功能是：计算并输出下列多项式值：s=1+1/(1+2)+1/(1+2+3)+..1/(1+2+3...+50)

【代码】

```c
#include <stdio.h> 

double fun(int n) {
    int i, j, t;
    double s = 0.0;
    for (i = 1; i <= n; i++) {
        t = 0;
        for (j = 1; j <= i; j++) {
            t += j;
        }
        s += 1.0/t;
    }
    return s;
}

int main() {
    printf("%lf\n", fun(10));
    return 0;
}
```

## [098 倒数之和](#/C/南开100题C语言版?id=_098-倒数之和)

【题目】请编写函数fun，它的功能是：计算并输出n(包括n)以内能被5或9整除的所有自然数的倒数之和。

【代码】

```c
#include <stdio.h> 
#include <math.h>

double fun(int n) {
    int i;
    double s = 0.0;
    for (i = 1; i <= n; i++) {
        if (i % 5 == 0 || i % 9 == 0) {
            s += 1.0 / i;
        }
    }
    return s;
}

int main() {
    printf("%lf\n", fun(10));
    return 0;
}
```

## [099 素数的平方根之和](#/C/南开100题C语言版?id=_099-素数的平方根之和)

【题目】请编写函数fun，其功能是：计算并输出3到n之间所有素数的平方根之和。

【代码】

```c
#include <stdio.h> 
#include <math.h>

double fun(int n) {
    int i, j;
    double s = 0.0;
    for (i = 3; i <= n; i++) {
        for (j = 2; j <= sqrt(i); j++) {
            if (i % j == 0) {
                break;
            } 
        }
        if (j > sqrt(i) ) {
            s += sqrt(i);
        }
    }
    return s;
}

int main() {
    printf("%lf\n", fun(5));
    return 0;
}
```

## [100 计算并输出 s](#/C/南开100题C语言版?id=_100-计算并输出-s)

【题目】请编写函数fun，其功能是：计算并输出s=1+(1+2^(0.5))+(1+2 ^ (0.5)+3 ^ (0.5))+...+(1+2 ^ (0.5)+3 ^ (0.5)+...+n ^ (0.5))

【代码】

```c
#include <stdio.h> 
#include <math.h>

double fun(int n) {
    int i;
    double s = 1.0, p = 1.0;
    for (i = 2; i <= n; i++) {
        p += pow(i, 0.5);
        s += p;
    }
    return s;
}

int main() {
    printf("%lf\n", fun(2));
    return 0;
}
```