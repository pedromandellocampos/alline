import { Box } from "@mui/material";
import MatrixBox from "../../components/matrix-input-box/MatrixBox";
import PlusMinusButtons from "../../components/plus-minus-button";
import GenerateButton from "../../components/generate-button/inedex";
import Output from "../../components/output";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import AnswersAccordion from "../../components/accordion";
import Latex from "react-latex-next";
import OutputCombination from "../../components/output Combination";

function MainPage() {
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
    independentVectorsInfo,
  } = useContext(UserContext);

  return (
    <Box>
      <PlusMinusButtons parameter="rows" />
      <PlusMinusButtons parameter="columns" />
      <GenerateButton />
      <MatrixBox />
      {outputVerify == true ? (
        <AnswersAccordion
          text1={<Output content={outputContent} />}
          text2={<Output content={independentVectorsInfo} />}
        />
      ) : null}
    </Box>
  );
}

export default MainPage;
