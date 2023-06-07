import Box from "@mui/material/Box";
import UserContext from "../../context/UserContext";
import { useContext, useEffect } from "react";
import MatrixInput from "../matrix-inputs/MatrixInput";

function MatrixBox() {
	const { rows, setRows, rowsNumber, setRowsNumber } =
		useContext(UserContext);

	function setMatrixInputs() {
		let newArr = [];
		for (let i = 0; i < 5; i++) {
			newArr.push(i);
		}
		setRows([...newArr]);
		console.log(rows);
	}

	useEffect(() => {
		setMatrixInputs();
	}, []);

	useEffect(() => {
		console.log(rows);
	}, [rows]);

	return (
		<Box component="span" sx={{ p: 20, border: "1px dashed grey" }}>
			{rows.map((row, index) => (
				<MatrixInput key={index} value={index} />
			))}
		</Box>
	);
}

export default MatrixBox;

/*
viewof matrixentries = {
    const m = [];
    for (let i = 0; i < 5; ++i) {
      const r = [];
      for (let j = 0; j < 8; ++j) {
        r.push(
          Inputs.text({
            width: 1,
            maxlength: 7,
            value: i < 2 && j < 2 ? i + j : ""
          })
        );
      }
      m.push(r);
    }
    return inputsGroup(m);
  }
  */
