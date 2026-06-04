/* ============================================================
   nav.js — 手機版漢堡選單
   ------------------------------------------------------------
   1) 自動在導覽列加入「☰」按鈕（只在手機版顯示，由 CSS 控制）。
      點按鈕展開／收合選單；點任一選項後自動收合。
   2) 手機版的頁首是「固定吸頂」(position: fixed)，會蓋住頁面頂端，
      所以這裡量測頁首高度，替頁面內容預留等高的上方間距。
   電腦版不受影響。
   ============================================================ */
(function () {
  var mq = window.matchMedia('(max-width: 720px)');

  function init() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var links = nav.querySelector('.nav-links');
    if (!links) return;
    var header = document.querySelector('.site-header');

    // 建立漢堡按鈕（三條線）
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(btn, links);

    function closeMenu() {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    // 量測收合狀態下的頁首高度，替內容預留上方間距（手機版固定頁首用）
    function syncOffset() {
      if (!header) return;
      document.body.style.paddingTop = mq.matches ? (header.offsetHeight + 'px') : '';
    }

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // 點選項後自動收合
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    // 視窗尺寸／方向改變：先收合再重新量測，確保量到的是收合高度
    window.addEventListener('resize', function () {
      closeMenu();
      syncOffset();
    });
    // 字型載入後版面可能微調，再校正一次
    window.addEventListener('load', syncOffset);

    syncOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
