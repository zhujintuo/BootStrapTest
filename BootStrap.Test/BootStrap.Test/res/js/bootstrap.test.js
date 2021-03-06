/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
 
if (typeof jQuery==='undefined'){
    throw new Error('Bootstrap\'s JavaScript requires jQuery');
}
 
+function($){
    'use strict';
	 
    var version=$.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);
 
/* ========================================================================
* Bootstrap: transition.js v3.3.5
* http://getbootstrap.com/javascript/#transitions
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    function transitionEnd(){
        var el=document.createElement('bootstrap');
		 
        var transEndEventNames={
            WebkitTransition:'WebkitTransitionEnd',
            MozTransition:'transitionend',
            OTransition:'oTransitionEnd otransitionend',
            transition:'transitionend'
        }
		 
        for (var name in transEndEventNames){
            if(el.style[name]!==undefined){
                return {end:transEndEventNames[name]};
            }
        }
		 
        return flase;
    }
	 
    $.fn.emulateTransitionEnd=function(duration){
        var called=false; // transitionend 事件是否已触发标识
        var $el=this;
        $(this).one('bsTransitionEnd',function(){called=true;}); // 表示已触发
        var callback=function(){
            if(!called){
                $($el).trigger($.support.transition.end); // 未触发，强制其触发
            }  
        }
        setTimeout(callback,duration);
        return this;
    }
	 
    $(function(){
        $.support.transition=transitionEnd();
		 
        if(!$.support.transition) return;
        $.event.special.bsTransitionEnd={
            bindType:$.support.transition.end,
            delegateType:$.support.transition.end,
            handle:function(e){
                if($(e.target).is(this)){
                    return e.handleObj.handler.apply(this,arguments);
                }
            }
        };
    })
}(jQuery);
 
/* ========================================================================
* Bootstrap: alert.js v3.3.5
* http://getbootstrap.com/javascript/#alerts
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    'use strict';
	 
    var dismiss='[data-dismiss="alert"]';
    var Alert=function(el){
        $(el).on('click',dismiss,this.close);
    };
	 
    Alert.VERSION='3.3.5';
	 
    Alert.TRANSITION_DURATION=150;
	 
    Alert.prototype.close=function(e){
        var $this=$(this);
        var selector=$this.attr('data-target');
		 
        if(!selector){
            selector=$this.attr('href');
            selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'');
        }
		 
        var $parent=$(selector);
        if(e){
            e.preventDefault();
        }
		 
        if(!$parent.length){
            $parent=$this.closed('.alert');
        }
		 
        $parent.trigger(e=$.Event('close.bs.alert'));
		 
        if(e.isDefaultPrevented()) return;
		 
        $parent.removeClass('in');
		 
        function removeElement(){
            $parent.detach().trigger('closed.bs.alert').remove();
        }
		 
        $.support.transition&&$parent.hasClass('fade')?
           $parent
               .one('bsTransitionEnd',removeElement)
               .emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement();
    }
	 
    function Plugin(option){
        return this.each(function(){
            var $this=$(this);
            var data=$this.data('bs.alert');
			 
            if(!data) $this.data('bs.alert',(data=new Alert(this)));
            if(typeof option=='string') data[option].call($this);
        });
    }
	 
    var old=$.fn.alert;
    $.fn.alert=Plugin;
    $.fn.alert.Constructor=Alert;
	 
    $.fn.alert.noConflict=function(){
        $.fn.alert=old;
        return this;
    }
	 
    $(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close);
}(jQuery);
 
/* ========================================================================
* Bootstrap: button.js v3.3.5
* http://getbootstrap.com/javascript/#buttons
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    'use strict';
    var Button=function(element,options){
        this.$element=$(element);
        this.options=$.extend({},Button.DEFAULTS,options); 
    }
	 
    Button.VERSION  = '3.3.5';
    Button.DEFAULTS={
        loadingText:'loading...';
}
	 
Button.prototype.setState=function(state){
    var d='disabled';
    var $el=this.$element;
    var val=$el.is('input')?'val':'html';
    var data=$el.data();
		 
    state+='Text';
		 
    if(data.resetText==null)
        $el.data('resetText',$el[val]());
		 
    setTimeout($.proxy(function(){
        $el[val](data[state]==null?this.options[state]:data[state]);
        if(state=='loadingText'){
            this.isLoading=true;
            $el.addClass(d).attr(d,d);
        }else if(this.isLoading){
            this.isLoading=false;
            $el.removeClass(d).removeAttr(d);
        }
    },this),0);
}
	 
Button.prototype.toggle=function(){
    var changed=true;
    var $parent=this.$element.closed('[data-toggle="buttons"]');
    if($parent.length){
        var $input=this.$element.find('input');
        if($input.prop('type')=='radio'){
            if($input.prop('checked')) changed=false;
            $parent.find('.active').removeClass('active');
            this.$element.addClass('active');
        }else if ($input.prop('type')=='checkbox'){
            if (($input.prop('checked')) !== this.$element.hasClass('active'))
                this.element.toggleClass('active');
        }
			 
        $input.prop('checked',this.$element.hasClass('active'));
        if(changed) $input.trigger('change');
    }else{
        this.$element.attr('aria-pressed',!this.$element.hasClass('active'));
        this.$element.toggleClass('active');
    }
}
	 
function Plugin(option){
    return this.each(function(){
        var $this=$(this);
        var data=$this.data('bs.button');
        var options=typeof option=='object'&&option;
        if(!data) $this.data('bs.button',(data=new Button(this,options)));
			 
        if(option=='toggle') data.toggle();
        else if(option) data.setState(option);
    });
}
	 
var old=$.fn.button;
$.fn.button=Plugin;
$.fn.button.Constructor=Button;
	 
$.fn.button.noConflict=function(){
    $.fn.button=old;
    return this;
}
	 
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){
    var $btn=$(e.target);
    if(!$btn.hasClass('btn')) $btn=$btn.closest('.btn');
    Plugin.call($btn,'toggle');
    if(!($(e.target).is('input[type="radio"]')||$(e.target).is('input[type="checkbox"]'))) 
        e.preventDefault();
}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]', function(e){
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
})
}(jQuery);
 
/* ========================================================================
* Bootstrap: carousel.js v3.3.5
* http://getbootstrap.com/javascript/#carousel
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    'use strict';
	 
    var Carousel=function(element,options){
        this.$element=$(element);
        this.$indicators=this.$element.find('.carousel-indicators');
        this.options=options;
        this.paused=null;
        this.sliding=null;
        this.interval=null;
        this.$active=null;
        this.$items=null;
		 
        this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this));
		 
        this.options.pause=='hover'&&!('ontouchstart') in document.documentElement)&&this.$element
           .on('mouseenter.bs.carousel',$.proxy(this.pause,this))
           .on('mouseleave.bs.carousel',$.proxy(this.pause,this));
    }
	 
    Carousel.VERSION  = '3.3.5';

    Carousel.TRANSITION_DURATION = 600;
	 
    Carousel.DEFAULTS={
        interval:5000,
        pause:'hover',
        wrap:true,
        keyboard:true
    }
	 
    Carousel.prototype.keydown=function(e){
        if(/input|textarea/i.test(e.target.tagName)) return;
        switch(e.which){
            case 37:this.prev();break;
            case 39:this.next();break;
            default:return;
        }
		 
        e.preventDefault();
    }
	 
    Carousel.prototype.cycle=function(e){
        e||(this.paused=false);// 标记状态
        this.interval&&clearInterval(this.interval);
        this.options.interval&&!this.paused
           &&(this.interval=setInterval($.proxy(this.next,this),this.options.interval));
        return this;
    }
	 
    Carousel.prototype.getItemIndex=function(item){
        this.$items=item.parent().children('.item');
        return this.$item.index(item||this.$active);
    }
	 
    Carousel.prototype.getItemForDirection=function(direction,active){
        var activeIndex=this.getItemIndex(active);
        var willWrap=(direction=='prev'&&activeIndex===0)
           || (direction=='next'&&activeIndex==(this.$items.length-1));
		 
        if(willWrap&&!this.options.wrap) 
            return active;
        var delta=direction=='prev'?-1:1;
        var itemIndex=(activeIndex+delta)%this.$item.length;
        return this.$items.eq(itemIndex);
    }
	 
    Carousel.prototype.to=function(pos){
        var that=this;
        var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'));
		 
        if(pos>(this.$items.length-1)||pos<0) return;
		 
        if(this.sliding)
            return this.$element.one('slid.bs.carousel',function(){that.to(pos)});
        if(activeIndex==pos) return this.pause().cycle();
        return this.slide(pos>activeIndex?'next':'prev',this.$item.eq(pos));
    }
	 
    Carousel.prototype.pause=function(e){
        e||(this.paused=true);
		 
        if(this.$element.find('.next,.prev').length&&$.support.transition){
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
		 
        this.interval=clearInterval(this.interval);
        return this;
    }
	 
    Carousel.prototype.next=function(){
        if(this.sliding) return;
        return this.slide('next');
    }
	 
    Carousel.prototype.prev=function(){
        if(this.sliding) return;
        return this.slide('prev');
    }
	 
    Carousel.prototype.slide=function(type,next){
        var $active=this.$element.find('.item.active');
        var $next=next||this.getItemForDirection(type,$active);
        var isCycling=this.interval;
        var direction=type=='next'?'left':'right';
        var that=this;
		 
        if($next.hasClass('active')) 
            return (this.sliding=false);
		 
        var relatedTarget=$next[0];
        var slideEvent=$.Event('slide.bs.carousel',{
            relatedTarget:relatedTarget,
            direction:direction
        });
		 
        this.$element.trigger(slideEvent); 
        if(slideEvent.isDefaultPrevented()) return;
		 
        this.sliding=true; 
        isCycling&&this.pause();
		 
        if(this.$indicators.length){
            this.$indicators.find('.active').removeClass('active');
            var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)]);
            $nextIndicator&&$nextIndicator.addClass('active');
        }
		 
        var slidEvent=$.Event('slid.bs.carousel',{relatedTarget: relatedTarget, direction: direction });
        if($.support.transition&&this.$element.hasClass('slide')){
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            $active.one('bsTransitionEnd',function(){
                $next.removeClass([type,direction].join(' ')).addClass('active');
                $active.removeClass(['active',direction].join(' '));
                that.sliding=false;
                setTimeout(function(){
                    that.$element.trigger(slideEvent);
                },0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
        }else{
            $active.removeClass('active');
            $next.addClass('active');
            this.sliding=false;
            this.$element.trigger(slideEvent);
        }
		 
        isCycling&&this.cycle();
        return this;
    }
	 
    function Plugin(option){
        return this.each(function(){
            var $this=$(this);
            var data=$this.data('bs.carousel');
            var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option);
            var action =typeof option=='string'?option:option.slide;
			 
            if(!data) $this.data('bs.carousel',(data=new Carousel(this,options)));
            if(typeof option=='number') data.to(option);
            else if (action) data[action]();
            else if (options.interval) data.pause().cycle();
        });
    }
	 
    var old=$.fn.carousel;
    $.fn.carousel=Plugin;
    $.fn.carousel.Constructor=Carousel;
	 
    $.fn.carousel.noConflict=function(){
        $.fn.carousel=old;
        return this;
    }
	 
    var clickHandler=function(e){
        var href;
        var $this=$(this);
        var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''));
		 
        if(!$target.hasClass('carousel')) return;
        var options=$.extend({},$target.data(),$this.data());
        var slideIndex=$this.attr('data-slide-to');
        if(slideIndex) options.interval=false;
		 
        Plugin.call($target,options);
		 
        if(slideIndex){
            $target.data('bs.carousel').to(slideIndex);
        }
		 
        e.preventDefault();
    }
	 
    $(document)
       .on('click.bs.carousel.data-api','[data-slide]',clickHandler)
       .on('click.bs.carousel.data-api','[data-slide-to]',clickHandler);
		
    $(window).on('load',function(){
        $('[data-ride="carousel"]').each(function(){
            var $carousel=$(this);
            Plugin.call($carousel,$carousel.data());
        });
    });
	 
}(jQuery);
 
/* ========================================================================
* Bootstrap: collapse.js v3.3.5
* http://getbootstrap.com/javascript/#collapse
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    'use strict';
	 
    var Collapse=function(element,options){
        this.$element=$(element);
        this.options=$.extend({},Collapse.DEFAULTS,options);
        this.$target=$('[data-toggle="collapse"][href="#'+element.id+'"],'+
				       '[data-toggle="collapse"][data-target="#'+element.id+'"]');
        this.transitioning=null;
		
        if(this.options.parent){
            this.$parent=this.getParent();
        }else{
            this.addAriaAndCollapsedClass(this.$element,this.$trigger);
        }
		
        if(this.options.toggle) this.toggle();
    }
	 
    Collapse.VERSION  = '3.3.5';

    Collapse.TRANSITION_DURATION = 350;
	 
    Collapse.DEFAULTS={
        toggle:true;
}
	 
// 
Collapse.prototype.dimension=function(){
    var hasWidth=this.$element.hasClass('width');
    return hasWidth?'width':'height';
}
	 
Collapse.prototype.show=function(){
    if(this.transitioning||this.$element.hasClass('in')) return;
		 
    var activesData;
    var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing');
		 
    if(actives&&actives.length){
        activesData=actives.data('bs.collapse');
        if(activesData&&activesData.transitioning) return;
    }
		 
    var startEvent=$.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if(startEvent.isDefaultPrevented) return;
		 
    if(actives&&actives.length){
        Plugin.call(actives,'hide');
        activesData||actives.data('bs.collapse',null);
    }
		 
    var dimension=this.dismension();
		 
    this.$element
       .removeClass('collapse')
       .addClass('collapsing')[dimension](0)
       .attr('aria-expanded',true);
		 
    this.transitioning=1;
		 
    var complete=function(){
        this.$element
           .removeClass('collapsing')
           .addClass('collapse in')[dimension]('');
        this.transitioning=0;
        this.$element.trigger('shown.bs.collapse');
    }
		 
    if(!$.support.transition) return complete.call(this);
		 
    var scrollSize=$.camelCase(['scroll',dimension].join('-'));
		 
    this.$element.on('bsTransitionEnd',$.proxy(complete,this))
       .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]); 
}
	 
Collapse.prototype.hide=function(){
    if (this.transitioning || !this.$element.hasClass('in')) return;
		 
    var startEvent=$.Event('hide.bs.collapse');
    this.$element.trigger(startEvent); 
    if(startEvent.isDefaultPrevented()) return;
		 
    var dimension=this.dimension();
		 
    this.$element[dimension](this.$element[dismension]())[0].offsetHeight;
		 
    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false);
		 
    this.$trigger.addClass('collapsed').attr('aria-expanded',false);
		 
    this.transitioning = 1;
		 
    var complete=function(){
        this.transitioning=0;
        this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    }
		 
    if(!$.support.transition) return complete.call(this);
		 
    this.$element[dimension](0)
       .one('bsTransitionEnd',$.proxy(complete,this))
       .emulateTransitionEnd(Collapse.TRANSITION_DURATION); 
}
	 
Collapse.prototype.toggle=function(){
    this[this.$element.hasClass('in')?'hide':'show']();
}
	 
Collapse.prototype.getParent=function(){
    return $(this.options.parent)
       .find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]')
       .each($.proxy(function(i,element){
           var $element=$element;
           this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element);
       },this)).end();
}
	 
Collapse.prototype.addAriaAndCollapsedClass =function($element, $trigger){
    var isOpen=$element.hasClass('in');
		 
    $element.attr('aria-expanded',isOpen);
    $trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen);
}
	 
function getTargetFromTrigger($trigger) {
    var href;
    var target=$trigger.attr('data-target')|| (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
    return $(target); 
}
	 
function Plugin(option){
    return this.each(function(){
        var $this=$(this);
        var data=$this.data('bs.collapse');
        var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option);
			 
        if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
        if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)));
        if (typeof option == 'string') data[option]();
    });
}
	 
var old = $.fn.collapse;
$.fn.collapse             = Plugin;
$.fn.collapse.Constructor = Collapse;
	 
$.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
}
	 
$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this);
    if (!$this.attr('data-target')) 
        e.preventDefault();

    var $target = getTargetFromTrigger($this);
    var data    = $target.data('bs.collapse');
    var option  = data ? 'toggle' : $this.data();

    Plugin.call($target, option);
})
}(jQuery);
 
/* ========================================================================
* Bootstrap: dropdown.js v3.3.5
* http://getbootstrap.com/javascript/#dropdowns
* ========================================================================
* Copyright 2011-2015 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function($){
    'use strict';
	
    var backdrop='.dropdown-backdrop';
    var toggle='[data-toggle="dropdown"]';
    var Dropdown=function(element){
        $(element).on('click.bs.dropdown',this.toggle);
    }
	
    Dropdown.VERSION = '3.3.5';
	
    function getParent($this){
        var selector=$this.attr('data-target');
        if(!selector){
            selector=$this.attr('href');
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }
		
        var $parent=selector&&$(selector);
		
        return $parent && $parent.length?$parent:$this.parent();
    }
	
    function clearMenus(e){
        if(e&&e.which===3) return;
        $(backdrop).remove();
        $(toggle).each(function(){
            var $this=$(this);
            var $parent=getParent($this);
            var relatedTarget={relatedTarget:this};
            if(!$parent.hasClass('open')) return;
            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
			
            $parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget));
			
            if(e.isDefaultPrevented()) return;
			
            $this.attr('aria-expanded','false');
			
            $parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget);
        });
    }
	
    Dropdown.prototype.toggle=function(e){
        var $this=$(this);
        if($this.is('.disabled,:disabled')) return;
		
        var $parent=getParent($this);
        var isActive=$parent.hasClass('open');
		
        clearMenus();
		
        if(!isActive){
            if('ontouchstart' in document.documentElement&&!$parent.closest('.navbar-nav').length){
                $(document.createElement('div'))
					.addClass('dropdown-backdrop')
					.insertAfter($(this))
					.on('click',clearMenus);
            }
			
            var relatedTarget={relatedTarget:this};
            $parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget));
			
            if(e.isDefaultPrevented()) return;
			
            $this.trigger('focus').attr('aria-expanded','true');
            $parent.toggleClass('open').trigger('show.bs.dropdown',relatedTarget);
        }
		
        return false;
    }
	
    Dropdown.prototype.keydown=function(e){
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
		
        var $this=$(this);
		
        e.preventDefault();
        e.stopPropagation();
		
        if($this.is('.disabled,:disabled')) return;
		
        var $parent=getParent($this);
        var isActive=$parent.hasClass('open');
		
        if(!isActive&&e.which!=27||isActive&&e.which==27){
            if(e.which==27) $parent.find(toggle).trigger('focus');
            return $this.trigger('click');
        }
		
        var desc = ' li:not(.disabled):visible a';
        var $items=$parent.find('.dropdown-menu'+desc);
		
        if (!$items.length) return;
		
        var index=$items.index(e.target);
		
        if(e.which==38&&index>0) index--;
        if(e.which==40&&index<item.length-1) index++;
        if(!~index) index=0;
		
        $items.eq(index).trigger('focus');
    }
	
    function Plugin(option){
        return this.each(function(){
            var $this=$(this);
            var data=$this.data('bs.dropdown');
			
            if(!data) $this.data('bs.dropdown',(data=new Dropdown(this)));
            if(typeof option=='string') data[option].call($this);
        });
    }
	
    var old = $.fn.dropdown;

    $.fn.dropdown             = Plugin;
    $.fn.dropdown.Constructor = Dropdown;
	
    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this
    }
	
    $(document)
		.on('click.bs.dropdown.data-api',clearMenus)
		.on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()})
		.on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle)
		.on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown)
		.on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown);
		
}(jQuery);
 
 
/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){
    'use strict';
    
    var Modal=function(element,options){
        this.options=options;
        this.$body=$(document.body);
        this.$element=$(element);
        this.$dialog=this.$element.find('.modal-dialog');
        this.$backdrop=null;
        this.isShown=null;
        this.originalBodyPad=null;
        this.scrollbarWidth=0;
        this.ignoreBackdropClick=false;

        if(this.options.remote){
            this.$element
                .find('.modal-content')
                .load(tis.options.remote,$.proxy(function(){
                    this.$element.trigger('loaded.bs.modal');
                },this));
        }
    }

    Modal.VERSION='3.3.5';
    Modal.TRANSITION_DURATION=300;
    Modal.BACKDROP_TRANSITION_DURATION=150;

    Modal.DEFAULTS={
        backdrop:true,
        keyboard:true,
        show:true
    }

    Modal.prototype.toggle=function(_relatedTarget){
        return this.isShown?this.hide():this.show(_relatedTarget);
    }

    Modal.prototype.show=function(_relatedTarget){
        var that=this;
        var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget}); 
        this.$element.trigger(e);

        if(this.isShown||e.isDefaultPrevented()) return;
        this.isShown=true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');

        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this));
        this.$dialog.on('mousedown.dismiss.bs.modal',function(){
            that.$element.one('mouseup.dismiss.bs.modal',function(e){
                if($(e.target).is(that.$element))
                    that.ignoreBackdropClick=true;
            });
        });

        this.backdrop(function(){
            var transition=$.support.transition&&that.$element.hasClass('fade');
            if(!that.$element.parent().length){
                that.$element.appendTo(that.$body);
            }

            that.$element.show().scrollTop(); 
            that.adjustDialog(); 
            if(transition){
                that.$element[0].offsetWidth;
            }

            that.$element.addClass('in');
            that.enforceFocus();

            var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget});
            transition?that.$dialog
                .one('bsTransitionEnd',function(){
                    that.$element.trigger('focus').trigger(e);
                })
                .emulateTransitionEnd(Modal.TRANSITION_DURATION):
            that.$element.trigger('focus').trigger(e);

        });
    }

    Modal.prototype.hide=function(e){
        if(e) e.preventDefault();

        e=$.Event('hide.bs.modal');
        this.$element.trigger(e);
        if(!this.isShown||e.isDefaultPrevented()) return;
        this.isShown=false;
        this.escape();
        this.resize();
        $(document).off('focusin.bs.modal');
        this.$element
            .removeClass('in')
            .off('click.dismiss.bs.modal')
            .off('mouseup.dismiss.bs.modal');

        this.$dialog.off('mousedown.dismiss.bs.modal');
        $.support.transition&&this.$element.hasClass('fade')?
            tis.$element
                .one('bsTransitionEnd',$.proxy(this.hideModal,this))
                .emulateTransitionEnd(Modal.TRANSITION_DURATION);
        this.hideModal();
    }

    Modal.prototype.enforceFocus=function(){
        $(document)
            .off('focusin.bs.modal')
            .on('focusin.bs.modal',$.proxy(function(e){
                if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){
                    this.$element.trigger('focus');
                }
            },this))
    }

    Modal.prototype.escape=function(){
        if(this.isShown&&this.options.keyboard){
            this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){
                e.which==27&&this.hide();
            },this))
        }else if(!this.isShown){
            this.$element.off('keydown.dismiss.bs.modal');
        }
    }

    Modal.prototype.resize=function(){
        if(this.isShown){
            $(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this));
        }else{
            $(window).off('resize.bs.modal');
        }
    }

    Modal.prototype.hideModal=function(){
        var that=this;
        this.$element.hide();
        this.backdrop(function(){
            that.$body.removeClass('modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hideen.bs.modal');
        });
    }

    Modal.prototype.removeBackdrop=function(){
        this.$backdrop&&this.$backdrop.remove();
        this.$backdrop=null;
    }

    Modal.prototype.backdrop=function(callback){
        var that=this;
        var animate=this.$element.hasClass('fade')?'fade':'';

        if(this.isShown&&this.options.backdrop){
            var doAnimate=$.support.transition&&animate;

            this.$backdrop=$(document.createElement('div'))
                .addClass('modal-backdrop '+animate)
                .appendTo(this.$body);

            this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){
                if(this.ignoreBackdropClick){
                    this.ignoreBackdropClick=false;
                    return;
                }

                if(e.target!==e.currentTarget) return;
                this.options.backdrop=='static'?this.$element[0].focus():this.hide();
            },this));

            if(doAnimate) this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass('in');
            if(!callback) return;
            doAnimate?this.$backdrop.one('bsTransitionEnd',callback)
                .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback();
        }else if(!this.isShown&&this.$backdrop){
            this.$backdrop.removeClass('in');

            var callbackRemove=function(){
                that.removeBackdrop();
                callback&&callback();
            }

            $.support.transition&&this.$element.hasClass('fade')?
                this.$backdrop
                    .one('bsTransitionEnd',callbackRemove)
                    .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove();
        }else if(callback){
            callback();
        }
    }

    Modal.prototype.handleUpdate=function(){
        this.adjustDialog();
    }

    Modal.prototype.adjustDialog=function(){
        var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    }

    Modal.prototype.resetAdjustments=function(){
        this.$element.css({
            paddingLeft:'',
            paddingRight:''
        });
    }

    Modal.prototype.checkScrollbar=function(){
        var fullWindowWidth=window.innerWidth;
        if(!fullWindowWidth){
            var documentElementRect=document.documentElement.getBoundingClientRect();
            fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left);
        }

        this.bodyIsOverflowing=document.body.clientHeight<fullWindowWidth;
        this.scrollbarWidth=this.measureScrollbar();
    }

    Modal.prototype.setScrollbar=function(){
        var bodyPad=parseInt((this.$body.css('padding-right')||0),10);
        this.originalBodyPad=document.body.style.paddingRight||'';
        if(this.bodyIsOverflowing) this.$body.css('padding-right',bodyPad+this.scrollbarWidth);
    }

    Modal.prototype.resetScrollbar=function(){
        this.$body.css('padding-right',this.originalBodyPad);
    }

    Modal.prototype.measureScrollbar=function(){
        var scrollDiv=document.createElement('div');
        scrollDiv.className='modal-scrollbar-measure';
        this.$body.append(scrollDiv);

        var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    }

    function Plugin(option,_relatedTarget){
        return this.each(function(){
            var $this=$(this);
            var data=$this.data('bs.modal');
            var options =$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option);

            if(!data) $this.data('bs.modal',(data=new Modal(this,options)));
            if(typeof option=='string') data[option](_relatedTarget);
            else if(options.show) data.show(_relatedTarget);
        });
    }

    var old=$.fn.modal;
    $.fn.modal=Plugin;
    $.fn.modal.Constructor=Modal;

    $.fn.modal.noConflict=function(){
        $.fn.modal=old;
        return this;
    }

    $(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){
        var $this=$(this);
        var href=$this.attr('href');
        var $targer=$($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if($this.is('a')) e.preventDefault();
        $targer.one('show.bs.modal',function(showEvent){
            if(showEvent.isDefaultPrevented()) return;
            $targer.one('hidden.bs.modal',function(){
                $this.is(':visible')&&$this.trigger('focus');
            });
        });

        Plugin.call($targer,option,this);
    });
}(jQuery);
 
 
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){
    'use strict';

    var Tooltip=function(element,options){
        this.type=null;
        this.options=null;
        this.enabled=null;
        this.timeout=null;
        this.hoverState=null;
        this.$element=null;
        this.inState=null;

        this.init('tooltip',element,options);
    }

    Tooltip.VERSION='3.3.5';
    Tooltip.TRANSITION_DURATION=150;
    Tooltip.DEFAULTS={
        animate:true,
        placement:'top',
        selector:false,
        template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger:'hover focus',
        title:'',
        delay:0,
        html:false,
        container:false,
        viewport:{
            selector:'body',
            padding:0
        }
    };

    Tooltip.prototype.init=function(type,element,options){
        this.enabled=true;
        this.type=type;
        this.$element=$(element);
        this.options=this.getOptions(options);
        this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||thhis.options.viewport));
    }

    Tooltip.prototype.getDefaults=function(){
        return Tooltip.DEFAULTS;
    }

    Tooltip.prototype.getOptions=function(options){
        
    }

    function Plugin(option){
        return this.each(function(){
            var $this=$(this);
            var data=$this.data('bs.tooltip');
            var options=typeof option=='object'&&option;

            if (!data && /destroy|hide/.test(option)) return;
            if(!data) $this.data('bs.tooltip',(data=new Tooltip(this,options)));
            if(typeof option=='string') data[option]();
        });
    }

    var old = $.fn.tooltip;
    $.fn.tooltip= Plugin;
    $.fn.tooltip.Constructor = Tooltip;

    $.fn.tooltip.noConflict = function () {
        $.fn.tooltip = old;
        return this;
    }
}(jQuery);

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 