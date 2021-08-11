import { Dispatcher } from './dispatcher'
import { Callback } from './callback'

export class UndoState {
  constructor(public state: any, public description: Callback) {
    // this.state = JSON.stringify(state);
    this.state = state.getJSONString()
    this.description = description
  }

  getJSONString() {
    return JSON.stringify(this.state)
  }
}

export class UndoManager {
  static MAX_ITEMS = 100

  states: UndoState[] = []

  index: number = 0

  constructor(public dispatcher: Dispatcher, max: number = 100) {
    // this.dispatcher = dispatcher;
    UndoManager.MAX_ITEMS = max || 100
    this.clear()
  }

  save(state: UndoState, suppress: boolean) {
    var states = this.states
    var next_index = this.index + 1
    var to_remove = states.length - next_index
    states.splice(next_index, to_remove, state)

    if (states.length > UndoManager.MAX_ITEMS) {
      states.shift()
    }

    this.index = states.length - 1

    // console.log('Undo State Saved: ', state.description);
    if (!suppress) this.dispatcher.fire('state:save', state.description)
  }

  clear() {
    this.states = []
    this.index = -1
    // FIXME: leave default state or always leave one state?
  }

  canUndo() {
    return this.index > 0
    // && this.states.length > 1
  }

  canRedo() {
    return this.index < this.states.length - 1
  }

  undo() {
    if (this.canUndo()) {
      this.dispatcher.fire('status', 'Undo: ' + this.get().description)
      this.index--
    } else {
      this.dispatcher.fire('status', 'Nothing to undo')
    }

    return this.get()
  }

  redo() {
    if (this.canRedo()) {
      this.index++
      this.dispatcher.fire('status', 'Redo: ' + this.get().description)
    } else {
      this.dispatcher.fire('status', 'Nothing to redo')
    }

    return this.get()
  }

  get() {
    return this.states[this.index]
  }
}
