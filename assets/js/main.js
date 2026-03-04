/**
 * @version 0.0.1
 */

/** @type {HTMLCanvasElement} */
const oCanvas = document.querySelector("#scene");
const oCtx = oCanvas.getContext("2d");

/******** Variables globales **********/
// Info générale
const nLargeurCanvas = oCanvas.width;
const nHauteurCanvas = oCanvas.height;
const nCentre = nLargeurCanvas / 2;
const nMilieu = nHauteurCanvas / 2;


// État/Boucle du jeu
let sEtat = "";
let nIdMinuterie;



//position initiale du texte(animation)
let nPosXTexte = -700;


/*********************calcul de pointage****************** */

//données de pointage initiales
let Stats = {
    nPointsBudget1: 50,
    nPointsBudget2: 35,
    nPointsBudget3: 25,
    nPointsSanté: 0,
    nPointsQuantité: 0,

}

//limites pointage pour déterminer classement
let but = {
    nQuantitéFaci: 15,
    nQuantitéMoyen: 25,
    nQuantitéDiff: 35,
    nSanté: 20,
    nBudget: 0,


}


// variable pour déterminer classement 
let totalClassement = 0


//caractéristique des halos autous des  aliments
let haloAlimentsRouge = {
    haloActif: false,
    diffusionHalo: 20,
    rouge: 'rgba(255, 0, 0, 0.8)'
}
let haloAlimentsJaune = {
    haloActif: false,
    diffusionHalo: 20,
    jaune: 'rgba(255, 238, 0, 0.8)'
}
let haloAlimentsVert = {
    haloActif: false,
    diffusionHalo: 20,
    vert: 'rgba(81, 255, 0, 0.8)',
}


/******************************************IMAGES ET AUDIO IMPORTÉS****************************************************************8 */

///////////////////Images
//environnements
const oImgEpicerie = new Image();
oImgEpicerie.src = "assets/images/epicerie.png";
const oImgEtagere = new Image();
oImgEtagere.src = "assets/images/etagere.png";
const oImgAssiette = new Image();
oImgAssiette.src = "assets/images/assiette.png";

//histoire de chaque personnage
const oImgExpli_1 = new Image();
oImgExpli_1.src = "assets/images/expli_1.png";
const oImgExpli_2 = new Image();
oImgExpli_2.src = "assets/images/expli_2.png";
const oImgExpli_3 = new Image();
oImgExpli_3.src = "assets/images/expli_3.png";

//regles jeu
const oImgRegles = new Image();
oImgRegles.src = "assets/images/regles.png"

//aliments
let aImages = [];
for (let i = 1; i <= 19; i++) {
    aImages[i] = new Image();
    aImages[i].src = `assets/images/${i}.png`;
}

//icones de boutons rejouer
const oImgRejouer = new Image();
oImgRejouer.src = "assets/images/rejouer.png";
const oImgAccueil = new Image();
oImgAccueil.src = "assets/images/accueil.png";




//données de aliments (aImages) individuels

const aAliments = [
    {
        image: aImages[1],
        x: 200,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 2,
        santé: 2,
        quantité: 3,
    },
    {
        image: aImages[2],
        x: 440,
        y: 400,
        largeur: 80,
        hauteur: 100,
        coût: 2,
        santé: 2,
        quantité: 2,
    },
    {
        image: aImages[3],
        x: 500,
        y: 50,
        largeur: 100,
        hauteur: 100,
        coût: 8,
        santé: 2,
        quantité: 1,
    },
    {
        image: aImages[5],
        x: 530,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 3,
        santé: 1,
        quantité: 1,
    },
    {
        image: aImages[6],
        x: 50,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 5,
        santé: 3,
        quantité: 1,
    },
    {
        image: aImages[7],
        x: 200,
        y: 50,
        largeur: 100,
        hauteur: 100,
        coût: 10,
        santé: 3,
        quantité: 1,
    },
    {
        image: aImages[8],
        x: 800,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 4,
        santé: 2,
        quantité: 2,
    },
    {
        image: aImages[9],
        x: 500,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 2,
        santé: 1,
        quantité: 1,
    },
    {
        image: aImages[10],
        x: 650,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 6,
        santé: 3,
        quantité: 1,
    },
    {
        image: aImages[11],
        x: 50,
        y: 50,
        largeur: 100,
        hauteur: 100,
        coût: 11,
        santé: 3,
        quantité: 3,
    },
    {
        image: aImages[12],
        x: 350,
        y: 50,
        largeur: 100,
        hauteur: 100,
        coût: 8,
        santé: 3,
        quantité: 1,
    },
    {
        image: aImages[13],
        x: 50,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 1,
        santé: 1,
        quantité: 1,
    },
    {
        image: aImages[14],
        x: 700,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 4,
        santé: 3,
        quantité: 2,
    },
    {
        image: aImages[15],
        x: 330,
        y: 400,
        largeur: 100,
        hauteur: 100,
        coût: 3,
        santé: 1,
        quantité: 1,
    },
    {
        image: aImages[16],
        x: 200,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 5,
        santé: 1,
        quantité: 3,
    },
    {
        image: aImages[17],
        x: 350,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 6,
        santé: 1,
        quantité: 3,
    },
    {
        image: aImages[18],
        x: 800,
        y: 200,
        largeur: 100,
        hauteur: 100,
        coût: 6,
        santé: 1,
        quantité: 2,
    },
    {
        image: aImages[19],
        x: 700,
        y: 70,
        largeur: 100,
        hauteur: 100,
        coût: 7,
        santé: 3,
        quantité: 1,
    }
];




//image pour boutons de niveaux
const oImgNiv1 = new Image();
oImgNiv1.src = "assets/images/niveau_1.png";
const oImgNiv2 = new Image();
oImgNiv2.src = "assets/images/niveau_2.png";
const oImgNiv3 = new Image();
oImgNiv3.src = "assets/images/niveau_3.png";



////////////////Audio

//(quand tu commences et termines partie)
const oPasserCaisse = new Audio();
oPasserCaisse.src = "assets/effets_sonores/payer.mp3"

//révélation résultat final
const oTambour = new Audio();
oTambour.src = "assets/effets_sonores/roulement_tambour.mp3"

//acheter un aliment
const oObjet = new Audio();
oObjet.src = "assets/effets_sonores/selection_objet.mp3"

//ambiance pendant le jeu
const oAmbiance = new Audio();
oAmbiance.src = "assets/effets_sonores/son_de_fond.mp3"




/************************ Gestion des événements ******************************/
// Chargement de la page.
window.addEventListener("load", demarrer);


//appuyer sur espace pour commencer le jeu
document.addEventListener("keypress", function (evt) {
    if (sEtat == "intro" && evt.code == "Space") {
        sEtat = "difficulte";
    }
});



oCanvas.addEventListener("click", function (evt) {
    let x = evt.offsetX;
    let y = evt.offsetY;

    /*****************************************************************
 * *******************************CHOIX DU NIVEAU***************
 * ************************************************************* */


    if (sEtat == "difficulte" && evt.offsetX >= 120 && evt.offsetX <= 320 && evt.offsetY >= 100 && evt.offsetY <= 400) {
        sEtat = "explicationFaci";


    }

    else if (sEtat == "difficulte" && evt.offsetX >= 340 && evt.offsetX <= 540 && evt.offsetY >= 100 && evt.offsetY <= 400) {
        sEtat = "explicationMoyen";

    }

    else if (sEtat == "difficulte" && evt.offsetX >= 560 && evt.offsetX <= 760 && evt.offsetY >= 100 && evt.offsetY <= 400) {
        sEtat = "explicationDiff";

    }

    /*****************************************************************
   * ******************************REGLES DU JEU***************
   * ************************************************************* */

    if (sEtat == "explicationFaci" && evt.offsetX >= 580 && evt.offsetX <= 780 && evt.offsetY >= 430 && evt.offsetY <= 490) {
        sEtat = "infosPointsFaci";


    }

    if (sEtat == "explicationMoyen" && evt.offsetX >= 580 && evt.offsetX <= 780 && evt.offsetY >= 430 && evt.offsetY <= 490) {
        sEtat = "infosPointsMoyen";


    }

    if (sEtat == "explicationDiff" && evt.offsetX >= 580 && evt.offsetX <= 780 && evt.offsetY >= 430 && evt.offsetY <= 490) {
        sEtat = "infosPointsDiff";


    }

    ////////////////////ALLER DANS LE JEU

    if (sEtat == "infosPointsFaci" && evt.offsetX >= 360 && evt.offsetX <= 560 && evt.offsetY >= 510 && evt.offsetY <= 570) {
        sEtat = "partieFaci";
        oPasserCaisse.play();
        oAmbiance.play();


    }



    if (sEtat == "infosPointsMoyen" && evt.offsetX >= 360 && evt.offsetX <= 560 && evt.offsetY >= 510 && evt.offsetY <= 570) {
        sEtat = "partieMoyen";
        oPasserCaisse.play();
        oAmbiance.play();

    }

    if (sEtat == "infosPointsDiff" && evt.offsetX >= 360 && evt.offsetX <= 560 && evt.offsetY >= 510 && evt.offsetY <= 570) {
        sEtat = "partieDiff";
        oPasserCaisse.play();
        oAmbiance.play();

    }

    /*****************************************************************
* ******************************* RESULTAT DU JEU***************
* ************************************************************* */

    if (sEtat == "partieFaci" && evt.offsetX >= 650 && evt.offsetX <= 850 && evt.offsetY >= 535 && evt.offsetY <= 585) {
        sEtat = "finFaci"

        oAmbiance.pause();
        oPasserCaisse.play();
        oTambour.play();

    }

    else if (sEtat == "partieMoyen" && evt.offsetX >= 650 && evt.offsetX <= 850 && evt.offsetY >= 535 && evt.offsetY <= 585) {

        sEtat = "finMoyen"
        oAmbiance.pause();
        oPasserCaisse.play();
        oTambour.play();


    }
    else if (sEtat == "partieDiff" && evt.offsetX >= 650 && evt.offsetX <= 850 && evt.offsetY >= 535 && evt.offsetY <= 585) {

        sEtat = "finDiff"
        oAmbiance.pause();
        oPasserCaisse.play();
        oTambour.play();


    }

    if (sEtat == "finDiff") {
        if (evt.offsetX >= 290 && evt.offsetX <= 352 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /***redémarrer la partie du niveau difficile*/
            reinitialiserPartieDiff();
            /* demarrer() n'a pas été inséré car cela semble accélérer la vitesse de l'animation du texte*/


        }

        if (evt.offsetX >= 520 && evt.offsetX <= 610 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /**redémarrer le jeu */
            reinitialiserJeu();
        }



    }


    if (sEtat == "finMoyen") {

        if (evt.offsetX >= 290 && evt.offsetX <= 352 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /***redémarrer la partie du niveau moyen */
            reinitialiserPartieMoyen();
            /* demarrer() n'a pas été inséré car cela semble accélérer la vitesse de l'animation du texte*/


        }

        if (evt.offsetX >= 520 && evt.offsetX <= 610 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /**redémarrer le jeu */
            reinitialiserJeu();
        }

    }

    if (sEtat == "finFaci") {

        if (evt.offsetX >= 290 && evt.offsetX <= 352 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /***redémarrer la partie du niveau facile */
            reinitialiserPartieFaci();
            


        }

        if (evt.offsetX >= 520 && evt.offsetX <= 610 && evt.offsetY >= 90 && evt.offsetY <= 152) {
            /**redémarrer le jeu */
            reinitialiserJeu();
        }





    }

    //réinitialiser toutes les données pour tous les niveaux pour recommencer 
    // peu importe le niveau précédamment joué
    function reinitialiserJeu() {
        sEtat = "intro";
        oTambour.pause();

        Stats.nPointsBudget3 = 25;
        Stats.nPointsBudget2 = 35;
        Stats.nPointsBudget1 = 50;
        Stats.nPointsQuantité = 0;
        Stats.nPointsSanté = 0;
        totalClassement = 0;
        nPosXTexte = -700;
    }

    /*******************réinitialiser une partie spécifique********************* */

    function reinitialiserPartieDiff() {
        sEtat = "partieDiff"
        oTambour.pause();
        oPasserCaisse.pause();
        oAmbiance.play();

        Stats.nPointsBudget3 = 25;
        Stats.nPointsQuantité = 0;
        Stats.nPointsSanté = 0;
        totalClassement = 0;
    }
    function reinitialiserPartieMoyen() {
        sEtat = "partieMoyen"
        oTambour.pause();
        oPasserCaisse.pause();
        oAmbiance.play();

        Stats.nPointsBudget2 = 35;
        Stats.nPointsQuantité = 0;
        Stats.nPointsSanté = 0;
        totalClassement = 0;
    }
    function reinitialiserPartieFaci() {
        sEtat = "partieFaci"
        oTambour.pause();
        oPasserCaisse.pause();
        oAmbiance.play();

        Stats.nPointsBudget1 = 50;
        Stats.nPointsQuantité = 0;
        Stats.nPointsSanté = 0;
        totalClassement = 0;
    }

    /*****************************************************************
    * ******************************* ACHETER ALIMENTS***************
    * ************************************************************* */
    /**si tu cliques sur un aliment, le budget diminue, le niveau nutrition augmente et qualité alimentation augmente */

    for (let i = 0; i < aAliments.length; i++) {
        if (x >= aAliments[i].x && x <= aAliments[i].x + aAliments[i].largeur && y >= aAliments[i].y && y <= aAliments[i].y + aAliments[i].hauteur) {
            if (sEtat == "partieFaci" || sEtat == "partieMoyen" || sEtat == "partieDiff") {
                oObjet.play();
            }

            // il est impossible pour le budget d'aller dans les négatifs.
            if (sEtat == "partieFaci" && aAliments[i].coût <= Stats.nPointsBudget1) {

                Stats.nPointsBudget1 -= aAliments[i].coût
                Stats.nPointsSanté += aAliments[i].santé
                Stats.nPointsQuantité += aAliments[i].quantité
            }
            else {
                console.log("PAS ASSEZ")




            }
            if (sEtat == "partieMoyen" && aAliments[i].coût <= Stats.nPointsBudget2) {

                Stats.nPointsBudget2 -= aAliments[i].coût
                Stats.nPointsSanté += aAliments[i].santé
                Stats.nPointsQuantité += aAliments[i].quantité
            }
            else {
                console.log("PAS ASSEZ")





            }
            if (sEtat == "partieDiff" && aAliments[i].coût <= Stats.nPointsBudget3) {
                Stats.nPointsBudget3 -= aAliments[i].coût
                Stats.nPointsSanté += aAliments[i].santé
                Stats.nPointsQuantité += aAliments[i].quantité
            }
            else {
                console.log("PAS ASSEZ")





            }
        }




    }






})



//fonction déigner apparence des ombres
function ombreAliments1() {
 oCtx.shadowColor = "rgba(0,0,0,0)";

    if (haloAlimentsRouge.haloActif === true) {
        oCtx.shadowBlur = haloAlimentsRouge.diffusionHalo;
        oCtx.shadowColor = haloAlimentsRouge.rouge;
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor (découverte de shadowcolor et de shadowblur)

    }
   

    //https://stackoverflow.com/questions/4649883/html-canvas-shadow-being-applied-to-everything
    //même méthode que dans "facile, moyen, difficile" pour éviter propagation ombre sur aliments où ce n'est pas voulu
}

 
function ombreAliments2() {
  oCtx.shadowColor = "rgba(0,0,0,0)";

    if (haloAlimentsJaune.haloActif === true) {
        oCtx.shadowBlur = haloAlimentsJaune.diffusionHalo;
        oCtx.shadowColor = haloAlimentsJaune.jaune;
    }
   

}
function ombreAliments3() {
  oCtx.shadowColor = "rgba(0,0,0,0)";
    if (haloAlimentsVert.haloActif === true) {
        oCtx.shadowBlur = haloAlimentsVert.diffusionHalo;
        oCtx.shadowColor = haloAlimentsVert.vert;
    }
  


}


//quand le curseur est positionné sur un aliment spécifique, le halo de 
//couleur approprié apparaît sur l'aliment
oCanvas.addEventListener("mousemove", function (evt) {
    let x = evt.offsetX;
    let y = evt.offsetY;

    ///HALO COLORÉ QUAND TU SURVOLES SUR ALIMENT, DÉTERMINANT LE NIVEAU DE SANTÉ

    if (sEtat == "partieFaci" || sEtat == "partieMoyen" || sEtat == "partieDiff") {
        // POURQUOI FAUT-IL INSÉRER CECI? DÉBOGUER AVEC PROF
        haloAlimentsRouge.haloActif = false;
        haloAlimentsJaune.haloActif = false;
        haloAlimentsVert.haloActif = false;


        for (let i = 0; i < aAliments.length; i++) {

            if (x >= aAliments[i].x && x <= aAliments[i].x + aAliments[i].largeur && y >= aAliments[i].y && y <= aAliments[i].y + aAliments[i].hauteur) {
                if (aAliments[i].santé == 3) {

                    haloAlimentsVert.haloActif = true;

                }
                else if (aAliments[i].santé == 2) {

                    haloAlimentsJaune.haloActif = true;

                }
                else if (aAliments[i].santé == 1) {

                    haloAlimentsRouge.haloActif = true;

                }



            }




        }


    }
});




//assigne quel ecran s'affiche en fonction de sEtat
function boucleJeu() {
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    //page d'accueil
    if (sEtat == "intro") {
        introJeu();

    }
    //choisir la difficulté
    else if (sEtat == "difficulte") {
        difJeu();

    }

    //histoire en fonction de la difficulté
    else if (sEtat == "explicationFaci") {
        expliFaci();

    }
    else if (sEtat == "explicationMoyen") {
        expliMoyen();

    }
    else if (sEtat == "explicationDiff") {
        expliDiff();

    }

    //règles du jeu

    else if (sEtat == "infosPointsFaci") {
        infoPointsFaci()

    }
    else if (sEtat == "infosPointsMoyen") {
        infoPointsMoyen()
    }
    else if (sEtat == "infosPointsDiff") {
        infoPointsDiff()
    }

    //le jeu

    else if (sEtat == "partieFaci") {
        facile();

    }
    else if (sEtat == "partieMoyen") {
        Moyen();

    }
    else if (sEtat == "partieDiff") {
        Difficile();

    }

    //resultats finaux
    else if (sEtat == "finFaci") {
        finJeuFaci();
    }

    else if (sEtat == "finMoyen") {
        finJeuMoyen();
    }

    else if (sEtat == "finDiff") {
        finJeuDiff();
    }


}

//commencer la boucle de jeu

function demarrer() {
    sEtat = "intro";
    nIdMinuterie = setInterval(boucleJeu, 1000 / 120);
    console.log("Identifiant de la minuterie : ", nIdMinuterie);



}






// Écran 1 : intro animée
function introJeu() {
    console.log("Dans introJeu...");
    oCtx.drawImage(oImgEpicerie, 0, 0, nLargeurCanvas, nHauteurCanvas);

    oCtx.fillStyle = "white";
    oCtx.font = "60px Trebuchet";
    oCtx.textAlign = "center";
    oCtx.textBaseline = "middle";
    oCtx.fillText("E P I C E R Y", nMilieu + 150, nPosXTexte);
    //texte fait translation en y jusqu'à ce qu'il soit à la position milieu
    if (nPosXTexte < nMilieu) {
        nPosXTexte += 5;
    }
    else {
        oCtx.font = "24px trebuchet";
        oCtx.fillText("Appuyer sur espace pour commencer le jeu.", nCentre, nMilieu + 30);






    }
}

//Ecran 2  : choisir la difficulté
function difJeu() {
    console.log("Dans difJeu")

    oCtx.drawImage(oImgEpicerie, 0, 0, nLargeurCanvas, nHauteurCanvas);

    oCtx.save();
    oCtx.drawImage(oImgNiv1, 120, 100, 200, 300);
    oCtx.restore();

    oCtx.save();
    oCtx.drawImage(oImgNiv2, 340, 100, 200, 300);
    oCtx.restore();

    oCtx.save();
    oCtx.drawImage(oImgNiv3, 560, 100, 200, 300);
    oCtx.restore();


}
/******************************HISTOIRE DE CHAQUE PERSONNAGE**************************** */
//Écran 3A: histoire du personnage facile
function expliFaci() {
    console.log("Dans explifaci")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgExpli_1, 0, 0, nLargeurCanvas, nHauteurCanvas);
    
//bouton pour aller dans infopoints
     dessinerBouton(580,430,200,60,"blue","Règles");





}
//Écran 3B: histoire du personnage Moyen
function expliMoyen() {
    console.log("Dans explimoyen")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgExpli_2, 0, 0, nLargeurCanvas, nHauteurCanvas);


      dessinerBouton(580,430,200,60,"blue","Règles");

}

//Écran 3C: histoire du personnage Difficile
function expliDiff() {
    console.log("Dans expliDiff")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);

    oCtx.drawImage(oImgExpli_3, 0, 0, nLargeurCanvas, nHauteurCanvas);

    dessinerBouton(580,430,200,60,"blue","Règles");

   

}
/******************************RÈGLES DU JEU**************************** */

//Écran 4A: RÈGLES DU JEU
function infoPointsFaci() {
    console.log("Dans infopointsfaci")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgRegles, 0, 0, nLargeurCanvas, nHauteurCanvas);

//commencer la partie
   dessinerBouton(360,510,200,60,"blue","Magasiner");



}
//Écran 4b: RÈGLES DU JEU
function infoPointsMoyen() {
    console.log("Dans infopointsMoyen")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgRegles, 0, 0, nLargeurCanvas, nHauteurCanvas);

    dessinerBouton(360,510,200,60,"blue","Magasiner");
 

}
//Écran 4C: RÈGLES DU JEU
function infoPointsDiff() {
     console.log("Dans infopointsDiff")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgRegles, 0, 0, nLargeurCanvas, nHauteurCanvas);

    dessinerBouton(360,510,200,60,"blue","Magasiner");

}

/******************************PARTIE DE JEU**************************** */
//(structure du code pareille pour chaque etat de fin de jeu, sauf les valeurs npointsbudget)



//Écran 5A: Partie facile
function facile() {
    console.log("Dans partieFaci")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgEtagere, 0, 0, nLargeurCanvas, nHauteurCanvas);




    dessinerBouton(650, 535, 200, 50, "green", "PAYER");
    oCtx.fillText("Budget restant : " + Stats.nPointsBudget1 + " $", 100, 560, 150);
 oCtx.fillText("Points de santé : " + Stats.nPointsSanté +"/"+ but.nSanté, 300, 560, 150);
    oCtx.fillText("Quantité aliments: " + Stats.nPointsQuantité + " / " + but.nQuantitéFaci, 500, 560, 150);

    //ombre appliquée dépendant du niveau de santé de chauqe aliment
    //pouquoi save/restore fait disparaître aliments? (DEMANDER PROF)

    ombreAliments3();
    oCtx.drawImage(aImages[11], 50, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[7], 200, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[12], 350, 50, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[3], 500, 50, 100, 100);


    ombreAliments3();
    oCtx.drawImage(aImages[19], 700, 70, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[6], 50, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[16], 200, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[17], 350, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[9], 500, 200, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[10], 650, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[18], 800, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[13], 50, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[1], 200, 400, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[15], 330, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[2], 440, 400, 80, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[5], 530, 400, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[14], 700, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[8], 800, 400, 100, 100);


    //méthode pour faire disparaître ombre:
    // https://stackoverflow.com/questions/4649883/html-canvas-shadow-being-applied-to-everything (comme mentionné ci-haut)
    oCtx.shadowColor = "rgba(0,0,0,0)";
}

//Écran 5B: Partie Moyenne
function Moyen() {
    console.log("Dans partieMoyen")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgEtagere, 0, 0, nLargeurCanvas, nHauteurCanvas);





    dessinerBouton(650, 535, 200, 50, "green", "PAYER");
    oCtx.fillText("Budget restant : " + Stats.nPointsBudget2 + " $", 100, 560, 150);
    oCtx.fillText("Points de santé : " + Stats.nPointsSanté +"/"+ but.nSanté, 300, 560, 150);
    oCtx.fillText("Quantité aliments: " + Stats.nPointsQuantité + " / " + but.nQuantitéMoyen, 500, 560, 150);


    ombreAliments3();
    oCtx.drawImage(aImages[11], 50, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[7], 200, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[12], 350, 50, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[3], 500, 50, 100, 100);


    ombreAliments3();
    oCtx.drawImage(aImages[19], 700, 70, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[6], 50, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[16], 200, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[17], 350, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[9], 500, 200, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[10], 650, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[18], 800, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[13], 50, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[1], 200, 400, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[15], 330, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[2], 440, 400, 80, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[5], 530, 400, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[14], 700, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[8], 800, 400, 100, 100);


    oCtx.shadowColor = "rgba(0,0,0,0)";
}

//Écran 5C: Partie Difficile
function Difficile() {
    console.log("Dans partieDiff")
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgEtagere, 0, 0, nLargeurCanvas, nHauteurCanvas);






    dessinerBouton(650, 535, 200, 50, "green", "PAYER");
    oCtx.fillText("Budget restant : " + Stats.nPointsBudget3 + " $", 100, 560, 150);
  oCtx.fillText("Points de santé : " + Stats.nPointsSanté +"/"+ but.nSanté, 300, 560, 150);
    oCtx.fillText("Quantité aliments: " + Stats.nPointsQuantité + " / " + but.nQuantitéDiff, 500, 560, 150);


    ombreAliments3();
    oCtx.drawImage(aImages[11], 50, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[7], 200, 50, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[12], 350, 50, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[3], 500, 50, 100, 100);


    ombreAliments3();
    oCtx.drawImage(aImages[19], 700, 70, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[6], 50, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[16], 200, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[17], 350, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[9], 500, 200, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[10], 650, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[18], 800, 200, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[13], 50, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[1], 200, 400, 100, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[15], 330, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[2], 440, 400, 80, 100);



    ombreAliments1();
    oCtx.drawImage(aImages[5], 530, 400, 100, 100);



    ombreAliments3();
    oCtx.drawImage(aImages[14], 700, 400, 100, 100);



    ombreAliments2();
    oCtx.drawImage(aImages[8], 800, 400, 100, 100);


    oCtx.shadowColor = "rgba(0,0,0,0)";
}

/******************************RÉSULTAT FINAL APRÈS PARTIE**************************** */

//pour complier les points afin de déterminer le classement
function IDresultat() {
    if (sEtat == "finFaci") {
        if (Stats.nPointsBudget1 > but.nBudget && Stats.nPointsBudget1 < 50) {
            totalClassement += 1
        };

        if (Stats.nPointsQuantité >= but.nQuantitéFaci) {
            totalClassement += 1
        };

        if (Stats.nPointsSanté >= but.nSanté) {
            totalClassement += 1
        };

    }

    if (sEtat == "finMoyen") {
        if (Stats.nPointsBudget2 > but.nBudget && Stats.nPointsBudget2 < 35) {
            totalClassement += 1
        };

        if (Stats.nPointsQuantité >= but.nQuantitéMoyen) {
            totalClassement += 1
        };
        if (Stats.nPointsSanté >= but.nSanté) {
            totalClassement += 1
        };

    }
    if (sEtat == "finDiff") {
        if (Stats.nPointsBudget3 > but.nBudget && Stats.nPointsBudget3 < 25) {
            totalClassement += 1
        };

        if (Stats.nPointsQuantité >= but.nQuantitéDiff) {
            totalClassement += 1
        };
        if (Stats.nPointsSanté >= but.nSanté) {
            totalClassement += 1
        };

    }







}
//***************FIN DU JEU*********************************************** */
//(structure du code pareille pour chaque etat de fin de jeu, sauf les valeurs à atteindre)

// Écran 6A: Affichage des résultats
function finJeuFaci() {
    console.log("Dans finFaci...");
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgAssiette, 0, 0, nLargeurCanvas, nHauteurCanvas);

    //fond pour le texte
    oCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
    oCtx.fillRect(180, 60, 500, 500)
    oCtx.fill()

    //boutons rejouer
    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(320, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    //boutons maison
    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(550, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    //icones des boutons
    oCtx.drawImage(oImgRejouer, 290, 90, 62, 62);
    oCtx.drawImage(oImgAccueil, 520, 90, 62, 62);


    //affichage des résultats finaux
    oCtx.fillStyle = "rgba(1, 0, 0, 1)";
    oCtx.font = "30px JetBrains Mono";
    oCtx.textAlign = "center";

    oCtx.fillText("Quantité Acquise:" + Stats.nPointsQuantité + "/" + but.nQuantitéFaci, 430, 200, 480);
    oCtx.fillText("Qualitée générale de l'alimentation:" + Stats.nPointsSanté + "/" + but.nSanté, 430, 250, 480);
    oCtx.fillText("Budget restant:" + Stats.nPointsBudget1 + "/50$", 430, 300, 480);

    totalClassement = 0; //<= probablement pas meilleure méthode (Erreure signalée en cours)

    //détermination de la valeur de totalclassement
    IDresultat()

    //affichage de classement en fonction de résultat

    if (totalClassement == 0) {
        dessinerLettre("red", "D");
    }

    else if (totalClassement == 1) {
        dessinerLettre("orange", "C");
    }
    else if (totalClassement == 2) {
        dessinerLettre("yellow", "B");
    }
    else {
        dessinerLettre("green", "A");
    }




}
function finJeuMoyen() {
    console.log("Dans finMoyen...");
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgAssiette, 0, 0, nLargeurCanvas, nHauteurCanvas);



    oCtx.fillStyle = "rgba(255, 255, 255, 0.66)";
    oCtx.fillRect(180, 60, 500, 500)
    oCtx.fill()



    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(320, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(550, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    oCtx.drawImage(oImgRejouer, 290, 90, 62, 62);
    oCtx.drawImage(oImgAccueil, 520, 90, 62, 62);



    oCtx.fillStyle = "rgba(1, 0, 0, 1)";
    oCtx.font = "30px JetBrains Mono";
    oCtx.textAlign = "center";

    oCtx.fillText("Quantité Acquise:" + Stats.nPointsQuantité + "/" + but.nQuantitéMoyen, 430, 200, 480);
    oCtx.fillText("Qualitée générale de l'alimentation:" + Stats.nPointsSanté + "/" + but.nSanté, 430, 250, 480);
    oCtx.fillText("Budget restant:" + Stats.nPointsBudget2 + "/35$", 430, 300, 480);


    totalClassement = 0;


    IDresultat()
    


    if (totalClassement == 0) {
        dessinerLettre("red", "D");
    }

    else if (totalClassement == 1) {
        dessinerLettre("orange", "C");
    }
    else if (totalClassement == 2) {
        dessinerLettre("yellow", "B");
    }
    else {
        dessinerLettre("green", "A");
    }


}
function finJeuDiff() {
    console.log("Dans finDiff...");
    oCtx.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);
    oCtx.drawImage(oImgAssiette, 0, 0, nLargeurCanvas, nHauteurCanvas);



    //fond de texte
    oCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
    oCtx.fillRect(180, 60, 500, 500)
    oCtx.fill()

    
 
    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(320, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    oCtx.save();
    oCtx.fillStyle = "purple";
    oCtx.beginPath();
    oCtx.arc(550, 120, 45, 0, 2 * Math.PI);
    oCtx.fill();
    oCtx.restore();

    oCtx.drawImage(oImgRejouer, 290, 90, 62, 62);
    oCtx.drawImage(oImgAccueil, 520, 90, 62, 62);

  
    oCtx.fillStyle = "rgba(1, 0, 0, 1)";
    oCtx.font = "30px JetBrains Mono";
    oCtx.textAlign = "center";

    oCtx.fillText("Quantité Acquise:" + Stats.nPointsQuantité + "/" + but.nQuantitéMoyen, 430, 200, 480);
    oCtx.fillText("Qualitée générale de l'alimentation:" + Stats.nPointsSanté + "/" + but.nSanté, 430, 250, 480);
    oCtx.fillText("Budget restant:" + Stats.nPointsBudget3 + "/25$", 430, 300, 480);

    totalClassement = 0;

    
    IDresultat()
    
    


    if (totalClassement == 0) {
        dessinerLettre("red", "D");
    }

    else if (totalClassement == 1) {
        dessinerLettre("orange", "C");
    }
    else if (totalClassement == 2) {
        dessinerLettre("yellow", "B");
    }
    else {
        dessinerLettre("green", "A");
    }
}


//fonction pour dessiner la lettre du classement final
function dessinerLettre(couleur, sTexte) {
    oCtx.fillStyle = couleur;
    oCtx.font = "240px Arial";
    oCtx.fillText(sTexte, 434, 465);
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";

}
//fonction pour dessiner bouton payer
function dessinerBouton(nPosX, nPosY, nLargeur = 100, nHauteur = 50,
    sFond , sTexte) {
    oCtx.fillStyle = sFond;
    oCtx.fillRect(nPosX, nPosY, nLargeur, nHauteur, 10);
    oCtx.fillStyle = "#ffffff";
    oCtx.font = "20px Arial";
    oCtx.textBaseline = "middle";
    oCtx.textAlign = "center";
    oCtx.fillText(sTexte, nPosX + nLargeur / 2, nPosY + nHauteur / 2);
}


/**
 * Dessine un bouton d'action dans le canvas.
 * @param {Number} nPosX Position horizontal du début du bouton.
 * @param {Number} nPosY Position vertical du début du bouton.
 * @param {Number} nLargeur Largeur du bouton.
 * @param {Number} nHauteur Hauteur du bouton.
 * @param {String} sFond Couleur (nom, hex, etc.) du fond du bouton.
 * @param {String} sTexte Texte sur le bouton.
 * @param {string} sCouleur Couleur de la lettre
 * @returns void;
 */
