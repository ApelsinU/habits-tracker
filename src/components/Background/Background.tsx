import bgDefault from '../../assets/background/background-1.jpg'
import './Background.scss'

interface BackgroundProps {
  src?: string
}

function Background({ src = bgDefault }: BackgroundProps) {
  return (
    <div className="background">
      <img className="background__image" src={src} alt="" />
    </div>
  )
}

export default Background
