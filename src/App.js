import { createContext, useState } from "react";
import "./App.css";
import UserContext from "./context/UserContext";
import MatrixBox from "./components/matrix-input-box/MatrixBox";
import MainPage from "./pages/main";

function App() {
	const [rowsNumber, setRowsNumber] = useState(2);
	const [columnsNumber, setColumnsNumber] = useState(2);
	const [rows, setRows] = useState([]);
	const [columns, setcolumns] = useState([]);
	const [matrix, setMatrix] = useState([]);

	return (
		<UserContext.Provider
			value={{
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
			}}
		>
			<MainPage />
		</UserContext.Provider>
	);
}

export default App;
