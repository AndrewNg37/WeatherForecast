import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeather } from '../API/Home';

const initialState = {
    data: [],
    cities: [],
    runningNumber: 0,
    currentSearchInfo: null,
    weatherHistory: [],
    status: "idle",
    revertOption: null,
    errorMessage: ""
};

export const getWeatherAsync = createAsyncThunk(
    'weather/getWeather',
    async (data, ThunkAPI) => {
        const response = await getWeather(data);
        const resultPromise = Promise.resolve(response);
        resultPromise.then((responseData) => {
            console.log(responseData);
            if (!responseData.cod) {
                ThunkAPI.dispatch(saveHistory(responseData, data.country));
            } else {
                ThunkAPI.dispatch(searchError(responseData));
            }
        })
        return response;
    }
);

export const WeatherSlice = createSlice({
    name: 'Weather',
    initialState,
    reducers: {
        addHistory: (state, action) => {
            state.errorMessage = null;
            state.weatherHistory = action.payload;
            state.runningNumber = parseInt(state.runningNumber) + 1;
        },
        setCurrentSearch: (state, action) => {
            state.currentSearchInfo = action.payload;
        },
        deleteHistory: (state, action) => {
            state.weatherHistory = action.payload;
        },
        errorOnSearch: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWeatherAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getWeatherAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(getWeatherAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
    }
});

export const { addHistory, setCurrentSearch, deleteHistory, errorOnSearch } = WeatherSlice.actions;
export const homeState = (state) => state.home;

export const saveHistory = (res, country) => (dispatch, getState) => {
    var weatherHistoryList = Object.assign([], getState().home.weatherHistory);
    var newData = JSON.parse(res);
    newData.data.id = getState().home.runningNumber;
    newData.data.countryCode = country ? country : '';
    newData.data.dateTime = Date.now();

    dispatch(setCurrentSearch(newData.data));

    weatherHistoryList.push(newData.data);
    dispatch(addHistory(weatherHistoryList));
};

export const removeHistory = (res) => (dispatch, getState) => {
    var weatherHistoryList = Object.assign([], getState().home.weatherHistory);
    //var processData = JSON.parse(res);
    var index = weatherHistoryList.indexOf(res);
    if(index > -1){
        weatherHistoryList.splice(index, 1);
        dispatch(deleteHistory(weatherHistoryList));
    }
};

export const searchError = (res) => (dispatch, getState) => {
    dispatch(errorOnSearch(res.message));
    console.log(res.message);
};


export default WeatherSlice.reducer;
