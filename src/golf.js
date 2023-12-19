import config from './config'


function fetchAllData() {
    const query = `${config.apiUrl}api/home`
    return window.fetch(query).then(response => response.json())

}

export {fetchAllData}