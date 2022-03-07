var firstCaseId=1;
var numberOfCases=110;
var numberOfRows=10;
var numberOfColumns=11;
var numberOfChoices=4;
var caseIndex=1;
var firstIndexList = [];
var number;
var max;
var thisCase;
var roadLength;
var roadLengthList = [];
var clicking=true;
var myAnswer;
var myRoad;
var sumOfCases=0;
var counter;
var road1 = [];
var road2 = [];
var road3 = [];
var road4 = [];
var score=0;
var myMusicBG;
var rightChoice;
var wrongChoice;
var myChoiceSound;
var playing;

function createTable() {
    var tableStructure="";
    document.getElementById("theTable").innerHTML="";
    for (let index = 0; index < numberOfRows; index++) {
        tableStructure+="<tr>";
        for (let index2 = 0; index2 < numberOfColumns; index2++) {
            tableStructure+='<td id="'+caseIndex+'"></td>';
            caseIndex+=1;
        }
        document.getElementById("theTable").innerHTML+="</tr>";
    }
    document.getElementById("theTable").innerHTML=tableStructure;
}

function colorFirstColumn() {
    while (firstCaseId<numberOfCases) {
        var theCase = document.getElementById(firstCaseId);
        theCase.style.backgroundColor="gainsboro";
        firstCaseId=firstCaseId+numberOfColumns;
    }
}

function pickAnimalAndFood() {
    var animal=document.getElementById("animal");
    var food=document.getElementById("food");
    number=parseInt(Math.random()*4)+1;
    animal.src="images/animal"+number+".png";
    food.src="images/food"+number+".png";
}

function isUnder(a,b) {
    if (a+numberOfColumns==b)
        return true;
}

function pickFirstIndex() {
    max=(numberOfRows-(2*(numberOfChoices-1)))-1;
    firstIndexList[0]=(parseInt(Math.random()*max)*numberOfColumns)+1;
    for (index = 1; index < numberOfChoices; index++) {
        firstIndexList[index]=firstIndexList[index-1]+parseInt(Math.random()*(numberOfRows-((firstIndexList[index-1]-1)/11))+1)*numberOfColumns;
    }
    for (index = 1; index < numberOfChoices; index++) {
        if (isUnder(firstIndexList[index-1],firstIndexList[index]) || (firstIndexList[index]>numberOfCases)) {
            pickFirstIndex();
        }
    }
    for (let index = 0; index < numberOfChoices; index++) {
        document.getElementById(firstIndexList[index]).innerHTML='<a  href="javascript:checkAnswer('+index+');" id="'+"link"+firstIndexList[index]+'">'+(index+1)+'</a>';
    }
}

function inInterval(a) {
    if ((a >= 1) && a <= numberOfCases)
        return true;
    else
        return false;
}

function isGreen(a) {
    if (document.getElementById(a).style.backgroundColor=="green")
        return true;
    else
        return false;
}

function checkNear(a) {
    var caseSum=0;
    if (inInterval(a+numberOfColumns)) {
        if (isGreen(a+numberOfColumns))
            caseSum+=1;
    }
    if (inInterval(a-numberOfColumns)) {
        if (isGreen(a-numberOfColumns))
        caseSum+=1;
    }
    if (inInterval(a+1)) {
        if (isGreen(a+1))
        caseSum+=1;
    }
    if (inInterval(a-1)) {
        if (isGreen(a-1))
        caseSum+=1;
    }
    if (caseSum>1)
        return false;
    else
        return true;
}

function onTheDiagonalOrAhead(a) {
    if (a<=numberOfColumns)
        return false;
    if (inInterval(a-numberOfColumns)) {
        for (let index = a-numberOfColumns; index < (parseInt((a-1)/numberOfColumns))*numberOfColumns; index++) {
            if (isGreen(index)) {
                return true;
            }
        }
    }
    if (inInterval(a-numberOfColumns-1)) {
        if (isGreen(a-numberOfColumns-1)) {
            return true
        }
    }
    return false;
}

function fillNear(a,b) {
    var choice = parseInt((Math.random()*3));
    switch (choice) {
        case 0:
            if (inInterval(a+numberOfColumns) && !isGreen(a+numberOfColumns) && checkNear(a+numberOfColumns) ) {
                if (b<(firstIndexList.length-1)) {
                    if ((a+numberOfColumns)<(firstIndexList[b+1]-numberOfColumns)) {
                        document.getElementById(a+numberOfColumns).style.backgroundColor="green";
                        thisCase=a+numberOfColumns;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
                else
                {
                    if ((a+numberOfColumns)>(firstIndexList[b]-numberOfColumns)) {
                        document.getElementById(a+numberOfColumns).style.backgroundColor="green";
                        thisCase=a+numberOfColumns;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
            }
            else
                fillNear(a,b);
            break;
        case 1:
            if (inInterval(a-numberOfColumns) && !isGreen(a-numberOfColumns) && checkNear(a-numberOfColumns) && !onTheDiagonalOrAhead(a-numberOfColumns) ) {
                if (b<(firstIndexList.length-1)) {
                    if ((a-numberOfColumns)<(firstIndexList[b+1]-numberOfColumns)) {
                        document.getElementById(a-numberOfColumns).style.backgroundColor="green";
                        thisCase=a-numberOfColumns;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
                else
                {
                    if ((a-numberOfColumns)>(firstIndexList[b]-numberOfColumns)) {
                        document.getElementById(a-numberOfColumns).style.backgroundColor="green";
                        thisCase=a-numberOfColumns;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
            }
            else
                fillNear(a,b);
            break;

        case 2:
            if (inInterval(a+1) && !isGreen(a+1) && checkNear(a+1) ) {
                if (b<(firstIndexList.length-1)) {
                    if ((a+1)<(firstIndexList[b+1]-numberOfColumns)) {
                        document.getElementById(a+1).style.backgroundColor="green";
                        thisCase=a+1;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
                else
                {
                    if ((a+1)>(firstIndexList[b]-numberOfColumns)) {
                        document.getElementById(a+1).style.backgroundColor="green";
                        thisCase=a+1;
                        roadLength+=1;
                        switch (b) {
                            case 0:
                                road1[counter]=thisCase;
                                counter+=1;
                                break;
                            case 1:
                                road2[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 2:
                                road3[counter]=thisCase;
                                counter+=1;
                                    break;
                            case 3:
                                road4[counter]=thisCase;
                                counter+=1;
                                    break;
                        }
                        break;
                    }
                    else
                        fillNear(a,b);
                }
            }
            else
                fillNear(a,b);
            break;
    }
}

function onTheLastColumn(a) {
    if ((a%11==0) && (a<=numberOfCases))
        return true;
    else
        return false;
}

function resetToGray() {
    for (let index = 1; index <= numberOfCases; index++) {
        if ((index%11)!=1)
            document.getElementById(index).style.backgroundColor="gray";
    }
}

function fillRoad() {
    for (let index = 0; index < firstIndexList.length; index++) {
        thisCase=firstIndexList[index]+1;
        document.getElementById(thisCase).style.backgroundColor="green";
        roadLength=1;
        switch (index) {
            case 0:
                road1[0]=thisCase;
                counter=1;
                break;
            case 1:
                road2[0]=thisCase;
                counter=1;
                    break;
            case 2:
                road3[0]=thisCase;
                counter=1;
                    break;
            case 3:
                road4[0]=thisCase;
                counter=1;
                    break;
        }
        while (!onTheLastColumn(thisCase)) {
            fillNear(thisCase,index);
        }
        roadLengthList[index]=roadLength;
    }
}

function tryAgain() {
    for (let index = 0; index < numberOfChoices; index++) {
        document.getElementById(firstIndexList[index]).innerHTML='';
    }
    firstIndexList = [];
    road1 = [];
    road2 = [];
    road3 = [];
    road4 = [];
    pickFirstIndex();
    resetToGray();
    fillRoadUniqueLength();
}

function fillRoadUniqueLength() {
    fillRoad();
    for (let index = 0; index < roadLengthList.length; index++) {
        for (let index2 = index+1; index2 < roadLengthList.length; index2++) {
            if (roadLengthList[index]==roadLengthList[index2]) {
                tryAgain();
            }
        }
    }
    if (numberOfChoices<4) {
        if (checkIfAligned()) {
            tryAgain();
        }
    }
}

function colorBest() {
    var bestRoad;
    if (road3.length!=0) {
        bestRoad=Math.min(road1.length,road2.length,road3.length);
        if (road4.length!=0) {
            bestRoad=Math.min(road1.length,road2.length,road3.length,road4.length);
        }
    }
    else {
        bestRoad=Math.min(road1.length,road2.length);
    }
    switch (bestRoad) {
        case road1.length:
            for (let index = 0; index < road1.length; index++) {
                document.getElementById(road1[index]).style.backgroundColor="blue";
            }
            break;

        case road2.length:
            for (let index = 0; index < road2.length; index++) {
                document.getElementById(road2[index]).style.backgroundColor="blue";
            }
            break;
        case road3.length:
            for (let index = 0; index < road3.length; index++) {
                document.getElementById(road3[index]).style.backgroundColor="blue";
            }
            break;
        case road4.length:
            for (let index = 0; index < road4.length; index++) {
                document.getElementById(road4[index]).style.backgroundColor="blue";
            }
            break;
    }
}

function onWinning() {
    if (playing) {
        playBackgroundMusic();
    }
    rightChoice.play();
    document.getElementById("chemin").style.color="green";
    document.getElementById("chemin").innerHTML="est le meilleur, Félicitations!";
    score+=100;
    document.getElementById("score").innerHTML=score;
    if (numberOfChoices==2) {
        setTimeout(function() {
            document.getElementById("background").style.display="block";
            document.getElementById("winButton").style.display="none";
            document.getElementById("winText").innerHTML="Félicitations! Vous avez terminé tous les niveaux,<br>Votre score est: "+score;
            document.getElementById("win").style.display="block";
        }, 3000);
    }
    else {
        setTimeout(function() {
            document.getElementById("background").style.display="block";
            document.getElementById("win").style.display="block";
        }, 3000);
    }
}

function onLosing() {
    if (playing) {
        playBackgroundMusic();
    }
    wrongChoice.play();
    document.getElementById("chemin").innerHTML="n'est pas le meilleur!";
    setTimeout(function() {
        document.getElementById("background").style.display="block";
        document.getElementById("lose").style.display="block";
    }, 3000);
}

function theShortestRoad(a) {
    switch (a) {
        case 0:
            if (road3.length!=0) {
                if (road4.length!=0) {
                    if (road1.length==Math.min(road1.length,road2.length,road3.length,road4.length)) {
                        onWinning();
                        colorBest();
                    }
                    else {
                        onLosing();
                        colorBest();
                    }
                    break;
                }
                else {
                    if (road1.length==Math.min(road1.length,road2.length,road3.length)) {
                        onWinning();
                        colorBest();
                    }
                    else {
                        onLosing();
                        colorBest();
                    }
                    break;
                }
            }
            else {
                if (road1.length==Math.min(road1.length,road2.length)) {
                    onWinning();
                    colorBest();
                }
                else {
                    onLosing();
                    colorBest();
                }
                break;
            }
        case 1:
            if (road3.length!=0) {
                if (road4.length!=0) {
                    if (road2.length==Math.min(road1.length,road2.length,road3.length,road4.length)) {
                        onWinning();
                        colorBest();
                    }
                    else {
                        onLosing();
                        colorBest();
                    }
                    break;
                }
                else {
                    if (road2.length==Math.min(road1.length,road2.length,road3.length)) {
                        onWinning();
                        colorBest();
                    }
                    else {
                        onLosing();
                        colorBest();
                    }
                    break;
                }
            }
            else {
                if (road2.length==Math.min(road1.length,road2.length)) {
                    onWinning();
                    colorBest();
                }
                else {
                    onLosing();
                    colorBest();
                }
                break;
            }
        case 2:
            if (road4.length!=0) {
                if (road3.length==Math.min(road1.length,road2.length,road3.length,road4.length)) {
                    onWinning();
                    colorBest();
                }
                else {
                    onLosing();
                    colorBest();
                }
                break;
            }
            else {
                if (road3.length==Math.min(road1.length,road2.length,road3.length)) {
                    onWinning();
                    colorBest();
                }
                else {
                    onLosing();
                    colorBest();
                }
                break;
            }
        case 3:
            if (road4.length==Math.min(road1.length,road2.length,road3.length,road4.length)) {
                onWinning();
                colorBest();
            }
            else {
                onLosing();
                colorBest();
            }
            break;
    }
}

function checkAnswer(a) {
    if (clicking) {
        myChoiceSound.play();
        var sourceOfImage=document.getElementById("animal").src;
        clicking=false;
        myAnswer=firstIndexList[a]+1;
        thisCase=myAnswer;
        counter=0;
        var id;
        switch (a) {
            case 0:
                document.getElementById("animal").src='';
                document.getElementById("animal").style.display="none";
                id=setInterval(() => {
                    document.getElementById(road1[counter]).innerHTML='<img src="'+sourceOfImage+'">';
                    document.getElementById("parcouru").innerHTML=counter+1;
                    if (counter>0) {
                        document.getElementById(road1[counter-1]).innerHTML='';
                    }
                    counter+=1;
                    if (counter > road1.length-1) {
                        clearInterval(id);
                        setTimeout(() => {
                            document.getElementById(road1[counter-1]).innerHTML='';
                            document.getElementById("animalFinal").src=sourceOfImage;
                            theShortestRoad(a);
                        }, 1000);
                    }
                }, 1000);
                break;
            case 1:
                document.getElementById("animal").src='';
                document.getElementById("animal").style.display="none";
                id=setInterval(() => {
                    document.getElementById(road2[counter]).innerHTML='<img src="'+sourceOfImage+'">';
                    document.getElementById("parcouru").innerHTML=counter+1;
                    if (counter>0) {
                        document.getElementById(road2[counter-1]).innerHTML='';
                    }
                    counter+=1;
                    if (counter > road2.length-1) {
                        clearInterval(id);
                        setTimeout(() => {
                            document.getElementById(road2[counter-1]).innerHTML='';
                            document.getElementById("animalFinal").src=sourceOfImage;
                            theShortestRoad(a);
                        }, 1000);
                    }
                }, 1000);
                break;
            case 2:
                document.getElementById("animal").src='';
                document.getElementById("animal").style.display="none";
                id=setInterval(() => {
                    document.getElementById(road3[counter]).innerHTML='<img src="'+sourceOfImage+'">';
                    document.getElementById("parcouru").innerHTML=counter+1;
                    if (counter>0) {
                        document.getElementById(road3[counter-1]).innerHTML='';
                    }
                    counter+=1;
                    if (counter > road3.length-1) {
                        clearInterval(id);
                        setTimeout(() => {
                            document.getElementById(road3[counter-1]).innerHTML='';
                            document.getElementById("animalFinal").src=sourceOfImage;
                            theShortestRoad(a);
                        }, 1000);
                    }
                }, 1000);
                break;
            case 3:
                document.getElementById("animal").src='';
                document.getElementById("animal").style.display="none";
                id=setInterval(() => {
                    document.getElementById(road4[counter]).innerHTML='<img src="'+sourceOfImage+'">';
                    document.getElementById("parcouru").innerHTML=counter+1;
                    if (counter>0) {
                        document.getElementById(road4[counter-1]).innerHTML='';
                    }
                    counter+=1;
                    if (counter > road4.length-1) {
                        clearInterval(id);
                        setTimeout(() => {
                            document.getElementById(road4[counter-1]).innerHTML='';
                            document.getElementById("animalFinal").src=sourceOfImage;
                            theShortestRoad(a);
                        }, 1000);
                    }
                }, 1000);
        }
    }
}

function checkIfAligned() {
    if (road1.length==numberOfColumns-1 || road2.length==numberOfColumns-1 || road3.length==numberOfColumns-1) {
        return true;
    }
    else
        return false;
}

function sound(source) {
    this.sound = document.createElement("audio");
    this.sound.src = source;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function playBackgroundMusic() {
    if (playing) {
        myMusicBG.stop();
        playing=false;
        document.getElementById("bgMusicButton").value="jouer le son";
    }
    else {
        myMusicBG.play();
        playing=true;
        document.getElementById("bgMusicButton").value="arrêter le son";
    }
}

function startPlaying() {
    playBackgroundMusic();
    document.getElementById("myGame").style.display="block";
    document.getElementById("welcomeScreen").style.display="none";
}

function playAgain() {
    clicking=true;
    if (score > 0) {
        score-=50;
    }
    document.getElementById("animal").style.display="inline-block";
    document.getElementById("background").style.display="none";
    document.getElementById("lose").style.display="none";
    document.getElementById("animalFinal").src='';
    document.getElementById("parcouru").innerHTML=0;
    document.getElementById("chemin").innerHTML='';
    document.getElementById("score").innerHTML=score;
    pickAnimalAndFood();
    tryAgain();
    if (numberOfChoices==2) {
        lastLevel();
    }
    if (!playing) {
        switch (numberOfChoices) {
            case 4:
                myMusicBG= new sound("sounds/bgsound.mp3");
                break;
            case 3:
                myMusicBG= new sound("sounds/bgsound2.mp3");
                break;
            case 2:
                myMusicBG= new sound("sounds/bgsound3.mp3");
                break;
        }
        playBackgroundMusic();
    }
}

function nextLevel() {
    for (let index = 0; index < numberOfChoices; index++) {
        document.getElementById(firstIndexList[index]).innerHTML='';
    }
    if (numberOfChoices>2) {
        clicking=true;
        numberOfChoices--;
        document.getElementById("animal").style.display="inline-block";
        document.getElementById("background").style.display="none";
        document.getElementById("win").style.display="none";
        document.getElementById("animalFinal").src='';
        document.getElementById("parcouru").innerHTML=0;
        document.getElementById("chemin").innerHTML='';
        document.getElementById("score").innerHTML=score;
        document.getElementById("chemin").style.color="red";
        pickAnimalAndFood();
        tryAgain();
        if (numberOfChoices==2) {
            lastLevel();
        }
        myMusicBG.stop();
        switch (numberOfChoices) {
            case 3:
                myMusicBG= new sound("sounds/bgsound2.mp3");
                break;
            case 2:
                myMusicBG= new sound("sounds/bgsound3.mp3");
                break;
        }
        if (!playing) {
            playBackgroundMusic();
        }
        else {
            myMusicBG.play();
        }
    }
}

function lastLevel() {
    while (Math.abs(road1.length-road2.length)>1) {
        tryAgain();
    }
}

function onStart() {
	myMusicBG= new sound("sounds/bgsound.mp3");
	rightChoice= new sound("sounds/rightchoice.mp3");
    wrongChoice= new sound("sounds/wrongchoice.mp3");
    myChoiceSound= new sound("sounds/choicesound.mp3");
    createTable();
    colorFirstColumn();
    pickAnimalAndFood();
    pickFirstIndex();
    fillRoadUniqueLength();
}