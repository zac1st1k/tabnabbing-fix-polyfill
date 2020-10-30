"use strict";

(function () {
  var startTime = performance.now(); // HTML sanitization

  Array.prototype.slice.call(document.querySelectorAll('a[target="_blank"]')).forEach(function (a) {
    if (a.rel.indexOf("opener") !== -1) {
      return;
    } else if (!(a.rel.indexOf("noopener") !== -1)) {
      a.rel = "".concat(a.rel).concat(a.rel ? ' ' : '', "noopener");
    }
  });
  var endTime = performance.now();
  console.log("HTML sanitization took ".concat(endTime - startTime, " ms.")); // todo : ie 11 support
  // Mutation observer

  var observer = new MutationObserver(function (mutationsList) {
    Array.prototype.slice.call(mutationsList).forEach(function (mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        var _startTime = performance.now();

        Array.prototype.slice.call(mutation.addedNodes).forEach(function (node) {
          if (node.tagName !== 'A') {
            return;
          } else if (node.target != '_blank') {
            return;
          } else if (node.rel.indexOf('opener') !== -1) {
            return;
          } else {
            node.rel = "".concat(node.rel).concat(node.rel ? ' ' : '', "noopener");
          }
        });
        var endTime = performance.now();
        console.log("Mutation Observer took ".concat(endTime - _startTime, " ms."));
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();