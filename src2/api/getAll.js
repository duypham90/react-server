const getAll = () => (
    fetch('http://localhost:3000/api/product/all')
        .then(res => res.json())
);
export default getAll;