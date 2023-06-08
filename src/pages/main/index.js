import { Box } from "@mui/material";
import MatrixBox from "../../components/matrix-input-box/MatrixBox";
import PlusMinusButtons from "../../components/plus-minus-button";
import GenerateButton from "../../components/generate-button/inedex";
import Output from "../../components/output";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function MainPage() {
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

	return (
		<Box>
			<PlusMinusButtons parameter="rows" />
			<PlusMinusButtons parameter="columns" />
			<GenerateButton />
			<MatrixBox />
			{outputVerify == true ? <Output /> : null}
		</Box>
	);
}

export default MainPage;
