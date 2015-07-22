import MyActions from '../actions/MyActions.es6'
import {Store} from 'yafi'

class MyStore {
  constructor() {
    this.name = ''

    this.bindActions({
      'MyActions.updateName': 'updateName',
      'MyActions.customName': 'doSomething'
    })
  }

  updateName(event) {
    return this.setState({name: event.target.value})
  }

  doSomething(payload) {
    console.log('custom store callback value: ', payload)
  }
}

export default Store.createStore(MyStore)
