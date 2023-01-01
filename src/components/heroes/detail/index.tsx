import React from 'react';
import ReactDOM from 'react-dom'

import useHeroDetail from './index.hook';

import { IHero } from '../interface';

const HeroDetail = () => {
  const { hero, goBack } = useHeroDetail()
  const { name, description, thumbnail, comics, events, series, stories } = hero || {}
  const { path, extension } = thumbnail || {}
  const thumbnailUrl = `${path}.${extension}`

  if (hero == null) {
    return <div>nothing found</div>
  }
  return <div className='hero-detail'>
    <BackButton goBack={goBack} />
    <div className="character-container">

      <img src={thumbnailUrl} alt={name} title={name} />
      <div className='details'>
        <h2 className="title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
    <div className="info-panel">

      <Comics comics={comics!} />
      <Stories stories={stories!} />
      <Events events={events!} />
      <Series series={series!} />
    </div>
  </div>
}

export default HeroDetail

const Comics = ({ comics }: { comics: IHero['comics'] }) => {
  const { items = [] } = comics || {}
  if (!items.length) {
    return null
  }
  return <section className="info">
    <h3>Comics</h3>
    <ul className="comic-items">
      {items.map(cItem => (<li key={cItem.name}>{cItem.name}</li>))}
    </ul>
  </section>
}
const Stories = ({ stories }: { stories: IHero['stories'] }) => {
  const { items = [] } = stories || {}
  if (!items.length) {
    return null
  }
  return <section className="info">
    <h3>Stories</h3>
    <ul className="comic-items">
      {items.map(cItem => (<li key={cItem.name}>{cItem.name}</li>))}
    </ul>
  </section>
}
const Events = ({ events }: { events: IHero['events'] }) => {
  const { items = [] } = events || {}
  if (!items.length) {
    return null
  }
  return <section className="info">
    <h3>Events</h3>
    <ul className="comic-items">
      {items.map(cItem => (<li key={cItem.name}>{cItem.name}</li>))}
    </ul>
  </section>
}
const Series = ({ series }: { series: IHero['series'] }) => {
  const { items = [] } = series || {}
  if (!items.length) {
    return null
  }
  return <section className="info">
    <h3>Series</h3>
    <ul className="comic-items">
      {items.map(cItem => (<li key={cItem.name}>{cItem.name}</li>))}
    </ul>
  </section>
}

const BackButton = ({ goBack }: { goBack: any }) => {
  const nav = document.getElementById('nav')
  if (nav == null) {
    return null
  }
  return ReactDOM.createPortal(<span className='mobile-back' onClick={goBack}>
    &#8592;  </span>, nav)
}