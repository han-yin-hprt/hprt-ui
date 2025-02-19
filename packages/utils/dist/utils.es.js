function u(t) {
  let n;
  return typeof t == "object" ? n = t : (typeof t == "string" && /^[0-9]+$/.test(t) && (t = parseInt(t)), typeof t == "number" && t.toString().length === 10 && (t = t * 1e3), n = new Date(t)), n;
}
function c(t, n = "{y}-{m}-{d} {h}:{i}:{s}") {
  if (arguments.length === 0)
    return null;
  const e = u(t), s = {
    y: e.getFullYear(),
    m: e.getMonth() + 1,
    d: e.getDate(),
    h: e.getHours(),
    i: e.getMinutes(),
    s: e.getSeconds(),
    S: e.getMilliseconds(),
    a: e.getDay()
  };
  return n.replace(/{([ymdhisSa])+}/g, (f, a) => {
    const o = s[a];
    return a === "a" ? ["日", "一", "二", "三", "四", "五", "六"][o] : a === "S" ? o.toString().padStart(3, "0") : o.toString().padStart(2, "0");
  });
}
function i(t, n = "{y}年{m}月{d}日 {h}时{i}分") {
  typeof t == "number" && `${t}`.length === 10 && (t = parseInt(`${t}`) * 1e3);
  const e = u(t), r = (Date.now() - e.getTime()) / 1e3;
  return r < 60 ? "刚刚" : r < 3600 ? `${Math.ceil(r / 60)}分钟前` : r < 3600 * 24 ? `${Math.ceil(r / 3600)}小时前` : r < 3600 * 24 * 2 ? "1天前" : c(t, n);
}
function g(t) {
  const n = u(t), e = n.getDay(), s = e === 0 ? -6 : 1 - e, r = new Date(n);
  r.setDate(n.getDate() + s);
  const f = [];
  for (let a = 0; a < 7; a++) {
    const o = new Date(r);
    o.setDate(r.getDate() + a), f.push(o);
  }
  return f;
}
export {
  u as format2Date,
  i as formatRelativeTime,
  g as getWeekDates,
  c as parseTime
};
