import React from 'react';
import Pagination from 'rc-pagination'
import Select from 'rc-select'
import { Link } from "react-router-dom"

import useHeroesGrid from "./index.hook"

import { PaginationLocale } from './en_us'
import { IHero } from "../interface"
import '../index.scss'
import './rc-pagination.scss'
import SearchInput from '../../../common/components/search_input';
const HeroesGrid = () => {
  const { heroes = [], meta, onChange, onChangeQuery, onClearSearch } = useHeroesGrid()


  return <>
    <div className="filters">
      <div className={'pagination-container'}>
        <Pagination
          selectComponentClass={Select}
          current={meta.current.curPage}
          pageSize={meta.current.perPage}
          showQuickJumper
          pageSizeOptions={['30', '50', '100']}
          className='rc-pagination'
          hideOnSinglePage={false}
          showSizeChanger
          onShowSizeChange={onChange}
          onChange={onChange}
          total={meta.current.totalResults}
          locale={PaginationLocale}
        />
      </div>
      <SearchInput onClearSearch={onClearSearch} onSearch={onChangeQuery} placeholder={'Search characters by name'} />
    </div>

    <div className="heroes-list">

      {heroes.map((cHero) => (<HeroCard hero={cHero} key={cHero.id} />))}</div>
  </>
}
export default HeroesGrid

const HeroCard = ({ hero }: { hero: IHero }) => {
  const { id, name, thumbnail } = hero
  const { path, extension } = thumbnail
  const thumbnailUrl = `${path}.${extension}`
  const detailUrl = `/${id}`
  return (
    <Link to={detailUrl}>
      <div className="card">
        <div className="title">{name}</div>
        <img src={thumbnailUrl} alt={name} title={name} />
      </div>
    </Link>
  )

}