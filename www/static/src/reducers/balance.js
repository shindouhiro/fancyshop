
import { GET_BALANCE ,GET_BALANCE_INCOMES_TOTAL } from '../actions/balance';

export function balance(state={
    status: "ready",
    loadingText: "开始加载",
    balance: null,
    todayTotal: 0,
    weekTotal: 0,
    monthTotal: 0,
    total: {
        todayTotal: 0,
        weekTotal: 0,
        monthTotal: 0,
    }
},action){
    switch(action.type) {
        case GET_BALANCE:
        return  Object.assign({},state,{balance: action.balance})
            break;
        case GET_BALANCE_INCOMES_TOTAL:
        return Object.assign({},state,{total: action.total})
            break;
        default:
        return state
    }
}