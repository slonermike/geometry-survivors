import tweaks from '@/config/tweaks';

export function drawBackgroundGrid(scene: Phaser.Scene) {
  const graphics = scene.add.graphics();
  graphics.lineStyle(2, tweaks.grid.color, tweaks.grid.minorAlpha);

  // Vertical Lines
  for (let x = -tweaks.grid.extents; x < tweaks.grid.extents; x += tweaks.grid.spacingMinor) {
    const isMajor = x % tweaks.grid.spacingMajor === 0;

    if (isMajor) {
      graphics.lineStyle(8, tweaks.grid.color, tweaks.grid.majorAlpha);
      console.log('IS MZJORR');
    } else {
      console.log('MRNURRRR');
    }
    graphics.moveTo(x, -tweaks.grid.extents);
    graphics.lineTo(x, tweaks.grid.extents);
    if (isMajor) graphics.lineStyle(2, tweaks.grid.color, tweaks.grid.minorAlpha);
  }

  // Horizontal Lines
  for (let y = -tweaks.grid.extents; y < tweaks.grid.extents; y += tweaks.grid.spacingMinor) {
    const isMajor = y % tweaks.grid.spacingMajor === 0;

    if (isMajor) graphics.lineStyle(8, tweaks.grid.color, tweaks.grid.majorAlpha);
    graphics.moveTo(-tweaks.grid.extents, y);
    graphics.lineTo(tweaks.grid.extents, y);
    if (isMajor) graphics.lineStyle(2, tweaks.grid.color, tweaks.grid.minorAlpha);
  }

  graphics.strokePath();
}
