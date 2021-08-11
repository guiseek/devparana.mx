import { Callback } from "./callback"

export class Dispatcher {
  event_listeners: Record<string, Callback[]> = {}

  on(type: string, listener: Callback) {
    if (!(type in this.event_listeners)) {
      this.event_listeners[type] = []
    }
    var listeners = this.event_listeners[type]
    listeners.push(listener)
  }

  fire(type: string, ...args: unknown[]) {
    // const args = Array.prototype.slice.call(arguments)
    args.shift()
    const listeners = this.event_listeners[type]
    if (!listeners) return
    for (let i = 0; i < listeners.length; i++) {
      var listener = listeners[i]
      listener.apply(listener, args)
    }
  }
}
