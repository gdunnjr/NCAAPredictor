//----------------------------------------------------------
// Simple app that simulates NCAA Basketball Tournament games
//	as a simple example of using of node.js and async.js
//
// Author: Gerald Dunn
// Date: 3/22/2014
//----------------------------------------------------------

async = require("async");

// number of teams in each region
var numTeams = 16;

// array to hold the data
var teams = new Array(numTeams);
var teams2 = new Array(numTeams);
var teams3 = new Array(numTeams);
var teams4 = new Array(numTeams);
var teamRank = new Array(numTeams);
var round1 = new Array(numTeams);
var final4 = Array(4);

// load the arrays with data
loadData();

// Array to hold async tasks
var asyncTasks = [];

// This puts a function on the node asyncTasks queue - it doesn't run it yet
asyncTasks.push(function(callback){
	// Set a timeout for 2 seconds - this cause a delay of  3 seconds before
	//	running the function. Using it here to illustrate the parellelsm. As you will
	//  see from the consloe output this function is called first, but finishes last.
	setTimeout(function() {
	 	console.log('\nPlaying Region 1 Games: \n');
		final4[0] = playGames(round1,teamRank,teams);
	  	console.log('End of Region 1 Games');
	    // The callback alerts the async.parallel call that this function is done
	  	callback();
	}, 2000);
});

// Put the funtion on the queue to play the 2nd set of regional games
asyncTasks.push(function(callback){
	// Set a timeout for 1 second
	setTimeout(function() {
	 	console.log('\nPlaying Region 2 Games: \n');
		final4[1] = playGames(round1,teamRank,teams2);
	  	console.log('End of Region 2 Games');
	  	callback();
	}, 1000);
});

// Put the function on the queue for the 3rd set of regional games
asyncTasks.push(function(callback){
	// No timeout on this one
	(function() {
		console.log('\nPlaying Region 3 Games: \n');
		final4[2] = playGames(round1,teamRank,teams3);
		console.log('End of Region 3 Games');
		callback();
	})();
});

// Add the function to play last set of regional games to the queue
asyncTasks.push(function(callback){
	// No timeout on this one
	(function() {
		console.log('\nPlaying Region 4 Games: \n');
		final4[3] = playGames(round1,teamRank,teams4);
		console.log('End of Region 4 Games');
	  	callback();
	})();
});

// Now we have an array of functions, each containing an async task
// The asybc.parallel will asycnrhonously execute the functions in the asyncTasks array, in parallel
//	when they are all complete the function (2nd argument) is invoked, to go ahead with the final 4 games
async.parallel(asyncTasks, function(){
	 // All tasks are done now - all regional games have been played
	console.log('\n-------Final 4-------------');
	console.log(teams[final4[0]]);
	console.log(teams2[final4[1]]);
	console.log(teams3[final4[2]]);
	console.log(teams4[final4[3]]);
	console.log('---------------------------');

	// this bit of code sets up arrays of the teams and ranks in the
	// final 4. A better way would be to have one array for all teams
	// instead of having them in arrays by region - just did it this
	//	way because it was easier to get and load the data in individual arrays
	var finalRoundTeams = [teams[final4[0]], teams2[final4[1]], teams3[final4[2]], teams4[final4[3]]];
	var finalRoundTeamRanks = [teamRank[final4[0]], teamRank[final4[1]], teamRank[final4[2]], teamRank[final4[3]]];
	var finalRoundMatchups = [0,1,2,3];
	console.log('\n------- Start of Final 4-------');
	playGames(finalRoundMatchups,finalRoundTeamRanks,finalRoundTeams);
	console.log('------- End Of Final 4---------');
	});

// this fucntion simulates "playing" the games. It uses the value in the _TeamRank array
//	(which is currently just the tournament seeding) to pick the winner. When the seeds are equal
//   as is the case in the final 4, a winner is picked at random. The _teams array is passed in
//	 soley for the purposes of logging the actual team name to the console
function playGames(_matchUps,_teamRank,_teams)
{
	var _winners = Array();
	var gameCnt = 0;
	var teamCnt = 0;

	for (_i=1; _i<=_matchUps.length/2; _i++)
	{
		t1=_matchUps[teamCnt];
		t2=_matchUps[teamCnt+1];
		if (_teamRank[t1]>_teamRank[t2]) winner=t1;
		if (_teamRank[t2]>_teamRank[t1]) winner=t2;
		// flip a coin if they have the same ranking
		if (_teamRank[t2]==_teamRank[t1]) {
			if ( Math.floor((Math.random()*1000)+1) >=500) {
				winner=t1;
			} else {
				winner=t2;
			}
		}
		_winners[gameCnt] = winner;
        console.log(_teams[t1] + " vs " + _teams[t2] + " - Winner: " + _teams[winner]);
		gameCnt = gameCnt + 1;
		teamCnt = teamCnt + 2;
	};

	// See if there's more games to play
	if (_matchUps.length/2 > 1)
	{
		// use recusion to play the next round
		return playGames(_winners,_teamRank,_teams)
	}
	else
	{
		console.log("\n" + "The winner of the round is: " + _teams[_winners[0]] + "!");
		return _winners[0];
	}
};

// Many better ways to handle the data. This approach was chosen for
//	its expediency
function loadData()
{
	teams[0] = "Wichita State";
	teams[1] = "Michigan";
	teams[2] = "Duke";
	teams[3] = "Louisville";
	teams[4] = "Saint Louis";
	teams[5] = "Massachusetts";
	teams[6] = "Texas";
	teams[7] = "Kentucky";
	teams[8] = "Kansas State";
	teams[9] = "Arizona State";
	teams[10] = "IOW/TEN";
	teams[11] = "NC State";
	teams[12] = "Manhattan";
	teams[13] = "Mercer";
	teams[14] = "Wofford";
	teams[15] = "CP/TSU";

	teams2[0] = "Arizona";
	teams2[1] = "Wisconsin";
	teams2[2] = "Creighton";
	teams2[3] = "San Diego State";
	teams2[4] = "Oklahoma";
	teams2[5] = "Baylor";
	teams2[6] = "Oregon";
	teams2[7] = "Gonzaga";
	teams2[8] = "Oklahoma State";
	teams2[9] = "BYU";
	teams2[10] = "Nebraska";
	teams2[11] = "North Dakota St.";
	teams2[12] = "New Mexico St.";
	teams2[13] = "La.-Lafayette";
	teams2[14] = "American";
	teams2[15] = "Weber State";

	teams3[0] = "Florida";
	teams3[1] = "Kansas";
	teams3[2] = "Syracuse";
	teams3[3] = "UCLA";
	teams3[4] = "VCU";
	teams3[5] = "Ohio State";
	teams3[6] = "New Mexico";
	teams3[7] = "Colorado";
	teams3[8] = "Pittsburgh";
	teams3[9] = "Stanford";
	teams3[10] = "Dayton";
	teams3[11] = "Steph. F. Austin";
	teams3[12] = "Tulsa";
	teams3[13] = "Western Mich.";
	teams3[14] = "Eastern Kentucky";
	teams3[15] = "Albany";

	teams4[0] = "Virginia";
	teams4[1] = "Villanova";
	teams4[2] = "Iowa State";
	teams4[3] = "Michigan State";
	teams4[4] = "Cincinnati";
	teams4[5] = "North Carolina";
	teams4[6] = "Connecticut";
	teams4[7] = "Memphis";
	teams4[8] = "Geo. Washington";
	teams4[9] = "Saint Joseph's";
	teams4[10] = "Providence";
	teams4[11] = "Harvard";
	teams4[12] = "Delaware";
	teams4[13] = "N.C. Central";
	teams4[14] = "Milwaukee";
	teams4[15] = "Coastal Caro.";

	teamRank[0] = 299;
	teamRank[1] = 296;
	teamRank[2] = 291;
	teamRank[3] = 284;
	teamRank[4] = 275;
	teamRank[5] = 264;
	teamRank[6] = 251;
	teamRank[7] = 236;
	teamRank[8] = 219;
	teamRank[9] = 200;
	teamRank[10] = 179;
	teamRank[11] = 156;
	teamRank[12] = 131;
	teamRank[13] = 104;
	teamRank[14] = 75;
	teamRank[15] = 44;

	round1[0] = 0;
	round1[1] = 15;
	round1[2] = 7;
	round1[3] = 8;
	round1[4] = 4;
	round1[5] = 11;
	round1[6] = 3;
	round1[7] = 12;
	round1[8] = 5;
	round1[9] = 10;
	round1[10] = 2;
	round1[11] = 13;
	round1[12] = 6;
	round1[13] = 9;
	round1[14] = 1;
	round1[15] = 14;
};
