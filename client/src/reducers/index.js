import { combineReducers } from 'redux';

// function questions(state = [], action) {
//     switch (action.type) {
//         case 'ADD_CATEGORY': {
//             return [...action.questions];
//         }
//         default:
//             return state
//     }
// }
function categories(state = [], action) {
    switch (action.type) {
        case 'ADD_CATEGORY': {
            return [...action.categories];
        }
        default:
            return state
    }
}

// function book(state = [], action) {
//     switch (action.type) {
//         case 'ADD_BOOK': {
//             return {
//
//             };
//         }
//         default:
//             return state
//     }
// }


// function book(state = [], action){
//     switch (action.type) {
//         case 'SHOW_BOOK': {
//             return {
//                 title: action.book.title,
//                 author: action.book.author,
//                 cat: action.book.cat,
//                 sellerName: action.book.sellerName,
//                 sellerEmail: action.book.sellerEmail
//                 // title: "TestTitle",
//                 // author: "TestAuthor",
//                 // cat: "TestCat",
//                 // sellerName: "TestSellerName",
//                 // sellerEmail: "TestSellerEmail"
//             }
//         }
//         default:
//             return state
//     }
// }

function user(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_CRED': {
            return { username: action.username };
        }
        case 'REMOVE_USER_CRED': {
            return { username: "" };
        }
        default:
            return state
    }
}

function notifications(state = {}, action) {
    switch (action.type) {
        case 'SHOW_ALERT': {
            return {
                title: action.title,
                text: action.text,
                active: true,
                level: action.level
            }
        }
        case 'HIDE_ALERT': {
            return {
                active: false
            }
        }
        default:
            return state
    }
}


export default combineReducers({
    categories, user, notifications
})
