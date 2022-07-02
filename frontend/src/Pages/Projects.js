import React, { useState, useEffect } from "react";
import Project from "../Components/Project";
import AddProject from "../Components/AddProject";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { sleep, SuccessNotification, DangerNotification } from "../Data/Helper";
import { GetIndividualProject } from "../Data/GetData";
import "../CSS/Projects.css";

const Projects = ({ user, navigate, setOverlays, projects, setProjects, setIndividualProject }) => {

    const [displayAddProject, setDisplayAddProject] = useState(false);

    const hanldeAddClick = () => {
        setDisplayAddProject(true);
        setOverlays({loading: false, background: true});
    }

    const handleProjectClick = async (img, title, shortDescription) => {
        setOverlays({loading: true, background: true});

        //Load in the resources for the project and open the IndividualProjectsPage.
        const { status, role, longDescription } = await GetIndividualProject(title);

        setOverlays({loading: false, background: false});

        if(status === 200){
            setIndividualProject({title: title, smallDescription: shortDescription, img: img, role: role, longDescription: longDescription});
            navigate("/individual_project");
        }
        else{
            DangerNotification("Error", "Could not access project.");
        }
    }

    return (
        <>
            <div className="nav-bar">
                <div className="projects-intro">
                    <h1>I'm {user.name}</h1>
                    <p>a {user.jobTitle}</p>
                </div>
                <button className="add-project-btn" onClick={hanldeAddClick}>Add Project</button>
            </div>
            <div className="projects-grid">
                {projects.map(singleProject => {
                    return (
                        <div key={singleProject.id} className="project-item" onClick={() => handleProjectClick(singleProject.img, singleProject.name, singleProject.smallDescription)}>
                            <Project name={singleProject.name} img={singleProject.img} smallDescription={singleProject.smallDescription}/>
                        </div>
                    );
                })}
            </div>
            { displayAddProject &&  <AddProject username={user.username} password={user.password} projects={projects} setProjects={setProjects} setDisplayAddProject={setDisplayAddProject} setOverlays={setOverlays} />}
            <Outlet />
        </> 
    );
}

export default Projects;