/**
 * Created by Joy on 2017/9/11.
 */
$(function(){
    //城市切换
    (function () {
        var ca = $("#city").find("a");
        ca.each(function () {
            $(this).click(function () {
                ca.removeClass("active");
                $(this).addClass("active");
            });
        })
    })();

    //video
    (function () {
        var video = $("video");
        video[0].controls = true;
        video.click(function () {
            if(video[0].paused){
                video[0].play();
            }else{
                video[0].pause();
            }
        });
    })();
        
    //导航
    (function () {
        var nav_as = $("#nav").find("a");
        var index = 0;
        for (var i = 0; i < nav_as.length; i++) {
            if (i <= 5) {
                nav_as[i].style.backgroundPosition = (-66 * i) + "px" + " " + 2 + "px";
            } else {
                nav_as[i].style.backgroundPosition = (-66 * (i - 1)) + "px" + " " + 2 + "px";
            }
        }

        $("#nav").find("a").each(function (index) {
            $(this).mouseover(function () {
                if (index <= 5) {
                    $(this).css("background-position", (-66 * index) + "px" + " " + (-70) + "px");
                } else {
                    $(this).css("background-position", (-66 * (index - 1)) + "px" + " " + (-70) + "px");
                }
            })
            $(this).mouseout(function () {
                if (index <= 5) {
                    $(this).css("background-position", (-66 * index) + "px" + " " + 2 + "px");
                } else {
                    $(this).css("background-position", (-66 * (index - 1)) + "px" + " " + 2 + "px");
                }
            })
        })
    })();

    //搜索切换
    (function () {
        var mli = $("#menu li");
        var iText = $("#search").find(".form .text");
        var arrText = [
            "例如：啦啦啦啦啦店",
            "例如：啊啊啊啊啊啊啊啊室",
            "例如：哇哇哇哇哇哇哇券",
            "例如：一一一一一一一一",
            "例如：呀呀呀呀呀呀呀丫丫丫丫"
        ]
        var iNow = 0;
        iText.val(arrText[iNow]);
        mli.each(function (index) {
            $(this).mouseover(function () {
                mli.attr("class","gradient");
                $(this).attr("class","active");
                iNow = index;
                iText.val(arrText[iNow]);
            })
        });

        iText.focus(function () {
            if($(this).val() == arrText[iNow]) {
                $(this).val(" ");
            }
        });
        iText.blur(function () {
            if($(this).val() == " "){
                iText.val(arrText[iNow]);
            }
        });
    })();

    //update文字滚动
    (function () {
        var udDiv = $(".update");
        var uul = udDiv.find("ul");
        var lih = 0;
        var iNow = 0;
        var timer = 0;
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':7, 'title':'啦啦啦啦啦啦啦啦啦', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':9, 'title':'啦啦啦啦啦啦啦啦啦', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':10, 'title':'啦啦啦啦啦啦啦啦啦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
        ];
        var str = "";
        var uBtnUp = $("#uBtnUp");
        var uBtnDown = $("#uBtnDown");
        for(var i = 0; i < arrData.length; i++){
            str += "<li><a href = " + arrData[i].url+"><strong>"+arrData[i].name+"</strong><span>"+
                arrData[i].time+"分钟前 </span> 写了一篇新文章："+arrData[i].title+"...</a></li>";
        }
        uul.html(str);

        lih = uul.find("li").height();

        uBtnUp.click(function () {
            doMove(1);
        });
        uBtnDown.click(function () {
            doMove(-1)
        });
        udDiv.hover(function () {
            clearInterval(timer);
        },autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                doMove(-1);
            },1800);
        }
        autoPlay();
        function doMove(num) {
            iNow += num;
            if(Math.abs(iNow)> arrData.length - 1){
                iNow = 0;
            }
            if(iNow > 0){
                iNow = -(arrData.length - 1);
            }
            uul.stop().animate({"top":lih*iNow},2500,"elasticOut");
        }
    })();

    //选项卡切换
    (function () {
        fnTab($(".tabNav1"),$(".tabCon1"));
        fnTab($(".tabNav2"),$(".tabCon2"));
        fnTab($(".tabNav3"),$(".tabCon3"));
        fnTab($(".tabNav4"),$(".tabCon4"));
        function fnTab(tNav,tCon) {
            var opElem = tNav.children();
            tCon.hide().eq(0).show();
            opElem.each(function (index) {
                $(this).click(function(){
                    opElem.removeClass("active").addClass("gradient");
                    $(this).removeClass("gradient").addClass("active");
                    opElem.find("strong").addClass("strong_grey");
                    $(this).find("strong").removeClass("strong_grey");
                    opElem.find("a").attr("class","triangle_down_grey");
                    $(this).find("a").attr("class","triangle_down_red");
                    tCon.hide().eq(index).show();
                });
            });
        }
    })();

    //自动播放的焦点图
    (function () {
        var fDiv = $("#fade");
        var fulis = fDiv.find("ul li");
        var folis = fDiv.find("ol li");
        var fp = fDiv.find("p");
        var  iNow = 0;
        var timer = null;
        var arr = ["啦啦啦呀呀呀啦啦啦","生生世世生生世世","哈利路亚哈利路亚"];

        fnFade();
        autoPlay();

        folis.click(function () {
            iNow = $(this).index();
            fnFade();
        });

        fDiv.hover(function () {
            clearInterval(timer);
        },autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                iNow ++;
                iNow %= arr.length;
                fnFade();
            },1000);
        }

        function fnFade() {
            fulis.each(function (i) {
                if(i != iNow){
                    fulis.eq(i).fadeOut().css("zIndex",1);
                    folis.eq(i).removeClass("active");
                }else{
                    fulis.eq(i).fadeIn().css("zIndex",2);
                    folis.eq(i).addClass("active");
                }
            });
            fp.text(arr[iNow]);
        }
    })();

    //日历提示说明
    (function () {
        var cSpan = $(".calendar h3 span");
        var cImg = $(".calendar .img");
        var today = $(".today_info");
        var tImg = today.find("img");
        var tp = today.find("p");
        var ts = today.find("strong");


        cImg.hover(function () {
            var liTop = $(this).parent().position().top - 30;
            var liLeft = $(this).parent().position().left + 55;
            var week = $(this).parent().index()%cSpan.size();
            today.show().css({"left":liLeft,"top":liTop});
            tp.text($(this).attr("info"));
            tImg.attr("src",$(this).attr("src"));
            ts.text(cSpan.eq(week).text());

        },function () {
            today.hide();
        });
    })();

    //BBS
    (function () {
        $(".bbs ol li").mouseover(function () {
            $(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");
        })
    })();

    //HOT_AREA
    (function () {
        var arr = [
            '',
            '用户1<br />人气1',
            '用户2<br />人气2',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        $(".hot_area li").mouseover(function () {
            if($(this).index() == 0) return;
            $(".hot_area li p").remove();
            $(this).append('<p style="width:'+($(this).width()-12)+'px;">'+arr[$(this).index()]+'</p>');
        })
    })();
})
