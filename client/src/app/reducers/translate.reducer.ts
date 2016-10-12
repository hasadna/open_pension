import {Language} from "../constants/actions";
import {LANG_HE_NAME} from "../translation/lang-he";
/**
 * Created by ranwahle on 10/10/2016.
 */


export function TranslateReducer(state = [], action){
  if (!action.type){
    return [LANG_HE_NAME];
  }

  switch (action.type) {
    case Language.Change: {
      return action.payload;
    }
  }

    return state;

}
