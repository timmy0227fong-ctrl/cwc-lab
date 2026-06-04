/* ============================================================
   nav.js — 手機版漢堡選單
   ------------------------------------------------------------
   自動在導覽列加入一個「☰」按鈕（只在手機版顯示，由 CSS 控制）。
   點按鈕會展開／收合選單；點任一選項後自動收合。
   電腦版不受影響（按鈕在 CSS 中設為隱藏）。
   ============================================================ */
(function () {
  function init() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var links = nav.querySelector('.nav-links');
    if (!links) return;

    // 建立漢堡按鈕（三條線）
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    // 放在品牌名稱之後、選單之前
    nav.insertBefore(btn, links);

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // 點選項後自動收合
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
