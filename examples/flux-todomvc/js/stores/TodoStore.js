var Store = require('flucs').Store;

var TodoStore = function() {
  this.setInitialState({todos: {}});

  this.bindActions({
    'TodoActions': {
      '*': [
        'create', 'toggleCompleteAll', 'updateText',
        'destroyCompleted', 'destroy', 'toggleComplete'
      ]
    }
  });
}

TodoStore.prototype = {
  areAllComplete: function() {
    var todos = this.getState().todos;
    for (var id in todos) {
      if (!todos[id].complete) { return false; }
    }
    return true;
  },

  create: function(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var todos = this.getState().todos;
    todos[id] = {id: id, complete: false, text: text};
    this.setState({todos: todos});
  },

  updateText: function(todo) {
    var todos = this.getState().todos;
    todos[todo.id].text = todo.text;
    this.setState({todos: todos});
  },

  toggleCompleteAll: function() {
    var todos = this.getState().todos;
    var areAllComplete = this.areAllComplete();

    for (var id in todos) {
      if (areAllComplete) {
        todos[id].complete = false;
      } else if (!todos[id].complete) {
        todos[id].complete = true;
      }
    }

    this.setState({todos: todos});
  },

  toggleComplete: function(todo) {
    var todos = this.getState().todos;
    todos[todo.id].complete = !todo.complete;
    this.setState({todos: todos});
  },

  destroy: function(id) {
    var todos = this.getState().todos;
    delete todos[id];
    this.setState({todos: todos});
  },

  destroyCompleted: function() {
    var todos = this.getState().todos;
    for (var id in todos) {
      if (todos[id].complete) {
        delete todos[id];
      }
    }
    this.setState({todos: todos});
  }
}

module.exports = Store.createFromObject(TodoStore);
