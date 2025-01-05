const playerScoreText = document.querySelector('.user .score');
const computerScoreText = document.querySelector('.computer .score');
const messageBeatsText = document.querySelector('.message_beats');
const messageWinnerText = document.querySelector('.message_winner');
const playerChoiceBtns = document.querySelectorAll('.choice_container .btn');
const playerChoiceConatiner = document.querySelector('.choice_container');
const playAgainConatiner = document.querySelector('.play_again_conatiner');
const playAgainBtn = document.querySelector('.play_again_conatiner .play_again');
const playMusic = document.querySelector('.play_music');
const music = document.querySelector('audio');

let playerScore = 0, computerScore = 0;
let scoreToWin = 3;
let music_playing = false;

class UpdateText{

    static playerScore(value){
        playerScoreText.textContent = value;
    }
    static computerScore(value){
        computerScoreText.textContent = value;
    }
    static beatsMessage(value){
        messageBeatsText.textContent = value;
    }
    static winnerMessage(value){
        messageWinnerText.textContent = value;
    }
}

class Style{

    static hide(element){
        element.classList.add('hide');
        element.classList.remove('show');
    }
    static show(element, type=false){
        if(type){
            element.classList.remove('hide');
            element.classList.add('show')
        }
        element.classList.remove('hide');
    }

    static addClass(element,className){
        element.classList.add(className);
    }
    static removeClass(element,className){
        element.classList.remove(className);
    }
}

const defaultHome = ()=>{
    UpdateText.winnerMessage("Choose ⬇")
    Style.addClass(messageWinnerText,"updown-animation")
}
defaultHome()

playMusic.addEventListener('click', ()=>{
    if(!music_playing){
        music_playing = true;
        music.play();
        playMusic.textContent = 'mute'
        playMusic.title = 'mute music'
    }
    else{
        music_playing = false;
        music.pause();
        playMusic.textContent = 'play'
        playMusic.title = 'play music'
    }

})

const winingCondition = {
    rock:"paper",
    paper:"scissors",
    scissors:"rock"
}

const generateComputerChoice = ()=>{
    const choices = ["rock","paper","scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    return randomChoice;

}

const checkWinner = (playerChoice, computerChoice)=>{
    if(playerChoice === computerChoice){
        UpdateText.beatsMessage(`both chooses ${playerChoice}`)
        UpdateText.winnerMessage("It's tie!")
    }
    else if(winingCondition[playerChoice] === computerChoice){
        UpdateText.beatsMessage(`${computerChoice} beats ${playerChoice}`)
        UpdateText.winnerMessage("computer wins!")
        computerScore++;
    }
    else{
        UpdateText.beatsMessage(`${playerChoice} beats ${computerChoice}`)
        UpdateText.winnerMessage("player wins!")
        playerScore++;

    }
}

const checkGrandWinner = ()=>{

    if(computerScore === 3){
        UpdateText.winnerMessage("computer wins🎉");
        Style.hide(messageBeatsText)
        Style.hide(playerChoiceConatiner)
        Style.show(playAgainConatiner)
    }
    if(playerScore === 3){
        UpdateText.winnerMessage("you win🎉");
        Style.hide(messageBeatsText)
        Style.hide(playerChoiceConatiner)
        Style.show(playAgainConatiner)

    }
}

const playAgain = ()=>{
    computerScore = 0;
    playerScore = 0;
    defaultHome();
    UpdateText.playerScore(playerScore);
    UpdateText.computerScore(computerScore);
    UpdateText.beatsMessage("")
    UpdateText.winnerMessage("Choose ⬇");
    Style.show(messageBeatsText)
    Style.show(playerChoiceConatiner,true)
    Style.hide(playAgainConatiner)
}


playerChoiceBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        Style.removeClass(messageWinnerText,"updown-animation")
        checkWinner(btn.value,generateComputerChoice())
        Style.addClass(btn,'click-animation')
        Style.addClass(messageWinnerText,'click-animation')
        UpdateText.playerScore(playerScore);
        UpdateText.computerScore(computerScore);
        checkGrandWinner()
        setTimeout(()=>{
            Style.removeClass(btn,'click-animation')
            Style.removeClass(messageWinnerText,'click-animation')
        },500)
    })
})
playAgainBtn.addEventListener('click', playAgain);