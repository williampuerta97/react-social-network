import { Nav } from "./components/navigation/nav.component";
import AuthState from "./context/Auth/AuthState";

function App() {
  return (
    <AuthState>
      <div className="h-screen">
        <Nav />
      </div>
    </AuthState>
  );
}

export default App;
