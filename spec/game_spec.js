"use strict";

describe( "Game", () => {
  let game;

  beforeEach( () => {
    game = new Game();
  } );

  describe( ".addScore", () => {
    it( "should accept a score from the player", () => {
      expect( game.addScore ).toBeDefined();
    } );
  } );

  describe( ".currentScore", () => {
    it( "should allow you to access the current score", () => {
      expect( game.currentScore ).toBeDefined();
    } );

    it( "should set the current score to zero on creation", () => {
      expect( game.currentScore() ).toEqual( 0 );
    } );

    it( "should give the correct score when you add the first score", () => {
      game.addScore( 5 );

      expect( game.currentScore() ).toEqual( 5 );
    } );

    it( "should give the correct score when you add the second score", () => {
      game.addScore( 5 );
      game.addScore( 2 );

      expect( game.currentScore() ).toEqual( 7 );
    } );
  } );

  describe( ".frame", () => {
    it( "should give you the current frame scores after the first score", () => {
      game.addScore( 5 );

      expect( game.frame( 0 ).score() ).toEqual( { score1: 5, score2: undefined, total: 5 } );
    } );

    it( "should give you the current frame scores after the second score", () => {
      game.addScore( 5 );
      game.addScore( 2 );

      expect( game.frame( 0 ).score() ).toEqual( { score1: 5, score2: 2, total: 7 } );
    } );

    it( "should start a new frame when the current frame is complete", () => {
      game.addScore( 5 );
      game.addScore( 2 );

      expect( game.frame( 1 ).score() )
        .toEqual( { score1: undefined, score2: undefined, total: undefined } );
    } );
  } );
} );
