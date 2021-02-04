const origin = new URL(window.location.href).origin;

const envPath = {
  home: origin,
  game: origin + '/game',
  audio: origin + '/audio',
};

const EnvUrl = {
  getHome: (path) => {
    return envPath.home + path;
  },
  getGame: (path) => {
    return envPath.game + path;
  },
  getAudio: (path) => {
    return envPath.audio + path;
  },
  convertToAudioFormats: (path) => {
    return [path + '.webm', path + '.ogg', path + '.aac', path + '.mp3'];
  },
};

export default EnvUrl;
