import { ELEMENT_CLICK_BACK, ELEMENT_FETCHED, ELEMENT_LIST, ELEMENT_FETCHING} from "../app_function";

export default function reducers(state, action) {
    let modifiedState = Object.assign({}, state);
    let dataItems = [];
    // Switch statement for click events.
    switch(action.type) {
        case ELEMENT_FETCHING:
            modifiedState.element_Fetching = action.element_Fetching;
            break;

        case ELEMENT_FETCHED:
            let newBusinessData = modifiedState.data.map((i) => {
                return Object.assign({}, i);
            });
            for(let i = 0; i < action.data.businesses.length; i++){
                let business = action.data.businesses[i];
                newBusinessData.push(business);
            }
            modifiedState.data = newBusinessData;
            break;

        case ELEMENT_CLICK_BACK:
            dataItems = action.business;
            console.log("CLICKED ON " + dataItems.name.toString());
            modifiedState.click_Back_To_Home = false;
            modifiedState.Element_click = dataItems;
            break;

        case ELEMENT_LIST:
            modifiedState.click_Back_To_Home = action.click_Back_To_Home;
            break;

        default:
            return modifiedState;
    }

    return modifiedState;
}