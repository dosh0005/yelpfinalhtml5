import axios from "axios";

export const ELEMENT_CLICK_BACK = "YELP_ITEM_CLICKED";
export const ELEMENT_FETCHED = "YELP_ITEM_FETCHED_SUCCESS";
export const ELEMENT_FETCHING = "YELP_ITEM_FETCHING";
export const ELEMENT_LIST = "YELP_ITEM_LIST";


// ----------------------------------------------------------
// Call back function for fetch process
// ----------------------------------------------------------


export function fetchProcessing(isFetching){
    return {
        type: ELEMENT_FETCHING,
        clickFetching: isFetching
    };
}


// ----------------------------------------------------------
// Call back function for fetch Success
// ----------------------------------------------------------


export function fetchSuccess(data) {
    return {
        type: ELEMENT_FETCHED,
        data: data
    };
}


// ----------------------------------------------------------
// Call back function for Item Click
// ----------------------------------------------------------


export function itemClicked(business){
    return {
        type: ELEMENT_CLICK_BACK,
        business: business
    };
}

// ----------------------------------------------------------
// Call back function for Item Click back to home
// ----------------------------------------------------------


export function actionBack(isGoingBack){
    return{
        type: ELEMENT_LIST,
        click_Back_To_Home: isGoingBack
    };
}

// ----------------------------------------------------------
// Call back function for Item Click back to home
// ----------------------------------------------------------


export function backToMasterList(){
    return (dispatch)=>  {
        dispatch(actionBack(true));
    };
}

// ----------------------------------------------------------
// Call back function for fetch data for element list
// ----------------------------------------------------------


export function element_data_fetched() {
    return (dispatch)=> {

        dispatch(fetchProcessing(true));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("in getGeo..");
                console.log("coords: " + position.coords.latitude + position.coords.longitude);
                dispatch(yelpAPIFunction(position.coords.latitude, position.coords.longitude));
            },
            (error) => {
                console.log("Error", error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
}


// ----------------------------------------------------------
// Call back function for Yelp API
// ----------------------------------------------------------


export function yelpAPIFunction(lat, long) {
    return (dispatch) => {

        // yelp data fetching..

        let APIkey = "ppy398XYSCURUjafwPtNjU4YhV-SLRnuTgfRgZ4SIDyE8m3YIdtUKIbWEFUQiPJ3JwyCS8btxNBZvq64iBE9d3m-wQAQhBJs3Ox6Ht_Kz7Ew-PDYY9V50elWdqxWWnYx";
        let url = "https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + long;

        let options = {
            headers: {
                "Authorization": "Bearer " + APIkey
            }
        };

        axios.get(url, options).then((response) => {
            console.log(response);
            return response.data;
        }).then((data) => {
            dispatch(fetchProcessing(false));
            dispatch(fetchSuccess(data));
        }).catch(function (error) {
            console.log('error: ' + error.message);
            throw error;
        });
    };
}


