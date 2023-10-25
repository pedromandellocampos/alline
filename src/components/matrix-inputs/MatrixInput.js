import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";

function MatrixInput({ line, column }) {
	const {
		matrix,
		setMatrix,
		rowsNumber,
		setRowsNumber,
		columnsNumber,
		setColumnsNumber,
	} = useContext(UserContext);

	const [inputValue, setInputValue] = useState(0);

	function setNewValuesInArray() {
		const newArr = [...matrix];
		newArr[line][column] = inputValue;
		setMatrix([...newArr]);
	}

	function handleChangeValue(e) {
		console.log(e.target.value);
		if (e.target.value == "") {
			e.target.value = 0;
		}
		setInputValue(e.target.value);
	}

	useEffect(() => {
		// 	setNewValuesInArray();
		setNewValuesInArray();
	}, [inputValue]);

	useEffect(() => {
		console.log(" entrou:  ");

		setInputValue(0);
	}, [rowsNumber]);

	return (
		<input
			style={{
				textAlign: "center",
				width: "50px",
				height: "40px",
				borderRadius: "7px",
				borderColor: "rgb(161 160 160)",
				borderStyle: "solid",
				borderWidth: "1px",
			}}
			variant="filled"
			size="small"
			defaultValue="0"
			onChange={handleChangeValue}
		/>
	);
}

export default MatrixInput;
