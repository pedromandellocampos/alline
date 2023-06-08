import { Box } from "@mui/material";
import MatrixBox from "../../components/matrix-input-box/MatrixBox";
import PlusMinusButtons from "../../components/plus-minus-button";
import GenerateButton from "../../components/generate-button/inedex";

function MainPage() {
	return (
		<Box>
			<PlusMinusButtons parameter="rows" />
			<PlusMinusButtons parameter="columns" />
			<GenerateButton />
			<MatrixBox />
		</Box>
	);
}

export default MainPage;
