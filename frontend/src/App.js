import React, { useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import './App.css';
import Login from "./Pages/Login";
import Prac from './Pages/Prac';
import CreateAccount from './Pages/CreateAccount';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Loader from "./Components/Loader";
import Projects from "./Pages/Projects";
import IndividualProject from "./Pages/IndividualProject";

function App() {

  //Global variables
  const navigate = useNavigate();

  //To control overlay and loading icon.
  const [overlays, setOverlays] = useState({loading: false, background: false});

  //General data about user. Needed for Projects page and IndividualProjects Page
  const [user, setUser] = useState({name: "I'm David", jobTitle: "a software engineer", username: "", password: ""});

  //projects are the state variables to store the data about the thumnails in the projects page.
  //individualProject is the state varaible to stroe all the data about an individual project. Thed data will be loaded in when the user clicks on one of the project thumnails.
  const [projects, setProjects] = useState([{id: 1, img: null, name: "PicOfTerminal", smallDescription: "picture of my terminal"}, {id: 2, img: null, name: "PicOfTerminal", smallDescription: "picture of my terminal"}, {id: 3, img: null, name: "PicOfTerminal", smallDescription: "picture of my terminal"}, {id: 4, img: null, name: "PicOfTerminal", smallDescription: "picture of my terminal"}]);
  const [individualProject, setIndividualProject] = useState({title: "PicOfTerminal", smallDescription: "picture of my terminal", img: null, role: "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.", longDescription: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. 1914 translation by H. RackhamOn the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish."});

  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Login navigate={navigate} setOverlays={setOverlays} setUser={setUser} setProjects={setProjects} />} />
        <Route path="/create-account" element={<CreateAccount navigate={navigate} setOverlays={setOverlays}/>} />
        <Route path="/projects" element={<Projects user={user} navigate={navigate} setOverlays={setOverlays} projects={projects} setProjects={setProjects} setIndividualProject={setIndividualProject} />} />
        <Route path="individual_project" element={<IndividualProject username={user.username} password={user.password} projects={projects} navigate={navigate} individualProject={individualProject} setProjects={setProjects} setOverlays={setOverlays}/>} />
      </Routes>
      {/* <Prac /> */}
      { overlays.loading && <Loader /> }
      { overlays.background && <div id="dark-overlay"></div> }
    </>
  );
}

export default App;
