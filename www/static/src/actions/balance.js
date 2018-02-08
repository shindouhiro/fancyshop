import history from '../history';
import { asteroid } from '../config/asteroid.config.js';


export const GET_BALANCE = "GET_BALANCE";
export const GET_BALANCE_INCOMES_TOTAL = "GET_BALANCE_INCOMES_TOTAL";



function getBlance(balance) {
    return {
       type: GET_BALANCE,
       balance
    }
}

function getBalanceIncomesTotal(total) {
    return {
        type:  GET_BALANCE_INCOMES_TOTAL,
        total
    }
}





export function gainBlance(userId) {
  return  dispatch => {
        asteroid.subscribe("app.get.current.balance",userId);
        asteroid.connect();
        asteroid.ddp.on("added", ({collection, id, fields}) => {
            if(collection==='balances'){
                let balance = fields
                balance.id = id
                dispatch(getBlance(balance))
            }
        });
    }
}

export function gainGetBalanceIncomesTotal(userId) {
    return dispatch => {
        asteroid.call('app.get.balance_incomes.toady.total',userId)
                .then(result=> {
                    dispatch(getBalanceIncomesTotal(result.total));
                })
                .catch(error => {
                    console.log(error);
                })
    }
}