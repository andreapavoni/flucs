import Footer from './Footer.react'
import Header from './Header.react'
import MainSection from './MainSection.react'
import React from 'react'
import TodoStore from '../stores/TodoStore'

export default class TodoApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: TodoStore.getState().todos
    }
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange.bind(this))
  }

  onChange() {
    this.setState(TodoStore.getState())
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.todos}
          areAllComplete={TodoStore.areAllComplete()}
          />
        <Footer allTodos={this.state.todos} />
      </div>
    )
  }
}
