import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Guacyra from "../../lib/Guacyra1/guacyra";
import Formatting from "../../lib/guacyra/Formatting";
import LA from "../../lib/guacyra/LinearAlgebra";

export default function GenerateButton() {
  const {
    rowsNumber,
    setRowsNumber,
    rows,
    setRows,
    columnsNumber,
    setColumnsNumber,
    columns,
    setcolumns,
    matrix,
    setMatrix,
    outputContent,
    setOutputContent,
    outputVerify,
    setOutputVerify,
  } = useContext(UserContext);
  const {
    $,
    $$,
    Eval,
    Map,
    Apply,
    Sqrt,
    Plus,
    List,
    Power,
    Cat,
    toString,
    latex,
  } = Guacyra;

  const {
    Matrix,
    rankFact,
    kernel,
    prod,
    transpose,
    gramSchmidt,
    elemRand,
    randRREF,
    randLI,
    randEE,
    reducedRowEchelonSteps,
    rowEchelonSteps,
    del,
  } = LA;

  const { texmd, formatMatrix, formatSystem, formatEchelonSteps } = Formatting;

  function TestGuacyraLaTeX(A) {
    console.log("TESTE: ----  " + reducedRowEchelonSteps(Matrix(A))[0]);
    return formatEchelonSteps(Matrix(A), { method: reducedRowEchelonSteps });
  }

  function reduceMatrix() {
    console.log(TestGuacyraLaTeX());
  }

  function handleClick() {
    setOutputVerify(true);
    setOutputContent(`${TestGuacyraLaTeX(matrix)}`);
  }

  return <Button onClick={handleClick}>Calcular</Button>;
}
