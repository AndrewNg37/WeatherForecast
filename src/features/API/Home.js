const axios = require('axios');

export function getWeather(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                axios.get(process.env.REACT_APP_API_URL + `?id=524901&appid=${process.env.REACT_APP_API_KEY}&q=${data && data.city ? data.city : ''} ${data && data.country ? ',' + data.country : ''}`)
                    .then((data) => {
                        return JSON.stringify(data);
                    })
                    .catch((error) => {
                        // console.error('Error:', error);
                        return error.response.data;
                    })
            )
        ), 0)
}
