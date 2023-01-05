import React from 'react'

import { ISearchInputProps } from './interface'
import useSearchInput from './index.hook'
import './index.scss'
const FeatherIcon = require('feather-icons-react').default

const SearchInput: React.FC<ISearchInputProps> = props => {
  const { placeholder = '', size = 24 } = props
  const {
    showSearch,
    query,
    onSearchChange,
    onCloseClickHandler,
  } = useSearchInput(props)

  return (
    <div className='custom-search-input'>
      <div
        id='sub-search'
        className={`nav-item is-search `}
      >
        <div className='control'>
          <input
            type='text'
            className='input textFilter-input'
            style={{ height: size * 1.5 }}
            placeholder={placeholder}
            onChange={onSearchChange}
            value={query}
          />
        </div>
      </div>
      <span className={`nav-item is-icon ${!showSearch ? 'is-hidden' : ''}`}>
        <FeatherIcon
          icon='search'
          height={size}
          width={size}
        />
      </span>
      <span className={`nav-item is-icon ${showSearch ? 'is-hidden' : ''}`}>
        <FeatherIcon
          onClick={onCloseClickHandler}
          icon='x'
          height={size}
          width={size}
        />

      </span>
    </div>
  )
}

export default SearchInput
