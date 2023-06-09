import { Box } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function Output({ content }) {
  const { outputContent } = useContext(UserContext);

  return (
    <Box>
      <Latex>{content}</Latex>
    </Box>
  );
}
