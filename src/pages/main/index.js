import { Box } from "@mui/material";
import MatrixBox from "../../components/matrix-input-box/MatrixBox";
import PlusMinusButtons from "../../components/plus-minus-button";
import GenerateButton from "../../components/generate-button/inedex";
import Output from "../../components/output";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import AnswersAccordion from "../../components/accordion";
import NavBar from "../../components/navbar";

function MainPage() {
	const {
		outputContent,
		outputVerify,
		independentVectorsInfo,
		spaceBases,
		setSpaceBases,
	} = useContext(UserContext);

	return (
		<Box>
			<NavBar />

			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				marginTop="30px"
			>
				<Box
					display="flex"
					justifyContent="center"
					width="100%"
					gap="30px"
				>
					<PlusMinusButtons parameter="row" />
					<PlusMinusButtons parameter="columns" />
					<GenerateButton />
				</Box>

				<MatrixBox width="100%" />
			</Box>
			{outputVerify == true ? (
				<AnswersAccordion
					text1={<Output content={outputContent} />}
					text2={<Output content={independentVectorsInfo} />}
					text3={<Output content={spaceBases} />}
				/>
			) : null}
		</Box>
	);
}

export default MainPage;
