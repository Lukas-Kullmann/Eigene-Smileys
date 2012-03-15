function hideold(){
  var subthread = document.getElementById("new_subscribed_threads");
  subthread.getElementsByTagName("h2")[0].setAttribute("id", "ownsmiley_head");
  document.getElementById("ownsmiley_head").innerHTML="";

  subthread.getElementsByTagName("div")[0].firstElementChild.setAttribute("id", "ownsmiley_body");
  document.getElementById("ownsmiley_body").innerHTML="";
  document.getElementById("ownsmiley_body").style.padding="5px";
  document.getElementById("ownsmiley_body").style.fontSize="10px";

  subthread = subthread.getElementsByTagName("div")[0];
  subthread.removeChild(subthread.lastElementChild);

  if(document.getElementsByTagName("body")[0].innerHTML.indexOf('id="new_subscribed_forums"')!=-1){ // there are subscribed forums
    document.getElementById("new_subscribed_forums").parentNode.removeChild(document.getElementById("new_subscribed_forums"));
  }
}