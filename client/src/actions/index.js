import AuthService from "../AuthService";
import { navigate } from "@reach/router"

const API_URL = process.env.REACT_APP_API_URL;
const Auth = new AuthService(`${API_URL}/users/authenticate`);

/******************************************************
  Actions for Notifications
 ******************************************************/
export const showAlert = (title, text, level) => ({
    type: 'SHOW_ALERT',
    title: title,
    text: text,
    level: level
});

export const showAndHideAlert = (title, text, level, delay = 10000) => async function (dispatch) {
    console.log("Delay of " + delay);
    dispatch(showAlert(title, text, level));
    setTimeout(_ => dispatch(hideAlert()), delay);
};

export const hideAlert = (title, text) => ({
    type: 'HIDE_ALERT',
});


/******************************************************
  Actions for User credentials and Login / logout
 ******************************************************/
export const addUserCredentials = (username, admin) => ({
    type: 'ADD_USER_CRED',
    username: username,
    admin: admin
});

export const removeUserCredentials = (username) => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        const user = await Auth.login(username, password);
        if(user.username){
            dispatch(addUserCredentials(user.username, user.admin));
            navigate("/"); // Front page
        }
        else{
            dispatch(showAndHideAlert("Login Failed",user.msg, "error"))
        }

    } catch(e) {
        dispatch(showAndHideAlert("Login Failed", e.message, "error"));
    }
};

export const logout = _ => async function (dispatch) {
    Auth.logout();
    dispatch(removeUserCredentials());
};


/******************************************************
  Actions for handling questions and answers.
 ******************************************************/
export const replaceCategories = categories => ({
    type: 'ADD_CATEGORY',
    categories: categories
});

export const loadCategories = _ => async function (dispatch) {
    try {
        const url = `${API_URL}/category`;
        const response = await Auth.fetch(url);
        const data = await response.json();
        dispatch(replaceCategories(data));
    } catch (e) {
        console.error(e);
        dispatch(showAndHideAlert("Error loading categories", e.message, "error"));
    }
};

export const postCategory = description => async function(dispatch) {
    if (description === "") return;
    try {
        const newCategory = { description: description};
        console.log(newCategory)

        const response = await Auth.fetch(`${API_URL}/category`, {
            method: "POST",
            body: JSON.stringify(newCategory)
        });
        console.log(response, "respons")
        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to an admin user to post categories!", "alert"));
        } else {
            await response.json();
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Send question error", e.message, "error"));
        console.error(e);
    }
};

export const delCat = (id) => async function(dispatch){
    if(id ==="") return;
    try {
        const response = await Auth.fetch(`${API_URL}/category/${id}`, {
            method: "PUT",
        });

        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to post answers!", "alert"));
            await navigate("/login");
        } else {
            await response.json();
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Give answer error", e.message, "error"));
        console.error(e);
    }

}

export const postBook = (id, title, author, sellerName, sellerEmail) => async function(dispatch) {
    if (title === "" ||author === "" ||sellerName === "" ||sellerEmail === "") return;
    try {
        const newBook = { title: title, author: author, sellerName: sellerName, sellerEmail: sellerEmail };
        const response = await Auth.fetch(`${API_URL}/category/${id}/books`, {
            method: "POST",
            body: JSON.stringify(newBook)
        });

        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to post answers!", "alert"));
            await navigate("/login");
        } else {
            await response.json();
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Give answer error", e.message, "error"));
        console.error(e);
    }
};

