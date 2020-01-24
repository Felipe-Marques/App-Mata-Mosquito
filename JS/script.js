// Defining variables on the global scope.
var valueHeight = 0
var valueWidth = 0
var life = 1
var time = 10

//Variable to recovery the query string on the url
var level = window.location.search
level = (level.replace('?', ''))

var time_mosquito = 1500

if (level === 'facil') {
    time_mosquito = 2000
} else if (level === 'normal') {
    time_mosquito = 1500
} else if (level === 'dificil') {
    time_mosquito = 1000
} else if (level === 'hardcore') {
    time_mosquito = 750
}


// Using the DOM to show the timer
document.getElementById('cronometro').innerHTML = time

//variable to implement the setInterval in the chronometer in the innerHTML.
var chronometer = setInterval(function() {

    //decrease of the variable Time.
    time -= 1

    //Conditional structure
    if (time < 0) {

        //Start the victory flow, we must clear the setinterval.
        clearInterval(chronometer) //Cleaning the setInterval of the chronometer.
        clearInterval(create_Mosquito) //Cleaning the setINterval to create mosquitos in the html.

        //window.location to the home.html
        window.location.href = "../victory.html"

    } else {

        //Showing the chronometer on the html.
        document.getElementById('cronometro').innerHTML = time
    }

}, 1000)

//Function to adjust the game area.
function adjustGameStage() {
    //Vairiables to capture height and width values.
    valueHeight = window.innerHeight
    valueWidth = window.innerWidth

    //console.log(valueHeight, valueWidth)
}
adjustGameStage()

function randomPosition() {

    //Existance text for the Element with id = 'img-fly'.
    if (document.getElementById('img-fly')) {

        //Removing the Element if already exist.
        document.getElementById('img-fly').remove()

        //Structure for text of lifes in game.
        if (life > 3) {

            //Redirection through the BOM.
            window.location.href = "../game_over.html"

        } else {

            //Change the number of access to the imgs of life.
            document.getElementById('vida' + life).src = "img/coracao_vazio.png"
        }

        life++
        console.log(life)

    }

    //Variables to random positions on axis x and y.
    //Random positions according to the screen size.
    var positionY = Math.floor(Math.random() * valueHeight) - 120
    var positionX = Math.floor(Math.random() * valueWidth) - 120

    positionY = positionY < 0 ? 0 : positionY
    positionX = positionX < 0 ? 0 : positionX

    //console.log(positionY, positionX)

    //Creating an Element HTML.
    var mosquito = document.createElement('img')

    //Styling variable mosquito through the DOM
    mosquito.src = 'img/mosca.png'
    mosquito.id = "img-fly"
    mosquito.className = randomSize() + ' ' + randomSide() //Function randomSize and randomSide concatenated. Space is required for concatenation
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'

    //Function to implement the onclick on the element
    mosquito.onclick = function() {
        this.remove()
    }

    //Adding Element throught the appendChild()
    document.getElementById('home').appendChild(mosquito)

}

//Set Interval for the randomPosition function.
var create_Mosquito = setInterval(randomPosition, time_mosquito)


//Function to change the size of the element img.
function randomSize() {

    //generating random number to the size-class
    var size_class = Math.floor(Math.random() * 4)

    //Switch/Case to change the size of the element html (mosquito), accordind to the var size_class
    switch (size_class) {

        case 0:

            //Size 40px x 40px
            return 'mosquito'

        case 1:

            //Size 50px x 50px
            return 'mosquito-pequeno'

        case 2:

            //Size 70px x 70px
            return 'mosquito-medio'

        case 3:

            //Size 90px x 90px
            return 'mosquito-grande'

    }

}

//function to change the heading side of the element img.
function randomSide() {

    //Variabel to random number
    var side_class = Math.floor(Math.random() * 2)

    //Switch/Case to find out wich class the element will receive.
    switch (side_class) {
        case 0:
            return 'sideA'

        case 1:
            return 'sideB'

    }

}

//Function to the event onclick for restart the game.
function restartGame() {

    window.location.href = "../start.html"

}

//Function to start the game with selector of dificulty.
function startGame() {

    //creating a variable to receive the valeu of select
    var level = document.getElementById('nivel').value

    if (level === '') {
        alert('Selecione uma dificudade para iniciar o jogo.')
        return false
    }

    //Windo.location with query string.
    window.location.href = "home.html?" + level

}