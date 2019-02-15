import {drawLabel} from './draw'

let className, prob;
export let mobilePredict = (video, net) => {
  const videoWidth = video.width;
  const videoHeight = video.height;
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  canvas.width = videoWidth
  canvas.height = videoHeight

  let nowPredict = async () => {
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();
    drawLabel(className + " " + prob , ctx);

    net.predict(video, (err,results) => {
      if (err) {
        console.error(err);
      }
      else {
        className = results[0].className;
        prob = results[0].probability;
      }
    });
    requestAnimationFrame(nowPredict)
  }

  nowPredict();
}
