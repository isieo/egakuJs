function Egaku(canvasId) {
	this.canvasElement = document.getElementById(canvasId)
	this.canvasCx = this.canvasElement.getContext('2d');
	this.imageList = Array();
	this.width = this.canvasElement.width;
	this.height = this.canvasElement.height;
	this.tempCanvas = document.createElement('CANVAS');
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
	renderImage:function(element,dx,dy,dWidth,dHeight,degree,preserveAspecRatio){
		
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
			tmpCanvas = this.tempCanvas;
			tmpCanvasContext = tmpCanvas.getContext('2d');
			tmpCanvasContext.save();
			tmpCanvas.height = tmpCanvas.width = Math.sqrt(Math.pow(element.width,2) + Math.pow(element.height,2));
			canvasCenter = tmpCanvas.height/2;
			tmpCanvasContext.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
			widthBuffer = tmpCanvas.width/2 -  element.width/2;
			heightBuffer = tmpCanvas.height/2 -  element.height/2;
			tmpCanvasContext.translate(element.width /2 + widthBuffer ,element.height /2 + heightBuffer);
			tmpCanvasContext.rotate(degree * Math.PI / 180);
			tmpCanvasContext.translate(-(element.width /2 ),-(element.height /2 ));
			tmpCanvasContext.drawImage(element,0,0);

			if (preserveAspecRatio){
				if (dWidth>dHeight){
					dy -= dWidth - dHeight;
					dHeight = dWidth;
				}else if (dHeight>dWidth){
					dx -= dHeight - dWidth;
					dWidth = dHeight;
				}
			}
			element = tmpCanvas;
			this.canvasCx.drawImage(element,dx, dy, dWidth, dHeight);
			tmpCanvasContext.restore();
			return;
		}
		this.canvasCx.drawImage(element,dx, dy, dWidth, dHeight);

	},
	imageElement:function(imageName){
		return this.imageList[imageName];
	},
	
}
