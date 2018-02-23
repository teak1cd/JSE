(function(module){
  class color{
    constructor(r,g,b){
      if(r.constructor===this.constructor)return r;
      this.r=r;
      this.g=g;
      this.b=b;
    }
    toString(){
      var r = this.r.toString(16).length===2?this.r.toString(16):"0"+this.r.toString(16);
      var g = this.g.toString(16).length===2?this.g.toString(16):"0"+this.g.toString(16);
      var b = this.b.toString(16).length===2?this.b.toString(16):"0"+this.b.toString(16);
      return "#"+r+g+b;
    }
  }
  const DOM=document;
  const WIN=window;
var nil = new class nil{
  constructor(){}
}
  module.export=new module.package("JSE.subpackage.render",class JSE_subpackage_render{
  constructor(canvas){
    this.canvas=canvas;
    this.context=this.canvas.getContext("2d");
    this.thread = require('JSE.subpackage.thread');
    this.threads = [];
  }
  get color(){
    return color;
  }
  background(r,g,b){
    this.context.beginPath();
    this.context.strokeStyle=new color(r,g,b).toString();
    this.context.fillStyle=new color(r,g,b).toString();
    this.context.clearRect(-1,-1,this.canvas.width+2,this.canvas.height+2)
    this.context.fillRect(-1,-1,this.canvas.width+2,this.canvas.height+2);
    return this;
  }
  shader(shader){
    var data = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
    var thr = new this.thread("post.js",function(...args){console.log(args);});

    this.threads.push(thr);
    thr.post([shader.toString(),data]);
    return thr;
  }
  fillColor(r,g,b){
    this.context.fillStyle=new color(r,g,b).toString();
  }
  strokeColor(r,g,b){
    this.context.strokeStyle();
  }
  fill(){
    this.context.fill();
  }
  stroke(){
    this.context.fill();
  }
  rect(x,y,w,h){
    this.context.rect(x,y,w,h);
  }
  fillRect(x,y,w,h){
    this.rect(x,y,w,h);
    this.fill();
  }
  clip(path,fillrule){
    this.context.clip.call(path,fillrule);
  }
  arc(x,y,radius, startAngle, endAngle, anticlockwise){
    this.ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise);
  }

  get ctx(){
    return this.context;
  }
  get cImage(){
    return require("jse.subpackage.image");
  }
  image(image,x,y,w,h,sx,sy,sw,sh){

    if(arguments.length===5){
      this.context.drawImage(image,x,y,w,h);
    }else if(arguments.length===8){
      this.context.drawImage(image,x,y,w,h,sx,sy,sw,sh);
    }else{
      throw new UnexpectedArgumentsLength(arguments.length);
    }
  }
});
})(module);
