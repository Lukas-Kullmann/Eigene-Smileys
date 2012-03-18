function hideold(){
  var subthread = jQuery('#new_subscribed_threads');
  subthread.find('h2:first').attr('id', 'ownsmilie_head').html('');

  subthread.find('div:first:first-child').attr('id', 'ownsmilie_body').html('').css('padding','5px').css('font-size','10px');

  subthread.find('div:first').find('div:last-child').remove();

  $('#new_subscribed_forums').remove();
}