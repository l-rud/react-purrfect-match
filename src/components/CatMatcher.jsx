import { useState } from 'react';
import { getBreeds, getRandomCatInfo } from './Api';
import { sortBreeds } from './Utill';
const CatMatcher = () => {
    // const [breeds, setBreeds] = useState([]);
    const [catImage, setCatImage] = useState('');
    const [breedName, setBreedName] = useState('');
    const [breedDescription, setBreedDescription] = useState('');
    const [values, setValues] = useState({
        adaptability: 3,
        affection_level: 3,
        energy_level: 3,
        intelligence: 3,
        social_needs: 3,
        stranger_friendly: 3,
        vocalisation: 3,
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // State to manage visibility of selection fields

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: parseInt(event.target.value)
        });
    };

    const handleFindButtonClick = async () => {
        const breedsData = await getBreeds();
        const sortedBreeds = sortBreeds(breedsData, values);
        const selectedBreed = sortedBreeds[0];

        if (selectedBreed) {
            const catsData = await getRandomCatInfo(selectedBreed.id);
            setCatImage(catsData[0].url);
            setBreedName(selectedBreed.name);
            setBreedDescription(selectedBreed.description);
            setIsSubmitted(true); // Hide selection fields
        }
    };

    const handleResetButtonClick = () => {
        setIsSubmitted(false); // Show selection fields again
        setCatImage('');
        setBreedName('');
        setBreedDescription('');
        setValues({
            adaptability: 3,
            affection_level: 3,
            energy_level: 3,
            intelligence: 3,
            social_needs: 3,
            stranger_friendly: 3,
            vocalisation: 3,
        });
    };

    return (
        <div className="container">
            {!isSubmitted ? (
                <>
                    <h1>If you were a cat, what would you look like? <br />Find out!</h1>
                    <div className="form-container">
                        <h2>Tell us a little about yourself.<br />Rate your ability (with 1 being the lowest and 5 the highest):</h2>
                        {Object.keys(values).map((key) => (
                            <div className="form-group" key={key}>
                                <label htmlFor={key}>
                                    {key.replace(/_/g, ' ').toUpperCase()}
                                </label>
                                <select
                                    id={key}
                                    name={key}
                                    value={values[key]}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button onClick={handleFindButtonClick}>Find out</button>
                    </div>
                </>
            ) : (
                <h1>If you were a cat, you would look like:</h1>
            )}
            {catImage && (
                <div className="result-card">
                    <img src={catImage} alt={breedName} className="cat-image" />
                    <h3>{breedName}</h3>
                    <p>{breedDescription}</p>
                    <button onClick={handleResetButtonClick}>Reset</button>
                </div>
            )}
        </div>
    );
};

export default CatMatcher;