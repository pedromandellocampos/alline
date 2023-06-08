import { Box } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

function Output() {
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

	return <Box>{outputContent}</Box>;
}

export default Output;
