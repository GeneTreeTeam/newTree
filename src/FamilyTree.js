import React, { Component } from 'react';
import NavBar from './NavBar'
import MyDiagram from './Components/MyDiagram';
import './FamilyTree.css';

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