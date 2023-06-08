import Kernel from "./Guacyra";
import LA from "./LinearAlgebra";
import Polynomial from "./Polynomial";

const {
  Integer,
  Divide,
  Times,
  Plus,
  Eval,
  Subtract,
  Expand,
  latex,
  tex,
  md,
  html,
} = Kernel;

const { Matrix, size, rowEchelonSteps, del } = LA;
const { toExpression } = Polynomial;

function texmd() {
  var string = String.raw.apply(String, arguments);

  var display_maths = [];
  string = string.replace(/\$\$([^\$]*)\$\$/g, (s, m) => {
    var i = display_maths.push(m) - 1;
    return `\n\n<div class="dmath" n="${i}"></div>\n\n`;
  });

  var inline_maths = [];
  string = string.replace(/\$([^\$]*)\$/g, (s, m) => {
    var i = inline_maths.push(m) - 1;
    return `<span class="imath" n="${i}"></span>`;
  });

  var node = string;

  console.log("node ---: " + node);

  //md([string]);

  // node.querySelectorAll("span.imath").forEach((span) => {
  //   var i = parseInt(span.attributes.n.value);
  //   if (inline_maths[i] === undefined) throw "What?";
  //   span.appendChild(tex`${inline_maths[i]}`);
  //   span.style["font-size"] = ".95em";
  // });

  // node.querySelectorAll("div.dmath").forEach((div) => {
  //   var i = parseInt(div.attributes.n.value);
  //   div.appendChild(tex.block`${display_maths[i]}`);
  //   div.style["font-size"] = ".95em";
  // });

  return node;
}
const collapsible = (sdiv, options = {}) => {
  let { showText = "Mostrar", hideText = "Ocultar" } = options;
  const text = html`<div />`;
  const button = html`<button>${showText}</button>`;
  text.appendChild(button);
  const div = html`<div style="display: none;" />`;
  button.addEventListener("click", () => {
    if (div.style.display == "block") {
      button.textContent = showText;
      div.style.display = "none";
    } else {
      button.textContent = hideText;
      div.style.display = "block";
    }
  });
  text.appendChild(div);
  div.appendChild(sdiv);
  return text;
};
const formatMatrix = (A, bra = ["[", "]"]) => {
  const [m, n] = size(A);
  const cc = "r".repeat(n);
  let r = "";
  r = r + `\\left${bra[0]}\\begin{array}{${cc}}`;
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      r = r + latex(A[i][j]);
      if (j != n) r = r + "&";
    }
    if (i != m) r = r + "\\\\";
  }
  r = r + `\\end{array}\\right${bra[1]}`;
  return r;
};
const formatSystem = (A, vars) => {
  const [m, n] = size(A);
  const cc = "r".repeat(3);
  let r = "";
  r = r + `\\left\\{\\begin{array}{${cc}}`;
  for (let i = 1; i <= m; ++i) {
    let lh = Integer(0);
    for (let j = 1; j <= n - 1; ++j)
      lh = Eval(Plus(lh, Times(A[i][j], vars[j - 1])));
    r = r + latex(lh) + " & = & " + latex(A[i][n]);
    if (i != m) r = r + "\\\\";
  }
  r = r + "\\end{array}\\right.";
  return r;
};
const formatEchelonSteps = (A, options = {}) => {
  let { method = rowEchelonSteps, format = (m) => formatMatrix(m) } = options;
  let last;
  let r = "";
  for (let s of method(A)) {
    if (s.op === "pivot") {
      continue;
    }
    if (s.op === "init") {
      last = format(s.A);
      continue;
    }
    const ta = format(s.A);
    const tt = s.text;
    r = r + String.raw`$$ ${last} \;\underrightarrow{${tt}}\;${ta} $$`;
    last = ta;
  }
  return r;
};
const formatBackSubst = (U, options = {}) => {
  const [m, n] = size(U);
  let { vars = ["x", "y", "z", "w"] } = options;
  const sol = Matrix(1, m);
  let r = "\\begin{aligned}";
  for (let i = m; i >= 1; --i) {
    let l = "";
    l =
      l +
      vars[i - 1] +
      "& = " +
      latex(Eval(Divide(1, U[i][i]))) +
      "\\left(" +
      latex(U[i][n]);
    let s = U[i][n];
    for (let j = i + 1; j <= m; ++j) {
      l =
        l +
        "-" +
        "\\left(" +
        latex(U[i][j]) +
        "\\right)" +
        "\\overbrace{\\left(" +
        latex(sol[1][j]) +
        "\\right)}^{" +
        vars[j - 1] +
        "}";
      s = Eval(Subtract(s, Times(U[i][j], sol[1][i + 1])));
    }
    sol[1][i] = Eval(Expand(Times(Divide(1, U[i][i]), s)));
    l = l + "\\right) = " + latex(sol[1][i]);
    r = r + l + "\\\\";
  }
  r = r + "\\end{aligned}";
  return `$$ ${r} $$`;
  //return sol;
};
const formatLaplaceRow = (A, i0) => {
  const [m, n] = size(A);
  let r = formatMatrix(A, ["|", "|"]);
  r = r + "=";
  for (let j = 1; j <= n; ++j) {
    const s = (-1) ** (i0 + j);
    r = r + (s < 0 ? "-" : "+");
    r = r + `(${latex(A[i0][j])})` + formatMatrix(del(A, i0, j), ["|", "|"]);
  }
  return r;
};
const formatPoly = (poly, x) => {
  return latex(toExpression(poly, x));
};
const Formatting = {
  collapsible,
  texmd,
  formatMatrix,
  formatSystem,
  formatEchelonSteps,
  formatBackSubst,
  formatLaplaceRow,
  formatPoly,
};

export default Formatting;
