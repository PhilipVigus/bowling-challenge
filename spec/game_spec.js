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

    describe( "when adding scores", () => {
      beforeEach( () => {
        const FrameDouble = function Frame() {
          this.addScore = () => {};
          this.isComplete = () => {};
        };

        game = new Game( FrameDouble );
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
  } );

  describe( ".framesCompleted", () => {
    it( "should return 0 when the game first starts", () => {
      expect( game.framesCompleted() ).toEqual( 0 );
    } );
  } );

  describe( ".frame", () => {
    it( "should return a frame", () => {
      game = new Game();

      expect( game.frame( 0 ) ).toEqual( jasmine.any( Frame ) );
    } );
  } );
} );
