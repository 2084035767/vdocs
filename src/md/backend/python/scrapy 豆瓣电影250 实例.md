# scrapy 豆瓣电影 250 实例

## 1.创建项目

在命令行中使用`scrapy`命令创建名为`douabn`的项目。

```sh
scrapy startproject douban
```

切换到`douban` 目录，用下面的命令创建名为`douban`的蜘蛛程序。

```sh
scrapy genspider douban movie.douban.com
```

## 2.编写程序

在`items.py`的`Item`类中定义字段，这些字段用来保存数据，方便后续的操作。

```python
import scrapy


class MovieItem(scrapy.Item):
    title = scrapy.Field()
    score = scrapy.Field()
    motto = scrapy.Field()
```

修改`spiders`文件夹中名为`douban.py` 的文件，它是蜘蛛程序的核心，需要我们添加解析页面的代码。在这里，我们可以通过对`Response`对象的解析，获取电影的信息。

```python
import scrapy # 库的顺序：1.内置库 2.第三方库 3.自定义库
from scrapy import Selector, Request
from scrapy.http import HtmlResponse

from demo.items import MovieItem


class DoubanSpider(scrapy.Spider):
    name = 'douban' #蜘蛛名
    allowed_domains = ['movie.douban.com']
    start_urls = ['https://movie.douban.com/top250?start=0&filter=']#爬虫的网址

    def parse(self, response: HtmlResponse):
        sel = Selector(response)
        movie_items = sel.css('#content > div > div.article > ol > li') #取到要用的li 
        for movie_sel in movie_items:
            item = MovieItem() # item.py中封装的对象
            item['title'] = movie_sel.css('.title::text').extract_first()
            item['score'] = movie_sel.css('.rating_num::text').extract_first()
            item['motto'] = movie_sel.css('.inq::text').extract_first()
            yield item
```

我们可以用`yield`产出`Request`对象来生成后续爬取的请求。`Request`对象有两个非常重要的属性，一个是`url`，它代表了要请求的地址；一个是`callback`，它代表了获得响应之后要执行的回调函数。我们可以将上面的代码稍作修改

```python
import scrapy  # 库的顺序：1.内置库 2.第三方库 3.自定义库
from scrapy import Selector, Request
from scrapy.http import HtmlResponse

from demo.items import MovieItem


class DoubanSpider(scrapy.Spider):
    name = 'douban'
    allowed_domains = ['movie.douban.com']
    start_urls = ['https://movie.douban.com/top250?start=0&filter=']

    def parse(self, response: HtmlResponse):
        sel = Selector(response)
        movie_items = sel.css('#content > div > div.article > ol > li')
        for movie_sel in movie_items:
            item = MovieItem()
            item['title'] = movie_sel.css('.title::text').extract_first()
            item['score'] = movie_sel.css('.rating_num::text').extract_first()
            item['motto'] = movie_sel.css('.inq::text').extract_first()
            yield item

        hrefs = sel.css('#content > div > div.article > div.paginator > a::attr("href")')
        # 取到不同页面的链接
        for href in hrefs: 
            full_url = response.urljoin(href.extract())
            yield Request(url=full_url) #将拼接后的链接传给Request
```

现在我们可以运行爬虫

```sh
scrapy crawl douban
```

如果想将这些数据保存到文件中，可以通过`-o`参数来指定文件名，Scrapy 支持我们将爬取到的数据导出成 JSON、CSV、XML 等格式。

```sh
scrapy crawl douban -o result.json
```

## 3.优化程序

不知大家是否注意到，通过运行爬虫获得的 JSON 文件中有`275`条数据，那是因为首页被重复爬取了。要解决这个问题，可以对上面的代码稍作调整，不在`parse`方法中解析获取新页面的 URL，而是通过`start_requests`方法提前准备好待爬取页面的 URL，调整后的代码如下所示。

```Python
import scrapy
from scrapy import Selector, Request
from scrapy.http import HtmlResponse

from demo.items import MovieItem


class DoubanSpider(scrapy.Spider):
    name = 'douban'
    allowed_domains = ['movie.douban.com']

    def start_requests(self): # 将爬虫网址改写成函数
        for page in range(10): # 一页有25条数据，所以要翻10次页
            yield Request(url=f'https://movie.douban.com/top250?start={page * 25}')

    def parse(self, response: HtmlResponse):
        sel = Selector(response)
        movie_items = sel.css('#content > div > div.article > ol > li')
        for movie_sel in movie_items:
            item = MovieItem()
            item['title'] = movie_sel.css('.title::text').extract_first()
            item['score'] = movie_sel.css('.rating_num::text').extract_first()
            item['motto'] = movie_sel.css('.inq::text').extract_first()
            yield item
```

如果希望完成爬虫数据的持久化，可以在数据管道中处理蜘蛛程序产生的`Item`对象。例如，我们可以通过前面讲到的`openpyxl`操作 Excel 文件，将数据写入 Excel 文件中，代码如下所示。

```Python
import openpyxl

from demo.items import MovieItem


class MovieItemPipeline:

    def __init__(self):
        self.wb = openpyxl.Workbook() # 创建工作簿
        self.sheet = self.wb.active # 数据可以直接分配到单元格中
        self.sheet.title = 'Top250' # 工作表标题
        self.sheet.append(('名称', '评分', '名言'))

    def process_item(self, item: MovieItem, spider):
        self.sheet.append((item['title'], item['score'], item['motto']))
        return item

    def close_spider(self, spider):
        self.wb.save('豆瓣电影数据.xlsx')
```

上面的`process_item`和`close_spider`都是回调方法（钩子函数）， 简单的说就是 Scrapy 框架会自动去调用的方法。当蜘蛛程序产生一个`Item`对象交给引擎时，引擎会将该`Item`对象交给数据管道，这时我们配置好的数据管道的`parse_item`方法就会被执行，所以我们可以在该方法中获取数据并完成数据的持久化操作。另一个方法`close_spider`是在爬虫结束运行前会自动执行的方法，在上面的代码中，我们在这个地方进行了保存 Excel 文件的操作，相信这段代码大家是很容易读懂的。

总而言之，数据管道可以帮助我们完成以下操作：

- 清理 HTML 数据，验证爬取的数据。
- 丢弃重复的不必要的内容。
- 将爬取的结果进行持久化操作。

修改`settings.py`文件对项目进行配置，主要需要修改以下几个配置。

```Python
# 用户浏览器
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'

# 并发请求数量 
CONCURRENT_REQUESTS = 4

# 下载延迟
DOWNLOAD_DELAY = 3
# 随机化下载延迟
RANDOMIZE_DOWNLOAD_DELAY = True

# 是否遵守爬虫协议
ROBOTSTXT_OBEY = True

# 配置数据管道
ITEM_PIPELINES = {
   'demo.pipelines.MovieItemPipeline': 300,
}
```

> **说明**：上面配置文件中的`ITEM_PIPELINES`选项是一个字典，可以配置多个处理数据的管道，后面的数字代表了执行的优先级，数字小的先执行。

