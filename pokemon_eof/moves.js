const searchBar = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchButton');
const resultsContainer = document.querySelector('#results');

searchButton.addEventListener('click', handleSearch);
searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

async function handleSearch() {
    const query = searchBar.value;
    resultsContainer.innerHTML = '<p>Searching Database...</p>';
    const data = await pokeAPI(query);
    if (!data) {
        resultsContainer.innerHTML = '<p>No move or Pokemon found with that name.</p>';
        return;
    }

    if (data.dataType === 'move') {
        displayMoveData(data.data);
    } else if (data.dataType === 'pokemon') {
        displayPokemonMoves(data.data);
    }
};

async function pokeAPI(query) {
    const cleanedQuery = query.trim().toLowerCase().replace(/\s+/g, '-');
    try {
        const moveResponse = await fetch(`https://pokeapi.co/api/v2/move/${cleanedQuery}`);
        if (!moveResponse.ok) {
            throw new Error('Move not found');
        }
        const data = await moveResponse.json();
        const moveData = extractMoveData(data);
        return {dataType: 'move', data: moveData};
    } catch (error) {
        try {
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${cleanedQuery}`);
            if (!pokemonResponse.ok) {
                throw new Error('Pokemon not found');
            }
            const data = await pokemonResponse.json();
            const movesData = await extractPokemonMoves(data);
            return {dataType: 'pokemon', data: movesData};
        } catch (finalError) {
            return null;
        }
    }
}

function extractMoveData(apiResponse) {
    const englishDescription = apiResponse.flavor_text_entries.find(entry => entry.language.name === 'en');
    let description;
    if (englishDescription) {
        description = englishDescription.flavor_text.replace(/\n|\f/g, ' ');
    } else {
        description = 'No description available.';
    }
    return {
        name: apiResponse.name,
        type: apiResponse.type.name,
        damage_class: apiResponse.damage_class.name,
        power: Math.ceil(apiResponse.power / 10) ?? 'N/A',
        accuracy: apiResponse.accuracy ?? 'N/A',
        pp: apiResponse.pp,
        description: description
    };
}

async function fetchDetailedMoveList(moveList) {
    const detailedPromises = moveList.map(async (move) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${move.name}`);
            if (!response.ok) return null;
            const data = await response.json();
            return {
                level: move.level,
                details: extractMoveData(data)
            };
        } 
        catch {
            return null
        }
    });
    const detailedMoves = await Promise.all(detailedPromises);
    return detailedMoves.filter(move => move !== null);
}

async function extractPokemonMoves(apiResponse) {
    const dataLists = {
        name: apiResponse.name,
        art: apiResponse.sprites.other['official-artwork'].front_default,
        levelUpMoves: [],
        tmMoves: [],
        tutorMoves: [],
        eggMoves: []
    };

    const preferredVersions = ['scarlet-violet', 'sword-shield', 'sun-moon', 'x-y', 'black-white'];
    apiResponse.moves.forEach(moveData => {
        let gameVersion = null;
        for (const version of preferredVersions) {
            gameVersion = moveData.version_group_details.find(v =>
                v.version_group.name === version
            );
            if (gameVersion) break;
        }
        if (!gameVersion) return;

        const moveName = moveData.move.name;
        const method = gameVersion.move_learn_method.name;

        switch (method) {
            case 'level-up':
                const processedLevel = Math.min(Math.floor(gameVersion.level_learned_at / 5) + 1, 20);
                dataLists.levelUpMoves.push({
                    name: moveName,
                    level: processedLevel
                });
                break;
            case 'machine':
                dataLists.tmMoves.push({
                     name: moveName,
                     level: 'TM'
                    });
                break;
            case 'tutor':
                dataLists.tutorMoves.push({
                     name: moveName,
                     level: 'Tutor'
                    });
                break;
            case 'egg':
                dataLists.eggMoves.push({
                     name: moveName,
                     level: 'Egg'
                    });
                break;
        }
    });
    dataLists.levelUpMoves.sort((a, b) => a.level - b.level);

    dataLists.levelUpMoves = await fetchDetailedMoveList(dataLists.levelUpMoves);
    dataLists.tmMoves = await fetchDetailedMoveList(dataLists.tmMoves);
    dataLists.tutorMoves = await fetchDetailedMoveList(dataLists.tutorMoves);
    dataLists.eggMoves = await fetchDetailedMoveList(dataLists.eggMoves);

    return dataLists;
}

function formatName(name) {
    const words = name.replace(/-/g, ' ').split(' ');
    const formattedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return formattedWords.join(' ');
}

function generateMoveCardHTML(moveData, level) {
    return `
        <div class="move-card">
            <div class="move-badge">${level}</div>
            <div class="move-grid-content">
                <div class="move-stats-row">
                    <div class="move-cell move-name">${formatName(moveData.name)}</div>
                    <div class="move-cell move-type type-${moveData.type.toLowerCase()}">${formatName(moveData.type)}</div>
                    <div class="move-cell">${formatName(moveData.damage_class)}</div>
                    <div class="move-cell"><span>Pow:</span> ${moveData.power}</div>
                    <div class="move-cell"><span>Acc:</span> ${moveData.accuracy}${moveData.accuracy !== 'N/A' ? '%' : ''}</div>
                    <div class="move-cell"><span>PP:</span> ${moveData.pp}</div>
                </div>
                <div class="move-description-row">
                    ${moveData.description}
                </div>
            </div>
        </div>
    `
}

function displayMoveData(moveData, level = '—') {
    resultsContainer.innerHTML = generateMoveCardHTML(moveData, level);
}

function displayPokemonMoves(pokemonMovesData) {
    resultsContainer.innerHTML = '';
    
    const pokemonHTML = `
        <div class="pokemon-profile">
            <h3>${formatName(pokemonMovesData.name)}</h3>
            <img src="${pokemonMovesData.art}" alt="${pokemonMovesData.name}" class="pokemon-sprite">
        </div>
        
        <div class="move-list-section">
            <h4>Level-Up Moves</h4>
            <div class="moves-grid-container">
                ${pokemonMovesData.levelUpMoves.map(item => generateMoveCardHTML(item.details, item.level)).join('')}
            </div>
            
            <h4>TM Moves</h4>
            <div class="moves-grid-container">
                ${pokemonMovesData.tmMoves.map(item => generateMoveCardHTML(item.details, item.level)).join('')}
            </div>
            
            <h4>Tutor Moves</h4>
            <div class="moves-grid-container">
                ${pokemonMovesData.tutorMoves.map(item => generateMoveCardHTML(item.details, item.level)).join('')}
            </div>
            
            <h4>Egg Moves</h4>
            <div class="moves-grid-container">
                ${pokemonMovesData.eggMoves.map(item => generateMoveCardHTML(item.details, item.level)).join('')}
            </div>
        </div>
    `;
    resultsContainer.innerHTML = pokemonHTML;
}