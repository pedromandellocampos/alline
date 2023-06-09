function reducedRowEchelonForm(matrix) {
  const A = matrix.map((row) => [...row]); // Cria uma cópia da matriz de entrada

  const m = A.length;
  const n = A[0].length;

  let ii = 0;
  for (let j = 0; j < n; ++j) {
    let i = ii;
    while (i < m && A[i][j] === 0) {
      i++;
    }
    if (i === m) continue;
    if (i !== ii) {
      [A[ii], A[i]] = [A[i], A[ii]];
    }
    const pivot = A[ii][j];
    if (pivot !== 0) {
      A[ii] = A[ii].map((element) => element / pivot);
    }
    for (let k = 0; k < m; ++k) {
      if (k === ii) continue;
      const factor = A[k][j];
      for (let l = 0; l < n; ++l) {
        A[k][l] -= factor * A[ii][l];
      }
    }
    ii++;
  }

  return A;
}

function convertToFractionLatex(value) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  const tolerance = 1.0e-6;
  let numerator = 1;
  let denominator = 1;
  let x = value;

  while (Math.abs(value - numerator / denominator) > tolerance) {
    if (value > numerator / denominator) {
      numerator++;
    } else {
      denominator++;
    }
  }

  return "\\frac{" + numerator + "}{" + denominator + "}";
}

function getColumns(matrix, columnIndices) {
  const columns = [];
  console.log("TESTESSS");
  console.log(columnIndices);

  for (let j = 0; j < columnIndices.length; j++) {
    const columnIndex = columnIndices[j];
    const column = [];

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      console.log("Teste ----" + row);
      column.push(convertToFractionLatex(row[columnIndex - 1]));
    }

    columns.push(column);
  }

  return columns;
}

function generateLinearEquationsLatex(vectorIndices, linearCombinations) {
  let equations = "";

  for (let i = 0; i < vectorIndices.length; i++) {
    const index = vectorIndices[i];
    const linearCombination = linearCombinations[i];

    const equation = generateLinearCombinationEquationLatex(
      index,
      linearCombination
    );
    equations += equation;
  }

  return equations;
}

function generateLinearCombinationEquationLatex(index, linearCombination) {
  let equation = "Vetor_{" + index + "} = ";

  for (let i = 0; i < linearCombination.length; i++) {
    const coefficient = linearCombination[i];
    equation += coefficient + " \\cdot Vetor_{" + (i + 1) + "}";

    if (i < linearCombination.length - 1) {
      equation += " + ";
    }
  }

  return `$$${equation}$$`;
}

function checkIdentityMatrix(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  console.log("entrou");
  console.log(matrix);

  let dependentVectors = [];

  for (let i = 0; i < m; i++) {
    let isDependent = false;
    for (let j = 0; j < n; j++) {
      if (i === j) {
        if (matrix[i][j] !== 1) {
          dependentVectors.push(j + 1);
          isDependent = true;
        }
      } else {
        if (matrix[i][j] !== 0) {
          dependentVectors.push(j + 1);
          isDependent = true;
        }
      }
    }
    if (isDependent) {
      break;
    }
  }

  if (dependentVectors.length > 0) {
    const colunas = getColumns(matrix, dependentVectors);
    console.log(colunas);

    return generateLinearEquationsLatex(dependentVectors, colunas);
  } else {
    return "Os vetores são linearmente independentes";
  }
}

export { reducedRowEchelonForm, checkIdentityMatrix };
