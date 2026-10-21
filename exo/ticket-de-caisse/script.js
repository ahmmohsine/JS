const  reservations = [
    {
        film:'Dune',
        places:2,
        prix:12.50,
        seance : 'imax'
    },{
        film:'Avatar',
        places:3,
        prix:10.50,
        seance : '3d'
    },
     {
        film: 'Interstellar',
        places: 2,
        prix: 12.50,
        seance: 'imax'
    },
    {
        film: 'Titanic',
        places: 3,
        prix: 10.50,
        seance: '3d'
    }
];
const reservationsInput = document.querySelector('#reservations');
const totalInput = document.querySelector('#total');
const formReservation = document.querySelector('#form-reservation');
const messageInput= document.querySelector('#message');
function calculerPrixReservation(reservation){
    return reservation.places * reservation.prix;
}

function calculerNombrePlaces(){
    let nbPlaces = 0;
    reservations.forEach(reservation=>{
        nbPlaces+= reservation.places;
    });
    return nbPlaces;
}
function calculerTotal(){
    let prixTotal = 0;
    reservations.forEach(reservation=>{
        prixTotal+=calculerPrixReservation(reservation);
    });
    if(calculerNombrePlaces()>=10)
         prixTotal = prixTotal - (prixTotal * 0.1);
    return prixTotal;
}
function afficherReservations(){
     initialiserPage();
    reservations.forEach(reservation=>{
    const li = document.createElement("li");
    li.textContent =  toString(reservation);
    li.setAttribute("id",reservation.film);
    const button =document.createElement("button");
    button.textContent = 'Annuler';
    button.addEventListener('click',()=>{
        li.remove();
        const index = reservations.findIndex(
        r => r.film === reservation.film
    );
    if(index!=-1)
    {
        reservations.splice(index,1);
        afficherReservations();
    }
    });
    li.appendChild(button);
    reservationsInput.appendChild(li);
});
totalInput.textContent =`${calculerNombrePlaces()>=10?'« Réduction groupe -10 % appliquée »':''} ${calculerTotal()}€` ;
}
function validerReservation(reservation){
    if(reservation.film != null &&reservation.film.length>2)
        if(reservation.prix>0)
            if(reservation.places>=1 && reservation.places<=10)
                return true;
            else{
                messageInput.textContent = "Le nombre de places doit être comprise entre 1 et 10";
                throw "Le nombre de places doit être comprise entre 1 et 10";}
        else{
            messageInput.textContent = "Le prix par placedoit être supérieur à 0";
            throw "Le prix par placedoit être supérieur à 0";
        }
    else{
         messageInput.textContent = "Le nom du film fait au moins 2 caractères";;
          throw "Le nom du film fait au moins 2 caractères";  
        }
}
console.log(calculerPrixReservation(reservations[0]));
console.log(calculerNombrePlaces());
afficherReservations();
formReservation.addEventListener('submit',(event)=>{
    event.preventDefault();
    const filmInput = document.querySelector('#film');
    const prixInput = document.querySelector('#prix');
    const placesInput = document.querySelector('#places');
    const seanceInput = document.querySelector('#seance');
    const newReservation = {
        film:filmInput.value.trim(),
        prix:parseFloat(prixInput.value),
        places:parseFloat(placesInput.value),
        seance:seanceInput.value
    };
  
    if(validerReservation(newReservation)){
        const oldReservation = reservations.find(r=>r.film === newReservation.film);
          if(oldReservation!=null)
            {
            if((newReservation.places + oldReservation.places) >10 ){
                messageInput.textContent = "10 places maximum par réservation!";
                return;

            }else{
                oldReservation.places+=newReservation.places;
            }
          }else{
            reservations.push(newReservation);
          }
            
            afficherReservations();
            messageInput.textContent = 'Réservation ajoutée ! ';
            lancerCompteARebours();
            effacerMessageRebours();
    }
});
function toString(reservation){
    return  `${reservation.film} x${reservation.places} -- ${reservation.prix.toFixed(2)}€ (${reservation.seance})`;
}
function initialiserPage(){
    totalInput.textContent ='';
    reservationsInput.textContent='';
}
function effacerMessageRebours(){
    let secondes = 3;
    const timer = setInterval(()=>{
        secondes--;
        if(secondes===0)
            messageInput.textContent = '';
    },1000);
}
function lancerCompteARebours(){
    let secondes = 120;
    const compteARebours = document.querySelector('#compte-a-rebours');
    compteARebours.textContent =
    `Votre réservation expire dans ${secondes} s`;
    const timer = setInterval(() => {
    secondes--;
    compteARebours.textContent =
        `Votre réservation expire dans ${secondes} s`;
        if (secondes === 0) {
        clearInterval(timer);
        reservations.length = 0;
        afficherReservations();
        compteARebours.textContent =
            'Temps écoulé : votre réservation a expiré.';
    }
}, 1000);
}