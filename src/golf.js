function fetchAllData() {
    const query = 'https://www.oldmanchestergolfclub.xyz/api/home'
    return window.fetch(query).then(response => response.json())

}

export {fetchAllData}