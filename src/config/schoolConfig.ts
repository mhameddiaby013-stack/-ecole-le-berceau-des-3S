/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Configuration officielle et données des Écoles Le Berceau des 3S
 * Note d'intégrité : Tous les éléments en attente de confirmation de la direction sont explicitement balisés.
 */

export interface SchoolZone {
  id: string;
  name: string;
  commune: string;
  description: string;
  landmark: string;
  statusBadge: string;
  contactPersonNotice: string;
}

export interface SchoolProgram {
  id: string;
  level: string;
  badge: string;
  ageRange: string;
  classes: string[];
  objectives: string[];
  languages: string[];
  schedule: string;
  validationNotice: string;
}

export const SCHOOL_CONFIG = {
  name: "Les Écoles Le Berceau des 3S",
  shortName: "Le Berceau des 3S",
  legalNotice: "Établissement d'enseignement général privé à Conakry, République de Guinée.",
  
  // Slogan proposé (à confirmer par le conseil d'administration)
  motto: "L'Excellence, la Discipline et la Réussite de nos Enfants",
  mottoNotice: "Slogan proposé - à faire valider par la direction de l'établissement",

  // Numéro WhatsApp Officiel (spécifié par l'utilisateur)
  whatsappNumber: "+224 662 11 80 00",
  whatsappRaw: "224662118000",
  whatsappPrefilledMessage: "Bonjour la Direction des Écoles Le Berceau des 3S, je vous contacte depuis le site web officiel pour obtenir des renseignements sur les inscriptions et les programmes scolaires.",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappRaw}?text=${encodeURIComponent(this.whatsappPrefilledMessage)}`;
  },

  // E-mail et Téléphone général
  phoneGeneral: "+224 662 11 80 00 (Service d'accueil WhatsApp & Appels)",
  emailDisplay: "direction@leberceaudes3s.edu.gn",
  emailNotice: "Adresse e-mail à confirmer officiellement par l'administration",

  // Configuration Facebook
  // IMPORTANT : L'utilisateur peut modifier cette variable ou définir VITE_FACEBOOK_PAGE_URL dans son environnement
  defaultFacebookPageUrl: "https://www.facebook.com/LeBerceauDes3S",
  get facebookPageUrl() {
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FACEBOOK_PAGE_URL) 
      ? import.meta.env.VITE_FACEBOOK_PAGE_URL 
      : this.defaultFacebookPageUrl;
  },
  facebookNotice: "URL Facebook officielle paramétrable via VITE_FACEBOOK_PAGE_URL ou dans le panneau de configuration.",

  // Zones de localisation à Conakry (Taouyah, Carrière, Sonfonia)
  zones: [
    {
      id: "taouyah",
      name: "Campus / Zone Taouyah",
      commune: "Commune de Ratoma, Conakry",
      landmark: "Secteur Taouyah - Proximité axes principaux",
      description: "Cadre d'apprentissage moderne et sécurisé, facilement accessible pour les familles de Taouyah, Kipé et Minière.",
      statusBadge: "Zone d'implantation à confirmer avec la direction",
      contactPersonNotice: "Adresse exacte et repères de visite disponibles auprès du secrétariat au +224 662 11 80 00."
    },
    {
      id: "carriere",
      name: "Campus / Zone Carrière",
      commune: "Commune de Dixinn / Matam, Conakry",
      landmark: "Secteur Carrière - Zone centrale",
      description: "Situation géographique centrale facilitant l'accès des élèves et parents de la zone urbaine de Conakry.",
      statusBadge: "Zone d'implantation à confirmer avec la direction",
      contactPersonNotice: "Emplacement précis à valider avec la direction des études."
    },
    {
      id: "sonfonia",
      name: "Campus / Zone Sonfonia",
      commune: "Commune de Sonfonia, Conakry",
      landmark: "Secteur Sonfonia - Grand pôle éducatif",
      description: "Espace spacieux et propice aux études au cœur du pôle universitaire et scolaire de Sonfonia.",
      statusBadge: "Zone d'implantation à confirmer avec la direction",
      contactPersonNotice: "Détails d'accueil et bureaux d'information disponibles via WhatsApp."
    }
  ] as SchoolZone[],

  // Les 3 Piliers symboliques "3S" (Savoir, Sagesse, Succès)
  pillars3S: [
    {
      letter: "S",
      title: "Savoir",
      subtitle: "Rigueur académique & curiosité intellectuelle",
      description: "Maîtrise fondamentale des disciplines scientifiques, littéraires et linguistiques selon les exigences du programme guinéen et l'ouverture internationale.",
      notice: "Signification des 3S proposée - à valider par la direction"
    },
    {
      letter: "S",
      title: "Sagesse",
      subtitle: "Éducation civique, discipline & valeurs morales",
      description: "Culture du respect mutuel, civisme républicain, esprit d'entraide et développement de la maturité personnelle de chaque apprenant.",
      notice: "Signification des 3S proposée - à valider par la direction"
    },
    {
      letter: "S",
      title: "Succès",
      subtitle: "Excellence aux examens & préparation de l'avenir",
      description: "Accompagnement rigoureux de chaque élève pour franchir avec brio les examens nationaux (Certificat, Brevet / BEPC, Baccalauréat).",
      notice: "Signification des 3S proposée - à valider par la direction"
    }
  ],

  // Cycles scolaires
  programs: [
    {
      id: "maternelle",
      level: "Maternelle / Préscolaire",
      badge: "De la Petite à la Grande Section",
      ageRange: "3 à 5 ans",
      classes: ["Petite Section (PS)", "Moyenne Section (MS)", "Grande Section (GS)"],
      objectives: [
        "Socialisation et développement de l'autonomie",
        "Éveil au langage oral, à la motricité fine et aux activités artistiques",
        "Initiation douce aux pré-requis de la lecture et de la numération",
        "Activités sensorielles et jeux pédagogiques encadrés"
      ],
      languages: ["Français (langue d'éveil)", "Initiation ludique à l'Anglais"],
      schedule: "Lundi au Vendredi : 08h00 - 13h00 (Horaires indicatifs)",
      validationNotice: "Détails du programme et horaires à confirmer avec la direction"
    },
    {
      id: "primaire",
      level: "École Primaire / Élémentaire",
      badge: "Du CP1 au CM2",
      ageRange: "6 à 11 ans",
      classes: ["CP1", "CP2", "CE1", "CE2", "CM1", "CM2 (Préparation à l'Examen d'Entrée en 7ème)"],
      objectives: [
        "Consolidation des savoirs fondamentaux : lire, écrire, compter, raisonner",
        "Sciences d'observation, histoire, géographie et éducation civique et morale",
        "Régularité des évaluations formatives et soutien personnalisé",
        "Taux d'assimilation élevé et préparation au Certificat d'Études Primaires"
      ],
      languages: ["Français (langue d'enseignement)", "Anglais (apprentissage régulier)"],
      schedule: "Lundi au Vendredi : 08h00 - 14h00 (Horaires indicatifs)",
      validationNotice: "Détails du programme et horaires à confirmer avec la direction"
    },
    {
      id: "college",
      level: "Collège / Premier Cycle",
      badge: "De la 7ème à la 10ème Année",
      ageRange: "11 à 15 ans",
      classes: ["7ème Année", "8ème Année", "9ème Année", "10ème Année (BEPC / Brevet)"],
      objectives: [
        "Renforcement des méthodes de travail et de l'esprit critique",
        "Approfondissement en mathématiques, physique-chimie et biologie (SVT)",
        "Expression écrite, littérature et dissertations guidées",
        "Entraînements intensifs aux épreuves types du BEPC guinéen"
      ],
      languages: ["Français", "Anglais renforcé", "Deuxième langue vivante / Arabe à confirmer"],
      schedule: "Lundi au Samedi matin selon l'emploi du temps officiel",
      validationNotice: "Détails du programme et horaires à confirmer avec la direction"
    },
    {
      id: "lycee",
      level: "Lycée / Second Cycle",
      badge: "De la 11ème à la Terminale",
      ageRange: "15 à 18 ans+",
      classes: [
        "11ème Année (Tronc commun & orientations)",
        "12ème Année (Sciences Mathématiques, Sciences Expérimentales, Sciences Sociales)",
        "Terminale (Baccalauréat Unique - SM, SE, SS)"
      ],
      objectives: [
        "Préparation d'élite au Baccalauréat Unique guinéen",
        "Bacs blancs semestriels et simulations en conditions réelles",
        "Orientation post-bac : universités guinéennes et opportunités à l'international",
        "Ateliers d'éloquence, leadership scolaire et culture générale"
      ],
      languages: ["Français de haut niveau", "Anglais académique & scientifique"],
      schedule: "Selon la grille horaire officielle du Ministère de l'Enseignement Pré-Universitaire",
      validationNotice: "Détails du programme et filières à confirmer avec la direction"
    }
  ] as SchoolProgram[],

  // Procédure d'inscription & Pièces à fournir (standard et transparent)
  admission: {
    notice: "Informations administratives indicatives - Frais scolaires et calendrier officiel à obtenir auprès de la direction.",
    steps: [
      {
        step: 1,
        title: "Préinscription en ligne ou sur place",
        desc: "Remplissez le formulaire sur ce site ou venez directement dans l'un de nos bureaux d'accueil."
      },
      {
        step: 2,
        title: "Entretien ou test de niveau",
        desc: "Rencontre d'évaluation bienveillante pour orienter l'élève dans la classe la plus adaptée."
      },
      {
        step: 3,
        title: "Dépôt des pièces administratives",
        desc: "Remise du dossier complet et validation définitive par la direction des études."
      },
      {
        step: 4,
        title: "Finalisation & intégration",
        desc: "Paiement des formalités, attribution de la classe et remise du règlement intérieur."
      }
    ],
    documentsRequired: [
      "Extrait d'acte de naissance ou jugement supplétif (original ou copie légalisée)",
      "4 photos d'identité récentes en couleur (fond blanc ou uni)",
      "Bulletins de notes des deux dernières années scolaires",
      "Certificat de scolarité ou certificat de radiation délivré par l'ancien établissement",
      "Photocopie du carnet de vaccination à jour (pour la Maternelle et le Primaire)",
      "Attestation ou diplôme du diplôme d'admission précédente (pour 7ème et 11ème année)"
    ]
  }
};
