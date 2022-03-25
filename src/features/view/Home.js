import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { homeState, getWeatherAsync, removeHistory, setCurrentSearch } from '../controller/Home';
import { SearchForm } from '../components/SearchForm';
import { WeatherInfo } from '../components/WeatherInfo';
import { Alert } from '../components/Alert';
import moment from 'moment';

export function Home() {

    const dispatch = useDispatch();
    const state = useSelector(homeState);

    const searchWeather = (city, country) => {
        var requestData = {
            city: city,
            country: country
        }
        dispatch(getWeatherAsync(requestData));
    }

    const showSelectedInfo = (data) => {
        dispatch(setCurrentSearch(data));
    }

    const removeSelectedHistory = (data) => {
        dispatch(removeHistory(data));
    }

    return (
        <div id="Page-Home" className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <SearchForm searchWeather={(city, country) => searchWeather(city, country)} />
                    </div>
                </div>
                {state && state.errorMessage && <div className="row mt-4">
                    <div className="col-md-12">
                        <Alert AlertMessage={state.errorMessage} />
                    </div>
                </div>}
                {state && state.currentSearchInfo && <div className="row mt-4">
                    <div className="col-md-12">
                        <WeatherInfo city={state.currentSearchInfo.name} country={state.currentSearchInfo.countryCode} description={state.currentSearchInfo.weather} temperature={state.currentSearchInfo.main} time={state.currentSearchInfo.dateTime} />
                    </div>
                </div>}
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="pb-1 border-bottom">
                            <p className="m-0 fw-bolder fs-4">Search History</p>
                        </div>
                        <table className="table table-based table-responsive mt-3">
                            <thead>
                                <tr>
                                    <th width="100">No.</th>
                                    <th>City, Country</th>
                                    <th>Time</th>
                                    <th width="100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state && state.weatherHistory.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">{index + 1}</td>
                                                <td className="align-middle">{data.name}</td>
                                                <td className="align-middle">{data.dateTime ? moment(data.dateTime).format('hh:mm:ss a') : ''}</td>
                                                <td>
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <button className="btn btn-light rounded-circle me-3" onClick={() => showSelectedInfo(data)} title="View Temp"><i className="bi bi-search pe-1"></i></button>
                                                        <button className="btn btn-light rounded-circle" onClick={() => removeSelectedHistory(data)} title="delete"><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}
