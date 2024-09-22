class VideoConcerateAndFit{
  constructor(resolution=0.4, color_dim=1) {
    this.videoMap = [];
   	this.cdim=color_dim;
    this.res=resolution;
  }
	async start(){
    this.video = document.createElement("video");
    this.stream = await navigator.mediaDevices.getUserMedia({video:true})
    this.video.srcObject = this.stream;
    await this.video.play();
  }
  
  async stop(){
  	this.stream.getTracks().forEach(track=>track.stop());
  }
  
  async capture(){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    ctx.drawImage(this.video, 0, 0);
//     const imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
//     console.log(imgData.data)
    this.videoMap.push(canvas.toDataURL('image/jpeg', this.res));
  }
}


function main(){
    let vid = new VideoConcerateAndFit();
    vid.start();
    vid.capture();
    vid.stop();
    return vid.videoMap;
}

