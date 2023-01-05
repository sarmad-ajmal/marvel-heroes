export interface ISearchInputProps {
  placeholder?: string
  size?: number
  disabled?:boolean
  onClearSearch:()=>void
  onSearch: (value: string) => void
}
