import React, { Component } from 'react';
import NavBar from './NarbarFeatures'
import MyDiagram from './Components/MyDiagram';
import './FamilyTree.css';
import {firebaseApp} from "./firebase";
import {browserHistory} from "react-router";
//import {read} from "./functions";

class FamilyTree extends Component {
    render() {
        return (
            <div className="App">

                <NavBar/>
                <MyDiagram />
            </div>
        );
    }
}

export default FamilyTree;