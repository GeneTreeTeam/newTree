import React from 'react';

const LeftSide = ({
    addChildTitle,
    addPersonalForm,
    editPersonalForm,
    fname,
    sname,
    birth,
    female,
    male,
    other,
    selectedGender,
    birthday,
    living,
    showfname,
    showsname,
    showbirth,
    onInit,
    onAddNode,
    onAddCancel,
    onEdit,
    onInitTree,
    onAddChild,
    onAddParent
    }) => (

    <div className="col-sm-4">

        <div className="row">
            <div className="col-sm-6">
                <button className="col-sm-12" type="button" onClick={onAddParent}>Add Parent</button>
            </div>
            <div className="col-sm-6">
                <button className="col-sm-12" type="button" onClick={onAddChild}>Add Child</button>
            </div>
            <div className="col-sm-6">
                <button className="col-sm-12" type="button" onClick={onInit}>Initialize sample Tree</button>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12"><h2 className="label" ref={addChildTitle}>Add Child</h2></div>
        </div>

        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#personal">Personal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#partners">Partners</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#biographical">Biographical</a>
            </li>
        </ul>

        <div className="tab-content">
            <div id="personal" className="container tab-pane active">
                <div id="addpersonal" ref={addPersonalForm}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="fname" className="label">First Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="x" id="fname" name="firstname" ref={fname} placeholder=""/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="sname" className="label">Surname now:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="x" id="sname" name="surname" ref={sname} placeholder=""/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="birth" className="label">Dob:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="x" id="birth" name="birth" ref={birth} placeholder=""/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="" className="label">Gender</label>
                        </div>
                        <div className="col-75">
                            <div className="col-33">
                                <div className="label">
                                    <label><input type="radio" name="gender" value="female" ref={female} defaultChecked={selectedGender === 'female'}/>Female</label>
                                </div>
                            </div>
                            <div className="col-33">
                                <div className="label">
                                    <label><input type="radio" name="gender" value="male" ref={male} defaultChecked={selectedGender === 'male'}/>Male</label>
                                </div>
                            </div>
                            <div className="col-33">
                                <div className="label">
                                    <label><input type="radio" name="gender" value="other" ref={other} defaultChecked={selectedGender === 'other'}/>Other</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                        </div>
                        <div className="col-75" style={{ textAlign: 'left' }}>
                            <div className="checkbox">
                                <label><input type="checkbox" value=""ref={living}/>This personal is living</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                           <label className="label">You can also add or change details later.</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="col-sm-12" type="button" onClick={onAddNode}>OK</button>
                        </div>
                        <div className="col-sm-6">
                            <button className="col-sm-12" type="button" onClick={onAddCancel}>Cancel</button>
                        </div>
                    </div>
                </div>

                <div id="editpersonal" ref={editPersonalForm} style={{display: 'none'}}>
                    <div className="row">
                        <div className="col-25">
                            <label className="label">First Name:</label>
                        </div>
                        <div className="col-75">
                            <label className="label" ref={showfname}></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label className="label">Surname now:</label>
                        </div>
                        <div className="col-75">
                            <label className="label" ref={showsname}></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label className="label">Birthday:</label>
                        </div>
                        <div className="col-75">
                            <label className="label" ref={showbirth}></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="col-sm-6" type="button" onClick={onEdit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="partners" className="container tab-pane fade">
                <h3>Partners</h3>
            </div>

            <div id="contact" className="container tab-pane fade">
                <h3>Contact</h3>
            </div>

            <div id="biographical" className="container tab-pane fade">
                <h3>Biographical</h3>
            </div>
        </div>
    </div>
)


export default LeftSide;