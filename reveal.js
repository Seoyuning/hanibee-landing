// 스크롤 시 블록이 좌/우/아래에서 부드럽게 등장
(function () {
  var nodes = document.querySelectorAll('.reveal-left,.reveal-right,.reveal-up');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  nodes.forEach(function (n) { io.observe(n); });
})();
