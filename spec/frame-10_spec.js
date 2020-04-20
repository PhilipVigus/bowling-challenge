"use strict";

describe( "Frame10", () => {
  let frame10;

  beforeEach( () => {
    frame10 = new Frame10();
  } );

  it( "is created with three null scores", () => {
    expect( frame10.score1 ).toEqual( null );
    expect( frame10.score2 ).toEqual( null );
    expect( frame10.score3 ).toEqual( null );
  } );

  describe( ".addScore", () => {
    it( "sets the first score", () => {
      frame10.addScore( 1 );

      expect( frame10.score1 ).toEqual( 1 );
    } );

    it( "sets the second score", () => {
      frame10.addScore( 1 );
      frame10.addScore( 2 );

      expect( frame10.score2 ).toEqual( 2 );
    } );

    it( "sets the third score", () => {
      frame10.addScore( 1 );
      frame10.addScore( 2 );
      frame10.addScore( 3 );


      expect( frame10.score3 ).toEqual( 3 );
    } );
  } );

  describe( ".isComplete", () => { 
    it( "returns false unless all three scores are set", () => {
      frame10.addScore( 1 );
      frame10.addScore( 2 );

      expect( frame10.isComplete() ).toEqual( false );
    } );
  } );
} );