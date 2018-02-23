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
