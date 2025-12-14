import { Application, Container, Graphics } from 'pixi.js'
import type { ActionKind } from '@/types'

interface LayerConfig {
  y: number
  height: number
  color: number
  speed: number
}

const COLORS = {
  work: {
    sky: 0xffe4e1,
    hills: [0xffb3a7, 0xff9a8c, 0xff8071],
    ground: 0xff6b6b,
  },
  break: {
    sky: 0xe0f7f5,
    hills: [0xa8e6cf, 0x88d8b0, 0x69c99a],
    ground: 0x4ecdc4,
  },
  neutral: {
    sky: 0xf5f5f5,
    hills: [0xd4d4d4, 0xbebebe, 0xa8a8a8],
    ground: 0x95a5a6,
  },
}

export class Background {
  public container: Container
  private app: Application
  private layers: { graphics: Graphics; speed: number; elements: { x: number; width: number }[] }[] = []
  private currentKind: ActionKind = 'neutral'
  private skyGraphics: Graphics

  constructor(app: Application) {
    this.app = app
    this.container = new Container()

    // Create sky background
    this.skyGraphics = new Graphics()
    this.container.addChild(this.skyGraphics)

    // Create parallax layers (hills)
    this.createLayers()

    // Initial draw
    this.redraw()
  }

  private createLayers() {
    const layerConfigs: LayerConfig[] = [
      { y: 0.5, height: 0.3, color: 0, speed: 0.3 },
      { y: 0.6, height: 0.25, color: 0, speed: 0.5 },
      { y: 0.7, height: 0.2, color: 0, speed: 0.8 },
    ]

    layerConfigs.forEach((config) => {
      const graphics = new Graphics()
      const elements = this.generateHillElements()

      this.layers.push({
        graphics,
        speed: config.speed,
        elements,
      })

      this.container.addChild(graphics)
    })
  }

  private generateHillElements(): { x: number; width: number }[] {
    const elements: { x: number; width: number }[] = []
    let x = -100

    while (x < this.app.screen.width + 200) {
      const width = 150 + Math.random() * 150
      elements.push({ x, width })
      x += width * 0.6
    }

    return elements
  }

  private redraw() {
    const { width, height } = this.app.screen
    const colors = COLORS[this.currentKind]

    // Draw sky
    this.skyGraphics.clear()
    this.skyGraphics.rect(0, 0, width, height)
    this.skyGraphics.fill(colors.sky)

    // Draw each layer
    this.layers.forEach((layer, index) => {
      const layerY = height * (0.5 + index * 0.1)
      const layerHeight = height * (0.3 - index * 0.05)
      const color = colors.hills[index] || colors.ground

      layer.graphics.clear()

      // Draw hills
      layer.elements.forEach((element) => {
        layer.graphics.moveTo(element.x, height)
        layer.graphics.bezierCurveTo(
          element.x + element.width * 0.25,
          layerY - layerHeight,
          element.x + element.width * 0.75,
          layerY - layerHeight,
          element.x + element.width,
          height
        )
        layer.graphics.lineTo(element.x, height)
        layer.graphics.fill(color)
      })
    })

    // Draw ground
    const groundGraphics = this.layers[this.layers.length - 1]?.graphics
    if (groundGraphics) {
      groundGraphics.rect(0, height * 0.85, width, height * 0.15)
      groundGraphics.fill(colors.ground)
    }
  }

  public update(delta: number) {
    const baseSpeed = this.currentKind === 'work' ? 2 : this.currentKind === 'break' ? 0.5 : 1

    this.layers.forEach((layer) => {
      layer.elements.forEach((element) => {
        element.x -= baseSpeed * layer.speed * delta
      })

      // Recycle elements that go off screen
      const firstElement = layer.elements[0]
      if (firstElement && firstElement.x + firstElement.width < -100) {
        layer.elements.shift()
        const lastElement = layer.elements[layer.elements.length - 1]
        if (lastElement) {
          const newWidth = 150 + Math.random() * 150
          layer.elements.push({
            x: lastElement.x + lastElement.width * 0.6,
            width: newWidth,
          })
        }
      }
    })

    this.redraw()
  }

  public setKind(kind: ActionKind) {
    this.currentKind = kind
    this.redraw()
  }
}
