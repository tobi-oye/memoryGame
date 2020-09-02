// create an array called openCards
let openCards = [];

let movesCounter = 0;
/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleCards() {
  /*
   * Create a list that holds all of your cards
   */

  //create an array of classes with all the class names from the exisiting html document
  // Manually type in class names into the array
  // select all the cards and store in a variable ==> allCarsds

  let allCardsObject = document.querySelectorAll(".card");

  console.log(`this is all the initial card element ${allCardsObject}`);

  // creat an allCards empty array
  let allCards = [];
  // push each element in the allCardsObject list to the allCards array
  allCardsObject.forEach((card) => {
    allCards.push(card);
  });
  // check the allCards list to be sure
  console.log(`this is all the new card element ${allCards}`);
  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   * call the shuffle function on the allcards array
   *
   *
   *   - loop through each card and create its HTML
   *  for loop to append each element inside the ul html element
   *   - add each card's HTML to the page
   */
  // create a variable shuffledCards for the shuffled Cards
  let shuffledCards = shuffle(allCards);

  let shuffleCards = resetCards(shuffledCards);
  // create a document fragement to append for each card element.
  cardsFrag = document.createDocumentFragment("div");
  // for loop to append each element inside the ul html element
  for (let i = 0; i < shuffleCards.length; i++) {
    cardsFrag.appendChild(shuffleCards[i]);
  }
  // append the cards in cardsFrag to the parent ul element (.deck class)
  let parentElement = document.querySelector(".deck");
  parentElement.innerHTML = "";
  parentElement.appendChild(cardsFrag);

  // shuffled cards displayed
  console.log("shuffled cards displayed");
}

/**
 * if the list already has another card, check to see if the two cards match
 * if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * function to add identical cards and remove different cards
 */
function cardChecker() {
  const currentCard = openCards[openCards.length - 1];
  const previousCard = openCards[openCards.length - 2] || null;
  // if list length is a factor of 2 && card is equal to the other
  if (
    openCards.length % 2 === 0 &&
    currentCard.innerHTML === previousCard.innerHTML
  ) {
    // change the colour of both elements
    currentCard.classList.add("match");
    previousCard.classList.add("match");
  } else if (openCards.length % 2 === 0) {
    // change color of unequal elements and remove the two the cards from the array
    setTimeout(function () {
      currentCard.classList.remove("show", "open");
      previousCard.classList.remove("show", "open");
    }, 500);
    openCards.splice(openCards.length - 2, 2);
  }

  console.log("card checked successfully");
}

/**
 * add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * function to add card to a list called open
 * @param {object} card
 */
function addCardToOpenArray(card) {
  // add the card that is being clicked on to the open array.
  openCards.push(card);
  console.log("card pushed successfully");
}

/**
 * increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 * function to increment move counter
 */
function incrementMoves() {
  // create an counter varible that is equal to zero (counter = 0)
  movesCounter++;
  document.querySelector(".moves").textContent = movesCounter;
}

/**
 * if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * function to confirm all cards matched
 */
function wonGame() {
  // *check tif he length of the open  array = 16
  if (openCards.length === 16) {
    setTimeout(function () {
      alert("you have won");
      shuffleCards();
      movesCounter = 0;
      openCards = [];
      playGame();
    }, 1000);
  }
}

/**
 * set up the event listener for a card. If a card is clicked:
 * display the card's symbol (put this functionality in another function that you call from this one)
 * function to display class symbol when clicked.
 */
function playGame() {
  document.querySelectorAll(".card").forEach(function (card) {
    // on click of each card in the list
    card.addEventListener("click", function (e) {
      const cardElement = e.target;
      // display card symbol
      if (!cardElement.classList.contains("open")) {
        cardElement.classList.add("show", "open");
        incrementMoves();
        console.log("display Card Symbol called");

        // push clicked class to an array
        addCardToOpenArray(cardElement);

        // check if cards are same
        cardChecker();

        wonGame();
      }
    });
  });
}

/**
 * function to remove the match, open and show class
 */
function resetCards(card) {
  let resetCardsList = [];
  card.forEach(function (elem) {
    elem.classList.remove("match", "open", "show");
  });

  return card;
}

shuffleCards();
playGame();
