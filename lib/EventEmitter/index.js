let EventEmitter = require('events');

'use strict'

let emitter = (function () {
  const GENERATED_HASH = require('unique-string')();
  // We need a singleton to make sure that object exists only once and can't be create twice
  
  const _symb = Symbol( GENERATED_HASH );
  let _instance = null;
  let _emitter = new EventEmitter();

  class GulpEmitterEvent {

    constructor(symbol = null) {
      if (symbol !== _symb)
        throw new Error(`You can instanciate this class twice`);
    }

    static get instance() {
      return _instance;
    }

    register(eventName, callback) {
      // TODO : verify name is not here
      _emitter.on(eventName, callback);
      return this;
    }

    unregister(eventName, callback = () => {}) {
      _emitter.removeAllListeners(eventName);
      return this;
    }

    emit(eventName) {
      _emitter.emit(eventName);
      return this;
    }
  }

  _instance = new GulpEmitterEvent( _symb );

  return GulpEmitterEvent;
}) ();


module.exports = emitter;