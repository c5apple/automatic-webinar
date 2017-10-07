
/* AutomaticWebinar(v1.0.0) */
$(function () {
  "use strict";
  var $form = $('#aw-form');

  var offset = 2;
  var now = new Date();
  now.setDate(now.getDate() + offset);
  for (var i = 0; i < 3; i++) {
    now.setDate(now.getDate() + 1);
    var y = now.getFullYear();
    var m = `0${now.getMonth() + 1}`.slice(-2);
    var d = `0${now.getDate()}`.slice(-2);
    $form.find('#preferredDate').append(`<option value="${y}${m}${d}">${y}/${m}/${d}</option>`);
  }

  $('#aw-subscribe').on('click', function (event) {
    if (event) event.preventDefault();
    if ($form.valid()) register($form);
  });

  function register($form) {
    $.post($form.attr('action'), $form.serialize()
    ).done(function (data) {
      var successMessage = $('#aw-success').html();
      $('#aw-notification').hide().html(successMessage).fadeIn("slow");
    }).fail(function (err) {
      var errorMessage = $('#aw-error').html();
      $('#aw-notification').hide().html(errorMessage).fadeIn("slow");
    });
  }

  $('.countdown').downCount({
    date: $('#countdown-limit').text(), // m/d/y
    offset: 9
  }, function () {
    $('.countdown').hide();
    $('.countdown-end').show('slow');
  });
});
