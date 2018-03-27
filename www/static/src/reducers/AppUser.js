import { EXPECT_LOGOUT, LOGOUT_SUCCESS, EXPECT_LOGIN_SMS_CODE, 
    GET_LOGIN_SMS_CODE_SUCCESS, GET_LOGIN_SMS_CODE_FAIL, 
    LOGIN_SMS_CODE_FEED_BACK, EXPECT_LOGIN, EXPECT_LOGIN_FINISHED, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOAD_UNLOGINED_USER_INFO,
    LOAD_USER_INFO_SUCCESS, 
    MEMORY_PATH_BEFORE_LOGINED,
    EXPECT_LOGINED_USER_INFO,
    EXPECT_USER_CARD,
    VALID_TOKEN_FAIL,
    LOAD_USER_CAED_SUCCESS,
    EXPECT_REG_SMS_CODE,
    GET_REG_SMS_CODE_FAIL} from "../actions/users";

export default function AppUser(state={
    id: '',
    loading: true,
    username: "",
    stampedToken: "",
    pathBeforeLogined: "/",    
    loginStatus: "notWoken",
    loginFailReason: "",
    status: 'offline',
    loginSMSCode: '',
    validSMSCode: "",
    roles: ['nobody'],
    needToResetPassword: false,
    loginSMSCodeFeedBackTimes: 0,
    orders: [],
    card:null,
    balance: {
        incomes: [],
        charges: [],
    },
    products: [],
  }, action){
    switch (action.type) {
        case VALID_TOKEN_FAIL:
            return Object.assign({}, state, {
                loading: false,
                card: null,
                loginStatus: "notWoken",
                status: 'offline',
            })
        case EXPECT_REG_SMS_CODE:
            return Object.assign({}, state, {
                regSMSCode: "loading",
            })
        case GET_REG_SMS_CODE_FAIL:
            return Object.assign({}, state, {
                regSMSCode: "error",
                regFailReason: action.reason,
            })
        case EXPECT_LOGINED_USER_INFO:
            return Object.assign({}, state, {
                loading: true,
            })
        case LOAD_UNLOGINED_USER_INFO:
            return Object.assign({}, state, {
                loading: false,
            })
        case LOAD_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                stampedToken: action.stampedToken,
                expiredLoginTime: action.expiredLoginTime,
                id: action.userId,
                loginStatus: "logined",
                status: "online",
                username: action.user.username,
                roles: ["nobody","loginedUser"],
                loading: false,
            })
        case EXPECT_USER_CARD:
            return Object.assign({}, state, {
                loading: true,
                card: null,
            });
        case LOAD_USER_CAED_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                card: action.card,
            });
        
        case MEMORY_PATH_BEFORE_LOGINED:
            return Object.assign({}, state, {
                pathBeforeLogined: action.path,
            })
        case EXPECT_LOGIN:
            return Object.assign({}, state, {
                loginStatus: "logining",
            })
        case EXPECT_LOGIN_FINISHED:
            return Object.assign({}, state, {
                loginStatus: "notWoken",
            })
        case LOGIN_SUCCESS: 
            return Object.assign({}, state, {
                stampedToken: action.stampedToken,
                expiredLoginTime: action.expiredLoginTime,
                id: action.userId,
                loginStatus: "logined",
                status: "online",
            })
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                loginFailReason: action.reason,
                loading: false,
            });
        case EXPECT_LOGOUT:
            return Object.assign({}, state, {
                status: 'logouting',
                loading: true,
            });
        case LOGOUT_SUCCESS:
            let roles = state.roles;
            roles.push("loginedUser");
            return Object.assign({}, state, {
                stampedToken: "",
                expiredLoginTime: "",
                id: "",
                loginStatus: "",
                status: 'offline',
                roles,
                loading: false,
            });
        case EXPECT_LOGIN_SMS_CODE:
            return Object.assign({}, state, {
                loginSMSCode: "loading",
            });
        case GET_LOGIN_SMS_CODE_SUCCESS:
            return Object.assign({}, state, {
                    loginSMSCode: action.code,
            })
        case GET_LOGIN_SMS_CODE_FAIL:
            return  Object.assign({}, state, {
                loginSMSCode: "error",
            })    
        case LOGIN_SMS_CODE_FEED_BACK:  
            return  Object.assign({}, state, {
                loginSMSCodeFeedBackTimes: action.feedBackTimes,
            })
        default:
            return state;
    }
  }