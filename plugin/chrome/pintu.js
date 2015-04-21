/**
 *
 * Created by toramisu on 2015/4/21.
 */
$('body').append('<div id="pintu-plugin"><div class="pintu-button" style="display: block;left: 50px;top:20px;" data-on="0">Pintu tags</div><p><p><p><p></div>');
$('.pintu-button').on({
    'click': function () {
        console.log('open url');
        window.open('http://127.0.0.1:8080', 'pintu', 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no')
    }
});
$('.HUABAN-f-button').on({
    'click': function () {
        objs = $('.HUABAN-f-button');
        events = $._data(objs[0], 'events');
        console.log('open url', events);
        window.open('http://127.0.0.1:8080', 'pintu', 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no')
    }
});
$('.buttons').on({
    'click': function () {
        window.open('http://127.0.0.1:8080', 'pintu', 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no, location=no,status=no')
    }
});
$("img").on({
    "mouseover": function () {
        //imgLeft = $(this).offset().left;
        //imgTop = $(this).offset().top;
        //imgWidth = $(this).width();
        //pintuBtn = $('.pintu-button');
        //pintuBtn.css('left', imgLeft + imgWidth - 80);
        //pintuBtn.css('top', imgTop);
        //pintuBtn.css('display', 'block');
        //console.log('over', imgLeft, imgTop, imgWidth);
    },
    "mouseout": function (e) {
        //mx = e.clientX;
        //my = e.clientY;
        //img = $(this);
        //if (my < img.offset().top ||
        //    mx < img.offset().top ||
        //    mx > img.offset().left + img.width() ||
        //    my > img.offset().top + img.height()) {
        //    pintuBtn.css('display', 'none');
        //    $('.pintu-button').css('left', 0);
        //}
        //
        //console.log('out', e.clientX, e.clientY);
    }
});
$('.pintu-button').on({
    "mouseover": function () {
        $('.pintu-button').data('on', '1');
        console.log($('.pintu-button').data('on'));
    },
    "mouseout": function () {
        $('.pintu-button').data('on', '0');
        console.log($('.pintu-button').data('on'));

    }
})
