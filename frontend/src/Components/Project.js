import React from "react";
import "../CSS/Project.css";

const Project = ({ name, img, smallDescription }) => {

    return (
        <>
            <div className="project-box">
                <img className="small-project-img" src={img} alt="project" />
                <h5>{name}</h5>
                <p>{smallDescription}</p>
            </div>
        </>
    );
}

export default Project;