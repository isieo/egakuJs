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
	line:function(width,x1,y1,x2,y2){
		canvasCx = this.canvasCx;
		canvasCx.lineWidth = width;
		canvasCx.beginPath();
		canvasCx.moveTo(x1,y1);
		canvasCx.lineTo(x2,y2);
		canvasCx.stroke();
		canvasCx.closePath();
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
				if (typeof callback == 'function'){
					callback();
				}
			});
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
	renderImage:function(element,dx,dy,dWidth,dHeight){
		if (typeof element == 'string'){
			element = this.imageList[element];
			
		}
		if (!dHeight){
			dHeight = element.height
		}
		if (!dWidth){
			dWidth = element.width
		}
		this.canvasCx.drawImage(element,dx, dy, dWidth, dHeight);
	},
	imageElement:function(imageName){
		return this.imageList[imageName];
	},
	
}