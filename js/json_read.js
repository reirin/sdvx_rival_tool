var rivaldatafile2 = "http://sdvx-s.coresv.com/user/sample.json?callback=?";
var testdatafile = "testjson.json";

var username = "";
var rivalname = "";

$(function () {
//曲リストを作成する。
	$("#listset").click(makeList);
//通常画面でスクロールできるようにする。
	$(".scroll").click(scrollEvent);
//ダイアログ表示時（スコア表示時）に画面をスクロールできないように固定する。
	$("#settingButton").click(noscrollEvent);
	// $("#test").click(test);
});

//曲名表示時スクロールできるようにする。
function scrollEvent(){
	document.getElementById("noscroll").style.outline = "";
	document.getElementById("noscroll").style.overflow = "";
}
//ダイアログ表示（スコア表示時）にがめんをスクロールできないように固定する。
function noscrollEvent(){
	document.getElementById("noscroll").style.outline = "none";
	document.getElementById("noscroll").style.overflow = "hidden";
}

function onButtonClick() {
	username = document.getElementById("user").value;
	console.log(username);
    }

function onrivalButtonClick(){
	rivalname = document.getElementById("rivalname").value;
	console.log(rivalname);
}

function makeList() {
	var mydatafile = "http://sdvx-s.coresv.com/user/" + username + ".json?callback=?";

		$.getJSON(mydatafile,function(data){
			console.log(data);
			var len = data.profile.tracks.length,
				// dia = "dialog",
				//" data-rel = "+dia+
				$tid = $("#tracks");

				for (var i = 0; i < len; i++) {
					var nsc = data.profile.tracks[i].novice.highscore;
					var asc = data.profile.tracks[i].advanced.highscore;
					var esc = data.profile.tracks[i].exhaust.highscore;
					if (nsc == undefined)
						nsc = 0;
					if (asc == undefined)
						asc = 0;
					if (esc == undefined)
						esc = 0;
					$tid.prepend(
						"<li id = "+ i +"><a href = \"#score\" data-rel = \"popup\" data-transition = \"pop\" class = \"ui-btn ui-corner-all ui-btn-icon -left ui-icon-check\">" + data.profile.tracks[i].title + "<br> exhaust : "+ esc +"</a></li>");
				}
				// $tid.listview("refresh");
				rivalDisp(data);
			});
	}

	function rivalDisp(userdata){
		var tid = 0;
		var playername = [];
		var score = [];
		var rivaldatafile = "http://sdvx-s.coresv.com/user/" + rivalname + ".json?callback=?";
		$("li").click(function() {
			noscrollEvent();
			$("#rival").text("");
			tid = $(this).attr("id");
			console.log(tid);
			$("#trackname").text(userdata.profile.tracks[tid].title);
			$.getJSON(rivaldatafile,function(rivaldata){
				console.log(rivaldata.profile.name);
				if(rivaldata.profile.tracks[tid].exhaust.highscore < userdata.profile.tracks[tid].exhaust.highscore){
					playername[0] = userdata.profile.name;
					score[0] = userdata.profile.tracks[tid].exhaust.highscore;
					playername[1] = rivaldata.profile.name;
					score[1] = rivaldata.profile.tracks[tid].exhaust.highscore;
				}else{
					playername[0] = rivaldata.profile.name;
					score[0] = rivaldata.profile.tracks[tid].exhaust.highscore;
					playername[1] = userdata.profile.name;
					score[1] = userdata.profile.tracks[tid].exhaust.highscore;
				}
				$("#rival").append("<p><ol><li>"+playername[0]+":"+score[0]+"</li><li>"+playername[1]+":"+score[1]+"</li></ol></p>");
			})

		});
	}

	function scoreDisp(data){
		var tracksid, ps;
		$("li").click(function(e){
			$("#playerscore").text("");
			tracksid = $(this).attr("id");
			console.log($(this).attr("id"));
			$("#trackname").text(data.profile.tracks[tracksid].title);
		//novice
		if(data.profile.tracks[tracksid].novice.highscore != undefined){
			ps = data.profile.tracks[tracksid].novice.highscore;
			pg = data.profile.tracks[tracksid].novice.grade;
		}else{
			ps = 0;
			pg = "no play";
		}
		$("#playerscore").append("<p>novice　:　" + ps + " </p>").append("<p> grade : " + pg + "</p>");
		//advanced
		if(data.profile.tracks[tracksid].advanced.highscore != undefined){
			ps = data.profile.tracks[tracksid].advanced.highscore;
			pg = data.profile.tracks[tracksid].advanced.grade;
		}else{
			ps = 0;
			pg = "no play";
		}
		$("#playerscore").append("<p>advanced　:　" + ps + "</p>").append("<p> grade : " + pg + "</p>");

		//exhaust
		if(data.profile.tracks[tracksid].exhaust.highscore != undefined){
			ps = data.profile.tracks[tracksid].exhaust.highscore;
			pg = data.profile.tracks[tracksid].exhaust.grade;
		}else{
			ps = 0;
			pg = "no play";
		}
		$("#playerscore").append("<p>exhaust　:　" + ps + "</p>").append("<p> grade : " + pg + "</p>");
		//infinite
		if(data.profile.tracks[tracksid].infinite != undefined){
			if(data.profile.tracks[tracksid].infinite.highscore != undefined){
				ps = data.profile.tracks[tracksid].infinite.highscore;
				pg = data.profile.tracks[tracksid].infinite.grade;
			}else{
				ps = 0;
				pg = "no play";
			}
			$("#playerscore").append("<p>infinite　:　" + ps + "</p>").append("<p> grade : " + pg + "</p>");
		}
	});
}

function rerode() {
	// body...
	$("home").trigger("creat");
}