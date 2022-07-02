import React, { useState, useEffect } from "react";
import { LoadThumbnails, GetIndividualProject, DeleteProject, UpdateProject, CreateUser, UserLogin, CreateProject, GetImage } from "../Data/GetData";
import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import axios from "axios";


const Prac = () => {

    const [image, setImage] = useState(null);

    useEffect(() => {

        const update = async () => {
            const { status, img }  = await GetImage("http://127.0.0.1:8000/media/images/Screen_Shot_2022-06-16_at_4.35.13_PM_qzSRnbm.png");
            console.log(status);
            setImage(URL.createObjectURL(img));
        }

        update();

    }, [])

    return (
        <>
            <h1>Prac</h1>
            <img src={image} alt="" />
        </>
    );
}

export default Prac;




// Store.addNotification({
//     title: "Failed",
//     message: "Username or Password incorrect",
//     type: "danger",
//     insert: "top",
//     container: "top-right",
//     animationIn: ["animate__animated", "animate__fadeIn"],
//     animationOut: ["animate__animated", "animate__fadeOut"],
//     dismiss: {
//         duration: 4000,
//         onScreen: false
//     }
// });



// const Prac = () => {


//     const [image, setImage] = useState(null);
//     const [actual, setActual] = useState(null);

//     const onImageChange = (e) => {
//         setImage(e.target.files[0]);
//     }

//     const handleClick = async () => {
//         const { status } = await UpdateProject("dfong", "davidpassword", "David's Fith Project", "Small", "Very Long", "contribution", image);
//         console.log(status);
//     }

//     // useEffect(() => {

//     //     const update = async(image) => {
//     //         setActual(URL.createObjectURL(image));
//     //     }
//     //     if(image){
//     //         update(image);
//     //     }

//     // }, [image]);

//     return (
//         <>
//             <input type="file"  accept="image/*" onChange={(e) => onImageChange(e)}/>
//             <img src={URL.createObjectURL(image)} alt="" />
//             {/* <button onClick={handleClick}>Click Me</button> */}
//         </>
//     );
// }

// export default Prac;