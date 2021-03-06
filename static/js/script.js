// Challenge 1: Your Age in Days
function ageInDays(){
    var birthYear = prompt('What year were you born... Good friend?');
    var ageInDay = (2022 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDay + ' days old');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "static/images/big-mouth-cat.gif";
    image.style = "height: 130px; width: 180px";
    div.appendChild(image);
}

// Challenge 3: Rock, Scissors, Paper
function rpsGame(choice){
    console.log(choice.id);
    var humanChoice, botChoice;
    humanChoice = choice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:',botChoice);
    results = decideWinner(humanChoice,botChoice); //[0,1] human lost | bot won
    console.log(results);
    message = finalMessage(results); // {'message':'You won!', 'color':'green'}
    console.log(message);
    rpsFrontEnd(choice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'scissors', 'paper'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock':0.5,'paper':0},
        'scissors':{'paper':1, 'scissors':0.5,'rock':0},
        'paper':{'rock':1, 'paper':0.5,'scissors':0}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message':'You lost!', 'color':'red'};
    } else if (yourScore === 0.5) {
        return {'message':'You tied!', 'color':'yellow'};
    } else {
        return {'message':'You won!', 'color':'green'};
    }
    
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'scissors': document.getElementById('scissors').src,
        'paper':document.getElementById('paper').src,
    }
    
    // let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+ imagesDatabase[humanImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50, 233, 1);'/>";
    messageDiv.innerHTML = "<h1 style='color: "+finalMessage['color']+ "; font0size: 60px; padding:30px;'>"+ finalMessage['message'] +"</h1>";
    botDiv.innerHTML = "<img src='"+ imagesDatabase[botImageChoice]+ "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38, 24, 1);'/>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons =[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}



function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonsReset();
    } else if(buttonThingy.value === 'random'){
        buttonsRandom();
    } 
}

function buttonsRed(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}


function buttonsRandom(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(let i=0; i<all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Challenge 5: Blackjack
// ????????? ?????? 
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result','div':'#your-box','score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    "cardsMap": {'A': [1, 11], '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10},
    'wins':0,
    'draws':0,
    'losses':0,

};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

// querySelector??? ??????????????? ??????
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);

// stand ?????? ?????? 
function blackjackStand(){
    // ????????? 16??? ????????? ?????? ????????? ??????
    while(DEALER['score'] < 16 ){
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
    }
    // ?????? ??????
    showResult(computerWinner());
    gameEnd();
}

// ?????? ??????
function computerWinner(){
    let winner;
    // ?????? ????????? 21??? ??????
    if (YOU['score'] <= 21){
        // ??????????????? ?????????????????? ????????? ????????? bust??? ????????????
        if (YOU['score'] > DEALER['score'] || DEALER['score'] >21) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){ // ???????????? ????????? ?????????
            winner = DEALER;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){ // ????????? bust ??? ????????? 21??? ????????????
        winner = DEALER;
    }
    
    return winner;
}

// ?????? ??????
function showResult(winner){
    resultSpan = document.querySelector('#blackjack-result');
    if(winner == YOU){
        resultSpan.textContent = '???????????????! :D';
        resultSpan.style.color = 'green';
        const cash = new Audio('static/sounds/cash.mp3');
        cash.play();
        blackjackGame['wins']++;
    } else if(winner == DEALER){
        resultSpan.textContent = '???????????? T^T';
        resultSpan.style.color = 'red';
        const aww = new Audio('static/sounds/aww.mp3');
        aww.play();
        blackjackGame['losses']++;
    } else {
        resultSpan.textContent = '???????????????!';
        resultSpan.style.color = 'white';
        blackjackGame['draws']++;
    }
}

// hit ?????? ??????
function blackjackHit(){
    resultSpan = document.querySelector('#blackjack-result');
    if(YOU['score'] <= 21){
        let card = randomCard();
        showCard(YOU,card);
        updateScore(YOU,card);
        showScore(YOU);
        if(YOU['score'] > 21){
            loseEffect();
        }
    } else {
        loseEffect();
    }
}

function loseEffect(){
    resultSpan.textContent = '???????????? T^T';
        resultSpan.style.color = 'red';
        const aww = new Audio('static/sounds/aww.mp3');
        aww.play();
        blackjackGame['losses']++;
        gameEnd();
}

function gameEnd(){
    document.querySelector('#blackjack-hit-button').removeEventListener('click',blackjackHit);
    document.querySelector('#blackjack-stand-button').removeEventListener('click',blackjackStand);
    document.querySelector('#blackjack-hit-button').addEventListener('click',endAlert);
    document.querySelector('#blackjack-stand-button').addEventListener('click',endAlert);
    updateTable();
}

function gameStart(){
    document.querySelector('#blackjack-hit-button').removeEventListener('click',endAlert);
    document.querySelector('#blackjack-stand-button').removeEventListener('click',endAlert);
    document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
    document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);
}

function endAlert(){
    alert("????????? ???????????????.\nDeal ????????? ???????????????");
}

// ???????????? ??????
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

// ?????? ??????
function showCard(activePlayer, card){
    let cardImage = document.createElement('img');
    cardImage.src = 'static/images/'+ card +'.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

// Deal?????? ??????
function blackjackDeal(){
    document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
    document.querySelector('#blackjack-result').style.color = '#212529';

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    
    for(i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;
    
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';

    gameStart();
}

// ?????? ????????? 
function updateTable(){
    let wins = document.querySelector('#wins');
    let losses = document.querySelector('#losses');
    let draws = document.querySelector('#draws');

    wins.textContent = blackjackGame['wins'];
    losses.textContent = blackjackGame['losses'];
    draws.textContent = blackjackGame['draws'];
}

function updateScore(activePlayer, card){
    if(card === 'A'){
    // 11??? ????????? 21??? ?????? ???????????? 11??? ????????? ????????? ????????? 1??? ?????????.
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

