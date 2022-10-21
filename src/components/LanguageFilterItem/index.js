import './index.css'

const LanguageFilterItem = props => {
  const {details, onClickBtn, isActive} = props
  const {id, language} = details

  const onUpdateTab = () => {
    onClickBtn(id)
  }

  const activeStyle = isActive
    ? 'language-active-btn-style'
    : 'language-nr-btn-style'

  return (
    <li className="list-container">
      <button type="button" className={activeStyle} onClick={onUpdateTab}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
