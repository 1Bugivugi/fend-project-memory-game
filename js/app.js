/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

/*
 * Create a list that holds all of your cards
 */
//  const cards = ["fa fa-diamond" , "fa fa-diamond",
//  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
//  "fa fa-anchor", "fa fa-anchor",
//  "fa fa-leaf", "fa fa-leaf",
//  "fa fa-bicycle", "fa fa-bicycle",
//  "fa fa-bolt", "fa fa-bolt",
//  "fa fa-cube", "fa fa-cube",
//  "fa fa-bomb", "fa fa-bomb"
// ];
const cards1 = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bolt",
"fa fa-cube",
"fa fa-bomb"
];
const cards = cards1.concat(cards1); //did i do that right? If so, that's pretty neat :)

let cardDeck = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];
let gameIsOn = true;
let starsAmount;
let uhmTimer;
let firstClick = true;

/*
 * Create cards
 */

function startGame(){
  for (i = 0; i < cards.length; i++){
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cards[i]}"></i>`;
    cardDeck.appendChild(card);
    click(card);
}};

/*
 * Card click
 */

function click(card){
  card.addEventListener("click", function(){

    if (firstClick){
      runTimer();
      firstClick = false;
    };

    if (openedCards.length === 1){

      const firstCard = this;
      const secondCard = openedCards[0];

      //We have an exisiting OPENED card
      card.classList.add("open", "show");
      openedCards.push(this);
      compareCards(firstCard, secondCard);
    } else {
      //we don't have any opened cards
      card.classList.add("open", "show", "disabled");
      openedCards.push(this);
    }
  });
}

/*
* Comparing function
*/

function compareCards(firstCard, secondCard){
  //Comparing 2 cards
  if (firstCard.innerHTML === secondCard.innerHTML){
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matchedCards.push(firstCard, secondCard);
    openedCards = [];

    //Check whether the game is won
    gameOver();
  } else {
    //Wait 500ms to act
    setTimeout(function(){
      firstCard.classList.remove("open", "show", "disabled");
      secondCard.classList.remove("open", "show", "disabled");
    }, 500);
    openedCards = [];
  };
  movesCounter();
};

/*
* Moves counter and star rating
*/

let count = 0;
function movesCounter(){
  count++;
  document.getElementById('moves').innerHTML = count;
  rating()
};

/*
 * Game over function
 */

function gameOver(){
  setTimeout(function(){
    if (matchedCards.length === cards.length){
      swal("You won! Congrats!", "You've got " + score() + " stars in " + addZero(min) + ":" + addZero(sec), "success", { // didnt quite get where to use template literals here
        buttons: {
          restart: {
            text: "Play again?",
            value: "restart"
          }
        },
      })
      .then(function(){
        window.location.reload();
      });
      stopTimer();
    }
  }, 850);
};

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Reload button
 */

const reload = document.querySelector('.fa-repeat')
reload.addEventListener('click', function(){
  window.location.reload()
});

/*
 * Stars rating
 */

let starList = document.getElementById("starsUL");
function rating(){
  switch (count){
    case 16:
    starList.removeChild(starList.childNodes[0]);
    case 19:
    starList.removeChild(starList.childNodes[0]);
    starList.removeChild(starList.childNodes[0]);
  }};

  /*
  * Score
  */

function score(){
  if (count < 16){
    starsAmount = 3;
  } else if (16 <= count && count < 19){
    starsAmount = 2;
  } else {
    starsAmount = 1;
  }
  return starsAmount;
};

/*
* Freeze function - I tryed :(
*/

// function freeze(){
//   if (openedCards === 2){
//   cardDeck.classList.add("disabled");
//   setTimeout(function(){
//     cardDeck.classList.remove("disabled");
//   }, 850);
// }};

/*
* Timer
*/

let timer = document.querySelector(".timer");
let min = 0;
let sec = 0;

function runTimer(){
  uhmTimer = setInterval(function(){
    if(gameIsOn){
      sec++;
      if (sec === 60){
        min++;
        sec = 0;
      }
      timer.innerHTML = addZero(min) + ":" + addZero(sec);
  }}, 1000)
};

function addZero(number){
  if (number < 10){
    return '0' + number;
  } else {
    return number;
  }
};

/*
* Stop timer
*/

function stopTimer(){
  clearInterval(uhmTimer)
};



shuffle(cards);
startGame();
