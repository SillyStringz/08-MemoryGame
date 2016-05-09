(function() {
	'use strict';

	angular
	  .module('app')
	  .controller('MemoryGameController', MemoryGameController);

	MemoryGameController.$inject = ['$timeout'];

	/* @ngInject */
	function MemoryGameController($timeout) {
		var vm = this;

		var gridSize = 6 * 6;
		// will give total of 36 card deck

		vm.cards = [];
		vm.currentCards = [];

		function shuffle(array) {
 	    var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
		
	//this will reset the game completely
	vm.reset = function() {
		vm.cards = [];
		vm.currentCardsd = [];

		}

		//this will initialize the game
		vm.createCards = function() {
			for(var i = 0; i < gridSize; i++) {
				vm.cards.push({
					id: i,		//unique id
					flipped: false,		//ng-show/hide
					value: i % 2 == 0 ? i : i - 1, 		//pair value
					disabled: false		// once a matching pair has been found, disable this card

				vm.flipCard = function(card) {

				// Prechecks
				// Verify that ^this card^ has not already been flipped    
				var cardAlreadySelected = false;
				vm.currentCards.forEach(function(i, loopCard) {
					if (card.id === loopCard.id) {
						cardAlreadySelected = true;
					}
				});

				for(var i = 0; i < vm.currentCards.length; i++) {
					if(vm.currentCards[i].id === card.id) {
						cardAlreadySelected = true;
					}
				}

				if(!cardAlreadySelected && vm.currentCards.length < 2 && !card.disabled) {
					// Do stuff
					// 1. Flip the card over

					card.flipped = !card.flipped;

					// 2. Add cards to "current flipped array"
					vm.currentCards.push(card);

					// 3. Check if the two cards have been flipped over
					if(vm.currentCards.length === 2) {

					// TRUE
					// 1. Check if the values of the 2 flipped cards match each other
					if(vm.currentCards[0].value === vm.currentCards[1].value) {
					 	// TRUE
					 	// 1. Success! A pair was found
					 	// 2. Disable both of these cards so that they remain uncovered
					 	vm.currentCards[0].disabled = true;
					 	vm.currentCards[1].disabled = true;

					 	// 3. Clear the "currently flipped" array
					 	vm.currentCards = [];

						var gameOver = vm.cards.every(function(loopCard) {
							return loopCard.disabled;

						});

						if(gameOver) {
							alert('game over!');
							vm.reset();
						}
			

					 } else {

					 	// FALSE
					 	
					 	$timeout(function() {
						vm.currentCards[0].flipped = false;
					 	vm.currentCards[1].flipped = false;

					 	}, 1000);
					 	// After one second
					 	// Set both cards in the "currently flipped" array to unflipped
					 	// Clear the currently flipped array



					 }
					}

					
				}

				};

				vm.cards = shuffle(vm.cards) ;

			}

			}

		}
	}
})();