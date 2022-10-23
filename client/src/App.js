import {BrowserRouter} from "react-router-dom";
import StoreProvider from "./Store";
import Header from "./components/headers/Header";
import Pages from "./components/pages/Pages";

function App() {
  return (
      <StoreProvider>
          <BrowserRouter>
            <div className="App">
                <Header/>
                <Pages/>
            </div>
          </BrowserRouter>
      </StoreProvider>
  );
}

export default App;
