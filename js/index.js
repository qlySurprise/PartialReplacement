    // 菜单
	initMenu();
    showAtRight('1.html');
	function initMenu() {
		var menu = '';
		var menuBox = '<div id="header">' +
			'			<div id="nav">' +
			'				<div class="logo"></div>' +
			'				<ul class="navMenu"></ul>' +
			'			</div>';
		menu += '<li class="hasList hasList1 active" data-url="1.html">' +
			'		<img src="img/enterprise_1.png" class="navImg" />' +
			'		<p>1</p>' +
			'	 </li>' +
			'    <li class="hasList hasList2" data-url="2.html">' +
			'		<img src="img/finance_1.png" class="navImg" />' +
			'		<p>2</p>' +
			'	 </li>' +
			'    <li class="hasList hasList3" data-url="3.html">' +
			'		<img src="img/staffs_1.png" class="navImg" />' +
			'		<p>3</p>' +
			'	 </li>';
		$("#content").before(menuBox);
		$('.navMenu').append(menu);
	}
	$(".hasList").click(function () {
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		var hasUrl = $(this).attr("data-url");
		if (hasUrl != '' && hasUrl != null && hasUrl != undefined && hasUrl != 'null') {
			showAtRight(hasUrl);
		} else {

        }

	});
    /*
	 * 解决ajax返回的页面中含有javascript的办法：
	 * 把xmlHttp.responseText中的脚本都抽取出来，不管AJAX加载的HTML包含多少个脚本块，我们对找出来的脚本块都调用eval方法执行它即可
	 */
	function executeScript(html, url) {

	    var reg = /<script[^>]*>([^\x00]+)$/i;
	    //对整段HTML片段按<\/script>拆分
	    var htmlBlock = html.split("<\/html>");
	    for (var i in htmlBlock) {
	        var blocks = htmlBlock[i].match(reg); //匹配正则表达式的内容数组，blocks[1]就是真正的一段脚本内容，因为前面reg定义我们用了括号进行了捕获分组
	        if (blocks) {
	            //清除可能存在的注释标记，对于注释结尾-->可以忽略处理，eval一样能正常工作
	            var code = blocks[0].replace(/<!--/, '');
	            try {
	                var urlName = 'js/' + url.split('.')[0] + '.js';
	                var head = document.getElementsByTagName('head')[0];
	                var headLastChid = head.lastChild;
	                if (headLastChid.id == 'layuicss-laydate') {} else {
	                    headLastChid.parentNode.removeChild(headLastChid)
	                    console.log("移除最后一个JS")
	                }
	                var script = document.createElement('script');
	                script.type = 'text/javascript';
	                script.src = urlName;
	                head.appendChild(script);
	                console.log(head.lastChild);
	                //eval(code) //执行脚本
	            } catch (e) {}
	        }
	    }
	}

	/*
	 * 利用div实现左边点击右边显示的效果（以id="content"的div进行内容展示）
	 * 注意：
	 *   ①：js获取网页的地址，是根据当前网页来相对获取的，不会识别根目录；
	 *   ②：如果右边加载的内容显示页里面有css，必须放在主页（即例中的index.jsp）才起作用
	 *   （如果单纯的两个页面之间include，子页面的css和js在子页面是可以执行的。 主页面也可以调用子页面的js。但这时要考虑页面中js和渲染的先后顺序 ）
	 */
	function showAtRight(url) {
	    var xmlHttp;

	    if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlHttp = new XMLHttpRequest(); //创建 XMLHttpRequest对象
	    } else {
	        // code for IE6, IE5
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    xmlHttp.onreadystatechange = function () {
	        //onreadystatechange — 当readystate变化时调用后面的方法

	        if (xmlHttp.readyState == 4) {
	            //xmlHttp.readyState == 4	——	finished downloading response

	            if (xmlHttp.status == 200) {
	                //xmlHttp.status == 200		——	服务器反馈正常			

	                document.getElementById("content").innerHTML = xmlHttp.responseText; //重设页面中id="content"的div里的内容
	                executeScript(xmlHttp.responseText, url); //执行从服务器返回的页面内容里包含的JavaScript函数
	            }
	            //错误状态处理
	            else if (xmlHttp.status == 404) {
	                alert("出错了☹   （错误代码：404 Not Found），……！");
	                /* 对404的处理 */
	                return;
	            } else if (xmlHttp.status == 403) {
	                alert("出错了☹   （错误代码：403 Forbidden），……");
	                /* 对403的处理  */
	                return;
	            } else {
	                alert("出错了☹   （错误代码：" + request.status + "），……");
	                /* 对出现了其他错误代码所示错误的处理   */
	                return;
	            }
	        }

	    }

	    //把请求发送到服务器上的指定文件（url指向的文件）进行处理
	    xmlHttp.open("GET", url, true); //true表示异步处理
	    xmlHttp.send();
	}