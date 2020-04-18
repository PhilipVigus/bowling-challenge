"use strict";

$( document ).ready( () => {
  const game = new Game();

  $( "#input-score-button" ).click( () => {
    const newScore = $( "#input-score" ).val();
    game.addScore( newScore );
    for ( let i = 0; i < game.framesCompleted() + 1; i += 1 ) {
      $( `#frame-${i}` ).text( game.frame( i ).score().total );
    }
    console.log(game._frames)
  } );
} );
