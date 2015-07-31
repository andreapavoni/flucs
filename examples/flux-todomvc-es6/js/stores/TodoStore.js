import {Store} from 'flucs'

class TodoStore extends Store {
  constructor() {
    super()

    this.setInitialState({todos: {}})

    this.bindActions({
      'TodoActions': {
        '*': [
          'create', 'toggleCompleteAll', 'updateText',
          'destroyCompleted', 'destroy', 'toggleComplete'
        ]
      }
    })
  }

  areAllComplete() {
    let todos = this.getState().todos
    for (let id in todos) {
      if (!todos[id].complete) { return false }
    }
    return true
  }

  create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    let todos = this.getState().todos
    todos[id] = {id: id, complete: false, text: text}
    this.setState({todos})
  }

  updateText(todo) {
    let todos = this.getState().todos
    todos[todo.id] = Object.assign({}, {text: todo.text})
    this.setState({todos})
  }

  toggleCompleteAll() {
    let todos = this.getState().todos
    for (let id in todos) {
      todos[id] = Object.assign({}, {complete: !todos[id].complete})
    }
    this.setState({todos})
  }

  toggleComplete(todo) {
    let todos = this.getState().todos
    todos[todo.id] = Object.assign({}, {complete: !todo.complete})
    this.setState({todos})
  }

  destroy(id) {
    let todos = this.getState().todos
    delete todos[id]
    this.setState({todos})
  }

  destroyCompleted() {
    let todos = this.getState().todos
    for (let id in todos) {
      if (todos[id].complete) {
        delete todos[id]
      }
    }
    this.setState({todos})
  }
}

export default new TodoStore()
