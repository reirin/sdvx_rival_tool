
var mydatafile = "http://sdvx-s.coresv.com/user/reirin.json?callback=?";
var rivaldatafile = "http://sdvx-s.coresv.com/user/tunedoc.json?callback=?";
var rivaldatafile2 = "http://sdvx-s.coresv.com/user/sample.json?callback=?";
var testdatafile = "testjson.json";

$(function () {
	$("#start").click(function(){
		// makeList();
	});

	$("#listset").click(makeList(mydatafile));

	$("#testset").click(makeList(testdatafile));
});

function makeList(file) {

		$.getJSON(file,function(data){
			console.log(data);
			var len = data.profile.tracks.length,
				// dia = "dialog",
				//" data-rel = "+dia+
				$tid = $("#tracks");

				for (var i = 0; i < len; i++) {
					var nsc = data.profile.tracks[i].novice.highscore;
					var asc = data.profile.tracks[i].advanced.highscore;
					var esc = data.profile.tracks[i].exhaust.highscore;
					if (nsc == undefined){
						nsc = 0;
					}
					if (asc == undefined){
						asc = 0;
					}
					if (esc == undefined){
						esc = 0;
					}
					$tid.prepend(
						"<li id = "+ i +"><a href = \"#score\" data-rel = \"popup\" data-transition = \"pop\" class = \"ui-btn ui-corner-all ui-btn-icon -left ui-icon-check\">" + data.profile.tracks[i].title + "<br> exhaust : "+esc+"</a></li>");
				}
				// $tid.listview("refresh");
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
				pg = data.profile.tracks[tracksid].infinite.grade;
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