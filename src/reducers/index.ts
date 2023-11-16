import { combineReducers } from 'redux';
import { ActionTypeEnum } from "../actions";

export function rotation(state = {}, action : { type: ActionTypeEnum }) {
    switch (action.type) {
        case ActionTypeEnum.STOP:
            return {
                process: false,
            };
        case ActionTypeEnum.ROTATE:
            return {
                process: true,
            };
        default:
            return {
                process: false,
            }
    }
}

const rootReducer = combineReducers({
    rotation
});

export default rootReducer;
