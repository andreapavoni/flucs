# yafi: yet another Flux implementation

A small, simple library to reduce boilerplate when using Facebook [Flux](https://github.com/facebook/flux).
Here there are some interesting points about it:

* based on [Flux](https://github.com/facebook/flux)
* it supports `waitFor`
* inspired by [Alt](https://alt.js.org)
* less than 150 lines of code
* written in ES6 ([ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html))
* 100% test covered with [Jest](http://facebook.github.io/jest)
* helpers to easily support ES5 without pain, it already has shims through [core-js](https://github.com/zloirock/core-js)

## Install
`npm install yafi`

## Usage
You can either use ES5 or ES6 syntax, it supports both.

### ES6
#### Actions
```
import {Actions} from 'yafi'

class TodoActions extends Actions {
  constructor() {
    super()
    // The following actions will dispatch actions like TodoActions.<name>
    this.generateActions('create', 'update', 'destroy')
  }

  // Custom action, when you need to change the action name or event the prefix
  updateText(id, text) {
    // Dispatch CustomActionsPrefix.customName instead of TodoActions.updateText
    this.dispatch('customName', {id, text}, 'CustomActionsPrefix')
  }
}

export default new TodoActions()
```

#### Store
```
class TodoStore extends Store {
  constructor() {
    super()

    // set initial state for store
    this.setInitialState({
      todos: {}
    })

    this.bindActions({
      'TodoActions': { // Prefix
        '*': [ // TodoActions.*
          'create', 'destroy', 'update', 'all' // store methods, automatically bound to the same action names
        ],
        'someActionName': 'someStoreMethod' // 1:1 mapping betwwen action name and store method
      }
    })
  }

  create(text) {
    let todos = this.getState().todos
    // ...
    this.setState({todos})
  }

  destroy(id) {
    // let todos = ...
    this.setState({todos})
  }

  // other bound actions...
}

export default new TodoStore()
```

That's it! You don't need to create constants or some `AppDispatcher`: `Actions` has `dispatch()` method, `Store` has `dispatcher` and `dispatchToken` properties.

### ES5
#### Actions
```
var Actions = require('yafi').Actions;

// Constructor
var TodoActions = function() {
  this.generateActions('create', 'update', 'destroy');
};

// Custom actions
TodoActions.prototype = {
  updateText: function(id, text) {
    this.dispatch('customName', {id, text}, 'CustomActionsPrefix')
  }
};

// Decorate our actions with Actions properties/methods
module.exports = Actions.createFromObject(TodoActions);
```

#### Store
```
var Store = require('yafi').Store;

// Constructor
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

// Methods
TodoStore.prototype = {
  create: function(text) {
    // let todos = ...
    this.setState({todos})
  },

  destroy: function(id) {
    // let todos = ...
    this.setState({todos})
  }
}

// Decorate our store with Store properties/methods
module.exports = Store.createFromObject(TodoStore);
```

## Examples
See [examples](examples/). There are two portings of the [original flux todomvc example](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) that use `yafi`, all other files (eg: components) were left untouched whenever possible. There's an [example written in ES5](examples/flux-todomvc) and another [written in ES6](examples/flux-todomvc-es6). They're both tested as well.

## TODO
* find a better name
* _ideas and PRs are welcome_
