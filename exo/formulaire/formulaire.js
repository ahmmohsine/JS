const { forEach, add } = require("lodash");
const inscriptionForm = document.querySelector('.formulaire');
const resultat = document.querySelector('#result');
const prenomError = document.querySelector('#prenomError');
const ageError = document.querySelector('#ageError');

inscriptionForm.addEventListener('submit',(event)=>{
    event.preventDefault(); 
    prenomError.textContent = "";
ageError.textContent="";
    const prenom = inscriptionForm["prenom"].value.trim();
    const age = inscriptionForm["age"].value;
    const pays = inscriptionForm["pays"].value;
    const isAccorted = inscriptionForm["conditions"].checked;
    if(prenomValide(prenom) && ageValide(age)){
       resultat.textContent = `${prenom} ${age} ${pays} ${isAccorted}`;
       resultat.classList.remove('hidden');
       resultat.classList.add('show')
      }
})
function prenomValide(prenom){
 if (!_.isString(prenom) || _.isEmpty(prenom)) {
    prenomError.textContent = "Le prénom doit être renseigné.";
    return false;
  }
    if (prenom.length < 2) {
            prenomError.textContent = "Le prénom doit contenir au moins 2 caractères.";
            return false;
    }
    const formatValide = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u.test(prenom);
    if (!formatValide) {
    prenomError.textContent = "Format de prénom invalide.";
    return false;
    }
    return true;
}
function ageValide(age){
  if (Number.isNaN(age)) {
  console.log("Veuillez entrer un âge valide.");
  return false;
}
if(parseInt(age,10)<18 || parseInt(age,10) >99){
  ageError.textContent="Veuillez entrer un âge entre 18 et 99";
  return false;
}
return true;
}