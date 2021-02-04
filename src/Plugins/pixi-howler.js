import * as PIXI from 'pixi.js';
import { Howl, Howler } from 'howler';

Howler.autoUnlock = true;

const defaultHowlOption = {
  preload: true,
};

const defaultLoadOption = {
  loadType: PIXI.LoaderResource.LOAD_TYPE.XHR,
  xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
};

const audioType = {
  aac: 'audio/aac',
  caf: 'audio/x-caf',
  flac: 'audio/flac',
  mp3: 'audio/mpeg',
  mp4: 'audio/mp4',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
  webm: 'audio/webm',
};

function isAudio(resource) {
  if (audioType[resource.extension]) return true;
  else return false;
}

function createBlobUrl(audio, type) {
  const blob = new Blob([audio], { type });
  return URL.createObjectURL(blob);
}

export function howlerLoadOptions(options) {
  return { ...defaultLoadOption, ...options };
}

export function useHowler(resource, next) {
  if (!isAudio(resource)) return next();
  let blob = createBlobUrl(resource.data, audioType[resource.audioType], resource.extension);
  resource.blob = blob;
  let howl = new Howl({
    ...defaultHowlOption,
    src: [blob],
    format: [resource.extension],
  });
  resource.howl = howl;
  return next();
}
