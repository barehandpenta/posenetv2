import {drawSkeleton, drawKeypoints} from './draw'

export let poseDetection = (video, net) => {
  const videoWidth = video.width;
  const videoHeight = video.height;
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  canvas.width = videoWidth
  canvas.height = videoHeight

  const flipHorizontal = true;
  const imageScaleFactor = 0.5;
  const outputStride = 16;


  let poseDetectionFrame = async () => {

    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;

    const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
    poses.push(pose);
    minPoseConfidence = 0.1;
    minPartConfidence = 0.5;

    console.log(pose.keypoints[0].position);

    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    poses.forEach(({score, keypoints}) => {
      if(score >= minPoseConfidence){
        drawKeypoints(keypoints, minPartConfidence, ctx);
        drawSkeleton(keypoints, minPartConfidence, ctx);
      }
    });
    requestAnimationFrame(poseDetectionFrame);
  }
  poseDetectionFrame();
}
