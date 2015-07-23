import {createActions} from 'yafi'

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

export default createActions(MyActions)
