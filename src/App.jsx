import { Nav } from "./components/navigation/nav.component";
import UserState from "./context/User/UserState";

function App() {
	return (
		<UserState>
			<div className="h-screen">
				<Nav />
			</div>
		</UserState>
	);
}

export default App;
