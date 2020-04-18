"use strict";

/* eslint-disable no-underscore-dangle */
function Frame() {
  this.bonusesToAdd = 0;
}

Frame.prototype.score = function score() {
  return { score1: this._score1, score2: this._score2, total: this._total };
};

Frame.prototype.addScore = function addScore( score ) {
  if ( this._score1 === undefined ) {
    this._score1 = score;
    this._total = score;
  } else if ( this._score2 === undefined ) {
    this._score2 = score;
    this._total += score;
    if ( this._total === 10 ) {
      this.bonusesToAdd = 1;
    }
  }
};

Frame.prototype.isComplete = function isComplete() {
  return this._score1 !== undefined && this._score2 !== undefined;
};

Frame.prototype.addBonusScore = function addBonusScore( score ) {
  this._total += score;
  this.bonusesToAdd -= 1;
};
