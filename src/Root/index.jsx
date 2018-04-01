import 'tracking';
import 'tracking/build/data/face-min';

import request from 'utils/request';
import apiUrls from 'config/api';

import styles from './styles.scss';


export default class extends React.Component{
  constructor(props){
    super(props);

    this.canvas = null;
    this.video = null;
    this.faceCanvas = null;

    this.state = {
      errorType: null,
      loadStatus: null,
      person: null,
    };
  }

  recognizeFace = async () => {
    const { state } = this;
    state.loadStatus = 'loading';
    this.setState(state);

    const {response, error} = await request(apiUrls.recognize, 'POST', {
      data: this.faceCanvas.toDataURL('image/jpeg'),
    });

    if(response){
      const { person } = response.data;
      state.person = person;

      if(person){
        this.setState(state);
        setTimeout(() => {
          state.loadStatus = 'loaded';
          this.setState(state);
        }, 1500);

        return;
      }

      state.loadStatus = 'loaded';
      this.setState(state);
      return;
    }

    state.loadStatus = 'error';
    state.person = null;

    this.setState(state);
  };

  cropFace = positionData => {
    const scaleDeltaX = positionData.width * .5;
    const scaleDeltaY = positionData.height * .5;
    this.faceCanvas.height = positionData.height + scaleDeltaY;
    this.faceCanvas.width = positionData.width + scaleDeltaX;
    const ctx = this.faceCanvas.getContext('2d');
    ctx.drawImage(
      this.video,
      -positionData.x + scaleDeltaX * .5,
      -positionData.y + scaleDeltaY * .5
    );
    this.state.loadStatus !== 'loading' && this.recognizeFace();
  };

  onTrack = e => {

    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const faces = e.data;

    if(faces.length === 0){
      this.setState({ errorType: 'noPeople' });
      return;
    }

    if(faces.length > 1){
      this.setState({ errorType: 'tooMuchPeople'});
      return;
    }

    this.setState({ errorType: null });

    const targetFaceData = faces[0];

    context.strokeStyle = '#1ced3b';
    context.strokeRect(targetFaceData.x, targetFaceData.y, targetFaceData.width, targetFaceData.height);

    this.cropFace(targetFaceData);
  };

  componentDidMount(){
    this.context = this.canvas.getContext('2d');
    const { tracking } = window;

    const tracker = new tracking.ObjectTracker('face');

    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track(this.video, tracker, { camera: true });
    tracker.on('track', this.onTrack);
  }

  setRef = refName => ref => {
    if(this[refName]) {
      return;
    }

    this[refName] = ref;
  };

  render(){
    const { errorType, loadStatus } = this.state;

    return <div className={styles.root}>
      <video
        width="640"
        height="480"
        preload="true"
        autoPlay={true}
        loop={true}
        muted={true}
        ref={this.setRef('video')}
        className={styles.video}
      />
      <canvas
        width="640"
        height="480"
        ref={this.setRef('canvas')}
        className={styles.video}
      />
      <canvas
        className={styles.faceCanvas}
        ref={this.setRef('faceCanvas')}
      />
      { loadStatus !== 'loaded' && <p className={styles.person}>{ this.state.person || 'Неизвестная личность' }</p> }
      { errorType === 'noPeople' && loadStatus === 'loaded' && <p className={styles.person}>Нет лиц</p> }
      { errorType === 'tooMuchPeople' && loadStatus === 'loaded' && <p className={styles.person}>Не более одного лица</p> }
    </div>;
  }
}