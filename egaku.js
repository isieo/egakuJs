function Egaku(canvasId) {
	this.canvasElement = document.getElementById(canvasId)
	this.canvasCx = this.canvasElement.getContext('2d');
	this.imageList = Array();
	this.width = this.canvasElement.width;
	this.height = this.canvasElement.height;
}
Egaku.prototype = {
	init:function(){
	},
	rectangle:function(x,y,width,height,color){
		this.canvasCx.fillStyle = color;
		this.canvasCx.fillRect(x, y, width, height);
		
	},
	clearRectangle:function(x,y,width,height,color){
		this.canvasCx.clearRect(x, y, width, height);
		
	},
	clear:function(){
		this.canvasCx.clearRect(0, 0, this.width, this.height);
	},
	line:function(width,x1,y1,x2,y2){
		canvasCx = this.canvasCx;
		canvasCx.lineWidth = width;
		canvasCx.beginPath();
		canvasCx.moveTo(x1,y1);
		canvasCx.lineTo(x2,y2);
		canvasCx.stroke();
		canvasCx.closePath();
	},
	preloadImages:function(imageList,callback){
		egakuHandle = this;
		egakuHandle.preloadImageFromUrl(imageList.pop(),function(){
			if (imageList.length < 1){
				callback();
			}else{
				egakuHandle.preloadImages(imageList,callback);
			}
		});
	},
	preloadImageFromUrl:function(imageUrl,callback){
		if (typeof imageUrl == 'object'){
			for (var keyName in imageUrl) break;
			imageName = keyName;
			imageUrl = imageUrl[keyName];
		}else{
			imageName = imageUrl;
		}
		imageList = this.imageList;
		if (imageList[imageName] == undefined){
			imageList[imageName] = new Image();
			imageList[imageName].src = imageUrl;
			imageList[imageName].addEventListener('load',function(){
				imageList[imageName].width = this.width;
				imageList[imageName].height = this.height;
				if (typeof callback == 'function'){
					callback();
				}
			},false);
		}else{
			if (typeof callback == 'function'){
				callback();
			}
		}
		return imageList[imageUrl];
	},
	renderImageFromUrl:function(imageUrl,dx,dy,dWidth,dHeight){
		imageList = this.imageList;
		canvasCx = this.canvasCx;
		renderImage = this.renderImage;
		this.preloadImageFromUrl(imageUrl,function(){
			renderImage(imageList[this.imageName],dx, dy, dWidth, dHeight);
		})
	},
	renderImage:function(element,dx,dy,dWidth,dHeight,degree){
		
		if (typeof element == 'string'){
			element = this.imageList[element];
		}
		if (!dHeight){
			dHeight = element.height
		}
		if (!dWidth){
			dWidth = element.width
		}
		if (degree){
			if (typeof this.tmpRotateCanvas == 'undefined'){
				this.tmpRotateCanvas = document.createElement('CANVAS');
			}
			tmpRotateCanvas = this.tmpRotateCanvas;
			tmpRotateCanvasContext = tmpRotateCanvas.getContext('2d');
			tmpRotateCanvasContext.save();
			if (element.canvasDimension == undefined
			    && element.canvasCenter == undefined
			    && element.canvasCenter == undefined
			    
			    ){
			  element.canvasDimension = tmpRotateCanvas.height = tmpRotateCanvas.width = sqrooter((element.width*element.width) + (element.height*element.height));
			  element.canvasCenter = canvasCenter = tmpRotateCanvas.height/2;
			}else{
			  tmpRotateCanvas.height = tmpRotateCanvas.width = element.canvasDimension;
			  canvasCenter = element.canvasCenter
			}
			tmpRotateCanvasContext.clearRect(0, 0, tmpRotateCanvas.width, tmpRotateCanvas.height);
			widthBuffer = tmpRotateCanvas.width/2 -  element.width/2;
			heightBuffer = tmpRotateCanvas.height/2 -  element.height/2;
			tmpRotateCanvasContext.translate(element.width /2 + widthBuffer ,element.height /2 + heightBuffer);
			tmpRotateCanvasContext.rotate(degree * (22/7)/ 180);
			tmpRotateCanvasContext.translate(-(element.width /2 ),-(element.height /2 ));
			tmpRotateCanvasContext.drawImage(element,0,0);

			pSize = sqrooter((dWidth*dWidth) + (dHeight*dHeight));
			dx -= (pSize - dWidth)/2;		
			dy -= (pSize - dHeight)/2;
			
			
			dWidth = dHeight = pSize;
			this.canvasCx.drawImage(tmpRotateCanvas,rounder(dx), rounder(dy), dWidth, dHeight);
			tmpRotateCanvasContext.restore();
			return;
		}
		this.canvasCx.drawImage(element,rounder(dx), rounder(dy), dWidth, dHeight);

	},
	imageElement:function(imageName){
		return this.imageList[imageName];
	},
	
}

function EgakuSprite(image,data){
	;
}

EgakuSprite.prototype = {
	next:function(){
	
	},
	previous:function(){
	
	},
	seek:function($number){
	
	},
	play:function(timeout){
	
	},
}


function rounder(n){
return (n + (n > 0 ? .5 : -.5)) << 0;
}


function sqrooter(m){
  return  Math.sqrt(m);
  var i=0;
  var x1;
  var x2;
  while( (i*i) <= m ) {
    i = i + 0.1;
  }
  x1 = i;
  for(j=0;j<10;j++){
      x2=m;
      x2/=x1;
      x2+=x1;
      x2/=2;
      x1=x2;
   }
   return x2;
}
