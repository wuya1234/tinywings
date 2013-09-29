// Generated by CoffeeScript 1.6.3
(function() {
  var debug, domTpl, log, tinywings, tpl, travel;

  debug = true;

  log = function() {
    if (debug) {
      return console.log.apply(console, arguments);
    }
  };

  travel = function(node, callback) {
    var _results;
    node = node.firstChild;
    _results = [];
    while (node) {
      callback(node);
      log("travel " + node);
      travel(node, callback);
      _results.push(node = node.nextSibling);
    }
    return _results;
  };

  tinywings = function(tpl) {
    var frag, tw;
    tw = {};
    frag = document.createElement('div');
    frag.innerHTML = tpl;
    tw.frag = frag;
    travel(frag, function(node) {
      var bind;
      console.log(node);
      if (node.dataset.bind) {
        bind = node.dataset.bind;
        bind = bind.split(':');
        tw[bind[1]] = function(val) {
          if (bind[0] === 'text') {
            node.innerHTML = val;
            return console.log(val);
          }
        };
      }
    });
    return tw;
  };

  tpl = '<div data-bind = \'text:text\'></div>';

  domTpl = tinywings(tpl);

  domTpl.text('something like this');

}).call(this);
