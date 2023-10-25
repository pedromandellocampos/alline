import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

function PlusMinusButtons({ parameter }) {
	const { rowsNumber, setRowsNumber, columnsNumber, setColumnsNumber } =
		useContext(UserContext);

	function handleClick(operation) {
		if (rowsNumber >= 2 && operation > 0) {
			setColumnsNumber(columnsNumber + 1 * operation);
			setRowsNumber(rowsNumber + 1 * operation);
		} else if (rowsNumber > 2 && operation < 0) {
			setColumnsNumber(columnsNumber + 1 * operation);
			setRowsNumber(rowsNumber + 1 * operation);
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
