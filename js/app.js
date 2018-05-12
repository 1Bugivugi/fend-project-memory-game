/*
 * Create a list that holds all of your cards
 */
 const cards = ['fa fa-diamond' , 'fa fa-diamond',
 'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
 'fa fa-anchor', 'fa fa-anchor',
 'fa fa-leaf', 'fa fa-leaf',
 'fa fa-bicycle', 'fa fa-bicycle',
 'fa fa-bolt', 'fa fa-bolt',
 'fa fa-cube', 'fa fa-cube',
 'fa fa-bomb', 'fa fa-bomb'
]

let cardDeck = document.querySelector('.deck')

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

//Reload button

const reload = document.querySelector('.fa-repeat')
reload.addEventListener('click', function(){
  window.location.reload()
});

// Moves counter and stars rating
let count = 0;
let cardClick = document.querySelector('.card');
let starList = document.getElementById('starsUL');
cardDeck.addEventListener('click', function(){
    count++;
    document.getElementById('moves').innerHTML = count;
    if (count >= 20){
      starList.removeChild(starList.childNodes[0]);
    } else if (count > 30){
      starList.removeChild(starList.childNodes[0]);
    } else if (count > 40){
      starList.removeChild(starList.childNodes[0]);
    }
});

// Stars
// let starList = document.getElementById('starsUL');
// if (count >= 0){
//   starList.removeChild(starList.childNodes[0]);
// }



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
