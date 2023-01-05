export interface ISearchInputProps {
  placeholder?: string
  size?: number
  onClearSearch:()=>void
  onSearch: (value: string) => void
}
