let indexQuestions = 0;
let points = 0;
let options;

loadQuestion(indexQuestions);

function reproducirSonido(archivo) {
    // Crear una instancia del objeto Audio con la ruta del archivo de sonido
    const sonido = new Audio(archivo);

    // Reproducir el sonido
    sonido.play();
}

document.querySelectorAll("div").forEach(function(div) {
    div.addEventListener("click", function(event) {
        selectAnswer(event.target.dataset.index);
    });
});

function loadQuestion(index) {
    objectQuestions = questions[index];
    options = [...objectQuestions.wrongs];
    options.push(objectQuestions.response);

    for (let i = 0; i < 4; i++) {
        options.sort(() => Math.random() - 0.5);
    }
    document.getElementById("questions").innerHTML = objectQuestions.pregunta;

    if (objectQuestions.img) {
        document.getElementById("img").src = objectQuestions.img;
        document.getElementById("img").style.display = "";
    } else {
        document.getElementById("img").style.display = "none";
    }

    document.getElementById("op1").innerHTML = options[0];
    document.getElementById("op1").dataset.index = 0;
    document.getElementById("op2").innerHTML = options[1];
    document.getElementById("op2").dataset.index = 1;
    document.getElementById("op3").innerHTML = options[2];
    document.getElementById("op3").dataset.index = 2;
    document.getElementById("op4").innerHTML = options[3];
    document.getElementById("op4").dataset.index = 3;
}

async function selectAnswer(index) {
    let selectedOption = options[index];
    let correctOption = objectQuestions.response;

    if (selectedOption === correctOption) {
        await delay(3000);
        reproducirSonido('correct.mp3')
    
        Swal.fire({
            title: "risposta giusta",
            text: "sei forte",
            imageUrl: "ninu.jpg",
            imageHeight: 320,
            icon: "success"
        });
        points++;
    } else {
        await delay(3000);
        reproducirSonido('wrong.mp3')
        await Swal.fire({
            title: "risposta sbagliata, ti meriti la 104",
            imageUrl: "nini.jpg",
            text: ` la risposta è ${objectQuestions.response}`,
            imageHeight: 320,
            icon: "error"
        });
    }

    indexQuestions++;
    if (indexQuestions >= questions.length) {
        await Swal.fire({
            title: "game over",
            text: `Il tuo punteggio è ${points}/${questions.length}`,
        });
        indexQuestions = 0;
        points = 0;
    }
    loadQuestion(indexQuestions);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function help() {
    Swal.fire({
        title: "piace er cazzo!",
        text: "Banana. salsiccia, zucchine.",
        imageUrl: "https://unsplash.it/400/200",
        imageHeight: 300,
        imageAlt: "Custom image"
    });
}
