import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import LinearAlgebra from "../../lib/guacyra-main/src/linearAlgebra";
import Formatting from "../../lib/guacyra-main/src/formatting";

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
} = LinearAlgebra;

const { texmd, formatMatrix, formatSystem, formatEchelonSteps } = Formatting;

function GenerateButton() {
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

	function reduceMatrix() {
		setOutputContent(
			texmd`${formatEchelonSteps(matrix, {
				method: reducedRowEchelonSteps,
			})}`
		);
	}

	function handleClick() {
		setOutputVerify(true);
		console.log(reduceMatrix());
	}

	return <Button onClick={handleClick}>Calcular</Button>;
}

export default GenerateButton;
