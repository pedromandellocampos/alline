import { Box } from "@mui/material";
import MatrixBox from "../../components/matrix-input-box/MatrixBox";
import PlusMinusButtons from "../../components/plus-minus-button";

function MainPage() {
	return (
		<Box>
			<PlusMinusButtons parameter="rows" />
			<PlusMinusButtons parameter="columns" />
			<MatrixBox />
		</Box>
	);
}

export default MainPage;
