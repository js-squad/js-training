// 1. Inherit from EventEmitter
// 2. Emit the following events:
// - open: when open method is called
// - close: when close method is called

function SmartWindow() {
  this.isOpened = false;
}

SmartWindow.prototype.open = function open() {
  this.isOpened = true;
};

SmartWindow.prototype.close = function close() {
  this.isOpened = false;
};

module.exports = SmartWindow;
