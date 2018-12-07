import React, { Component } from 'react';
import Carousel from '../GUI Components/Carousel'
import FooterPage from "../GUI Components/Footer";
import FormsPage3 from "./Forgotpassword";
import Narbar from "../GUI Components/NavBar";

class App extends Component {


    render() {
        return(
            <div>
                <Narbar/>
                <div>
                    <h1  align='center'>Welcome to GeneTree</h1>
                    <br/>
                    <Carousel/>
                </div>
                <FooterPage/>
            </div>
        );
    }
}

export default App;
