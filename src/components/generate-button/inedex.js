import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Guacyra from "../../lib/Guacyra1/guacyra";
import Formatting from "../../lib/guacyra/Formatting";
import LA from "../../lib/guacyra/LinearAlgebra";
import {
  reducedRowEchelonForm,
  checkIdentityMatrix,
} from "../../lib/matrix-utils/matrixUtils";

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
    reducedMatrix,
    setReducedMatrix,
    independentVectorsInfo,
    setIndependentVectorsInfo,
  } = useContext(UserContext);

  const { Matrix, reducedRowEchelonSteps } = LA;

  const { formatEchelonSteps } = Formatting;

  function reduceMatrix() {
    const redMatrix = reducedRowEchelonForm(matrix);
    const message = checkIdentityMatrix(redMatrix);
    console.log(message);
    setIndependentVectorsInfo(`${message}`);

    console.log(
      formatEchelonSteps(Matrix(matrix), {
        method: reducedRowEchelonSteps,
      })
    );

    setOutputContent(
      `${formatEchelonSteps(Matrix(matrix), {
        method: reducedRowEchelonSteps,
      })}`
    );
  }

  function handleClick() {
    setOutputVerify(true);
    reduceMatrix();
  }

  return <Button onClick={handleClick}>Calcular</Button>;
}
