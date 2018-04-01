import styles from './styles.scss';


export default class extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return <div className={styles.root}>
      Hello!
    </div>;
  }
}