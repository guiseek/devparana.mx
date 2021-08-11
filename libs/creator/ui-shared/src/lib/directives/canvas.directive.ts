import { Directive, ElementRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: 'canvas[devpr]' })
export class CanvasDirective {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  dpr = 0
  width = 0
  height = 0
  canvasItems: any[] = []
  child?: CanvasDirective

  constructor(
    // readonly vcr: ViewContainerRef,
    readonly ref: ElementRef<HTMLCanvasElement>
  ) {
    this.canvas = this.ref.nativeElement
    this.ctx = this.canvas.getContext('2d')!
  }

  create() {

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

		let item: CanvasDirective;
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

  remove(item: CanvasDirective) {
		this.canvasItems.splice(this.canvasItems.indexOf(item), 1);
	}

  uses(c: CanvasDirective) {
		this.child = c;
		this.child.add = this.add;
		this.child.remove = this.remove;
	}
}
