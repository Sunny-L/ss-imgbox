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
				var imgBox = '<div style="clear:both;"></div><div class="ss-display" style="display:none;"><div class="ss-options"><div><span class="close">收起</span><sapn>原图</span><span>向左转</span><span>向右转</span></span></div><div class="ss-prev"><i></i></div><div class="ss-next"><i></i></div><img></div>';
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
				self.find('.close').click(function(){
					display.slideUp();
				});
				thumbnail.click(function(){
					$(this).addClass('ss-thumbnail-current');
					var oSrc =  $(this).find('img').attr('src');
					var displayImg = self.find('.ss-display img').attr('src',oSrc);
					if(!options.isOpen){
						display.slideDown();
						options.isOpen = true;
					}else if(options.isOpen && oSrc==options.activeImage){
						$(this).removeClass('ss-thumbnail-current');
						display.slideUp();
						options.isOpen = false;
					}
					options.activeImage = oSrc;
					/*console.log('activeImage:'+options.activeImage);
					console.log('oSrc:'+oSrc);*/
					//thumbnailImg.toggle("fast");
				});
				updateDetail();
			}

			function updateDetail(){
				var display = self.find('.ss-display');		//大图

			}

			init();
			return this;
		}
	});
})(jQuery);