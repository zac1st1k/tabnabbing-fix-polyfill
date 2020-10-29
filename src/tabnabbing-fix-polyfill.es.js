(function () {
  const startTime = performance.now();
  // HTML sanitization
  document
    .querySelectorAll('a[target="_blank"]')
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
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.tagName !== 'A') {
            return;
          } else if (node.target != '_blank') {
            return;
          } else if (node.rel.includes('opener')) {
            return;
          } else {
            node.rel = `${node.rel}${node.rel ? ' ' : ''}noopener`
          }
        })
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
