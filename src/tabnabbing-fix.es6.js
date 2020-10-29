(function () {
  const startTime = performance.now();
  // HTML sanitization
  document
    .querySelectorAll('a[target="_blank"')
    .forEach(a => {
      if (a.rel.includes("opener")) {
        return;
      } else if (!a.rel.includes("noopener")) {
        a.rel = a.rel + "noopener";
      }
    });
  var endTime = performance.now();
  console.log(`HTML sanitization took ${endTime - startTime} ms.`);
})();
