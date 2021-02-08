class CharacterBase {
  constructor() {
    this._scale = 1.0;
    this._spine = null;
    this._sequence = {};
    this._playSequence = (sequenceData) => {
      if (!this._spine) return;
      if (!sequenceData || sequenceData.length === 0) return;
      this._spine.state.setAnimation(0, sequenceData[0].name, sequenceData[0].loop);
      for (let i = 1; i < sequenceData.length; i++) this._spine.state.addAnimation(0, sequenceData[i].name, sequenceData[i].loop, sequenceData[i].delay);
    };
  }
  playState(stateName) {
    if (this._sequence[stateName]) this._playSequence(this._sequence[stateName]);
  }
  create() {
    return new Promise((resolve, reject) => {
      reject({ error: 'CANNOT_CREATE_DEFAULT' });
    });
  }
  destroy() {
    if (this._spine) {
      this._spine.destroy();
      delete this._spine;
      this._spine = null;
    }
  }
  get spine() {
    return this._spine;
  }
}

export default CharacterBase;
