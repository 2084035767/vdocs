# 外星人入侵——（python 编程：从入门到实践）

## 安装 pygame

在 Windows 下打开 cmd 窗口，输入以下命令

```sh
pip3 install pygame
```

## 创建 pygame 窗口以及响应用户输入

新建`alien_invasion.py`文件创建一个游戏窗口，首先`pygame.init()`初始化游戏再创建窗口，`pygame.event.get()`监视用户的事件， `pygame.display.flip()`绘制屏幕

```python
import sys
import pygame


def run_game():
    # 初始化游戏并创建一个屏幕对象
    pygame.init()
    screen = pygame.display.set_mode()
    # 窗口的标题
    pygame.display.set_caption("Alien Invasion")
    # 设置游戏背景色
    bg_color = (230,230,230)

    # 开始游戏的主循环
    while True:

        # 监视键盘和鼠标事件
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
        # 每次循环时都重绘屏幕
        screen.fill(bg_color)
        # 让最近绘制的屏幕可见
        pygame.display.flip()


run_game()

```



## 创建设置类

新建`settings.py`文件通过创建设置类方便用户设置，集中游戏的设置来简化函数

```python
class Settings():
    """储存游戏设置的类"""

    def __init__(self):
        """初始化游戏的设置"""
        # 屏幕设置
        self.screen_width = 1200
        self.screen_height = 800
        self.bg_color = (230, 230, 230)

```

修改`alien_invasion.py`文件

```python
import sys
import pygame

from sttings import Settings

def run_game():
    # 初始化游戏并创建一个屏幕对象
    pygame.init()
    ai_settings = Settings
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    # 窗口的标题
    pygame.display.set_caption("Alien Invasion")

    # 开始游戏的主循环
    while True:

        # 监视键盘和鼠标事件
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
        # 每次循环时都重绘屏幕
        screen.fill(ai_settings.bg_color)
        # 让最近绘制的屏幕可见
        pygame.display.flip()


run_game()
```

## 创建 ship 类

新建`ship.py`文件，创建飞船类，管理飞船的大部分行为

```python
import pygame


class Ship():

    def __init__(self, screen):
        """初始化飞船并设置其初始位置"""
        self.screen = screen

        # 加载飞船图像并获取其外接矩形
        self.image = pygame.image.load('img/ship.bmp')
        self.rect = self.image.get_rect()
        self.screen_rect = screen.get_rect()

        # 将每艘新飞船放在屏幕底部中央
        self.rect.centerx = self.screen_rect.centerx
        self.rect.bottom = self.screen_rect.bottom

    def blitme(self):
        """在指定位置绘制飞船"""
        self.screen.blit(self.image, self.rect)
```

修改`alien_invasion.py`文件

```python
import sys
import pygame

from settings import Settings
from ship import Ship


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(screen)

    # 开始游戏的主循环
    while True:

        # 监视键盘和鼠标事件
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
        # 每次循环时都重绘屏幕
        screen.fill(ai_settings.bg_color)
        ship.blitme()
        # 让最近绘制的屏幕可见
        pygame.display.flip()


run_game()
```

## 重构：模块 game_functions

新建`game_functions.py`文件，为避免`alien_invasion.py`文件太长，用`game_functions.py`文件储存游戏的其他大量函数

### check_events()函数

通过创建 check_events()函数来响应按键和鼠标事件

```python
import sys
import pygame

def check_events():
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
```

修改`alien_invasion.py`文件

```python
import pygame

from settings import Settings
from ship import Ship

import game_functions as gf


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(screen)

    # 开始游戏的主循环
    while True:
        gf.check_events()
        # 每次循环时都重绘屏幕
        screen.fill(ai_settings.bg_color)
        ship.blitme()
        # 让最近绘制的屏幕可见
        pygame.display.flip()


run_game()
```

### update_screen()函数

通过创建 update_screen()函数来更新屏幕上的图像，并切换到新屏幕

```python
def update_screen(ai_settings, screen, ship):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    ship.blitme()

    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

修改`alien_invasion.py`文件

```python
import pygame

from settings import Settings
from ship import Ship

import game_functions as gf


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(screen)

    # 开始游戏的主循环
    while True:
        gf.check_events()
        gf.update_screen(ai_settings, screen, ship)


run_game()
```

## 响应按键

每次按键都被注册为一个 KEYDOWN 事件，检查按下的是否是特定的键，如果按下的是右箭头键，我们就增大飞船的 rect.centerx 值，将飞船向右移动；按下的是左箭头键，我们就减小飞船的 rect.centerx 值，将飞船向左移动

```python
def check_events(ship):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                # 向右移动飞船
                ship.rect.centerx += 1
            elif event.key == pygame.K_LEFT:
                # 向左移动飞船
                ship.rect.centerx -= 1
```

用 KEYDOWN 和 KEYUP 事件，以及一个名为 moving_right 的标志来实现持续移动。 飞船不动时，标志 moving_right 将为 False。玩家按下右箭头键时，我们将这个标志设置为 True；而玩家松开时，我们将这个标志重新设置为 False

ship.py

```python
# 移动标志
    self.moving_right = False
    self.moving_left = False

def update(self):
    """根据移动标志调整飞船的位置"""
    if self.moving_right:
        self.rect.centerx += 1
    elif self.moving_left:
        self.rect.centerx -= 1
```

agme

```python
elif event.type == pygame.KEYDOWN:
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True

elif event.type == pygame.KEYUP:
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False
```

## 调整飞船的速度

```python
self.ship_speed_factor = 1.5
```





```python
import pygame


class Ship:

    def __init__(self, ai_settings, screen):
        """初始化飞船并设置其初始位置"""
        self.screen = screen
        self.ai_settings = ai_settings

        # 加载飞船图像并获取其外接矩形
        self.image = pygame.image.load('img/ship.bmp')
        self.rect = self.image.get_rect()
        self.screen_rect = screen.get_rect()

        # 将每艘新飞船放在屏幕底部中央
        self.rect.centerx = self.screen_rect.centerx
        self.rect.bottom = self.screen_rect.bottom

        # 在飞船的属性center中存储小数值
        self.center = float(self.rect.centerx)

        # 移动标志
        self.moving_right = False
        self.moving_left = False

    def update(self):
        """根据移动标志调整飞船的位置"""
        # 更新飞船的center值，而不是rect
        if self.moving_right:
            self.center += self.ai_settings.ship_speed_factor
        elif self.moving_left:
            self.center -= self.ai_settings.ship_speed_factor

        # 根据self.center更新rect对象
        self.rect.centerx = self.center

    def blitme(self):
        """在指定位置绘制飞船"""
        self.screen.blit(self.image, self.rect)

```

```python
# 创建一艘飞船
ship = Ship(ai_settings, screen)
```

## 限制飞船的活动范围



```python
def update(self):
    """根据移动标志调整飞船的位置"""
    # 更新飞船的center值，而不是rect
    if self.moving_right and self.rect.right < self.screen_rect.right:
        self.center += self.ai_settings.ship_speed_factor
    elif self.moving_left and self.rect.left > 0:
        self.center -= self.ai_settings.ship_speed_factor
```

## 重构 check_events()

```python
import sys
import pygame


def check_keydown_event(event, ship):
    """响应按键"""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
        pass


def check_keyup_events(event, ship):
    """响应松开"""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False


def check_events(ship):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_event(event, ship)
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)


def update_screen(ai_settings, screen, ship):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    ship.blitme()

    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

## 射击

### 添加子弹设置

```python
# 子弹设置
self.bullet_speed_factor = 1
self.bullet_width = 3
self.bullet_height = 15
self.bullet_color = 60, 60, 60
```

### 创建 Bullet 类

```python
import pygame
from pygame import Sprite


class Bullet(Sprite):
    """一个对飞船发射的子弹进行管理的类"""

    def __init__(self, ai_settings, screen, ship):
        """在飞船所处的位置创建一个子弹对象"""
        super(Bullet, self).__init__()
        self.screen = screen

        # 在(0,0)处创建一个表示子弹的矩形，再设置正确的位置
        self.rect = pygame.Rect(0, 0, ai_settings.bullet_width, ai_settings.bullet_height)
        self.rect.centerx = ship.rect.centerx
        self.rect.top = ship.rect.top

        # 存储用小数表示的子弹位置
        self.y = float(self.rect.y)

        self.color = ai_settings.bullet_color
        self.speed_factor = ai_settings.bullet_speed_factor
```

```python
    def update(self):
        """"向上移动子弹"""
        # 更新表示子弹位置的小数值
        self.y -= self.speed_factor
        # 更新表示子弹的rect的位置
        self.rect.y = self.y

    def draw_bullet(self):
        """在屏幕上绘制子弹"""
        pygame.draw.rect(self.screen, self.color, self.rect)
```



## 将子弹存储到编组中

```python
import pygame
from pygame.sprite import Group
from settings import Settings
from ship import Ship

import game_functions as gf


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(ai_settings, screen)
    # 创建一个用于存储子弹的编组
    bullets = Group()

    # 开始游戏的主循环
    while True:
        gf.check_events(ai_settings, screen, ship, bullets)
        ship.update()
        bullets.update()
        gf.update_screen(ai_settings, screen, ship, bullets)


run_game()
```

### 开火

```python
import sys
import pygame
from bullet import Bullet


def check_keydown_events(event, ai_settings, screen, ship, bullets):
    """响应按键"""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        # 创建一颗子弹，并将其加入到编组bullets中
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)


def check_keyup_events(event, ship):
    """响应松开"""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = False
    elif event.key == pygame.K_LEFT:
        ship.moving_left = False


def check_events(ai_settings, screen, ship, bullets):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_events(event, ai_settings, screen, ship, bullets)
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)


def update_screen(ai_settings, screen, ship, bullets):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    # 在飞船和外星人后面重绘所有子弹
    for bullet in bullets.sprites():
        bullet.draw_bullet()
    ship.blitme()

    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

### 删除已消失的子弹

```python
# 开始游戏的主循环
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()

    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)
    print(len(bullets))

    gf.update_screen(ai_settings, screen, ship, bullets)
```

### 限制子弹数量

```python
# 子弹设置
self.bullet_speed_factor = 1
self.bullet_width = 3
self.bullet_height = 15
self.bullet_color = 60, 60, 60
self.bullets_allowed = 3
```

```python
elif event.key == pygame.K_SPACE:
    # 创建一颗子弹，并将其加入到编组bullets中
    if len(bullets) < ai_settings.bullets_allowed:
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)
```

### 创建函数 update_bullets()

```python
def update_bullets(bullets):
    """更新子弹的位置，并删除已消失的子弹"""
    # 更新子弹的位置
    bullets.update()

    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)
```

```python
# 开始游戏的主循环
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_bullets(bullets)
    gf.update_screen(ai_settings, screen, ship, bullets)
```

### 创建函数 fire_bullet()

```python
def fire_bullet(ai_settings, screen, ship, bullets):
    """如果还没有到达限制，就发射一颗子弹"""
    # 创建新子弹，并将其加入到编组bullets中
    if len(bullets) < ai_settings.bullets_allowed:
        new_bullet = Bullet(ai_settings, screen, ship)
        bullets.add(new_bullet)
```

```python
def check_keydown_events(event, ai_settings, screen, ship, bullets):
    """响应按键"""
    if event.key == pygame.K_RIGHT:
        ship.moving_right = True
    elif event.key == pygame.K_LEFT:
        ship.moving_left = True
    elif event.key == pygame.K_SPACE:
        fire_bullet(ai_settings, screen, ship, bullets)
```

## 创建第一个外星人

### 创建 Alien 类

```python
import pygame
from pygame.sprite import Sprite


class Alien(Sprite):
    """表示单个外星人的类"""

    def __init__(self, ai_settings, screen):
        """初始化外星人并设置其起始位置"""
        super(Alien, self).__init__()
        self.screen = screen
        self.ai_settings = ai_settings

        # 加载外星人图像，并设置其rect属性
        self.image = pygame.image.load('img/alien.bmp')
        self.rect = self.image.get_rect()

        # 每个外星人最初都在屏幕左上角附近
        self.rect.x = self.rect.width
        self.rect.y = self.rect.height

        # 存储外星人的准确位置
        self.x = float(self.rect.x)

    def blitme(self):
        """在指定位置绘制外星人"""
        self.screen.blit(self.image, self.rect)
```

```python
import pygame
from alien import Alien
from pygame.sprite import Group
from settings import Settings
from ship import Ship

import game_functions as gf


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船
    ship = Ship(ai_settings, screen)
    # 创建一个用于存储子弹的编组
    bullets = Group()
    # 创建一个外星人
    alien = Alien(ai_settings, screen)

    # 开始游戏的主循环
    while True:
        gf.check_events(ai_settings, screen, ship, bullets)
        ship.update()
        bullets.update()
        gf.update_bullets(bullets)
        gf.update_screen(ai_settings, screen, ship, alien, bullets)


run_game()
```

```python
def update_screen(ai_settings, screen, ship, alien, bullets):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    # 在飞船和外星人后面重绘所有子弹
    for bullet in bullets.sprites():
        bullet.draw_bullet()
    ship.blitme()
    alien.blitme()
    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

### 创建多行外星人

```python
# 创建一艘飞船、一个子弹编组和一个外星人编组
ship = Ship(ai_settings, screen)
bullets = Group()
aliens = Group
# 创建外星人群
gf.create_fleet(ai_settings, screen, aliens)

# 开始游戏的主循环
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_bullets(bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

```python
def update_screen(ai_settings, screen, ship, aliens, bullets):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    # 在飞船和外星人后面重绘所有子弹
    for bullet in bullets.sprites():
        bullet.draw_bullet()
    ship.blitme()
    aliens.draw(screen)
    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

### 创建外星人群

```plain
# 创建一艘飞船、一个子弹编组和一个外星人编组
ship = Ship(ai_settings, screen)
bullets = Group()
aliens = Group()
# 创建外星人群
gf.create_fleet(ai_settings, screen, aliens)

# 开始游戏的主循环
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_bullets(bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

```plain
def create_fleet(ai_settings, screen, aliens):
    """创建外星人群"""
    # 创建一个外星人，并计算一行可容纳多少个外星人
    # 外星人间距为外星人宽度
    alien = Alien(ai_settings, screen)
    alien_width = alien.rect.width
    available_space_x = ai_settings.screen_width - 2 * alien_width
    number_aliens_x = int(available_space_x / (2 * alien_width))

    # 创建第一行外星人
    for alien_number in range(number_aliens_x):
        # 创建一个外星人并将其加入当前行
        alien = Alien(ai_settings, screen)
        alien.x = alien_width + 2 * alien_width * alien_number
        alien.rect.x = alien.x
        aliens.add(alien)
```

### 重构 create_fleet()

```plain
def get_number_aliens_x(ai_settings, alien_width):
    """计算每行可容纳多少个外星人"""
    available_space_x = ai_settings.screen_width - 2 * alien_width
    number_aliens_x = int(available_space_x / (2 * alien_width))
    return number_aliens_x


def create_alien(ai_settings, screen, aliens, alien_number):
    """创建一个外星人并将其放在当前行"""
    # 创建一个外星人并将其加入当前行
    alien = Alien(ai_settings, screen)
    alien_width = alien.rect.width
    alien.x = alien_width + 2 * alien_width * alien_number
    alien.rect.x = alien.x
    aliens.add(alien)


def create_fleet(ai_settings, screen, aliens):
    """创建外星人群"""
    # 创建一个外星人，并计算一行可容纳多少个外星人
    alien = Alien(ai_settings, screen)
    number_aliens_x = get_number_aliens_x(ai_settings, alien.rect.width)

    # 创建第一行外星人
    for alien_number in range(number_aliens_x):
        create_alien(ai_settings, screen, aliens, alien_number)
```

### 添加行

```plain
def get_number_rows(ai_settings, ship_height, alien_height):
    """计算屏幕可容纳多少行外星人"""
    available_space_y = (ai_settings.screen_height -
                         (3 * alien_height) - ship_height)
    number_rows = int(available_space_y / (2 * alien_height))
    return number_rows


def get_number_aliens_x(ai_settings, alien_width):
    """计算每行可容纳多少个外星人"""
    available_space_x = ai_settings.screen_width - 2 * alien_width
    number_aliens_x = int(available_space_x / (2 * alien_width))
    return number_aliens_x


def create_alien(ai_settings, screen, aliens, alien_number, row_number):
    """创建一个外星人并将其放在当前行"""
    # 创建一个外星人并将其加入当前行
    alien = Alien(ai_settings, screen)
    alien_width = alien.rect.width
    alien.x = alien_width + 2 * alien_width * alien_number
    alien.rect.x = alien.x
    alien.rect.y = alien.rect.height + 2 * alien.rect.height * row_number
    aliens.add(alien)


def create_fleet(ai_settings, screen, ship, aliens):
    """创建外星人群"""
    # 创建一个外星人，并计算一行可容纳多少个外星人
    alien = Alien(ai_settings, screen)
    number_aliens_x = get_number_aliens_x(ai_settings, alien.rect.width)
    number_rows = get_number_rows(ai_settings, ship.rect.height, alien.rect.height)

    # 创建外星人群
    for row_number in range(number_rows):
        for alien_number in range(number_aliens_x):
            create_alien(ai_settings, screen, aliens, alien_number, row_number)
```

## 让外星人群移动

### 向右移动外星人

```plain
# 外星人设置
self.alien_speed_factor = 1
```

```plain
def update(self):
    """向右移动外星人"""
    self.x += self.ai_settings.alien_speed_factor
    self.rect.x = self.x
```

```plain
def update_aliens(aliens):
    """更新外星人群中所有外星人的位置"""
    aliens.update()
```

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_aliens(aliens)
    gf.update_bullets(bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

### 创建表示外星人移动方向的设置

```plain
# 外星人设置
self.alien_speed_factor = 1
self.fleet_drop_speed = 10
# fleet_direction为1表示向右移，为-1表示向左移
self.fleet_direction = 1
```

### 检查外星人是否撞到了屏幕边缘

```plain
def update(self):
    """向左或向右移动外星人"""
    self.x += (self.ai_settings.alien_speed_factor *
               self.ai_settings.fleet_direction)
    self.rect.x = self.x

def check_edges(self):
    """如果外星人位于屏幕边缘，就返回True"""
    screen_rect = self.screen.get_rect()
    if self.rect.right >= screen_rect.right:
        return True
    elif self.rect.left <= 0:
        return True
```

### 向下移动外星人群并改变移动方向

```plain
def check_fleet_edges(ai_settings, aliens):
    """有外星人到达边缘时采取相应的措施"""
    for alien in aliens.sprites():
        if alien.check_edges():
            change_fleet_direction(ai_settings, aliens)
            break


def change_fleet_direction(ai_settings, aliens):
    """将整群外星人下移，并改变它们的方向"""
    for alien in aliens.sprites():
        alien.rect.y += ai_settings.fleet_drop_speed
    ai_settings.fleet_direction *= -1


def update_aliens(ai_settings, aliens):
    """检查是否有外星人位于屏幕边缘，并更新整群外星人的位置"""
    check_fleet_edges(ai_settings, aliens)
    aliens.update()
```

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_aliens(ai_settings, aliens)
    gf.update_bullets(bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

## 射杀外星人

### 检测子弹与外星人的碰撞

```plain
def update_bullets(aliens, bullets):
    """更新子弹的位置，并删除已消失的子弹"""
    # 更新子弹的位置
    bullets.update()
    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)

    # 检查是否有子弹击中了外星人
    # 如果是这样，就删除相应的子弹和外星人
    collisions = pygame.sprite.groupcollide(bullets, aliens, True, True)
```

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_aliens(ai_settings, aliens)
    gf.update_bullets(aliens, bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

### 生成新的外星人群

```plain
def update_bullets(ai_settings, screen, ship, aliens, bullets):
    """更新子弹的位置，并删除已消失的子弹"""
    # 更新子弹的位置
    bullets.update()
    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)

    # 检查是否有子弹击中了外星人
    # 如果是这样，就删除相应的子弹和外星人
    collisions = pygame.sprite.groupcollide(bullets, aliens, True, True)
    if len(aliens) == 0:
        # 删除现有的子弹并新建一群外星人
        bullets.empty()
        create_fleet(ai_settings, screen, ship, aliens)
```

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_aliens(ai_settings, aliens)
    gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

### 重构 update_bullets()

```plain
def update_bullets(ai_settings, screen, ship, aliens, bullets):
    """更新子弹的位置，并删除已消失的子弹"""
    # 更新子弹的位置
    bullets.update()
    # 删除已消失的子弹
    for bullet in bullets.copy():
        if bullet.rect.bottom <= 0:
            bullets.remove(bullet)
    check_bullet_alien_collisions(ai_settings, screen, ship, aliens, bullets)


def check_bullet_alien_collisions(ai_settings, screen, ship, aliens, bullets):
    """响应子弹和外星人的碰撞"""
    # 如果是这样，就删除相应的子弹和外星人
    collisions = pygame.sprite.groupcollide(bullets, aliens, True, True)
    if len(aliens) == 0:
        # 删除现有的子弹并新建一群外星人
        bullets.empty()
        create_fleet(ai_settings, screen, ship, aliens)
```

## 结束游戏

### 检测外星人和飞船碰撞

```plain
def update_aliens(ai_settings, ship, aliens):
    """检查是否有外星人位于屏幕边缘，并更新整群外星人的位置"""
    check_fleet_edges(ai_settings, aliens)
    aliens.update()

    # 检测外星人和飞船之间的碰撞
    if pygame.sprite.spritecollideany(ship, aliens):
        print("Ship hit!!!")
```

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    ship.update()
    bullets.update()
    gf.update_aliens(ai_settings, ship, aliens)
    gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

### 响应外星人和飞船碰撞

```plain
class GameStats():
    """跟踪游戏的统计信息"""

    def __init__(self, ai_settings):
        """初始化统计信息"""
        self.ai_settings = ai_settings
        self.reset_stats()

    def reset_stats(self):
        """初始化在游戏运行期间可能变化的统计信息"""
        self.ships_left = self.ai_settings.ship_limit
```

```plain
# 飞船设置
self.ship_speed_factor = 1.5
self.ship_limit = 3
```

```plain
import pygame

from alien import Alien
from pygame.sprite import Group
from settings import Settings
from ship import Ship
from game_stats import GameStats
import game_functions as gf


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")

    # 创建一艘飞船、一个子弹编组和一个外星人编组
    ship = Ship(ai_settings, screen)
    bullets = Group()
    aliens = Group()
    # 创建外星人群
    gf.create_fleet(ai_settings, screen, ship, aliens)
    # 创建一个用于存储游戏统计信息的实例
    stats = GameStats(ai_settings)
    # 开始游戏的主循环
    while True:
        gf.check_events(ai_settings, screen, ship, bullets)
        ship.update()
        bullets.update()
        gf.update_aliens(ai_settings, stats, screen, ship, aliens, bullets)
        gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
        gf.update_screen(ai_settings, screen, ship, aliens, bullets)


run_game()
```

```plain
ship_hit(ai_settings, stats, screen, ship, aliens, bullets):
    """响应被外星人撞到的飞船"""
    # 将ships_left减1
    stats.ships_left -= 1

    # 清空外星人列表和子弹列表
    aliens.empty()
    bullets.empty()

    # 创建一群新的外星人，并将飞船放到屏幕底端中央
    create_fleet(ai_settings, screen, ship, aliens)
    ship.center_ship()

    # 暂停
    sleep(0.5)
```

```plain
update_aliens(ai_settings, stats, screen, ship, aliens, bullets):
    """检查是否有外星人位于屏幕边缘，并更新整群外星人的位置"""
    check_fleet_edges(ai_settings, aliens)
    aliens.update()

    # 检测外星人和飞船之间的碰撞
    if pygame.sprite.spritecollideany(ship, aliens):
        ship_hit(ai_settings, stats, screen, ship, aliens, bullets)
```

```plain
def center_ship(self):
    """让飞船在屏幕上居中"""
    self.center = self.screen_rect.centerx
```

### 有外星人到达屏幕底端

```plain
def check_aliens_bottom(ai_settings, stats, screen, ship, aliens, bullets):
    """检查是否有外星人到达了屏幕底端"""
    screen_rect = screen.get_rect()
    for alien in aliens.sprites():
        if alien.rect.bottom >= screen_rect.bottom:
            # 像飞船被撞到一样进行处理
            ship_hit(ai_settings, stats, screen, ship, aliens, bullets)
            break
```

```plain
def update_aliens(ai_settings, stats, screen, ship, aliens, bullets):
    """检查是否有外星人位于屏幕边缘，并更新整群外星人的位置"""
    check_fleet_edges(ai_settings, aliens)
    aliens.update()
    # 检测外星人和飞船之间的碰撞
    if pygame.sprite.spritecollideany(ship, aliens):
        ship_hit(ai_settings, stats, screen, ship, aliens, bullets)
    # 检查是否有外星人到达屏幕底端
    check_aliens_bottom(ai_settings, stats, screen, ship, aliens, bullets)
```

## 游戏结束

```plain
def __init__(self, ai_settings):
    """初始化统计信息"""
    self.ai_settings = ai_settings
    self.reset_stats()
    # 游戏刚启动时处于活动状态
    self.game_active = Tru
```

```plain
def ship_hit(ai_settings, stats, screen, ship, aliens, bullets):
    """响应被外星人撞到的飞船"""
    if stats.ships_left > 0:
        # 将ships_left减1
        stats.ships_left -= 1
        # 清空外星人列表和子弹列表
        aliens.empty()
        bullets.empty()
        # 创建一群新的外星人，并将飞船放到屏幕底端中央
        create_fleet(ai_settings, screen, ship, aliens)
        ship.center_ship()
        # 暂停
        sleep(0.5)
    else:
        stats.game_active = False
```

### 确定应运行游戏的哪些部分

```plain
while True:
    gf.check_events(ai_settings, screen, ship, bullets)
    if stats.game_active:
        ship.update()
        bullets.update()
        gf.update_aliens(ai_settings, stats, screen, ship, aliens, bullets)
        gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
    gf.update_screen(ai_settings, screen, ship, aliens, bullets)
```

## 记 分

### 添加 Play 按钮

```plain
# 让游戏一开始处于非活动状态
self.game_active = False
```

### 创建 Button 类

```plain
import pygame.font


class Button:

    def __init__(self, ai_settings, screen, msg):
        """初始化按钮的属性"""
        self.screen = screen
        self.screen_rect = screen.get_rect()

        # 设置按钮的尺寸和其他属性
        self.width, self.height = 200,50
        self.button_color = (0,255,0)
        self.text_color = (255,255,255)
        self.font = pygame.font.SysFont(None, 48)
        # 创建按钮的rect对象，并使其居中
        self.rect = pygame.Rect(0, 0, self.width, self.height)
        self.rect.center = self.screen_rect.center
        # 按钮的标签只需创建一次
        self.prep_msg(msg)

    def prep_msg(self, msg):
        """将msg渲染为图像，并使其在按钮上居中"""
        self.msg_image = self.font.render(msg, True, self.text_color, self.button_color)
        self.msg_image_rect = self.msg_image.get_rect()
        self.msg_image_rect.center = self.rect.center

    def draw_button(self):
        # 绘制一个用颜色填充的按钮，再绘制文本
        self.screen.fill(self.button_color, self.rect)
        self.screen.blit(self.msg_image, self.msg_image_rect)
```

### 在屏幕上绘制按钮

```plain
import pygame
from pygame.sprite import Group

import game_functions as gf
from game_stats import GameStats
from settings import Settings
from ship import Ship
from button import Button


def run_game():
    # 初始化游戏，设置和屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))
    pygame.display.set_caption("Alien Invasion")
    # 创建Play按钮
    play_button = Button(ai_settings, screen, "Play")
    # 创建一艘飞船、一个子弹编组和一个外星人编组
    ship = Ship(ai_settings, screen)
    bullets = Group()
    aliens = Group()
    # 创建外星人群
    gf.create_fleet(ai_settings, screen, ship, aliens)
    # 创建一个用于存储游戏统计信息的实例
    stats = GameStats(ai_settings)
    # 开始游戏的主循环
    while True:
        gf.check_events(ai_settings, screen, ship, bullets)
        if stats.game_active:
            ship.update()
            bullets.update()
            gf.update_aliens(ai_settings, stats, screen, ship, aliens, bullets)
            gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
        gf.update_screen(ai_settings, screen, stats, ship, aliens, bullets, play_button)


run_game()
```

```plain
def update_screen(ai_settings, screen, stats, ship, aliens, bullets, play_button):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(ai_settings.bg_color)
    # 在飞船和外星人后面重绘所有子弹
    for bullet in bullets.sprites():
        bullet.draw_bullet()
    ship.blitme()
    aliens.draw(screen)
!!    # 如果游戏处于非活动状态，就绘制Play按钮
    if not stats.game_active:
        play_button.draw_button()
    # 让最近绘制的屏幕可见
    pygame.display.flip()
```

### 开始游戏

```plain
def check_events(ai_settings, screen, stats, play_button, ship, bullets):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_events(event, ai_settings, screen, ship, bullets)
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)
        elif event.type == pygame.MOUSEBUTTONDOWN:
            mouse_x, mouse_y = pygame.mouse.get_pos()
            check_play_button(stats, play_button, mouse_x, mouse_y)
```

```plain
check_play_button(stats, play_button, mouse_x, mouse_y):
    """在玩家单击Play按钮时开始新游戏"""
    if play_button.rect.collidepoint(mouse_x, mouse_y):
        stats.game_active = True
```

```plain
while True:
    gf.check_events(ai_settings, screen, stats, play_button, ship, bullets)
    if stats.game_active:
        ship.update()
        bullets.update()
        gf.update_aliens(ai_settings, stats, screen, ship, aliens, bullets)
        gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
    gf.update_screen(ai_settings, screen, stats, ship, aliens, bullets, play_button)
```

### 重置游戏

```plain
def check_play_button(ai_settings, screen, stats, play_button, ship, aliens, bullets, mouse_x, mouse_y):
    """在玩家单击Play按钮时开始新游戏"""
    if play_button.rect.collidepoint(mouse_x, mouse_y):
        # 重置游戏统计信息
        stats.reset_stats()
        stats.game_active = True
        # 清空外星人列表和子弹列表
        aliens.empty()
        bullets.empty()
        # 创建一群新的外星人，并让飞船居中
        create_fleet(ai_settings, screen, ship, aliens)
        ship.center_ship()
```

```plain
def check_events(ai_settings, screen, stats, play_button, ship, aliens, bullets):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            check_keydown_events(event, ai_settings, screen, ship, bullets)
        elif event.type == pygame.KEYUP:
            check_keyup_events(event, ship)
        elif event.type == pygame.MOUSEBUTTONDOWN:
            mouse_x, mouse_y = pygame.mouse.get_pos()
            check_play_button(ai_settings, screen, stats, play_button, ship, aliens, bullets, mouse_x, mouse_y)
```

```plain
while True:
    gf.check_events(ai_settings, screen, stats, play_button, ship, aliens, bullets)
    if stats.game_active:
        ship.update()
        bullets.update()
        gf.update_aliens(ai_settings, stats, screen, ship, aliens, bullets)
        gf.update_bullets(ai_settings, screen, ship, aliens, bullets)
    gf.update_screen(ai_settings, screen, stats, ship, aliens, bullets, play_button)
```
