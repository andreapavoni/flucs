import React from 'react'
import MyStore from '../stores/MyStore.es6'
import MyActions from '../actions/MyActions.es6'

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: MyStore.getState().name
    }
  }

  componentDidMount() {
    MyStore.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount() {
    MyStore.removeChangeListener(this.onChange.bind(this))
  }

  onChange() {
    this.setState({name: MyStore.getState().name})
  }

  render() {
    return <div>
      <input type="text" placeholder="Enter some text here" value={this.state.name} name="url" onChange={MyActions.updateName} autofocus={true}></input>
      <span onClick={MyActions.anotherAction}>Text is: {this.state.name}</span>
      <button onClick={MyActions.reallyAnotherAction}>Click Me!</button>
    </div>
  }
}
