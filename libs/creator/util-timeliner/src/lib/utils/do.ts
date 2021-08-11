import { Callback } from "./callback";

export class Do {
  listeners = new Set<Callback>()

  do(callback: Callback) {
    this.listeners.add(callback);
  }

  undo(callback: Callback) {
    this.listeners.delete(callback);
  }

  fire(...args: (Callback)[]) {
    for (let l of this.listeners) {
      l(...args)
    }
  }
}
