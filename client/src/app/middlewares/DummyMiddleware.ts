/**
 * Created by ranwahle on 19/09/2016.
 */
import {Injectable} from "@angular/core";
@Injectable()

export class DummyMiddleware{
    middleware = store => next => action => {
        return next(action);
    }
}