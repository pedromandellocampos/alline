import Kernel from "./Guacyra";
import NumberAlgo from "./Numbers";
import Random from "./random";

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
  Form,
  _,
  Eval,
  equal,
  copy,
  toString,
  $,
  parse,
  latex,
} = Kernel;

const { nuples, permutations, sign } = NumberAlgo;

const Matrix = (m, n) => {
  const rows = List();
  if (Number.isInteger(m)) {
    if (n == undefined) n = m;
    for (let i = 1; i <= m; ++i) {
      const entries = List();
      for (let j = 1; j <= n; ++j) entries.push(Integer(0));
      rows.push(entries);
    }
  }
  if (Array.isArray(m)) {
    const mm = m;
    m = mm.length;
    n = mm[0].length;
    for (let i = 0; i < m; ++i) {
      const entries = List();
      for (let j = 0; j < n; ++j) {
        let e = mm[i][j];
        switch (typeof e) {
          case "number":
            e = Integer(e);
            break;
          case "string":
            e = Eval(parse(e));
            break;
          default:
        }
        entries.push(e);
      }
      rows.push(entries);
    }
  }
  return rows;
};
const size = (A) => [A.length - 1, A[1].length - 1];
const forEachEntry = (A, f) => {
  const [m, n] = size(A);
  for (let i = 1; i <= m; ++i) for (let j = 1; j <= n; ++j) f(i, j, A);
};
const det = (A) => {
  const [m, n] = size(A);
  if (m == 1) return A[1][1];
  let r = Integer(0);
  const ra = Array.from(Array(m), (_, i) => i + 1);
  for (let p of permutations(ra)) {
    let s = Integer(sign(p));
    for (let i = 1; i <= m; ++i) s = Eval(Times(s, A[i][p[i - 1]]));
    r = Eval(Plus(r, s));
  }
  return r;
};
const tr = (A) => {
  const [m, n] = size(A);
  if (m == 1) return A[1][1];
  let r = Integer(0);
  for (let i = 1; i <= m; ++i) {
    r = Eval(Plus(r, A[i][i]));
  }
  return r;
};
const rowSwap = (A, i1, i2) => {
  const t = A[i1];
  A[i1] = A[i2];
  A[i2] = t;
};
const rowAdd = (A, i1, i2, k) => {
  const [m, n] = size(A);
  for (let j = 1; j <= n; ++j)
    A[i1][j] = Eval(Plus(A[i1][j], Times(k, A[i2][j])));
};
const rowScale = (A, i, k) => {
  const [m, n] = size(A);
  for (let j = 1; j <= n; ++j) A[i][j] = Eval(Times(k, A[i][j]));
};
function* rowEchelonSteps(A) {
  const [m, n] = size(A);
  yield { A: A, op: "init", text: "init" };
  let ii = 1;
  for (let j = 1; j <= n; ++j) {
    let i;
    for (i = ii; i <= m; ++i) if (!equal(A[i][j], Integer(0))) break;
    if (i > m) continue;
    if (i != ii) {
      rowSwap(A, i, ii);
      yield {
        A: A,
        op: "rswap",
        i: i,
        ip: ii,
        text: `L_{${i}}\\leftrightarrow L_{${ii}}`,
      };
    }
    yield { op: "pivot", pivot: [ii, j] };
    for (i = ii + 1; i <= m; ++i) {
      const k = Eval(Times(-1, Divide(A[i][j], A[ii][j])));
      if (equal(k, Integer(0))) continue;
      rowAdd(A, i, ii, k);
      let kt = latex(Times(k, `L_${ii}`));
      if (!kt.startsWith("-")) kt = "+" + kt;
      kt = `L_{${i}}` + kt;
      yield {
        A: A,
        op: "radd",
        i: i,
        ip: ii,
        k: k,
        text: `L_{${i}}\\rightarrow ${kt}`,
      };
    }
    if (ii == m) break;
    ii = ii + 1;
  }
}
function* reducedRowEchelonSteps(A) {
  const [m, n] = size(A);
  yield { A: A, op: "init", text: "init" };
  let ii = 1;
  for (let j = 1; j <= n; ++j) {
    let i;
    for (i = ii; i <= m; ++i) if (!equal(A[i][j], Integer(0))) break;
    if (i > m) continue;
    if (i != ii) {
      rowSwap(A, i, ii);
      yield {
        A: A,
        op: "rswap",
        i: i,
        ip: ii,
        text: `L_{${i}}\\leftrightarrow L_{${ii}}`,
      };
    }
    yield { op: "pivot", pivot: [ii, j] };
    {
      const k = Eval(Divide(1, A[ii][j]));
      if (!equal(k, Integer(1))) {
        let kt = latex(Times(k, `L_${ii}`));
        rowScale(A, ii, k);
        yield {
          A: A,
          op: "rscale",
          i: ii,
          ip: ii,
          k: k,
          text: `L_{${ii}}\\rightarrow ${kt}`,
        };
      }
    }
    for (i = ii - 1; i >= 1; --i) {
      const k = Eval(Times(-1, Divide(A[i][j], A[ii][j])));
      if (equal(k, Integer(0))) continue;
      rowAdd(A, i, ii, k);
      let kt = latex(Times(k, `L_${ii}`));
      if (!kt.startsWith("-")) kt = "+" + kt;
      kt = `L_{${i}}` + kt;
      yield {
        A: A,
        op: "radd",
        i: i,
        ip: ii,
        k: k,
        text: `L_{${i}}\\rightarrow ${kt}`,
      };
    }
    for (i = ii + 1; i <= m; ++i) {
      const k = Eval(Times(-1, Divide(A[i][j], A[ii][j])));
      if (equal(k, Integer(0))) continue;
      rowAdd(A, i, ii, k);
      let kt = latex(Times(k, `L_${ii}`));
      if (!kt.startsWith("-")) kt = "+" + kt;
      kt = `L_{${i}}` + kt;
      yield {
        A: A,
        op: "radd",
        i: i,
        ip: ii,
        k: k,
        text: `L_{${i}}\\rightarrow ${kt}`,
      };
    }
    if (ii == m) break;
    ii = ii + 1;
  }
}
const del = (A, i0, j0) => {
  const [m, n] = size(A);
  const r = Matrix(m - 1, n - 1);
  forEachEntry(r, (i, j) => {
    r[i][j] = A[i + (i >= i0 ? 1 : 0)][j + (j >= j0 ? 1 : 0)];
  });
  return r;
};
const transpose = (A) => {
  const [m, n] = size(A);
  let At = Matrix(n, m);
  forEachEntry(A, (i, j) => {
    At[j][i] = A[i][j];
  });
  return At;
};
const adj = (A) => {
  const [m, n] = size(A);
  const r = Matrix(m, n);
  forEachEntry(A, (i, j) => {
    r[i][j] = Eval(Times((-1) ** (i + j), det(del(A, i, j))));
  });
  return transpose(r);
};
const inverse = (A) => {
  const [m, n] = size(A);
  if (m != n) throw "Not a square matrix.";
  let AI = Matrix(n, 2 * n);
  forEachEntry(A, (i, j) => {
    AI[i][j] = A[i][j];
    AI[i][j + n] = Integer(i == j ? 1 : 0);
  });
  for (let s of reducedRowEchelonSteps(AI)) {
  }
  const r = Matrix(n, n);
  forEachEntry(r, (i, j) => {
    r[i][j] = AI[i][j + n];
  });
  return r;
};
const sum = (A, B) => {
  const [m, n] = size(A);
  let R = Matrix(m, n);
  forEachEntry(R, (i, j) => {
    R[i][j] = Eval(Plus(A[i][j], B[i][j]));
  });
  return R;
};
const prod = (A, B) => {
  const [m, n] = size(A);
  const [n1, p] = size(B);
  if (n != n1) throw "Wrong dimensions.";
  let R = Matrix(m, p);
  forEachEntry(R, (i, j) => {
    let s = Plus();
    for (let k = 1; k <= n; ++k) s.push(Eval(Times(A[i][k], B[k][j])));
    R[i][j] = Eval(s);
  });
  return R;
};
const rankFact = (A) => {
  const [m, n] = size(A);
  const Ac = copy(A);
  const Ai = Matrix(m, m);
  forEachEntry(Ai, (i, j) => (Ai[i][j] = Integer(i == j ? 1 : 0)));
  const pivot = [];
  let r = 0;
  for (let s of reducedRowEchelonSteps(Ac)) {
    if (s.op === "pivot") {
      pivot.push(s.pivot);
      r = r + 1;
    } else if (s.op === "rswap") {
      rowSwap(Ai, s.i, s.ip);
    } else if (s.op === "rscale") {
      rowScale(Ai, s.i, s.k);
    } else if (s.op === "radd") {
      rowAdd(Ai, s.i, s.ip, s.k);
    }
  }
  const C = Matrix(m, r);
  const F = Matrix(r, n);
  for (let i = 1; i <= r; ++i) {
    for (let j = 1; j <= n; ++j) F[i][j] = Ac[i][j];
    for (let j = 1; j <= m; ++j) C[j][i] = A[j][pivot[i - 1][1]];
  }
  return { Ai, C, F, pivot, r }; // Ai*A=[ F ]   A = C*F
  //      [ 0 ]   F_{r\times n}
};
const kernel = (F, pivot) => {
  const [r, n] = size(F);
  let pivotColumn = {};
  for (const p of pivot) pivotColumn[p[1]] = true;
  const K = Matrix(n, n - r);
  let j = 1;
  for (let i = 1; i <= n; ++i) {
    if (pivotColumn[i]) continue;
    K[i][j] = Integer(1);
    for (let k = 1; k <= r; ++k)
      K[pivot[k - 1][1]][j] = Eval(Times(-1, F[k][i]));
    j = j + 1;
  }
  return K;
};
const dot = (u, v) => {
  let n = Integer(0);
  for (let i = 1; i < u.length; ++i) n = Eval(Plus(n, Times(u[i], v[i])));
  return n;
};
const proj = (u, v) => {
  const n = dot(u, v);
  const d = dot(v, v);
  const f = Eval(Divide(n, d));
  const r = List();
  for (let i = 1; i < v.length; ++i) r.push(Eval(Times(f, v[i])));
  return r;
};
const subproj = (r, u, v) => {
  const p = proj(u, v);
  for (let i = 1; i < r.length; ++i) r[i] = Eval(Subtract(r[i], p[i]));
};
const gramSchmidt = (A) => {
  const [m, n] = size(A);
  const G = copy(A);
  for (let i = 2; i <= m; ++i) {
    for (let j = 1; j < i; ++j) subproj(G[i], A[i], G[j]);
  }
  return G;
};
const rowSpaceEqual = (A, B) => {
  const [ma, na] = size(A);
  const [mb, nb] = size(B);
  if (na != nb) return false;
  const da = rankFact(A).r;
  const db = rankFact(B).r;
  if (da != db) return false;
  const C = A.concat(B);
  const dc = rankFact(C).r;
  if (dc == da) return true;
  return false;
};
const { randInteger, randCombination } = Random;
const randLI = (m, n, l) => {
  if (m > n) throw `${m} vectors can not be LI for n=${n}`;
  const R = Matrix(m, n);
  let r;
  do {
    forEachEntry(R, (i, j) => {
      R[i][j] = Integer(randInteger(-l, l));
    });
    r = rankFact(R).r;
  } while (r != m);
  return R;
};
const randRREF = (m, n, l) => {
  let pivot = randCombination(n - 1, m - 1).map((x) => x + 1);
  pivot.unshift(1);
  const F = Matrix(m, n);
  let k = 0;
  for (let j = 1; j <= n; ++j) {
    if (pivot[k] == j) {
      k = k + 1;
      for (let i = 1; i <= m; ++i) F[i][j] = Integer(i == k ? 1 : 0);
    } else {
      let zeroColumn = true;
      do {
        for (let i = 1; i <= k; ++i) {
          let v = randInteger(-l, l);
          if (v != 0) zeroColumn = false;
          F[i][j] = Integer(v);
        }
      } while (zeroColumn);
    }
  }
  pivot = pivot.map((x, i) => [i + 1, x]);
  return { F, pivot };
};
const randEE = (m, n, r, l) => {
  const R = Matrix(m, n);
  const { F, pivot } = randRREF(r, n, l);
  forEachEntry(F, (i, j) => {
    R[i][j] = F[i][j];
  });
  while (pivot.length > 0) {
    const [pi, pj] = pivot.pop();
    for (let i = 1; i <= m; ++i) {
      if (i != pi) {
        const k = Integer(randInteger(-l, l));
        if (!equal(k, Integer(0))) rowAdd(R, i, pi, k);
      }
    }
    {
      const k = Integer(randInteger(-l, l));
      if (!equal(k, Integer(0))) rowScale(R, pi, k);
    }
    let zi = 0;
    for (let i = pi + 1; i <= m; ++i, ++zi) {
      if (!equal(R[i][pj], Integer(0))) {
        break;
      }
    }
    if (zi > 0) rowSwap(R, pi, randInteger(pi + 1, pi + zi));
  }
  return R;
};
const elemRand = (C, kl, nop = 10) => {
  const [m, n] = size(C);
  const distRand = () => {
    let i1 = randInteger(1, m);
    let i2;
    do {
      i2 = randInteger(1, m);
    } while (i1 == i2);
    return [i1, i2];
  };
  for (let i = 0; i < nop; ++i) {
    const o = randInteger(0, 2);
    let ki;
    do {
      ki = randInteger(-kl, kl);
    } while (ki == 0);
    const k = Integer(ki);
    const [i1, i2] = distRand();
    switch (o) {
      case 0:
        rowSwap(C, i1, i2);
        break;
      case 1:
        rowScale(C, i1, k);
        break;
      case 2:
        rowAdd(C, i1, i2, k);
        break;
    }
  }
  return C;
};
let LA = {};
LA = {
  Matrix,
  size,
  det,
  tr,
  inverse,
  transpose,
  prod,
  sum,
  del,
  adj,
  reducedRowEchelonSteps,
  rowEchelonSteps,
  rankFact,
  kernel,
  gramSchmidt,
  randRREF,
  randEE,
  randLI,
  elemRand,
  forEachEntry,
};

export default LA;
