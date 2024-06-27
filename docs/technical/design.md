---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# 设计模式 php版本
[[toc]]
## 单例模式
1.$_instance对象是静态私有的
2.构造函数是定义为私有的，防止外部new失去单例的意义
3.获取实例方法应该定义为静态公共方法
3.用::方式访问公有静态属性和方法
4.只有获取实例的时候new节省内存
5.__clone定义为私有的，防止外部clone()失去单例的意义
```php
Class Single{
	private static $_instance;
	private function __construct(){
		
	}
	public static function  getInstance(){
		if(is_null(self::$_instance)){
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	private function __clone(){
		echo '单例模式静止clone';
	}
}
$a = Single::getInstance();
$b = Single::getInstance();
//true
var_dump($a === $b);
```
## 工厂模式
工厂模式下，创建对象的方法是通过调用工厂类的静态方法，而不是直接在代码里面new，这样的好处是如果需要修改创建的对象的类 只需修改工厂类下的方法，而不用去把代码里面new的类都修改一边，起到了统一管理的作用。
 ```php
 Class Factory{
	public static function getInstance(){
		$instance = new Test();
		return $instance;
	}
}
Class Test{
	public function __construct(){
		echo 'test construct';
	}
}
$c = Factory::getInstance();
var_dump($c)
 ```
 ## 注册模式
 声明全局对象数组，所有实例化后的数组加入到对象数组中。代码中需要对象的时候可以从全局对象数组中获取实例，在laravel框架中这种模式得到运用，框架在加载的时候，所需要用到的对象已经添加到了对象数组中
 ```php
 Class Test{
	public function __construct(){
		echo 'test construct';
	}
}
Class Test2{
	public function __construct(){
		echo 'test2 construct';
	}
}
Class Rigster {
	public static $rigster_arr = [];
	public function set($class,$alias){
		$this->rigster_arr[$alias] = new $class;
	}
	public function get(){
		return $this->rigster_arr;
	}
	public function unset($alias){
		unset($this->rigster_arr[$alias]);
	}	
}
$rigster = new Rigster();
$rigster->set(Test::class,'test');
$rigster->set(Test2::class,'test2');
var_dump($rigster->get());
$rigster->unset('test2');
var_dump($rigster->get());
 ```
## 适配器模式
将各种类中不同的函数根据功能封装成统一的api   
首先定义一个接口(有几个方法，以及相应的参数)。然后，有几种不同的情况，就写几个类实现该接口。将完成相似功能的函数，统一成一致的方法。 
使用适配器模式之后，就可以使用统一的API去屏蔽底层的API差异带来的环境改变之后需要改写代码的问题。
```php
interface IData{
	public function connect();
	public function query();
	public function close();
}
Class MySQL implements IData{
	public function connect(){
		echo 'MySQL connect';
	}
	public function query(){
		echo 'MySQL query';
	}
	public function close(){
		echo 'MySQL close';
	}
}
Class PDO implements IData{
	public function connect(){
		echo 'PDO connect';
	}
	public function query(){
		echo 'PDO query';
	}
	public function close(){
		echo 'PDO close';
	}
}
$mysql = new MySQL();
$pdo = new \My\Name\PDO();
$mysql->query();
$pdo->query();
```
## 策略模式
将一组特定行为和算法的封装成了类，以适应上下文环境，当需要增加一组行为和算法时只需添加一个策略类。不需要再使用if/else这类的硬编码，将类或者实例化后的对象传入，达到依赖注入和控制反转 代码之间的解藕，复合代码中的开闭原则
```php
Class Test{
	public function __construct(){
		echo 'test construct';
	}
	public function show(){
		echo 'this show is test 1';
	}
}
Class Test2{
	public function __construct(){
		echo 'test2 construct';
	}
	public function show(){
		echo 'this show is test 2';
	}
}
Class Strategy{
	public $strategy;
	public function setStrategy($obj){
		$this->strategy = new $obj;
	}

}
$strate = new Strategy();
$strate->setStrategy(Test::class);
$strate->strategy->show();
$strate->setStrategy(Test2::class);
$strate->strategy->show();
```



