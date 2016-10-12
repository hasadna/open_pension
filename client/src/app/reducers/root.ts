/**
 * Created by ranwahle on 07/09/2016.
 */
import {combineReducers} from 'redux';
import {TranslateReducer} from "./translate.reducer";


export const RootReducer = combineReducers({
    language: TranslateReducer
});
