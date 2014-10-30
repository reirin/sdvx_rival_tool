// var msg;
// msg = "hello"
// console.log(msg);

/*alert("alert!");

var ans = confirm("ture or false");
console.log(ans);

var name = prompt("name","ここに名前を入力してください。");

console.log(name);
*/

//関数

// function hello(name){
// 	console.log("hello"+ name);
// }

// var hello = function(name){ // 無名関数
// 	console.log("hello" + name);
// };

// //即時関数

// (function(atai){
// 	var x = 10,
// 		y = 20;//関数内なのでローカル変数になる。
// 	console.log("hello" + name);
// })("atai");
// hello("yuki");

//タイマー関数
	//setInterval 前の処理を確認せず指定された時間ごとに処理を繰り返す
	//setTimeout 指定された次官になったら処理を行う（前の処理を行ってから処理する）
/*
	var i = 0;

	function show(){
		console.log(i++);
		var tid = setTimeout(function(){
			show();
		}, 1000);
		if (i > 5){
			clearTimeout(tid);
		}
	}
	show();
	*/

//オブジェクト
/*
var user = {
	email: "aaa.mail",//プロパティ
	name: "reirin"
	id: 0
};

console.log(user.id);
console.log(user.name);
*/

//window.document; (DOM)
/*
var e = document.getElementById("msg");
e.textContent = 'hello';
e.style.color = 'red';
e.className = 'myStyle';

var greet = document.createElement('p'),
text = document.createTextNode('hello world');
document.body.appendChild(greet).appendChild(text);

document.getElementById('add').addEventListener('click',function(){
	var greet = document.createElement('p'),
	text = document.createTextNode('hello world');
	document.body.appendChild(greet).appendChild(text);
});
*/


$(function () {
	// body...
	$("table.tbl tbody").html("");

	$.getJSON("http://sdvx-s.coresv.com/user/reirin.json?callback=?",function(data){
		var len = data.profile.tracks.length,
			$jid = $("#demo");

			console.log(len);

			for (var i = 0; i < len; i++) {
				$jid.append($("<li>").text(data.profile.tracks[i].title));
				console.log(len);
			}
		console.log(data);
	});
});