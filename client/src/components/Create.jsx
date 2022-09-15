import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    //keeps track of what is being typed via useState hook
    const [name, setName] = useState("");
    const [album, setAlbum] = useState("");
    const [description, setDescription] = useState("");
    const [sales, setSales] = useState(0);
    const [image, setImage] = useState('https://ps.w.org/kama-thumbnail/assets/icon-256x256.png?rev=1627018');
    const [isOwned, setIsOwned] = useState(false);
    const [genres, setGenres] = useState(["", "", ""]);
    const [review, setReview] = useState("bad");
    // errors
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/new", {
            name , album, description, sales, image, genres, isOwned, review
        })
        .then(res => navigate("/"))
        .catch(err => {
            // assign object of responses from the backend to a var
            const errorResponse = err.response.data.errors;
            // set array to push errors into it
            const errorArr = [];
            // loop through errors to get messages
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    // // check if checkbox is checked
    // const handleChange = event => {
    //     event.target.checked ? setIsOwned(true) : setIsOwned(false)
    // };

    const handleGenreChange = (e, idx) => {
        let tempArr = JSON.parse(JSON.stringify(genres));
        tempArr[idx] = e.target.value;
        setGenres(tempArr);
    }

    //onChange to update name, price and description
    return (
        <div>
            <Link to={"/"}>home</Link>
            {       errors && errors.map((error, idx) => {
                    return (
                    <p style={{color: 'red'}} key={idx}>{error}</p>
                    )
                })
            }
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Name</label><br />
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {name.length && name.length < 3 ? (<p style={{color: 'red'}}>
                        name must be at least 3 characters</p>) : null}
                </p>
                <p>
                    <label>album</label><br />
                    <input type="text" onChange={(e) => setAlbum(e.target.value)} value={album} />
                    {album.length && album.length < 3 ? (<p style={{color: 'red'}}>
                        album must be at least 3 characters</p>) : null}
                </p>
                <p>
                    <label>description</label><br />
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    {description.length && description.length < 6 ? (<p style={{color: 'red'}}>
                        description must be at least 6 characters</p>) : null}
                </p>
                <p>
                    <div>
                    <label>Number</label>
                    </div>
                    <input type="number" onChange={(e) => setSales(e.target.value)} value={sales} />
                </p>
                <p>
                    <label>is owned?</label>
                    <input type="checkbox" onChange={(e)=>setIsOwned(!isOwned)} checked={isOwned} />
                </p>
                <p>
                    <label>image</label>
                    <input type="text" onChange={(e) => setImage(e.target.value)} value={image} />
                    <div>
                        <img src={image} alt="your img" />
                    </div>
                </p>
                <p>
                    <label>genre 1</label>
                    <input type="text" onChange={(e) => handleGenreChange(e, 0)} value={genres[0]} />
                </p>
                <p>
                    <label>genre 2</label>
                    <input type="text" onChange={(e) => handleGenreChange(e, 1)} value={genres[1]} />
                </p>
                <p>
                    <label>genre 3</label>
                    <input type="text" onChange={(e) => handleGenreChange(e, 2)} value={genres[2]} />
                </p>
                <div>
                <label htmlFor="review">review:</label>
                    <br />
                <select name="review" onChange={(e) => setReview(e.target.value)} value={review}>
                    <option value="bad">bad</option>
                    <option value="good">good</option>
                    <option value="great">great</option>
                </select>
                </div>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Create