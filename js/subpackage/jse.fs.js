(function(module){
  function get(filePath,fs_LoadMethod){
    return fetch(filePath).then(
      (data)=>{
        return data.blob();
      }
    ).then(
      (data)=>{
        var reader = new FileReader();
        reader[fs_LoadMethod](data);
        return new Promise((resolve,reject)=>{
          reader.onload=()=>{
            resolve(reader.result);
          }
        });
      }
    );
  }
  function download(filename, text,useEncoding) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  function save(filename,text){
    download(filename,text);
  }
  function resolve(data){
    return data.d.a.r.e;
  }
  const fs_method = {
        buffer:"readAsArrayBuffer",
        binary:"readAsBinaryString",
        data:"readAsDataURL",
        text:"readAsText"
  };
  const encoder = new (require("jse.subpackage.encoder"))();
  module.export = new module.package("jse.fs",class jse_fs{
    constructor(){
      //Object.freeze(this.fs_method,this.fs_method.buffer,this.fs_method.binary,this.fs_method.data,this.fs_method.text);
    }
    get load(){
      return get;
    }
    get fs_method(){
      return fs_method;
    }
    set fs_method(d){
      throw new Error("fs.fs_method cannot be overwritten");
    }
    read(file,fs_method,useEncoding){
      console.log(file);
      var block = file.blob();
      var reader = new FileReader();
      reader[fs_LoadMethod](data);
      return new Promise((resolve,reject)=>{
        reader.onload=()=>{
          var res = reader.result;
          if(useEncoding){
            res = encoder.decode(res);
          }
          resolve(res);
        }
      });
    }
    promptLoad(accept="*",useEncoding){
      var el = document.createElement("input");
      el.setAttribute("type","file");
      el.setAttribute("accept",accept);
      el.setAttribute("style","opacity:0");
      document.body.appendChild(el);
      el.click();
      var file = el.files;
      return new Promise((resolve,reject)=>{
        el.onchange=()=>{
          var file = el.files[0];
          let fr = new FileReader();
          fr.onloadend=(p)=>{
            if(p.loaded===p.total&&fr.DONE===2){
              resolve(fr.result);
              document.body.removeChild(el);
            }
          };
          if(useEncoding){
            text=encoder.decode(text);
          }
        fr.readAsText(file);
        };
      });
    }
    loadJSON(fn){
      return this.load(fn,this.fs_method.text).then(a=>JSON.parse(a));
    }
    get save(){
      return save;
    }
  })
})(module)
