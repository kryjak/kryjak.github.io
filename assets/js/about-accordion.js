(function () {
  document.querySelectorAll(".about-section").forEach(function (details) {
    details.addEventListener("toggle", function () {
      if (!details.open) return;
      var body = details.querySelector(".about-section__body");
      if (window.MathJax && window.MathJax.typesetPromise && body) {
        MathJax.typesetPromise([body]).catch(function () {});
      }
    });
  });
})();
