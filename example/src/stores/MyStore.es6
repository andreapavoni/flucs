import MyActions from '../actions/MyActions.es6'
import {Store} from 'yafi'

class MyStore extends Store {
  constructor() {
    super()
    this.name = ''

    this.bindActions({
      'MyActions': { // prefix
        'customName': 'doSomething', // 1:1 mapping
        '*': ['updateName'] // auto mapping
      },
      'CustomPrefix': {
        'anotherCustomName': 'doSomethingElse'
      }
    })
  }

  updateName(event) {
    return this.setState({name: event.target.value})
  }

  doSomething(payload) {
    console.log('custom action callback value: ', payload)
  }

  doSomethingElse(payload) {
    console.log('custom action callback with custom prefix value: ', payload)
  }
}

export default new MyStore()
