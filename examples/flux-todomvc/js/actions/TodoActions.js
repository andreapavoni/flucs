var Actions = require('yafi').Actions;

var TodoActions = function() {
  this.generateActions(
    'create', 'toggleCompleteAll', 'toggleComplete',
    'destroyCompleted', 'destroy'
  );
};

TodoActions.prototype = {
  updateText: function(id, text) {
    this.dispatch('updateText', {id: id, text: text});
  }
};

module.exports = Actions.createFromObject(TodoActions);
