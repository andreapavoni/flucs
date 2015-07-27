import {Store} from 'yafi'

class TodoStore extends Store {
  constructor() {
    super()

    this.setInitialState({todos: {}})

    this.bindActions({
      'TodoActions': {
        '*': [
          'create', 'update', 'toggleCompleteAll', 'updateText',
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

  update(id, updates) {
    let todos = this.getState().todos
    todos[id] = Object.assign({}, todos[id], updates)
    this.setState({todos})
  }

  updateText(updates) {
    this.update(updates.id, {text: updates.text})
  }

  toggleCompleteAll() {
    let todos = this.getState().todos
    for (let id in todos) {
      this.update(id, {complete: !todos[id].complete})
    }
  }

  toggleComplete(todo) {
    this.update(todo.id, {complete: !todo.complete})
  }

  updateAll(updates) {
    for (let id in this.getState().todos) {
      this.update(id, updates)
    }
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
        this.destroy(id)
      }
    }
  }
}

export default new TodoStore()
