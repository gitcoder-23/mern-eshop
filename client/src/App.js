import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import Footer from './components/footer/Footer'
import MainPages from './components/mainpages/Pages'


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App-full">
          <div className="App">
          <Header />
          <MainPages />
          </div>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
