import {BrowserRouter} from "react-router-dom";
import StoreProvider from "./Store";
import Header from "./components/headers/Header";
import Pages from "./components/pages/Pages";
import {HelmetProvider} from "react-helmet-async";

function App() {
  return (
      <StoreProvider>
          <HelmetProvider>
              <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Pages/>
                </div>
              </BrowserRouter>
          </HelmetProvider>
      </StoreProvider>

  );
}

export default App;
