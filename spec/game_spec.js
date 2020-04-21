"use strict";

describe( "Game", () => {
  let game;

  beforeEach( () => {
    game = new Game();
  } );

  describe( ".addScore", () => {
    it( "calls addScore on the current frame", () => {
      const frame1Double = {
        addScore: function addScore() {},
        isComplete: function isComplete() { return false; }
      };
      spyOn( frame1Double, "addScore" );

      // This pattern makes a function that returns different things
      // depending on how many times new is called on it. In this case
      // the first time it returns the frame1double, and all other
      // times it returns an empty object
      function NormalFrameClassDouble() {
        if ( typeof NormalFrameClassDouble.i === "undefined" ) {
          NormalFrameClassDouble.i = 0;
        }
        NormalFrameClassDouble.i += 1;
        if ( NormalFrameClassDouble.i === 1 ) {
          return frame1Double;
        }
        return {};
      }

      function Frame10ClassDouble() {
        return {};
      }

      game = new Game( NormalFrameClassDouble, Frame10ClassDouble );
      game.addScore( 1 );

      expect( frame1Double.addScore ).toHaveBeenCalledWith( 1 );
    } );

    it( "calls addBonus on a previous frame waiting for a bonus score", () => {
      const frame1Double = {
        addScore: function addScore() {},
        isComplete: function isComplete() { return true; },
        hasAllBonuses: function hasAllBonuses() { return false; },
        addBonus: function addBonus() {}
      };
      spyOn( frame1Double, "addBonus" );

      // This pattern makes a function that returns different things
      // depending on how many times new is called on it. In this case
      // the first time it returns the frame1double, and all other
      // times it returns a simpler object to stand in for the other
      // frames we aren't interested in spying on
      function NormalFrameClassDouble() {
        if ( typeof NormalFrameClassDouble.i === "undefined" ) {
          NormalFrameClassDouble.i = 0;
        }
        NormalFrameClassDouble.i += 1;
        if ( NormalFrameClassDouble.i === 1 ) {
          return frame1Double;
        } else {
          return {
            addScore: function addScore() {},
            isComplete: function isComplete() { return false; }
          };
        }
      }

      function Frame10ClassDouble() {
        return {};
      }

      game = new Game( NormalFrameClassDouble, Frame10ClassDouble );
      game.addScore( 4 );
      game.addScore( 5 );

      expect( frame1Double.addBonus ).toHaveBeenCalledWith( 5 );
    } );

    it( "calls calcTotal on a completed frame", () => {
      const frame1Double = {
        addScore: function addScore() {},
        hasAllBonuses: function hasAllBonuses() { return true; },
        isComplete: function isComplete() { return true; },
        calcTotal: function calcTotal() {}
      };
      spyOn( frame1Double, "calcTotal" );

      function NormalFrameClassDouble() {
        return frame1Double;
      }

      function Frame10ClassDouble() {
        return {};
      }

      game = new Game( NormalFrameClassDouble, Frame10ClassDouble );
      game.addScore( 5 );

      expect( frame1Double.calcTotal ).toHaveBeenCalledWith( 0 );
    } );
  } );

  describe( ".currentScore", () => {
    it( "returns the game's current score", () => {
      expect( game.currentScore ).toEqual( 0 );
    } );
  } );

  describe( ".frame", () => {
    it( "returns the correct frame", () => {
      const frame10 = jasmine.createSpy();
      const NormalFrameClassDouble = function NormalFrameClassDouble() {
        return "frame";
      };
      const Frame10ClassDouble = function Frame10ClassDouble() {
        return frame10;
      };

      game = new Game( NormalFrameClassDouble, Frame10ClassDouble );

      expect( game.frame( 9 ) ).toEqual( frame10 );
    } );
  } );

  describe( ".isComplete", () => {
    it( "calls isComplete() on the 10th frame", () => {
      const NormalFrameClassDouble = function NormalFrameClassDouble() { return "frame"; };
      const frame10 = { isComplete: function isComplete() {} };
      const Frame10ClassDouble = function Frame10ClassDouble() { return frame10; };
      spyOn( frame10, "isComplete" );

      game = new Game( NormalFrameClassDouble, Frame10ClassDouble );
      game.isComplete();

      expect( frame10.isComplete ).toHaveBeenCalledWith();
    } );
  } );
} );
