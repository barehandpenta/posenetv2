import * as posenet from '@tensorflow-models/posenet';
import {loadVideo} from './loadVideo'
import {poseDetection} from './poseDetection'


let bindpage = async () => {
  const net = await posenet.load(0.75);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('main').style.display = 'block';

  let video;

  try {
    video = await loadVideo(600, 500, 'video');
  } catch(err) {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' + 'or this device does not have a camera';
    info.style.display = 'block';
    throw err;
  }
  poseDetection(video, net);
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

bindpage();
