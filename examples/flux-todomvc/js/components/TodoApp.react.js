/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {todos: TodoStore.getState().todos};
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange).bind(this);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange).bind(this);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.todos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.todos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(TodoStore.getState());
  }

});

module.exports = TodoApp;
