// Challenge 1: Your Age in Days
function ageInDays(){
    var birthYear = prompt("What year where you born?");
    var age = (2020 - birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode("You are " + age + " days old.");
    h1.setAttribute("id", "age");
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('age').remove();
}

// Challenge 2: Cat Generator
function catgenerate(){
    var catGen = document.getElementById("flex-box-cat");
    var img = document.createElement("img");
    var text = "http://thecatapi.com/api/images/get?format=src&type=gif&size=extra-small";
    img.setAttribute("src", text) ;
    catGen.appendChild(img);
}

// Challenge 3: Rock Paper Scissors
function rpsGame(mychoice){
    let human_choice = mychoice.id;
    let bot_choice = randomToInt(randomselect());
    winner = decideWinner(human_choice, bot_choice);
    message = generateMessage(winner);
    rpsFrontEnd = finalMessage(human_choice, bot_choice, message);
}

function randomselect(){
    let bot_choice = Math.floor(Math.random() * 3);
    return bot_choice;
}

function randomToInt(number){
    return ['rock','scissors','paper'][number];
}

function decideWinner(human_choice, bot_choice){
    var choices = {
        'rock': {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'scissors': {'rock': 0, 'paper': 1, 'scissors': 0.5},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0}
    }
    return choices[human_choice][bot_choice];
}
function generateMessage(winner){
    
    if (winner === 1)
    {
        return {'message': "You win", 'color': 'green'};
    }
    else if (winner === 0){
        return {'message': "You win", 'color': 'red'};
    }
    else{
        return {'message': "It's a draw", 'color': 'blue'};
    }
}
function finalMessage(human_choice, bot_choice, message){
    var images = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    humanDiv.innerHTML = "<img src='"+images[human_choice]+"'>";
    messageDiv.innerHTML = "<h1 style='color:"+message['color']+";font-size:50px;align:center';>"+message['message']+"</h2>";
    botDiv.innerHTML = "<img src='"+images[bot_choice]+"'>";

    document.getElementById('flex-box-container-3-div').appendChild(humanDiv);
    document.getElementById('flex-box-container-3-div').appendChild(messageDiv);
    document.getElementById('flex-box-container-3-div').appendChild(botDiv);
}

// Challenge 4: Random Color
var all_buttons = document.getElementsByTagName('button');
var copy_buttons = [];
for (let i=0; i<all_buttons.length; i++){
    copy_buttons.push(all_buttons[i].classList[1]);
}
function buttonChangeColor(buttonSelected){
    if (buttonSelected.value == 'red'){
        buttonChangeRed();
    }
    else if (buttonSelected.value == 'green'){
        buttonChangeGreen();
    }
    else if (buttonSelected.value == 'random'){
        buttonChangeRandom();
    }
    else if (buttonSelected.value == 'reset'){
        buttonChangeReset();
    }
}

function buttonChangeGreen()
{
    for (let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonChangeRed(){
    for (let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonChangeRandom(){
    let choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning']
    for (let i=0; i<all_buttons.length; i++)
    {
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

function buttonChangeReset(){
    for (let i=0; i<all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copy_buttons[i]);
    }
}

// Challenge 6: BlackJack
var blackJack = {
                    'you': {'spanResult': '#your-result', 'card-score': '#yourscore', 'score':0},
                    'bot': {'spanResult': '#bot-result', 'card-score': '#botscore', 'score':0},
                    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
                    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
                    'wins':0,
                    'draws':0,
                    'loses':0,
                    'isStand': false,
                    'turnOver': false,
                    'isHit': false
                };

const YOU = blackJack['you'];
const DEALER = blackJack['bot'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackJackStand);

const hitSound = new Audio('static/sounds/swish.m4a');
const clearSound = new Audio('static/sounds/woosh.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');
const winSound = new Audio('static/sounds/cash.mp3');

function blackJackHit(){
    showCard(YOU);
    showScore(YOU);
    if (YOU['score'] !==0){
        blackJack['isStand']=true;
    }
    
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function blackJackStand(){
    console.log()
    if (blackJack['isStand'] === true){
        while(DEALER['score'] <16){
            showCard(DEALER);
            showScore(DEALER);
            await sleep(800);
        }
        let winner = decideWinner();
        showWinner(winner);
        blackJack['turnOver'] = true;
    }
    
}

function showCard(activePlayer){
    let card = randomSelect();
    let img = document.createElement('img');
    img.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['card-score']).appendChild(img);
    let score = updateScore(card, activePlayer);
    hitSound.play();
    return score;
}

function showScore(activePlayer){
    if (activePlayer['score']<=21){
        document.querySelector(activePlayer['spanResult']).textContent = activePlayer['score'];
    }
    else{
        document.querySelector(activePlayer['spanResult']).textContent = 'BUST';
        document.querySelector(activePlayer['spanResult']).style.color = 'red';
    }
    
}

function updateScore(card, activePlayer){
    if (card == 'A'){
        if (activePlayer['score']+blackJack['cardMap'][card][1] < 21){
            activePlayer['score']+=blackJack['cardMap'][card][1];
        }
        else{
            activePlayer['score']+=blackJack['cardMap'][card][0];
        }
    }
    else{
        activePlayer['score']+=blackJack['cardMap'][card];

    }
    console.log(activePlayer['score']);
    return activePlayer['score'];
}

function randomSelect(){
    let choice = Math.floor(Math.random() * 13);
    return blackJack['cards'][choice];
}

function blackJackDeal(){
    if (blackJack['turnOver'] == true){
        let yourImages = document.querySelector(YOU['card-score']).querySelectorAll('img');
        for(let i=0; i<yourImages.length; i++){
            yourImages[i].remove();
        }
        let botImages = document.querySelector(DEALER['card-score']).querySelectorAll('img');
        for(let i=0; i<botImages.length; i++){
            botImages[i].remove();
        }
        document.querySelector(YOU['spanResult']).textContent = 0;
        document.querySelector(YOU['spanResult']).style.color = 'white';
    
        document.querySelector(DEALER['spanResult']).textContent = 0;
        document.querySelector(DEALER['spanResult']).style.color = 'white';
    
        YOU['score']=0;
        DEALER['score']=0;
    
        document.querySelector('#result-message').textContent = "Let's Play";
        document.querySelector('#result-message').style.color = 'black';
        clearSound.play();
        blackJack['turnOver'] = false;
        blackJack['isStand']=false;
    }
}

function decideWinner(){
    let winner;
    if (YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackJack['wins']++;
            document.querySelector('#wins').textContent = blackJack['wins'];
            winner=YOU;
            console.log('win');
        }
        else if (YOU['score']<DEALER['score']){
            blackJack['loses']++;
            document.querySelector('#loses').textContent = blackJack['loses'];
            winner=DEALER;
            console.log('lose');
        }
        
        else if (YOU['score'] == DEALER['score']){
            blackJack['draws']++;
            document.querySelector('#draws').textContent = blackJack['draws'];
            console.log('draw');
        }
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        blackJack['draws']++;
        document.querySelector('#draws').textContent = blackJack['draws'];
        console.log('draw');
    }
    else if (YOU['score']>21 && DEALER['score']<=21){
        winner=DEALER;
        blackJack['loses']++;
        document.querySelector('#loses').textContent = blackJack['loses'];
        console.log('lose');
    }
    return winner;
}

function showWinner(winner){
    let message,messageColor;
    if (winner === YOU)
    {
        message = 'You win';
        messageColor = 'green';
        winSound.play();
    }
    else if (winner === DEALER)
    {
        message = 'You lose';
        messageColor = 'red';
        loseSound.play();
    }
    else{
        message = 'Its a draw';
        messageColor = 'orange';
        clearSound.play();
    }
    document.querySelector('#result-message').textContent = message;
    document.querySelector('#result-message').style.color = messageColor;

}