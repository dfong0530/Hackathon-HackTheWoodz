import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css'

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const DangerNotification = (title, message) => {
        Store.addNotification({
            title: title,
            message: message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,
                onScreen: false
            }
        });
}

export const SuccessNotification = (title, message) => {
        Store.addNotification({
            title: title,
            message: message,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,
                onScreen: false
            }
        });
}