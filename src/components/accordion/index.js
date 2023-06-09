import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserContext from "../../context/UserContext";

export default function AnswersAccordion({ text1, text2, text3 }) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Escalonamento passo-a-passo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text1}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Combinações Lineares</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text2}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Bases geradoras do espaço</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text3}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
