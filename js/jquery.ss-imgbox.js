;(function($){
	$.fn.extend({
		ssImgBox:function(options){
			var options = $.extend({
				t_width:40, //缩略图宽高
				//o_width:300px,  //原始图宽度
				//o_height:400px,  //原始图高度
				o_width_max:690	//原始图最大宽度
			},options);
			var self = this;
			self.append('<div style="clear:both;"></div>');
			self.append('<div class="ss-display"><div class="ss-options"><div><span>收起</span><sapn>原图</span><span>向左转</span><span>向右转</span></span></div><img style="display:none;"></div>');
			var thumbnail = self.find(".ss-thumbnail");
			thumbnail.click(function(){
				var oSrc =  $(this).find('img').attr('src');
				var thumbnailImg = self.find('.ss-display img').attr('src',oSrc);
				thumbnailImg.toggle("fast");
				thumbnailImg.click(function(){
					thumbnailImg.attr('src',thumbnail.next('div img').attr('src'));
				});
			});
			$('.ss-display').find("img").click(function(){
				var thumbnailImg = $(this).attr('src',thumbnail.next('img').attr('src'));
				$(this).attr('src',thumbnailImg);
			});
			return this;
		}
	});
})(jQuery);