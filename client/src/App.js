import {BrowserRouter} from "react-router-dom";
import StoreProvider from "./Store";
import Header from "./components/headers/Header";
import Pages from "./components/pages/Pages";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {HelmetProvider} from "react-helmet-async";
import React from "react";

function App() {
  return (
      <StoreProvider>
          <HelmetProvider>
              <BrowserRouter>
                  <ToastContainer position="bottom-center" limit={1}/>
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
