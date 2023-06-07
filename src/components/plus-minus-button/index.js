import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

function PlusMinusButtons({ parameter }) {
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
	} = useContext(UserContext);

	function handleClick(operation) {
		console.log("entrou");
		if (parameter == "rows") {
			setRowsNumber(rowsNumber + 1 * operation);
			console.log(rowsNumber);
		} else if (parameter == "columns") {
			setColumnsNumber(columnsNumber + 1 * operation);
			console.log(columnsNumber);
		}
	}

	return (
		<ButtonGroup
			variant="contained"
			aria-label="outlined primary button group"
		>
			<Button onClick={(event) => handleClick(1)}>+</Button>
			<Button onClick={(event) => handleClick(-1)}>-</Button>
		</ButtonGroup>
	);
}

export default PlusMinusButtons;
