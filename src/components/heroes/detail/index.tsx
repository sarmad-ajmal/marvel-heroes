import React from 'react';
import ReactDOM from 'react-dom'
import Img from "react-cool-img";

import useHeroDetail from './index.hook';
import InlineSpinner from '../../../common/components/inline_spinner';

import { IHero } from '../interface';
const FeatherIcon = require("feather-icons-react").default;

const HeroDetail = () => {
  const { hero, loading, goBack } = useHeroDetail()
  const { name, description, thumbnail, comics, events, series, stories } = hero || {}
  const { path, extension } = thumbnail || {}
  const thumbnailUrl = `${path}.${extension}`
  if (loading) {
    return <div className="page-center">

      <InlineSpinner />
    </div>
  }
  if (hero == null) {
    return <div className='page-center'>Nothing found</div>
  }
  return <div className='hero-detail'>
    <BackButton goBack={goBack} />
    <div className="character-container">
      <figure>

        <Img
          placeholder={'/images/gif/loading_image.gif'}
          error={'/images/gif/error_image.gif'}
          alt={name}
          src={thumbnailUrl}
          title={name}
          debounce={0}
        />
        <h2 className="title">{name}</h2>
      </figure>
      <div className='details'>
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
  return ReactDOM.createPortal(<span className='mobile-back' onClick={goBack} style={{ cursor: 'pointer' }}>
    <FeatherIcon icon='chevron-left' color={'white'} />  </span>, nav)
}