/**
 * Created by ranwahle on 19/09/2016.
 */
import {Injectable} from "@angular/core";
import {applyMiddleware, createStore} from "redux";
import {RootReducer} from "./reducers/root";
import {APP_Middlewares} from "./middlewares/app.middlewares";
import {LANG_HE_NAME} from "./translation/lang-he";
@Injectable()
export class Store{

    private  store;

    constructor(){
        this.store = createStore(RootReducer,applyMiddleware(...APP_Middlewares.map(item => item.middleware)));
         this.store.getState().language = LANG_HE_NAME;
    }

    get state(){
        return this.store.getState();
    }

    dispatch(action){
        this.store.dispatch(action)
    }
}
