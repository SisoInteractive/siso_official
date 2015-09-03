// Created by sam mok (Siso brand interactive team.) 2015

var index = {
    window_width:0,// this is window width
    window_height:0,
    app: function(){

        function pageInit(){
            //setTimeout(function(){
            //    var container_list =$('.container-list');
            //    $('.header').addClass('active');
            //    container_list.addClass('active');
            //},500)
        }

        //parallax
        $('.frame-bg').parallax({});

        //fullPage.js
        $('#fullpage').fullpage({
            css3: true,
            scrollingSpeed:800,
            continuousVertical: true,
            easing: 'easeInOutCubic',
            easingcss3: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
            //This callback is fired once the user leaves a section
            onLeave: function(index, nextIndex, direction){
                var title_bg = $('.title-bg');
                var more_span = $('.more');
                var move_box_span = $('.move-box span');
                switch ( nextIndex ){
                    case 1:
                        title_bg.css({'background':'#d33c3c', 'opacity':'0.95'});
                        more_span.css({'background':'#ee5757'});
                        move_box_span.removeClass('bule gray')
                        move_box_span.addClass('red');
                        break;
                    case 2:
                        title_bg.css({'background':'#949494', 'opacity':'0.95'});
                        more_span.css({'background':'#919191'});
                        move_box_span.removeClass('red sred');
                        move_box_span.addClass('gray');
                        break;
                    case 3:
                        title_bg.css({'background':'#c92a4f', 'opacity':'0.95'});
                        more_span.css({'background':'#f04970'});
                        move_box_span.removeClass('gray yellow');
                        move_box_span.addClass('sred');
                        break;
                    case 4:
                        title_bg.css({'background':'#ff900d', 'opacity':'0.95'});
                        more_span.css({'background':'#ffae4e'});
                        move_box_span.removeClass('sred sbule');
                        move_box_span.addClass('yellow');
                        break;
                    case 5:
                        title_bg.css({'background':'#09134d', 'opacity':'.6'});
                        more_span.css({'background':'#2d3a89'});
                        move_box_span.removeClass('yellow');
                        move_box_span.addClass('sbule');
                        break;
                }

            }
        });

        /* jquery scroll for mostRecent */
        $("#mostRecent-wrapper").mCustomScrollbar({
            autoHideScrollbar:false,
            theme:"inset",
            scrollEasing:"easeOut",
            scrollInertia:800,
            callbacks:{
                whileScrolling:function(){
                    //console.log(this.mcs.topPct);
                }
            }
        });

        index.operate_dom();
        index.case_detail();
        index.article_list();
        index.company();
        pageInit();
    },

    operate_dom:function(){
        index.window_width = $(window).width();  //get window width
        index.window_height = $(window).height(); //get window height
        // click toggle-btn
        var header = $('.header');
        var m_mostRecent = $('.m-mostRecent');
        var container_list =$('.container-list');
        var m_case_detail = $('.m-case-detail')
        $('.toggle').hammer().bind("tap",function(){
            header.addClass('active');
            container_list.addClass('active');
        });
        //toggle-mostRecent
        $('.toggle-mostRecent').hammer().bind("tap",function(){
            header.addClass('active');
            m_mostRecent.addClass('active');
        });
        //mostRecent-nav
        $('.mostRecent-nav').hammer().bind("tap",function(){
            header.removeClass('active');
            m_mostRecent.removeClass('active');
        });
        $('.container-list-btn').hammer().bind("tap",function(){
            header.removeClass('active');
            container_list.removeClass('active');
        })
        $('.detail-wrapper-nav').hammer().bind("tap",function(){
            m_case_detail.removeClass('active');
            $('.detail-wrapper').removeClass('active')
        })
        //click moveSectionUp-btn
        $('.moveSectionUp-btn').hammer().bind("tap",function(){
            $('#fullpage').fullpage.moveSectionUp();
        })
        //click moveSectionDown-btn
        $('.moveSectionDown-btn').hammer().bind("tap",function(){
            $('#fullpage').fullpage.moveSectionDown();
        })

        //each and loading images
        $('.data-img').each(function(){
            var data_src = $(this).attr('data-source');
            var dom_path = "assets/images/";
            if(index.window_width < 500){
                 dom_path = "assets/images/m-";
            }
            var img_path = dom_path+data_src;
            if(data_src){
                $(this).attr('src',img_path);
            }
        });

        /*
        * window resize
        * mostRecent_item() --> Control mostRecent-body --> li height
        * */
        $(window).resize(function(){
            mostRecent_item();
            index.window_width = $(window).width();
            index.window_height = $(window).height();
        })

        function mostRecent_item(){
            var mostRecent_li = $(".item-box .item");
            mostRecent_li.each(function(item,self){
                var mostRecent_li_width_value = $(self).width();
                $(self).css('height',mostRecent_li_width_value+"px");
            });
        }

        /*
        *   toggle for detail-wrapper
        */
        $('.detail-down').hammer().bind("tap",function(){
            toggle_detail_wrapper.next();
            $('#detail-wrapper').addClass('active');
        });
        $('.detail-up').hammer().bind("tap",function(){
            toggle_detail_wrapper.up();
            $('#detail-wrapper').addClass('active');
        });

        $('.item-go').hammer().bind("tap",function(){
            var index = $(this).attr('data-index');
            toggle_detail_wrapper.setIndex(index);
            $('.m-case-detail').addClass('active');
        });

        /*
         *   transform toggle for detail-wrapper function
         */

        var toggle_detail_wrapper = {
            detail_wrapper:$('#detail-wrapper'),
            index:1,
            active_Switch:true,
            next:function(){
                var that = this;
                if(this.active_Switch){
                    var transformXVal = index.getTransForm(".detail-wrapper");
                    var transformXVal_Next = - ( this.index * 100 );
                    if(  transformXVal == 0 ){
                        transformXVal_Next = -100;
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_Next +"%,0,0)");
                    }else{
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_Next + "%,0,0)");
                    }
                    this.index++;
                    this.active_Switch = false;
                }
                setTimeout(function(){
                    that.active_Switch = true;
                },1000);
            },
            up:function(){
                var that = this;
                if(this.active_Switch){
                    var transformXVal = ( this.index * 100 );
                    if(  transformXVal != 0 ){
                        var transformXVal_up =  (this.index - 1) * -100;
                        this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal_up + "%,0,0)");
                    }
                    if(this.index == 1){
                        this.index ==1
                    }else{
                        this.index--;
                        this.active_Switch = false;
                    }

                }
                setTimeout(function(){
                    that.active_Switch = true;
                },1000);
            },
            setIndex:function(activeIndex){
                if(activeIndex){
                    this.index = activeIndex;
                    var transformXVal = -( (this.index - 1) * 100 );
                    this.detail_wrapper.css("webkitTransform","translate3d("+ transformXVal + "%,0,0)");
                }
            }

        }

        /*
         *   get Transform css value
         */
        function getTransform(Class){
                var wrapper = $(Class);
                var transformVal = wrapper.css('-webkit-transform');
                var numReg = /-?[0-9]+/g;//可能有负数所以就加个负号
                var valAry = transformVal.match(numReg);//返回一个包含有数字值的数组
                var transformXVal = valAry[valAry.length - 2],transformYVal = valAry[valAry.length - 1];//返回transformX、transformY的值
                return transformXVal;
        }
        index.getTransForm = getTransform;
        /*Control mostRecent-body --> li height*/
        mostRecent_item();

    },
    case_detail:function(){
        $('.playVideo-btn').hammer().bind("tap",function(){
            var video = $(this).parent().children('.myVideo');
            video.get(0).play();
            $(this).fadeOut();
            $(this).siblings('.myVideo_zz').fadeOut();
        })
        $('.myVideo').hammer().bind("tap",function(){
            $(this).get(0).pause();
            var myVideo_box = $(this).parent();
            myVideo_box.children('.myVideo_zz').fadeIn();
            myVideo_box.children('.playVideo-btn').fadeIn();
        })
        /*  */
        $('.detail-item-body').mCustomScrollbar({
            autoHideScrollbar:false,
            theme:"inset",
            scrollEasing:"easeOut",
            scrollInertia:800,
            contentTouchScroll:30,
            callbacks:{whileScrolling:function(){}}
        });

        //detail-bxslider
        var slider = $('.bxslider').each(function () {
            var that = $(this);
            var slider = that.bxSlider({
                infiniteLoop: true,
                mode: 'fade',
                controls:false,
                auto:true,
                autoHover:true,
                autoDelay:3000
            })
            that.parents('.detail-bxslider').find('.bx-prev').hammer().bind("tap",function(){
                console.log('prev');
                slider.goToPrevSlide();
            })
            that.parents('.detail-bxslider').find('.bx-next').hammer().bind("tap",function(){
                console.log('next');
                slider.goToNextSlide();
            })
        });
    },
    article_list:function(){
        // hammer().bind('panleft panright hover tap press pan swipe',function( ev ){
        //    console.log(ev.type+":"+ev.gesture.deltaX);
        //})
        function hover_detail(){
            var dom_Time;
            var dom = $('.detail-description-touch-img');
            var dom_width = dom.width();
            var max_offset = dom_width - index.window_width;
            var translate3d_x = index.getTransForm('.detail-description-touch-img');
            $('.touch-span').hover(function(){
                var direction = $(this).attr('data-direction');
                if(direction=='right'){
                    if(translate3d_x <= 0){
                        dom_Time = setInterval(function(){
                            translate3d_x = translate3d_x - 2;
                            dom.css("webkitTransform","translate3d("+ translate3d_x + "px,0,0)");
                            if(-translate3d_x >= max_offset){
                                clearInterval(dom_Time);
                            }
                        },10);
                    }
                }
                if(direction=='left'){
                    if(translate3d_x < 0 ){
                        dom_Time = setInterval(function(){
                            translate3d_x = translate3d_x + 2;
                            dom.css("webkitTransform","translate3d("+ translate3d_x + "px,0,0)");
                            if(translate3d_x >= 0){
                                clearInterval(dom_Time);
                            }
                        },10);
                    }
                }

            },function(){
                clearInterval(dom_Time);
            })

        };
        hover_detail();

    },
    company:function(){
        /* company Scrollbar init  */
        $('.m-company-wrapper').mCustomScrollbar({
            autoHideScrollbar:false,
            theme:"inset",
            scrollEasing:"easeOut",
            scrollInertia:800,
            contentTouchScroll:30,
            callbacks:{whileScrolling:function(){}}
        });
        $('.toggle-careers').hammer().bind('tap',function(){
            $('.m-company').addClass('active');
            $('.header').addClass('active');
        });
        $('.m-company-nav').hammer().bind('tap',function(){
            $('.m-company').removeClass('active');
            $('.header').removeClass('active');
        });
    }


};

$(function (){
    // init index 
    index.app();
});