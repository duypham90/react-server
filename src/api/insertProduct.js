const insertPro = (name) => {
    const option = {
        headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
        },
        method: 'POST',
        body: JSON.stringify({name})
    };
    return fetch('http://localhost:3000/insert', option).then(res => res.json());
}
export default insertPro;