

let indexQuestions = 0;
let points = 0;
let options;

loadQuestion(indexQuestions);


function reproducirSonido() {
    // Crear una instancia del objeto Audio con la ruta del archivo de sonido
    const sonido = new Audio('correct.mp3');

    // Reproducir el sonido
    sonido.play();
}

function reproducirSonido2() {
    // Crear una instancia del objeto Audio con la ruta del archivo de sonido
    const sonido = new Audio('wrong.mp3');

    // Reproducir el sonido
    sonido.play();
}

function reproducirSonido3() {
    // Crear una instancia del objeto Audio con la ruta del archivo de sonido
    const sonido = new Audio('play.mp3');

    // Reproducir el sonido
    sonido.play();
}



function addClass(event) {
    var id = event.currentTarget.id;
    var loco = document.getElementById(id);
    loco.classList.add("correct");
    setTimeout(() => {
        loco.classList.remove("correct");
    }, 3000);
    console.log("Se agregó la clase 'correct' al div con ID:", id);
}

// Elimina los event listeners antes de agregar nuevos
function removeClass(event) {
    var id = event.currentTarget.id;
    var loco = document.getElementById(id);
    loco.classList.add("wrong");
    setTimeout(() => {
        loco.classList.remove("wrong");
    }, 3000);
    console.log("Se agregó la clase 'wrong' al div con ID:", id);
}



function loadQuestion() {
    reproducirSonido3()
    let randomIndex = Math.floor(Math.random() * questions.length);
    objectQuestions = questions[randomIndex];
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
    document.getElementById("op2").innerHTML = options[1];
    document.getElementById("op3").innerHTML = options[2];
    document.getElementById("op4").innerHTML = options[3];
}
document.querySelectorAll("div").forEach(function(div) {
    div.addEventListener("click", removeClass);
    div.addEventListener("click", addClass);
       
    });

    


   
async function selectAnswer(index) {
    if (options[index] === objectQuestions.response) {
        await delay(3000);
        reproducirSonido()
    
         await Swal.fire({
            title: "risposta giusta",
            text: "sei forte",
            imageUrl: "ninu.jpg",
            imageHeight: 320,
            icon: "success"
        
        });
       
        points++;
        indexQuestions++;
         loadQuestion()
        
    } else {
      
        await delay(3000);
        reproducirSonido2()
        await Swal.fire({
            title: "risposta sbagliata, ti meriti la 104",
            imageUrl: "nini.jpg",
            text: ` la risposta è ${objectQuestions.response}`,
            imageHeight: 320,
            icon: "error"
        });
        indexQuestions++;
        loadQuestion()
    }
  
  
    if (indexQuestions >= 10) {
        await Swal.fire({
            title: "GAME OVER",
            text: `Il tuo punteggio è ${points}/10`,
        });
        indexQuestions = 0;
        points = 0;
        
    }
   
   
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log(questions.length)