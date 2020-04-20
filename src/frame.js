"use strict";

/* eslint-disable no-underscore-dangle */
function Frame() {
  this._total = null;
  this._score1 = null;
  this._score2 = null;
}

Frame.prototype.addScore = function addScore( score ) {
  if ( this._score1 === null ) {
    this._score1 = score;
    this._total = score;
  } else if ( this._score2 === null ) {
    this._score2 = score;
    this._total += score;
  }
};

Object.defineProperty(Frame.prototype, "score1", {
  get: function score1() {
    return this._score1;
  }
} );

Object.defineProperty(Frame.prototype, "score2", {
  get: function score2() {
    return this._score2;
  }
} );

Object.defineProperty(Frame.prototype, "total", {
  get: function score1() {
    return this._total;
  },
  set: function score1( total ) {
    this._total = total;
  }
} );
