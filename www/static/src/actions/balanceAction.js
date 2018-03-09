import { MClient } from '../config/asteroid.config.js';


export const GET_BALANCE_SUCCESS = "GET_BALANCE_SUCCESS";
export const GET_BALANCE_FAILD = "GET_BALANCE_FAILD";
export const GET_BALANCE_INCOMES_TOTAL_SUCCESS = "GET_BALANCE_INCOMES_TOTAL_SUCCESS";
export const GET_BALANCE_INCOMES_TOTAL_FAILD = "GET_BALANCE_INCOMES_TOTAL_FAILD";




function getBalanceSuccess(balance) {
    return {
       type:  GET_BALANCE_SUCCESS ,
       balance
    }
}

function getBalanceIncomesTotalSuccess(total) {
    return {
        type:  GET_BALANCE_INCOMES_TOTAL_SUCCESS,
        total
    }
}





export function getBalance(userId) {
  return  dispatch => {
        MClient.sub("app.get.current.balance",[userId]);
        MClient.connect();
        MClient.on("added", ({collection, id, fields}) => {
            if(collection==='balances'){
                let balance = fields
                balance.id = id
                dispatch(getBalanceSuccess(balance))
            }
        });
    }
}

export function getBalanceIncomesTotal(userId) {
    return dispatch => {
        let methodId = MClient.method('app.get.balance_incomes.toady.total',[userId]);
        MClient.on("result", message => {
            console.log('result');
            console.log(message);
            // if(message.result.total){
            //     dispatch(getBalanceIncomesTotalSuccess(message.result));
            //     console.log(`执行一次`)
            // }
            // if (message.id === methodId && !message.error) {
            // console.log("执行一次")
            // console.log(message.result)
            //     dispatch(getBalanceIncomesTotalSuccess(message.result));
            // }else{
            //   console.log(message);
            //   console.log(methodId)
            //   console.log(message.id);
            //   console.log("发生错误")
            // }
        });
    }
}
