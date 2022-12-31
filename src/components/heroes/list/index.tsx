import { IHero } from "../interface"
import useHeroesGrid from "./index.hook"
import '../index.scss'
const HeroesGrid = () => {
  const { heroes = [] } = useHeroesGrid()


  return <div className="heroes-list">{heroes.map((cHero) => (<HeroCard hero={cHero} key={cHero.id} />))}</div>
}
export default HeroesGrid

const HeroCard = ({ hero }: { hero: IHero }) => {
  const { id, name, thumbnail } = hero
  const { path,extension } = thumbnail
  const thumbnailUrl=`${path}.${extension}`
  return (
    <div className="card">
      <div className="title">{name}</div>
      <img src={thumbnailUrl} alt={name} title={name}/>
    </div>
  )

}