var SHADER = "";
function RunShader(shader,img){
  var imageComp = [[]];
  img.data.forEach((a,b,c)=>{
    if(imageComp[imageComp.length-1].length===4)imageComp.push(new Array(0));
    imageComp[imageComp.length-1].push(a);
  });
  let completeImg=new Uint8Array(img.length);
  imageComp.forEach((a,b)=>{
    completeImg[b]=255-a[0];
    completeImg[b+1]=255-a[1];
    completeImg[b+2]=255-a[2];
    completeImg[b+3]=a[3];
  });
  postMessage(completeImg);
  //console.table(imageComp);
}
onmessage=function(data){
  let dataRaw=data.data;
  //console.log(dataRaw[1].data);
  SHADER=new Function(dataRaw[0]);
  let imgData=dataRaw[1];
  RunShader(SHADER,imgData);
}
