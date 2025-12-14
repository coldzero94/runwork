import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js'
import type { ActionKind } from '@/types'

const COLORS = {
  work: {
    body: 0xff6b6b,
    accent: 0xffffff,
  },
  break: {
    body: 0x4ecdc4,
    accent: 0xffffff,
  },
  neutral: {
    body: 0x95a5a6,
    accent: 0xffffff,
  },
}

export class Character {
  public container: Container
  private app: Application
  private graphics: Graphics
  private zText: Text | null = null
  private currentKind: ActionKind = 'neutral'
  private animationFrame: number = 0
  private bobOffset: number = 0

  constructor(app: Application) {
    this.app = app
    this.container = new Container()
    this.graphics = new Graphics()
    this.container.addChild(this.graphics)

    // Position character
    this.updatePosition()
    this.draw()
  }

  private updatePosition() {
    this.container.x = this.app.screen.width * 0.3
    this.container.y = this.app.screen.height * 0.75
  }

  private draw() {
    const colors = COLORS[this.currentKind]
    this.graphics.clear()

    // Apply bob animation
    const bob = Math.sin(this.bobOffset) * 3

    // Body (simple rounded rectangle/ellipse shape)
    this.graphics.ellipse(0, -25 + bob, 20, 25)
    this.graphics.fill(colors.body)

    // Head
    this.graphics.circle(0, -55 + bob, 15)
    this.graphics.fill(colors.body)

    // Eyes
    this.graphics.circle(-5, -58 + bob, 3)
    this.graphics.fill(colors.accent)
    this.graphics.circle(5, -58 + bob, 3)
    this.graphics.fill(colors.accent)

    // Legs animation
    const legSwing = Math.sin(this.animationFrame * 0.3) * 15

    // Left leg
    this.graphics.moveTo(-8, -5 + bob)
    this.graphics.lineTo(-8 - legSwing, 15 + bob)
    this.graphics.stroke({ width: 6, color: colors.body })

    // Right leg
    this.graphics.moveTo(8, -5 + bob)
    this.graphics.lineTo(8 + legSwing, 15 + bob)
    this.graphics.stroke({ width: 6, color: colors.body })

    // Arms animation
    const armSwing = Math.sin(this.animationFrame * 0.3 + Math.PI) * 20

    // Left arm
    this.graphics.moveTo(-15, -35 + bob)
    this.graphics.lineTo(-20 + armSwing * 0.5, -20 + bob)
    this.graphics.stroke({ width: 5, color: colors.body })

    // Right arm
    this.graphics.moveTo(15, -35 + bob)
    this.graphics.lineTo(20 - armSwing * 0.5, -20 + bob)
    this.graphics.stroke({ width: 5, color: colors.body })

    // Sweat drops when working
    if (this.currentKind === 'work' && Math.floor(this.animationFrame / 20) % 2 === 0) {
      this.graphics.circle(18, -50 + bob, 3)
      this.graphics.fill(0x87ceeb)
    }

    // Z's when on break - use Text object
    if (this.currentKind === 'break') {
      const zOffset = (this.animationFrame % 60) / 60

      if (!this.zText) {
        const style = new TextStyle({
          fontSize: 14,
          fill: colors.body,
          fontWeight: 'bold',
        })
        this.zText = new Text({ text: 'z', style })
        this.container.addChild(this.zText)
      }

      this.zText.visible = true
      this.zText.style.fontSize = 12 + zOffset * 6
      this.zText.style.fill = colors.body
      this.zText.x = 20 + zOffset * 15
      this.zText.y = -70 - zOffset * 25 + bob
      this.zText.alpha = 1 - zOffset * 0.5
    } else if (this.zText) {
      this.zText.visible = false
    }
  }

  public update(delta: number) {
    // Animation speed based on kind
    const speedMultiplier = this.currentKind === 'work' ? 1.5 : this.currentKind === 'break' ? 0.3 : 1

    this.animationFrame += delta * speedMultiplier
    this.bobOffset += delta * 0.1 * speedMultiplier

    this.updatePosition()
    this.draw()
  }

  public setKind(kind: ActionKind) {
    this.currentKind = kind
    this.draw()
  }
}
