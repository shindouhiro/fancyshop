//=============
import {loadLoginedUserInfo} from './users';
export const LOAD_ACCESS_FOR_CURRENT_USER = "LOAD_ACCESS_FOR_CURRENT_USER";
export const EXPECT_ACCESS_FOR_CURRENT_USER = "LOAD_ACCESS_FOR_CURRENT_USER";


function expectAccessForCurrentUser(){
    return {
        type: EXPECT_ACCESS_FOR_CURRENT_USER,
    }
}
export function loadAccessForCurrentUser(productId){
    return (dispatch, getState) =>{
        
        if(getState().AppUser.roles[0]==="nobody"){
            dispatch(loadLoginedUserInfo());
        }
        dispatch(expectAccessForCurrentUser());

    }
}