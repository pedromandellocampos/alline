const Guacyra = {};
function GuacyraObj(name, attr) {
  this.name = name;
  this.up = [];
  this.down = [];
  this.attr = attr;
}

const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
  613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
  821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
  919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019,
  1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097,
  1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201,
  1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291,
  1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409,
  1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487,
  1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579,
  1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667,
  1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777,
  1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877,
  1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993,
  1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083,
  2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179,
  2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287,
  2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381,
  2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473,
  2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609,
  2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693,
  2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789,
  2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887,
  2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001,
  3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119,
  3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229,
  3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331,
  3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457,
  3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541,
  3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637,
  3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739,
  3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853,
  3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947,
  3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073,
  4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177,
  4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273,
  4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409,
  4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517,
  4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639,
  4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733,
  4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871,
  4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969,
  4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077,
  5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189,
  5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309,
  5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431,
  5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521,
  5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651,
  5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743,
  5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851,
  5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981,
  5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091,
  6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211,
  6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311,
  6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397,
  6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553,
  6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673,
  6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781,
  6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883,
  6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991,
  6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121,
  7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237,
  7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369,
  7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507,
  7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589,
  7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699,
  7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829,
  7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919,
];

//Form constructor
const Form = (name, attr = {}) => {
  const obj = new GuacyraObj(name, attr);
  const fn = (...ex) => {
    if (obj.attr.atom) return [obj, ...ex];
    ex = ex.map((o) => {
      switch (typeof o) {
        case "string":
          return Guacyra.Literal(o);
        case "number":
          return Guacyra.Integer(o);
        case "function":
          return Guacyra.Function(o);
        case "object":
          if (Array.isArray(o) && !(o[0] instanceof GuacyraObj)) {
            return Guacyra.List(...o);
          } else return o;
        default:
          return o;
      }
    });
    return [obj, ...ex];
  };
  Guacyra[name] = fn;
  return fn;
};
//Forms
const Integer = Form("Integer", { atom: true });
const Rational = Form("Rational", { atom: true });
const Literal = Form("Literal", { atom: true });
const Function = Form("Function", { atom: true });
const Complex = Form("Complex");
const Conjugate = Form("Conjugate");
const Abs = Form("Abs");
const I = Form("I", { symbol: true });
const List = Form("List");
const Plus = Form("Plus", { flat: true, orderless: true });
const Times = Form("Times", { flat: true, orderless: true });
const Divide = Form("Divide");
const Subtract = Form("Subtract");
const Power = Form("Power");
const Expand = Form("Expand");
const Cat = Form("Cat");
const Apply = Form("Apply");
const Map = Form("Map");
const Sqrt = Form("Sqrt");
const NumeratorDenominator = Form("NumeratorDenominator");
const Numerator = Form("Numerator");
const Denominator = Form("Denominator");
const Together = Form("Together");
const Sequence = Form("Sequence");
const Blank = Form("Blank");
const BlankSequence = Form("BlankSequence");
const BlankNullSequence = Form("BlankNullSequence");
const Hold = Form("Hold", { holdAll: true });
const LaTeX = Form("LaTeX", { holdAll: true });
//Kernel
const isAtom = (e) => e[0].attr.atom === true;
const same = (a, b) => a[0] === b[0];
const apply = (h, e) => (e[0] = h()[0]);
const every = (e, f) => {
  for (let i = 1; i < e.length; ++i) if (!f(e[i], i, e)) return false;
  return true;
};
const some = (e, f) => {
  for (let i = 1; i < e.length; ++i) if (f(e[i], i, e)) return true;
  return false;
};
const forEach = (e, f) => {
  for (let i = 1; i < e.length; ++i) f(e[i], i, e);
};
const copy = (e) => {
  if (isAtom(e)) return e;
  let r = [];
  r.push(e[0]);
  forEach(e, (x) => r.push(copy(x)));
  return r;
};
const equal = (a, b) => {
  if (!same(a, b)) return false;
  if (a.length != b.length) return false;
  if (isAtom(a) && isAtom(b)) {
    return every(a, (x, i) => x === b[i]);
  } else if (!isAtom(a) && !isAtom(b)) {
    return every(a, (x, i) => equal(x, b[i]));
  }
  return false;
};
const has = (ex, subex) => {
  if (isAtom(ex)) return equal(ex, subex);
  if (equal(ex, subex)) return true;
  return some(ex, (x) => has(x, subex));
};
const subst = (ex, sub) => {
  if (isAtom(ex)) {
    if (same(ex, Literal()) && sub[ex[1]]) return copy(sub[ex[1]]);
    else return ex;
  } else {
    const r = [];
    r.push(ex[0]);
    forEach(ex, (x) => r.push(subst(x, sub)));
    return r;
  }
};
const match = (ex, pat, cap) => {
  const matchR = (ex, pat, cap) => {
    if (isAtom(pat)) return equal(ex, pat);
    if (same(pat, Blank())) {
      const name = pat[1] ? pat[1][1] : undefined;
      const head = pat[2] ? pat[2][1] : undefined;
      if (head && ex[0].name !== head) return false;
      if (!name) return true;
      const en = cap[name];
      if (en) return equal(ex, en);
      cap[name] = ex;
      return true;
    }
    if (!same(ex, pat)) return false;
    for (let i = 1; i < pat.length; ++i) {
      if (
        (same(pat[i], BlankNullSequence()) || same(pat[i], BlankSequence())) &&
        i != pat.length - 1
      )
        throw "BlankSequence not at last";
      if (
        same(pat[i], BlankNullSequence()) ||
        (same(pat[i], BlankSequence()) && i < ex.length)
      ) {
        const name = pat[i][1] ? pat[i][1][1] : undefined;
        const head = pat[i][2] ? pat[i][2][1] : undefined;
        const exr = Sequence();
        for (let j = i; j < ex.length; ++j) {
          exr.push(ex[j]);
          if (head && ex[j][0].name !== head) return false;
        }
        if (!name) return true;
        const en = cap[name];
        if (en) return equal(exr, en);
        cap[name] = exr;
        return true;
      }
      if (i == ex.length) return false;
      if (!match(ex[i], pat[i], cap)) return false;
    }
    if (pat.length < ex.length) return false;
    return true;
  };
  const cap2 = {};
  const r = matchR(ex, pat, cap2);
  if (r) Object.assign(cap, cap2);
  return r;
};
const isNumeric = (e) => same(e, Integer()) || same(e, Rational());
const isNumericEx = (e) => {
  if (isAtom(e)) return isNumeric(e);
  return every(e, (x) => isNumericEx(x));
};
const value = (e) => (same(e, Rational()) ? e[1] / e[2] : e[1]);
const less = (a, b) => {
  if (isNumeric(a) && isNumeric(b)) return value(a) < value(b);
  if (isNumeric(a) && same(b, Complex())) return true;
  if (same(a, Complex()) && isNumeric(b)) return false;
  if (same(a, Complex()) && same(b, Complex())) {
    if (equal(a[1], b[1])) return less(a[2], b[2]);
    return less(a[1], b[1]);
  }
  if (same(a, Complex())) return true;
  if (same(b, Complex())) return false;
  if (same(a, Literal()) && same(b, Literal())) return a[1] < b[1];
  if (
    (same(a, Plus()) && same(b, Plus())) ||
    (same(a, Times()) && same(b, Times()))
  ) {
    let m = a.length - 1;
    let n = b.length - 1;
    while (m >= 1 && n >= 1) {
      if (equal(a[m], b[n])) {
        m = m - 1;
        n = n - 1;
      } else {
        return less(a[m], b[n]);
      }
    }
    return m < n;
  }
  if (same(a, Power()) && same(b, Power())) {
    if (equal(a[1], b[1])) return less(a[2], b[2]);
    return less(a[1], b[1]);
  }
  if (same(a, b)) {
    let m = a.length;
    let n = b.length;
    let i = 1;
    while (i < m && i < n) {
      if (equal(a[i], b[i])) {
        i = i + 1;
      } else return less(a[i], b[i]);
    }
    return m < n;
  }
  if (isNumeric(a) && !isNumeric(b)) return true;
  else if (!isNumeric(a) && isNumeric(b)) return false;
  if (same(a, Times())) return less(a, Times(b));
  else if (same(b, Times())) return less(Times(a), b);
  if (same(a, Power())) return less(a, Power(b, 1));
  else if (same(b, Power())) return less(Power(a, 1), b);
  if (same(a, Plus())) return less(a, Plus(b));
  else if (same(b, Plus())) return less(Plus(a), b);
};
const lessMath = (a, b) => {
  if (isNumeric(a) && isNumeric(b)) return value(a) < value(b);
  if (same(a, Literal()) && same(b, Literal())) return a[1] < b[1];
  if (
    (same(a, Plus()) && same(b, Plus())) ||
    (same(a, Times()) && same(b, Times()))
  ) {
    let m = a.length - 1;
    let n = b.length - 1;
    while (m >= 1 && n >= 1) {
      if (equal(a[m], b[n])) {
        m = m - 1;
        n = n - 1;
      } else {
        return lessMath(a[m], b[n]);
      }
    }
    return m < n;
  }
  if (same(a, Power()) && same(b, Power())) {
    if (equal(a[2], b[2])) return lessMath(a[1], b[1]);
    return lessMath(b[2], a[2]);
  }
  if (same(a, b)) {
    let m = a.length;
    let n = b.length;
    let i = 1;
    while (i < m && i < n) {
      if (equal(a[i], b[i])) {
        i = i + 1;
      } else return lessMath(a[i], b[i]);
    }
    return m < n;
  }
  if (same(a, Times())) return lessMath(a, Times(b));
  else if (same(b, Times())) return lessMath(Times(a), b);
  if (same(a, Power())) return lessMath(a, Power(b, 1));
  else if (same(b, Power())) return lessMath(Power(a, 1), b);
  if (same(a, Plus())) return lessMath(a, Plus(b));
  else if (same(b, Plus())) return lessMath(Plus(a), b);
  if (isNumeric(a) && !isNumeric(b)) return false;
  else if (!isNumeric(a) && isNumeric(b)) return true;
};
const Eval = (e) => {
  if (isAtom(e)) return e;
  let ex = [];
  if (e[0].attr.holdAll) {
    forEach(e, (x) => ex.push(x));
  } else {
    forEach(e, (x, i) => {
      if (i == 1 && e[0].attr.holdFirst) ex.push(x);
      else ex.push(Eval(x));
    });
  }
  if (!e[0].attr.sequenceHold) {
    let i = 0;
    while (i < ex.length) {
      let exi = ex[i];
      if (same(exi, Sequence())) {
        ex.splice(i, 1);
        forEach(exi, (x, j) => ex.splice(i + j - 1, 0, x));
        i = i + exi.length - 1;
      } else i = i + 1;
    }
  }
  if (e[0].attr.flat) {
    let i = 0;
    while (i < ex.length) {
      let exi = ex[i];
      if (same(exi, e)) {
        ex.splice(i, 1);
        forEach(exi, (x, j) => ex.splice(i + j - 1, 0, x));
        i = i + exi.length - 1;
      } else i = i + 1;
    }
  }
  if (e[0].attr.orderless) ex.sort((a, b) => (less(a, b) ? -1 : 1));
  ex.splice(0, 0, e[0]);
  let tex;
  for (let i = 1; i < ex.length; ++i) {
    let exi = ex[i];
    for (let j = 0; j < exi[0].up.length; ++j) {
      tex = exi[0].up[j](ex);
      if (tex) {
        return Eval(tex);
      }
    }
  }
  for (let j = 0; j < ex[0].down.length; ++j) {
    tex = ex[0].down[j](ex);
    if (tex) {
      return Eval(tex);
    }
  }
  return ex;
};
const addRule = (rule, fn, up) => {
  let tab;
  if (up) tab = up[0].up;
  else tab = rule[0].down;
  tab.push((ex) => {
    let cap = {};
    if (match(ex, rule, cap)) return fn(cap);
    return null;
  });
};
const toString = (e) => {
  if (same(e, Integer())) return e[1].toString();
  if (same(e, Rational())) return `Rational(${e[1]}, ${e[2]})`;
  if (same(e, Literal())) return "'" + e[1] + "'";
  if (same(e, Function())) {
    if (e[1].name === "fn") return e[1]()[0].name;
    else return e[1].toString();
  }
  let r = e[0].name + "(";
  forEach(e, (x, i) => {
    if (i != 1) r = r + ",";
    r = r + toString(x);
  });
  return r + ")";
};
const Bl = (b) => {
  const s = b.split("_");
  switch (s.length) {
    case 2:
      return Blank(s[0], s[1]);
    case 3:
      return BlankSequence(s[0], s[2]);
    case 4:
      return BlankNullSequence(s[0], s[3]);
  }
};
//Parser
const tokenizer = (str) => {
  const lex = [
    [/^(\s+)(.*)/, "Space"],
    [/^([A-Za-z_][\w_]*)\((.*)/, "Form"],
    [/^(\d+)(.*)/, "Integer"],
    [/^([A-Za-z_][\w_]*)(.*)/, "Literal"],
    [/^(\+)(.*)/, "Plus"],
    [/^(\-)(.*)/, "Minus"],
    [/^(\*)(.*)/, "Times"],
    [/^(\/)(.*)/, "Divide"],
    [/^(\^)(.*)/, "Power"],
    [/^(\()(.*)/, "Left"],
    [/^(\))(.*)/, "Right"],
    [/^(,)(.*)/, "Comma"],
  ];
  let s = str;
  const r = [];
  while (s) {
    for (let i = 0; i < lex.length; ++i) {
      let m = s.match(lex[i][0]);
      if (m) {
        const l = lex[i][1];
        if (l !== "Space") r.push([l, m[1]]);
        s = m[2];
        break;
      }
    }
  }
  r.push(["End", ""]);
  return r;
};
const parse = (str) => {
  const l = tokenizer(str);
  let it = 0;
  const next = () => l[it][0];
  const nextnext = () => l[it + 1][0];
  const value = () => l[it][1];
  const consume = () => (it = it + 1);
  const expect = (tok) => {
    if (next() === tok) consume();
    else throw `next = ${next()}, ${tok} expected.`;
  };
  let Eparser, Exp, P;
  const isBinary = (tok) => {
    return (
      tok === "Plus" ||
      tok === "Minus" ||
      tok === "Times" ||
      tok === "Divide" ||
      tok === "Power"
    );
  };
  const isTerminal = (tok) => {
    return tok === "Integer" || tok === "Literal";
  };
  const binary = (tok) => {
    if (tok === "Minus") return "Subtract";
    return tok;
  };
  const isUnary = (tok) => {
    return tok === "Minus";
  };
  const unary = (tok) => {
    return "Unary" + tok;
  };
  const associativity = (op) => {
    if (op === "Power") return "Right";
    else return "Left";
  };
  const prec = (op) => {
    switch (op) {
      case "UnaryMinus":
        return 2;
      case "Plus":
        return 1;
      case "Subtract":
        return 1;
      case "Times":
        return 3;
      case "Divide":
        return 3;
      case "Power":
        return 4;
    }
  };
  Eparser = () => {
    const t = Exp(0);
    expect("End");
    return t;
  };
  Exp = (p) => {
    let t = P();
    while (isBinary(next()) && prec(binary(next())) >= p) {
      const op = binary(next());
      consume();
      const q = prec(op) + (associativity(op) === "Right" ? 0 : 1);
      const t1 = Exp(q);
      t = Guacyra[op](t, t1);
    }
    return t;
  };
  P = () => {
    if (isUnary(next())) {
      const op = unary(next());
      consume();
      const q = prec(op);
      const t = Exp(q);
      if (same(t, Integer())) return Integer(-t[1]);
      return Times(-1, t);
    } else if (next() === "Left") {
      consume();
      const t = Exp(0);
      expect("Right");
      return t;
    } else if (next() === "Form") {
      const op = value();
      if (nextnext() === "Right") {
        consume();
        consume();
        return Guacyra[op]();
      }
      let ch = [];
      do {
        consume();
        ch.push(Exp(0));
      } while (next() === "Comma");
      expect("Right");
      return Guacyra[op](...ch);
    } else if (isTerminal(next())) {
      let v = value();
      if (v.includes("_")) {
        const t = Bl(v);
        consume();
        return t;
      }
      let n = next();
      let t;
      if (n === "Integer") {
        t = Integer(Number(v));
      } else if (n === "Literal" && Guacyra[v]) {
        t = Guacyra[v]();
        if (!t[0].attr.symbol) throw "Not a symbol.";
      } else t = Literal(v);
      consume();
      return t;
    } else {
      throw "error";
    }
  };
  return Eparser();
};
function $$() {
  var string = String.raw.apply(String, arguments);
  return parse(string);
}
function $() {
  var string = String.raw.apply(String, arguments);
  return Eval(parse(string));
}
//Functional
addRule($$`Map(f_Function, a_)`, ({ f, a }) => {
  forEach(a, (x, i) => (a[i] = f[1](x)));
  return a;
});
addRule($$`Apply(f_Function, a_)`, ({ f, a }) => {
  a[0] = f[1]()[0];
  return a;
});
addRule($$`Cat(l___)`, ({ l }) => {
  let r = "";
  forEach(l, (x) => (r = r + x[1]));
  return Literal(r);
});
//Arithmetic
addRule($$`Plus()`, () => Integer(0));
addRule($$`Plus(a_)`, ({ a }) => a);
addRule($$`Plus(0, a__)`, ({ a }) => Plus(a));
addRule($$`Plus(a_Integer, b_Integer, c___)`, ({ a, b, c }) =>
  Plus(a[1] + b[1], c)
);
const fracNorm = (num, den) => {
  const g = gcd(num, den);
  num = num / g;
  den = den / g;
  if (den < 0) {
    num = -num;
    den = -den;
  }
  return [num, den];
};
addRule($$`Divide(a_Integer, b_Integer)`, ({ a, b }) => {
  const [num, den] = fracNorm(a[1], b[1]);
  if (den == 1) return Integer(num);
  else return Rational(num, den);
});
addRule($$`Divide(a_, b_)`, ({ a, b }) => Times(a, Power(b, -1)));
addRule($$`Subtract(a_, b_)`, ({ a, b }) => Plus(a, Times(-1, b)));
addRule($$`Plus(a_Integer, b_Rational, c___)`, ({ a, b, c }) =>
  Plus(Divide(a[1] * b[2] + b[1], b[2]), c)
);
addRule($$`Plus(b_Rational, a_Integer, c___)`, ({ a, b, c }) =>
  Plus(Divide(a[1] * b[2] + b[1], b[2]), c)
);
addRule($$`Plus(a_Rational, b_Rational, c___)`, ({ a, b, c }) =>
  Plus(Divide(a[1] * b[2] + b[1] * a[2], a[2] * b[2]), c)
);
addRule($$`Times()`, () => Integer(1));
addRule($$`Times(a_)`, ({ a }) => a);
addRule($$`Times(1, a__)`, ({ a }) => Times(a));
addRule($$`Times(0, a__)`, ({ a }) => Integer(0));
addRule($$`Times(a_Integer, b_Integer, c___)`, ({ a, b, c }) =>
  Times(a[1] * b[1], c)
);
addRule($$`Times(a_Integer, b_Rational, c___)`, ({ a, b, c }) =>
  Times(Divide(a[1] * b[1], b[2]), c)
);
addRule($$`Times(b_Rational, a_Integer, c___)`, ({ a, b, c }) =>
  Times(Divide(a[1] * b[1], b[2]), c)
);
addRule($$`Times(a_Rational, b_Rational, c___)`, ({ a, b, c }) =>
  Times(Divide(a[1] * b[1], a[2] * b[2]), c)
);
addRule($$`I`, () => Complex(0, 1));
addRule($$`Complex(a_, 0)`, ({ a }) => a);
addRule($$`Conjugate(Complex(a_, b_))`, ({ a, b }) => Complex(a, Times(-1, b)));
addRule($$`Conjugate(a_)`, ({ a }) => a);
addRule($$`Abs(a_Integer)`, ({ a }) => Integer(Math.abs(a[1])));
addRule($$`Abs(p_Rational)`, ({ p }) => Rational(Math.abs(p[1]), p[2]));
addRule($$`Abs(Complex(a_, b_))`, ({ a, b }) =>
  Sqrt(Plus(Power(a, 2), Power(b, 2)))
);
addRule($$`Plus(n_Integer, Complex(a_, b_), c___)`, ({ n, a, b, c }) =>
  Plus(Complex(Plus(a, n), b), c)
);
addRule($$`Plus(p_Rational, Complex(a_, b_), c___)`, ({ p, a, b, c }) =>
  Plus(Complex(Plus(a, p), b), c)
);
addRule($$`Plus(Complex(a_,b_), Complex(c_, d_), e___)`, ({ a, b, c, d, e }) =>
  Plus(Complex(Plus(a, c), Plus(b, d)), e)
);
addRule($$`Times(n_Integer, Complex(a_, b_), c___)`, ({ n, a, b, c }) =>
  Times(Complex(Times(n, a), Times(n, b)), c)
);
addRule($$`Times(p_Rational, Complex(a_, b_), c___)`, ({ p, a, b, c }) =>
  Times(Complex(Times(p, a), Times(p, b)), c)
);
addRule(
  $$`Times(Complex(a_, b_), Complex(c_, d_), e___)`,
  ({ a, b, c, d, e }) =>
    Times(
      Complex(
        Subtract(Times(a, c), Times(b, d)),
        Plus(Times(a, d), Times(b, c))
      ),
      e
    )
);
addRule($$`Times(Complex(a_,b_), c_, d___)`, ({ a, b, c, d }) => {
  if (isNumericEx(c)) return Times(Complex(Times(a, c), Times(b, c)), d);
  return null;
});
addRule($$`Plus(Complex(a_,b_), c_, d___)`, ({ a, b, c, d }) => {
  if (isNumericEx(c)) return Plus(Complex(Plus(a, c), b), d);
  return null;
});
addRule($$`Times(-1, Plus(a__))`, ({ a }) => {
  const r = Plus();
  forEach(a, (x) => r.push(Times(-1, x)));
  return r;
});
const ins = (t, a, b) => {
  const sa = toString(a);
  if (!t[sa]) {
    t[sa] = [a, Sequence(b)];
    return false;
  } else {
    t[sa][1].push(b);
    return true;
  }
};
addRule($$`Plus(c__)`, ({ c }) => {
  const r = Plus();
  let flag = false;
  const coefs = {};
  for (let i = 1; i < c.length; ++i) {
    const cap = {};
    if (match(c[i], $$`Times(a_Integer, b_)`, cap))
      flag = ins(coefs, cap.b, cap.a) || flag;
    else if (match(c[i], $$`Times(a_Integer, b__)`, cap))
      flag = ins(coefs, cap.b, cap.a) || flag;
    else if (match(c[i], $$`Times(a_Rational, b_)`, cap))
      flag = ins(coefs, cap.b, cap.a) || flag;
    else if (match(c[i], $$`Times(a_Rational, b__)`, cap))
      flag = ins(coefs, cap.b, cap.a) || flag;
    else if (match(c[i], $$`Times(b__)`, cap))
      flag = ins(coefs, cap.b, Integer(1)) || flag;
    else flag = ins(coefs, c[i], Integer(1)) || flag;
  }
  if (flag) {
    for (let k in coefs) {
      const v = coefs[k];
      apply(Plus, v[1]);
      r.push(Times(v[1], v[0]));
    }
    return r;
  }
  return null;
});
addRule($$`Times(c__)`, ({ c }) => {
  const r = Times();
  let flag = false;
  const coefs = {};
  for (let i = 1; i < c.length; ++i) {
    const cap = {};
    if (match(c[i], $$`Power(a_Integer, b_Rational)`, cap))
      flag = ins(coefs, Power(cap.a, cap.b), Integer(1)) || flag;
    else if (match(c[i], $$`Power(a_, b_)`, cap))
      flag = ins(coefs, cap.a, cap.b) || flag;
    else flag = ins(coefs, c[i], Integer(1)) || flag;
  }
  if (flag) {
    for (let k in coefs) {
      const v = coefs[k];
      apply(Plus, v[1]);
      r.push(Power(v[0], v[1]));
    }
    return r;
  }
  return null;
});
addRule($$`Times(c__)`, ({ c }) => {
  const r = Times();
  let flag = false;
  const coefs = {};
  for (let i = 1; i < c.length; ++i) {
    const cap = {};
    if (match(c[i], $$`Power(a_Integer, b_)`, cap))
      flag = ins(coefs, cap.b, cap.a) || flag;
    else ins(coefs, Integer(1), c[i]);
  }
  if (flag) {
    for (let k in coefs) {
      const v = coefs[k];
      apply(Times, v[1]);
      r.push(Power(v[1], v[0]));
    }
    return r;
  }
  return null;
});
addRule($$`Power(_, 0)`, () => Integer(1));
addRule($$`Power(1, _)`, () => Integer(1));
addRule($$`Power(a_, 1)`, ({ a }) => a);
addRule($$`Power(a_Integer, b_Integer)`, ({ a, b }) => {
  if (b[1] < 0) return Rational(1, Math.pow(a[1], -b[1]));
  else return Integer(Math.pow(a[1], b[1]));
});
addRule($$`Power(a_Rational, b_Integer)`, ({ a, b }) => {
  if (b[1] < 0) return Divide(Math.pow(a[2], -b[1]), Math.pow(a[1], -b[1]));
  else return Rational(Math.pow(a[1], b[1]), Math.pow(a[2], b[1]));
});
const rootContent = (fact, p, q) => {
  let [u, v] = [1, 1];
  for (let i = 0; i < fact.length; ++i) {
    const fip = fact[i][1] * p;
    const prime = fact[i][0];
    const a = Math.floor(fip / q);
    const b = fip - a * q;
    u = u * Math.pow(prime, a);
    v = v * Math.pow(prime, b);
  }
  return [u, v];
};
addRule($$`Power(a_Integer, b_Rational)`, ({ a, b }) => {
  if (a[1] < 0) return null;
  const fact = factorization(a[1]);
  if (b[1] > 0) {
    const [u, v] = rootContent(fact, b[1], b[2]);
    if (u == 1 && b[1] == 1) return null;
    else return Times(u, Power(v, Rational(1, b[2])));
  } else {
    const b1 = -b[1];
    const k = Math.floor(b1 / b[2]);
    const r = b1 - k * b[2];
    const [u, v] = rootContent(fact, b[2] - r, b[2]);
    return Times(Divide(u, Math.pow(a[1], k + 1)), Power(v, Rational(1, b[2])));
  }
});
addRule($$`Power(a_Rational, b_Rational)`, ({ a, b }) =>
  Times(Power(a[1], b), Power(a[2], Rational(-b[1], b[2])))
);
addRule($$`Power(Power(a_, b_), c_Integer)`, ({ a, b, c }) =>
  Power(a, Times(b, c))
);
addRule($$`Power(Times(a__), b_Integer)`, ({ a, b }) => {
  const r = Times();
  forEach(a, (x) => r.push(Power(x, b)));
  return r;
});
addRule($$`Sqrt(a_)`, ({ a }) => Power(a, Rational(1, 2)));
addRule($$`Power(z_Complex, n_Integer)`, ({ z, n }) => {
  let r = Complex(1, 0);
  const p = Math.abs(n[1]);
  for (let i = 0; i < p; ++i) r = Eval(Times(r, z));
  if (n[1] < 0) return Times(Conjugate(r), Divide(1, Power(Abs(r), 2)));
  return r;
});
addRule($$`Numerator(a_Integer)`, ({ a }) => a);
addRule($$`Numerator(a_Rational)`, ({ a }) => Integer(a[1]));
addRule($$`Numerator(a_)`, ({ a }) => a);
addRule($$`Denominator(a_Integer)`, ({ a }) => Integer(1));
addRule($$`Denominator(a_Rational)`, ({ a }) => Integer(a[2]));
addRule($$`Denominator(a_)`, ({ a }) => Integer(1));
addRule($$`NumeratorDenominator(a_Integer)`, ({ a }) => List(a, Integer(1)));
addRule($$`NumeratorDenominator(a_Rational)`, ({ a }) =>
  List(Integer(a[1]), Integer(a[2]))
);
addRule($$`NumeratorDenominator(Power(a_, n_Integer))`, ({ a, n }) => {
  if (n[1] < 0) {
    return List(1, Power(a, -n[1]));
  } else {
    return List(Power(a, n), 1);
  }
});
addRule($$`NumeratorDenominator(Power(a_, n_Rational))`, ({ a, n }) => {
  if (n[1] < 0) {
    return List(1, Power(a, Rational(-n[1], n[2])));
  } else {
    return List(Power(a, n), 1);
  }
});
addRule($$`NumeratorDenominator(Times(a__))`, ({ a }) => {
  const num = Times();
  const den = Times();
  forEach(a, (x) => {
    const f = Eval(NumeratorDenominator(x));
    num.push(f[1]);
    den.push(f[2]);
  });
  return List(num, den);
});
addRule($$`NumeratorDenominator(Plus(a__))`, ({ a }) => {
  const num = Plus();
  const den = Times();
  const t = {};
  const e = List();
  for (let i = 1; i < a.length; ++i) {
    const f = Eval(NumeratorDenominator(a[i]));
    e.push(f);
    const ei = f[2];
    const eis = toString(ei);
    if (!t[eis]) {
      t[eis] = true;
      den.push(ei);
    }
  }
  for (let i = 1; i < a.length; ++i) {
    const r = Eval(Times(copy(den), Divide(e[i][1], e[i][2])));
    num.push(r);
  }
  return List(num, den);
});
addRule($$`NumeratorDenominator(a_)`, ({ a }) => List(a, 1));
addRule($$`Together(a_)`, ({ a }) => {
  const l = Eval(NumeratorDenominator(a));
  if (same(l[2], Integer())) return Divide(l[1], l[2]);
  return Divide(Together(l[1]), Together(l[2]));
});
// Expand
addRule($$`Expand(Times(a__))`, ({ a }) => {
  for (let j = 1; j < a.length; ++j) {
    let cap = {};
    if (match(a[j], $$`Plus(b__)`, cap)) {
      let r = Plus();
      for (let k = 1; k < cap.b.length; ++k) {
        let t = a.slice();
        apply(Times, t);
        t[j] = cap.b[k];
        r.push(Expand(t));
      }
      return r;
    } else if (
      match(a[j], $$`Power(Plus(b__), n_Integer)`, cap) &&
      cap.n[1] > 0
    ) {
      let t = a.slice();
      apply(Times, t);
      t[j] = Expand(Power(Plus(cap.b), cap.n[1]));
      return Expand(t);
    }
  }
  return Times(a);
});
addRule($$`Expand(Power(Plus(a_, b__), n_Integer))`, ({ a, b, n }) => {
  let r = Plus();
  for (let i = 0; i <= n[1]; ++i) {
    r.push(
      Expand(
        Times(binomial(n[1], i), Power(a, n[1] - i), Expand(Power(Plus(b), i)))
      )
    );
  }
  return r;
});
addRule($$`Expand(Plus(a_, b__))`, ({ a, b }) =>
  Plus(Expand(a), Expand(Plus(b)))
);
addRule($$`Expand(a_)`, ({ a }) => a);
// LaTeX
addRule($$`LaTeX()`, ({ a }) => Literal(""));
addRule($$`LaTeX(a_Integer)`, ({ a }) => Literal(`${a[1]}`));
addRule($$`LaTeX(a_Literal)`, ({ a }) => a);
addRule($$`LaTeX(Times(p_Rational, a_Literal))`, ({ p, a }) => {
  if (p[1] < 0) {
    const s = Eval(LaTeX(Times(-p[1], a)))[1];
    return Literal(`-\\frac{${s}}{${p[2]}}`);
  } else {
    const s = Eval(LaTeX(Times(p[1], a)))[1];
    return Literal(`\\frac{${s}}{${p[2]}}`);
  }
});
addRule($$`LaTeX(a_Rational)`, ({ a }) => {
  if (a[1] < 0) return Literal(`-\\frac{${-a[1]}}{${a[2]}}`);
  else return Literal(`\\frac{${a[1]}}{${a[2]}}`);
});
addRule($$`LaTeX(Complex(a_,b_))`, ({ a, b }) => {
  let at = Eval(LaTeX(a))[1];
  if (equal(a, Integer(0))) at = "";
  const bt = Eval(LaTeX(Times(b, Literal("\\mathrm{i}"))))[1];
  if (!bt.startsWith("-") && at !== "") at = at + "+";
  return Literal(`${at}${bt}`);
});
addRule($$`LaTeX(Plus(c__))`, ({ c }) => {
  let r = "";
  let ex = c.slice(1);
  ex.sort((a, b) => (lessMath(a, b) ? -1 : 1));
  for (let i = 0; i < ex.length; ++i) {
    const s = Eval(LaTeX(ex[i]))[1];
    if (!s.startsWith("-") && i != 0) {
      r = r + "+";
    }
    r = r + s;
  }
  return Literal(r);
});
const parenthesisPlus = (c) => {
  let r = "";
  for (let i = 1; i < c.length; ++i) {
    let s = Eval(LaTeX(c[i]))[1];
    if (same(c[i], Plus())) {
      s = "(" + s + ")";
    }
    r = r + s;
  }
  return r;
};
const parenthesisFrac = (c) => {
  const l = Eval(NumeratorDenominator(Times(c)));
  if (same(l[2], Integer())) return parenthesisPlus(c);
  const n = Eval(LaTeX(l[1]))[1];
  const d = Eval(LaTeX(l[2]))[1];
  return `\\frac{${n}}{${d}}`;
};
addRule($$`LaTeX(Times(a_Integer, c__))`, ({ a, c }) => {
  if (a[1] < 0) {
    const r = "-" + Eval(LaTeX(Eval(Times(-a[1], c))))[1];
    return Literal(r);
  } else {
    const r = parenthesisFrac(Eval(Times(a[1], c)));
    return Literal(r);
  }
});
addRule(
  $$`LaTeX(Times(a_Rational, Power(b_Integer, c_Rational), d___))`,
  ({ a, b, c, d }) => {
    if (c[1] == 1 && c[2] == 2) {
      let r = Eval(LaTeX(Power(b, c)))[1];
      let s = parenthesisFrac(d);
      if (a[1] == -1) {
        r = `-\\frac{${r}}{${a[2]}}`;
      } else {
        if (a[1] != 1) r = `${a[1]}` + r;
        r = `\\frac{${r}}{${a[2]}}`;
      }
      return Literal(r + s);
    }
    return null;
  }
);
addRule($$`LaTeX(Times(c__))`, ({ c }) => {
  return Literal(parenthesisFrac(c));
});
addRule($$`LaTeX(Power(a_, b_Rational))`, ({ a, b }) => {
  if (b[1] == 1 && b[2] == 2) {
    let s = Eval(LaTeX(a))[1];
    return Literal(`\\sqrt{${s}}`);
  }
  if (b[1] == -1 && b[2] == 2) {
    let s = Eval(LaTeX(a))[1];
    return Literal(`\\frac{1}{\\sqrt{${s}}}`);
  }
  return null;
});
addRule($$`LaTeX(Power(a_, b_Integer))`, ({ a, b }) => {
  if (b[1] < 0) {
    let s = Eval(LaTeX(Eval(Power(a, -b[1]))))[1];
    return Literal(`\\frac{1}{${s}}`);
  }
  return null;
});
addRule($$`LaTeX(Power(a_, b_))`, ({ a, b }) => {
  let r = "";
  let s = Eval(LaTeX(a))[1];
  if (!(same(a, Literal()) || same(a, Integer()))) {
    s = "(" + s + ")";
  }
  r = r + s + "^{" + Eval(LaTeX(b))[1] + "}";
  return Literal(r);
});
addRule($$`LaTeX(a_)`, ({ a }) => Literal(toString(a)));

function gcd(a, b) {
  return Math.abs(b == 0 ? a : gcd(b, a % b));
}

function factorization(n) {
  const f = [];
  for (let p of primes) {
    let e = 0;
    while (n % p == 0) {
      n = n / p;
      e = e + 1;
    }
    if (e != 0) f.push([p, e]);
    if (n == 1) break;
  }
  if (n == 1) return f;
  else throw "Factorization failed.";
}

function binomial(n, k) {
  if (k > n) return undefined;
  if (k > n / 2) k = n - k;
  let [numer, denom] = [1, 1];
  for (let i = 1; i <= k; ++i) {
    numer = numer * (n - i + 1);
    denom = denom * i;
  }
  return numer / denom;
}

const latex = (e) => Eval(LaTeX(e))[1];
//Exports
Guacyra.toString = toString;
Guacyra.Eval = Eval;
Guacyra.Form = Form;
Guacyra.equal = equal;
Guacyra.value = value;
Guacyra.less = less;
Guacyra.copy = copy;
Guacyra.same = same;
Guacyra.has = has;
Guacyra.subst = subst;
Guacyra.match = match;
Guacyra.addRule = addRule;
Guacyra.parse = parse;
Guacyra.$ = $;
Guacyra.$$ = $$;
Guacyra.latex = latex;

export default Guacyra;
