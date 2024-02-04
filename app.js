let $ = document

const input = $.querySelector('input')
const searchBtn = $.querySelector('.input-box button')
const resultDiv = $.querySelector('.dictionary-result')
const errorLabel = $.querySelector('.error-label')

searchBtn.addEventListener('click', () => {
    if (input.value === '') {
        errorLabel.innerHTML = '-Please Enter a word'
    } else {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
            .then(res => res.json())
            .then(data => {
                resultDiv.innerHTML = ''
                errorLabel.innerHTML = ''
                console.log(data);


                if (data.title) {
                    resultDiv.innerHTML = ''
                    resultDiv.insertAdjacentHTML('afterbegin', `
                        <h1 class="not-found">No Definitions Found!</h1>
                        `)
                }
                else {
                    resultDiv.innerHTML = ''
                    resultDiv.insertAdjacentHTML('afterbegin', ` <div class="word">
                     <h2>${input.value}</h2>
                     <audio src="${data[0].phonetics[0].audio || data[0].phonetics[1].audio}" id="audioFile"></audio>
                 </div>
     
                 <div class="about-Word">
                     <div>
                         <span>${data[0].meanings[0].partOfSpeech}</span>
                         <span>${data[0].phonetics[0].text || data[0].phonetics[1].text}</span>
                     </div>
                     <svg onclick="playAudio()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
</svg>
                 </div>
                 <hr>
                 <div class="definition">
                     <p>${data[0].meanings[0].definitions[0].definition}</p>
                 </div>
     
                 <div class="example">
                     <p>${data[0].meanings[0].definitions[0].example || '""'}</p>
                 </div>`)
                }
                input.value = ''

            })
    }


})

function playAudio() {
    let audio = document.querySelector('audio')

    audio.play()
}
