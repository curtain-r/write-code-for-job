1. 服务器通过`Set-Cookie`响应头 告知 浏览器 保存 cookie 信息
2. 浏览器通过`Cookie`请求头 发送本地 cookie 到服务器
3. 定义Cookie生命周期: `Set-Cookie: id=xxx; expires=Web, 过期时间` 过期时间是设置给客户端的，而不是服务端。如果网站有身份验证，则每当用户身份验证时，它都会重新生成并重新发送会话cookie，甚至是已经存在的会话cookie. 此技术有助于防止 **会话固定攻击**(session fixation attacks)
4. 限制访问cookie: 两个属性可以确保Cookie被安全发送，并不会被意外的参与者或脚本访问： `Secure` `HttpOnly` ;JavaScript `document.cookie`API 无法访问带有`HttpOnly`属性的`Cookie`,所有可以缓解**跨站脚本攻击**(XSS)
```javascript
  Set-Cookie: id=a3of; Expires=Web, 过期时间; Secure; HttpOnly
```
5. Cookie的作用域: `Domain`和`Path`标识定义了Cookie的作用域： 即允许Cookie应该发给那些URL
   1. `Domain`: `Domain=mozilla.org` 则cookie也包含在子域名中**不设置默认为`Origin 不包含子域`**
   2. `Path`： `Path=/docs`可以匹配(/docs,/docs/web,/doc/web/http)
   3. `SameSite`: `Set-Cookie: key=value; SameSite=Strict` ,设置SameSite属性之后允许服务器在请求某个Cookie在跨站请求时不会被发送，从而可以阻止**跨站请求伪造**(CSRF),SameSite属性有三个值
      1. None: 浏览器会在同站请求、跨站请求下继续发送cookie
      2. Strict: 浏览器只会在访问相同站点发送cookie
      3. Lax: 与Strict类似，当用户从外部站点导航至URL时发送cookie(默认值)

> 缓解涉及Cookie的攻击的方法：
> 使用 HttpOnly 属性可防止通过 JavaScript 访问 cookie 值。
  用于敏感信息（例如指示身份验证）的 Cookie 的生存期应较短，并且 SameSite 属性设置为Strict 或 Lax。（请参见上方的 SameSite Cookie。）在支持 SameSite 的浏览器中，这样做的作用是确保不与跨域请求一起发送身份验证 cookie，因此，这种请求实际上不会向应用服务器进行身份验证。

6. 会话劫持和XSS: 在 Web 应用中，Cookie 常用来标记用户或授权会话。因此，如果 Web 应用的 Cookie 被窃取，可能导致授权用户的会话受到攻击。常用的窃取 Cookie 的方法有利用社会工程学攻击和利用应用程序漏洞进行 XSS 攻击。
7. 跨站请求伪造(CSRF): 比如在不安全聊天室或论坛上的一张图片，它实际上是一个给你银行服务器发送提现的请求：

```<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">```
当你打开含有了这张图片的 HTML 页面时，如果你之前已经登录了你的银行帐号并且 Cookie 仍然有效（还没有其它验证步骤），你银行里的钱很可能会被自动转走。有一些方法可以阻止此类事件的发生：

* 对用户输入进行过滤来阻止 XSS；
* 任何敏感操作都需要确认；
* 用于敏感信息的 Cookie 只能拥有较短的生命周期；

8. 跨院资源共享(CORS): 出于安全性，浏览器限制脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。
   1. Content-Type的三个常用值: text/plain multipart/for-data application/x-www-form-urlencoded
   2. 三个常用的请求方式: get post head
   3. 常见的头部: Accept Accept-Language Content-Language Content-Type DPR Downlink Save-Data Viewport-Width Width
   4. **`Access-Control-Allow-Origin: *`: 允许所有源访问该资源**

9. http发展
   1. http0.9: 单行协议
   2. http1.0: 构建可扩展性
      1. 协议版本信息现在会随着每个请求发送（HTTP/1.0被追加到了GET行）。
          状态码会在响应开始时发送，使浏览器能了解请求执行成功或失败，并相应调整行为（如更新或使用本地缓存）。
      2. 引入了HTTP头的概念，无论是对于请求还是响应，允许传输元数据，使协议变得非常灵活，更具扩展性。
      3. 在新HTTP头的帮助下，具备了传输除纯文本HTML文件以外其他类型文档的能力（感谢Content-Type头）。
   3. http1.1: 标准化协议
      1. 连接可以复用，节省了多次打开TCP连接加载网页文档资源的时间。
      2. 增加管线化技术，允许在第一个应答被完全发送之前就发送第二个请求，以降低通信延迟。
      3. 支持响应分块。
      4. 引入额外的缓存控制机制。
      5. 引入内容协商机制，包括语言，编码，类型等，并允许客户端和服务器之间约定以最合适的内容进行交换。
      6. 引入Host头，能够使不同域名配置在同一个IP地址的服务器上
   4. http2.0: 更加优异的表现
      1. 文本协议 --> 二进制协议。不再可读
      2. 复用协议，并行的请求能在同一个连接中处理，移除了http1.x中顺序和阻塞的约束
      3. 压缩headers
      4. 允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提交请求
10. http响应码
    1. 1xx 信息响应
      1. 100 continue 继续
      2. 101 Switch protocol 更换协议
    2. 2xx 成功响应
      1. 200 Ok 成功请求
      2. 201 Created 该请求已经成功，并因此创建了一个新资源
      3. 202 Accepted 请求已接收，但还没有响应，没出结果
      4. 203 Non-Authoritative Information 请求成功，但是实体头部信息不是原始服务器，而是它的一个副本
      5. 204 No Content 服务器处理了请求，但不需要返回任何实体内容
      6. 205 Reset Content 服务器请求成功，且没有返回任何内容，与204不同的是，此响应需要请求者重置文档视图。一般用于表单提交后刷新表单便于再次输入
      7. 206 Partial Content 服务器处理了部分GET请求。
    3. 3xx 重定向
       1. 300 Multiple Choice 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。需要用户自行选择一个首选地址进行重定向
       2. 301 Moved Permanently 永久移动，有缓存
       3. 302 Found 临时移动，可以继续发送原有地址的请求
       4. 303 See Other 请求资源在另外一个URL上找到了，客户端应当使用GET方式请求那个资源
       5. 304 Not Modified 访问的资源在客户端缓存而且没有改变
       6. 307 Temporary Redirect 请求的资源现在临时从不同的URL响应了，客户端应该继续向原有的地址发送以后的请求
       7. 308 Permanent Redirect 资源现在永久位于由Location： HTTP Response表头指定的另一个URL
    4. 4xx 客户端问题
       1. 400 Bad Request 语义有误，当前请求服务器无法理解，请求参数有误
       2. 401 Unauthorized 需要验证
       3. 402 保留
       4. 403 Forbidden 服务器已经理解请求，但是拒绝执行
       5. 404 Not Found 请求失败，没有发现请求资源
       6. 405 Method Not Allow 请求中指定的请求方法不能用于请求相应资源
       7. 406 Not Acceptable 请求的资源的内容特征无法满足请求头中的条件，无法生成响应体
       8. 407 Proxy Authentication Required 与401类似，只不过客户端必须在代理服务器上进行身份验证
       9. 408 Request Timeout 请求超时
       10. 409 Conflict 由于和被请求的资源的当前状态之间存在冲突，请求无法完成
       11. 410 Gone 请求资源不在可用，而且没有新的转发地址
       12. 411 Length Required 服务器拒绝在没有`Content-Length`头的情况下接受请求
       13. 412 Precondition Failed 服务器验证先决条件时，没能满足所有
       14. 413 Payload Too Large 服务器拒绝处理当前请求，实体数据太大
       15. 414 URI TOO Long 请求URI长度超过了服务器能理解的长度
    5. 5xx 服务器问题
       1. 500 Internal Server Error 服务器到了不知道如何处理的情况
       2. 501 Not Implemented 此请求方法不被浏览器支持，无法处理
       3. 502 Bad Gateway 表示需要得到一个处理这个请求的响应，但是得到一个错误响应
       4. 503 Service Unavailable 服务器没有做好处理请求的准备
       5. 504 Gateway Timeout 当前服务器作为网关，不能及时得到响应
       6. 505 HTTP Version Not Supported 不支持请求的Http版本

