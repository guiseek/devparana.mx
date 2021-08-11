import { handleDrag } from "./handle-drag"

export class Canvas {
  ctx: CanvasRenderingContext2D
  dpr = 0
  width = 0
  height = 0
  canvasItems: any[] = []
  child?: Canvas

  constructor(
    public canvas: HTMLCanvasElement
  ) {
    this.ctx = this.canvas.getContext('2d')!
  }

  create() {
    this.canvas = document.createElement('canvas')
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!
    }
  }

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    this.dpr = window.devicePixelRatio
    this.canvas.width = this.width * this.dpr
    this.canvas.height = this.height * this.dpr
    this.canvas.style.width = w + 'px'
    this.canvas.style.height = h + 'px'

    if (this.child) this.child.setSize(w, h)
  }

  paint(ctx: CanvasRenderingContext2D) {
    if (this.child) {
      if (!this.child.paint) console.warn('implement repaint()')
      this.child.paint(ctx);
    }

    let item: Canvas;
    for (let i = 0; i < this.canvasItems.length; i++) {
      item = this.canvasItems[i];
      item.paint(this.ctx)
    }
  }

  repaint() {
    this.paint(this.ctx);
  }

  add(item: any) {
    this.canvasItems.push(item)
  }

  remove(item: Canvas) {
    this.canvasItems.splice(this.canvasItems.indexOf(item), 1);
  }

  uses(c: Canvas) {
    this.child = c;
    this.child.add = this.add;
    this.child.remove = this.remove;
  }

  // handleDrag(canvas: HTMLCanvasElement) {
  //   handleDrag(
  //     canvas,
  //     <Event>(e) => {
  //       if (this.child.onDown) { this.child.onDown(e) }
  //     },
  //     (e: Event) => {
  //       if (this.child.onMove) { this.child.onMove(e) }
  //     },
  //     (e: PointerEvent) => {
  //       if (this.child.onUp) { this.child.onUp(e) }
  //     },
  //     (ev: TouchEvent) => {

  //     }
  //   )
  // }
}
