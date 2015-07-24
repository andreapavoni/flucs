import {Actions} from 'yafi'

class MyActions  extends Actions {
  constructor() {
    super()
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

export default new MyActions()
