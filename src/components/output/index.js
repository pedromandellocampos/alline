import { Box } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function Output() {
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

  return (
    <Box>
      <Latex>{outputContent}</Latex>
    </Box>
  );
}
