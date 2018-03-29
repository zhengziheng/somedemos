// ui-search 
$.fn.UiSearch = function () {
    var ui = $(this)
    $('.ui-search-selected', ui).on('click', function (e) {
        $('.ui-search-select-list').show()
        e.stopPropagation(); //阻止冒泡 代替return false

    })
    $('.ui-search-select-list a', ui).on('click', function () {
        $('.ui-search-selected').text($(this).text())
        $('.ui-search-select-list').hide()
        return false
    })
    $('body').on('click', function () {
        $('.ui-search-select-list').hide()

    })
}
$.fn.UiTab = function (header, content, focus_prefix) {
    // header表示tab组件选项卡切换部分className,里面有若干item
    // header表示tab组件内容区域className，里面有若干item
    var ui = $(this)
    var tabs = $(header, ui)
    var cons = $(content, ui)
    var focus_prefix = focus_prefix || ''
    tabs.on('click', function () {
        var index = $(this).index()
        console.log($(this))
        // console.log($('.block-content >.block-wrap'))
        tabs.removeClass(focus_prefix + 'item_focus').eq(index).addClass(focus_prefix + 'item_focus')
        cons.hide().eq(index).show()
        return false
    })
}

//ui.backtop
$.fn.UiBackTop = function () {
    var ui = $(this)
    var el = $('<span class="ui-backtop"></span>')
    ui.append(el)
    var windowHeight = $("html,body").height()
    $(window).on('scroll', function () {
        var top = $("html,body").scrollTop()+$("html,body").height()
        if (top > windowHeight) {
            el.show()
        } else {
            el.hide()
        }
    })
    el.on('click',function(){
        $("html,body").scrollTop(0).show(2000)
    })
}

// 1、左右箭头控制翻页
// 2、翻页的时候，进度点要联动focus
// 3、翻到第三页的时候下一页需要回到第一页，翻到第一页的时候同理。
// 4、进度点点击的时候，需要切换到对应页面
// 5、需要自动滚动，没有点击的时候，需要
$.fn.UiSlider = function(){
    var ui = $(this)
    var wrap = $('.ui-slider-wrap')

    var btn_prev = $('.ui-slider-arrow  .left' ,ui)
    var btn_next = $('.ui-slider-arrow  .right' ,ui)

    var items = $('.ui-slider-wrap  .item',ui)
    var tips = $('.ui-slider-process  .item',ui)
    console.log(tips)
    var current = 0
    var size = items.size()
    var width = items.eq(0).width()
    var enableAuto = true

    wrap.on('mouseover',function(){
        enableAuto = false
    })
    .on('mouseout',function(){
        enableAuto = true
    })


    wrap
    .on('move_prev',function(){
        if(current<=0){
            current=size
        }
        current = current -1
        wrap.triggerHandler('move_to',current)
    })
    .on('move_next',function(){
        if(current >=size-1){
            current = -1
        }
        current = current+1
        wrap.triggerHandler('move_to',current)
        
    })
    .on('move_to',function(e,index){
        wrap.css('left',index*width*-1)
        tips.removeClass('item_focus').eq(index).addClass('item_focus')
    })
    .on('auto_move',function(){
        setInterval(function(){
            enableAuto&&wrap.triggerHandler('move_next')
        },2000)
    })
    .triggerHandler('auto_move')

    btn_prev.on('click',function(){
        wrap.triggerHandler('move_prev')
    })


    btn_next.on('click',function(){
        wrap.triggerHandler('move_next')
        
    })
    
    tips.on('click',function(){
        var index = $(this).index()
        console.log(index)
        wrap.triggerHandler('move_to',index)
        
    })

    // debugger

}
// 整个页面的逻辑
$(function () {
    $('.ui-search').UiSearch()
    $('.content-tab').UiTab('.caption >.item', '.block >.item')
    $('.content-tab .block .item').UiTab('.block-caption >a', '.block-content > .block-wrap', 'block-caption-')
    $('body').UiBackTop()
    $('.ui-slider').UiSlider()
})