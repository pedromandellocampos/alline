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
    setInputValue(e.target.value);
  }

  useEffect(() => {
    // 	setNewValuesInArray();
    setNewValuesInArray();
  }, [inputValue]);

  return (
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      sx={{ m: 1, width: "50px", textAlign: "center" }}
      value={inputValue}
      onChange={handleChangeValue}
    />
  );
}

export default MatrixInput;
