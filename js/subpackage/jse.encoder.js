
(function(module){
    module.export=new module.package("JSE.subpackage.encoder",class jse_subpackage_encoder{
    constructor(radux){
        this.redux=radux||7;
    }
    encode(fileContent){
        var chars = fileContent.split('');
        var vals = [];
        chars.forEach((a)=>{
          vals.push(Math.pow(a.charCodeAt(0),this.redux));
        });
        var out="";
        vals.forEach((a,b)=>{
            a+=b;
            console.log(a);
          var b16=a.toString(16);
          var len=b16.length.toString(16);
          if(len.length===1)len="0"+len;
          out+=len+b16;
        });
        return out;
      }
      decode(fileContent){
        function Grab(len){
          var r = fileContent.substring(0,len);
          fileContent=fileContent.substring(len,fileContent.length);
          return r;
        }
        var out = "";
        var char = 0;
        while(fileContent.length>0){
          var len = Grab(2);
          var content = Grab(parseInt(len,16));
          char++;
          var code = Math.round(Math.pow(parseInt(content,16)-char,1/this.redux));
          out+=String.fromCharCode(code);
        }
        return out;
      }
  });
})(module);
  

