import Phaser from 'phaser';
import tweaks from '../../config/tweaks';

export class Player extends Phaser.GameObjects.Graphics {
  private speedMultiplier = 1.0;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene);
    this.fillStyle(tweaks.player.color, 1);
    this.fillCircle(0, 0, tweaks.player.radius);

    this.setPosition(x, y);
    scene.add.existing(this);

    scene.physics.add.existing(this);

    if (this.body) {
      const physicsBody = this.body as Phaser.Physics.Arcade.Body;
      physicsBody.setCircle(tweaks.player.radius);
    } else {
      throw new Error('player has no physics body in constructor');
    }

    this.cursors = scene.input.keyboard?.createCursorKeys();
  }

  update() {
    if (!this.body) {
      throw new Error('Player has no physics body in update');
    }
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;

    const velocity = new Phaser.Math.Vector2(
      this.cursors?.left.isDown ? -1 : this.cursors?.right.isDown ? 1 : 0,
      this.cursors?.up.isDown ? -1 : this.cursors?.down.isDown ? 1 : 0
    )
      .normalize()
      .scale(this.speedMultiplier * tweaks.difficulty.playerSpeed);

    physicsBody.setVelocity(velocity.x, velocity.y);
  }
}
