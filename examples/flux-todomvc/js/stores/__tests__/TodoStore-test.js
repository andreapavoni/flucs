/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore-test
 */

jest.autoMockOff();

describe('TodoStore', function() {
  var TodoActions = require('../../actions/TodoActions');
  var TodoStore;
  var actionCreate = {actionType: 'TodoActions.create', payload: 'foo'};

  beforeEach(function() {
    TodoStore = require('../TodoStore');
  });

  it('should initialize with no to-do items', function() {
    var all = TodoStore.getState().todos;
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    TodoStore.dispatcher.dispatch(actionCreate);
    var all = TodoStore.getState().todos;
    var keys = Object.keys(all);

    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    TodoStore.dispatcher.dispatch(actionCreate);
    var all = TodoStore.getState().todos;
    var keys = Object.keys(all);

    expect(keys.length).toBe(1);

    var actionDestroy = {
      actionType: 'TodoActions.destroy',
      payload: keys[0]
    };
    TodoStore.dispatcher.dispatch(actionDestroy);
    all = TodoStore.getState().todos;
    keys = Object.keys(all);

    expect(all[keys[0]]).toBeUndefined();
  });

  it('can determine whether all to-do items are complete', function() {
    var i = 0;
    for (; i < 3; i++) {
      TodoStore.dispatcher.dispatch(actionCreate);
    }
    expect(Object.keys(TodoStore.getState().todos).length).toBe(3);
    expect(TodoStore.areAllComplete()).toBe(false);

    var actionCompleteAll = {
      actionType: 'TodoActions.toggleCompleteAll'
    };
    TodoStore.dispatcher.dispatch(actionCompleteAll);
    expect(TodoStore.areAllComplete()).toBe(true);

    var all = TodoStore.getState().todos;
    var keys = Object.keys(all);
    var actionComplete = {
      actionType: 'TodoActions.toggleComplete',
      payload: all[keys[0]]
    };
    TodoStore.dispatcher.dispatch(actionComplete);
    expect(TodoStore.areAllComplete()).toBe(false);
  });
});
