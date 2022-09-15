// display info of one record and edit option
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
    
const Detail = () => {
    const [record, setRecord] = useState({})
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/records/'+ id)
            .then(res => setRecord(res.data))
            .catch(err => console.error(err));
    }, [id]);
    
    return (
        <div>
            <img src={record.image} alt="" />
            <h3>Name: {record.name}</h3>
            <p>album: {record.album}, Description: {record.description}</p>
            <Link to={`/records/edit/${id}`}>
                Edit
            </Link>
            <p>owned? {record.isOwned ? 'yes': 'no'}</p>
            <p>review: {record.review}</p>
            <p>sales: {record.sales}</p>
        </div>
    )
}
    
export default Detail;