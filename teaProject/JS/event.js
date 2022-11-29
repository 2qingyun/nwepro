var topp = $('div>div.navigate').offset().top //元素的高 全局变量一
$(document).scroll(function () {
	var scrol = $(document).scrollTop() //屏幕卷去的高
	// 吸顶导航

	if (scrol < topp) {
		$('div>div.navigate').offset({
			top: topp
		})
	} else {
		$('div>div.navigate').offset({
			top: scrol
		})
	}
})
// 购物车跳转
$('div>div.tele>div>img').click(function () {
	window.location.assign('./shoppingCart.html')
})
//搜索功能
$('div>div.navigate>img').click(function () {
	var input_value = $('div>div.navigate>input').val()
	window.localStorage.setItem('input_Cache', input_value)
	window.location.assign('./search.html');
})
var Iffocus = 0 //搜索栏是否聚焦  全局变量二
$('div>div.navigate>input').focus(function () {
	Iffocus = 1;
})
$('div>div.navigate>input').blur(function () {
	Iffocus = 0;
})
$(window).keydown(function (e) {
	if (e.keyCode == 13 && Iffocus == 1) {  //触发搜索条件
		var input_value = $('div>div.navigate>input').val()  //获取搜索框里面的值
		window.localStorage.setItem('input_Cache', input_value)    //添加到缓存里面
		Iffocus = 0;
		window.location.assign('./search.html');

	}
})
//购物车的上标
var arr = JSON.parse(window.localStorage.getItem('ShoppingCart'))
if (arr == null) {
	arr = []
	window.localStorage.setItem('ShoppingCart', JSON.stringify(arr))
}
var shopping_length = arr.length

$('div>div.tele>div>img').after('<sup>' + shopping_length + '</sup>')
//登录、注册、注销的显示
var enter_condition = JSON.parse(window.localStorage.getItem('enter_condition'))
if (enter_condition != null) {
	$('div.tele>div>a').hide()
	$('div.tele>div>a').eq(0).show()
	$('div.tele>div>a').eq(1).show()
	console.log(enter_condition.mobile)
	$('div.tele>div>a').eq(0).html('欢迎您' + enter_condition.mobile)
} else {
	$('div.tele>div>a').show()
	$('div.tele>div>a').eq(0).hide()
	$('div.tele>div>a').eq(1).hide()
}
//注销功能的实现
$('div.tele>div>a').eq(1).click(function (event) {
	event.preventDefault();
	window.localStorage.removeItem('enter_condition')
	window.location.assign('enter.html')
})
//导航栏的时间显示
setInterval(function () {
	var a = new Date()
	new_time = parseInt(a.valueOf() / 1000)
	var year = a.getFullYear()//年
	var month = a.getMonth()+1//月
	var days= a.getDate()//日
	var hour = a.getHours() //时
	var second = a.getSeconds() //秒
	var minute = a.getMinutes() //分

	//渲染
	$('div.tele>span.span_time span').eq(0).html(year + '年')

	$('div.tele>span.span_time span').eq(1).html(month + '月')

	$('div.tele>span.span_time span').eq(2).html(days + '日')
	
	$('div.tele>span.span_time span').eq(3).html(hour + '时')
	$('div.tele>span.span_time span').eq(4).html(minute + '分')
	$('div.tele>span.span_time span').eq(5).html(second + '秒')
}, 1000)
//导航栏的移入移出效果
$('div.navigate>a').mouseover(function () {
	$(this).css({
		'color': '#ccc'
	})
})
$('div.navigate>a').mouseout(function () {
	$(this).css({
		'color': '#000'
	})
})
