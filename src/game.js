"use strict";

/* eslint-disable no-underscore-dangle */

function Game( frameFunc = Frame ) {
  this._frameFunc = frameFunc;
  this._currentScore = 0;
  this._frames = [ new this._frameFunc() ];
  this._currentFrame = 0;
}

Game.prototype.addScore = function addScore( score ) {
  this._frames[ this._currentFrame ].addScore( score );
  this._currentScore += score;

  if ( this._frames[ this._currentFrame ].isComplete() ) {
    this._frames.push( new this._frameFunc() );
    this._currentFrame += 1;
  }
};

Game.prototype.currentScore = function currentScore() {
  return this._currentScore;
};

Game.prototype.frame = function frame( number ) {
  return this._frames[ number ];
};
