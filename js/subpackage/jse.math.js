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
