import Box from "@mui/material/Box";
import UserContext from "../../context/UserContext";
import { useContext, useEffect } from "react";
import MatrixInput from "../matrix-inputs/MatrixInput";

function MatrixBox() {
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

	function setMatrixRowsInputs() {
		let newArr = [];
		for (let i = 0; i < rowsNumber; i++) {
			newArr.push(0);
		}
		return newArr;
	}

	function setMatrixColumnsInputs() {
		let newArr = [];

		for (let i = 0; i < columnsNumber; i++) {
			let linha = setMatrixRowsInputs();
			newArr.push(linha);
		}
		console.log(newArr);
		setMatrix([...newArr]);
	}

	useEffect(() => {
		setMatrixColumnsInputs();
	}, [rowsNumber, columnsNumber]);

	return (
		<Box component="span" sx={{ p: 20 }}>
			{matrix.map((lines, lineIndex) => {
				return (
					<div key={lineIndex}>
						{lines.map((column, columnIndex) => (
							<MatrixInput
								key={columnIndex}
								line={lineIndex}
								column={columnIndex}
								value={0}
							/>
						))}
					</div>
				);
			})}
		</Box>
	);
}

export default MatrixBox;
