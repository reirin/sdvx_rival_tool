$(function () {
	$("#start").click(function(){
		makeList();
	});

	$("#listset").click(function(){
		console.log("押されてるよ");
	});
});

function makeList() {
		//ネットからJsonファイルを取得する場合こっち
		var mydatafile = "http://sdvx-s.coresv.com/user/reirin.json?callback=?";
		var testdatafile = "testjson.json";

		$.getJSON(testdatafile,function(data){
			myfile = data;
			console.log(myfile);
			var len = data.profile.tracks.length,
			sid = "#score",
				// dia = "dialog",
				//" data-rel = "+dia+
				$tid = $("#tracks");

				for (var i = 0; i < len; i++) {
					$tid.prepend(
						"<li id = "+ i +"><a href = "+ sid +">" + data.profile.tracks[i].title + "</a></li>");
				}
				$tid.listview("refresh");
				scoreDisp(data);
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
				pg = data.profile.tracks[tracksid].inginite.grade;
			}else{
				ps = 0;
				pg = "no play";
			}
			$("#playerscore").append("<p>infinite　:　" + ps + "</p>").append("<p> grade : " + pg + "</p>");
		}
	});
}

function rerode () {
	// body...
	$("home").trigger("creat");
}