import bg1 from './background-1.jpg'
import bg2 from './background-2.jpg'
import bg3 from './background-3.jpg'
import bg4 from './background-4.jpg'
import bg5 from './background-5.jpg'
import bg6 from './background-6.jpg'
import bg7 from './background-7.jpg'
import bg8 from './background-8.jpg'
import bg9 from './background-9.jpg'
import bg10 from './background-10.jpg'

export interface BackgroundOption {
  id: string
  src: string
}

export const backgroundOptions: BackgroundOption[] = [
  { id: 'background-1', src: bg1 },
  { id: 'background-2', src: bg2 },
  { id: 'background-3', src: bg3 },
  { id: 'background-4', src: bg4 },
  { id: 'background-5', src: bg5 },
  { id: 'background-6', src: bg6 },
  { id: 'background-7', src: bg7 },
  { id: 'background-8', src: bg8 },
  { id: 'background-9', src: bg9 },
  { id: 'background-10', src: bg10 },
]

export const defaultBackgroundId = 'background-1'

export function getBackgroundSrc(id: string | undefined): string {
  const found = backgroundOptions.find((b) => b.id === id)
  return found ? found.src : bg1
}
