import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/')
      .then(res => {setRecords(res.data)})
      .catch(err => console.log(err))
  }, [])
  
  // delete
  const removeFromDom = recordId => {
    setRecords(records.filter(record => record._id !== recordId))
  }

  const deleteRecord = (recordId) => {
    axios.delete('http://localhost:8000/api/record/'+ recordId)
      .then(res => {removeFromDom(recordId)})
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Link to={"/new"}>Add record</Link>
      {records && records.map((record) => {
                return <p key={record._id}>
                  <Link to={"/records/" + record._id}>
                        {record.name}
                    </Link>
                    | 
                    {record.album}
                    |
                    {record.description}
                    <button onClick={(e)=>{deleteRecord(record._id)}}>
                        Delete
                    </button>
                    <Link to={"/records/edit/" + record._id}>
                        edit
                    </Link>
                </p>
            })}
    </div>
  )
}
export default List;