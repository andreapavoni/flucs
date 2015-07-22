import {Actions} from 'yafi'

class MyActions {
  constructor() {
    this.generateActions(
      'updateName'
    )
  }

  anotherAction(someValue) {
    this.dispatch('customName', someValue)
  }
}

export default Actions.createActions(MyActions)
