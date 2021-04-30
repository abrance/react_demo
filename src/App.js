// import logo from './logo.svg';
import './App.css';

import React from "react";
// import * as assert from "assert";
import {FooterComponent, HeaderComponent, SectionComponent} from "./cpts";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app: 'asset'
        };
    }

    render() {
        return (
            <div className="App">
              <HeaderComponent/>
              <SectionComponent/>
              <FooterComponent/>
            </div>
       );
    }
}


export default App;
