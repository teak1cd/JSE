(function(module){
  const DOM=document;
  const WIN=window;
  module.export=new module.package("jse.subpackage.image",class JSE_subpackage_Image{
  constructor(src){
    this.elementImg=DOM.createElement("image");
    this.elementImg.src=src||"";
    this.elementCanvas=DOM.createElement("canvas");
    this.elementCanvas
  }
});
})(module);
