import axios from "axios";
import { ConvertToCorrectKeys } from "./ParseData";

const BASE_URL = "http://127.0.0.1:8000/";

//Nane, Job_Title, request_status --> log in
export const UserLogin = async (username, password) => {

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    try{

        const res = await axios.post(BASE_URL + "projectmanager/log_in/", formdata, {
            Header: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const data = await res.data;
        return {status: 200, jobTitle: data.job_title, name: data.first_name };
    }
    catch(e){
        console.log(e.message);
        return {status: 400, jobTitle: "", name: "" }
    }
}

//[{projectId, projectImage, projectTitle, smallProjectDesctiption}, ......] --> get user profile
export const LoadThumbnails = async (username) => {

    const endpoint = `projectmanager/profile/?username=${username}`;

    try{
        const res = await axios.get(BASE_URL + endpoint);
        const data = await res.data;

        return { status: 200, projects: ConvertToCorrectKeys(data, BASE_URL.substring(0, BASE_URL.length - 1)) };
    }
    catch(e){
        console.log(e.message);
        return { staus: 400, projects: [] };
    }

}

//Request_Status --> create account
export const CreateUser = async (first_name, job_title, username, email, password) => {

    var formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("job_title", job_title);
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);

    try{

        await axios.post(BASE_URL + "projectmanager/create_account/", formdata, {
            Header: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return {status: 200};
    }
    catch(e){
        console.log(e.message);
        return {status: 400};
    }
    
}

//RequestStatus, Your role, longDescription --> get project
export const GetIndividualProject = async (title) => {

    const endpoint = `projectmanager/view_project/?title=${title}`;

    try{
        const res = await axios.get(BASE_URL + endpoint);
        const data = await res.data;

        return { status: 200,  role: data.contributions, longDescription: data.long_description };
    }
    catch(e){
        console.log(e.message);
        return { status: 400, role: "", longDescritpion: "" };
    }

}

//Request_Status --> create project
export const CreateProject = async (username, password, projectTitle, smallDesctiption, longDescritpion, contribution, image) => {

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("title", projectTitle);
    formdata.append("long_description", longDescritpion);
    formdata.append("short_description", smallDesctiption);
    formdata.append("contributions", contribution);
    formdata.append("thumbnail", image);

    try{
        await axios.post(BASE_URL + "projectmanager/create/", formdata, {
            Header: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return {status: 200 };
    }
    catch(e){
        console.log(e.message);
        return {status: 400 }
    }
}

//Request_Status --> update project
export const UpdateProject =  async (username, password, title, smallDesctiption, longDescritpion, contribution, image) => {

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("title", title);
    formdata.append("long_description", longDescritpion);
    formdata.append("short_description", smallDesctiption);
    formdata.append("contributions", contribution);
    formdata.append("thumbnail", image);

    try{
        await axios.post(BASE_URL + "projectmanager/update/", formdata, {
            Header: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return {status: 200 };
    }
    catch(e){
        console.log(e.message);
        return {status: 400 }
    }
}

//Request_Status --> delete project
export const DeleteProject = async (username, password, projectTitle) => {

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("title", projectTitle);

    try{
        await axios.post(BASE_URL + "projectmanager/delete_project/", formdata, {
            Header: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return { status: 200 };
    }
    catch(e){
        console.log(e);
        return { status: 400 };
    }

}

export const GetImage = async (imgUrl) => {


    try{
        const res = await axios.get(imgUrl);
        const data = await res.data;

        return { status: 200, img: data };
    }
    catch(e){
        console.log(e.message);
        return { status: 400, img: null };
    }
}
