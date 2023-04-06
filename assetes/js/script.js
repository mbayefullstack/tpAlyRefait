// -------------------------------------------------------------------------------------------
// déclaration du tableau d'objet client

const clients = [
    { id: 1,
        nom: "MANGA", 
        prenom: "FATOU", 
        telephone: "70 843 44 22", 
        email: "fatou@exemple.com",
        solde:0, 
        photoDuclient: " https://images.unsplash.com/photo-1585870683904-a382fbb42754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
       transactions : [
        // { numero: "1", date: "10-01-2022", sens: "1", montant: "2000" },
        // { numero: "1", date: "10-01-2022", sens: "1", montant: "2000" },
           ] 
   },
       { 
        id: 2,
        nom: "DIOP",
         prenom: "OUMAR",
         telephone: "77 898 34 63", 
         email: "oumar@exemple.com", 
        solde:0, 
         photoDuclient: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
         transactions : [
            // { numero: "1", date: "11-02-2022", sens: "1", montant: "2000" },
            // { numero: "1", date: "11-02-2022", sens: "1", montant: "2000" },
    ]
       },

 {
    id: 3,
     nom: "SALL", 
     prenom: "FATOU", 
     telephone: "77 876 34 22",
     email: "fatou@exemple.com",
     solde:0, 
     photoDuclient: "https://images.unsplash.com/photo-1606415918835-88d0614e75ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", 
     transactions :[
        // { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
        // { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
    ]
 },
 {
   id: 4, 
   nom: "BA",
   prenom: "KADIATA", 
   telephone: "77 122 34 55", 
   email: "kadiata@exemple.com",
   solde:0, 
   photoDuclient: "https://images.unsplash.com/photo-1596305589440-2e180399a760?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
   transactions : [    
    //    { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
    //    { numero: "1", date: "10/08/22", sens: "1", montant: "2000" },
  ]
 }
];

let current = 0; 

// -------------------------------------------------------------------------------------------
// récupération des élèments du DOM.


const lastname = document.getElementById("lastname");
const firstname = document.getElementById("firstname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const solde = document.getElementById("solde"); 
const nombreTrans = document.querySelector("#nombreTrans");
const form = document.querySelector(".form");
const newNom = document.querySelector("#new-nom");
const newPrenom = document.querySelector("#new-prenom");
const newTelephone = document.querySelector("#new-telephone");
const newEmail = document.querySelector("#new-email");
const newPhoto = document.querySelector("#new-photo");
const newEnregristrer = document.querySelector("#new-enregristrer");
const newAnnuler = document.querySelector("#new-annuler");
const tel = document.getElementById("tel");


const photoDuclient = document.querySelector("img");
const tBody = document.querySelector("tbody");
const nextButton = document.querySelector(".next")
const btnDetail = document.querySelector(".btn-detail");
const plusClient = document.getElementById("plus-client");
const newClient = document.querySelector(".new-client");
const bouttonEnregistrer = document.querySelector(".enregistrer");
const inputMontant = document.getElementById("mnt");
const select = document.querySelector('#trans')

// -------------------------------------------------------------------------------------------
// Déclaration de Function.

function getUserById(id) {
    let u;
    clients.forEach(client => {
        if (id == client.id ) {
            u = client;
            return ;
        }
    })
    return u;
}






function remplirClient(user) {
    lastname.innerHTML = user.nom;
    firstname.innerHTML = user.prenom;
    phone.innerHTML = user.telephone;
    email.innerHTML = user.email;
    solde.innerHTML = user.solde;
    photoDuclient.src = user.photoDuclient;

    let transaction = user.transactions;
    nombreTrans.innerHTML = transaction.length;
    tBody.innerHTML = "";
    for (const trans of transaction) {
        tBody.innerHTML +=
        `
        <tr>
            <td>${trans.numero}</td>
            <td>${trans.date}</td>
            <td>${trans.sens}</td>
            <td>${trans.montant}</td>
        </tr>
        `
    }
    
}










bouttonEnregistrer.addEventListener("click",() =>{
    let montant = +inputMontant.value;
    let choix = select.options[select.selectedIndex].value;

    let tel1 = tel.value;

    if (montant < 500 ) {
        alert("veuillez entrez plus de 500f");
    }
    else if((choix=="r" || (choix == 'd' && tel1 != "")) && montant > clients[current].solde) {
        alert('imposiible')
    }
    
    else {
        if (choix== "d" && tel1 == "") {
            // console.log("mot"+montant+" "+clients[current].solde);
            clients[current].solde += montant; 
            clients[current].transactions.push(newTransaction(clients[current].transactions.length, 1, montant))
            remplirClient(clients[current]);
        }else if (choix== "d" && tel1 != "" ) {
            if (montant<500) {
                alert("bb")
            } else {

                clients[current].solde -= montant; 
                clients[current].transactions.push(newTransaction(clients[current].transactions.length, -1, montant))
                remplirClient(clients[current]);
    
                const destinataire = chercheClientByNumero(tel1)
                // destinataire.solde += montant; 
                destinataire.transactions.push(newTransaction(destinataire.transactions.length, 1, montant))
                // remplirClient(destinataire);
            }
            
            
        }
         else {
            if (montant>clients[current].solde) {
                alert("retrait impssible")
            } else {
                clients[current].solde -= montant; 
                clients[current].transactions.push(newTransaction(clients[current].transactions.length, -1, montant))
                remplirClient(clients[current]);

            }
            
        }
    }

})




function chercheClientByNumero(telephone) {
    let clientTrouve = null;
    clients.forEach(client => {
        if (client.telephone == telephone) {
            clientTrouve = client
            return
        }
    }) 
    return clientTrouve
}

function newTransaction(numero,sens,montant) {
    return { numero: numero, date: "11-02-2022", sens: sens, montant: montant }
     
}














// bouttonEnregistrer.addEventListener("click", ()=> {
//     let montant = inputMontant.value;
//     if (verifieChampVide(inputMontant)) {
//         alert("Veuillez saisir tou les champs")
//     } else {
//         if (!verifieMontantSuperieurA(montant)) {
//             alert("Veuillez augmeneter")
//         } else {
//             if (verifieMontantRetrait(montant,clients[current].solde)== true) {
//                 alert("votre solede est insuffisant pour ce transfert")
//             } else {
//                 let sens = select.options[select.selectedIndex].value
//                 sens = sens=="d" ? 1 : -1
//                 let mt = +montant 
//                 clients[current].solde += mt
//                 remplirClient(clients[current].id)
//                 clients[current].transactions.push( { montant:+montant, sens:sens, date:"gygtbybhy", numero:1})
              
//             }

//         }
//         // inputMontant.value=""
//     }
    
// });    

// function verifieChampVide(input) {
//     if(input.value == "") {
//         return true
//     }
//     return false
// }
// // console.log(verifieMontantSuperieurA(12));

// function verifieMontantSuperieurA(montant) {
//     if(montant<500) {
//         return false
//     }return true
// }
// function verifieMontantRetrait(montant,solde) {
//     if(montant > solde && select.options[select.selectedIndex].value == "r") {
//         return true
//     } 
//     return false

// }
    


// -------------------------------------------------------------------------------------------
// appel de Function.

plusClient.addEventListener("click", () => {
    newClient.classList.toggle("vieww")
})

remplirClient(clients[0])



// -------------------------------------------------------------------------------------------
// Évènement
nextButton.addEventListener("click", () => {
    let a = Math.floor(Math.random()*clients.length);
    while (a == current) {
        a = Math.floor(Math.random()*clients.length)
    }
    current = a;
    remplirClient(clients[current])
})

btnDetail.addEventListener("click", () => {
    form.classList.toggle("view");
})

let nomModal= +newNom.value; 
// let prenomModal = +newPrenom.value;
// let telephoneModal = +newTelephone.value;
// let emailModal = +newEmail.value;
// let enregistrerModal = +newEnregristrer.value;
// let annulerModal = +newAnnuler.value;
newEnregristrer.addEventListener("click",() => {
  console.log(newNom.value,newPrenom.value,newTelephone.value,newEmail.value);
    clients.push({nom:newNom.value,prenom:newPrenom.value,telephone:newTelephone.value,email:newEmail.value,solde:0,photoDuclient:newPhoto.value, transactions:[]})
} )



// Ajouter le bouton Annuler
const annulerBtn = document.getElementById('button-remove-transaction');

// Gérer l'événement click sur le bouton Annuler
annulerBtn.addEventListener('click', () => {
  // Ajouter le montant de la transaction annulée au solde du client actuel
  clients[current].solde += montant;
  // Retirer la dernière transaction du client actuel
//   clients[current].transactions.pop();
  // Remplir la fiche client avec les nouvelles informations
  remplirClient(clients[current]);
});
