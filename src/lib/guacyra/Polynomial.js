import Kernel from "./Guacyra";
import NumberAlgo from "./Numbers";

const { lcm, divisors } = NumberAlgo;

const {
  Integer,
  Rational,
  Literal,
  Function,
  List,
  Plus,
  Times,
  Subtract,
  Divide,
  Power,
  Expand,
  Cat,
  Hold,
  Apply,
  Map,
  Sqrt,
  Denominator,
  Form,
  _,
  Eval,
  equal,
  less,
  copy,
  same,
  toString,
  addRule,
  $,
  $$,
  latex,
} = Kernel;
const coeffs = (pol, x = Literal("x")) => {
  const co = {};
  let degree = 0;
  const add = (n, c) => {
    degree = Math.max(n, degree);
    if (co[n]) co[n] = Eval(Plus(co[n], c));
    else co[n] = Eval(c);
  };
  pol = Eval(Expand(pol));
  if (!same(pol, Plus())) pol = Plus(pol);
  for (let i = 1; i < pol.length; ++i) {
    let t = pol[i];
    if (!same(t, Times())) t = Times(t);
    let flag = true;
    for (let j = 1; j < t.length; ++j) {
      let c = t[j];
      if (same(c, Power())) {
        if (equal(c[1], x)) {
          add(c[2][1], Divide(t, Power(c[1], c[2])));
          flag = false;
          break;
        }
      } else if (equal(c, x)) {
        add(1, Divide(t, x));
        flag = false;
        break;
      }
    }
    if (flag) add(0, t);
  }
  co.degree = degree;
  return co;
};
const univariate = (ex, x) => {
  const co = coeffs(ex, x);
  let r = [];
  for (let i = 0; i <= co.degree; ++i)
    if (co[i]) r.push(co[i]);
    else r.push(Integer(0));
  return r;
};
const degree = (poly) => poly.length - 1;
const horner = (poly, x) => {
  const deg = degree(poly);
  let r = poly[deg];
  for (let i = deg - 1; i >= 0; --i) {
    r = Eval(Expand(Plus(poly[i], Times(r, x))));
  }
  return r;
};
const briotRuffini = (poly, x) => {
  const deg = degree(poly);
  let r = poly[deg];
  let b = [r];
  for (let i = deg - 1; i >= 0; --i) {
    r = Eval(Expand(Plus(poly[i], Times(r, x))));
    b.push(r);
  }
  b.reverse();
  return b;
};
const polyTranslate = (poly, a) => {
  const deg = degree(poly);
  let r = [];
  for (let i = 0; i < deg; ++i) {
    poly = briotRuffini(poly, a);
    r.push(poly[0]);
    poly = poly.slice(1);
  }
  r.push(poly[0]);
  return r;
};
const depressedQuartic = (poly) => {
  const deg = degree(poly);
  if (deg != 4) throw "Not a quartic.";
  const a = poly[4];
  const b = poly[3];
  const r = polyTranslate(poly, Eval(Divide(b, Times(-4, a))));
  for (let i = 0; i <= 4; ++i) r[i] = Eval(Divide(r[i], a));
  return r;
};
const rationalRoots = (ipoly) => {
  let deg = degree(ipoly);
  let dist = {};
  function* candidates(a0, an) {
    for (let p of divisors(a0))
      for (let q of divisors(an)) {
        const t = Eval(Divide(p, q));
        const ts = toString(t);
        if (!dist[ts]) {
          dist[ts] = true;
          yield t;
        }
      }
  }
  let r = [];
  let zero = false;
  while (equal(ipoly[0], Integer(0))) {
    ipoly = ipoly.slice(1);
    deg = deg - 1;
    zero = true;
  }
  if (zero) r.push(Integer(0));
  for (let t of candidates(ipoly[0][1], ipoly[deg][1])) {
    if (equal(horner(ipoly, t), Integer(0))) r.push(t);
  }
  return r;
};
const toExpression = (poly, x = Literal("x")) => {
  const deg = degree(poly);
  let r = Plus();
  for (let i = 0; i <= deg; ++i) {
    r.push(Times(poly[i], Power(x, i)));
  }
  return Eval(r);
};
const clearDenominators = (poly) => {
  const den = poly.map((a) => Eval(Denominator(a))[1]);
  const lm = den.reduce((a, b) => lcm(a, b));
  return poly.map((a) => Eval(Times(lm, a)));
};
const factorRationalRoots = (ipoly, roots) => {
  const deg = degree(ipoly);
  const rm = [];
  for (let i = 0; i < roots.length; ++i) {
    let mul = 0;
    while (true) {
      const div = briotRuffini(ipoly, roots[i]);
      if (equal(div[0], Integer(0))) {
        mul = mul + 1;
        ipoly = div.slice(1);
      } else break;
    }
    rm.push([roots[i], mul]);
  }
  return { roots: rm, rest: ipoly };
};
const realQuadratic = (poly2) => {
  const a = poly2[2];
  const b = poly2[1];
  const c = poly2[0];
  console.log(a, b, c);
  const delta = Eval(Subtract(Power(b, 2), Times(4, a, c)));
  if (less(delta, Integer(0))) return [];
  if (equal(delta, Integer(0))) {
    return [[Divide(Times(-1, b), Times(2, a)), 2]];
  }
  const r1 = Divide(Plus(Times(-1, b), Sqrt(delta)), Times(2, a));
  const r2 = Divide(Subtract(Times(-1, b), Sqrt(delta)), Times(2, a));
  return [
    [r1, 1],
    [r2, 1],
  ];
};
const factorRational = (ex, x = Literal("x")) => {
  let poly = univariate(ex, x);
  const deg = degree(poly);
  const an = poly[deg];
  poly = clearDenominators(poly);
  const lm = Eval(Divide(poly[deg], an));
  const r = rationalRoots(poly);
  let { roots, rest } = factorRationalRoots(poly, r);
  if (degree(rest) == 2) {
  }
  const fact = Times();
  for (let i = 0; i < roots.length; ++i)
    fact.push(Power(Subtract(x, roots[i][0]), Integer(roots[i][1])));
  fact.push(toExpression(rest, x), Divide(1, lm));
  return Eval(fact);
};
let Polynomial = {
  coeffs,
  horner,
  polyTranslate,
  briotRuffini,
  depressedQuartic,
  rationalRoots,
  univariate,
  toExpression,
  clearDenominators,
  factorRational,
};

export default Polynomial;
