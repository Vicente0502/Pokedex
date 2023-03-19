//Definindo variáveis de retorno
const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

//Definindo variáveis de busca
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

//Função para realizar a busca pelo parametro 'pokemon' na API
const fetchPokemon = async (pokemon) => {
    //Buscando a resposta da API
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    //Se a API retornar o status 200 - OK, converter dados em json e retornar os dados
    if(APIResponse.status ==200){
        const data = await APIResponse.json()
        return data
    }
}

//Função para solicitar os dados: id, nome e imagem da API
const renderPokemon = async (pokemon) =>{

    //Enquanto não puxar os dados, nome do pokemon 'loading...' e número vazio
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    //Fazendo a variável aguardar o retorno da função fetchPokemon
    const data = await fetchPokemon(pokemon)

    //Se houver dados as variáveis serão preenchidas com os dados da API
    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        input.value = ''
        searchPokemon = data.id
    }else{ //Se não houver dados as variáveis serão retornadas de acordo com o definido abaixo
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemonNumber.innerHTML = ''
    }
    
}

//Função para o form quando for submetido
form.addEventListener('submit', (event) =>{
    //Não realiza a busca vazio
    event.preventDefault()
    //Passa para a função renderPokemon o valor preenchido transformando todas as letras em minusculas
    renderPokemon(input.value.toLowerCase())
})

//Função para o botão Prev quando houver evento de click
buttonPrev.addEventListener('click', () => {
    //Se após o primeiro pokemon da lista, possível realizar a busca pelo anterior
    if(searchPokemon > 1){
        //variável de busca recebe -1 para buscar id anterior e passa para a função renderPokemon
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
    //Se estiver no primeiro pokemon, não faz nada
})

//Função para o botão Next quando houver evento de click
buttonNext.addEventListener('click', () => {
    //variável de busca recebe +1 para o buscar o próximo id e passa para a função renderPokemon
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

//renderPokemon inicia a pokedex com o primeiro Pokemon
renderPokemon('1')