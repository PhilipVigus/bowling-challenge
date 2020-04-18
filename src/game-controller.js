"use strict";

$( document ).ready( () => {
  const game = new Game();

  $( "#input-score-button" ).click( () => {
    const newScore = $( "#input-score" ).val();
    game.addScore( newScore );
    for ( let i = 0; i < game.framesCompleted() + 1; i += 1 ) {
      console.log(game.frame( i ).score());
      $( `#frame-${i}-ball-1` ).text( game.frame( i ).score().score1 );
      $( `#frame-${i}-ball-2` ).text( game.frame( i ).score().score2 );
      $( `#frame-${i}-total` ).text( game.frame( i ).score().total );
    }
    console.log( game );
  } );
} );
