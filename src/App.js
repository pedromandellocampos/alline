import { createContext, useState } from "react";
import "./App.css";
import UserContext from "./context/UserContext";
import MatrixBox from "./components/matrix-input-box/MatrixBox";

function App() {
	const [rowsNumber, setRowsNumber] = useState();
	const [rows, setRows] = useState([]);

	return (
		<UserContext.Provider
			value={{ rowsNumber, setRowsNumber, rows, setRows }}
		>
			<div className="App">
				<MatrixBox />
			</div>
		</UserContext.Provider>
	);
}

export default App;
