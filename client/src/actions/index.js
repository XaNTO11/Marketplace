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
export const addUserCredentials = (username, admin, loggedIn) => ({
    type: 'ADD_USER_CRED',
    username: username,
    admin: admin,
    loggedIn: loggedIn
});

export const removeUserCredentials = () => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        const user = await Auth.login(username, password);
        if(await Auth.loggedIn()){
            dispatch(addUserCredentials(user.username, user.admin, true));
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
  Actions for handling marketplace
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
    if (description === "") return dispatch(showAndHideAlert("Category creation failed", "You need to fill out the category description!", "alert"));
    try {
        const newCategory = { description: description};

        const response = await Auth.fetch(`${API_URL}/category`, {
            method: "POST",
            body: JSON.stringify(newCategory)
        });
        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to be an admin user to post categories!", "alert"));
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
            dispatch(showAndHideAlert("Login", "You need to be an admin user to delete categories!", "alert"));
            await navigate("/login");
        } else {
            await response.json();
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Category", e.message, "error"));
        console.error(e);
    }

}

export const postBook = (id, title, author, price, sellerName, sellerEmail) => async function(dispatch) {
    if (id === "", title === "" ||author === "" || isNaN(price) || price === 0||sellerName === "" ||sellerEmail === "")
        return dispatch(showAndHideAlert("Posting Failed", "You need to fill out every thing and price can't be 0!", "alert"));
    try {
        const newBook = { title: title, author: author, price: price, sellerName: sellerName, sellerEmail: sellerEmail };
        const response = await Auth.fetch(`${API_URL}/category/${id}/books`, {
            method: "POST",
            body: JSON.stringify(newBook)
        });

        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to post books!", "alert"));
            await navigate("/login");
        } else {
            await response.json();
            dispatch(showAndHideAlert("Posted", "You successfully posted a book", "success"));
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Give book error", e.message, "error"));
        console.error(e);
    }
};

