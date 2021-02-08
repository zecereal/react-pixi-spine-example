class Cache {
  constructor() {
    this._dict = {};
  }
  get(key) {
    return this._dict[key];
  }
  exist(key) {
    if (this.get(key)) return true;
    else return false;
  }
  add(key, item) {
    this._dict[key] = item;
  }
  remove(key) {
    delete this._dict[key];
  }
}

export default Cache;
