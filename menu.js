// VATS2 menu bar (written by VATS2, do not edit: it is replaced on every publish)
(function () {
  var REPO = "Lardvaark/vats-multi-playbook", SYMS = ["NQ", "RTY", "YM", "SPY", "QQQ", "NVDA", "TSLA"];
  var base = '/' + REPO.split('/')[1] + '/';
  var parts = location.pathname.slice(base.length).split('/');
  var cur = SYMS.indexOf(parts[0]) >= 0 ? parts[0] : '';
  var h = document.getElementById('vats2-home'); if (h) h.style.display = 'none';
  var css = '#vats2-menu{position:sticky;top:0;z-index:9999;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;' +
    'padding:8px 16px;background:#0a160d;border-bottom:1px solid #2a3a2e;font:13px Consolas,ui-monospace,monospace;color:#3dff7a}' +
    '#vats2-menu a{color:#3dff7a;text-decoration:none}#vats2-menu b{font-size:15px;margin-right:6px}' +
    '#vats2-menu select,#vats2-menu button{background:#050c07;color:#3dff7a;border:1px solid #1f9e4a;border-radius:4px;padding:3px 6px;font:inherit;max-width:260px}' +
    '#vats2-menu button{cursor:pointer;font-weight:700}#vats2-menu .sp{flex:1}#vats2-menu .dim{color:#1f9e4a}' +
    '#vats2-tip{display:none;padding:8px 16px;background:#0d3d1f;color:#3dff7a;font:13px Consolas,monospace}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var bar = document.createElement('div'); bar.id = 'vats2-menu';
  var opt = function (v, t, sel) { return '<option value="' + v + '"' + (sel ? ' selected' : '') + '>' + t + '</option>'; };
  bar.innerHTML = '<b>VATS2</b><a href="' + base + '">&larr; All symbols</a>' +
    '<label class="dim">Latest plan <select id="vats2-go">' + opt('', 'go to a symbol', true) + '</select></label>' +
    (cur ? '<a href="' + base + cur + '/archive.html">' + cur + ' archive</a>' : '') +
    '<span class="sp"></span><label class="dim">Run on PC <select id="vats2-run">' + opt('ALL', 'All ticked symbols') +
    SYMS.map(function (x) { return opt(x, x, x === cur); }).join('') + '</select></label><button id="vats2-btn">Run</button>';
  var tip = document.createElement('div'); tip.id = 'vats2-tip';
  tip.textContent = 'GitHub opened in a new tab: press "Create" there. VATS2 starts the run within about a minute ' +
    'if it is open on your PC with Web runs ticked. It comments on the issue when it starts and finishes.';
  document.body.insertBefore(tip, document.body.firstChild);
  document.body.insertBefore(bar, document.body.firstChild);
  var go = document.getElementById('vats2-go');
  fetch(base + 'status.json?t=' + Date.now()).then(function (r) { return r.json(); }).then(function (s) {
    SYMS.forEach(function (x) {
      if (!s[x]) return;
      var b = {'1': 'bull', '-1': 'bear'}[String(s[x].bias)] || 'neutral';
      go.insertAdjacentHTML('beforeend', opt(x, x + '  ' + s[x].date + '  ' + b + '  (' + s[x].updated + ')'));
    });
  }).catch(function () { SYMS.forEach(function (x) { go.insertAdjacentHTML('beforeend', opt(x, x)); }); });
  go.onchange = function () { if (go.value) location.href = base + go.value + '/'; };
  document.getElementById('vats2-btn').onclick = function () {
    var v = document.getElementById('vats2-run').value;
    var url = 'https://github.com/' + REPO + '/issues/new?title=' + encodeURIComponent('VATS2 run ' + v) +
      '&body=' + encodeURIComponent('Requested from the playbook site. VATS2 on the PC runs it and closes this issue.');
    window.open(url, '_blank', 'noopener'); tip.style.display = 'block';
  };
})();
