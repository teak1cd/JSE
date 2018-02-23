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
