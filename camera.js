
class VideoConcerateAndFit{
  videoMap = []
  constructor(dim, resolution) {
   	this.dim=dim;
    this.res=resolution
  }
	async start(){
    this.video = document.createElement("video");
    this.stream = await navigator.mediaDevices.getUserMedia({video:true})
    this.video.srcObject = this.stream;
    await this.video.play();
    document.body.appendChild(this.video);
  }
  
  async stop(){
  	this.stream.getTracks().forEach(track=>track.stop());
    document.body.removeChild(this.video)
  }
  
  async capture(){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    console.log(this.video.videoWidth, this.video.videoHeight)
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    
    ctx.drawImage(this.video, 0, 0);
    const imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    console.log(imgData.data)
// 		videoMap.push(imgData.data);
  }
}


let btn = document.createElement("button")
btn.innerText="Hold And Speek"

let vid;
btn.onmousedown = e => {
	vid.capture()
}
btn.onmouseup = e => {
	vid.stop()
}

let start = document.createElement("button")
let btn_type=0
let end=true
start.innerText="To Camera =>";
start.onclick = async () => {
  if (!end){
    return
  }
  end = false
  btn_type = btn_type*(-1)+1

  if (btn_type) {
    vid = new VideoConcerateAndFit(0,0);
    await vid.start();
    start.innerText="<= exit camera";
    document.body.appendChild(btn);
    end=true
  } else {
    vid.stop();
    start.innerText="To Camera =>";
    document.body.removeChild(btn);
    end=true
  }
  start.innerText = btn_type ? "<= exit camera" : "To Camera =>";
}

document.body.appendChild(start);
