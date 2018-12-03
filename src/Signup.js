import React from 'react';
import { Container, Row, Col, Input, Button, Fa, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import FormsPage2 from "./Login";

import {firebaseApp} from "./firebase";

import {
    Navbar,
    NavbarBrand,
    NavbarNav,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
   } from 'mdbreact';

function user() {
    console.log("In user method" + firebaseApp.auth().currentUser.email);
    return firebaseApp.auth().currentUser;
}
function db() {
    return firebaseApp.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}
class FormsPage1 extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name:'',
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    SignUp(){
        console.log('In Sign UP Method: The state:', this.state);
        const {name,email, password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password)
            .catch(error => {
                this.setState({error})
            });
        console.log("This is the name and email in SignUP" + name + " " + email + " ");
        var model= {
            nodeDataArray: [
                {
                    key:"node0",label:name,color:"red"
                }
            ],
            linkDataArray: []
        };

        db().doc(email).set({
            model,
        });
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col md="0">
                        <Button color="info"  onClick={this.toggle}>Sign Up <i className="fa fa-user-plus mr-1"></i></Button>
                        <Modal isOpen={this.state.modal}  className="cascading-modal">
                            <div className="modal-header primary-color white-text">
                                <h4 className="title">
                                    <Fa className="fa fa-pencil" /> Sign Up</h4>
                                <button type="button" className="close" onClick={this.toggle}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <ModalBody className="grey-text">
                                <Input size="sm" label="Your name" icon="user" group type="name"
                                       validate error="wrong" success="right"
                                       onChange ={event => this.setState({name: event.target.value})}
                                />
                                <Input size="sm" label="Your email" icon="envelope" group type="email"
                                       validate error="wrong" success="right"
                                       onChange ={event => this.setState({email: event.target.value})}
                                />
                                <Input size="sm" label="Your password" icon="lock" group type="password"
                                       validate error="wrong" success="right"
                                />
                                <Input size="sm" label="Confirm your password" icon="exclamation-triangle"
                                       group type="password" validate error="wrong" success="right"
                                       onChange ={event => this.setState({password: event.target.value})}
                                />

                                <div className="form-check my-4">
                                    <input className="form-check-input" type="checkbox" id="defaultCheck12" />
                                    <label htmlFor="defaultCheck12" className="grey-text">Accept the
                                        <a href="#" className="blue-text"> Terms and Conditions</a></label>
                                </div>

                                <div className="text-center mb-3">
                                        <Button color="btn btn-pink btn-block btn-rounded z-depth-1"
                                                rounded type="button" className="btn-block z-depth-1"

                                                onClick={() =>
                                                    this.SignUp()                                                }
                                        >Sign Up</Button>
                                </div>
                                <div>{this.state.error.message}</div>
                            </ModalBody>

                            <ModalFooter   className="mx-5 pt-3 mb-1">
                                <Col md="12">
                                    <p className="font-small grey-text d-flex justify-content-center">Have an account?
                                        <div > <FormsPage2/></div>
                                    </p>
                                </Col>
                            </ModalFooter>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default FormsPage1;