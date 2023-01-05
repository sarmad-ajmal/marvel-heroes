import React, { CSSProperties } from 'react'
import { Oval } from 'react-loader-spinner'
import './index.scss'

type InlineSpinnerProps = {
  style?: CSSProperties
  className?: string
  height?: number
  width?: number
  strokeWidth?: number
  strokeWidthSecondary?: number
  color?: string
  secondaryColor?: string
}
const InlineSpinner = (props: InlineSpinnerProps) => {
  const {
    style = {},
    className = '',
    color = '#3273dc',
    height = 25,
    width = 25,
    secondaryColor = '#cecece',
    strokeWidth = 4,
    strokeWidthSecondary = 1,
  } = props
  return (
    <span className={`inline-oval-spinner ${className}`}>
      <Oval
        ariaLabel='loading-indicator'
        height={height}
        width={width}
        strokeWidth={strokeWidth}
        strokeWidthSecondary={strokeWidthSecondary}
        color={color}
        secondaryColor={secondaryColor}
        // @ts-ignore
        wrapperStyle={{ display: 'inline', padding: '0px', ...style }}
      />
    </span>
  )
}

export default InlineSpinner
