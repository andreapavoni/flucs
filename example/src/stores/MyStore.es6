import MyActions from '../actions/MyActions.es6'
import {Store} from 'yafi'

class MyStore {
  constructor() {
    this.name = ''

    this.bindActions({
      'MyActions.updateName': 'updateName'
    })
  }

  updateName(event) {
    return this.setState({name: event.target.value})
  }
}

export default Store.createStore(MyStore)
