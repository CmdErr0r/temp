var dmain=document.createElement("div");
document.body.append(dmain);

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
    dmain.appendChild(this.video);
  }
  
  async stop(){
  	this.stream.getTracks().forEach(track=>track.stop());
    dmain.removeChild(this.video)
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
  let btn = document.createElement("button")
  btn.innerText="Hold And Speek"
  btn.onmousedown = e => {
    vid.capture();
  }
  btn.onmouseup = e => {
    vid.stop()
  }
  let vid;
  let start = document.createElement("button")
  let btn_type=0
  let end=true
  start.innerText="To Camera =>";
  start.onclick = async () => {
    if (!end)
      return
    
    end = false
    btn_type = btn_type*(-1)+1

    if (btn_type) {
      vid = new VideoConcerateAndFit();
      await vid.start();
      start.innerText="<= exit camera";
      dmain.appendChild(btn);
      end=true
    } else {
      vid.stop();
      start.innerText="To Camera =>";
      dmain.removeChild(btn);
      end=true;
      return vid.VideoMap;
    }
    start.innerText = btn_type ? "<= exit camera" : "To Camera =>";
  }

  dmain.appendChild(start);
}

