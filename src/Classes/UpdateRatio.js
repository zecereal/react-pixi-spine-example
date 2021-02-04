class UpdateRatio {
  constructor() {
    this.list = [];
    this.width = 0;
    this.height = 0;
  }
  addCallback(name, callback) {
    this.list.push({
      name,
      callback,
    });
    callback(this.width, this.height);
  }
  removeCallback(name) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].name === name) {
        this.list.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  update(width, height) {
    this.width = width;
    this.height = height;
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].callback(width, height);
    }
  }
}

export default UpdateRatio;
