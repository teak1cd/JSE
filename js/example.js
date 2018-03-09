const JSE = require("JSE");
const engine = new JSE("js/thread/");
const fs = engine.fs;
let render,shader;
engine.on('load',function(){
  render = engine.createSurface(720,480,custom_canvas_loc);
  //this is setup;
  shader=render.shader(()=>{});
  console.log("this is setup or onload");
  engine.on('draw',function(frame_data){
    //draw here
    render.background(
      Math.round(frame_data.frameCount/2)%255,
      Math.round(frame_data.frameCount/5)%255,
      Math.round(frame_data.frameCount/7)%255
    );
    render.fillColor(0,0,0);
    render.rect(0,0,Math.round(frame_data.frameCount/2)%255,20);
    render.rect(0,20,Math.round(frame_data.frameCount/5)%255,20);
    render.rect(0,40,Math.round(frame_data.frameCount/7)%255,20);
    //console.log("draw");
    render.fill();
  });
});
