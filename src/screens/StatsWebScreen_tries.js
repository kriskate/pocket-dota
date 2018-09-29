`
var root = document.getElementById("root");
var main = document.getElementById("root").childNodes[0];

postMessage(
  JSON.stringify({
    R_scroll: root.scrollHeight,
    R_client: root.clientHeight,
    R_off: root.offsetHeight,

    M_scroll: main.childNodes[0].scrollHeight,
    M_client: main.childNodes[0].clientHeight,
    M_off: main.childNodes[0].offsetHeight,

    M_scroll1: main.scrollHeight,
    M_client1: main.clientHeight,
    M_off1: main.offsetHeight,
    height: main.clientHeight || main.scrollHeight
  })
);



  
history.pushState = function(navState) {
  post(navState);
  pushState.apply(history, arguments);
};

Array.prototype.slice.call(document.getElementsByTagName('a')).forEach(function(el) {
  var href = el.href;
  el.onclick = function() {
    postMessage(
      JSON.stringify({
        newUrl: href
      })
    );
  }
});

          height: Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)







function(history){
  var pushState = history.pushState;
  var back = history.back;

  function updateNavState(currTitle) {
    setTimeout(function () {
      window.postMessage(JSON.stringify({
        type: 'navStateChange',
        navState: {
          url: location.protocol + '//' + location.host + location.pathname,
          title: currTitle ? currTitle : document.title
        }
      }));
    }, 100);
  };

  history.pushState = function(state) {
    updateNavState();
    return pushState.apply(history, arguments);
  };

  history.back = function() {
    updateNavState();
    return back.apply(history);
  };

  window.onload = function() {
    updateNavState();
  };

  window.onpopstate = function() {
    updateNavState();
  };
  window.onhashchange = function() {
    updateNavState();
  };

})(window.history);





  
function postReload() {
  postMessage(JSON.stringify({ reload: true }));
  postHeight();
}

var pushState = history.pushState;
history.pushState = function(navState, b, url) {
  var _url = url;
  if(url.substring(0,3) !== 'http') {
    _url = 'https://www.opendota.com' + url;
  }

  setTimeout(function() {
    postHeight();
  }, 500);

  return pushState.apply(history, [navState, b, _url]);
};
`