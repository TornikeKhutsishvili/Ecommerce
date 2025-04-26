var btn_number = document.querySelectorAll('.btn_number')
var winSpan = document.querySelectorAll('.winSpan')

var btn_start = document.querySelector('.btn_start')
var btn_restart = document.querySelector('.btn_restart')
var win_number_btn1 = document.querySelector('.win_number_btn1')
var win_number_btn2 = document.querySelector('.win_number_btn2')
var win_number_btn3 = document.querySelector('.win_number_btn3')
var win_number_btn4 = document.querySelector('.win_number_btn4')
var win_number_btn5 = document.querySelector('.win_number_btn5')
var win_number_btn6 = document.querySelector('.win_number_btn6')
var win_h1 = document.querySelector('.win_h1')
var win_h3 = document.querySelector('.win_h3')
var lose_h1 = document.querySelector('.lose_h1')
var winSpan = document.querySelectorAll('.winSpan')
var choiseText = document.querySelector('.choiseText')
var Win = document.querySelector('.Win')

var PrizeFund = 50000
var counter = 0

for(var i of btn_number){
    i.addEventListener("click",function(){
        if(counter == 6 && this.style.backgroundColor == "blue"){
            this.style.backgroundColor = "transparent"
            counter--
        }
        else if(counter<6){
            if(this.style.backgroundColor != "blue"){
                this.style.backgroundColor = "blue"
                counter++
            }
            else{
                this.style.backgroundColor = "transparent"
                counter--
            }
        }
    });
}

var newarr = [];
var newarr1 = [];
while(newarr.length != 6){
    var rand = parseInt(Math.random()*36+1)
    console.log(rand)
    if(newarr.indexOf(rand) == -1){
        newarr.push(rand)
        for(i=0; i < 6; i++){
            win_number_btn1.innerHTML = newarr[1];
            win_number_btn2.innerHTML = newarr[2];
            win_number_btn3.innerHTML = newarr[3];
            win_number_btn4.innerHTML = newarr[4];
            win_number_btn5.innerHTML = newarr[5];
            win_number_btn6.innerHTML = newarr[6];
        }
    }
}

function StartGames(){
    if(counter!=6){
        console.log("fill numbers")
    }
    else{

        for(var i of btn_number){
            if(i.style.backgroundColor=="blue"){
                newarr1.push(i.innerText)

            }
        }
        var winner = 0
        for(var i = 0; i < newarr.length; i++){
            for(var j = 0; j < newarr1.length; j++){
                if(newarr[i] == newarr1[j]){
                    winner++
                }
            }
        }
    }

    if(winner == 6){
        win_h3.innerText = 'You guessed 6 number'
        win_h1.innerText = `You win ${PrizeFund}`
    }
    else if(winner == 5){
        win_h3.innerText = 'You guessed 5 number'
        win_h1.innerText = `You win ${PrizeFund - 10000}`
    }
    else if(winner == 4){
        win_h3.innerText = 'You guessed 4 number'
        win_h1.innerText = `You win ${PrizeFund - 25000}`
    }
    else if(winner == 3){
        win_h3.innerText = 'You guessed 3 number'
        win_h1.innerText = `You win ${PrizeFund - 45000}`
    }
    else if(winner == 2){
        lose_h1.innerText = `You Lose, guessed 2 number`
    }
    else if(winner == 1){
        lose_h1.innerText = `You Lose, guessed 1 number`
    }
    else{
        lose_h1.innerText = `You Lose, guessed 0 number`
    }

    choiseText.style.marginTop = "10px"

    btn_start.style.display = "none"
    btn_restart.style.marginTop = "20px"

    win_number_btn1.style.display = "inline-block"
    win_number_btn2.style.display = "inline-block"
    win_number_btn3.style.display = "inline-block"
    win_number_btn4.style.display = "inline-block"
    win_number_btn5.style.display = "inline-block"
    win_number_btn6.style.display = "inline-block"

    Win.style.display = "block"
    choiseText.style.display = "block"

    btn_restart.style.marginTop = "-10px"
    lose_h1.style.marginTop = "-10px"
    win_h1.style.marginTop = "-5px"
    choiseNumb.style.marginTop = "-30px"

    choiseNumb.innerText = newarr1

    StopGame();
}

function StopGame(){
    for(var i of btn_number){
        i.style.pointerEvents = "none"
    }
}

function RestartGames(){
    location.reload()
    myP2.innerText = "Restart"
}