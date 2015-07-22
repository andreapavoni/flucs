import MyActions from '../actions/MyActions.es6'
import {Store} from 'yafi'

class MyStore {
  constructor() {
    this.name = ''

    this.bindActions({
      'MyActions.updateName': 'updateName',
      'MyActions.customName': 'doSomething',
      'CustomPrefix.anotherCustomName': 'doSomethingElse'
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

export default Store.createStore(MyStore)
