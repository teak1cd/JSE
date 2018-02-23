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
