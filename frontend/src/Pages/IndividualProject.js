import React, { useState } from "react";
import { sleep, DangerNotification, SuccessNotification } from "../Data/Helper";
import { DeleteProject } from "../Data/GetData";
import "../CSS/IndividualProject.css";
import EditProject from "../Components/EditProject";


const IndividualProject = ({ username, password, projects, navigate, individualProject, setProjects, setOverlays }) => {

    const [showEditProject, setShowEditProject] = useState(false);

    const handleEditClick = () => {
        setShowEditProject(true);
        setOverlays({loading: false, background: true});
    }

    const handleDeleteClick = async () => {
        setOverlays({loading: true, background: true});

        const { status } = await DeleteProject(username, password, individualProject.title);

        if(status === 200){
            let tempProjects = projects.filter(project => project.name !== individualProject.title);
            setProjects(tempProjects);

            setOverlays({loading: false, background: false});

            navigate("/projects");

            await sleep(500);
            SuccessNotification("Success", "Your project has been deleted.");

        }else{
            setOverlays({loading: false, background: false});

            navigate("/projects");

            await sleep(500);
            DangerNotification("Error", "Your project could not be deleted.");
        }

    }

    return (
        <>
            <div className="individual-navbar">
                <h3>{individualProject.title}</h3>
                <p>{individualProject.smallDescription}</p>
            </div>
            <div className="main-individual-project">
                <div className="left-individual-project">
                    <img src={individualProject.img} alt="" />
                    <p>{individualProject.longDescription}</p>
                </div>
                <div className="right-individual-project">
                    <div className="individual-project-btn">
                        <button className="edit-project" onClick={handleEditClick}>Edit Project</button>
                        <button className="delete-individual-project" onClick={() => handleDeleteClick()}>Delete Project</button>
                    </div>
                    <p>{individualProject.role}</p>
                </div>
            </div>
            { showEditProject && <EditProject username={username} password={password} projects={projects} navigate={navigate} setShowEditProject={setShowEditProject} individualProject={individualProject} setProjects={setProjects} setOverlays={setOverlays} /> }
        </>
    );
}

export default IndividualProject;