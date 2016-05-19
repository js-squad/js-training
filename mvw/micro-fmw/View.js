
function View(model, controller) {
	this.setModel(model);
	this.setController(controller);
}

View.prototype.setModel = function(model) {
	this._model = model;
	model.on('change', this.update);
};

View.prototype.update = function(){}; // executed when the model changes, overwritten by the user

View.prototype.setController = function(controller) {
	this._controller = controller;
};


View.prototype.buildUIActions = function() {
	var uiActions = this.getUIActions();
	uiActions.forEach(function(uiAction) {
		on(this.find(uiAction.selector), uiAction.eventName, this.getController()[uiAction.methodName]);
	});
}


module.exports = {
	View: View
};