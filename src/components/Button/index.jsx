import styles from './styles.scss'


export default ({ children=null, onClick=()=>{}, className, css={} }) => {
  return <div className={cn(styles.root, className)} onClick={onClick} style={css}>
    { children }
  </div>
}