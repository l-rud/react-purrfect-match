export const getBreeds = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    return response.json();
};

export const getRandomCatInfo = async (breedId) => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.json();
};