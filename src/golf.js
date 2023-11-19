function fetchAllData() {
    const query = 'http://127.0.0.1:8000/api/home'
    return window.fetch(query).then(response => response.json())

}

export {fetchAllData}