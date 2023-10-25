import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Guacyra from "../../lib/Guacyra1/guacyra";
import Formatting from "../../lib/guacyra/Formatting";
import LA from "../../lib/guacyra/LinearAlgebra";
import {
	reducedRowEchelonForm,
	checkIdentityMatrix,
	returnLinearCombination,
	getColumns,
	arraysToCoordenates,
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
		spaceBases,
		setSpaceBases,
	} = useContext(UserContext);

	const { Matrix, reducedRowEchelonSteps } = LA;
	const { formatEchelonSteps } = Formatting;

	function reduceMatrix() {
		const redMatrix = reducedRowEchelonForm(matrix);
		const message = returnLinearCombination(
			redMatrix,
			checkIdentityMatrix(redMatrix)[0]
		);

		console.log(checkIdentityMatrix(redMatrix)[0]);
		setIndependentVectorsInfo(`${message}`);

		setSpaceBases(
			arraysToCoordenates(
				getColumns(matrix, checkIdentityMatrix(redMatrix)[1])
			)
		);

		setOutputContent(
			`${formatEchelonSteps(Matrix(matrix), {
				method: reducedRowEchelonSteps,
			})}`
		);
	}

	function handleClick() {
		console.log("testinho");
		setOutputVerify(true);
		reduceMatrix();
	}

	return <Button onClick={handleClick}>Calcular</Button>;
}
