import Box from "@mui/material/Box";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import MatrixInput from "../matrix-inputs/MatrixInput";

function MatrixBox() {
  const { rowsNumber, columnsNumber, matrix, setMatrix } =
    useContext(UserContext);

  const [render, setRender] = useState(true);

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

    setMatrix([...newArr]);
  }

  function setMatrixWithSameRowsInputs() {
    let newArrLine = [];
    for (let i = 0; i < rowsNumber; i++) {
      if (matrix.length < i) {
      }
      newArrLine.push(0);
    }
    return newArrLine;
  }

  useEffect(() => {
    setMatrixColumnsInputs();

    setRender(false);

    setTimeout(() => {
      setRender(true);
    }, 5);
  }, [rowsNumber, columnsNumber]);

  return (
    <Box
      component="span"
      width="100%"
      display="flex"
      style={{ gap: "10px" }}
      flexDirection="column"
      alignItems="center"
      sx={{ p: 20 }}
    >
      {matrix.map((lines, lineIndex) => {
        return (
          <div key={lineIndex} style={{ display: "flex", gap: "10px" }}>
            {render
              ? lines.map((column, columnIndex) => (
                  <MatrixInput
                    key={columnIndex}
                    line={lineIndex}
                    column={columnIndex}
                  />
                ))
              : null}
          </div>
        );
      })}
    </Box>
  );
}

export default MatrixBox;
