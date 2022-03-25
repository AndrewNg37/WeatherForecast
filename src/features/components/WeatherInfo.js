import React from 'react';
import moment from 'moment';

export function WeatherInfo(props) {

    return (
        <div className="card">
            <div className="card-header">
                Weather Info
            </div>
            <div className="card-body">
                <div className="d-flex flex-row">
                    <table className="table table-sm table-borderless table-responsive">
                        <tbody>
                            <tr>
                                <td colSpan={2}>{props.city} {props.country ? ' ,' + props.country : ''}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>

                                    {
                                        props.description.map((data, index) => {
                                            return (
                                                <img key={index} src={`http://openweathermap.org/img/w/${data.icon}.png`} alt="weather icon" />
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th className="text-muted fw-normal" style={{ width: '150px' }}>Description:</th>
                                <tr>
                                    <td colSpan={2}>
                                        {
                                            props.description.map((data, index) => {
                                                return (
                                                    <span key={index}>{index <= 0 ? data.description : ' ,' + data.description}</span>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                            </tr>
                            <tr>
                                <th className="text-muted fw-normal">Temperature:</th>
                                <td>{props.temperature.temp_min + '-' + props.temperature.temp_max}</td>
                            </tr>
                            <tr>
                                <th className="text-muted fw-normal">Humidity:</th>
                                <td>{props.temperature.humidity}</td>
                            </tr>
                            <tr>
                                <th className="text-muted fw-normal">Time:</th>
                                <td>{props.time ? moment(props.time).format('hh:mm:ss a') : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
