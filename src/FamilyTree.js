import React, { Component } from 'react';

import MyDiagram from './Components/MyDiagram';
import './FamilyTree.css';

class FamilyTree extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div style={{float: "left"}}>
                        <a href="app" className="btn btn-primary">Home</a>
                    </div>
                    <h1 className="App-title">Family Tree Example</h1>
                </header>
                <MyDiagram />
            </div>
        );
    }
}

export default FamilyTree;