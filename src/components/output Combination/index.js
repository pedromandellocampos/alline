import { Box } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function OutputCombination() {
  const { independentVectorsInfo } = useContext(UserContext);

  return (
    <Box>
      <Latex>{independentVectorsInfo}</Latex>
    </Box>
  );
}
