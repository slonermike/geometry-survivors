export class Enemy extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene)
    this.setPosition(x, y)
  }
}
