"use strict";

/* eslint-disable no-underscore-dangle */

function Game( frameFunc = Frame ) {
  this._frameFunc = frameFunc;
  this._currentScore = 0;
  this._frames = [ new this._frameFunc() ];
  this._currentFrame = 0;
  this._framesNeedingBonuses = [];
}

Game.prototype.addScore = function addScore( scoreString ) {
  const score = parseInt( scoreString, 10 );
  this._frames[ this._currentFrame ].addScore( score );
  this._currentScore += score;

  this._handleBonusScores( score );
  this._handleCompleteGame();
};

Game.prototype.currentScore = function currentScore() {
  return this._currentScore;
};

Game.prototype.frame = function frame( number ) {
  return this._frames[ number ];
};

Game.prototype.framesCompleted = function framesCompleted() {
  return this._currentFrame;
};

Game.prototype._handleBonusScores = function _addBonusScores( score ) {
  this._framesNeedingBonuses.forEach( ( frame ) => {
    if ( frame.bonusesToAdd > 0 ) {
      frame.addBonusScore( score );
      this._currentScore += score;
    }
  } );

  this._framesNeedingBonuses = this._framesNeedingBonuses
    .filter( ( frame ) => { return frame.bonusesToAdd > 0; } );
};

Game.prototype._handleCompleteGame = function _handleCompleteGame() {
  if ( this._frames[ this._currentFrame ].isComplete() ) {
    if ( this._frames[ this._currentFrame ].bonusesToAdd > 0 ) {
      this._framesNeedingBonuses.push( this._frames[ this._currentFrame ] );
    }

    this._frames.push( new this._frameFunc() );
    this._currentFrame += 1;
  }
};
