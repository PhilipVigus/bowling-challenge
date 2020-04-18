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

  describe( ".frame", () => {
    const FrameDouble;
    beforeEach( () => {
      FrameDouble = function Frame() {
        this.addScore = () => {};
        this.isComplete = () => {};
        this.score = () => {};
      };

      game = new Game( FrameDouble );
    } );

    it( "should call the score method of the frame", () => {
      spyOn( FrameDouble, "score" );
      game.addScore( 5 );

      expect(FrameDouble.score).toHaveBeenCalled();
    } );

    it( "should start a new frame when the current frame is complete", () => {
      game.addScore( 5 );
      game.addScore( 2 );

      expect(game._currentFrame).toEqual(1);
      expect(game._frames.length).toEqual(2);
    } );
  } );
} );
