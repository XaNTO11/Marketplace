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
// export const showBook =(title, author, cat, sellerName, sellerEmail) => ({
//     type: 'SHOW_BOOK',
//     title: title,
//     author: author,
//     cat: cat,
//     sellerName: sellerName,
//     sellerEmail: sellerEmail
//
// });

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
export const addUserCredentials = (username) => ({
    type: 'ADD_USER_CRED',
    username: username
});

export const removeUserCredentials = (username) => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        await Auth.login(username, password);
        dispatch(addUserCredentials(username));
        navigate("/"); // Front page
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
export const replaceBook = book => ({
    type: 'SHOW_BOOK',
    book: book
});

// export const loadQuestions = _ => async function (dispatch) {
//     try {
//         const url = `${API_URL}/questions`;
//         const response = await Auth.fetch(url);
//         const data = await response.json();
//         dispatch(replaceQuestions(data));
//     } catch (e) {
//         console.error(e);
//         dispatch(showAndHideAlert("Error loading questions", e.message, "error"));
//     }
// };
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

// export const loadBook = (id,bid) => async function (dispatch) {
//     try {
//         const url = `${API_URL}/category/${id}/books/${bid}`;
//         const response = await Auth.fetch(url);
//         const data = await response.json();
//         // dispatch(replaceBook(data));
//         dispatch(data);
//
//     } catch (e) {
//         console.error(e);
//         dispatch(showAndHideAlert("Error loading categories", e.message, "error"));
//     }
// };

// export const postQuestion = text => async function(dispatch) {
//     if (text === "") return;
//     try {
//         const newQuestion = { text: text };
//         const response = await Auth.fetch(`${API_URL}/questions`, {
//             method: "POST",
//             body: JSON.stringify(newQuestion)
//         });
//         if (response.status === 401) {
//             dispatch(showAndHideAlert("Login", "You need to login to post questions!", "alert"));
//         } else {
//             await response.json();
//             dispatch(loadQuestions());
//         }
//     } catch (e) {
//         dispatch(showAndHideAlert("Send question error", e.message, "error"));
//         console.error(e);
//     }
// };

export const postCategory = text => async function(dispatch) {
    if (text === "") return;
    try {
        const newCategory = { description: text };
        const response = await Auth.fetch(`${API_URL}/category`, {
            method: "POST",
            body: JSON.stringify(newCategory)
        });
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

// export const postAnswer = (id, text) => async function(dispatch) {
//     if (text === "") return;
//     try {
//         const response = await Auth.fetch(`${API_URL}/questions/${id}/answers`, {
//             method: "POST",
//             body: JSON.stringify({text: text})
//         });
//
//         if (response.status === 401) {
//             dispatch(showAndHideAlert("Login", "You need to login to post answers!", "alert"));
//             await navigate("/login");
//         } else {
//             await response.json();
//             dispatch(loadQuestions());
//         }
//     } catch (e) {
//         dispatch(showAndHideAlert("Give answer error", e.message, "error"));
//         console.error(e);
//     }
// };

export const postBook = (id, book) => async function(dispatch) {
    if (book === null) return;
    try {
        const response = await Auth.fetch(`${API_URL}/category/${id}/books`, {
            method: "POST",
            body: JSON.stringify(book)
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

// export const voteAnswerUp = (questionId, answerId) => async function(dispatch) {
//     try {
//         const response = await Auth.fetch(`${API_URL}/questions/${questionId}/answers/${answerId}/vote`, {
//             method: "PUT",
//             body: JSON.stringify({voteCount: 1})
//         });
//         if (response.status === 401) {
//             dispatch(showAndHideAlert("Login", "You need to login to vote!", "alert"));
//             await navigate("/login");
//         }
//         await response.json();
//         dispatch(loadQuestions());
//     } catch (e) {
//         dispatch(showAndHideAlert("Vote error", e.message, "error"));
//         console.error(e);
//     }
// };
// export const loadBook = (catId, bookId) => async function(dispatch) {
//     try {
//         const response = await Auth.fetch(`${API_URL}/category/${catId}/books/${bookId}`);
//         if (response.status === 401) {
//             dispatch(showAndHideAlert("Login", "You need to login to vote!", "alert"));
//             await navigate("/login");
//         }
//         await response.json();
//         dispatch();
//     } catch (e) {
//         dispatch(showAndHideAlert("Vote error", e.message, "error"));
//         console.error(e);
//     }
// };

