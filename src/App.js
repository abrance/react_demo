import React from "react";
import {FooterComponent, HeaderComponent, SectionComponent} from "./cpts";
import {Provider} from "react-redux";
import {appStore} from "./store";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            app: 'asset'
        };
    }

    render() {
        return (
            <Provider store={appStore}>
                <div className="App">
                  <HeaderComponent />
                  <SectionComponent />
                  <FooterComponent />
                </div>
            </Provider>
       );
    }
}


export default App;
