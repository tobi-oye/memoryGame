/// Shuffle function from http://stackoverflow.com/a/2450976
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
 * Create a list that holds all of your cards
 */

//create an array of classes with all the class names from the exisiting html document
// Manually type in class names into the array 
// select all the cards and store in a variable ==> allCarsds
let allCardsObject = document.querySelectorAll('.card');

console.log(`this is all the initial card element ${allCardsObject}`);
allCardsObject;
// creat an allCards empty array
let allCards = [];
// push each element in the allCardsObject list to the allCards array
allCardsObject.forEach(card => {
    allCards.push(card);
});
// check the allCards list to be sure
console.log(`this is all the new card element ${allCards}`)
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
let shuffledCards = shuffle(allCards)
// create a document fragement to append for each card element. 
cardsFrag = document.createDocumentFragment('div')
// for loop to append each element inside the ul html element
for (let i = 0; i < shuffledCards.length; i++){
    cardsFrag.appendChild(shuffledCards[i]);
}
// append the cards in cardsFrag to the parent ul element (.deck class)
let parentElement = document.querySelector('.deck')
parentElement.innerHTML = "";
parentElement.appendChild(cardsFrag);

// shuffled cards displayed
console.log("shuffled cards displayed"); 

// crate a global variable for each card to be clicked on
let cardElement = "";

// *
//  * set up the event listener for a card. If a card is clicked:
//  *  - display the card's symbol (put this functionality in another function that you call from this one)
//  * function to display class symbol when clicked. 
    function displayCardSysmbol(){
        document.querySelectorAll('.card').forEach(function(card){
            // on click of each card in the list
            card.addEventListener('click',function(e){
                // display card symbol
                e.target.classList.toggle('show','open')
                cardElement = e.target;
                console.log("display Card Symbol called");
                // push clicked class to an array
                openCards();
                console.log(openCards());

                // check if cards are same
                cardChecker();
                console.log(cardChecker());

                // match color for two identical cards
                matchedCards();
                console.log(matchedCards());
            })
            
        })
        
    }

    displayCardSysmbol();
    console.log(displayCardSysmbol());

       
 /*       
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 */
    // function to add card to a list called open
    // create an array called open
    open = [];
    function openCards(){
        // add the card that is being clicked on to the open array. 
        open.push(cardElement);
        return'card pushed successfully';
    }
    
   
//  *  - if the list already has another card, check to see if the two cards match

 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * function to add identical cards and remove different cards 
 */       
        function cardChecker(){
            // if list length is a factor of 2 && card is equal to the other
            if (open.length % 2 ===0 && open[open.length-1] === open[open.length-2]){
                // change the colour of both elements
                 open[open.length - 1].classList.add('match');
                 open[open.length - 2].classList.add('match');


            }
            else{
                 // change color of unequal elements and remove the two the cards from the array
                setTimeout(function(){
                open[0].classList.remove('show','open');
                    
                },2000);
                open.splice(open.length-2,2);
            }   

            return "card checked successfully";
        }


 
/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 */
    //   function to increment move counter
    function incrementMoves(){
        // create an counter varible that is equal to zero (counter = 0)
        let counter = 0;
        // onclick of the card box , increment the count by 1 
        document.querySelectorAll(".card").forEach(element => {
            addEventListener('click',function(){
                counter +=1;
            // get the moves class and make the text content equal to counter 
            document.querySelector('.moves').textContent = counter;
            });
        }); 

        return "increment Moves working";

    };
    // incrementMoves();
    // console.log(incrementMoves());  

 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */        
    // function to confirm all cards matched 
    function matchedCards(){
        // *check tif he length of the open  array = 16
        if(open.length == 16){
            alert("you have won");
        }
        return("match cards worked ");                                 
    };
    // matchedCards();
    // console.log(matchedCards());