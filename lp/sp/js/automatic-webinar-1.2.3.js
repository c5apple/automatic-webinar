/* AutomaticWebinar(v1.2.3) */
$(function () {
  "use strict";
  var $form = $('#aw-form');

  var offset = 2;
  var now = new Date();
  now.setDate(now.getDate() + offset);
  for (var i = 0; i < 3; i++) {
    now.setDate(now.getDate() + 1);
    var y = now.getFullYear() + '';
    var m = ('0' + (now.getMonth() + 1)).slice(-2);
    var d = ('0' + now.getDate()).slice(-2);
    var w = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];
    $form.find('#preferredDate').append(
      '<option value="' + y + m + d + '">' + y + '/' + m + '/' + d + '(' + w + ')</option>');
  }

  $('#aw-subscribe').on('click', function (event) {
    if (event) event.preventDefault();
    if ($form.valid()) {
      // opt登録
      $.post($form.attr('action'), $form.serialize()
      ).done(function (data) {
        var successMessage = $('#aw-success').html();
        $('#aw-notification').hide().html(successMessage).fadeIn("slow");
      }).fail(function (err) {
        var errorMessage = $('#aw-error').html();
        $('#aw-notification').hide().html(errorMessage).fadeIn("slow");
      });
    }
  });

  /**
   * 初回表示日時を取得する
   */
  function getViewDateTime(isSet) {
    var viewDateTime = localStorage.getItem('view-datetime');
    if (viewDateTime === null) {
      var now = Date.now();
      if (isSet === true) {
        localStorage.setItem('view-datetime', now);
      }
      viewDateTime = now;
    }
    return Number(viewDateTime);
  }

  /**
   * 非表示タグを表示する
   */
  function showTag($tag) {
    if ($tag.length === 0) {
      return;
    } else if ($tag.get(0).tagName.toLowerCase() === 'template') {
      $tag.replaceWith(
        '<div id="' + $tag.get(0).id + '" class="' + $tag.get(0).className + '">' + $($tag.get(0)).html() + '</div>'
      );
    } else {
      $tag.show('slow');
    }
  }

  // 公開開始日時から公開終了日時まで表示する
  if (getViewDateTime(false) < new Date($('#countdown-end-limit').text()).getTime()) {
    $('.countdown').downCount({
      date: $('#countdown-limit').text(), // m/d/y
      offset: 9
    }, function () {
      $('.countdown').remove();
      showTag($('.countdown-open'));

      // 任意のタイミングで表示/非表示を行う
      $('.countdown-custom').each(function () {
        var $this = $(this);
        var openDatetime = Date.parse($this.attr('data-open-datetime'));
        var openOffsettime = Number($this.attr('data-open-offsettime'));
        var openOffsetlate = Boolean($this.attr('data-open-offsetlate'));
        var closeTarget = $this.attr('data-close-target');
        var open;

        if (isNaN(openDatetime) && isNaN(openOffsettime)) {
          // illegal
          return;
        }
        if (isNaN(openDatetime)) {
          open = new Date(getViewDateTime(true) + openOffsettime * 1000); // ミリ秒->秒
        } else if (isNaN(openOffsettime)) {
          open = new Date(openDatetime);
        } else {
          // 両方指定された場合
          var minOrMax = openOffsetlate ? Math.max : Math.min;
          open = new Date(minOrMax(openDatetime, getViewDateTime(true) + openOffsettime * 1000));
        }
        var month = open.getMonth() + 1;
        var date = open.getDate();
        var date = open.getDate();
        var year = open.getFullYear();
        var hour = ('0' + open.getHours()).slice(-2);
        var minute = ('0' + open.getMinutes()).slice(-2);
        var second = ('0' + open.getSeconds()).slice(-2);
        var openStr = month + '/' + date + '/' + year + ' ' + hour + ':' + minute + ':' + second;

        $('#dummy').downCount({
          date: openStr, // m/d/y
          offset: 9
        }, function () {
          showTag($this);
          if ($(closeTarget).length > 0) {
            $(closeTarget).remove();
          }
        });
      });
    });
  } else {
    $('.countdown').remove();
    $('.countdown-open').remove();
    showTag($('.countdown-end'));
  }
});
