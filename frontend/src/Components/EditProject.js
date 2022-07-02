import React, { useState } from "react";
import { sleep } from "../Data/Helper";
import { DangerNotification, SuccessNotification } from "../Data/Helper";
import { UpdateProject } from "../Data/GetData";
import "../CSS/EditProject.css";

const EditProject = ({ username, password, projects, navigate, setShowEditProject, individualProject, setProjects, setOverlays }) => {
    const [newEditProject, setNewEditProject] = useState({name: individualProject.title, shortDescription: individualProject.smallDescription, role: individualProject.role, longDescription: individualProject.longDescription, img: null})


    const handleClose = () => {
        setOverlays({loading: false, background: false});
        setShowEditProject(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Adjust state variables logic
        setShowEditProject(false);

        setOverlays({loading: true, background: true});

        const { status } = await UpdateProject(username, password, individualProject.title, newEditProject.shortDescription, newEditProject.longDescription, newEditProject.role, newEditProject.img);

        if(status === 200){

            let tempProject = projects;
            tempProject.forEach(item => {

                if(item.name === individualProject.title){
                    item.img = URL.createObjectURL(newEditProject.img);
                    item.smallDescription = newEditProject.shortDescription;
                };

            });

            setProjects(tempProject);
            setOverlays({loading: false, background: false});
            navigate('/projects');
            await sleep(500);

            SuccessNotification("Success", "Your project was modified.");
        }
        else{
            setOverlays({loading: false, background: false});
            navigate('/projects');
            await sleep(500);

            DangerNotification("Error", "Your project could not be updated.");
        }
    };

    return (
        <>
            <div className="edit-project-container">
                <div className="edit-project-text">
                    <h4>Create Your Project</h4>
                    <p>Create your dream project and land your dream job.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="edit-small-input-area">
                        <div className="edit-small-input-1">
                            <label htmlFor="name">Project Name</label>
                            <br />
                            <input className="eProject-half-inp" value={newEditProject.name} onChange={(e) => setNewEditProject({...newEditProject, "name": e.target.value})} type="text" />
                        </div>
                        <div className="edit-small-input-2">
                            <label className="edit-stubborn" htmlFor="description">Project Description</label>
                            <br />
                            <input className="eProject-half-inp" value={newEditProject.shortDescription} onChange={(e) => setNewEditProject({...newEditProject, "shortDescription": e.target.value})} type="text" />
                        </div>
                    </div>
                    <div className="edit-large-input-area">
                        <label htmlFor="role">Your Role</label>
                        <br />
                        <textarea name="role" id="" cols="30" rows="3" value={newEditProject.role} onChange={(e) => setNewEditProject({...newEditProject, "role": e.target.value})}></textarea>
                        <br />
                        <label htmlFor="longDescription">About Project</label>
                        <br />
                        <textarea name="longDescription" id="" cols="30" rows="7" value={newEditProject.longDescription} onChange={(e) => setNewEditProject({...newEditProject, "longDescription": e.target.value})}></textarea>
                    </div>
                    <input className="edit-upload-img" type="file" placeholder="Upload Image" accept="image/*" onChange={(e) => setNewEditProject({...newEditProject, "img": e.target.files[0]})} required/>
                    <br />
                    <div className="submit-editProject-btn">
                        <button className="cancel-editProject-btn" onClick={handleClose}>Cancel Changes</button>
                        <button className="save-editProject-btn" onClick={(e) => handleSubmit(e)}>Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProject;