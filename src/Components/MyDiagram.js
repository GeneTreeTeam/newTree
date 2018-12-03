import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';
import './MyDiagram.css';
import LeftSide from './LeftSide';
import {read,write} from '../functions';
class MyDiagram extends React.Component {
    nodeId = 0;

    constructor(props) {
        super(props);
        this.addChild = true;
        this.addChildTitle = React.createRef();
        this.addPersonalForm = React.createRef();
        this.editPersonalForm = React.createRef();
        this.fname = React.createRef();
        this.sname = React.createRef();
        this.birth = React.createRef();
        this.female = React.createRef();
        this.male = React.createRef();
        this.other = React.createRef();
        this.selectedGender = "female";
        this.birthday = React.createRef();
        this.living = React.createRef();
        this.showfname = React.createRef();
        this.showsname = React.createRef();
        this.showbirth = React.createRef();
        this.editFlag = false;
        this.createDiagram = this.createDiagram.bind(this);
        this.modelChangeHandler = this.modelChangeHandler.bind(this);
        this.initModelHandler = this.initModelHandler.bind(this);
        this.initDataBaseHandler = this.initDataBaseHandler.bind(this);
        this.saveToDataBaseHandler = this.saveToDataBaseHandler.bind(this);
        this.updateColorHandler = this.updateColorHandler.bind(this);
        this.nodeSelectionHandler = this.nodeSelectionHandler.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.removeLink = this.removeLink.bind(this);
        this.addNode = this.addNode.bind(this);
        this.updateNodeText = this.updateNodeText.bind(this);
        this.onTextEdited = this.onTextEdited.bind(this);
        this.onAddCheck = this.onAddCheck.bind(this);
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onAddChild = this.onAddChild.bind(this);
        this.onAddParent = this.onAddParent.bind(this);
        this.selectedNodeKey = null;
        this.state = {
            selectedNodeKeys: [],
            model: {
                nodeDataArray: [
                    {
                        key: "me",
                        label: "Me",
                        color: "red",
                        fname: "Me",
                        sname: "Me",
                        birth: "1/4/1993",
                        gender: "male",
                        living: true,
                        parent: 1
                    }
                ],
                linkDataArray: [

                ]
            }
        };
    }

    render() {
        return [
            <div key="myDiagramContainer" className="row my-diagram" style={{marginTop: 30+'px'}}>
                <LeftSide
                    key="leftSide"
                    addChildTitle={this.addChildTitle}
                    addPersonalForm={this.addPersonalForm}
                    editPersonalForm={this.editPersonalForm}
                    fname={this.fname}
                    sname={this.sname}
                    birth={this.birth}
                    female={this.female}
                    male={this.male}
                    other={this.other}
                    selectedGender={this.selectedGender}
                    birthday={this.birthday}
                    living={this.living}
                    showfname={this.showfname}
                    showsname={this.showsname}
                    showbirth={this.showbirth}
                    onInit={this.initModelHandler}
                    onInitDataBase={this.initDataBaseHandler}
                    onSaveDataBase={this.saveToDataBaseHandler}
                    onAddNode={this.addNode}
                    onAddCancel={this.onAddCancel}
                    onEdit={this.onEdit}
                    onAddChild={this.onAddChild}
                    onAddParent={this.onAddParent}
                />
                <div key="gojsDiagramContainer" className="col-sm-8 canvas-container">
                    <GojsDiagram
                        key="gojsDiagram"
                        diagramId="myDiagramDiv"
                        model={this.state.model}
                        createDiagram={this.createDiagram}
                        className="myDiagram"
                        onModelChange={this.modelChangeHandler}
                    />
                </div>
            </div>
        ];
    }

    saveToDataBaseHandler(){
        console.log("save to DB clicked");
        var model = {model:this.state.model};
        write(model);
    }

    initDataBaseHandler(){
        console.log("initDatabase clicked")
        var updatedTree={};
        var treePromise = read();
        var that = this;
        var treeStuff = treePromise.then(function(tree){
            console.log(tree['model']);
            that.setState({
                ...that.state,
                model: tree['model']
            });


        });

    }
    initModelHandler() {
        this.setState({
            ...this.state,
            model: {
                nodeDataArray: [{
                    key: "me",
                    label: "Me Me",
                    color: "blue",
                    fname: "Me",
                    sname: "Me",
                    birth: "1/4/1993",
                    gender: "male",
                    living: true,
                    parent: 1
                },
                    {
                        key: "mother",
                        label: "Mother Mom",
                        color: "pink",
                        fname: "Mother",
                        sname: "Mom",
                        birth: "1/4/1993",
                        gender: "female",
                        living: true,
                        parent: 2
                    },
                    {
                        key: "father",
                        label: "Father Dad",
                        color: "blue",
                        fname: "Father",
                        sname: "Dad",
                        birth: "1/4/1993",
                        gender: "male",
                        living: true,
                        parent: 2
                    },
                    {
                        key: "grandmamom",
                        label: "Grandmother Mom",
                        color: "pink",
                        fname: "Grandmother",
                        sname: "Mom",
                        birth: "1/4/1993",
                        gender: "female",
                        living: true,
                        parent: 0
                    },
                    {
                        key: "grandfamom",
                        label: "Grandfather Mom",
                        color: "blue",
                        fname: "Grandfather",
                        sname: "Mom",
                        birth: "1/4/1993",
                        gender: "male",
                        living: true,
                        parent: 0
                    },
                    {
                        key: "grandmadad",
                        label: "Grandmother Dad",
                        color: "pink",
                        fname: "Grandmother",
                        sname: "Dad",
                        birth: "1/4/1993",
                        gender: "female",
                        living: true,
                        parent: 0
                    },
                    {
                        key: "grandfadad",
                        label: "Grandfather Dad",
                        color: "blue",
                        fname: "Grandfather",
                        sname: "Dad",
                        birth: "1/4/1993",
                        gender: "male",
                        living: true,
                        parent: 0
                    }
                ],
                linkDataArray: [
                    { from: "mother", to: "me" },
                    { from: "father", to: "me" },
                    { from: "grandmamom", to: "mother" },
                    { from: "grandfamom", to: "mother" },
                    { from: "grandmadad", to: "father" },
                    { from: "grandfadad", to: "father" }
                ]
            }
        });
    }

    updateColorHandler() {
    }

    createDiagram(diagramId: string) {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.Center,
            layout: $(go.TreeLayout, {
                angle: 90,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                treeStyle: go.TreeLayout.StyleLayered,
                layerSpacing: 50
            }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.Center,
            //TextEdited: this.onTextEdited
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            'Auto',
            {
                selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected)
            },
            $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8, editable: false }, new go.Binding('text', 'label'))
        );
        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 3, stroke: "#555" }));

        return myDiagram;
    }

    modelChangeHandler(event) {
        switch (event.eventType) {
            case ModelChangeEventType.Remove:
                if (event.nodeData) {
                    this.removeNode(event.nodeData.key);
                }
                if (event.linkData) {
                    this.removeLink(event.linkData);
                }
                break;
            default:
                break;
        }
    }

    addNode() {
        if(this.onAddCheck()) {
            const fname = this.fname.current.value;
            const sname = this.sname.current.value;
            const gender = this.female.current.checked ? "female" : (this.male.current.checked ? "male" : "other");
            const newNodeId = 'node' + this.nodeId;
            const newNodeName = "Name: " + fname + ' ' + sname + "\n" +
                "Birthday: "  + this.birth.current.value + "\n" +
                "Gender: " + gender;
            const selectedIndex = this.state.model.nodeDataArray.findIndex(node => node.key === this.selectedNodeKey);
            if(!this.editFlag) {
                var linksToAdd;
                if(this.addChild || this.state.model.nodeDataArray[selectedIndex] == undefined) {
                    linksToAdd = this.state.selectedNodeKeys.map(parent => {
                        return { from: parent, to: newNodeId };
                    });
                } else {
                    if(this.state.model.nodeDataArray[selectedIndex].parent == 2) return;
                    linksToAdd = this.state.selectedNodeKeys.map(parent => {
                        return { from: newNodeId, to: parent };
                    });
                    this.state.model.nodeDataArray[selectedIndex] = {
                        key: this.state.model.nodeDataArray[selectedIndex].key,
                        label: this.state.model.nodeDataArray[selectedIndex].label,
                        color: this.state.model.nodeDataArray[selectedIndex].color,
                        fname: this.state.model.nodeDataArray[selectedIndex].fname,
                        sname: this.state.model.nodeDataArray[selectedIndex].sname,
                        birth: this.state.model.nodeDataArray[selectedIndex].birth,
                        gender: this.state.model.nodeDataArray[selectedIndex].gender,
                        living: this.state.model.nodeDataArray[selectedIndex].living,
                        parent: this.state.model.nodeDataArray[selectedIndex].parent + 1
                    };
                    this.forceUpdate();
                }
                this.setState({
                    ...this.state,
                    model: {
                        ...this.state.model,
                        nodeDataArray: [
                            ...this.state.model.nodeDataArray,
                            {
                                key: newNodeId,
                                label: newNodeName,
                                color: gender == "female" ? "pink" : (gender == "male" ? "blue" : "yellow"),
                                fname: fname,
                                sname: sname,
                                birth: this.birth.current.value,
                                gender: gender,
                                living: this.living.current.checked,
                                parent: 0
                            }
                        ],
                        linkDataArray:
                            linksToAdd.length > 0
                                ? [...this.state.model.linkDataArray].concat(linksToAdd)
                                : [...this.state.model.linkDataArray]
                    }
                });
                this.nodeId += 1;
            } else if(this.selectedNodeKey != null) {
                this.state.model.nodeDataArray[selectedIndex] = {
                    key: this.selectedNodeKey,
                    label: newNodeName,
                    color: gender == "female" ? "pink" : (gender == "male" ? "blue" : "yellow"),
                    fname: fname,
                    sname: sname,
                    birth: this.birth.current.value,
                    gender: gender,
                    living: this.living.current.checked,
                    parent: this.state.model.nodeDataArray[selectedIndex].parent
                };
                this.forceUpdate();
                this.updateNodeText(this.selectedNodeKey, newNodeName);
                this.showfname.current.innerHTML = fname;
                this.showsname.current.innerHTML = sname;
                this.showbirth.current.innerHTML = this.birth.current.value;
            }
            this.editFlag = false;
            this.fname.current.value = "";
            this.sname.current.value = "";
            this.birth.current.value = "";
        }
    }

    removeNode(nodeKey) {
        const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
                ]
            }
        });
    }

    removeLink(linKToRemove) {
        const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...this.state.model,
                linkDataArray: [
                    ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
                ]
            }
        };
    }

    updateNodeText(nodeKey, text) {
        const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToUpdateIndex === -1) {
            return;
        }
        this.setState({
            ...this.state,
            model: {
                ...this.state.model,
                nodeDataArray: [
                    ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
                    {
                        ...this.state.model.nodeDataArray[nodeToUpdateIndex],
                        label: text
                    },
                    ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1)
                ]
            }
        });
    }

    nodeSelectionHandler(nodeKey, isSelected) {
        if (isSelected) {
            this.setState({
                ...this.state,
                selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
            });
            this.selectedNodeKey = nodeKey;
            const selectedNodeIndex = this.state.model.nodeDataArray.findIndex(node => node.key === this.selectedNodeKey);
            this.showfname.current.innerHTML = this.state.model.nodeDataArray[selectedNodeIndex].fname;
            this.showsname.current.innerHTML = this.state.model.nodeDataArray[selectedNodeIndex].sname;
            this.showbirth.current.innerHTML = this.state.model.nodeDataArray[selectedNodeIndex].birth;
        } else {
            const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState({
                ...this.state,
                selectedNodeKeys: [
                    ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
                ]
            });
        }
    }

    onTextEdited(e) {
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const node = tb.part;
        if (node instanceof go.Node) {
            this.updateNodeText(node.key, tb.text);
        }
    }

    onAddCheck() {
        if(this.fname.current.value == "" || this.sname.current.value == "" || this.birth.current.value == "") return false;
        return true;
    }

    onAddCancel() {
        this.editFlag = false;
        this.addPersonalForm.current.style.display = "none";
        this.editPersonalForm.current.style.display = "block";
    }

    onEdit() {
        this.editFlag = true;
        this.addPersonalForm.current.style.display = "block";
        this.editPersonalForm.current.style.display = "none";
        const selectedEditIndex = this.state.model.nodeDataArray.findIndex(node => node.key === this.selectedNodeKey);
        if(this.state.model.nodeDataArray[selectedEditIndex] != undefined) {
            this.fname.current.value = this.state.model.nodeDataArray[selectedEditIndex].fname;
            this.sname.current.value = this.state.model.nodeDataArray[selectedEditIndex].sname;
            this.birth.current.value = this.state.model.nodeDataArray[selectedEditIndex].birth;
            switch (this.state.model.nodeDataArray[selectedEditIndex].gender) {
                case "female":
                    this.female.current.checked = true; break;
                case "male":
                    this.male.current.checked = true; break;
                case "other":
                    this.other.current.checked = true; break;
            }
            this.living.current.checked = this.state.model.nodeDataArray[selectedEditIndex].living;
        }
    }

    onAddChild() {
        this.addChild = true;
        this.addChildTitle.current.innerHTML = "Add Child";
    }

    onAddParent() {
        this.addChild = false;
        this.addChildTitle.current.innerHTML = "Add Parent";
    }
}

export default MyDiagram;