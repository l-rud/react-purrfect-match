export const calculateMatch = (values, breed) => {
    return Object.keys(values).reduce((total, key) => {
        return total + Math.abs(breed[key] - values[key]);
    }, 0);
};

export const sortBreeds = (breeds, values) => {
    return breeds.sort((a, b) => {
        return calculateMatch(values, a) - calculateMatch(values, b);
    });
};