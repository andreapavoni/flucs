import {Actions} from 'flucs'

class TodoActions extends Actions {
  constructor() {
    super()
    this.generateActions(
      'create', 'toggleCompleteAll', 'toggleComplete',
      'destroyCompleted', 'destroy'
    )
  }

  updateText(id, text) {
    this.dispatch('updateText', {id, text})
  }
}

export default new TodoActions()
