'use client'

import { useEffect, useRef, useState } from 'react'
import { Application } from 'pixi.js'
import { Background } from './Background'
import { Character } from './Character'
import type { ActionKind } from '@/types'
import styles from './RunCanvas.module.css'

interface RunCanvasProps {
  currentKind: ActionKind
}

export function RunCanvas({ currentKind }: RunCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const [isReady, setIsReady] = useState(false)
  const backgroundRef = useRef<Background | null>(null)
  const characterRef = useRef<Character | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initPixi = async () => {
      const app = new Application()

      await app.init({
        resizeTo: containerRef.current!,
        backgroundColor: 0xfff8f0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })

      containerRef.current!.appendChild(app.canvas)
      appRef.current = app

      // Initialize background
      const background = new Background(app)
      backgroundRef.current = background
      app.stage.addChild(background.container)

      // Initialize character
      const character = new Character(app)
      characterRef.current = character
      app.stage.addChild(character.container)

      // Start game loop
      app.ticker.add((ticker) => {
        const delta = ticker.deltaTime
        background.update(delta)
        character.update(delta)
      })

      setIsReady(true)
    }

    initPixi()

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true })
        appRef.current = null
      }
    }
  }, [])

  // Update character state based on currentKind
  useEffect(() => {
    if (!isReady || !characterRef.current || !backgroundRef.current) return

    characterRef.current.setKind(currentKind)
    backgroundRef.current.setKind(currentKind)
  }, [currentKind, isReady])

  return <div ref={containerRef} className={styles.canvas} />
}
