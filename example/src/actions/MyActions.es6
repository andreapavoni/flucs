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

  reallyAnotherAction(someValue) {
    this.dispatch('anotherCustomName', someValue, 'CustomPrefix')
  }
}

export default Actions.createActions(MyActions)
