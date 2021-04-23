// import logo from './logo.svg';
import './App.css';

import React from "react";
// import * as assert from "assert";
import {HeaderComponent, SectionComponent, FooterComponent} from "./cpts";


function App() {
  return (
      <div className="App">
          <HeaderComponent/>
          <SectionComponent/>
          <FooterComponent/>
      </div>
  )
}

// ReactDOM.render(<App />, document.getElementById('app'));

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
