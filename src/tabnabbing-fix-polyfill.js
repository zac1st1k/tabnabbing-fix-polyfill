(function () {
  const startTime = performance.now();
  // HTML sanitization
  Array.prototype.slice.call(document.querySelectorAll('a[target="_blank"]'))
    .forEach(a => {
      if (a.rel.includes("opener")) {
        return;
      } else if (!a.rel.includes("noopener")) {
        a.rel = `${a.rel}${a.rel ? ' ' : ''}noopener`
      }
    });
  var endTime = performance.now();
  console.log(`HTML sanitization took ${endTime - startTime} ms.`);

  // Mutation observer
  const observer = new MutationObserver((mutationsList) => {
    Array.prototype.slice.call(mutationsList).forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        const startTime = performance.now();
        Array.prototype.slice.call(mutation.addedNodes).forEach(node => {
          if (node.tagName !== 'A') {
            return;
          } else if (node.target != '_blank') {
            return;
          } else if (node.rel.includes('opener')) {
            return;
          } else {
            node.rel = `${node.rel}${node.rel ? ' ' : ''}noopener`;
          }
        });
        var endTime = performance.now();
        console.log(`Mutation Observer took ${endTime - startTime} ms.`);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
