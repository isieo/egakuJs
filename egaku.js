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
			tmpCanvas = document.createElement('CANVAS');
			tmpCanvasContext = tmpCanvas.getContext('2d');
			if (dWidth > dHeight){
				tmpCanvas.width = dWidth*2;
				tmpCanvas.height = dWidth*2;
			}else{
				tmpCanvas.height = dHeight*2;
				tmpCanvas.width = dHeight*2;
			}
			//tmpCanvas.width = dWidth*2;
			//tmpCanvas.height = dHeight*2;
			tmpCanvasContext.translate(tmpCanvas.width/2,tmpCanvas.height/2);

			tmpCanvasContext.rotate(degree * Math.PI / 180);
			tmpCanvasContext.drawImage(element,-(dWidth/2), -(dHeight/2), dWidth, dHeight);
			dx = dx - dWidth/2;
			dy = dy - dHeight/2;
			dWidth = dWidth*2;
			dHeight = dHeight*2;
			element = tmpCanvas
		}
		this.canvasCx.drawImage(element,dx, dy, dWidth, dHeight);
	},
	imageElement:function(imageName){
		return this.imageList[imageName];
	},
	
}