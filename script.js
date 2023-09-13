

const apiUrlBreeds = 'https://api.thecatapi.com/v1/breeds';

const apiUrlImages = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

async function fetchCatBreeds() {
    try {
        const response = await fetch(apiUrlBreeds);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const breedContainer = document.getElementById('breed-container');

        data.forEach(async breed => {
            const breedCard = document.createElement('div');
            breedCard.classList.add('breed-card');

            const name = document.createElement('h2');
            name.textContent = breed.name;
            breedCard.appendChild(name);

            const origin = document.createElement('p');
            origin.textContent = `Origin: ${breed.origin}`;
            breedCard.appendChild(origin);

            const imageResponse = await fetch(`${apiUrlImages}${breed.id}`);
            const imageJSON = await imageResponse.json();
            const image = document.createElement('img');
            image.src = imageJSON[0].url;
            image.alt = `${breed.name} Cat`;
            breedCard.appendChild(image);

            const button = document.createElement('button');
            button.textContent = 'More Info';
            button.addEventListener('click', () => {
                window.open(breed.vetstreet_url, '_blank');
            });
            breedCard.appendChild(button);

            breedContainer.appendChild(breedCard);
        });
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
}


fetchCatBreeds();
