import { getBackgroundSrc } from '../../assets/background/backgrounds'
import './Background.scss'

interface BackgroundProps {
  id?: string
}

function Background({ id }: BackgroundProps) {
  return (
    <div className="background">
      <img className="background__image" src={getBackgroundSrc(id)} alt="" />
      <div className="background__overlay" />
    </div>
  )
}

export default Background
