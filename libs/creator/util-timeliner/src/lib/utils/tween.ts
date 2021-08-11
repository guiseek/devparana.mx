export class Tweens {
  static none(k?: number) {
    return 0;
  }

  static linear(k: number) {
    return k;
  }

  static quadEaseIn(k: number) {
    return k * k;
  }

  static quadEaseOut(k: number) {
    return - k * (k - 2);
  }

  static quadEaseInOut(k: number) {
    if ((k *= 2) < 1) return 0.5 * k * k;
    return - 0.5 * (--k * (k - 2) - 1);
  }
}
