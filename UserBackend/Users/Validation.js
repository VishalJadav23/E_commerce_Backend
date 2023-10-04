const validation = (data, type) => {
    let error = [];

    if (type === "register") {
        if (!data.firstName) {
            error.push({ key: "firstName", message: "Required Field firstName is empty" })
        } else if (!(/^[a-zA-Z]{2,30}$/.test(data.firstName))) {
            error.push({ key: "firstName", message: "firstName is Invalid" })
        }

        if (!data.lastName) {
            error.push({ key: "lastName", message: "Required Field lastName is empty" })
        } else if (!(/^[a-zA-Z]{2,30}$/.test(data.lastName))) {
            error.push({ key: "lastName", message: "lastName is Invalid" })
        }

        if (!data.email) {
            error.push({ key: "email", message: "Required Field email is empty" })
        }
        //regex for email validation
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
            error.push({ key: "email", message: "Invalid email" })
        }

        if (!data.password) {
            error.push({ key: "password", message: "Required Field password is empty" })
        }
        //regex for password validation
        else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(data.password))) {
            error.push({ key: "password", message: "Invalid email and password" })
        }
    } else {
        if (!data.email) {
            error.push({ key: "email", message: "Required Field email is empty" })
        }
        //regex for email validation
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
            error.push({ key: "email", message: "Invalid email" })
        }
        
        if (!data.password) {
            error.push({ key: "password", message: "Required Field password is empty" })
        }
        //regex for password validation
        else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(data.password))) {
            error.push({ key: "password", message: "Invalid email and password" })
        }

    } return error

}

export default validation;