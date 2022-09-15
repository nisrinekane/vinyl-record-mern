import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [album, setAlbum] = useState('');
    const [description, setDescription] = useState('');
    const [sales, setSales] = useState(0);
    const [isOwned, setIsOwned] = useState(false);
    // errors
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/records/' + id)
            .then(res => {
                setName(res.data.name);
                setAlbum(res.data.album);
                setDescription(res.data.description);
                setSales(res.data.sales);
                setIsOwned(res.data.isOwned)
            })
    }, []);


    const updateRecord = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/records/edit/${id}`, {
            name,
            album,
            description,
            isOwned,
            sales,
        })
            .then(res => navigate('/'))
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    return (
        <div>
            {
                errors && errors.map((error, idx) => {
                    return (
                        <p style={{ color: 'red' }} key={idx}>{error}</p>
                    )
                })
            }
            <h1>Update a Record</h1>
            <form onSubmit={updateRecord}>
                <p>
                    <label>Name</label><br />
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {name.length && name.length < 3 ? (<p style={{ color: 'red' }}>
                        name must be at least 3 characters</p>) : null}
                </p>
                <p>
                    <label>album</label><br />
                    <input type="text" onChange={(e) => setAlbum(e.target.value)} value={album} />
                    {album.length && album.length < 3 ? (<p style={{ color: 'red' }}>
                        album must be at least 3 characters</p>) : null}
                </p>
                <p>
                    <label>description</label><br />
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    {description.length && description.length < 6 ? (<p style={{ color: 'red' }}>
                        description must be at least 6 characters</p>) : null}
                </p>
                <p>
                    <div>
                        <label>Number</label>
                    </div>
                    <input type="number" onChange={(e) => setSales(e.target.value)} value={sales} />
                </p>
                <p>
                    <label>is owned? </label>
                    <input type="checkbox" onChange={()=>(setIsOwned(!isOwned))} checked={isOwned} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Update;

