import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Routers from "./routes";
import AppNavbar from "./components/AppNavbar";

function App() {
    return (
        <div className="App">
            <AppNavbar />
            <Routers />
        </div>
    );
}

export default App;
