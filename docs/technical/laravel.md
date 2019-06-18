---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# laravel框架
[[toc]]
## 依赖注入、控制反转、反射各个概念的理解和使用
<https://laravelacademy.org/post/9782.html>  
<https://laravelacademy.org/post/9783.html>
## 简化流程
index.php单文件入口 bootstrap下app.php实例化Application类 其中Application类继承容器类Container Container类中提供bind make build方法 容器中维护绑定数组，绑定数组由key值和闭包组成。app的绑定动作在构造函数中实例化时候完成，其余绑定动作由服务提供商类继承的服务提供基类的抽象方法register方法进行bind  框架基础会自动make（build）对应的对象，自定义容器内的绑定数组根据业务场景需要调用make（build）方法实例化对象。
## 概念简述
bind：绑定数组key和闭包

make：根据key 找到对应闭包 并执行该闭包 闭包内有build方法

build：实例化，主要运用的方法是反射 根据绑定数组中的类名使用new ReflectionClass反射找到对应的类，由反射类获取构造函数getConstructor，获取构造函数的参数，利用递归实例化参数（创建依赖对象）实例化对象

di：依赖注入，不在方法内部使用new 来创建对象，由构造方法，外部方法传入对象，达到代码解耦和开放封闭原则

ioc：控制反转，不需要自己修改类中实例化的类，由外部传入实例化后的对象

门面：使用静态方式 调用方法 实例化门面的基类 各个子类只返回需要实例化的key值 外部调用时调起基类中__callStatic的魔术方法 __callStatic调用make函数 生成对象后执行方法

契约：实际上就是接口 使用interface定义接口方法 implements实现接口

中间件：过滤进入web应用的Http请求，使用的设计模式主要是管道设计模式，该模式主要运用的函数是array_reduce和call_user_function 管道用数组的数据方式实现 根据管道里面的顺序 array_reduce生成对应的闭包 call_user_function调用执行

## laravel源码分析
### 入口文件
::: tip
由于工作环境，这里用于源码分析的laravel版本是5.0
:::
laravel的单文件入口是`public/index.php`,我们先看一下这个文件的核心源码
``` php
//index.php
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Http\Kernel');
$response = $kernel->handle(
	$request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);
```
我们可以发现index.php主要的内容就是引入app.php文件和用上文提到的`make`方法示例化了laravel内核的对象，调用handle方法[HttpKernel](./laravel.html#kernel类) 随后返回Response对象， 最后执行一些中间件的terminate方法,扫尾工作。
### 从入口文件延伸
接下来我们来看看`bootstrap\app.php`里面的内容
``` php
$app = new Illuminate\Foundation\Application(
	realpath(__DIR__.'/../')
);
$app->singleton(
	'Illuminate\Contracts\Http\Kernel',
	'App\Http\Kernel'
);
```
这个文件主要作用是：  
1.实例化Application类，Application类继承了Container类所以实际上就是实例化了一个容器，容器也是实现依赖注入(di)和控制反转(ioc)的基础。
singleton可以看成是对bind方法的一个简单封装，实际的作用就是存储key和闭包到绑定数组中。  
2.把kernel类有写入了绑定数组当中
### Application类
上面提到Application类是一个容器，其实不够准确，容器只是它的一部分功能，我们来看一下Application的构建函数
``` php
public function __construct($basePath = null)
	{
		$this->registerBaseBindings();

		$this->registerBaseServiceProviders();

		$this->registerCoreContainerAliases();

		if ($basePath) $this->setBasePath($basePath);
	}
```
将自身的对象写入绑定数组当中，绑定路由，事件基本服务提供商
### kernel类
这里需要主要看两个类`app/Http/kernel` 和 `vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php` laravel把后者取了别名为HttpKernel，后者是前者的基类。下面展示这两个类中主要的代码
``` php
//app/Http/Kernel
class Kernel extends HttpKernel {
	protected $routeMiddleware = [
		'auth' => 'App\Http\Middleware\Authenticate',
		'auth.basic' => 'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth',
		'guest' => 'App\Http\Middleware\RedirectIfAuthenticated',
		'auth.api' => 'App\Http\Middleware\AuthenticateWithApi',
	];
	protected $bootstrappers = [
		'Illuminate\Foundation\Bootstrap\DetectEnvironment',
		'Illuminate\Foundation\Bootstrap\LoadConfiguration',
		'Illuminate\Foundation\Bootstrap\ConfigureLogging',
		//'Illuminate\Foundation\Bootstrap\HandleExceptions',
		'App\Exceptions\HandleExceptions', //自定义错误信息, 对于系统的notice之类的错误处理，error_code由0 转换为500
		'Illuminate\Foundation\Bootstrap\RegisterFacades',
		'Illuminate\Foundation\Bootstrap\RegisterProviders',
		'Illuminate\Foundation\Bootstrap\BootProviders',
	];
}
``` 
``` php
//HttpKernel
class Kernel implements KernelContract {
	public function __construct(Application $app, Router $router)
	{
		$this->app = $app;
		$this->router = $router;

		foreach ($this->routeMiddleware as $key => $middleware)
		{
			$router->middleware($key, $middleware);
		}
	}
	public function handle($request)
	{
		try
		{
			$response = $this->sendRequestThroughRouter($request);
		}
		catch (Exception $e)
		{
			$this->reportException($e);

			$response = $this->renderException($request, $e);
		}

		$this->app['events']->fire('kernel.handled', [$request, $response]);

		return $response;
	}
}
```
`Kernel`中主要定义了路由的中间件，以及定义了需要注入到绑定数组的类，对于这些需要绑定的类，laravel提供一个`Illuminate\Foundation\Bootstrap\RegisterProviders`注册类，统一将这些注册到绑定数组中，同时提供另外一个注册类`Illuminate\Foundation\Bootstrap\RegisterFacades`,统一注册门面。  
`KernelHttp`主要关注构造方法和handle()方法
构造方法中的 `$router->middleware`  是将中间件配置写入路由类中的变量。用于管道构建中间件
`handle`方法的调用者是在入口文件[index.php](./laravel.html#入口文件)`$response = $kernel->handle(
	$request = Illuminate\Http\Request::capture()
);`这个方法处理的是启动注册类和初始化管道类。
### 管道流
所谓管道（Pipeline）设计模式就是将会数据传递到一个任务序列中，管道扮演者流水线的角色，数据在这里被处理然后传递到下一个步骤。
管道中的每一个任务都会接受并返回同一类型的数据，这样子任务可以在管道中被添加、移除或者替换，而不影响其它子任务。  
Laravel 在框架中的很多地方用到了 Pipeline 设计模式，这意味着所有我们需要实现管道设计模式的地方已然是应用底层的一部分了，中间件便是利用管道流的思想编写的。我们来看一下管道类简化后具体实现的方法。
``` php
	//定义通过管道的对象
	public function send($passable){
		$this->passable = $passable;
		
		return $this;
	}
	//定义所需的管道
	public function through($pipes){
		$this->pipes = $pipes;
		return $this;
	}
	//具体执行管道
	public function then(){
		//闭包的顺序是按照管道顺序从内到外，执行顺序相当于管道顺序的倒序，故要转换管道顺序，执行的顺序与定义的管道顺序一致
		$pipes = array_reverse($this->pipes);
		$call_back = array_reduce($pipes,$this->getSlice(),function(){});
		if(!is_null($call_back)){
				return call_user_func(
				$call_back,$this->passable
			);
		}

```


## 实践
仿造laravel的思想 自写框架
[github](https://github.com/HarryYanHao/HF)
<like/>


