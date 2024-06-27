---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---
# 算法
[[toc]]
::: danger
--在搜电的面试中回答错误   

时间复杂度的n指的是数组中的数据个数，而不是循环次数 
:::
## 冒泡排序算法
冒泡排序的两种基本写法
第一种 由当前值和数组中其他的值比较 复杂度n的平方
```php
$a = array(2,3,1,4,5,6,7,8,9,10,11,12);
function bubble_sort($arr){
	$len = count($arr);
	$count = 0;
	for($i=0;$i<$len;$i++){
		for($j=0;$j<$len;$j++){
			if($arr[$i] < $arr[$j]){
				$temp = $arr[$j];
				$arr[$j] = $arr[$i];
				$arr[$i] = $temp; 
			}
			$count++;
		}
	}
	echo $count;
	return $arr;
	var_dump(bubble_sort($a));
}
```
第二种 外层循环确定趟数 内层循环确定比较次数 数组之间的数两两比较
```php
$a = array(2,3,1,4,5,6,7,8,9,10,11,12);
function bubble_sort($arr){
	$len = count($arr);
	$count = 0;
	for($i=0;$i<$len-1;$i++){
		for($j=0;$j<$len-1-$i;$j++){
			if($arr[$j] > $arr[$j+1]){
				$temp = $arr[$j];
				$arr[$j] = $arr[$j+1];
				$arr[$j+1] = $temp; 
			}
			$count++;
		}
	}
	echo $count;
	return $arr;
}
var_dump(bubble_sort($a));
```
上面两种都能达到数组由小到大的排序，但是第一种执行次数是144次 12的平方，第二种的执行次数是12！66次。效率上第二次是优于第一种的，当数组中大量的数据是有序时，少部分乱序，第二种的两两交换能用更少的次数得到完全有序的数据。

## 冒泡排序的优化
上述的例子证明用越少循环的次数实现冒泡排序，则算法的效率越高，那么下面提供两种算法的优化思路   
第一种 用标记位记录是否存在交换，如果没有存在交换，则认为数组已经是有序的
```php
$a = array(2,3,1,4,5,6,7,8,9,10,11,12);
function bubble_sort($arr){
	$len = count($arr);
	$count = 0;
	for($i=0;$i<$len-1;$i++){
		$flag = true;
		for($j=0;$j<$len-1-$i;$j++){
			if($arr[$j] > $arr[$j+1]){
				$temp = $arr[$j];
				$arr[$j] = $arr[$j+1];
				$arr[$j+1] = $temp; 
				$flag = false;
			}

			$count++;
		}
		if($flag){
			break;
		}
	}
	echo $count;
	return $arr;
}
var_dump(bubble_sort($a));
```
上面的例子结果是count输出为30 既在第30次的时候，数组没有数据的交换，说明数组的顺序就已经是有序的了，后面36次的循环比较是没有意义的了。直接break循环，减少循环次数，提升效率。

```php
$a = array(2,3,1,4,5,6,7,8,9,10,11,12);
function bubble_sort($arr){
	$len = count($arr);
	$count = 0;
	$k = $len-1;
	for($i=0;$i<$len-1;$i++){
		$flag = true;
		for($j=0;$j<$k;$j++){
			if($arr[$j] > $arr[$j+1]){
				$temp = $arr[$j];
				$arr[$j] = $arr[$j+1];
				$arr[$j+1] = $temp; 
				$flag = false;
				$pos = $j;
			}

			$count++;
		}
		if($flag){
			break;
		}
		$k = $pos;
	}
	echo $count;
	return $arr;
}
```
上面的例子结果是count输出为12,在第一次排序的时候发现最后一次的交换顺序是在第三个数据，说明第三个数之后的数据都是有序的，所以接下来的排序就只用最多只用跑到第3个，所以节约了比较次数，提升了冒泡排序的性能   
冒泡排序的时间复杂的是O(n²) 最优优化后的复杂度可以说是O(n) 空间复杂度，因只需一个变量做数据交换所以是O(1)

## 快速排序
### 快速排序简介
取数据数组第一个元素为基准数据，用临时变量存储基准数据，左右设置浮标，先从右边浮标开始计算，若右边浮标所指的数据小于基准数据，则复制右边的数据到左边浮标所指数据，左边浮标再开始比较，若右边浮标所指数据大于基准数据，则右边浮标向左移动直到有大于的数据或者和左边浮标相等视为本次数据归类结束，左边浮标原理类似，当左边浮标所指的数小于基准数据则向右移动 若大于基准数据则复制数据到右边浮标所指数据。以此循环，直到左右两边数组个数为1时停止。所采用的思想是分治思想，时间复杂度是nlogn。
### php实现快速排序
```php
function quick_sort($arr){
	//递归函数结束条件
	if(count($arr) <= 1){
		return $arr;
	}
	$middle = current($arr);
	$left = [];
	$right = [];
	for($i=1;$i<count($arr);$i++){
		if($arr[$i]>$middle){
			$right[] = $arr[$i];
		}else{
			$left[] = $arr[$i];
		}
	}
	$left = quick_sort($left);
	$right = quick_sort($right);
	return array_merge($left,(array)$middle,$right);
}

var_dump(quick_sort($a));
```
## 二分查找算法

### 二分查找原理
和快速排序算法类似，在一个已经有序的数组结构中，在起始位置和终点位置有两个浮标，取中间的数与要查找的数做比较，如果中间的数大于要比较的数就取左半边数组，即终点的浮标移动到中间位置-1，如果查找的数大于中间的数，则取右半边数组，即左边的浮标移动到中间位置+1，如果中间数等于查询的数直接返回中间的位置。如此循环，在一次循环中能去掉一半的数据，即算法复杂度为log2n。比较过程不占用内存，使用递归实现，属于栈的后进先出(LIFO)，空间复杂度可理解为递归深度log2n

::: danger
--在搜电的面试中回答错误   
将二分查找算法和快速查找算法弄混，二分查找算法时间复杂度为log2n，快速排序算法时间复杂度为nlog2n   
因为二分查找是对于有序序列来计算，只有一个log2n复杂度的分组功能。快速排序是对于无需序列来计算，会有一个n的比较过程和一个log2n复杂度的分组过程。
:::   
### php实现二分查找
```php
$num = [1,2,3,4,5,6,7,8,9,10];
var_dump(quick_search($num,3));
function quick_search($num,$needle){
	$low = 0;
	$high = count($num)-1;
	while($low<$high){
		$i = intval(($low+$high)/2);
		if($num[$i] == $needle){
			return $i;
			break;
		}
		if($num[$i] < $needle){
			$low = $i+1;
		}else{
			$high = $i-1;
		}
		if($low == $high){
			return $low;
			break;
		}

	}
	
}
```


