const fs = require("fs");
var content = "";





var files_to_read = [];
var files_read = [];
var inter,lines,build_files;
fs.readFile("build",function(err,data){
  //files_to_read=data.split("\n");
  lines = data.toString().split("\r\n");
  build_files = data.toString().split("\r\n");
  setTimeout(final_build,lines.length*110);
  lines.pop();
  console.log(lines);
  console.log(build_files);
  console.log(process.argv[2]==="mini");
  inter = setInterval(function(){
    if(lines.length===0)return;
    fs.readFile(lines[0],(err,data)=>{
      console.log(JSON.stringify({fn:build_files.indexOf(lines[0]),txt:lines[0]}));
      if(process.argv[2]==="mini"){
        files_to_read.push({fn:build_files.indexOf(lines[0]),txt:data.toString()});
      }else{
        files_to_read.push({fn:build_files.indexOf(lines[0]),txt:data.toString()});
      }
    });
    console.log("reading file "+lines.shift());
  },100);
});
function final_build(){
  console.log(files_to_read);
  var final = [];
  files_to_read.sort((a,b)=>{return a.fn>b.fn}).forEach((a)=>{final.push(a.txt);console.log((a.fn))});
  final.push(final.shift());
  fs.appendFile(process.argv[3]||"build_JSE_"+Date.now()+".js",final.join('\r\n'),function(err){
    throw err;
  });
  console.log("done!");
}
