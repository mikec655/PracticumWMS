/**
 * 
 */
var startTijd, totaalTijd = 0, aantalTijden = 0;
// StartTijd is de tijd dat het huidige spel begonnen is. 
// Totaaltijd is de som van de tijd van alle gespeelde spelletjes, aantaltijden is het aantal spelletjes 
var firstCard = '', secondCard = '';
// De eerste en tweede kaart die zijn omgedraaid.
var karakter;
// Het teken dat op de achterkant van de kaart getoond wordt
var intervalID,tijdID;
// De ID's voor de timeouts voor het terugdraaien van de kaarten en het bijwerken van de tijdweergave

var boardSize;
// Grootte van het bord 
var numberOfCards;
// Aantal kaarten op het bord
var numberOfCardsLeft;
// Aantal kaarten dat nog op het bord ligt
var topScores = [
                 {name:"Barack Obama", time:200},
                 {name:"Bernie Sanders", time:300},
                 {name:"Hillary Clinton", time:400},
                 {name:"Jeb Bush", time:500},
                 {name:"Donald Trump", time:600}
                 ]


function initGame(size) { 
	initVars(size);
	vulSpeelveld(size);
	showScores();
}

function initVars(size){
	// Initialiseer alle benodigde variabelen en de velden op het scherm 
	numberOfCards = size * size;
	numberOfCardsLeft = numberOfCards; 
	setTijden();
}

function vulSpeelveld(size){
	var tbl = document.getElementById("speelveld");
	var tblBody = document.createElement("tbody");
	
	var getNextLetter = new nextLetter(size);

  // cells creation
  for (var j = 0; j < size; j++) {
    // table row creation
		var row = document.createElement("tr");
		
    for (var i = 0; i < size; i++) {
      // create element <td> and text node 
      //Make text node the contents of <td> element
      // put <td> at end of the table row
			var cell = document.createElement("td");
			cell.className = "inactive";
			cell.addEventListener(
				'click',
				function() { cardClicked(this); },
				false
			);

			var text = document.createElement("p");
      var cellText = document.createTextNode(getNextLetter());
			
			text.appendChild(cellText)
      cell.appendChild(text);
      row.appendChild(cell);
    }

    //row added to end of table body
    tblBody.appendChild(row);
  }

  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);

}

function showScores(){
	// Vul het topscore lijstje op het scherm.
	var topScoresList = document.getElementById("topscores");
	for (var i = 0; i < 5; i++) {
		var score = topScores[i];
		var item = document.createElement("li");
    var value = document.createTextNode(score.name + ": " + score.time);
		item.appendChild(value);
		topScoresList.appendChild(item);
	}
}

function setTijden(){
	// bereken de verlopen tijd, de gemiddlede tijd en het verschil tussen 
	// de huidige speeltijd en de gemiddelde tijd en vul de elementen in de HTML.
	// Vul ook het aantal gevonden kaarten
}

function getSeconds(){
	var date = new Date();
	var millis = date.getTime();
	return Math.round(millis / 1000);
}

var nextLetter = function(size){
	var letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0,size*size).split('');
	var idx=0;
	letterArray=shuffle(letterArray);
	return function() {
		var letter = letterArray[idx++]; 
		return letter;
	}
} 

function cardClicked(card) {
	checkStarttijd();
	checkDerdeKaart();
	var draaiKaartOm = turnCard(card);
	if (draaiKaartOm==2){
		checkKaarten();
	}
}

function checkStarttijd(){
	// Controleer of de startijd van het spel gezet is, i.e. het spel al gestart was.
	// Als dat niet zo is doe dat nu, en start de timeOut voor het bijhouden van de tijd.
}

function checkDerdeKaart(){
	// Controleer of het de derde kaart is die wordt aangeklikt.
	// Als dit zo is kunnen de geopende kaarten gedeactiveerd (gesloten) worden.
	if (firstCard != '' && secondCard != '') {
		deactivateCards();
	}
}

function turnCard(card){
	// Draai de kaart om. Dit kan alleen als de kaart nog niet geopend of gevonden is.
	// Geef ook aan hoeveel kaarten er nu zijn omgedraaid en return dit zodat in de 
	// cardClicked functie de checkKaarten functie kan worden aangeroepen als dat nodig is.

	toggleCard(card);

	if (firstCard == '') {
		firstCard = card;
		return 1;
	} else if (secondCard == '') {
		secondCard = card;
		return 2
	}

	return 0;
}

function deactivateCards() { 
	// Functie om de twee omgedraaide kaarten weer terug te draaien
	firstCard.className = "inactive"
	firstCard = '';
	secondCard.className = "inactive";
	secondCard = '';
}

function toggleCard(element) {
	// Draai de kaart om, als de letter getoond wordt, toon dan de achterkant en 
	// vice versa. switch dus van active naar inactive of omgekeerd.
	if (element.className == "active") {
		element.className = "inactive"
	} else if (element.className == "inactive") { 
		element.className = "active"
	};
}

function checkKaarten(){
	// Kijk of de beide kaarten gelijk zijn. Als dit zo is moet het aantal gevonden paren 
	// opgehord worden, het aantal resterende kaarten kleiner worden en ervoor  
	// gezorgd worden dat er niet meer op de kaarten geklikt kan worden. De kaarten
	// zijn nu found.
	// Als de kaarten niet gelijk zijn moet de timer gaan lopen van de toontijd, en 
	// de timeleft geanimeerd worden zodat deze laat zien hoeveel tijd er nog is.
	var firstCardLetter = firstCard.childNodes[0].innerText;
	console.log(firstCardLetter);
	var secondCardLetter = secondCard.childNodes[0].innerText;
	console.log(secondCardLetter);

	if (firstCardLetter == secondCardLetter) {
		firstCard.className = "found";
		secondCard.className = "found";
		firstCard = '';
		secondCard = '';
	} 

}

// De functie tijdBijhouden moet elke halve seconde uitgevoerd worden om te controleren of 
// het spel klaar is en de informatie op het scherm te verversen.
function tijdBijhouden(){
	if (numberOfCardsLeft==0) {
		endGame();
	}
	else{
		setTijden();
	// Roep hier deze functie over 500 miliseconden opnieuw aan		
	}
}

function endGame(){
	// Bepaal de speeltijd, chekc topscores en doe de overige
	// administratie.
}

function updateTopScores(speelTijd){
	// Voeg de aangeleverde speeltijd toe aal de lijst met topscores
}

// Deze functie ververst de kleuren van de kaarten van het type dat wordt meegegeven.
function setColor(stylesheetId) {
	var valueLocation = '#value'+stylesheetId.substring(3);
	var color = $(valueLocation).val();
	$(stylesheetId).css('background-color', '#'+color );
	$(stylesheetId).css('color', '#'+color );
  }

// knuth array shuffle
// from https://bost.ocks.org/mike/shuffle/ 
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

$(document).ready(function(){
    $("#opnieuw").click(function(){
        initGame($("#size").val());
    });
});


