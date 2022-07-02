import React, { useState } from "react";
import { sleep, DangerNotification, SuccessNotification } from "../Data/Helper";
import { CreateProject } from "../Data/GetData";
import "../CSS/AddProject.css";

const AddProject = ({ username, password, projects, setProjects, setDisplayAddProject, setOverlays }) => {

    //Stores the state of the form
    const [newProject, setNewProject] = useState({name: '', shortDescription: "", role: "", longDescription: "", img: ""})

    const handleClose = () => {

        setOverlays({loading: false, background: false});

        setDisplayAddProject(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Adjust state variables logic
        setDisplayAddProject(false);
        setOverlays({loading: true, background: true});
    
        const { status } = await CreateProject(username, password, newProject.name, newProject.shortDescription, newProject.longDescription, newProject.role, newProject.img);

        if(status === 200){
            let thumbnails = projects;
            thumbnails.push({id: new Date().valueOf(), img: URL.createObjectURL(newProject.img), name: newProject.name, smallDescription: newProject.shortDescription});

            setProjects(thumbnails);

            setOverlays({loading: false, background: false});
            await sleep(500);
            SuccessNotification("Success", "Your project was added.");
        }
        else{
            setOverlays({loading: false, background: false});
            await sleep(500);
            DangerNotification("Error", "Your project was not added.");
        }
    };

    return (
        <>
            <div className="add-project-container">
                <div className="add-project-text">
                    <h4>Create Your Project</h4>
                    <p>Create your dream project and land your dream job.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="small-input-area">
                        <div className="small-input-1">
                            <label htmlFor="name">Project Name</label>
                            <br />
                            <input className="aProject-half-inp" value={newProject.name} onChange={(e) => setNewProject({...newProject, "name": e.target.value})} type="text" required />
                        </div>
                        <div className="small-input-2">
                            <label className="stubborn" htmlFor="description">Project Description</label>
                            <br />
                            <input className="aProject-half-inp" value={newProject.shortDescription} onChange={(e) => setNewProject({...newProject, "shortDescription": e.target.value})} type="text" required />
                        </div>
                    </div>
                    <div className="large-input-area">
                        <label htmlFor="role">Your Role</label>
                        <br />
                        <textarea name="role" id="" cols="30" rows="3" value={newProject.role} onChange={(e) => setNewProject({...newProject, "role": e.target.value})} required></textarea>
                        <br />
                        <label htmlFor="longDescription">About Project</label>
                        <br />
                        <textarea name="longDescription" id="" cols="30" rows="7" value={newProject.longDescription} onChange={(e) => setNewProject({...newProject, "longDescription": e.target.value})} required></textarea>
                    </div>
                    <input className="add-upload-img" type="file" placeholder="Upload Image" accept="image/*" onChange={(e) => setNewProject({...newProject, "img": e.target.files[0]})} required/>
                    <br />
                    <div className="submit-addProject-btn">
                        <button className="cancel-addProject-btn" onClick={handleClose}>Cancel Changes</button>
                        <button className="save-addProject-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProject;