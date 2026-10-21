// import cloneDeep from 'lodash/clonedeep'

const { forEach, add } = require("lodash");

// const state = {
//     cart:[
//         {product:'bread', quantity:5},
//         {product:'pizza', quantity:5}
//     ],
//     user:{loggedIn: true}
// }

// const stateClone = Object.assign({},state);
// const stateDeepClone = cloneDeep(state);
// const personnages = ['case1','case2'];
// personnages.push('case3');//Ajouter case3 à la fin
// personnages.unshift('case-1','case0');//Ajouter au début du tableau
// const target = personnages.pop(); //Obtenir et supprimer le dernier elem
// const target2 = personnages.shift();//Obtenir et supprimer le premier elem


// function multiplication(a,b=1){
//     return a*b;
// }

// console.log(multiplication(3,5));
// console.log(multiplication(6,5));
// console.log(multiplication(3,35));
// console.log(multiplication(123));

// function somme(...nombres){
//     let sum = 0;
//     nombres.forEach(element => {
//         sum+=element;
//     });
//     return sum;
// }

// console.log(somme(1,2,3,4,5));

// const sum = (a,b=1)=>a*b;

// const factorielle = (max)=>{
//     if(max==1)
//         return 1;
//     return max*factorielle(max-1);
// }

// const fact = factorielle(5);
// console.log(fact);

const produits_list = [
{ nom: 'Clavier', prix: 49.9, stock: 12 },
{ nom: 'Souris', prix: 24.5, stock: 0 },
{ nom: 'Écran', prix: 279, stock: 4 },
{ nom: 'Webcam', prix: 59.99, stock: 7 },
{ nom: 'Casque', prix: 89, stock: 0 },
{ nom: 'Hub USB', prix: 34.9, stock: 15 }
];

function valeurStock(liste){
    let sum =0;
    liste.forEach(product => {
        if(product.stock>0)
            sum += product.prix * product.stock;
    });
    return `${liste.length} produits - valeur du stock : ${sum.toFixed(2)}€`;
}
let tous = document.querySelector('#tous');
let enStock = document.querySelector('#enStock');
let prixCroissant = document.querySelector('#prixCroissant');
let prixDecroissant = document.querySelector('#prixDecroissant');
let nomAZ = document.querySelector('#nomAZ');
let searchButton = document.querySelector('#searchButton');


tous.addEventListener('click', () => afficherProduits([...produits_list]));
enStock.addEventListener('click', () => afficherProduits([...produits_list].filter(p=>p.stock>0)));
prixCroissant.addEventListener('click', () => afficherProduits([...produits_list].sort((a,b)=>a.prix-b.prix)));
prixDecroissant.addEventListener('click', () => afficherProduits([...produits_list].sort((a,b)=>b.prix-a.prix)));
nomAZ.addEventListener('click', () => afficherProduits([...produits_list].sort((a,b)=>a.nom.localeCompare(b.nom))));
searchButton.addEventListener('click',()=>afficherProduits([...produits_list].filter(p=>p.nom.toLowerCase().
includes(document.querySelector('#searchText').value.toLowerCase()))));
function afficherProduits(produits){
    const ul = document.querySelector('#catalogue');
    const resume = document.querySelector('#resume');
    ul.innerHTML = '';
    produits.forEach(produit => {
        const li = document.createElement("li");
        if(produit.stock>0){
        li.innerText =`${produit.nom} - ${produit.prix}€ - ${produit.stock} en stock` ;
       
    }
    else{
       li.innerText =`${produit.nom} - ${produit.prix}€ - rupture de stock`  ;
        li.className = 'rupture';
    }
    var button = document.createElement("button");
    button.textContent ='Supprimer';
    button.addEventListener("click", () => {
    console.log(`Produit sélectionné : ${produit.nom}`);
    li.remove();
    const index = produits.findIndex(
        p => p.nom === produit.nom
    );
    if (index !== -1) {
        produits_list.splice(index, 1);
        afficherProduits(produits_list);
    }

});

     li.appendChild(button);
     li.setAttribute("id",produit.nom);
     ul.appendChild(li);
    });
     
    resume.innerHTML = valeurStock(produits);
}

const addButton = document.querySelector('#addButton');

addButton.addEventListener('click',()=>{
    const nom = document.querySelector('#nom').value;
    const prix = document.querySelector('#prix').value;
    const stock = document.querySelector('#stock').value;
    console.log(`${nom} - ${prix} - ${stock}`);
    produits_list.push({nom:nom,prix:prix,stock:stock});
    afficherProduits([...produits_list]);
})