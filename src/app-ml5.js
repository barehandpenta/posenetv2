import {loadVideo} from './loadVideo'
import {mobilePredict} from './mobilePredict'

let bindpage = async () => {

  let video;
  try {
    video = await loadVideo(640, 480, 'video');
  } catch(err) {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' + 'or this device does not have a camera';
    info.style.display = 'block';
    throw err;
  }

  const classifier = await ml5.imageClassifier('MobileNet', video, () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    mobilePredict(video, classifier);
  });
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

bindpage();
