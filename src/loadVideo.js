let setupCamera = async (videoWidth, videoHeight, videoID) => {
  let video = document.getElementById(videoID);
  video.width = videoWidth;
  video.height = videoHeight;
  let stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

export let loadVideo = async (videoWidth, videoHeight, videoID) => {
  const video = await setupCamera(videoWidth, videoHeight, videoID);
  video.play();
  return video;
}
