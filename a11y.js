/* 하니비 랜딩 — 글자 크기(화면 배율) 조절. 어르신 접근성.
   앱과 동일한 저장 키(hanibee_font_scale)와 zoom 방식을 사용한다.
   전 페이지가 px 폰트라 루트 font-size 대신 문서 zoom 으로 전체를 균일하게 키운다. */
(function () {
  var KEY = "hanibee_font_scale";
  var OPTS = [
    { v: 1, label: "보통" },
    { v: 1.15, label: "크게" },
    { v: 1.3, label: "아주 크게" }
  ];

  function getScale() {
    try {
      var n = parseFloat(localStorage.getItem(KEY));
      return n >= 1 && n <= 1.3 ? n : 1;
    } catch (e) {
      return 1;
    }
  }

  function applyScale(s) {
    document.documentElement.style.zoom = String(s);
  }

  // 저장된 배율 즉시 적용 (깜빡임 최소화)
  applyScale(getScale());

  var buttons = [];

  function updateActive() {
    var cur = getScale();
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", parseFloat(b.dataset.v) === cur ? "true" : "false");
    });
  }

  function setScale(s) {
    try {
      localStorage.setItem(KEY, String(s));
    } catch (e) {}
    applyScale(s);
    updateActive();
  }

  function build() {
    var panel = document.createElement("div");
    panel.className = "a11y-font";

    var label = document.createElement("span");
    label.className = "a11y-font-label";
    label.textContent = "글자 크기";
    panel.appendChild(label);

    OPTS.forEach(function (o) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "a11y-font-btn";
      btn.dataset.v = o.v;
      btn.setAttribute("aria-label", "글자 크기 " + o.label);
      btn.style.fontSize = Math.round(13 * o.v) + "px";
      btn.textContent = "가";
      btn.addEventListener("click", function () {
        setScale(o.v);
      });
      panel.appendChild(btn);
      buttons.push(btn);
    });

    document.body.appendChild(panel);
    updateActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
