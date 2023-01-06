import { useState } from 'react'
import './index.scss'

const ToggleDarkTheme = () => {
  const [isDark, setDark] = useState(false)
  const body = document.getElementsByTagName('body')[0]
  const toggleTheme = (e: any) => {
    e.preventDefault()
    const isDark = body.classList.contains('dark-theme')
    if (isDark) {
      setDark(false)
      body.classList.remove('dark-theme')
    } else {
      setDark(true)

      body.classList.add('dark-theme')
    }
  }
  return <div className="toggle" onClick={toggleTheme}>
    <input type="checkbox" id="toggle" checked={!isDark} />
    <label htmlFor="toggle"></label>
  </div >
}
export default ToggleDarkTheme
