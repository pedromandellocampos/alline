import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

function MatrixInput({ value }) {
	const { rows, setRows, rowsNumber, setRowsNumber } =
		useContext(UserContext);

	const [inputValue, setInputValue] = useState();

	function setNewValuesInArray(e) {
		const newArr = rows.map((row, index) => {
			if (index == value) {
				return e.target.value;
			} else {
				return row;
			}
		});

		console.log("entrou");
		console.log(newArr);
		setRows([...newArr]);
	}

	function handleChangeValue(e) {
		setInputValue(e.target.value);
		setNewValuesInArray();
	}

	return (
		<TextField
			hiddenLabel
			variant="filled"
			size="small"
			sx={{ m: 1, width: "30px" }}
			onChange={setNewValuesInArray}
		/>
	);
}

export default MatrixInput;
