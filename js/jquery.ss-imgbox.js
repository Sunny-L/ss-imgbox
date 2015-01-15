;(function($){
	$.fn.extend({
		ssImgBox:function(options){
			var options = $.extend({
				t_width:40, //缩略图宽高
				//o_width:300px,  	//原始图宽度
				//o_height:400px,  	//原始图高度
				o_width_max:690,	//原始图最大宽度
				imageArray: new Array,
				isOpen:false,
				activeImage: null
			},options);

			var self = this;

			function init(){
				var imgBox = '<div style="clear:both;"></div><div class="ss-display"><div class="ss-options"><span class="ss-close">收起</span><a target="_blank" class="ss-o-img">原图</a><span class="ss-sinistrogyration">向左转</span><span class="ss-dextrorotation">向右转</span></span></div><div class="ss-prev"><i></i></div><div class="ss-next"><i></i></div><img/></div>';
				self.append(imgBox);
				showImg();
			}

			function showImg(){
				var thumbnail = self.find(".ss-thumbnail"); //缩略图
				var display = self.find('.ss-display');		//大图
				var img = new Image();
				thumbnail.each(function(){
					options.imageArray.push($(this).find('img').attr('src'));
				});
				self.find('.ss-close').click(function(){
					display.slideUp();
					self.find('.ss-thumbnail').removeClass('ss-thumbnail-current');
					options.isOpen = false;
				});

				thumbnail.click(function(){
					var oSrc =  $(this).find('img').attr('src');
					loadImg(display,oSrc,this);
				});
				loadNeighborImages(display,thumbnail);
			}

			function loadImg(display,oSrc,thumbnail){
				var imgPre = new Image();
				self.find('.ss-thumbnail').removeClass('ss-thumbnail-current');
				$(thumbnail).addClass('ss-thumbnail-current');
				imgPre.onload = function(){
					var newWidth = imgPre.width;
					var newHeight = imgPre.height;
					display.find('img').attr('src',oSrc);
					if(!options.isOpen){
						options.isOpen = true;
						display.show(500);
						display.width(newWidth).height(newHeight+self.find('.ss-options').outerHeight());
						console.log('123:'+self.find('.ss-options').outerHeight(true));
					}else if(options.isOpen && oSrc==options.activeImage){
						$(thumbnail).removeClass('ss-thumbnail-current');
						display.hide(500);
						options.isOpen = false;
					}
					options.activeImage = oSrc;
					if(options.activeImage==options.imageArray[0]){
						display.find('.ss-prev').css('display','none');
					}else{
						display.find('.ss-prev').css('display','block');
					}
					if(options.activeImage==options.imageArray[options.imageArray.length-1]){
						display.find('.ss-next').css('display','none');
					}else{
						display.find('.ss-next').css('display','block');
					}
				}
				imgPre.src = oSrc;
				display.find('a').attr('href',oSrc);
			}

			function loadNeighborImages(display,thumbnail){
				var prevImg,nextImg;
				self.find('.ss-prev').click(function(){
					var activeImgIndex = options.imageArray.indexOf(options.activeImage);
					var oSrc = options.imageArray[activeImgIndex-1];
					loadImg(display,oSrc,$(thumbnail[activeImgIndex-1]));
				});
				self.find('.ss-next').click(function(){
					var activeImgIndex = options.imageArray.indexOf(options.activeImage);
					var oSrc = options.imageArray[activeImgIndex+1];
					loadImg(display,oSrc,$(thumbnail[activeImgIndex+1]));
				});
			}

			init();
			return this;
		}
	});
})(jQuery);