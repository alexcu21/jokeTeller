const button = document.getElementById('button');
const audioElement = document.getElementById('audio')


// Disable/ Enable button

function toggleButton(){
    button.disabled = !button.disabled;
}

// passing joke to voice API

function tellMe(joke){

    VoiceRSS.speech({
        key: '642abe9ac5d24cf38851aafd1958f7d9',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Joke API

async function getJokes(){
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    let joke = '';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }

        // text-to-speech
        tellMe(joke)

        //disable button
        toggleButton()
    }
    catch (error){
        //catch errors
        console.log('whoops', error)
    }
}

// event listeners

button.addEventListener("click", getJokes);

audioElement.addEventListener('ended', toggleButton)




