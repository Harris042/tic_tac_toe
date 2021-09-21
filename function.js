// gives out horizontal values which can make a person win
function horizontal(value) {
    let arr = [];

    for (let i = 0; i < 3; i++) {
        arr.push(value + (i));
    }

    return arr;
}


// gives out vertical values which can make a person win
function vertical(value) {
    let arr = [];

    for (let i = 0; i < 3; i++) {
        arr.push(value + (i * 3));
    }

    return arr;
}

function compare_divs(divs, array) {
    let player1 = 0;
    let player2 = 0;

    for(let index of array) {
        if (divs[index].classList.contains('clicked')) {
            let symbol = divs[index].innerText;
            if (symbol === 'X') {
                player1++;
            }
            else if (symbol === '0') {
                player2++;
            }
        }
    }

    if (player1 === 3 || player2 === 3) {
        return true;
    }
    else {
        return false;
    }

}

function is_there_a_winner(divs) {
    let won = false;

    won = compare_divs(divs, horizontal(0)) || compare_divs(divs, horizontal(3)) || compare_divs(divs, horizontal(6)) || 
          compare_divs(divs, vertical(0)) || compare_divs(divs, vertical(1)) || compare_divs(divs, vertical(2)) ||
          compare_divs(divs, [0, 4, 8]) || compare_divs(divs, [2, 4, 6]);    // comparing diagnols

    return won;
}

function main() {
    let player = Math.ceil(Math.random() * 2); // User = 1 & Comp = 2
    let player_heading = document.getElementById('player');
    let divs = document.getElementsByClassName('col-4');
    let winner_message = document.getElementById("winner");
    let game_ended = false;

    player_heading.innerText = `Turn: Player ${player}`;
    
    for (let div of divs) {
        div.onclick = () => {
            if (game_ended) {
                alert('Game finished');
            }
            else {
                if (div.classList.contains('clicked')) {
                    alert('Already clicked');
                }
                else {  // Player 1 (X) & Player 2 (0)
                    if (player === 1) {
                        div.innerText = 'X';
                        div.classList.add('clicked');

                        if (is_there_a_winner(divs)) {
                            winner_message.innerText = `Player ${player} won`;
                            player_heading.innerText = `Turn: --------`;
                            game_ended = true;
                            return;
                        };

                        player = 2;
                        player_heading.innerText = `Turn: Player ${player}`;
                    } 
                    else {
                        div.innerHTML = '0';
                        div.classList.add('clicked');
                        
                        if (is_there_a_winner(divs)) {
                            winner_message.innerText = `Player ${player} won`;
                            game_ended = true;
                            player_heading.innerText = `Turn: --------`;
                            return;
                        };

                        player = 1;
                        player_heading.innerText = `Turn: Player ${player}`;
                    }
                }
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', main);