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
    console.log("Entrou 22");
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
      }}
      variant="filled"
      size="small"
      defaultValue="0"
      onChange={handleChangeValue}
    />
  );
}

export default MatrixInput;
