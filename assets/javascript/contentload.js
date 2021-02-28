var page = 1;
var api = "https://ivampiresp.com/";
var postid;
var imgurl;
var w;
var h;



function initClick() {
    $(".card").click(function() {
        var thisele = $(this);
        // rotateEle(thisele);
        if ($(this).attr('status') == 'notselected') {

            w = $(this).width();
            h = $(this).height();
            $(this).attr('status', 'selected');
            $(this).removeClass('notselected');
            $(this).addClass('selected');
            $(".card:not(.selected)").animate({ opacity: 0 });

            $(this).animate({
                width: '85%',
            }, 1000);

            // $('html,body').animate({ scrollTop: ($(this).offset().top + 200 + 'px') }, 1000);
        } else {
            $(this).animate({
                width: w,
            });

            $(this).attr('status', 'notselected');
            $(this).removeClass('selected');
            $(this).addClass('notselected');
            setTimeout(function() {
                $(".card:not(.selected)").animate({ opacity: 1 });
            }, 500);
        }
    });

}


$(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight) {
        $('.ivampiresp-card').css('cssText', 'transform: rotate(-20deg)');
        rotateContainer();
        getAchives();
    }
});

// 获取特色图片
function getThumb(id) {
    var imgurl;
    $.ajax({
        type: "GET",
        url: api + "wp-json/wp/v2/media?parent=" + id,
        dataType: "json",
        async: false,
        success: function(json) {
            imgurl = json[0].guid.rendered;
        }
    });
    return imgurl;
}
// 获取文章
function getAchives() {
    html = $('#content').html();
    t = ``;
    $.ajax({
        type: "GET",
        url: api + "wp-json/wp/v2/posts?per_page=10&page=" + page,
        dataType: "json",
        async: true,
        success: function(json) {
            page = page + 1;
            for (var i = 0; i < json.length; i++) {
                title = json[i].title.rendered;
                link = json[i].link;
                postid = json[i].id;
                time = json[i].date;
                excerpt = json[i].excerpt.rendered;
                // thimg = getThumb(postid);
                t += `
                <div class="card notselected" status="notselected" gourl="${link}">
                    <div class="cardContent">
                        <div class="image">
                            <img src="/assets/images/img100.jpg" />
                            <div class="title">
                                <a href="${link}" target="_blank">${title}</a>
                            </div>
                        </div>

                        <div class="date">
                            ${time}
                        </div>

                        <div class="desc">
                            点击标题来打开文章。
                            ${excerpt}
                        </div>
                    </div>
                </div>`;
                $('#content').html(html + t);
                initClick();
            }
        }
    })
}

// 阅读文章
function read_post(postid) {
    document.title = '正在加载...';
    $('#post-load').show();
    $('#top-title').hide();
    $('#post-area').show();
    hide_list();
    show_post_load()
    head = `<div class="anime-frames">`;
    foot = `</div>`;
    t = ``;
    $.ajax({
        type: "GET",
        url: api + "wp-json/wp/v2/posts/" + postid,
        dataType: "json",
        async: true,
        success: function(json) {
            title = json.title.rendered;
            time = new Date(json.date).Format("yyyy-MM-dd");
            content = json.content.rendered;
            link = json.link;
            document.title = title;
            thimg = getThumb(postid);
            t += `<button class="mdui-btn mdui-ripple" onclick="return_list();"><i class="mdui-icon material-icons">arrow_back</i>&nbsp;返回列表</button><br /><h1 class="mdui-text-color-theme">${title}</h1><br />
            <div class="artist">
                <p>发布时间：${time} <br />原文链接：<a target="_blank" style="color: blue;text-decoration: none" href="${link}">${link}</a></p>
                ${content}</div>`;

            hide_post_load();
            $('#post-area').html(head + t + foot);
        }
    })
}