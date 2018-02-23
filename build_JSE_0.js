(function(){
module=new class module{
  constructor(){
    window.require=(module_name)=>{
      return this.modules[module_name.toLowerCase().replace(/_/g,".")].export?this.modules[module_name.toLowerCase().replace(/_/g,".")].export:Function;
    };
    this.modules={};
  }
  addModule(data){
    if(data.name.toLowerCase().replace(/_/g,".")!=data.export.name.toLowerCase().replace(/_/g,".")){
      throw new UnexpectedValueError("expected module class to be "+data.name.toLowerCase().replace(/_/g,".")+", got "+data.export.name.toLowerCase().replace(/_/g,"."));
    }
    console.log("adding module "+data.name.toLowerCase().replace(/_/g,"."));
    this.modules[data.name.toLowerCase().replace(/_/g,".")]=data;
  }
  set export(data){
    this.addModule(data);
  }
  set exports(data){
    this.addModule(data);
  }
  get package(){return _module}
}
class _module{
  constructor(name,code){
    this.name=name;
    this.export=code;
  }
}
class UnexpectedValueError extends Error{
  constructor(message){
    super(message);
  }
}
Object.freeze(_module);
Object.freeze(module);
})();

(function(module){
  const DOM=document;
  const WIN=window;
var nil = new class nil{
  constructor(){}
}
module.export=new module.package("JSE",class JSE{
  constructor(threadPath){
    window.JSEGLOBAL={threadPath:threadPath};

    this.fast_mode = typeof(Worker)!=='undefined';
    this.surface= nil;
    this.renderer = nil;
    this.events={};
    this.math=new (require("JSE.subpackage.math"))();
    this.draw_loop=()=>{
      WIN.requestAnimationFrame(this.draw_loop);
      this.__framedata__.frameCount++;
      this.events.draw=this.events.draw||[];
      this.events.draw.forEach(a=>a(this.__framedata__));
    }
    this.on('load',this.draw_loop);
    this.__framedata__={
      frameCount:0
    };
  }
  on(event,func){
    switch(event){
        case "load":
          WIN.addEventListener("load",func);
        break;
        default:
          this.events[event]=this.events[event]||[];
          this.events[event].push(func);
        break;
    }

  }
  createSurface(w,h,elem){
    var can = DOM.createElement("canvas");
    can.setAttribute("width",w+"px");
    can.setAttribute("height",h+"px");
    var render = require("JSE.subpackage.render");
    if(elem&&elem.appendChild){
      elem.appendChild(can);
    }else{
      DOM.body.appendChild(can);
    }
    this.surface=can;
    this.renderer=new render(this.surface);
    return this.renderer;
  }
});
})(module);

(function(module){
  module.export=new module.package("internal.JSEUTIL",class internal_JSEUTIL{
  constructor(){

  }
  clarify(a,b){
    var same=true;
    if(a.length!=b.length)throw new Error("clarify takes 2 equil length arrays as inputs");
    a.forEach((a,c)=>{if(typeof a !=b[c])same=false;});
    return same;
  }
});
})(module);

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

(function(module){
  module.export=new module.package("JSE.subpackage.thread",class jse_subpackage_thread{
  constructor(file,callback){
    this.callback=callback||function(){}
    this.fp = JSEGLOBAL.threadPath+file;
    this.worker=new Worker(this.fp);
    this.worker.onmessage=(message)=>{
      this.callback(message.data)
    };
    this.worker.onerror=(error)=>{
      throw error;
    }
  }
  post(message){
    this.worker.postMessage(message);
  }
  terminate(){
    this.worker.terminate();
  }
});
})(module);

(function(module){
  const DOM=document;
  const WIN=window;
  module.export=new module.package("jse.subpackage.image",class JSE_subpackage_Image{
  constructor(src){
    this.element=DOM.createElement("image");
    this.element.src=src||"";
  }
});
})(module);

(function(module){
  const util = new (require("internal.JSEUTIL"))();
  class Vector2{
    constructor(x,y){
      if(util.clarify([x,y],["number","number"]))return null;
      this.x=x;
      this.y=y;
    }
  }
  class Vector3{
    constructor(){
      if(util.clarify([x,y,z],["number","number","number"]))return null;
      this.x=x;
      this.y=y;
      this.z=z;
    }
  }
  module.exports=new module.package("JSE.subpackage.math",class jse_subpackage_math{
  constructor(){
      this.psrand_seed=Date.now();
  }
  setRandSeed(seed){
    this.psrand_seed=seed;
  }
  get Vector2(){
    return Vector2;
  }
  get Vector3(){
    return Vector3;
  }
});
})(module);
