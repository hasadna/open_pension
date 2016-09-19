/**
 * Created by ranwahle on 19/09/2016.
 */
import {Injectable} from "@angular/core";
import {applyMiddleware, createStore} from "redux";
import {RootReducer} from "./reducers/root";
import {APP_Middlewares} from "./middlewares/app.middlewares";
@Injectable()
export class Store{

    private  store;

    constructor(){
        this.store = createStore(RootReducer,applyMiddleware(...APP_Middlewares.map(item => item.middleware)));
    }

    get state(){
        return this.store.getState();
    }

    dispatch(action){
        this.store.dispatch(action)
    }
}