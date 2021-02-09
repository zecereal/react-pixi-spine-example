import * as PIXI from 'pixi.js';
import PIXISpine from 'Plugins/pixi-spine';
import CharacterBase from 'Game/Characters/Base';
import EnvUrl from 'Components/EnvUrl';

export default class CharacterRobin extends CharacterBase {
  constructor() {
    super();
    this._scale = 0.1;
    this._sequence = {
      idle: [{ name: 'Idle', loop: true }],
      move: [{ name: 'Move', loop: true }],
      charge: [
        { name: 'Charging', loop: false },
        { name: 'ChargingLoop', loop: true, delay: 0 },
      ],
      attack: [
        { name: 'Attack', loop: false },
        { name: 'Idle', loop: true, delay: 0 },
      ],
      hit: [
        { name: 'Hit', loop: false },
        { name: 'Idle', loop: true, delay: 0 },
      ],
      win: [{ name: 'Win', loop: true }],
      lose: [{ name: 'Lose', loop: false }],
    };
    this._event = {
      Charge: () => {
        console.log('Charge');
      },
    };
  }
  create(audioRef) {
    return new Promise((resolve, reject) => {
      let promises = [
        new Promise((resolve, reject) => {
          const preload = new PIXI.Loader();
          preload.add('character', EnvUrl.getGame('/spine/Robin/Robin-fs8.json'));
          preload.load((loader, resources) => {
            console.log(resources['character']);
            let spineData = resources['character'].spineData;
            if (spineData) {
              let spine = new PIXISpine.Spine(spineData);
              spine.state.addListener({
                event: (entry, { data }) => {
                  const { name } = data;
                  this._event[name]?.();
                },
              });
              spine.scale.set(this._scale, this._scale);
              this._spine = spine;
              resolve(this);
            } else {
              reject({ error: 'NO_SPINE_DATA' });
            }
          });
        }),
      ];
      Promise.all(promises)
        .then((results) => {
          const [character] = results;
          resolve(character);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
