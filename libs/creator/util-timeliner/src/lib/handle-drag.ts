export type FnEvent<E, R = void> = (ev: E) => R

function handleDrag(
  element: HTMLElement,
  onDown: FnEvent<PointerEvent>,
  onMove: FnEvent<PointerEvent>,
  onUp: FnEvent<PointerEvent>,
  downCriteria: FnEvent<Touch, boolean>
) {
  let pointer: any

  let bounds = element.getBoundingClientRect()

  element.addEventListener('mousedown', onMouseDown)

  function onMouseDown(e: MouseEvent) {
    handleStart(e)

    if (downCriteria && !downCriteria(pointer)) {
      pointer = null
      return
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    onDown(pointer)

    e.preventDefault()
  }

  function onMouseMove(e: MouseEvent | Touch) {
    handleMove(e)
    onMove(pointer)
  }

  function handleStart(e: MouseEvent) {
    bounds = element.getBoundingClientRect()
    var currentx = e.clientX,
      currenty = e.clientY
    pointer = {
      startx: currentx,
      starty: currenty,
      x: currentx,
      y: currenty,
      dx: 0,
      dy: 0,
      offsetx: currentx - bounds.left,
      offsety: currenty - bounds.top,
      moved: false,
    }
  }

  function handleMove(e: MouseEvent | Touch) {
    bounds = element.getBoundingClientRect()
    const currentx = e.clientX,
      currenty = e.clientY,
      offsetx = currentx - bounds.left,
      offsety = currenty - bounds.top

    pointer.x = currentx
    pointer.y = currenty
    pointer.dx = e.clientX - pointer.startx
    pointer.dy = e.clientY - pointer.starty
    pointer.offsetx = offsetx
    pointer.offsety = offsety

    // If the pointer dx/dy is _ever_ non-zero, then it's moved
    pointer.moved = pointer.moved || pointer.dx !== 0 || pointer.dy !== 0
  }

  function onMouseUp(e: MouseEvent | Touch) {
    handleMove(e)
    onUp(pointer)
    pointer = null

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  element.addEventListener('touchstart', onTouchStart)

  function onTouchStart(te: TouchEvent) {
    if (te.touches.length == 1) {
      var e = te.touches[0]
      if (downCriteria && !downCriteria(e)) return
      te.preventDefault()
      handleStart(e as any)
      onDown(pointer)
    }

    element.addEventListener('touchmove', onTouchMove)
    element.addEventListener('touchend', onTouchEnd)
  }

  function onTouchMove(te: TouchEvent) {
    var e = te.touches[0] as any
    onMouseMove(e)
  }

  function onTouchEnd(e: TouchEvent) {
    // var e = e.touches[0];
    onMouseUp(e as any)
    element.removeEventListener('touchmove', onTouchMove)
    element.removeEventListener('touchend', onTouchEnd)
  }

  // this.release = function() {
  // 	element.removeEventListener('mousedown', onMouseDown);
  // 	element.removeEventListener('touchstart', onTouchStart);
  // };
}

export { handleDrag }
