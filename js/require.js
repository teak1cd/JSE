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
