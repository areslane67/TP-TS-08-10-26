// =====================================================================
// TP noté : gestion d'un parc de véhicules
// M2 Conception d'applications web · TypeScript · 1 heure · individuel
//
// Nom et prénom :
//
// Renommez ce fichier en parc.ts et placez-le dans votre projet TypeScript.
// Règles : mode strict ; interdits : any, as, ! et // @ts-ignore.
// Ne modifiez ni les données fournies ni les signatures imposées par le sujet.
//
// Les vérifications de chaque question sont dans des blocs /* ... */.
// Pour activer un bloc, supprimez la ligne /* qui l'ouvre et la ligne */
// qui le ferme.
//
// Tant que la question 1 n'est pas faite, le compilateur affiche des
// erreurs « Cannot find name 'Vehicule' » : c'est normal.
// =====================================================================

// ---------------------------------------------------------------------
// Question 1 : les types
// ---------------------------------------------------------------------

type Categorie = "voiture" | "moto" | "utilitaire";
type Statut = "disponible" | "loue" | "maintenance";

type Vehicule = {
  immatriculation: string;
  marque: string;
  modele: string;
  categorie: Categorie;
  annee: number;
  kilometrage: number;
  prixJour: number;
  statut: Statut;
  hayon?: boolean;
};

// Données fournies : ne les modifiez pas.
// Elles compilent dès que vos types de la question 1 sont corrects.
const clio: Vehicule = {
  immatriculation: "AB-123-CD",
  marque: "Renault",
  modele: "Clio",
  categorie: "voiture",
  annee: 2021,
  kilometrage: 42000,
  prixJour: 45,
  statut: "disponible",
};
const tesla: Vehicule = {
  immatriculation: "EF-456-GH",
  marque: "Tesla",
  modele: "Model 3",
  categorie: "voiture",
  annee: 2023,
  kilometrage: 18500,
  prixJour: 90,
  statut: "loue",
};
const peugeot: Vehicule = {
  immatriculation: "IJ-789-KL",
  marque: "Peugeot",
  modele: "5008",
  categorie: "voiture",
  annee: 2019,
  kilometrage: 88900,
  prixJour: 70,
  statut: "disponible",
};
const mt07: Vehicule = {
  immatriculation: "MN-012-OP",
  marque: "Yamaha",
  modele: "MT-07",
  categorie: "moto",
  annee: 2022,
  kilometrage: 12300,
  prixJour: 60,
  statut: "disponible",
};
const cb125: Vehicule = {
  immatriculation: "QR-345-ST",
  marque: "Honda",
  modele: "CB125R",
  categorie: "moto",
  annee: 2020,
  kilometrage: 29700,
  prixJour: 35,
  statut: "maintenance",
};
const master: Vehicule = {
  immatriculation: "UV-678-WX",
  marque: "Renault",
  modele: "Master",
  categorie: "utilitaire",
  annee: 2020,
  kilometrage: 104200,
  prixJour: 85,
  statut: "disponible",
  hayon: true,
};
const berlingo: Vehicule = {
  immatriculation: "YZ-901-AB",
  marque: "Citroën",
  modele: "Berlingo",
  categorie: "utilitaire",
  annee: 2022,
  kilometrage: 14600,
  prixJour: 55,
  statut: "loue",
  hayon: false,
};
const fiat: Vehicule = {
  immatriculation: "CD-234-EF",
  marque: "Fiat",
  modele: "500",
  categorie: "voiture",
  annee: 2018,
  kilometrage: 59900,
  prixJour: 38,
  statut: "disponible",
};

const parc: Vehicule[] = [clio, tesla, peugeot, mt07, cb125, master, berlingo, fiat];

// Outil d'affichage pour les vérifications : la liste des immatriculations.
function immats(liste: Vehicule[]): string {
  return liste.map((v) => v.immatriculation).join(" ");
}

// ---------------------------------------------------------------------
// Question 2 : premières fonctions
// ---------------------------------------------------------------------

function decrire(vehicule: Vehicule): string {
  return `${vehicule.marque} ${vehicule.modele} (${vehicule.annee}), ${vehicule.categorie}, ${vehicule.prixJour} € par jour`;
}

function estDisponible(vehicule: Vehicule): boolean {
  return vehicule.statut === "disponible";
}

// --- Vérifications, question 2 : supprimez les lignes /* et */ pour les activer

console.log(decrire(clio));
//   → Renault Clio (2021), voiture, 45 € par jour
console.log(decrire(mt07));
//   → Yamaha MT-07 (2022), moto, 60 € par jour
console.log(estDisponible(clio), estDisponible(tesla));
//   → true false

// ---------------------------------------------------------------------
// Question 3 : filtrer le parc
// ---------------------------------------------------------------------

function disponibles(vehicules: Vehicule[]): Vehicule[] {
  return vehicules.filter((vehicule) => estDisponible(vehicule));
}

function parCategorie(vehicules: Vehicule[], categorie: Categorie): Vehicule[] {
  return vehicules.filter((vehicule) => vehicule.categorie === categorie);
}

// --- Vérifications, question 3 : supprimez les lignes /* et */ pour les activer

console.log(immats(disponibles(parc)));
//   → AB-123-CD IJ-789-KL MN-012-OP UV-678-WX CD-234-EF
console.log(immats(parCategorie(parc, "moto")));
//   → MN-012-OP QR-345-ST
console.log(immats(parCategorie(parc, "utilitaire")));
//   → UV-678-WX YZ-901-AB


// ---------------------------------------------------------------------
// Question 4 : le prix moyen
// ---------------------------------------------------------------------

function prixMoyen(vehicules: Vehicule[]): number {
  if (vehicules.length === 0) {
    return 0;
  }

  const total = vehicules.reduce((somme, vehicule) => somme + vehicule.prixJour, 0);
  return total / vehicules.length;
}

// --- Vérifications, question 4 : supprimez les lignes /* et */ pour les activer

console.log(prixMoyen(parc));
//   → 59.75
console.log(prixMoyen([clio, tesla]));
//   → 67.5
console.log(prixMoyen([]));
//   → 0


// ---------------------------------------------------------------------
// Question 5 : compter par catégorie
// ---------------------------------------------------------------------

type Compteur = {
  voiture: number;
  moto: number;
  utilitaire: number;
};

function compterParCategorie(vehicules: Vehicule[]): Compteur {
  const compteur: Compteur = { voiture: 0, moto: 0, utilitaire: 0 };

  for (const vehicule of vehicules) {
    compteur[vehicule.categorie] += 1;
  }

  return compteur;
}

// --- Vérifications, question 5 : supprimez les lignes /* et */ pour les activer

console.log(compterParCategorie(parc));
//   → { voiture: 4, moto: 2, utilitaire: 2 }
console.log(compterParCategorie([]));
//   → { voiture: 0, moto: 0, utilitaire: 0 }


// ---------------------------------------------------------------------
// Question 6 : les réservations
// ---------------------------------------------------------------------

interface Reservation {
  vehicule: Vehicule;
  client: string;
  jours: number;
}

function prixReservation(reservation: Reservation): number {
  let total = reservation.vehicule.prixJour * reservation.jours;

  if (reservation.jours >= 7) {
    total *= 0.9;
  }

  return Math.round(total * 100) / 100;
}

function chiffreAffaires(reservations: Reservation[]): number {
  let total = 0;

  for (const reservation of reservations) {
    total += prixReservation(reservation);
  }

  return total;
}

// --- Données de la question 6 : supprimez les lignes /* et */ quand Reservation est déclarée

// Données fournies (réservations) : ne les modifiez pas.
const reservation1: Reservation = { vehicule: clio, client: "Alice Martin", jours: 3 };
const reservation2: Reservation = { vehicule: master, client: "Karim Benali", jours: 10 };
const reservation3: Reservation = { vehicule: mt07, client: "Lucie Bernard", jours: 7 };
const reservations: Reservation[] = [reservation1, reservation2, reservation3];


// --- Vérifications, question 6 : supprimez les lignes /* et */ pour les activer

console.log(prixReservation(reservation1));
//   → 135
console.log(prixReservation(reservation2));
//   → 765
console.log(prixReservation(reservation3));
//   → 378
console.log(chiffreAffaires(reservations));
//   → 1278
console.log(chiffreAffaires([]));
//   → 0


// ---------------------------------------------------------------------
// Bonus : le véhicule le plus kilométré
// ---------------------------------------------------------------------

function lePlusKilometre(vehicules: Vehicule[]): string {
  if (vehicules.length === 0) {
    return "";
  }

  let plusKilometre = vehicules[0];

  if (plusKilometre === undefined) {
    return "";
  }

  for (const vehicule of vehicules.slice(1)) {
    if (vehicule.kilometrage > plusKilometre.kilometrage) {
      plusKilometre = vehicule;
    }
  }

  return plusKilometre.immatriculation;
}

// --- Vérifications, bonus : supprimez les lignes /* et */ pour les activer

console.log(lePlusKilometre(parc));
//   → UV-678-WX
console.log(lePlusKilometre([clio, fiat]));
//   → CD-234-EF
console.log(lePlusKilometre([]) === "");
//   → true

