import {Actions} from 'yafi'

class MyActions {
  constructor() {
    // super() // mandatory when extending from other classes
    this.generateActions(
      'updateName'
    )
  }
}

export default Actions.createActions(MyActions)
