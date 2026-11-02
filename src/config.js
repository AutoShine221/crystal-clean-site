// ============================================================
// CONFIG CRYSTALCLEAN — tout ce qui est à modifier est ici.
//
// Les valeurs à `null` sont « À COMPLÉTER » : tant qu'elles sont vides,
// la page affiche en local (npm run dev) un repère orange « à compléter » ;
// en ligne (npm run build), l'élément est simplement masqué.
// ============================================================

// ---- Contacts (À COMPLÉTER) ----
// Numéro WhatsApp au format international sans « + » ni espaces, ex. "221770000000"
export const WHATSAPP_NUMBER = "221786335353";
// Numéro affiché et appelable, ex. "+221 77 000 00 00"
export const PHONE_DISPLAY = "+221 78 633 53 53";
// E-mail de contact, ex. "contact@crystalclean.sn"
export const EMAIL = null;
// Adresse (siège / bureau), ex. "Sacré-Cœur 3, Dakar"
export const ADDRESS = null;
// NINEA de l'entreprise
export const NINEA = null;
// Numéro Wave marchand (affiché dans la section paiement)
export const WAVE_NUMBER = null;
// Compte Instagram, ex. "https://instagram.com/crystalclean.dakar" et "@crystalclean.dakar"
export const INSTAGRAM_URL = null;
export const INSTAGRAM_HANDLE = null;
// URL publique du site (pour les balises de partage), ex. "https://crystalclean.sn"
export const SITE_URL = null;

// ---- Logo officiel (seul logo à utiliser) ----
// Préfixe des fichiers de public/ (le site est servi sous /crystal-clean-site/ sur GitHub Pages)
const BASE = import.meta.env.BASE_URL;

// ---- Logo officiel (seul logo à utiliser) ----
export const LOGO = `${BASE}images/logo-crystalclean.png`;

// ---- Photos (À COMPLÉTER) ----
// Déposer les photos dans public/images/ puis renseigner les chemins avec BASE.
// Tant qu'une photo vaut null, un emplacement « photo à venir » est affiché.
export const PHOTOS = {
  hero: null, // ex. `${BASE}images/hero.jpg` — bureau ou espace lumineux après passage
  avant: null, // ex. `${BASE}images/avant.jpg`
  apres: null, // ex. `${BASE}images/apres.jpg` — même cadrage que la photo avant
  galerie: [null, null, null, null, null, null, null, null], // ex. `${BASE}images/g1.jpg`
};

// ---- Lien WhatsApp ----
// Sans numéro, wa.me ouvre WhatsApp en laissant choisir le destinataire.
export const wa = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent(msg)}`;

// ---- Offre (prix indicatifs, alignés sur l'app de gestion) ----
export const FORMULES = [
  {
    nom: "Bureaux",
    tagline: "Des locaux impeccables pour vos équipes",
    prix: [
      ["25 000", "Entretien standard"],
      ["60 000", "Grand ménage"],
    ],
    duree: "Selon la surface",
    populaire: true,
    inclus: [
      "Dépoussiérage des postes de travail et du mobilier",
      "Aspiration et lavage des sols",
      "Sanitaires et kitchenette désinfectés",
      "Vidage des corbeilles, tri des déchets",
      "Grand ménage : vitres intérieures, plinthes, recoins",
    ],
    msg: "Bonjour CrystalClean, je souhaite un devis pour le nettoyage de nos BUREAUX. Surface / adresse : ",
  },
  {
    nom: "Résidence",
    tagline: "Votre intérieur, sans y penser",
    prix: [["35 000", "Appartement / villa"]],
    duree: "Selon la surface",
    inclus: [
      "Chambres, séjour et pièces de vie",
      "Cuisine dégraissée, électroménager extérieur",
      "Salles de bain détartrées et désinfectées",
      "Sols aspirés et lavés",
      "Produits fournis par nos équipes",
    ],
    msg: "Bonjour CrystalClean, je souhaite réserver un nettoyage de RÉSIDENCE. Adresse / nombre de pièces : ",
  },
  {
    nom: "Commerces",
    tagline: "Un accueil client irréprochable",
    prix: [
      ["40 000", "Boutique"],
      ["65 000", "Restaurant / CHR"],
    ],
    duree: "Hors heures d'ouverture",
    inclus: [
      "Surface de vente et vitrines",
      "Cuisines et zones de préparation (CHR)",
      "Dégraissage des sols et des hottes",
      "Sanitaires clients désinfectés",
      "Interventions tôt le matin ou après fermeture",
    ],
    msg: "Bonjour CrystalClean, je souhaite un devis pour mon COMMERCE / RESTAURANT. Type et adresse : ",
  },
];

// Prestations spécifiques (remplace le bloc « frais de déplacement » d'Auto Shine)
export const SPECIFIQUES = [
  ["120 000 Fcfa", "Après travaux", "Fin de chantier, gravats fins, poussière"],
  ["150 000 Fcfa", "Industriel", "Entrepôts, ateliers, sites de production"],
  ["180 000 Fcfa", "Grande surface", "Supermarchés, salles de cinéma"],
  ["2 500 Fcfa / m", "Lavage de vitres", "Baies, façades vitrées, vitrines"],
];

export const FREQUENCES = [
  "Quotidien",
  "Hebdomadaire",
  "Toutes les 2 semaines",
  "Mensuel",
];

// Quartiers indicatifs (à ajuster selon la zone réellement couverte)
export const ZONES = [
  "Plateau",
  "Almadies",
  "Mermoz – Sacré-Cœur",
  "Point E – Fann",
  "Ngor – Ouakam",
  "Liberté – HLM",
  "Banlieue",
];

export const FAQ = [
  {
    q: "Comment obtenir un devis ?",
    a: "Écrivez-nous sur WhatsApp avec le type de locaux, la surface approximative et l'adresse. Pour les bureaux et les sites professionnels, nous passons visiter les lieux et vous remettons un devis personnalisé sous 48 h.",
  },
  {
    q: "Dois-je fournir le matériel ou les produits ?",
    a: "Non. Nos équipes arrivent avec le matériel professionnel et les produits adaptés à chaque surface. Vous n'avez rien à prévoir.",
  },
  {
    q: "Pouvez-vous intervenir en dehors des heures d'ouverture ?",
    a: "Oui. Tôt le matin, le soir ou le week-end : nous planifions nos passages pour ne pas gêner votre activité ni vos clients.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Pour une prestation ponctuelle, le règlement se fait à la fin de l'intervention, après contrôle avec vous : Wave, Orange Money ou espèces. Les contrats entreprise sont facturés chaque mois, réglables par Wave, Orange Money ou virement.",
  },
  {
    q: "Proposez-vous des contrats d'entretien réguliers ?",
    a: "Oui : quotidien, hebdomadaire, toutes les 2 semaines ou mensuel. Les entreprises multi-sites bénéficient d'un planning dédié, d'un interlocuteur unique et d'une tarification négociée.",
  },
  {
    q: "Comment la qualité est-elle contrôlée ?",
    a: "Chaque intervention suit une check-list et fait l'objet d'un contrôle qualité. Vous recevez les photos de passage et pouvez suivre vos interventions depuis votre espace client.",
  },
];
