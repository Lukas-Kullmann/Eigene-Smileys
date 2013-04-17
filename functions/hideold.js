function hideold(){
  var subthread = jQuery('#new_subscribed_threads');
  subthread.find('h2:first').attr('id', 'ownsmilie_head').html('');

  subthread.find('#cel_subscribed_threads :first-child').replaceWith('<div id="ownsmilie_body" class="blockbody settings_form_border" style="padding: 5px; font-size: 10px;"></div>');

  subthread.find('div:first').find('div:last-child').remove();

  $('#new_subscribed_forums').remove();
}