import React from "react";
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
