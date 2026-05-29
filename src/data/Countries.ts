export const ZONES = [
    { id: 'AFR', name: 'AFRIQUE' },
    { id: 'EUR', name: 'EUROPE' },
    { id: 'ASI', name: 'ASIE' },
    { id: 'AME', name: 'AMÉRIQUES' },
    { id: 'OCE', name: 'OCÉANIE' },
];
export const MICRO_STATES = ['AD', 'MC', 'LI', 'MT', 'SM', 'VA', 'SG', 'BH', 'KM', 'LC', 'VC', 'GD', 'BB', 'AG', 'KN', 'DM'];
export const MICRO_ISLANDS_STATES = ['CV', 'ST', 'SC', 'MV', 'KI', 'NR', 'TV', 'MH', 'PW', 'FM'];
export const REGION_CAMERAS: Record<string, { center: [number, number]; zoom: number }> = {
    AFR: { center: [20, 0], zoom: 2.5 },      // Afrique
    EUR: { center: [15, 50], zoom: 3 },       // Europe
    ASI: { center: [100, 30], zoom: 2 },      // Asie
    AME: { center: [-75, 0], zoom: 2 },       // Amériques (Vue large)
    OCE: { center: [140, -25], zoom: 1.5 },   // Océanie
    WLD: { center: [0, 20], zoom: 1 }         // Monde
};

export interface Country {
    code: string;
    name_fr: string;
    name_en: string;
    flag: string;
    capital: string;
    mainColor: string;
    latitude: number;
    longitude: number;
    intro_fr: string;
    continentId: string;
    currency: string;
    language: string;
    population: number;
    dates: { year: number; event: string }[];
}

export const ALL_COUNTRIES: Country[] = [
    {
        code: 'AF', name_fr: 'Afghanistan', name_en: 'Afghanistan', flag: '🇦🇫', capital: 'Kabul', mainColor: '#000000', latitude: 33.9391, longitude: 67.7100,
        intro_fr: "Situé au carrefour de l'Asie centrale et du Sud, ce pays montagneux possède une histoire ancienne marquée par la route de la soie. Malgré des décennies de conflits, il conserve un patrimoine culturel riche et des paysages spectaculaires.",
        continentId: 'ASI',
        currency: 'Afghani (AFN)', language: 'Pachto, Dari', population: 40218234,
        dates: [
            { year: 1919, event: 'Indépendance vis-à-vis du contrôle britannique' },
            { year: 1979, event: 'Invasion soviétique' },
            { year: 1996, event: 'Prise de pouvoir par les talibans' },
            { year: 2001, event: 'Intervention américaine et chute des talibans' },
            { year: 2021, event: 'Retrait américain et retour au pouvoir des talibans' }
        ]
    },
    {
        code: 'ZA', name_fr: 'Afrique du Sud', name_en: 'South Africa', flag: '🇿🇦', capital: 'Pretoria', mainColor: '#007749', latitude: -30.5595, longitude: 22.9375,
        intro_fr: "Surnommée la nation arc-en-ciel pour sa diversité culturelle, elle offre des paysages variés allant de la Montagne de la Table aux réserves de safari. C'est une puissance économique régionale marquée par l'héritage de Nelson Mandela.",
        continentId: 'AFR',
        currency: 'Rand (ZAR)', language: 'Anglais, Afrikaans, Zoulou, Xhosa (et 7 autres)', population: 60604992,
        dates: [
            { year: 1910, event: 'Création de l\'Union d\'Afrique du Sud' },
            { year: 1948, event: 'Mise en place officielle de l\'Apartheid' },
            { year: 1990, event: 'Libération de Nelson Mandela' },
            { year: 1994, event: 'Premières élections multiraciales, élection de Mandela' }
        ]
    },
    {
        code: 'AL', name_fr: 'Albanie', name_en: 'Albania', flag: '🇦🇱', capital: 'Tirana', mainColor: '#E41E20', latitude: 41.1533, longitude: 20.1683,
        intro_fr: "Petit pays des Balkans baigné par l'Adriatique, l'Albanie mélange plages méditerranéennes vierges et montagnes escarpées. Longtemps isolée, elle s'ouvre au monde en révélant ses nombreux sites archéologiques et ses châteaux.",
        continentId: 'EUR',
        currency: 'Lek (ALL)', language: 'Albanais', population: 2832439,
        dates: [
            { year: 1443, event: 'Révolte de Skanderbeg contre l\'Empire ottoman' },
            { year: 1912, event: 'Proclamation de l\'indépendance' },
            { year: 1944, event: 'Prise de pouvoir par les communistes d\'Enver Hoxha' },
            { year: 1991, event: 'Chute du régime communiste et transition démocratique' },
            { year: 2009, event: 'Adhésion à l\'OTAN' }
        ]
    },
    {
        code: 'DZ', name_fr: 'Algérie', name_en: 'Algeria', flag: '🇩🇿', capital: 'Algiers', mainColor: '#006233', latitude: 28.0339, longitude: 1.6596,
        intro_fr: "Plus grand pays d'Afrique, l'Algérie offre un contraste saisissant entre son littoral méditerranéen fertile et l'immensité du désert du Sahara. Son histoire millénaire est marquée par des vestiges romains impressionnants et une architecture coloniale unique.",
        continentId: 'AFR',
        currency: 'Dinar algérien (DZD)', language: 'Arabe, Tamazight', population: 44903225,
        dates: [
            { year: 1830, event: 'Début de la colonisation française' },
            { year: 1954, event: 'Début de la guerre d\'indépendance' },
            { year: 1962, event: 'Indépendance de l\'Algérie' },
            { year: 1992, event: 'Début de la décennie noire' },
            { year: 2019, event: 'Début du mouvement de contestation du Hirak' }
        ]
    },
    {
        code: 'DE', name_fr: 'Allemagne', name_en: 'Germany', flag: '🇩🇪', capital: 'Berlin', mainColor: '#DD0000', latitude: 51.1657, longitude: 10.4515,
        intro_fr: "Puissance économique majeure de l'Europe, l'Allemagne est réputée pour son ingénierie, ses forêts denses et ses châteaux romantiques. C'est un pays de culture et d'innovation, berceau de grands compositeurs et philosophes.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Allemand', population: 83369843,
        dates: [
            { year: 1871, event: 'Unification de l\'Empire allemand' },
            { year: 1918, event: 'Fin de la Première Guerre mondiale et proclamation de la République de Weimar' },
            { year: 1945, event: 'Capitulation de l\'Allemagne nazie et division du pays' },
            { year: 1989, event: 'Chute du mur de Berlin' },
            { year: 1990, event: 'Réunification allemande' }
        ]
    },
    {
        code: 'AD', name_fr: 'Andorre', name_en: 'Andorra', flag: '🇦🇩', capital: 'Andorra la Vella', mainColor: '#003087', latitude: 42.5063, longitude: 1.5218,
        intro_fr: "Nichée dans les Pyrénées entre la France et l'Espagne, cette petite principauté est célèbre pour ses stations de ski et ses paysages montagneux. Elle attire également les visiteurs grâce à son statut fiscal avantageux et ses boutiques.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Catalan', population: 79034,
        dates: [
            { year: 1278, event: 'Signature du premier paréage (co-principauté)' },
            { year: 1993, event: 'Adoption de la première Constitution écrite et entrée à l\'ONU' },
            { year: 2011, event: 'Adoption d\'un impôt sur les sociétés (fin du paradis fiscal strict)' }
        ]
    },
    {
        code: 'AO', name_fr: 'Angola', name_en: 'Angola', flag: '🇦🇴', capital: 'Luanda', mainColor: '#CC092F', latitude: -11.2027, longitude: 17.8739,
        intro_fr: "Situé sur la côte atlantique de l'Afrique australe, l'Angola est riche en ressources naturelles comme le pétrole et les diamants. Le pays se reconstruit rapidement après une longue guerre civile, mélangeant modernité urbaine et traditions.",
        continentId: 'AFR',
        currency: 'Kwanza (AOA)', language: 'Portugais', population: 35588987,
        dates: [
            { year: 1483, event: 'Arrivée de l\'explorateur portugais Diogo Cão' },
            { year: 1975, event: 'Indépendance vis-à-vis du Portugal' },
            { year: 1975, event: 'Début de la guerre civile angolaise' },
            { year: 2002, event: 'Fin de la guerre civile (mort de Jonas Savimbi)' }
        ]
    },
    {
        code: 'SA', name_fr: 'Arabie saoudite', name_en: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', mainColor: '#165D31', latitude: 23.8859, longitude: 45.0792,
        intro_fr: "Berceau de l'Islam abritant les lieux saints de La Mecque et Médine, ce royaume désertique est le plus grand exportateur de pétrole au monde. Il s'ouvre aujourd'hui au tourisme et modernise son économie à travers des projets futuristes.",
        continentId: 'ASI',
        currency: 'Riyal saoudien (SAR)', language: 'Arabe', population: 36408820,
        dates: [
            { year: 1932, event: 'Fondation du Royaume d\'Arabie saoudite par Ibn Séoud' },
            { year: 1938, event: 'Découverte de vastes réserves de pétrole' },
            { year: 2016, event: 'Lancement de la Vision 2030 (diversification économique)' },
            { year: 2018, event: 'Levée de l\'interdiction de conduire pour les femmes' }
        ]
    },
    {
        code: 'AR', name_fr: 'Argentine', name_en: 'Argentina', flag: '🇦🇷', capital: 'Buenos Aires', mainColor: '#74ACDF', latitude: -38.4161, longitude: -63.6167,
        intro_fr: "Terre du tango et des gauchos, l'Argentine s'étend des plaines de la Pampa aux glaciers de la Patagonie. Sa capitale cosmopolite, Buenos Aires, est souvent comparée aux grandes villes européennes pour son architecture élégante.",
        continentId: 'AME',
        currency: 'Peso argentin (ARS)', language: 'Espagnol', population: 46234830,
        dates: [
            { year: 1816, event: 'Déclaration d\'indépendance' },
            { year: 1946, event: 'Élection de Juan Perón à la présidence' },
            { year: 1976, event: 'Coup d\'État militaire et début de la dictature' },
            { year: 1982, event: 'Guerre des Malouines' },
            { year: 1983, event: 'Retour à la démocratie' }
        ]
    },
    {
        code: 'AM', name_fr: 'Arménie', name_en: 'Armenia', flag: '🇦🇲', capital: 'Yerevan', mainColor: '#D90012', latitude: 40.0691, longitude: 45.0382,
        intro_fr: "Considérée comme la première nation chrétienne au monde, cette ancienne république soviétique du Caucase est parsemée de monastères pittoresques. Son paysage montagneux est dominé par la silhouette emblématique du mont Ararat.",
        continentId: 'ASI',
        currency: 'Dram arménien (AMD)', language: 'Arménien', population: 2780469,
        dates: [
            { year: 301, event: 'Adoption du christianisme comme religion d\'État' },
            { year: 1915, event: 'Début du génocide arménien' },
            { year: 1991, event: 'Indépendance suite à la chute de l\'URSS' },
            { year: 2020, event: 'Seconde guerre du Haut-Karabagh' }
        ]
    },
    {
        code: 'AU', name_fr: 'Australie', name_en: 'Australia', flag: '🇦🇺', capital: 'Canberra', mainColor: '#00008B', latitude: -25.2744, longitude: 133.7751,
        intro_fr: "À la fois île et continent, l'Australie est célèbre pour son Outback sauvage, sa Grande Barrière de corail et sa faune unique comme les kangourous. Ses villes côtières dynamiques comme Sydney et Melbourne offrent une qualité de vie exceptionnelle.",
        continentId: 'OCE',
        currency: 'Dollar australien (AUD)', language: 'Anglais', population: 26177413,
        dates: [
            { year: 1788, event: 'Arrivée de la First Fleet (première colonie pénitentiaire britannique)' },
            { year: 1901, event: 'Fédération de l\'Australie (indépendance d\'un dominion)' },
            { year: 1967, event: 'Référendum accordant des droits constitutionnels aux Aborigènes' },
            { year: 2008, event: 'Excuses officielles du gouvernement aux générations volées aborigènes' }
        ]
    },
    {
        code: 'AT', name_fr: 'Autriche', name_en: 'Austria', flag: '🇦🇹', capital: 'Vienna', mainColor: '#ED2939', latitude: 47.5162, longitude: 14.5501,
        intro_fr: "Au cœur des Alpes, l'Autriche séduit par ses paysages de montagne grandioses et son riche héritage impérial. Vienne, sa capitale, est un centre mondial de la musique classique et de l'architecture baroque.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Allemand', population: 8939617,
        dates: [
            { year: 1867, event: 'Création de la double monarchie austro-hongroise' },
            { year: 1918, event: 'Démembrement de l\'empire et naissance de la République' },
            { year: 1938, event: 'Anschluss (annexion par l\'Allemagne nazie)' },
            { year: 1955, event: 'Traité d\'État autrichien garantissant sa neutralité permanente' },
            { year: 1995, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'AZ', name_fr: 'Azerbaïdjan', name_en: 'Azerbaijan', flag: '🇦🇿', capital: 'Baku', mainColor: '#0092BC', latitude: 40.1431, longitude: 47.5769,
        intro_fr: "Surnommé la terre de feu, ce pays du Caucase sur la mer Caspienne mélange traditions orientales et architecture ultramoderne. Bakou, sa capitale, est célèbre pour ses tours en forme de flammes et sa vieille ville médiévale.",
        continentId: 'ASI',
        currency: 'Manat azerbaïdjanais (AZN)', language: 'Azéri', population: 10353296,
        dates: [
            { year: 1918, event: 'Création de la République démocratique d\'Azerbaïdjan' },
            { year: 1991, event: 'Indépendance de l\'Union soviétique' },
            { year: 1994, event: 'Signature du \"Contrat du siècle\" (pétrole de la Caspienne)' },
            { year: 2020, event: 'Seconde guerre du Haut-Karabagh et récupération de territoires' }
        ]
    },
    {
        code: 'BS', name_fr: 'Bahamas', name_en: 'Bahamas', flag: '🇧🇸', capital: 'Nassau', mainColor: '#00778B', latitude: 25.0343, longitude: -77.3963,
        intro_fr: "Cet archipel de plus de 700 îles dans l'océan Atlantique est une destination touristique de premier plan connue pour ses eaux cristallines. C'est un paradis pour la plongée, la navigation de plaisance et la détente sur des plages de sable blanc.",
        continentId: 'AME',
        currency: 'Dollar bahaméen (BSD)', language: 'Anglais', population: 409984,
        dates: [
            { year: 1492, event: 'Arrivée de Christophe Colomb sur l\'île de San Salvador' },
            { year: 1718, event: 'Les Bahamas deviennent une colonie de la Couronne britannique' },
            { year: 1973, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 2019, event: 'Dévastation historique causée par l\'ouragan Dorian' }
        ]
    },
    {
        code: 'BH', name_fr: 'Bahreïn', name_en: 'Bahrain', flag: '🇧🇭', capital: 'Manama', mainColor: '#DA291C', latitude: 26.0667, longitude: 50.5577,
        intro_fr: "Petit archipel du golfe Persique, Bahreïn est réputé pour son histoire liée à la pêche aux perles et son secteur financier moderne. Le pays allie gratte-ciels futuristes et sites archéologiques de l'ancienne civilisation Dilmun.",
        continentId: 'ASI',
        currency: 'Dinar bahreïni (BHD)', language: 'Arabe', population: 1472233,
        dates: [
            { year: 1932, event: 'Découverte de pétrole (première du côté arabe du Golfe)' },
            { year: 1971, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 2001, event: 'Adoption de la Charte d\'action nationale (réformes démocratiques)' },
            { year: 2011, event: 'Soulèvement populaire du Printemps arabe' }
        ]
    },
    {
        code: 'BD', name_fr: 'Bangladesh', name_en: 'Bangladesh', flag: '🇧🇩', capital: 'Dhaka', mainColor: '#006A4E', latitude: 23.6850, longitude: 90.3563,
        intro_fr: "Situé sur le delta du Gange, c'est l'un des pays les plus densément peuplés au monde, traversé par des centaines de cours d'eau. Il est connu pour sa végétation luxuriante, ses mangroves des Sundarbans et son industrie textile.",
        continentId: 'ASI',
        currency: 'Taka bangladais (BDT)', language: 'Bengali', population: 171186372,
        dates: [
            { year: 1947, event: 'Partition des Indes, création du Pakistan oriental' },
            { year: 1952, event: 'Mouvement pour la langue bengalie' },
            { year: 1971, event: 'Guerre de libération et indépendance du Bangladesh' },
            { year: 2013, event: 'Effondrement du Rana Plaza (réformes textiles)' }
        ]
    },
    {
        code: 'BB', name_fr: 'Barbade', name_en: 'Barbados', flag: '🇧🇧', capital: 'Bridgetown', mainColor: '#00267F', latitude: 13.1939, longitude: -59.5432,
        intro_fr: "Cette île des Caraïbes orientales est célèbre pour ses plages paradisiaques, son rhum historique et sa culture du cricket. Souvent appelée 'Little England', elle possède un charme colonial britannique mêlé à une ambiance tropicale détendue.",
        continentId: 'AME',
        currency: 'Dollar barbadien (BBD)', language: 'Anglais', population: 281635,
        dates: [
            { year: 1627, event: 'Première colonie anglaise établie' },
            { year: 1834, event: 'Abolition de l\'esclavage' },
            { year: 1966, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 2021, event: 'Transition en République, fin du statut de royaume du Commonwealth' }
        ]
    },
    {
        code: 'BE', name_fr: 'Belgique', name_en: 'Belgium', flag: '🇧🇪', capital: 'Brussels', mainColor: '#2D2926', latitude: 50.5039, longitude: 4.4699,
        intro_fr: "Siège de l'Union européenne et de l'OTAN, ce petit pays est célèbre pour ses villes médiévales, son chocolat et ses centaines de bières. Il se distingue par sa diversité culturelle entre la Flandre néerlandophone et la Wallonie francophone.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Néerlandais, Français, Allemand', population: 11697557,
        dates: [
            { year: 1830, event: 'Révolution belge et indépendance vis-à-vis des Pays-Bas' },
            { year: 1914, event: 'Invasion par l\'Allemagne (Première Guerre mondiale)' },
            { year: 1957, event: 'Membre fondateur de la CEE (Traité de Rome)' },
            { year: 1993, event: 'Transformation officielle en État fédéral' }
        ]
    },
    {
        code: 'BZ', name_fr: 'Belize', name_en: 'Belize', flag: '🇧🇿', capital: 'Belmopan', mainColor: '#171691', latitude: 17.1899, longitude: -88.4976,
        intro_fr: "Seul pays anglophone d'Amérique centrale, le Belize abrite une incroyable biodiversité et la deuxième plus grande barrière de corail au monde. C'est un mélange unique de cultures maya, créole et garifuna au cœur de la jungle tropicale.",
        continentId: 'AME',
        currency: 'Dollar bélizien (BZD)', language: 'Anglais', population: 405272,
        dates: [
            { year: 1862, event: 'Devient officiellement la colonie du Honduras britannique' },
            { year: 1964, event: 'Le Royaume-Uni accorde l\'autonomie interne' },
            { year: 1981, event: 'Indépendance sous le nom de Belize' }
        ]
    },
    {
        code: 'BJ', name_fr: 'Bénin', name_en: 'Benin', flag: '🇧🇯', capital: 'Porto-Novo', mainColor: '#008751', latitude: 9.3077, longitude: 2.3158,
        intro_fr: "Berceau de la culture vaudou et de l'ancien royaume de Dahomey, le Bénin possède une histoire riche et fascinante. Ses parcs nationaux au nord abritent une faune variée, tandis que le sud offre des plages sur le golfe de Guinée.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français', population: 13301694,
        dates: [
            { year: 1894, event: 'Le royaume du Dahomey devient une colonie française' },
            { year: 1960, event: 'Indépendance sous le nom de République du Dahomey' },
            { year: 1975, event: 'Le pays est renommé République populaire du Bénin' },
            { year: 1990, event: 'Conférence nationale et transition démocratique (pionnière en Afrique)' }
        ]
    },
    {
        code: 'BT', name_fr: 'Bhoutan', name_en: 'Bhutan', flag: '🇧🇹', capital: 'Thimphu', mainColor: '#FF5F00', latitude: 27.5142, longitude: 90.4336,
        intro_fr: "Perché dans l'Himalaya, ce royaume bouddhiste privilégie le Bonheur National Brut plutôt que la croissance économique. Isolé et mystérieux, il est célèbre pour ses monastères forteresses (dzongs) et ses paysages de montagnes intacts.",
        continentId: 'ASI',
        currency: 'Ngultrum (BTN)', language: 'Dzongkha', population: 782455,
        dates: [
            { year: 1907, event: 'Unification du pays et instauration de la monarchie des Wangchuck' },
            { year: 1972, event: 'Création du concept de Bonheur National Brut (BNB)' },
            { year: 2008, event: 'Transition vers une monarchie constitutionnelle et premières élections' }
        ]
    },
    {
        code: 'BY', name_fr: 'Biélorussie', name_en: 'Belarus', flag: '🇧🇾', capital: 'Minsk', mainColor: '#D22730', latitude: 53.7098, longitude: 27.9534,
        intro_fr: "Pays d'Europe de l'Est sans accès à la mer, la Biélorussie est connue pour ses vastes forêts primaires et ses lacs. Son architecture conserve de nombreuses traces de l'époque soviétique, notamment dans sa capitale, Minsk.",
        continentId: 'EUR',
        currency: 'Rouble biélorusse (BYN)', language: 'Biélorusse, Russe', population: 9228071,
        dates: [
            { year: 1922, event: 'Intégration à l\'URSS en tant que RSS de Biélorussie' },
            { year: 1986, event: 'Catastrophe de Tchernobyl (fortes retombées radioactives sur le pays)' },
            { year: 1991, event: 'Indépendance de la Biélorussie' },
            { year: 1994, event: 'Élection d\'Alexandre Loukachenko à la présidence' },
            { year: 2020, event: 'Manifestations massives anti-gouvernementales' }
        ]
    },
    {
        code: 'MM', name_fr: 'Birmanie (Myanmar)', name_en: 'Myanmar', flag: '🇲🇲', capital: 'Naypyidaw', mainColor: '#FECB00', latitude: 21.9162, longitude: 95.9560,
        intro_fr: "Pays d'Asie du Sud-Est aux milliers de temples dorés, dont le célèbre site de Bagan, il possède une culture bouddhiste profondément enracinée. Après des années d'isolement, il reste une terre de mystère avec une grande diversité ethnique.",
        continentId: 'ASI',
        currency: 'Kyat (MMK)', language: 'Birman', population: 54179306,
        dates: [
            { year: 1948, event: 'Indépendance de l\'Empire britannique' },
            { year: 1962, event: 'Coup d\'État de Ne Win et début d\'une longue junte militaire' },
            { year: 2015, event: 'Victoire de la LND d\'Aung San Suu Kyi aux élections libres' },
            { year: 2021, event: 'Coup d\'État militaire restaurant la dictature' }
        ]
    },
    {
        code: 'BO', name_fr: 'Bolivie', name_en: 'Bolivia', flag: '🇧🇴', capital: 'Sucre', mainColor: '#D52B1E', latitude: -16.2902, longitude: -63.5887,
        intro_fr: "Au cœur des Andes, la Bolivie est l'un des pays les plus élevés et les plus indigènes d'Amérique du Sud. Elle abrite le spectaculaire désert de sel d'Uyuni et le lac Titicaca, offrant des paysages à couper le souffle.",
        continentId: 'AME',
        currency: 'Boliviano (BOB)', language: 'Espagnol, Quechua, Aymara (et 34 autres)', population: 12224110,
        dates: [
            { year: 1825, event: 'Indépendance et création de la Bolivie (nommée d\'après Bolívar)' },
            { year: 1884, event: 'Perte de l\'accès à la mer lors de la guerre du Pacifique' },
            { year: 1952, event: 'Révolution nationale bolivienne (réformes agraires et droit de vote universel)' },
            { year: 2005, event: 'Élection d\'Evo Morales, premier président d\'origine indigène' }
        ]
    },
    {
        code: 'BA', name_fr: 'Bosnie-Herzégovine', name_en: 'Bosnia and Herzegovina', flag: '🇧🇦', capital: 'Sarajevo', mainColor: '#002395', latitude: 43.9159, longitude: 17.6791,
        intro_fr: "Au carrefour des cultures orientale et occidentale, ce pays des Balkans est marqué par ses montagnes, ses rivières émeraude et son histoire complexe. Sarajevo, sa capitale, est un symbole de résilience et de diversité religieuse.",
        continentId: 'EUR',
        currency: 'Mark convertible (BAM)', language: 'Bosniaque, Croate, Serbe', population: 3233526,
        dates: [
            { year: 1914, event: 'Assassinat de l\'archiduc François-Ferdinand à Sarajevo' },
            { year: 1992, event: 'Proclamation de l\'indépendance et début de la guerre de Bosnie' },
            { year: 1995, event: 'Massacre de Srebrenica' },
            { year: 1995, event: 'Accords de Dayton mettant fin à la guerre' }
        ]
    },
    {
        code: 'BW', name_fr: 'Botswana', name_en: 'Botswana', flag: '🇧🇼', capital: 'Gaborone', mainColor: '#75B2DD', latitude: -22.3285, longitude: 24.6849,
        intro_fr: "Réputé pour sa stabilité politique et sa gestion des diamants, le Botswana est une destination de safari de premier plan. Il abrite le delta de l'Okavango, une oasis unique au monde où la faune sauvage prospère.",
        continentId: 'AFR',
        currency: 'Pula (BWP)', language: 'Anglais, Tswana', population: 2630296,
        dates: [
            { year: 1885, event: 'Création du protectorat britannique du Bechuanaland' },
            { year: 1966, event: 'Indépendance pacifique sous le nom de Botswana' },
            { year: 1967, event: 'Découverte de la mine de diamants d\'Orapa (décollage économique)' }
        ]
    },
    {
        code: 'BR', name_fr: 'Brésil', name_en: 'Brazil', flag: '🇧🇷', capital: 'Brasília', mainColor: '#009C3B', latitude: -14.2350, longitude: -51.9253,
        intro_fr: "Géant de l'Amérique du Sud, le Brésil est célèbre pour la forêt amazonienne, ses plages mythiques comme Copacabana et la passion du football. Sa culture vibrante s'exprime à travers le carnaval, la samba et une grande diversité ethnique.",
        continentId: 'AME',
        currency: 'Réal brésilien (BRL)', language: 'Portugais', population: 215313498,
        dates: [
            { year: 1500, event: 'Arrivée de Pedro Álvares Cabral' },
            { year: 1822, event: 'Déclaration d\'indépendance et fondation de l\'Empire du Brésil' },
            { year: 1888, event: 'Abolition de l\'esclavage (Loi d\'or)' },
            { year: 1960, event: 'Inauguration de la nouvelle capitale, Brasília' },
            { year: 1985, event: 'Fin de la dictature militaire et retour à la démocratie' }
        ]
    },
    {
        code: 'BN', name_fr: 'Brunei', name_en: 'Brunei', flag: '🇧🇳', capital: 'Bandar Seri Begawan', mainColor: '#F7E017', latitude: 4.5353, longitude: 114.7277,
        intro_fr: "Petit sultanat riche en pétrole situé sur l'île de Bornéo, le Brunei est connu pour ses mosquées opulentes et sa forêt tropicale préservée. C'est une monarchie absolue où les traditions islamiques sont strictement respectées.",
        continentId: 'ASI',
        currency: 'Dollar de Brunei (BND)', language: 'Malais', population: 449002,
        dates: [
            { year: 1929, event: 'Découverte du pétrole (début de la richesse du sultanat)' },
            { year: 1984, event: 'Indépendance totale vis-à-vis du protectorat britannique' },
            { year: 2014, event: 'Mise en place progressive de la Charia (loi islamique)' }
        ]
    },
    {
        code: 'BG', name_fr: 'Bulgarie', name_en: 'Bulgaria', flag: '🇧🇬', capital: 'Sofia', mainColor: '#00966E', latitude: 42.7339, longitude: 25.4858,
        intro_fr: "Pays des Balkans bordé par la mer Noire, la Bulgarie possède un riche héritage thrace, romain et ottoman. Elle est célèbre pour sa production d'huile de rose, ses monastères orthodoxes et ses stations de ski bon marché.",
        continentId: 'EUR',
        currency: 'Lev bulgare (BGN)', language: 'Bulgare', population: 6465096,
        dates: [
            { year: 681, event: 'Fondation du Premier Empire bulgare' },
            { year: 1878, event: 'Libération de l\'Empire ottoman et restauration de l\'État bulgare' },
            { year: 1946, event: 'Abolition de la monarchie et instauration du communisme' },
            { year: 1989, event: 'Chute du régime communiste' },
            { year: 2007, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'BF', name_fr: 'Burkina Faso', name_en: 'Burkina Faso', flag: '🇧🇫', capital: 'Ouagadougou', mainColor: '#EF2B2D', latitude: 12.2383, longitude: -1.5616,
        intro_fr: "Signifiant 'Pays des hommes intègres', cette nation sahélienne est réputée pour sa culture artistique, notamment le cinéma et l'artisanat. Malgré des défis sécuritaires, ses habitants sont connus pour leur hospitalité chaleureuse.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français, Mooré, Dioula', population: 22673762,
        dates: [
            { year: 1960, event: 'Indépendance de la Haute-Volta' },
            { year: 1984, event: 'Le pays est renommé Burkina Faso par Thomas Sankara' },
            { year: 1987, event: 'Assassinat de Thomas Sankara, prise de pouvoir de Blaise Compaoré' },
            { year: 2014, event: 'Insurrection populaire et chute de Blaise Compaoré' },
            { year: 2022, event: 'Série de coups d\'État militaires sur fond de crise sécuritaire' }
        ]
    },
    {
        code: 'BI', name_fr: 'Burundi', name_en: 'Burundi', flag: '🇧🇮', capital: 'Gitega', mainColor: '#18B637', latitude: -3.3731, longitude: 29.9189,
        intro_fr: "Petit pays montagneux au cœur de la région des Grands Lacs, il est bordé par le lac Tanganyika. Essentiellement agricole, il est connu pour ses plantations de thé et de café ainsi que pour ses traditions de tambours sacrés.",
        continentId: 'AFR',
        currency: 'Franc burundais (BIF)', language: 'Kirundi, Français', population: 12889576,
        dates: [
            { year: 1962, event: 'Indépendance vis-à-vis de la tutelle belge' },
            { year: 1993, event: 'Assassinat du président Melchior Ndadaye, début de la guerre civile' },
            { year: 2005, event: 'Fin officielle de la guerre civile avec les accords d\'Arusha' },
            { year: 2015, event: 'Crise politique suite au 3e mandat controversé de Pierre Nkurunziza' }
        ]
    },
    {
        code: 'KH', name_fr: 'Cambodge', name_en: 'Cambodia', flag: '🇰🇭', capital: 'Phnom Penh', mainColor: '#032EA1', latitude: 12.5657, longitude: 104.9910,
        intro_fr: "Héritier de l'empire Khmer, ce pays est mondialement connu pour les temples majestueux d'Angkor Wat. Traversé par le Mékong, il possède une culture résiliente qui renaît après une histoire tragique au 20ème siècle.",
        continentId: 'ASI',
        currency: 'Riel (KHR)', language: 'Khmer', population: 16767842,
        dates: [
            { year: 802, event: 'Fondation de l\'Empire Khmer' },
            { year: 1953, event: 'Indépendance vis-à-vis de la France' },
            { year: 1975, event: 'Prise de Phnom Penh par les Khmers rouges, début du génocide' },
            { year: 1979, event: 'Invasion vietnamienne et chute des Khmers rouges' },
            { year: 1993, event: 'Restauration de la monarchie et élections sous l\'égide de l\'ONU' }
        ]
    },
    {
        code: 'CM', name_fr: 'Cameroun', name_en: 'Cameroon', flag: '🇨🇲', capital: 'Yaoundé', mainColor: '#007A5E', latitude: 7.3697, longitude: 12.3547,
        intro_fr: "Surnommé l'Afrique en miniature, le Cameroun offre une diversité géologique et culturelle incroyable, des plages du sud aux montagnes du nord. C'est un pays bilingue (français et anglais) connu pour sa musique et son équipe de football.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Français, Anglais', population: 27914536,
        dates: [
            { year: 1960, event: 'Indépendance du Cameroun français' },
            { year: 1961, event: 'Réunification avec la partie sud du Cameroun britannique' },
            { year: 1982, event: 'Démission d\'Ahidjo et arrivée au pouvoir de Paul Biya' },
            { year: 2016, event: 'Début de la crise anglophone dans les régions du Nord-Ouest et du Sud-Ouest' }
        ]
    },
    {
        code: 'CA', name_fr: 'Canada', name_en: 'Canada', flag: '🇨🇦', capital: 'Ottawa', mainColor: '#FF0000', latitude: 56.1304, longitude: -106.3468,
        intro_fr: "Deuxième plus grand pays du monde, le Canada est réputé pour ses paysages sauvages, ses hivers rigoureux et sa société multiculturelle accueillante. De Vancouver à Québec, il mélange grands espaces naturels et villes modernes dynamiques.",
        continentId: 'AME',
        currency: 'Dollar canadien (CAD)', language: 'Anglais, Français', population: 38929902,
        dates: [
            { year: 1867, event: 'Création de la Confédération canadienne' },
            { year: 1931, event: 'Statut de Westminster (indépendance législative quasi totale)' },
            { year: 1982, event: 'Rapatriement de la Constitution et adoption de la Charte des droits' },
            { year: 1995, event: 'Le non l\'emporte de justesse au référendum sur l\'indépendance du Québec' }
        ]
    },
    {
        code: 'CV', name_fr: 'Cap-Vert', name_en: 'Cape Verde', flag: '🇨🇻', capital: 'Praia', mainColor: '#003893', latitude: 16.0021, longitude: -24.0131,
        intro_fr: "Archipel volcanique au large du Sénégal, le Cap-Vert est célèbre pour sa culture métissée afro-portugaise et sa musique morna. Ses îles offrent des paysages variés, allant de plages de sable fin à des volcans actifs.",
        continentId: 'AFR',
        currency: 'Escudo capverdien (CVE)', language: 'Portugais, Créole capverdien', population: 593146,
        dates: [
            { year: 1460, event: 'Découverte des îles (inhabitées) par les Portugais' },
            { year: 1975, event: 'Indépendance vis-à-vis du Portugal' },
            { year: 1991, event: 'Premières élections multipartites et transition démocratique exemplaire' }
        ]
    },
    {
        code: 'CF', name_fr: 'République centrafricaine', name_en: 'Central African Republic', flag: '🇨🇫', capital: 'Bangui', mainColor: '#003082', latitude: 6.6111, longitude: 20.9394,
        intro_fr: "Situé au cœur exact du continent, ce pays dispose de vastes ressources naturelles comme le bois, l'or et les diamants. Il abrite une biodiversité exceptionnelle dans ses forêts tropicales, bien que son développement soit freiné par l'instabilité.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Français, Sango', population: 5552228,
        dates: [
            { year: 1960, event: 'Indépendance vis-à-vis de la France' },
            { year: 1976, event: 'Jean-Bedel Bokassa se fait couronner empereur' },
            { year: 2013, event: 'Coup d\'État de la coalition Séléka et début d\'une crise sécuritaire majeure' }
        ]
    },
    {
        code: 'CL', name_fr: 'Chili', name_en: 'Chile', flag: '🇨🇱', capital: 'Santiago', mainColor: '#DA291C', latitude: -35.6751, longitude: -71.5430,
        intro_fr: "Mince bande de terre coincée entre les Andes et le Pacifique, le Chili possède une géographie extrême, du désert aride d'Atacama aux glaciers du sud. C'est l'un des pays les plus stables et prospères d'Amérique du Sud.",
        continentId: 'AME',
        currency: 'Peso chilien (CLP)', language: 'Espagnol', population: 19603733,
        dates: [
            { year: 1818, event: 'Proclamation de l\'indépendance' },
            { year: 1970, event: 'Élection de Salvador Allende (socialiste)' },
            { year: 1973, event: 'Coup d\'État d\'Augusto Pinochet' },
            { year: 1990, event: 'Fin de la dictature et transition démocratique' },
            { year: 2019, event: 'Mouvement social massif (Estallido social)' }
        ]
    },
    {
        code: 'CN', name_fr: 'Chine', name_en: 'China', flag: '🇨🇳', capital: 'Beijing', mainColor: '#DE2910', latitude: 35.8617, longitude: 104.1954,
        intro_fr: "Civilisation millénaire et puissance mondiale, la Chine fascine par sa Grande Muraille, sa cuisine variée et son développement fulgurant. Elle mélange gratte-ciels futuristes et temples anciens sur un territoire immense.",
        continentId: 'ASI',
        currency: 'Yuan (CNY)', language: 'Mandarin', population: 1412000000,
        dates: [
            { year: -221, event: 'Unification de la Chine par Qin Shi Huang' },
            { year: 1912, event: 'Fin de l\'empire et proclamation de la République' },
            { year: 1949, event: 'Proclamation de la République populaire de Chine par Mao Zedong' },
            { year: 1978, event: 'Lancement des réformes économiques par Deng Xiaoping' }
        ]
    },
    {
        code: 'CY', name_fr: 'Chypre', name_en: 'Cyprus', flag: '🇨🇾', capital: 'Nicosia', mainColor: '#D57800', latitude: 35.1264, longitude: 33.4299,
        intro_fr: "Île ensoleillée de la Méditerranée orientale, Chypre est, selon la légende, le lieu de naissance d'Aphrodite. Elle est marquée par une histoire divisée entre cultures grecque et turque, offrant plages superbes et sites antiques.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Grec, Turc', population: 1251488,
        dates: [
            { year: 1960, event: 'Indépendance du Royaume-Uni' },
            { year: 1974, event: 'Intervention militaire turque et division de l\'île' },
            { year: 2004, event: 'Adhésion à l\'Union européenne (partie sud de facto)' }
        ]
    },
    {
        code: 'CO', name_fr: 'Colombie', name_en: 'Colombia', flag: '🇨🇴', capital: 'Bogotá', mainColor: '#FCD116', latitude: 4.5709, longitude: -74.2973,
        intro_fr: "Seul pays d'Amérique du Sud bordé par deux océans, la Colombie est célèbre pour son café, ses émeraudes et sa biodiversité exceptionnelle. Elle a su transformer son image pour devenir une destination touristique dynamique et colorée.",
        continentId: 'AME',
        currency: 'Peso colombien (COP)', language: 'Espagnol', population: 51874024,
        dates: [
            { year: 1810, event: 'Déclaration d\'indépendance (bataille de Boyacá en 1819)' },
            { year: 1948, event: 'Assassinat de Gaitán (El Bogotazo), début de \"La Violencia\"' },
            { year: 2016, event: 'Signature de l\'accord de paix avec la guérilla des FARC' }
        ]
    },
    {
        code: 'KM', name_fr: 'Comores', name_en: 'Comoros', flag: '🇰🇲', capital: 'Moroni', mainColor: '#3D8E33', latitude: -11.8750, longitude: 43.8722,
        intro_fr: "Archipel volcanique de l'océan Indien, les Comores sont surnommées les 'îles aux parfums' pour leurs cultures d'ylang-ylang et de vanille. Elles offrent un cadre naturel préservé et une culture influencée par l'Afrique et le monde arabe.",
        continentId: 'AFR',
        currency: 'Franc comorien (KMF)', language: 'Comorien, Français, Arabe', population: 836774,
        dates: [
            { year: 1975, event: 'Déclaration unilatérale d\'indépendance (Mayotte choisit de rester française)' },
            { year: 1997, event: 'Crise sécessionniste des îles d\'Anjouan et Mohéli' },
            { year: 2001, event: 'Nouvelle constitution instituant l\'Union des Comores et une présidence tournante' }
        ]
    },
    {
        code: 'CG', name_fr: 'Congo-Brazzaville', name_en: 'Republic of the Congo', flag: '🇨🇬', capital: 'Brazzaville', mainColor: '#009543', latitude: -0.2280, longitude: 15.8277,
        intro_fr: "Souvent appelé Congo-Brazzaville, ce pays d'Afrique centrale est couvert de forêts tropicales denses abritant des gorilles. Riche en pétrole, il est séparé de son grand voisin par le puissant fleuve Congo.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Français, Lingala, Kituba', population: 5970424,
        dates: [
            { year: 1880, event: 'Pierre Savorgnan de Brazza signe un traité avec le roi Makoko' },
            { year: 1960, event: 'Indépendance de la France' },
            { year: 1997, event: 'Éclatement d\'une violente guerre civile et retour de Sassou Nguesso' }
        ]
    },
    {
        code: 'CD', name_fr: 'Congo-Kinshasa', name_en: 'DR Congo', flag: '🇨🇩', capital: 'Kinshasa', mainColor: '#007FFF', latitude: -4.0383, longitude: 21.7587,
        intro_fr: "Deuxième plus grand pays d'Afrique, la RDC possède d'immenses richesses minérales et la deuxième plus grande forêt tropicale du monde. Sa capitale, Kinshasa, est l'une des plus grandes villes francophones et le berceau de la rumba congolaise.",
        continentId: 'AFR',
        currency: 'Franc congolais (CDF)', language: 'Français, Lingala, Swahili, Tshiluba, Kikongo', population: 99010000,
        dates: [
            { year: 1908, event: 'L\'État indépendant du Congo devient une colonie belge' },
            { year: 1960, event: 'Indépendance de la RDC' },
            { year: 1965, event: 'Coup d\'État de Mobutu (le pays devient le Zaïre en 1971)' },
            { year: 1997, event: 'Chute de Mobutu, le pays redevient la RDC' },
            { year: 1998, event: 'Début de la Deuxième guerre du Congo' }
        ]
    },
    {
        code: 'KP', name_fr: 'Corée du Nord', name_en: 'North Korea', flag: '🇰🇵', capital: 'Pyongyang', mainColor: '#ED1C27', latitude: 40.3399, longitude: 127.5101,
        intro_fr: "Pays le plus fermé au monde, la Corée du Nord est un État totalitaire marqué par le culte de la personnalité de ses dirigeants. Malgré son isolement politique, elle possède une culture traditionnelle coréenne et des paysages montagneux.",
        continentId: 'ASI',
        currency: 'Won nord-coréen (KPW)', language: 'Coréen', population: 26069416,
        dates: [
            { year: 1948, event: 'Création de la République Populaire Démocratique de Corée' },
            { year: 1950, event: 'Début de la Guerre de Corée' },
            { year: 1953, event: 'Armistice de Panmunjeom et division de la péninsule' },
            { year: 2006, event: 'Premier essai nucléaire nord-coréen' }
        ]
    },
    {
        code: 'KR', name_fr: 'Corée du Sud', name_en: 'South Korea', flag: '🇰🇷', capital: 'Seoul', mainColor: '#0047A0', latitude: 35.9078, longitude: 127.7669,
        intro_fr: "Mélange fascinant de traditions anciennes et de technologie de pointe, la Corée du Sud est une puissance culturelle mondiale grâce à la K-pop. Séoul, sa capitale, est une mégalopole vibrante qui ne dort jamais.",
        continentId: 'ASI',
        currency: 'Won sud-coréen (KRW)', language: 'Coréen', population: 51628117,
        dates: [
            { year: 1948, event: 'Proclamation de la République de Corée (au Sud)' },
            { year: 1950, event: 'Guerre de Corée' },
            { year: 1987, event: 'Manifestations massives conduisant à la démocratisation du pays' },
            { year: 1988, event: 'Jeux Olympiques de Séoul (symbole du miracle économique de la rivière Han)' }
        ]
    },
    {
        code: 'CR', name_fr: 'Costa Rica', name_en: 'Costa Rica', flag: '🇨🇷', capital: 'San José', mainColor: '#CE1126', latitude: 9.7489, longitude: -83.7534,
        intro_fr: "Pionnier de l'écotourisme, ce pays d'Amérique centrale abrite 5% de la biodiversité mondiale sur un petit territoire. Célèbre pour sa devise 'Pura Vida', il a aboli son armée en 1948 pour investir dans l'éducation et la santé.",
        continentId: 'AME',
        currency: 'Colón costaricien (CRC)', language: 'Espagnol', population: 5180829,
        dates: [
            { year: 1821, event: 'Indépendance de l\'Empire espagnol' },
            { year: 1948, event: 'Guerre civile et abolition de l\'armée' },
            { year: 1987, event: 'Prix Nobel de la paix décerné au président Óscar Arias' }
        ]
    },
    {
        code: 'CI', name_fr: 'Côte d\'Ivoire', name_en: 'Ivory Coast', flag: '🇨🇮', capital: 'Yamoussoukro', mainColor: '#F77F00', latitude: 7.5400, longitude: -5.5471,
        intro_fr: "Leader économique de l'Afrique de l'Ouest francophone, la Côte d'Ivoire est le premier producteur mondial de cacao. Le pays offre un mélange de gratte-ciels modernes à Abidjan et de traditions culturelles riches dans l'intérieur des terres.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français', population: 28160542,
        dates: [
            { year: 1960, event: 'Indépendance de la France sous Houphouët-Boigny' },
            { year: 1993, event: 'Décès de Félix Houphouët-Boigny (fin du miracle ivoirien)' },
            { year: 2002, event: 'Rébellion et début de la crise politico-militaire' },
            { year: 2011, event: 'Fin de la crise post-électorale' }
        ]
    },
    {
        code: 'HR', name_fr: 'Croatie', name_en: 'Croatia', flag: '🇭🇷', capital: 'Zagreb', mainColor: '#FF0000', latitude: 45.1000, longitude: 15.2000,
        intro_fr: "Avec sa côte spectaculaire sur l'Adriatique parsemée de plus de mille îles, la Croatie est une destination touristique majeure. Ses villes historiques comme Dubrovnik et Split sont célèbres pour leurs remparts et leur architecture préservée.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Croate', population: 3850894,
        dates: [
            { year: 1991, event: 'Déclaration d\'indépendance de la Yougoslavie' },
            { year: 1995, event: 'Fin de la guerre d\'indépendance croate' },
            { year: 2013, event: 'Adhésion à l\'Union européenne' },
            { year: 2023, event: 'Adoption de l\'Euro et intégration à l\'espace Schengen' }
        ]
    },
    {
        code: 'CU', name_fr: 'Cuba', name_en: 'Cuba', flag: '🇨🇺', capital: 'Havana', mainColor: '#002A8F', latitude: 21.5218, longitude: -77.7812,
        intro_fr: "La plus grande île des Caraïbes est figée dans le temps avec ses voitures américaines des années 50 et son architecture coloniale colorée. Célèbre pour sa musique, ses cigares et son histoire révolutionnaire, elle possède une âme unique.",
        continentId: 'AME',
        currency: 'Peso cubain (CUP)', language: 'Espagnol', population: 11212191,
        dates: [
            { year: 1898, event: 'Guerre hispano-américaine (fin de la domination espagnole)' },
            { year: 1959, event: 'Triomphe de la Révolution cubaine menée par Fidel Castro' },
            { year: 1962, event: 'Crise des missiles de Cuba' },
            { year: 2014, event: 'Annonce historique du dégel des relations avec les États-Unis' }
        ]
    },
    {
        code: 'DK', name_fr: 'Danemark', name_en: 'Denmark', flag: '🇩🇰', capital: 'Copenhagen', mainColor: '#C60C30', latitude: 56.2639, longitude: 9.5018,
        intro_fr: "Pays scandinave réputé pour son design, sa qualité de vie et sa culture du vélo, le Danemark est une nation maritime et plate. Copenhague, sa capitale, est un modèle de ville verte et abrite la célèbre statue de la Petite Sirène.",
        continentId: 'EUR',
        currency: 'Couronne danoise (DKK)', language: 'Danois', population: 5882261,
        dates: [
            { year: 965, event: 'Harald à la Dent bleue unifie le pays et introduit le christianisme' },
            { year: 1849, event: 'Adoption de la Constitution démocratique (fin de la monarchie absolue)' },
            { year: 1945, event: 'Libération de l\'occupation allemande' },
            { year: 1973, event: 'Entrée dans la Communauté économique européenne' }
        ]
    },
    {
        code: 'DJ', name_fr: 'Djibouti', name_en: 'Djibouti', flag: '🇩🇯', capital: 'Djibouti', mainColor: '#6AB2E7', latitude: 11.8251, longitude: 42.5903,
        intro_fr: "Situé stratégiquement sur la Corne de l'Afrique, Djibouti est une terre de paysages lunaires, de lacs salés et de volcans. C'est un carrefour commercial important et un lieu prisé pour la plongée avec les requins-baleines.",
        continentId: 'AFR',
        currency: 'Franc djiboutien (DJF)', language: 'Français, Arabe, Somali, Afar', population: 1120849,
        dates: [
            { year: 1977, event: 'Indépendance vis-à-vis de la France' },
            { year: 1991, event: 'Début de la guerre civile djiboutienne' },
            { year: 2001, event: 'Accord de paix final mettant fin à la guerre civile' }
        ]
    },
    {
        code: 'DM', name_fr: 'Dominique', name_en: 'Dominica', flag: '🇩🇲', capital: 'Roseau', mainColor: '#006B3F', latitude: 15.4150, longitude: -61.3710,
        intro_fr: "Surnommée l'île nature des Caraïbes, la Dominique est célèbre pour ses forêts tropicales, ses sources chaudes et ses sites de plongée. Contrairement à ses voisines, elle mise sur l'écotourisme plutôt que sur les plages de sable blanc.",
        continentId: 'AME',
        currency: 'Dollar des Caraïbes orientales (XCD)', language: 'Anglais', population: 72737,
        dates: [
            { year: 1493, event: 'Découverte de l\'île par Christophe Colomb' },
            { year: 1978, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 2017, event: 'Dévastation majeure causée par l\'ouragan Maria' }
        ]
    },
    {
        code: 'EG', name_fr: 'Égypte', name_en: 'Egypt', flag: '🇪🇬', capital: 'Cairo', mainColor: '#CE1126', latitude: 26.8206, longitude: 30.8025,
        intro_fr: "Berceau de l'une des plus anciennes civilisations, l'Égypte fascine par ses pyramides, ses temples et la vallée du Nil. C'est un pays pivot entre l'Afrique et le Moyen-Orient, doté d'une histoire culturelle immense.",
        continentId: 'AFR',
        currency: 'Livre égyptienne (EGP)', language: 'Arabe', population: 110990103,
        dates: [
            { year: 1922, event: 'Indépendance reconnue par le Royaume-Uni' },
            { year: 1952, event: 'Révolution des Officiers libres et fin de la monarchie' },
            { year: 1956, event: 'Nationalisation du canal de Suez' },
            { year: 2011, event: 'Révolution du Printemps arabe et chute de Moubarak' }
        ]
    },
    {
        code: 'AE', name_fr: 'Émirats arabes unis', name_en: 'United Arab Emirates', flag: '🇦🇪', capital: 'Abu Dhabi', mainColor: '#00732F', latitude: 23.4241, longitude: 53.8478,
        intro_fr: "Fédération de sept émirats, ce pays a transformé ses déserts en métropoles futuristes comme Dubaï et Abu Dhabi grâce au pétrole. C'est une plaque tournante mondiale pour le tourisme de luxe, le commerce et l'aviation.",
        continentId: 'ASI',
        currency: 'Dirham des Émirats arabes unis (AED)', language: 'Arabe', population: 9441129,
        dates: [
            { year: 1971, event: 'Création de la fédération des Émirats arabes unis' },
            { year: 2010, event: 'Inauguration du Burj Khalifa, plus haute tour du monde' },
            { year: 2020, event: 'Normalisation des relations avec Israël (Accords d\'Abraham)' }
        ]
    },
    {
        code: 'EC', name_fr: 'Équateur', name_en: 'Ecuador', flag: '🇪🇨', capital: 'Quito', mainColor: '#FFCD00', latitude: -1.8312, longitude: -78.1834,
        intro_fr: "Traversé par l'équateur, ce pays andin offre une biodiversité incroyable, de la forêt amazonienne aux célèbres îles Galápagos. Quito, sa capitale perchée en altitude, possède l'un des centres coloniaux les mieux préservés.",
        continentId: 'AME',
        currency: 'Dollar américain (USD)', language: 'Espagnol, Kichwa, Shuar', population: 18001000,
        dates: [
            { year: 1822, event: 'Indépendance de l\'Espagne à la bataille de Pichincha' },
            { year: 1830, event: 'Séparation de la Grande Colombie et création de l\'Équateur' },
            { year: 2000, event: 'Adoption du dollar américain comme monnaie officielle' }
        ]
    },
    {
        code: 'ER', name_fr: 'Érythrée', name_en: 'Eritrea', flag: '🇪🇷', capital: 'Asmara', mainColor: '#EA0437', latitude: 15.1794, longitude: 39.7823,
        intro_fr: "Situé sur la mer Rouge, ce pays de la Corne de l'Afrique possède une capitale, Asmara, réputée pour son architecture moderniste italienne. Longtemps isolé politiquement, il offre des paysages côtiers et montagneux spectaculaires.",
        continentId: 'AFR',
        currency: 'Nakfa (ERN)', language: 'Tigrigna, Arabe, Anglais', population: 3684032,
        dates: [
            { year: 1890, event: 'Création de la colonie italienne d\'Érythrée' },
            { year: 1993, event: 'Indépendance officielle vis-à-vis de l\'Éthiopie après un long conflit' },
            { year: 1998, event: 'Début de la guerre frontalière meurtrière avec l\'Éthiopie' },
            { year: 2018, event: 'Accord de paix historique avec l\'Éthiopie' }
        ]
    },
    {
        code: 'ES', name_fr: 'Espagne', name_en: 'Spain', flag: '🇪🇸', capital: 'Madrid', mainColor: '#AA151B', latitude: 40.4637, longitude: -3.7492,
        intro_fr: "Destination touristique majeure, l'Espagne séduit par son mode de vie festif, sa gastronomie et sa diversité régionale. De l'Alhambra de Grenade à la Sagrada Família de Barcelone, son patrimoine architectural est exceptionnel.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Espagnol (Castillan), Catalan, Galicien, Basque', population: 47778340,
        dates: [
            { year: 1492, event: 'Fin de la Reconquista et découverte de l\'Amérique par Colomb' },
            { year: 1936, event: 'Début de la guerre civile espagnole' },
            { year: 1975, event: 'Mort de Franco et début de la transition démocratique' },
            { year: 1986, event: 'Entrée dans la Communauté économique européenne' }
        ]
    },
    {
        code: 'EE', name_fr: 'Estonie', name_en: 'Estonia', flag: '🇪🇪', capital: 'Tallinn', mainColor: '#4891D9', latitude: 58.5953, longitude: 25.0136,
        intro_fr: "La plus nordique des nations baltes est un leader mondial du numérique et de la gouvernance électronique. Tallinn, sa capitale, charme par sa vieille ville médiévale fortifiée classée à l'UNESCO.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Estonien', population: 1331796,
        dates: [
            { year: 1918, event: 'Déclaration d\'indépendance' },
            { year: 1940, event: 'Annexion par l\'Union soviétique' },
            { year: 1991, event: 'Restauration de l\'indépendance (Révolution chantante)' },
            { year: 2004, event: 'Adhésion à l\'Union européenne et à l\'OTAN' }
        ]
    },
    {
        code: 'US', name_fr: 'États-Unis', name_en: 'United States', flag: '🇺🇸', capital: 'Washington, D.C.', mainColor: '#001365', latitude: 37.0902, longitude: -95.7129,
        intro_fr: "Première puissance économique et culturelle mondiale, les États-Unis offrent une diversité de paysages immense, des parcs nationaux aux mégalopoles. C'est une nation de l'immigration, influente dans les domaines de la technologie et du divertissement.",
        continentId: 'AME',
        currency: 'Dollar américain (USD)', language: 'Anglais (de facto)', population: 333287557,
        dates: [
            { year: 1776, event: 'Déclaration d\'indépendance' },
            { year: 1861, event: 'Début de la guerre de Sécession' },
            { year: 1969, event: 'Mission Apollo 11 : premiers pas sur la Lune' },
            { year: 2001, event: 'Attentats terroristes du 11 septembre' }
        ]
    },
    {
        code: 'ET', name_fr: 'Éthiopie', name_en: 'Ethiopia', flag: '🇪🇹', capital: 'Addis Ababa', mainColor: '#009A44', latitude: 9.1450, longitude: 40.4897,
        intro_fr: "Seul pays d'Afrique à n'avoir jamais été colonisé, l'Éthiopie est le berceau de l'humanité et du café. Elle possède une culture chrétienne orthodoxe ancienne et des sites uniques comme les églises creusées dans le roc de Lalibela.",
        continentId: 'AFR',
        currency: 'Birr éthiopien (ETB)', language: 'Amharique, Oromo, Tigrigna', population: 123379924,
        dates: [
            { year: 1896, event: 'Victoire d\'Adoua contre les Italiens (préservation de l\'indépendance)' },
            { year: 1974, event: 'Renversement de l\'empereur Haïlé Sélassié par le Derg' },
            { year: 1991, event: 'Chute de la dictature militaire et transition politique' },
            { year: 2020, event: 'Début de la guerre civile dans la région du Tigré' }
        ]
    },
    {
        code: 'FJ', name_fr: 'Fidji', name_en: 'Fiji', flag: '🇫🇯', capital: 'Suva', mainColor: '#68BFE5', latitude: -17.7134, longitude: 178.0650,
        intro_fr: "Archipel de plus de 300 îles dans le Pacifique Sud, les Fidji sont célèbres pour leurs plages de rêve, leurs récifs coralliens et la gentillesse de leurs habitants. C'est une destination phare pour le tourisme tropical et le rugby.",
        continentId: 'OCE',
        currency: 'Dollar de Fidji (FJD)', language: 'Anglais, Fidjien, Hindi des Fidji', population: 929766,
        dates: [
            { year: 1874, event: 'Les Fidji deviennent une colonie britannique' },
            { year: 1970, event: 'Indépendance des Fidji' },
            { year: 2006, event: 'Coup d\'État militaire mené par Frank Bainimarama' },
            { year: 2014, event: 'Retour à la démocratie avec des élections libres' }
        ]
    },
    {
        code: 'FI', name_fr: 'Finlande', name_en: 'Finland', flag: '🇫🇮', capital: 'Helsinki', mainColor: '#003580', latitude: 61.9241, longitude: 25.7482,
        intro_fr: "Pays des mille lacs et du soleil de minuit, la Finlande est réputée pour son système éducatif, son design et ses saunas. En hiver, la Laponie finlandaise offre le spectacle magique des aurores boréales.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Finnois, Suédois', population: 5540720,
        dates: [
            { year: 1917, event: 'Déclaration d\'indépendance vis-à-vis de la Russie' },
            { year: 1939, event: 'Guerre d\'Hiver contre l\'Union soviétique' },
            { year: 1995, event: 'Adhésion à l\'Union européenne' },
            { year: 2023, event: 'Adhésion officielle à l\'OTAN' }
        ]
    },
    {
        code: 'FR', name_fr: 'France', name_en: 'France', flag: '🇫🇷', capital: 'Paris', mainColor: '#0055A4', latitude: 46.2276, longitude: 2.2137,
        intro_fr: "Première destination touristique mondiale, la France est célèbre pour sa gastronomie, sa mode, son art et son histoire.\n\nDe Paris à la Côte d'Azur, en passant par les Alpes, elle offre une variété exceptionnelle de paysages.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Français', population: 67935660,
        dates: [
            { year: 1789, event: 'Révolution française et prise de la Bastille' },
            { year: 1944, event: 'Libération de Paris lors de la Seconde Guerre mondiale' },
            { year: 1958, event: 'Fondation de la Cinquième République par Charles de Gaulle' },
            { year: 1998, event: 'Première victoire en Coupe du Monde de football' }
        ]
    },
    {
        code: 'GA', name_fr: 'Gabon', name_en: 'Gabon', flag: '🇬🇦', capital: 'Libreville', mainColor: '#009E60', latitude: -0.8037, longitude: 11.6094,
        intro_fr: "Recouvert en grande partie par une forêt tropicale dense, le Gabon est un sanctuaire pour la biodiversité et une destination d'écotourisme naissante. C'est un pays prospère grâce à ses ressources pétrolières et minières.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Français', population: 2388992,
        dates: [
            { year: 1960, event: 'Indépendance de la France' },
            { year: 1967, event: 'Arrivée au pouvoir d\'Omar Bongo (qui gouvernera 41 ans)' },
            { year: 2023, event: 'Coup d\'État militaire renversant Ali Bongo' }
        ]
    },
    {
        code: 'GM', name_fr: 'Gambie', name_en: 'Gambia', flag: '🇬🇲', capital: 'Banjul', mainColor: '#CE1126', latitude: 13.4432, longitude: -15.3101,
        intro_fr: "Plus petit pays d'Afrique continentale, la Gambie s'étend le long du fleuve du même nom. Surnommée la 'Côte souriante de l'Afrique', elle est prisée pour ses plages, sa faune aviaire et son hospitalité.",
        continentId: 'AFR',
        currency: 'Dalasi (GMD)', language: 'Anglais', population: 2705992,
        dates: [
            { year: 1965, event: 'Indépendance du Royaume-Uni' },
            { year: 1994, event: 'Coup d\'État portant Yahya Jammeh au pouvoir' },
            { year: 2017, event: 'Intervention de la CEDEAO et exil de Jammeh après sa défaite électorale' }
        ]
    },
    {
        code: 'GE', name_fr: 'Géorgie', name_en: 'Georgia', flag: '🇬🇪', capital: 'Tbilisi', mainColor: '#FF0000', latitude: 42.3154, longitude: 43.3569,
        intro_fr: "Au carrefour de l'Europe et de l'Asie, la Géorgie est le berceau du vin avec une tradition viticole vieille de 8000 ans. Ses paysages de montagnes du Caucase et ses églises anciennes en font une destination de plus en plus populaire.",
        continentId: 'ASI',
        currency: 'Lari (GEL)', language: 'Géorgien', population: 3712502,
        dates: [
            { year: 1991, event: 'Indépendance lors de la chute de l\'URSS' },
            { year: 2003, event: 'Révolution des Roses (réformes pro-occidentales)' },
            { year: 2008, event: 'Guerre éclair avec la Russie (perte de contrôle sur l\'Abkhazie et l\'Ossétie du Sud)' }
        ]
    },
    {
        code: 'GH', name_fr: 'Ghana', name_en: 'Ghana', flag: '🇬🇭', capital: 'Accra', mainColor: '#CE1126', latitude: 7.9465, longitude: -1.0232,
        intro_fr: "Anciennement appelé Gold Coast, le Ghana est une démocratie stable d'Afrique de l'Ouest riche en histoire. Connu pour ses forts coloniaux, sa production de cacao et ses tissus kente colorés, c'est un centre culturel dynamique.",
        continentId: 'AFR',
        currency: 'Cedi ghanéen (GHS)', language: 'Anglais', population: 33475870,
        dates: [
            { year: 1957, event: 'Premier pays d\'Afrique subsaharienne à obtenir son indépendance' },
            { year: 1966, event: 'Coup d\'État renversant Kwame Nkrumah' },
            { year: 1992, event: 'Adoption d\'une nouvelle constitution et transition démocratique réussie' }
        ]
    },
    {
        code: 'GR', name_fr: 'Grèce', name_en: 'Greece', flag: '🇬🇷', capital: 'Athens', mainColor: '#0D5EAF', latitude: 39.0742, longitude: 21.8243,
        intro_fr: "Berceau de la civilisation occidentale et de la démocratie, la Grèce offre des sites archéologiques inestimables comme l'Acropole. Ses milliers d'îles aux maisons blanches et à la mer turquoise en font un paradis estival.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Grec', population: 10427790,
        dates: [
            { year: 1821, event: 'Début de la guerre d\'indépendance grecque contre l\'Empire ottoman' },
            { year: 1974, event: 'Chute de la dictature des colonels et retour de la démocratie' },
            { year: 1981, event: 'Adhésion à la Communauté économique européenne' },
            { year: 2010, event: 'Début de la sévère crise de la dette publique' }
        ]
    },
    {
        code: 'GD', name_fr: 'Grenade', name_en: 'Grenada', flag: '🇬🇩', capital: 'St. George\'s', mainColor: '#CE1126', latitude: 12.1165, longitude: -61.6790,
        intro_fr: "Surnommée l'île aux épices pour sa production de muscade, Grenade est un joyau des Caraïbes. Elle séduit par ses paysages volcaniques, ses cascades luxuriantes et ses plages magnifiques comme Grand Anse.",
        continentId: 'AME',
        currency: 'Dollar des Caraïbes orientales (XCD)', language: 'Anglais', population: 125438,
        dates: [
            { year: 1974, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1983, event: 'Intervention militaire américaine suite à un coup d\'État marxiste' },
            { year: 2004, event: 'Destructions massives causées par l\'ouragan Ivan' }
        ]
    },
    {
        code: 'GT', name_fr: 'Guatemala', name_en: 'Guatemala', flag: '🇬🇹', capital: 'Guatemala City', mainColor: '#4997D0', latitude: 15.7835, longitude: -90.2308,
        intro_fr: "Cœur du monde maya, le Guatemala abrite des sites archéologiques spectaculaires comme Tikal, cachés dans la jungle. C'est un pays de volcans, de lacs (comme le lac Atitlán) et de traditions indigènes vivantes.",
        continentId: 'AME',
        currency: 'Quetzal (GTQ)', language: 'Espagnol, Langues mayas', population: 17109746,
        dates: [
            { year: 1821, event: 'Indépendance de l\'Espagne' },
            { year: 1954, event: 'Coup d\'État orchestré par la CIA' },
            { year: 1996, event: 'Accords de paix mettant fin à 36 ans de guerre civile' }
        ]
    },
    {
        code: 'GN', name_fr: 'Guinée', name_en: 'Guinea', flag: '🇬🇳', capital: 'Conakry', mainColor: '#CE1126', latitude: 9.9456, longitude: -9.6966,
        intro_fr: "Surnommée le château d'eau de l'Afrique de l'Ouest, la Guinée possède des paysages variés allant des forêts aux montagnes du Fouta-Djalon. Riche en bauxite, le pays possède une forte culture musicale et traditionnelle.",
        continentId: 'AFR',
        currency: 'Franc guinéen (GNF)', language: 'Français, Peul, Malinké, Soussou', population: 13859341,
        dates: [
            { year: 1958, event: 'Non au référendum français et indépendance immédiate sous Sékou Touré' },
            { year: 2008, event: 'Mort de Lansana Conté et coup d\'État militaire' },
            { year: 2014, event: 'Épicentre de la grave épidémie d\'Ebola en Afrique de l\'Ouest' },
            { year: 2021, event: 'Coup d\'État militaire renversant Alpha Condé' }
        ]
    },
    {
        code: 'GW', name_fr: 'Guinée-Bissau', name_en: 'Guinea-Bissau', flag: '🇬🇼', capital: 'Bissau', mainColor: '#CE1126', latitude: 11.8037, longitude: -15.1804,
        intro_fr: "Petit pays lusophone d'Afrique de l'Ouest, il est connu pour son archipel des Bijagos, une réserve de biosphère unique. Son économie repose principalement sur l'exportation de noix de cajou.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Portugais, Créole de Guinée-Bissau', population: 2105566,
        dates: [
            { year: 1973, event: 'Déclaration d\'indépendance (reconnue par le Portugal en 1974)' },
            { year: 1998, event: 'Début d\'une guerre civile destructrice d\'un an' },
            { year: 2014, event: 'Retour à l\'ordre constitutionnel après de nombreux coups d\'État' }
        ]
    },
    {
        code: 'GQ', name_fr: 'Guinée équatoriale', name_en: 'Equatorial Guinea', flag: '🇬🇶', capital: 'Malabo', mainColor: '#3E753B', latitude: 1.6508, longitude: 10.2679,
        intro_fr: "Seul pays hispanophone d'Afrique, la Guinée équatoriale est composée d'une partie continentale et d'îles volcaniques. C'est l'un des plus grands producteurs de pétrole d'Afrique subsaharienne.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Espagnol, Français, Portugais', population: 1674908,
        dates: [
            { year: 1968, event: 'Indépendance de l\'Espagne' },
            { year: 1979, event: 'Coup d\'État portant Teodoro Obiang Nguema Mbasogo au pouvoir' },
            { year: 1996, event: 'Découverte d\'importants gisements de pétrole offshore' }
        ]
    },
    {
        code: 'GY', name_fr: 'Guyana', name_en: 'Guyana', flag: '🇬🇾', capital: 'Georgetown', mainColor: '#009E49', latitude: 4.8604, longitude: -58.9302,
        intro_fr: "Seul pays anglophone d'Amérique du Sud, le Guyana est couvert d'une forêt tropicale dense et vierge. Il abrite les impressionnantes chutes de Kaieteur et connaît une croissance rapide grâce à la découverte de pétrole.",
        continentId: 'AME',
        currency: 'Dollar guyanien (GYD)', language: 'Anglais', population: 808726,
        dates: [
            { year: 1966, event: 'Indépendance du Royaume-Uni' },
            { year: 1978, event: 'Massacre de Jonestown (secte du Temple du Peuple)' },
            { year: 2015, event: 'Découverte de réserves pétrolières massives par ExxonMobil' }
        ]
    },
    {
        code: 'HT', name_fr: 'Haïti', name_en: 'Haiti', flag: '🇭🇹', capital: 'Port-au-Prince', mainColor: '#00209F', latitude: 18.9712, longitude: -72.2852,
        intro_fr: "Première république noire indépendante du monde, Haïti possède une histoire de résilience et une culture artistique vibrante. Malgré les défis, le pays offre des paysages montagneux superbes et des sites historiques comme la Citadelle Laferrière.",
        continentId: 'AME',
        currency: 'Gourde (HTG)', language: 'Créole haïtien, Français', population: 11582996,
        dates: [
            { year: 1804, event: 'Indépendance d\'Haïti (première république noire libre)' },
            { year: 1986, event: 'Chute de la dictature des Duvalier' },
            { year: 2010, event: 'Séisme dévastateur (plus de 200 000 morts)' },
            { year: 2021, event: 'Assassinat du président Jovenel Moïse' }
        ]
    },
    {
        code: 'HN', name_fr: 'Honduras', name_en: 'Honduras', flag: '🇭🇳', capital: 'Tegucigalpa', mainColor: '#0073CF', latitude: 15.2000, longitude: -86.2419,
        intro_fr: "Pays d'Amérique centrale bordé par les Caraïbes, le Honduras est célèbre pour les ruines mayas de Copán et ses îles de la Baie, paradis de la plongée. Il possède une riche biodiversité et une nature luxuriante.",
        continentId: 'AME',
        currency: 'Lempira (HNL)', language: 'Espagnol', population: 10432860,
        dates: [
            { year: 1821, event: 'Indépendance de l\'Espagne' },
            { year: 1969, event: 'Guerre du Football contre le Salvador' },
            { year: 1998, event: 'L\'ouragan Mitch dévaste l\'économie et les infrastructures' },
            { year: 2009, event: 'Coup d\'État renversant le président Manuel Zelaya' }
        ]
    },
    {
        code: 'HU', name_fr: 'Hongrie', name_en: 'Hungary', flag: '🇭🇺', capital: 'Budapest', mainColor: '#436F4D', latitude: 47.1625, longitude: 19.5033,
        intro_fr: "Au cœur de l'Europe centrale, la Hongrie est célèbre pour son architecture, ses thermes et sa cuisine épicée au paprika. Budapest, sa capitale traversée par le Danube, est considérée comme l'une des plus belles villes du continent.",
        continentId: 'EUR',
        currency: 'Forint (HUF)', language: 'Hongrois', population: 9599744,
        dates: [
            { year: 1000, event: 'Couronnement d\'Étienne Ier et naissance du Royaume de Hongrie' },
            { year: 1920, event: 'Traité de Trianon (perte de deux tiers de son territoire historique)' },
            { year: 1956, event: 'Insurrection de Budapest réprimée par les Soviétiques' },
            { year: 2004, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'IN', name_fr: 'Inde', name_en: 'India', flag: '🇮🇳', capital: 'New Delhi', mainColor: '#FF9933', latitude: 20.5937, longitude: 78.9629,
        intro_fr: "Pays-continent à la population immense, l'Inde est une terre de contrastes, de spiritualité et de couleurs. Du Taj Mahal à Bollywood, en passant par sa cuisine épicée, son influence culturelle est mondiale.",
        continentId: 'ASI',
        currency: 'Roupie indienne (INR)', language: 'Hindi, Anglais (et 21 autres langues reconnues)', population: 1428627663,
        dates: [
            { year: 1947, event: 'Indépendance de l\'Empire britannique et partition' },
            { year: 1950, event: 'Entrée en vigueur de la Constitution de la République' },
            { year: 1991, event: 'Libéralisation économique majeure' },
            { year: 2023, event: 'L\'Inde devient le pays le plus peuplé au monde' }
        ]
    },
    {
        code: 'ID', name_fr: 'Indonésie', name_en: 'Indonesia', flag: '🇮🇩', capital: 'Jakarta', mainColor: '#FF0000', latitude: -0.7893, longitude: 113.9213,
        intro_fr: "Plus grand archipel du monde avec plus de 17 000 îles, l'Indonésie abrite une diversité culturelle et naturelle incroyable. De la jungle de Sumatra aux temples de Bali, c'est une terre de volcans et de biodiversité.",
        continentId: 'ASI',
        currency: 'Roupie indonésienne (IDR)', language: 'Indonésien', population: 275501339,
        dates: [
            { year: 1945, event: 'Proclamation de l\'indépendance par Soekarno' },
            { year: 1965, event: 'Coup d\'État échoué menant à des massacres de masse et l\'ascension de Soeharto' },
            { year: 1998, event: 'Chute du régime de Soeharto et début de la transition démocratique (Reformasi)' },
            { year: 2004, event: 'Tsunami dévastateur dans l\'océan Indien touchant durement Aceh' }
        ]
    },
    {
        code: 'IQ', name_fr: 'Irak', name_en: 'Iraq', flag: '🇮🇶', capital: 'Baghdad', mainColor: '#CE1126', latitude: 33.2232, longitude: 43.6793,
        intro_fr: "Berceau de la civilisation mésopotamienne entre le Tigre et l'Euphrate, l'Irak possède un patrimoine historique inestimable. Riche en pétrole, le pays travaille à sa reconstruction et à la préservation de ses sites antiques.",
        continentId: 'ASI',
        currency: 'Dinar irakien (IQD)', language: 'Arabe, Kurde', population: 44496122,
        dates: [
            { year: 1932, event: 'Indépendance de l\'Irak (fin du mandat britannique)' },
            { year: 1980, event: 'Début de la guerre Iran-Irak (dure 8 ans)' },
            { year: 2003, event: 'Invasion américaine et chute de Saddam Hussein' },
            { year: 2017, event: 'Défaite militaire territoriale de l\'État islamique en Irak' }
        ]
    },
    {
        code: 'IR', name_fr: 'Iran', name_en: 'Iran', flag: '🇮🇷', capital: 'Tehran', mainColor: '#239F40', latitude: 32.4279, longitude: 53.6880,
        intro_fr: "Héritier de l'Empire perse, l'Iran fascine par la richesse de son histoire, son architecture islamique raffinée et sa poésie. Ses bazars, ses jardins et l'hospitalité de son peuple en font une destination culturelle unique.",
        continentId: 'ASI',
        currency: 'Rial iranien (IRR)', language: 'Persan', population: 88550570,
        dates: [
            { year: 1953, event: 'Coup d\'État renversant Mossadegh (organisé par CIA/MI6)' },
            { year: 1979, event: 'Révolution islamique et chute du Shah' },
            { year: 1980, event: 'Début de la guerre Iran-Irak' },
            { year: 2015, event: 'Signature de l\'accord sur le nucléaire iranien (JCPOA)' }
        ]
    },
    {
        code: 'IE', name_fr: 'Irlande', name_en: 'Ireland', flag: '🇮🇪', capital: 'Dublin', mainColor: '#169B62', latitude: 53.1424, longitude: -7.6921,
        intro_fr: "Surnommée l'île d'Émeraude pour ses paysages verdoyants, l'Irlande est célèbre pour son folklore, sa musique et ses pubs conviviaux. C'est un pays à l'histoire riche qui est devenu un hub technologique européen moderne.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Irlandais, Anglais', population: 5127170,
        dates: [
            { year: 1916, event: 'Insurrection de Pâques à Dublin' },
            { year: 1922, event: 'Création de l\'État libre d\'Irlande (partition de l\'île)' },
            { year: 1973, event: 'Entrée dans la Communauté économique européenne' },
            { year: 1998, event: 'Accord du Vendredi saint (paix en Irlande du Nord)' }
        ]
    },
    {
        code: 'IS', name_fr: 'Islande', name_en: 'Iceland', flag: '🇮🇸', capital: 'Reykjavík', mainColor: '#02529C', latitude: 64.9631, longitude: -19.0208,
        intro_fr: "Terre de feu et de glace, l'Islande offre des paysages spectaculaires de volcans, glaciers, geysers et cascades. Située juste sous le cercle polaire, c'est une destination privilégiée pour observer la nature sauvage.",
        continentId: 'EUR',
        currency: 'Couronne islandaise (ISK)', language: 'Islandais', population: 372899,
        dates: [
            { year: 930, event: 'Création de l\'Althing, considéré comme le plus vieux parlement du monde' },
            { year: 1944, event: 'Indépendance du Danemark et fondation de la République' },
            { year: 2008, event: 'Grave crise financière et effondrement des banques islandaises' }
        ]
    },
    {
        code: 'IL', name_fr: 'Israël', name_en: 'Israel', flag: '🇮🇱', capital: 'Jerusalem', mainColor: '#005EB8', latitude: 31.0461, longitude: 34.8516,
        intro_fr: "Terre sainte pour trois grandes religions monothéistes, Israël mélange histoire millénaire et innovation technologique de pointe. De la vieille ville de Jérusalem aux plages modernes de Tel Aviv, le pays est plein de contrastes.",
        continentId: 'ASI',
        currency: 'Nouveau shekel (ILS)', language: 'Hébreu, Arabe', population: 9364000,
        dates: [
            { year: 1948, event: 'Proclamation de l\'État d\'Israël et première guerre arabo-israélienne' },
            { year: 1967, event: 'Guerre des Six Jours' },
            { year: 1973, event: 'Guerre du Kippour' },
            { year: 1993, event: 'Signature des accords de paix d\'Oslo' }
        ]
    },
    {
        code: 'IT', name_fr: 'Italie', name_en: 'Italy', flag: '🇮🇹', capital: 'Rome', mainColor: '#009246', latitude: 41.8719, longitude: 12.5674,
        intro_fr: "Berceau de l'Empire romain et de la Renaissance, l'Italie est célèbre pour son art, sa cuisine et son mode de vie. Avec ses villes d'art comme Rome, Florence et Venise, elle possède le plus grand nombre de sites UNESCO au monde.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Italien', population: 58983122,
        dates: [
            { year: 1861, event: 'Unification de l\'Italie (Risorgimento)' },
            { year: 1922, event: 'Marche sur Rome et arrivée de Mussolini au pouvoir' },
            { year: 1946, event: 'Abolition de la monarchie par référendum' },
            { year: 1957, event: 'Signature du traité de Rome (fondation de la CEE)' }
        ]
    },
    {
        code: 'JM', name_fr: 'Jamaïque', name_en: 'Jamaica', flag: '🇯🇲', capital: 'Kingston', mainColor: '#009B3A', latitude: 18.1096, longitude: -77.2975,
        intro_fr: "Île des Caraïbes au rayonnement culturel mondial, la Jamaïque est la patrie du reggae et de Bob Marley. Elle offre des plages magnifiques, des montagnes bleues luxuriantes et une culture vibrante et décontractée.",
        continentId: 'AME',
        currency: 'Dollar jamaïcain (JMD)', language: 'Anglais, Patois jamaïcain', population: 2827377,
        dates: [
            { year: 1655, event: 'Capture de l\'île par les Britanniques (au détriment des Espagnols)' },
            { year: 1838, event: 'Abolition définitive de l\'esclavage' },
            { year: 1962, event: 'Indépendance du Royaume-Uni' },
            { year: 1981, event: 'Mort de Bob Marley, icône mondiale du reggae' }
        ]
    },
    {
        code: 'JP', name_fr: 'Japon', name_en: 'Japan', flag: '🇯🇵', capital: 'Tokyo', mainColor: '#BC002D', latitude: 36.2048, longitude: 138.2529,
        intro_fr: "Archipel où la tradition millénaire côtoie la technologie futuriste, le Japon fascine par ses temples, ses jardins zen et sa culture pop. Sa cuisine raffinée et le sens de l'hospitalité (omotenashi) sont mondialement reconnus.",
        continentId: 'ASI',
        currency: 'Yen (JPY)', language: 'Japonais', population: 125125000,
        dates: [
            { year: 1868, event: 'Restauration de Meiji (modernisation et ouverture du pays)' },
            { year: 1945, event: 'Bombardements atomiques de Hiroshima et Nagasaki, capitulation' },
            { year: 1964, event: 'Jeux Olympiques de Tokyo (symbole du redressement économique)' },
            { year: 2011, event: 'Séisme et tsunami du Tōhoku, accident de Fukushima' }
        ]
    },
    {
        code: 'JO', name_fr: 'Jordanie', name_en: 'Jordan', flag: '🇯🇴', capital: 'Amman', mainColor: '#000000', latitude: 30.5852, longitude: 36.2384,
        intro_fr: "Oasis de stabilité au Moyen-Orient, la Jordanie abrite la cité nabatéenne de Petra, l'une des merveilles du monde. Ses paysages vont du désert rouge du Wadi Rum aux eaux salées de la mer Morte.",
        continentId: 'ASI',
        currency: 'Dinar jordanien (JOD)', language: 'Arabe', population: 11285869,
        dates: [
            { year: 1946, event: 'Indépendance du mandat britannique' },
            { year: 1967, event: 'Perte de la Cisjordanie et de Jérusalem-Est lors de la guerre des Six Jours' },
            { year: 1994, event: 'Signature du traité de paix avec Israël' }
        ]
    },
    {
        code: 'KZ', name_fr: 'Kazakhstan', name_en: 'Kazakhstan', flag: '🇰🇿', capital: 'Astana', mainColor: '#00AFCA', latitude: 48.0196, longitude: 66.9237,
        intro_fr: "Neuvième plus grand pays du monde, le Kazakhstan est une terre de steppes immenses et de ressources minérales abondantes. Sa capitale futuriste, Astana, contraste avec les traditions nomades encore présentes.",
        continentId: 'ASI',
        currency: 'Tenge (KZT)', language: 'Kazakh, Russe', population: 19398000,
        dates: [
            { year: 1991, event: 'Indépendance de l\'URSS (dernier pays à faire sécession)' },
            { year: 1997, event: 'Transfert de la capitale d\'Almaty vers Astana' },
            { year: 2022, event: 'Émeutes meurtrières de janvier réprimées avec l\'aide de l\'OTSC' }
        ]
    },
    {
        code: 'KE', name_fr: 'Kenya', name_en: 'Kenya', flag: '🇰🇪', capital: 'Nairobi', mainColor: '#000000', latitude: -0.0236, longitude: 37.9062,
        intro_fr: "Destination de safari par excellence, le Kenya est célèbre pour la grande migration des gnous dans le Masai Mara. C'est une puissance économique d'Afrique de l'Est, connue aussi pour ses athlètes de fond.",
        continentId: 'AFR',
        currency: 'Shilling kényan (KES)', language: 'Swahili, Anglais', population: 54027487,
        dates: [
            { year: 1952, event: 'Révolte des Mau Mau contre la domination coloniale britannique' },
            { year: 1963, event: 'Indépendance sous la présidence de Jomo Kenyatta' },
            { year: 2007, event: 'Violences post-électorales faisant plus de 1000 morts' },
            { year: 2010, event: 'Adoption par référendum d\'une nouvelle constitution progressiste' }
        ]
    },
    {
        code: 'KG', name_fr: 'Kirghizistan', name_en: 'Kyrgyzstan', flag: '🇰🇬', capital: 'Bishkek', mainColor: '#E4002B', latitude: 41.2044, longitude: 74.7661,
        intro_fr: "Pays montagneux d'Asie centrale, le Kirghizistan est surnommé la 'Suisse de l'Asie' pour ses paysages alpins. La culture nomade y est très vivante, avec ses yourtes traditionnelles et l'élevage de chevaux.",
        continentId: 'ASI',
        currency: 'Som (KGS)', language: 'Kirghize, Russe', population: 6636803,
        dates: [
            { year: 1991, event: 'Indépendance de l\'Union soviétique' },
            { year: 2005, event: 'Révolution des Tulipes renversant le président Akaïev' },
            { year: 2010, event: 'Nouvelle révolution et adoption d\'une constitution parlementaire' }
        ]
    },
    {
        code: 'KI', name_fr: 'Kiribati', name_en: 'Kiribati', flag: '🇰🇮', capital: 'Tarawa', mainColor: '#EF3340', latitude: -3.3704, longitude: -168.7340,
        intro_fr: "Nation insulaire du Pacifique composée de nombreux atolls dispersés sur une immense zone maritime. Menacée par la montée des eaux, elle est connue pour être l'un des premiers endroits au monde à accueillir le nouvel an.",
        continentId: 'OCE',
        currency: 'Dollar australien (AUD)', language: 'Anglais, Gilbertin', population: 131232,
        dates: [
            { year: 1979, event: 'Indépendance du Royaume-Uni' },
            { year: 1995, event: 'Ajustement de la ligne de changement de date (tout le pays passe à l\'est)' },
            { year: 2014, event: 'Achat de terres aux Fidji en prévision de la montée des eaux' }
        ]
    },
    {
        code: 'XK', name_fr: 'Kosovo', name_en: 'Kosovo', flag: '🇽🇰', capital: 'Pristina', mainColor: '#244AA5', latitude: 42.6026, longitude: 20.9030,
        intro_fr: "Le plus jeune pays d'Europe, situé dans les Balkans, possède un riche patrimoine culturel et religieux. Malgré les cicatrices du passé, sa population jeune et dynamique construit un avenir tourné vers l'Europe.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Albanais, Serbe', population: 1806279,
        dates: [
            { year: 1998, event: 'Début de la guerre du Kosovo' },
            { year: 1999, event: 'Intervention de l\'OTAN et mise sous administration de l\'ONU' },
            { year: 2008, event: 'Déclaration unilatérale d\'indépendance (non reconnue par la Serbie)' }
        ]
    },
    {
        code: 'KW', name_fr: 'Koweït', name_en: 'Kuwait', flag: '🇰🇼', capital: 'Kuwait City', mainColor: '#007A3D', latitude: 29.3117, longitude: 47.4818,
        intro_fr: "Petit émirat riche en pétrole situé au fond du golfe Persique, le Koweït possède une économie puissante et une société moderne. Sa capitale est connue pour ses tours d'eau emblématiques et son architecture contemporaine.",
        continentId: 'ASI',
        currency: 'Dinar koweïtien (KWD)', language: 'Arabe', population: 4268873,
        dates: [
            { year: 1961, event: 'Indépendance du Royaume-Uni' },
            { year: 1990, event: 'Invasion du Koweït par l\'Irak de Saddam Hussein' },
            { year: 1991, event: 'Libération par la coalition internationale (Guerre du Golfe)' },
            { year: 2005, event: 'Octroi du droit de vote aux femmes' }
        ]
    },
    {
        code: 'LA', name_fr: 'Laos', name_en: 'Laos', flag: '🇱🇦', capital: 'Vientiane', mainColor: '#CE1126', latitude: 19.8563, longitude: 102.4955,
        intro_fr: "Seul pays sans accès à la mer d'Asie du Sud-Est, le Laos est une terre paisible traversée par le Mékong. Il est apprécié pour sa nature luxuriante, ses temples bouddhistes et l'atmosphère détendue de villes comme Luang Prabang.",
        continentId: 'ASI',
        currency: 'Kip (LAK)', language: 'Lao', population: 7529475,
        dates: [
            { year: 1953, event: 'Indépendance de la France' },
            { year: 1975, event: 'Prise de pouvoir par le Pathet Lao (communiste) et abolition de la monarchie' },
            { year: 1997, event: 'Adhésion à l\'ASEAN' }
        ]
    },
    {
        code: 'LS', name_fr: 'Lesotho', name_en: 'Lesotho', flag: '🇱🇸', capital: 'Maseru', mainColor: '#00209F', latitude: -29.6099, longitude: 28.2336,
        intro_fr: "Surnommé le 'Royaume dans le ciel', le Lesotho est le seul pays au monde entièrement situé au-dessus de 1000 mètres d'altitude. Enclavé dans l'Afrique du Sud, il offre des paysages montagneux spectaculaires.",
        continentId: 'AFR',
        currency: 'Loti (LSL)', language: 'Sotho du Sud, Anglais', population: 2305825,
        dates: [
            { year: 1868, event: 'Le Basutoland devient un protectorat britannique' },
            { year: 1966, event: 'Indépendance sous le nom de Lesotho' },
            { year: 1998, event: 'Crise politique majeure et intervention de la SADC' }
        ]
    },
    {
        code: 'LV', name_fr: 'Lettonie', name_en: 'Latvia', flag: '🇱🇻', capital: 'Riga', mainColor: '#9E3039', latitude: 56.8796, longitude: 24.6032,
        intro_fr: "Située entre l'Estonie et la Lituanie, la Lettonie est un pays vert recouvert de vastes forêts. Sa capitale, Riga, est célèbre pour son architecture Art nouveau exceptionnelle et son centre historique classé.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Letton', population: 1883008,
        dates: [
            { year: 1918, event: 'Proclamation de l\'indépendance' },
            { year: 1940, event: 'Occupation et annexion par l\'URSS' },
            { year: 1991, event: 'Restauration de l\'indépendance (Révolution chantante)' },
            { year: 2004, event: 'Adhésion à l\'Union européenne et à l\'OTAN' }
        ]
    },
    {
        code: 'LB', name_fr: 'Liban', name_en: 'Lebanon', flag: '🇱🇧', capital: 'Beirut', mainColor: '#ED1C24', latitude: 33.8547, longitude: 35.8623,
        intro_fr: "Pays méditerranéen à l'histoire millénaire, le Liban est connu pour sa diversité culturelle et religieuse, sa cuisine renommée et ses cèdres. Malgré les crises, Beyrouth reste une ville vibrante, souvent appelée le 'Paris du Moyen-Orient'.",
        continentId: 'ASI',
        currency: 'Livre libanaise (LBP)', language: 'Arabe', population: 5489739,
        dates: [
            { year: 1943, event: 'Indépendance (fin du mandat français) et Pacte national' },
            { year: 1975, event: 'Début de la guerre civile (qui durera jusqu\'en 1990)' },
            { year: 2005, event: 'Assassinat de Rafiq Hariri et Révolution du Cèdre' },
            { year: 2020, event: 'Double explosion dévastatrice au port de Beyrouth' }
        ]
    },
    {
        code: 'LR', name_fr: 'Liberia', name_en: 'Liberia', flag: '🇱🇷', capital: 'Monrovia', mainColor: '#BF0A30', latitude: 6.4281, longitude: -9.4295,
        intro_fr: "Fondé par des esclaves affranchis venus des États-Unis, le Liberia est la plus ancienne république d'Afrique. Le pays possède de belles plages et des forêts tropicales denses, et se remet progressivement de son passé tumultueux.",
        continentId: 'AFR',
        currency: 'Dollar libérien (LRD)', language: 'Anglais', population: 5302681,
        dates: [
            { year: 1847, event: 'Proclamation de l\'indépendance (première république africaine)' },
            { year: 1989, event: 'Début de la première guerre civile libérienne' },
            { year: 2003, event: 'Fin de la seconde guerre civile et exil de Charles Taylor' },
            { year: 2005, event: 'Élection d\'Ellen Johnson Sirleaf, première femme présidente en Afrique' }
        ]
    },
    {
        code: 'LY', name_fr: 'Libye', name_en: 'Libya', flag: '🇱🇾', capital: 'Tripoli', mainColor: '#E70013', latitude: 26.3351, longitude: 17.2283,
        intro_fr: "Avec son immense territoire désertique et son littoral méditerranéen, la Libye abrite certaines des plus belles ruines romaines, comme Leptis Magna. Riche en pétrole, le pays traverse une période de transition politique complexe.",
        continentId: 'AFR',
        currency: 'Dinar libyen (LYD)', language: 'Arabe', population: 6812341,
        dates: [
            { year: 1951, event: 'Indépendance sous le roi Idriss (premier pays indépendant grâce à l\'ONU)' },
            { year: 1969, event: 'Coup d\'État militaire et arrivée au pouvoir de Mouammar Kadhafi' },
            { year: 2011, event: 'Guerre civile, intervention de l\'OTAN et chute de Kadhafi' },
            { year: 2014, event: 'Début de la deuxième guerre civile et division du pays' }
        ]
    },
    {
        code: 'LI', name_fr: 'Liechtenstein', name_en: 'Liechtenstein', flag: '🇱🇮', capital: 'Vaduz', mainColor: '#002780', latitude: 47.1660, longitude: 9.5554,
        intro_fr: "Micro-État alpin coincé entre la Suisse et l'Autriche, le Liechtenstein est l'un des pays les plus riches au monde. Célèbre pour ses banques, ses châteaux princiers et ses paysages de montagne, c'est une monarchie constitutionnelle.",
        continentId: 'EUR',
        currency: 'Franc suisse (CHF)', language: 'Allemand', population: 39327,
        dates: [
            { year: 1719, event: 'Création de la Principauté du Liechtenstein' },
            { year: 1806, event: 'Devient un État souverain' },
            { year: 1868, event: 'Abolition de l\'armée (le pays reste neutre depuis)' },
            { year: 1990, event: 'Adhésion à l\'ONU' }
        ]
    },
    {
        code: 'LT', name_fr: 'Lituanie', name_en: 'Lithuania', flag: '🇱🇹', capital: 'Vilnius', mainColor: '#FDB913', latitude: 55.1694, longitude: 23.8813,
        intro_fr: "La plus méridionale des nations baltes possède une histoire riche liée à son passé de grand-duché. Vilnius, sa capitale baroque, et l'isthme de Courlande, avec ses dunes de sable, sont ses joyaux touristiques.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Lituanien', population: 2800839,
        dates: [
            { year: 1253, event: 'Couronnement de Mindaugas, premier et unique roi de Lituanie' },
            { year: 1918, event: 'Déclaration d\'indépendance' },
            { year: 1990, event: 'Premier pays balte à déclarer la restauration de son indépendance de l\'URSS' },
            { year: 2004, event: 'Adhésion à l\'Union européenne et à l\'OTAN' }
        ]
    },
    {
        code: 'LU', name_fr: 'Luxembourg', name_en: 'Luxembourg', flag: '🇱🇺', capital: 'Luxembourg', mainColor: '#00A1DE', latitude: 49.8153, longitude: 6.1296,
        intro_fr: "Petit grand-duché au cœur de l'Europe, le Luxembourg est un centre financier majeur et un siège des institutions européennes. Il surprend par ses paysages verdoyants, ses vallées encaissées et ses forteresses historiques.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Luxembourgeois, Français, Allemand', population: 645397,
        dates: [
            { year: 963, event: 'Fondation de la ville de Luxembourg' },
            { year: 1815, event: 'Élévation au rang de Grand-Duché au Congrès de Vienne' },
            { year: 1867, event: 'Le Traité de Londres garantit l\'indépendance et la neutralité' },
            { year: 1957, event: 'Membre fondateur de la Communauté Économique Européenne' }
        ]
    },
    {
        code: 'MK', name_fr: 'Macédoine du Nord', name_en: 'North Macedonia', flag: '🇲🇰', capital: 'Skopje', mainColor: '#D20000', latitude: 41.6086, longitude: 21.7453,
        intro_fr: "Pays enclavé des Balkans, la Macédoine du Nord est riche en histoire antique et médiévale. Le lac d'Ohrid, l'un des plus vieux et profonds d'Europe, est son trésor naturel et culturel majeur.",
        continentId: 'EUR',
        currency: 'Denar macédonien (MKD)', language: 'Macédonien, Albanais', population: 2065000,
        dates: [
            { year: 1991, event: 'Indépendance vis-à-vis de la Yougoslavie' },
            { year: 2001, event: 'Accords d\'Ohrid mettant fin à l\'insurrection armée albanaise' },
            { year: 2019, event: 'Accord de Prespa : le pays change officiellement son nom en Macédoine du Nord' },
            { year: 2020, event: 'Adhésion officielle à l\'OTAN' }
        ]
    },
    {
        code: 'MG', name_fr: 'Madagascar', name_en: 'Madagascar', flag: '🇲🇬', capital: 'Antananarivo', mainColor: '#FC3D32', latitude: -18.7669, longitude: 46.8691,
        intro_fr: "Quatrième plus grande île du monde, Madagascar est un sanctuaire de la nature avec une faune et une flore endémiques uniques, comme les lémuriens et les baobabs. Sa culture mélange influences africaines et asiatiques.",
        continentId: 'AFR',
        currency: 'Ariary (MGA)', language: 'Malgache, Français', population: 29611714,
        dates: [
            { year: 1896, event: 'Annexion par la France et exil de la reine Ranavalona III' },
            { year: 1960, event: 'Indépendance de Madagascar' },
            { year: 1975, event: 'Instauration de la République démocratique (orientation socialiste)' },
            { year: 2009, event: 'Crise politique majeure et coup d\'État' }
        ]
    },
    {
        code: 'MY', name_fr: 'Malaisie', name_en: 'Malaysia', flag: '🇲🇾', capital: 'Kuala Lumpur', mainColor: '#010066', latitude: 4.2105, longitude: 101.9758,
        intro_fr: "Divisée entre la péninsule et l'île de Bornéo, la Malaisie est un pays multiculturel dynamique. Elle est connue pour ses forêts tropicales anciennes, ses plages et les emblématiques tours Petronas de Kuala Lumpur.",
        continentId: 'ASI',
        currency: 'Ringgit (MYR)', language: 'Malais', population: 33938000,
        dates: [
            { year: 1957, event: 'Indépendance de la Fédération de Malaisie' },
            { year: 1963, event: 'Formation de la Malaisie actuelle (avec Sabah, Sarawak et Singapour)' },
            { year: 1965, event: 'Expulsion de Singapour qui devient indépendante' },
            { year: 1998, event: 'Inauguration des tours jumelles Petronas (symbole du boom économique)' }
        ]
    },
    {
        code: 'MW', name_fr: 'Malawi', name_en: 'Malawi', flag: '🇲🇼', capital: 'Lilongwe', mainColor: '#000000', latitude: -13.2543, longitude: 34.3015,
        intro_fr: "Surnommé le 'cœur chaud de l'Afrique' pour l'accueil de ses habitants, ce pays est dominé par l'immense lac Malawi. C'est une destination paisible offrant des paysages variés, des plateaux aux plages d'eau douce.",
        continentId: 'AFR',
        currency: 'Kwacha malawite (MWK)', language: 'Anglais, Chewa', population: 20405317,
        dates: [
            { year: 1891, event: 'Établissement du protectorat britannique d\'Afrique centrale' },
            { year: 1964, event: 'Indépendance du Nyassaland qui devient le Malawi' },
            { year: 1994, event: 'Premières élections multipartites, fin de la dictature de Banda' }
        ]
    },
    {
        code: 'MV', name_fr: 'Maldives', name_en: 'Maldives', flag: '🇲🇻', capital: 'Malé', mainColor: '#D21034', latitude: 3.2028, longitude: 73.2207,
        intro_fr: "Archipel de l'océan Indien composé de 26 atolls, les Maldives sont la destination ultime pour le luxe et la détente. Célèbres pour leurs bungalows sur pilotis et leurs fonds marins exceptionnels, elles sont toutefois menacées par la montée des eaux.",
        continentId: 'ASI',
        currency: 'Rufiyaa (MVR)', language: 'Maldivien (Dhivehi)', population: 523787,
        dates: [
            { year: 1965, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1968, event: 'Abolition du sultanat et instauration de la République' },
            { year: 2008, event: 'Premières élections démocratiques et adoption d\'une nouvelle Constitution' }
        ]
    },
    {
        code: 'ML', name_fr: 'Mali', name_en: 'Mali', flag: '🇲🇱', capital: 'Bamako', mainColor: '#14B53A', latitude: 17.5707, longitude: -3.9962,
        intro_fr: "Terre de grands empires historiques, le Mali abrite des trésors culturels comme la ville mythique de Tombouctou et la Grande Mosquée de Djenné. Traversé par le fleuve Niger, c'est un centre important de la musique ouest-africaine.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Bambara, Français (langue de travail)', population: 22593590,
        dates: [
            { year: 1960, event: 'Indépendance de la Fédération du Mali' },
            { year: 1991, event: 'Chute du régime de Moussa Traoré après une insurrection populaire' },
            { year: 2012, event: 'Rébellion touarègue et début de la crise politico-sécuritaire au nord' },
            { year: 2020, event: 'Coup d\'État militaire (renouvelé en 2021)' }
        ]
    },
    {
        code: 'MT', name_fr: 'Malte', name_en: 'Malta', flag: '🇲🇹', capital: 'Valletta', mainColor: '#CF142B', latitude: 35.9375, longitude: 14.3754,
        intro_fr: "Petit archipel au centre de la Méditerranée, Malte possède une densité historique incroyable, des temples mégalithiques aux forteresses des chevaliers. C'est une destination prisée pour son climat ensoleillé et ses eaux bleues.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Maltais, Anglais', population: 533286,
        dates: [
            { year: 1565, event: 'Grand Siège de Malte (les Chevaliers repoussent l\'Empire ottoman)' },
            { year: 1964, event: 'Indépendance du Royaume-Uni' },
            { year: 1974, event: 'Malte devient une République' },
            { year: 2004, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'MA', name_fr: 'Maroc', name_en: 'Morocco', flag: '🇲🇦', capital: 'Rabat', mainColor: '#C1272D', latitude: 31.7917, longitude: -7.0926,
        intro_fr: "Porte de l'Afrique face à l'Europe, le Maroc enchante par ses souks colorés, ses déserts et ses montagnes de l'Atlas. Ses villes impériales comme Marrakech et Fès témoignent d'une architecture et d'une culture raffinées.",
        continentId: 'AFR',
        currency: 'Dirham marocain (MAD)', language: 'Arabe, Tamazight', population: 37457971,
        dates: [
            { year: 789, event: 'Fondation de la dynastie idrisside (premier État marocain)' },
            { year: 1956, event: 'Fin du protectorat français et espagnol, indépendance' },
            { year: 1975, event: 'La Marche verte (revendication du Sahara occidental)' },
            { year: 2011, event: 'Adoption d\'une nouvelle constitution suite au Printemps arabe' }
        ]
    },
    {
        code: 'MH', name_fr: 'Îles Marshall', name_en: 'Marshall Islands', flag: '🇲🇭', capital: 'Majuro', mainColor: '#003893', latitude: 7.1315, longitude: 171.1845,
        intro_fr: "République insulaire du Pacifique composée d'atolls et d'îles, elle est connue pour son histoire liée aux essais nucléaires américains. C'est aujourd'hui une destination pour la plongée, célèbre pour l'atoll de Bikini.",
        continentId: 'OCE',
        currency: 'Dollar américain (USD)', language: 'Marshallais, Anglais', population: 41569,
        dates: [
            { year: 1946, event: 'Début des essais nucléaires américains sur l\'atoll de Bikini' },
            { year: 1986, event: 'Signature du Traité de libre association avec les États-Unis' },
            { year: 1990, event: 'L\'ONU met fin officiellement à la tutelle, indépendance complète' }
        ]
    },
    {
        code: 'MU', name_fr: 'Maurice', name_en: 'Mauritius', flag: '🇲🇺', capital: 'Port Louis', mainColor: '#EA2839', latitude: -20.3484, longitude: 57.5522,
        intro_fr: "Île tropicale de l'océan Indien, Maurice est célèbre pour ses plages de sable blanc, ses lagons turquoise et sa culture métissée. C'est une destination touristique de luxe qui offre aussi une nature luxuriante à l'intérieur des terres.",
        continentId: 'AFR',
        currency: 'Roupie mauricienne (MUR)', language: 'Anglais, Français, Créole mauricien', population: 1262523,
        dates: [
            { year: 1810, event: 'Les Britanniques s\'emparent de l\'île (jusqu\'alors l\'Isle de France)' },
            { year: 1968, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1992, event: 'Maurice devient une République au sein du Commonwealth' }
        ]
    },
    {
        code: 'MR', name_fr: 'Mauritanie', name_en: 'Mauritania', flag: '🇲🇷', capital: 'Nouakchott', mainColor: '#00A95C', latitude: 21.0079, longitude: -10.9408,
        intro_fr: "Pays désertique trait d'union entre le Maghreb et l'Afrique subsaharienne, la Mauritanie offre des paysages de dunes infinis. Sa côte atlantique abrite le Banc d'Arguin, une réserve ornithologique majeure.",
        continentId: 'AFR',
        currency: 'Ouguiya (MRU)', language: 'Arabe', population: 4736139,
        dates: [
            { year: 1960, event: 'Indépendance de la France' },
            { year: 1981, event: 'Abolition officielle de l\'esclavage (dernier pays au monde à le faire)' },
            { year: 2008, event: 'Coup d\'État mené par Mohamed Ould Abdel Aziz' },
            { year: 2019, event: 'Première transition pacifique du pouvoir entre deux présidents élus' }
        ]
    },
    {
        code: 'MX', name_fr: 'Mexique', name_en: 'Mexico', flag: '🇲🇽', capital: 'Mexico City', mainColor: '#006847', latitude: 23.6345, longitude: -102.5528,
        intro_fr: "Pays aux multiples facettes, le Mexique offre des plages de rêve, une cuisine classée au patrimoine mondial et des sites archéologiques mayas et aztèques. Sa culture vibrante et colorée est célèbre dans le monde entier.",
        continentId: 'AME',
        currency: 'Peso mexicain (MXN)', language: 'Espagnol (et 68 langues indigènes)', population: 128455567,
        dates: [
            { year: 1810, event: 'Le Grito de Dolores marque le début de la guerre d\'indépendance' },
            { year: 1910, event: 'Début de la Révolution mexicaine' },
            { year: 1994, event: 'Entrée en vigueur de l\'ALÉNA (Accord de libre-échange nord-américain)' },
            { year: 2000, event: 'Fin des 71 ans de pouvoir ininterrompu du PRI avec l\'élection de Vicente Fox' }
        ]
    },
    {
        code: 'FM', name_fr: 'Micronésie', name_en: 'Micronesia', flag: '🇫🇲', capital: 'Palikir', mainColor: '#6798CE', latitude: 7.4256, longitude: 150.5508,
        intro_fr: "État fédéral composé de centaines d'îles dans le Pacifique occidental, la Micronésie est un paradis pour les plongeurs. Elle abrite les ruines mystérieuses de Nan Madol, une ancienne cité de pierre sur l'eau.",
        continentId: 'OCE',
        currency: 'Dollar américain (USD)', language: 'Anglais', population: 114164,
        dates: [
            { year: 1979, event: 'Ratification de la Constitution des États fédérés de Micronésie' },
            { year: 1986, event: 'Entrée en vigueur du Traité de libre association avec les États-Unis' },
            { year: 1991, event: 'Indépendance reconnue par les Nations Unies' }
        ]
    },
    {
        code: 'MD', name_fr: 'Moldavie', name_en: 'Moldova', flag: '🇲🇩', capital: 'Chișinău', mainColor: '#0046AE', latitude: 47.4116, longitude: 28.3699,
        intro_fr: "Petit pays d'Europe de l'Est enclavé entre la Roumanie et l'Ukraine, la Moldavie est réputée pour ses vignobles et ses immenses caves à vin. Elle conserve un charme rural authentique et des monastères orthodoxes isolés.",
        continentId: 'EUR',
        currency: 'Leu moldave (MDL)', language: 'Roumain', population: 2512758,
        dates: [
            { year: 1991, event: 'Déclaration d\'indépendance vis-à-vis de l\'URSS' },
            { year: 1992, event: 'Guerre du Dniestr et sécession de facto de la Transnistrie' },
            { year: 2014, event: 'Signature de l\'accord d\'association avec l\'Union européenne' },
            { year: 2022, event: 'La Moldavie obtient le statut de candidat à l\'UE' }
        ]
    },
    {
        code: 'MC', name_fr: 'Monaco', name_en: 'Monaco', flag: '🇲🇨', capital: 'Monaco', mainColor: '#CE1126', latitude: 43.7384, longitude: 7.4246,
        intro_fr: "Deuxième plus petit État au monde, la Principauté de Monaco est synonyme de luxe, de casinos et de Formule 1. Enclavée sur la Côte d'Azur, elle attire les grandes fortunes mondiales grâce à sa fiscalité et sa sécurité.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Français', population: 36469,
        dates: [
            { year: 1297, event: 'Prise de la forteresse par François Grimaldi (début de la dynastie)' },
            { year: 1861, event: 'Traité franco-monégasque assurant l\'indépendance de la principauté' },
            { year: 1911, event: 'Adoption de la première Constitution (fin de la monarchie absolue)' },
            { year: 1993, event: 'Admission en tant que membre de plein droit de l\'ONU' }
        ]
    },
    {
        code: 'MN', name_fr: 'Mongolie', name_en: 'Mongolia', flag: '🇲🇳', capital: 'Ulaanbaatar', mainColor: '#DA2032', latitude: 46.8625, longitude: 103.8467,
        intro_fr: "Terre de Gengis Khan, la Mongolie est célèbre pour ses vastes steppes, son désert de Gobi et sa culture nomade. C'est l'un des pays les moins densément peuplés au monde, offrant une expérience de nature sauvage unique.",
        continentId: 'ASI',
        currency: 'Tugrik (MNT)', language: 'Mongol', population: 3398366,
        dates: [
            { year: 1206, event: 'Fondation de l\'Empire mongol par Gengis Khan' },
            { year: 1921, event: 'Révolution mongole et indépendance de facto de la Chine' },
            { year: 1924, event: 'Proclamation de la République populaire mongole (satellite soviétique)' },
            { year: 1990, event: 'Révolution démocratique pacifique et transition vers le multipartisme' }
        ]
    },
    {
        code: 'ME', name_fr: 'Monténégro', name_en: 'Montenegro', flag: '🇲🇪', capital: 'Podgorica', mainColor: '#C40308', latitude: 42.7087, longitude: 19.3744,
        intro_fr: "Perle des Balkans, le Monténégro offre une combinaison spectaculaire de montagnes abruptes et de côtes adriatiques. La baie de Kotor, semblable à un fjord, est l'un des paysages les plus impressionnants de la Méditerranée.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Monténégrin', population: 617213,
        dates: [
            { year: 1878, event: 'Reconnaissance de l\'indépendance au Congrès de Berlin' },
            { year: 1918, event: 'Intégration au Royaume des Serbes, Croates et Slovènes (Yougoslavie)' },
            { year: 2006, event: 'Référendum et déclaration d\'indépendance vis-à-vis de la Serbie' },
            { year: 2017, event: 'Adhésion à l\'OTAN' }
        ]
    },
    {
        code: 'MZ', name_fr: 'Mozambique', name_en: 'Mozambique', flag: '🇲🇿', capital: 'Maputo', mainColor: '#00966E', latitude: -18.6657, longitude: 35.5296,
        intro_fr: "Avec son immense littoral sur l'océan Indien, le Mozambique est célèbre pour ses plages vierges et ses fruits de mer. Ancienne colonie portugaise, le pays mélange influences africaines et européennes dans une ambiance tropicale.",
        continentId: 'AFR',
        currency: 'Metical (MZN)', language: 'Portugais', population: 32969518,
        dates: [
            { year: 1975, event: 'Indépendance vis-à-vis du Portugal' },
            { year: 1977, event: 'Début d\'une guerre civile dévastatrice de 15 ans' },
            { year: 1992, event: 'Accords de paix de Rome mettant fin à la guerre civile' },
            { year: 2010, event: 'Découverte d\'immenses réserves de gaz naturel au large de Cabo Delgado' }
        ]
    },
    {
        code: 'NA', name_fr: 'Namibie', name_en: 'Namibia', flag: '🇳🇦', capital: 'Windhoek', mainColor: '#003580', latitude: -22.9576, longitude: 18.4904,
        intro_fr: "Pays des grands espaces, la Namibie abrite le plus vieux désert du monde, le Namib, et ses immenses dunes rouges. C'est une destination sûre et spectaculaire pour observer la faune sauvage, notamment dans le parc d'Etosha.",
        continentId: 'AFR',
        currency: 'Dollar namibien (NAD)', language: 'Anglais', population: 2567012,
        dates: [
            { year: 1884, event: 'Devient un protectorat allemand (Sud-Ouest africain)' },
            { year: 1915, event: 'Occupation par l\'Afrique du Sud pendant la Première Guerre mondiale' },
            { year: 1990, event: 'Indépendance officielle et adoption d\'une constitution démocratique' }
        ]
    },
    {
        code: 'NR', name_fr: 'Nauru', name_en: 'Nauru', flag: '🇳🇷', capital: 'Yaren', mainColor: '#002B7F', latitude: -0.5228, longitude: 166.9315,
        intro_fr: "Plus petite république du monde, Nauru est une île isolée du Pacifique. Autrefois riche grâce à l'exploitation du phosphate, elle fait face aujourd'hui à des défis économiques et environnementaux majeurs.",
        continentId: 'OCE',
        currency: 'Dollar australien (AUD)', language: 'Nauruan, Anglais', population: 12668,
        dates: [
            { year: 1968, event: 'Indépendance (tutelle conjointe Australie/NZ/RU levée)' },
            { year: 1999, event: 'Admission à l\'Organisation des Nations Unies' },
            { year: 2001, event: 'Accord avec l\'Australie pour abriter un centre de détention de migrants' }
        ]
    },
    {
        code: 'NP', name_fr: 'Népal', name_en: 'Nepal', flag: '🇳🇵', capital: 'Kathmandu', mainColor: '#DC143C', latitude: 28.3949, longitude: 84.1240,
        intro_fr: "Abritant le mont Everest et une grande partie de l'Himalaya, le Népal est le paradis des trekkeurs et des alpinistes. C'est aussi une terre de spiritualité où l'hindouisme et le bouddhisme coexistent harmonieusement.",
        continentId: 'ASI',
        currency: 'Roupie népalaise (NPR)', language: 'Népalais', population: 30547580,
        dates: [
            { year: 1768, event: 'Unification du Népal par Prithvi Narayan Shah' },
            { year: 2001, event: 'Massacre de la famille royale au palais de Katmandou' },
            { year: 2006, event: 'Fin de la guerre civile maoïste' },
            { year: 2008, event: 'Abolition de la monarchie et proclamation de la République' },
            { year: 2015, event: 'Séisme dévastateur (près de 9000 morts)' }
        ]
    },
    {
        code: 'NI', name_fr: 'Nicaragua', name_en: 'Nicaragua', flag: '🇳🇮', capital: 'Managua', mainColor: '#0067C6', latitude: 12.8654, longitude: -85.2072,
        intro_fr: "Plus grand pays d'Amérique centrale, le Nicaragua est une terre de volcans et de lacs immenses. Il séduit les voyageurs par son authenticité, ses villes coloniales comme Granada et ses spots de surf sur le Pacifique.",
        continentId: 'AME',
        currency: 'Córdoba (NIO)', language: 'Espagnol', population: 6948392,
        dates: [
            { year: 1821, event: 'Indépendance de l\'Empire espagnol' },
            { year: 1979, event: 'Révolution sandiniste renversant la dictature des Somoza' },
            { year: 1990, event: 'Élections démocratiques et fin de la révolution sandiniste' },
            { year: 2018, event: 'Violente répression des manifestations anti-gouvernementales' }
        ]
    },
    {
        code: 'NE', name_fr: 'Niger', name_en: 'Niger', flag: '🇳🇪', capital: 'Niamey', mainColor: '#E05206', latitude: 17.6078, longitude: 8.0817,
        intro_fr: "Vaste pays sahélien en grande partie désertique, le Niger est traversé par le fleuve du même nom. Il possède une culture riche avec des villes historiques caravanières comme Agadez et des traditions touaregs vivaces.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français, Haoussa, Zarma', population: 26207977,
        dates: [
            { year: 1960, event: 'Indépendance de la France' },
            { year: 2010, event: 'Coup d\'État renversant le président Mamadou Tandja' },
            { year: 2021, event: 'Première transition démocratique pacifique entre deux présidents civils' },
            { year: 2023, event: 'Coup d\'État militaire renversant Mohamed Bazoum' }
        ]
    },
    {
        code: 'NG', name_fr: 'Nigeria', name_en: 'Nigeria', flag: '🇳🇬', capital: 'Abuja', mainColor: '#008753', latitude: 9.0820, longitude: 8.6753,
        intro_fr: "Géant démographique et économique de l'Afrique, le Nigeria est célèbre pour son industrie pétrolière et son cinéma, Nollywood. C'est un pays vibrant et complexe, riche d'une immense diversité ethnique et culturelle.",
        continentId: 'AFR',
        currency: 'Naira (NGN)', language: 'Anglais, Haoussa, Igbo, Yoruba', population: 218541212,
        dates: [
            { year: 1960, event: 'Indépendance du Royaume-Uni' },
            { year: 1967, event: 'Début de la guerre civile du Biafra' },
            { year: 1999, event: 'Fin du régime militaire et retour à la démocratie' },
            { year: 2014, event: 'Le pays devient la première économie d\'Afrique en termes de PIB' }
        ]
    },
    {
        code: 'NO', name_fr: 'Norvège', name_en: 'Norway', flag: '🇳🇴', capital: 'Oslo', mainColor: '#BA0C2F', latitude: 60.4720, longitude: 8.4689,
        intro_fr: "Mondialement connue pour ses fjords spectaculaires, la Norvège est un pays riche où la nature est reine. C'est une destination idéale pour voir les aurores boréales, le soleil de minuit et profiter des sports d'hiver.",
        continentId: 'EUR',
        currency: 'Couronne norvégienne (NOK)', language: 'Norvégien', population: 5434319,
        dates: [
            { year: 1905, event: 'Dissolution de l\'union avec la Suède, indépendance totale' },
            { year: 1969, event: 'Découverte d\'importants gisements de pétrole en mer du Nord' },
            { year: 1994, event: 'Les électeurs rejettent l\'adhésion à l\'Union européenne par référendum' },
            { year: 2011, event: 'Attentats d\'Oslo et d\'Utøya commis par un terroriste d\'extrême droite' }
        ]
    },
    {
        code: 'NZ', name_fr: 'Nouvelle-Zélande', name_en: 'New Zealand', flag: '🇳🇿', capital: 'Wellington', mainColor: '#00247D', latitude: -40.9006, longitude: 174.8860,
        intro_fr: "Terre de la culture maorie et décor du Seigneur des Anneaux, la Nouvelle-Zélande offre des paysages grandioses. Ses deux îles principales regorgent de volcans, de glaciers, de plages et de forêts propices à l'aventure.",
        continentId: 'OCE',
        currency: 'Dollar néo-zélandais (NZD)', language: 'Anglais, Maori', population: 5124100,
        dates: [
            { year: 1840, event: 'Signature du Traité de Waitangi entre la Couronne et les chefs maoris' },
            { year: 1893, event: 'Premier pays au monde à accorder le droit de vote aux femmes' },
            { year: 1947, event: 'Adoption du Statut de Westminster (indépendance complète)' },
            { year: 1987, event: 'Le maori devient une langue officielle du pays' }
        ]
    },
    {
        code: 'OM', name_fr: 'Oman', name_en: 'Oman', flag: '🇴🇲', capital: 'Muscat', mainColor: '#DB161B', latitude: 21.5126, longitude: 55.9233,
        intro_fr: "Joyau de la péninsule arabique, Oman se distingue par ses traditions préservées, ses forteresses et ses paysages variés. Des fjords de Musandam aux dunes du désert, c'est une destination authentique et accueillante.",
        continentId: 'ASI',
        currency: 'Rial omanais (OMR)', language: 'Arabe', population: 4576298,
        dates: [
            { year: 1650, event: 'Expulsion des Portugais de Mascate (plus vieil État indépendant du monde arabe)' },
            { year: 1970, event: 'Coup d\'État de Qabus ibn Saïd (début de la modernisation du pays)' },
            { year: 1996, event: 'Promulgation de la Loi fondamentale de l\'État (première constitution)' },
            { year: 2020, event: 'Décès du sultan Qabus après 50 ans de règne' }
        ]
    },
    {
        code: 'UG', name_fr: 'Ouganda', name_en: 'Uganda', flag: '🇺🇬', capital: 'Kampala', mainColor: '#000000', latitude: 1.3733, longitude: 32.2903,
        intro_fr: "Surnommé la 'Perle de l'Afrique' par Winston Churchill, l'Ouganda abrite la source du Nil et une faune exceptionnelle. C'est l'un des meilleurs endroits au monde pour observer les gorilles de montagne dans leur habitat naturel.",
        continentId: 'AFR',
        currency: 'Shilling ougandais (UGX)', language: 'Anglais, Swahili, Luganda', population: 47249585,
        dates: [
            { year: 1962, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1971, event: 'Coup d\'État d\'Idi Amin Dada (début d\'une dictature brutale)' },
            { year: 1979, event: 'Renversement d\'Idi Amin avec l\'aide de la Tanzanie' },
            { year: 1986, event: 'Prise de pouvoir de Yoweri Museveni après une guérilla' }
        ]
    },
    {
        code: 'UZ', name_fr: 'Ouzbékistan', name_en: 'Uzbekistan', flag: '🇺🇿', capital: 'Tashkent', mainColor: '#0099B5', latitude: 41.3775, longitude: 64.5853,
        intro_fr: "Cœur historique de la route de la soie, l'Ouzbékistan éblouit par ses villes légendaires comme Samarcande, Boukhara et Khiva. Son architecture islamique aux dômes turquoises et ses mosaïques sont parmi les plus belles du monde.",
        continentId: 'ASI',
        currency: 'Sum (UZS)', language: 'Ouzbek', population: 35648100,
        dates: [
            { year: 1924, event: 'Création de la République socialiste soviétique d\'Ouzbékistan' },
            { year: 1991, event: 'Déclaration d\'indépendance à la chute de l\'URSS' },
            { year: 2016, event: 'Décès du dictateur Islom Karimov (début d\'une ouverture politique)' }
        ]
    },
    {
        code: 'PK', name_fr: 'Pakistan', name_en: 'Pakistan', flag: '🇵🇰', capital: 'Islamabad', mainColor: '#115740', latitude: 30.3753, longitude: 69.3451,
        intro_fr: "Pays de montagnes abritant le K2, le Pakistan possède des paysages alpins à couper le souffle au nord et une riche histoire moghole. C'est une terre de contrastes culturels, célèbre pour son hospitalité et sa cuisine épicée.",
        continentId: 'ASI',
        currency: 'Roupie pakistanaise (PKR)', language: 'Ourdou, Anglais', population: 235824862,
        dates: [
            { year: 1947, event: 'Partition de l\'Inde et création du Pakistan (Dominion)' },
            { year: 1956, event: 'Le Pakistan devient la première République islamique au monde' },
            { year: 1971, event: 'Guerre indo-pakistanaise et sécession du Pakistan oriental (Bangladesh)' },
            { year: 1998, event: 'Essais nucléaires en réponse à ceux de l\'Inde' }
        ]
    },
    {
        code: 'PW', name_fr: 'Palaos', name_en: 'Palau', flag: '🇵🇼', capital: 'Ngerulmud', mainColor: '#4AADD6', latitude: 7.5150, longitude: 134.5825,
        intro_fr: "Archipel du Pacifique réputé pour ses îles Chelbacheb en forme de champignons, les Palaos sont un sanctuaire marin. C'est une destination de rêve pour la plongée, connue pour son lac aux méduses inoffensives.",
        continentId: 'OCE',
        currency: 'Dollar américain (USD)', language: 'Paluan, Anglais', population: 18055,
        dates: [
            { year: 1981, event: 'Adoption de la Constitution des Palaos' },
            { year: 1994, event: 'Indépendance totale dans le cadre d\'un traité avec les États-Unis' },
            { year: 2015, event: 'Création de l\'un des plus grands sanctuaires marins au monde' }
        ]
    },
    {
        code: 'PS', name_fr: 'Palestine', name_en: 'Palestine', flag: '🇵🇸', capital: 'Ramallah', mainColor: '#EE2A35', latitude: 31.9522, longitude: 35.2332,
        intro_fr: "Terre chargée d'histoire et de spiritualité, la Palestine abrite des lieux saints majeurs comme Bethléem. Malgré un contexte politique difficile, elle possède une riche culture culinaire et artisanale, et des paysages d'oliviers millénaires.",
        continentId: 'ASI',
        currency: 'Nouveau shekel (ILS)', language: 'Arabe', population: 5043612,
        dates: [
            { year: 1988, event: 'Déclaration symbolique d\'indépendance de l\'État de Palestine' },
            { year: 1993, event: 'Accords d\'Oslo créant l\'Autorité palestinienne' },
            { year: 2012, event: 'Reconnaissance comme État observateur non membre à l\'ONU' }
        ]
    },
    {
        code: 'PA', name_fr: 'Panama', name_en: 'Panama', flag: '🇵🇦', capital: 'Panama City', mainColor: '#DA121A', latitude: 8.5380, longitude: -80.7821,
        intro_fr: "Célèbre pour son canal reliant l'Atlantique et le Pacifique, le Panama est un hub commercial et financier moderne. Au-delà de sa capitale cosmopolite, il offre des jungles tropicales, des îles paradisiaques et une riche biodiversité.",
        continentId: 'AME',
        currency: 'Balboa (PAB), Dollar américain (USD)', language: 'Espagnol', population: 4408581,
        dates: [
            { year: 1903, event: 'Sécession de la Colombie avec l\'appui des États-Unis' },
            { year: 1914, event: 'Inauguration du Canal de Panama' },
            { year: 1989, event: 'Invasion américaine pour renverser le dictateur Manuel Noriega' },
            { year: 1999, event: 'Rétrocession complète du canal sous souveraineté panaméenne' }
        ]
    },
    {
        code: 'PG', name_fr: 'Papouasie-Nouvelle-Guinée', name_en: 'Papua New Guinea', flag: '🇵🇬', capital: 'Port Moresby', mainColor: '#CE1126', latitude: -6.3150, longitude: 143.9555,
        intro_fr: "L'un des pays les plus diversifiés culturellement au monde, avec plus de 800 langues parlées. C'est une terre d'aventure sauvage, de tribus traditionnelles, de forêts impénétrables et de récifs coralliens spectaculaires.",
        continentId: 'OCE',
        currency: 'Kina (PGK)', language: 'Tok Pisin, Hiri Motu, Anglais', population: 10142619,
        dates: [
            { year: 1975, event: 'Indépendance de l\'Australie' },
            { year: 1988, event: 'Début du conflit sécessionniste sur l\'île de Bougainville' },
            { year: 2001, event: 'Accord de paix de Bougainville prévoyant une autonomie' }
        ]
    },
    {
        code: 'PY', name_fr: 'Paraguay', name_en: 'Paraguay', flag: '🇵🇾', capital: 'Asunción', mainColor: '#D52B1E', latitude: -23.4425, longitude: -58.4438,
        intro_fr: "Pays enclavé au cœur de l'Amérique du Sud, le Paraguay est marqué par sa culture bilingue espagnol-guarani. Il est connu pour ses missions jésuites, sa nature sauvage dans le Chaco et son barrage d'Itaipu.",
        continentId: 'AME',
        currency: 'Guarani (PYG)', language: 'Espagnol, Guarani', population: 7306000,
        dates: [
            { year: 1811, event: 'Indépendance vis-à-vis de l\'Espagne' },
            { year: 1864, event: 'Guerre de la Triple-Alliance (dévastation démographique du pays)' },
            { year: 1989, event: 'Chute du dictateur Alfredo Stroessner (au pouvoir depuis 35 ans)' },
            { year: 2012, event: 'Destitution controversée du président Fernando Lugo' }
        ]
    },
    {
        code: 'NL', name_fr: 'Pays-Bas', name_en: 'Netherlands', flag: '🇳🇱', capital: 'Amsterdam', mainColor: '#AE1C28', latitude: 52.1326, longitude: 5.2913,
        intro_fr: "Pays plat conquis sur la mer grâce à ses digues, les Pays-Bas sont célèbres pour leurs champs de tulipes, leurs moulins et leurs canaux. C'est une nation progressiste où le vélo est roi, abritant des villes d'art comme Amsterdam.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Néerlandais', population: 17590672,
        dates: [
            { year: 1581, event: 'Acte de La Haye (déclaration d\'indépendance face à l\'Espagne)' },
            { year: 1602, event: 'Création de la Compagnie néerlandaise des Indes orientales (VOC)' },
            { year: 1953, event: 'Inondation catastrophique menant au Plan Delta (digues)' },
            { year: 2001, event: 'Premier pays au monde à légaliser le mariage homosexuel' }
        ]
    },
    {
        code: 'PE', name_fr: 'Pérou', name_en: 'Peru', flag: '🇵🇪', capital: 'Lima', mainColor: '#D91023', latitude: -9.1900, longitude: -75.0152,
        intro_fr: "Berceau de l'Empire inca, le Pérou abrite le mystérieux Machu Picchu et la ville impériale de Cusco. C'est aussi une destination gastronomique mondiale, offrant une diversité géographique allant de la côte désertique à l'Amazonie.",
        continentId: 'AME',
        currency: 'Sol (PEN)', language: 'Espagnol, Quechua, Aymara', population: 33396698,
        dates: [
            { year: 1532, event: 'Arrivée des conquistadors espagnols et capture de l\'empereur Atahualpa' },
            { year: 1821, event: 'Déclaration d\'indépendance par José de San Martín' },
            { year: 1980, event: 'Début du conflit armé interne avec le Sentier Lumineux' },
            { year: 2000, event: 'Chute du président Alberto Fujimori' }
        ]
    },
    {
        code: 'PH', name_fr: 'Philippines', name_en: 'Philippines', flag: '🇵🇭', capital: 'Manila', mainColor: '#0038A8', latitude: 12.8797, longitude: 121.7740,
        intro_fr: "Archipel de plus de 7 000 îles, les Philippines sont célèbres pour leurs plages paradisiaques et leurs rizières en terrasses. Pays à majorité catholique unique en Asie, il est connu pour l'hospitalité légendaire de ses habitants.",
        continentId: 'ASI',
        currency: 'Peso philippin (PHP)', language: 'Philippin (Tagalog), Anglais', population: 115559009,
        dates: [
            { year: 1521, event: 'Arrivée de Magellan et début de la colonisation espagnole' },
            { year: 1898, event: 'Déclaration d\'indépendance et cession par l\'Espagne aux États-Unis' },
            { year: 1946, event: 'Indépendance totale accordée par les États-Unis' },
            { year: 1986, event: 'Révolution des EDSA chassant le dictateur Ferdinand Marcos' }
        ]
    },
    {
        code: 'PL', name_fr: 'Pologne', name_en: 'Poland', flag: '🇵🇱', capital: 'Warsaw', mainColor: '#DC143C', latitude: 51.9194, longitude: 19.1451,
        intro_fr: "Grand pays d'Europe centrale, la Pologne a su reconstruire son patrimoine après une histoire tourmentée. De la cité médiévale de Cracovie à la modernité de Varsovie, elle offre une riche culture, une cuisine copieuse et de beaux paysages.",
        continentId: 'EUR',
        currency: 'Złoty (PLN)', language: 'Polonais', population: 37728633,
        dates: [
            { year: 966, event: 'Baptême de la Pologne, naissance symbolique de l\'État' },
            { year: 1918, event: 'Restauration de l\'indépendance (Deuxième République)' },
            { year: 1939, event: 'Invasion par l\'Allemagne nazie et l\'URSS (début de la 2nde Guerre mondiale)' },
            { year: 1989, event: 'Victoire de Solidarność aux élections, fin du régime communiste' }
        ]
    },
    {
        code: 'PT', name_fr: 'Portugal', name_en: 'Portugal', flag: '🇵🇹', capital: 'Lisbon', mainColor: '#FF0000', latitude: 39.3999, longitude: -8.2245,
        intro_fr: "Nation d'explorateurs tournée vers l'Atlantique, le Portugal séduit par son climat doux, ses azulejos et sa musique fado. Ses côtes magnifiques en Algarve et ses villes historiques comme Lisbonne et Porto en font une destination prisée.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Portugais', population: 10329506,
        dates: [
            { year: 1143, event: 'Traité de Zamora reconnaissant l\'indépendance du Portugal' },
            { year: 1498, event: 'Vasco de Gama découvre la route maritime vers les Indes' },
            { year: 1974, event: 'Révolution des Œillets, fin de la dictature de l\'Estado Novo' },
            { year: 1986, event: 'Entrée dans la Communauté Économique Européenne' }
        ]
    },
    {
        code: 'QA', name_fr: 'Qatar', name_en: 'Qatar', flag: '🇶🇦', capital: 'Doha', mainColor: '#8D1B3D', latitude: 25.3548, longitude: 51.1839,
        intro_fr: "Petit émirat péninsulaire immensément riche grâce au gaz naturel, le Qatar mise sur le sport et la culture pour rayonner. Doha, sa capitale, est une vitrine d'architecture futuriste et abrite des musées de classe mondiale.",
        continentId: 'ASI',
        currency: 'Riyal qatari (QAR)', language: 'Arabe', population: 2979915,
        dates: [
            { year: 1971, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1995, event: 'Cheikh Hamad ben Khalifa al-Thani prend le pouvoir (début de la modernisation)' },
            { year: 1996, event: 'Lancement de la chaîne de télévision Al Jazeera' },
            { year: 2022, event: 'Premier pays du Moyen-Orient à accueillir la Coupe du Monde de la FIFA' }
        ]
    },
    {
        code: 'DO', name_fr: 'République dominicaine', name_en: 'Dominican Republic', flag: '🇩🇴', capital: 'Santo Domingo', mainColor: '#002D62', latitude: 18.7357, longitude: -70.1627,
        intro_fr: "Destination touristique la plus visitée des Caraïbes, elle est célèbre pour ses stations balnéaires de Punta Cana et ses plages de sable blanc. Elle partage l'île d'Hispaniola avec Haïti et possède un intérieur montagneux et verdoyant.",
        continentId: 'AME',
        currency: 'Peso dominicain (DOP)', language: 'Espagnol', population: 11228821,
        dates: [
            { year: 1844, event: 'Indépendance de la République dominicaine vis-à-vis d\'Haïti' },
            { year: 1961, event: 'Assassinat du dictateur Rafael Trujillo' },
            { year: 1965, event: 'Guerre civile et intervention militaire américaine' }
        ]
    },
    {
        code: 'CZ', name_fr: 'République tchèque', name_en: 'Czech Republic', flag: '🇨🇿', capital: 'Prague', mainColor: '#11457E', latitude: 49.8175, longitude: 15.4730,
        intro_fr: "Au cœur de l'Europe, ce pays est célèbre pour ses châteaux, sa tradition brassicole et ses villes historiques. Prague, la capitale aux cent clochers, est un joyau architectural gothique et baroque préservé.",
        continentId: 'EUR',
        currency: 'Couronne tchèque (CZK)', language: 'Tchèque', population: 10516707,
        dates: [
            { year: 1918, event: 'Création de la Tchécoslovaquie' },
            { year: 1989, event: 'Révolution de Velours et chute du communisme' },
            { year: 1993, event: 'Divorce de Velours, séparation pacifique avec la Slovaquie' },
            { year: 2004, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'RO', name_fr: 'Roumanie', name_en: 'Romania', flag: '🇷🇴', capital: 'Bucharest', mainColor: '#002B7F', latitude: 45.9432, longitude: 24.9668,
        intro_fr: "Pays de légendes abritant la Transylvanie et le château de Dracula, la Roumanie offre des paysages sauvages dans les Carpates. Elle possède aussi le delta du Danube, une réserve de biosphère unique en Europe.",
        continentId: 'EUR',
        currency: 'Leu roumain (RON)', language: 'Roumain', population: 19042455,
        dates: [
            { year: 1859, event: 'Union des principautés de Valachie et Moldavie (fondation de la Roumanie moderne)' },
            { year: 1918, event: 'Création de la Grande Roumanie à la fin de la Première Guerre mondiale' },
            { year: 1989, event: 'Révolution roumaine, exécution du dictateur Nicolae Ceaușescu' },
            { year: 2007, event: 'Adhésion à l\'Union européenne' }
        ]
    },
    {
        code: 'GB', name_fr: 'Royaume-Uni', name_en: 'United Kingdom', flag: '🇬🇧', capital: 'London', mainColor: '#012169', latitude: 55.3781, longitude: -3.4360,
        intro_fr: "Nation insulaire influente composée de quatre nations historiques, le Royaume-Uni mêle tradition royale et culture pop moderne. Londres, sa capitale, est une métropole mondiale cosmopolite riche en monuments emblématiques.",
        continentId: 'EUR',
        currency: 'Livre sterling (GBP)', language: 'Anglais', population: 67326569,
        dates: [
            { year: 1215, event: 'Signature de la Magna Carta limitant le pouvoir royal' },
            { year: 1707, event: 'Actes d\'Union créant le Royaume de Grande-Bretagne' },
            { year: 1922, event: 'Création de l\'État libre d\'Irlande (partition de l\'île d\'Irlande)' },
            { year: 2016, event: 'Référendum sur le Brexit (sortie de l\'UE actée en 2020)' }
        ]
    },
    {
        code: 'RU', name_fr: 'Russie', name_en: 'Russia', flag: '🇷🇺', capital: 'Moscow', mainColor: '#DA291C', latitude: 61.5240, longitude: 105.3188,
        intro_fr: "Plus vaste pays du monde s'étendant sur deux continents, la Russie possède une histoire impériale grandiose et une culture littéraire majeure. De Moscou à la Sibérie, ses paysages et son climat sont d'une diversité extrême.",
        continentId: 'EUR', // Souvent considérée comme à la fois en EUR et ASI, classée ici sous EUR
        currency: 'Rouble russe (RUB)', language: 'Russe', population: 143446060,
        dates: [
            { year: 1917, event: 'Révolution russe et chute de l\'Empire des tsars' },
            { year: 1945, event: 'Victoire sur l\'Allemagne nazie (Grande Guerre patriotique)' },
            { year: 1991, event: 'Dissolution de l\'Union soviétique (URSS) et naissance de la Fédération de Russie' },
            { year: 2022, event: 'Début de l\'invasion à grande échelle de l\'Ukraine' }
        ]
    },
    {
        code: 'RW', name_fr: 'Rwanda', name_en: 'Rwanda', flag: '🇷🇼', capital: 'Kigali', mainColor: '#00A1DE', latitude: -1.9403, longitude: 29.8739,
        intro_fr: "Surnommé le 'pays des mille collines', le Rwanda est un modèle de propreté et de développement en Afrique. Célèbre pour ses parcs nationaux abritant les gorilles de montagne, il a su se reconstruire après une histoire tragique.",
        continentId: 'AFR',
        currency: 'Franc rwandais (RWF)', language: 'Kinyarwanda, Français, Anglais, Swahili', population: 13600464,
        dates: [
            { year: 1962, event: 'Indépendance vis-à-vis de la tutelle belge' },
            { year: 1990, event: 'Début de la guerre civile rwandaise par le FPR' },
            { year: 1994, event: 'Génocide perpétré contre les Tutsis (plus de 800 000 morts)' },
            { year: 2003, event: 'Adoption d\'une nouvelle Constitution et élection de Paul Kagame' }
        ]
    },
    {
        code: 'KN', name_fr: 'Saint-Christophe-et-Niévès', name_en: 'Saint Kitts and Nevis', flag: '🇰🇳', capital: 'Basseterre', mainColor: '#009E49', latitude: 17.3578, longitude: -62.7830,
        intro_fr: "Petit État insulaire des Caraïbes formé de deux îles, il est connu pour ses anciennes plantations de sucre et son chemin de fer panoramique. C'est une destination paisible offrant plages, randonnées et un cadre tropical luxuriant.",
        continentId: 'AME',
        currency: 'Dollar des Caraïbes orientales (XCD)', language: 'Anglais', population: 47606,
        dates: [
            { year: 1493, event: 'Découverte des îles par Christophe Colomb' },
            { year: 1623, event: 'Fondation de la première colonie britannique dans les Caraïbes' },
            { year: 1983, event: 'Indépendance vis-à-vis du Royaume-Uni' }
        ]
    },
    {
        code: 'SM', name_fr: 'Saint-Marin', name_en: 'San Marino', flag: '🇸🇲', capital: 'San Marino', mainColor: '#5EB6E4', latitude: 43.9424, longitude: 12.4578,
        intro_fr: "Enclavée en Italie, c'est la plus ancienne république du monde encore existante. Perchée sur le mont Titano, cette micro-nation offre des vues spectaculaires et une architecture médiévale parfaitement préservée.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Italien', population: 33660,
        dates: [
            { year: 301, event: 'Fondation légendaire de la République par Saint Marin' },
            { year: 1631, event: 'Reconnaissance de l\'indépendance par la Papauté' },
            { year: 1862, event: 'Traité d\'amitié avec la nouvelle nation italienne garantissant son indépendance' },
            { year: 1992, event: 'Adhésion à l\'Organisation des Nations Unies' }
        ]
    },
    {
        code: 'VC', name_fr: 'Saint-Vincent-et-les-Grenadines', name_en: 'Saint Vincent and the Grenadines', flag: '🇻🇨', capital: 'Kingstown', mainColor: '#009F4D', latitude: 12.9843, longitude: -61.2872,
        intro_fr: "Cet archipel des Caraïbes est un paradis pour la navigation de plaisance avec ses eaux turquoise et ses îles exclusives comme Moustique. Il abrite également le volcan actif de la Soufrière sur son île principale.",
        continentId: 'AME',
        currency: 'Dollar des Caraïbes orientales (XCD)', language: 'Anglais', population: 104332,
        dates: [
            { year: 1763, event: 'Cession de l\'île au Royaume-Uni par le Traité de Paris' },
            { year: 1979, event: 'Indépendance au sein du Commonwealth' },
            { year: 2021, event: 'Éruption majeure du volcan La Soufrière entraînant de vastes évacuations' }
        ]
    },
    {
        code: 'LC', name_fr: 'Sainte-Lucie', name_en: 'Saint Lucia', flag: '🇱🇨', capital: 'Castries', mainColor: '#66CCFF', latitude: 13.9094, longitude: -60.9789,
        intro_fr: "Reconnaissable à ses deux pics volcaniques emblématiques, les Pitons, Sainte-Lucie est une île à la beauté spectaculaire. Elle offre des sources chaudes, des forêts tropicales et des plages de rêve pour les voyageurs.",
        continentId: 'AME',
        currency: 'Dollar des Caraïbes orientales (XCD)', language: 'Anglais, Créole saint-lucien', population: 184100,
        dates: [
            { year: 1814, event: 'Les Britanniques prennent le contrôle définitif de l\'île après des années de conflit avec la France' },
            { year: 1979, event: 'Indépendance et adhésion à l\'Organisation de l\'aviation civile internationale' }
        ]
    },
    {
        code: 'SB', name_fr: 'Îles Salomon', name_en: 'Solomon Islands', flag: '🇸🇧', capital: 'Honiara', mainColor: '#0051BA', latitude: -9.6457, longitude: 160.1562,
        intro_fr: "Archipel de la Mélanésie chargé d'histoire de la Seconde Guerre mondiale, c'est une destination sauvage et peu fréquentée. Il offre une plongée de classe mondiale et une culture tribale authentique.",
        continentId: 'OCE',
        currency: 'Dollar des Îles Salomon (SBD)', language: 'Anglais, Pijin', population: 724273,
        dates: [
            { year: 1568, event: 'L\'explorateur espagnol Álvaro de Mendaña découvre l\'archipel' },
            { year: 1942, event: 'Bataille de Guadalcanal (tournant de la guerre du Pacifique)' },
            { year: 1978, event: 'Indépendance du Royaume-Uni' },
            { year: 2003, event: 'Déploiement de la mission d\'assistance régionale RAMSI pour restaurer l\'ordre' }
        ]
    },
    {
        code: 'SV', name_fr: 'Salvador', name_en: 'El Salvador', flag: '🇸🇻', capital: 'San Salvador', mainColor: '#0F47AF', latitude: 13.7942, longitude: -88.8965,
        intro_fr: "Plus petit pays d'Amérique centrale, le Salvador est une terre de volcans, de lacs et de plages de surf réputées. Il cherche à développer son tourisme en mettant en avant sa beauté naturelle et sa culture chaleureuse.",
        continentId: 'AME',
        currency: 'Dollar américain (USD), Bitcoin (BTC)', language: 'Espagnol', population: 6336392,
        dates: [
            { year: 1821, event: 'Indépendance de l\'Espagne' },
            { year: 1980, event: 'Début d\'une guerre civile meurtrière de douze ans' },
            { year: 1992, event: 'Signature des accords de paix de Chapultepec' },
            { year: 2021, event: 'Le pays devient le premier au monde à adopter le Bitcoin comme monnaie légale' }
        ]
    },
    {
        code: 'WS', name_fr: 'Samoa', name_en: 'Samoa', flag: '🇼🇸', capital: 'Apia', mainColor: '#CE1126', latitude: -13.7590, longitude: -172.1046,
        intro_fr: "Cœur de la Polynésie traditionnelle, les Samoa sont des îles volcaniques d'une beauté brute avec des cascades et des piscines naturelles. La culture locale, le Fa'a Samoa, y reste très forte et guide la vie quotidienne.",
        continentId: 'OCE',
        currency: 'Tala (WST)', language: 'Samoan, Anglais', population: 205557,
        dates: [
            { year: 1899, event: 'Traité tripartite divisant l\'archipel entre l\'Allemagne et les États-Unis' },
            { year: 1962, event: 'Indépendance de la Nouvelle-Zélande (premier pays polynésien indépendant)' },
            { year: 2009, event: 'Tsunami dévastateur frappant la côte sud' }
        ]
    },
    {
        code: 'ST', name_fr: 'Sao Tomé-et-Principe', name_en: 'São Tomé and Príncipe', flag: '🇸🇹', capital: 'São Tomé', mainColor: '#12AD2B', latitude: 0.1864, longitude: 6.6131,
        intro_fr: "Petit archipel volcanique au large de l'Afrique centrale, c'est un paradis écologique surnommé 'l'île chocolat'. Il offre une nature exubérante, des plages désertes et une atmosphère paisible loin du tourisme de masse.",
        continentId: 'AFR',
        currency: 'Dobra (STN)', language: 'Portugais', population: 227380,
        dates: [
            { year: 1470, event: 'Découverte des îles inhabitées par les navigateurs portugais' },
            { year: 1975, event: 'Indépendance vis-à-vis du Portugal après la Révolution des Œillets' },
            { year: 1990, event: 'Transition pacifique vers une démocratie multipartite' }
        ]
    },
    {
        code: 'SN', name_fr: 'Sénégal', name_en: 'Senegal', flag: '🇸🇳', capital: 'Dakar', mainColor: '#00853F', latitude: 14.4974, longitude: -14.4524,
        intro_fr: "Pays de la 'Teranga' (hospitalité), le Sénégal est une porte d'entrée majeure de l'Afrique de l'Ouest. Dakar, sa capitale vibrante, est un centre culturel important, tandis que le pays offre plages, désert et mangroves.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français, Wolof, Pulaar', population: 17316449,
        dates: [
            { year: 1960, event: 'Indépendance de la France sous la présidence de Léopold Sédar Senghor' },
            { year: 1982, event: 'Création de la confédération de Sénégambie (dissoute en 1989)' },
            { year: 2000, event: 'Première alternance politique démocratique avec l\'élection d\'Abdoulaye Wade' }
        ]
    },
    {
        code: 'RS', name_fr: 'Serbie', name_en: 'Serbia', flag: '🇷🇸', capital: 'Belgrade', mainColor: '#C6363C', latitude: 44.0165, longitude: 21.0059,
        intro_fr: "Au cœur des Balkans, la Serbie est un pays de monastères orthodoxes, de montagnes et de vie nocturne animée, notamment à Belgrade. Traversée par le Danube, elle possède une histoire riche et une gastronomie copieuse.",
        continentId: 'EUR',
        currency: 'Dinar serbe (RSD)', language: 'Serbe', population: 6690626,
        dates: [
            { year: 1878, event: 'Reconnaissance de l\'indépendance au Congrès de Berlin' },
            { year: 1918, event: 'Création du Royaume des Serbes, Croates et Slovènes (future Yougoslavie)' },
            { year: 1999, event: 'Bombardements de l\'OTAN lors de la guerre du Kosovo' },
            { year: 2006, event: 'Séparation avec le Monténégro, la Serbie redevient un État souverain indépendant' }
        ]
    },
    {
        code: 'SC', name_fr: 'Seychelles', name_en: 'Seychelles', flag: '🇸🇨', capital: 'Victoria', mainColor: '#003D88', latitude: -4.6796, longitude: 55.4920,
        intro_fr: "Archipel de l'océan Indien célèbre pour ses blocs de granit sculptés et ses plages parmi les plus belles du monde. C'est une destination de luxe qui abrite une faune unique, comme les tortues géantes d'Aldabra.",
        continentId: 'AFR',
        currency: 'Roupie seychelloise (SCR)', language: 'Créole seychellois, Anglais, Français', population: 100060,
        dates: [
            { year: 1756, event: 'La France prend officiellement possession des îles' },
            { year: 1814, event: 'Cession de l\'archipel au Royaume-Uni (Traité de Paris)' },
            { year: 1976, event: 'Indépendance et fondation de la République' },
            { year: 1993, event: 'Adoption d\'une nouvelle constitution restaurant le multipartisme' }
        ]
    },
    {
        code: 'SL', name_fr: 'Sierra Leone', name_en: 'Sierra Leone', flag: '🇸🇱', capital: 'Freetown', mainColor: '#1EB53A', latitude: 8.4606, longitude: -11.7799,
        intro_fr: "Pays d'Afrique de l'Ouest aux plages tropicales magnifiques, la Sierra Leone se reconstruit après un passé difficile. Riche en diamants et en ressources naturelles, elle offre un accueil chaleureux et une nature préservée.",
        continentId: 'AFR',
        currency: 'Leone (SLE)', language: 'Anglais, Krio', population: 8605718,
        dates: [
            { year: 1787, event: 'Fondation de Freetown pour accueillir des esclaves affranchis' },
            { year: 1961, event: 'Indépendance vis-à-vis du Royaume-Uni' },
            { year: 1991, event: 'Début de la décennie de guerre civile brutale' },
            { year: 2002, event: 'Fin officielle de la guerre civile avec l\'aide des troupes britanniques et de l\'ONU' }
        ]
    },
    {
        code: 'SG', name_fr: 'Singapour', name_en: 'Singapore', flag: '🇸🇬', capital: 'Singapore', mainColor: '#EF3340', latitude: 1.3521, longitude: 103.8198,
        intro_fr: "Cité-État insulaire ultra-moderne, Singapour est un carrefour financier et culturel majeur d'Asie. Elle est célèbre pour sa propreté, sa cuisine de rue (hawker centers) et ses jardins futuristes comme Gardens by the Bay.",
        continentId: 'ASI',
        currency: 'Dollar de Singapour (SGD)', language: 'Anglais, Malais, Mandarin, Tamoul', population: 5637022,
        dates: [
            { year: 1819, event: 'Fondation d\'un comptoir commercial britannique par Stamford Raffles' },
            { year: 1963, event: 'Indépendance du Royaume-Uni en rejoignant la Fédération de Malaisie' },
            { year: 1965, event: 'Expulsion de la Fédération et indépendance de la République de Singapour' }
        ]
    },
    {
        code: 'SK', name_fr: 'Slovaquie', name_en: 'Slovakia', flag: '🇸🇰', capital: 'Bratislava', mainColor: '#0B4EA2', latitude: 48.6690, longitude: 19.6990,
        intro_fr: "Au cœur de l'Europe, la Slovaquie est un pays de montagnes dominé par la chaîne des Hautes Tatras. Elle possède la plus forte concentration de châteaux au monde par habitant et une capitale charmante sur le Danube.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Slovaque', population: 5434712,
        dates: [
            { year: 1918, event: 'Création de la Tchécoslovaquie' },
            { year: 1989, event: 'Révolution de Velours, mettant fin au régime communiste' },
            { year: 1993, event: 'Divorce de Velours et création de la République slovaque indépendante' },
            { year: 2004, event: 'Adhésion à l\'Union européenne et à l\'OTAN' }
        ]
    },
    {
        code: 'SI', name_fr: 'Slovénie', name_en: 'Slovenia', flag: '🇸🇮', capital: 'Ljubljana', mainColor: '#005CE6', latitude: 46.1512, longitude: 14.9955,
        intro_fr: "Petit pays alpin vert et durable, la Slovénie offre une diversité incroyable, des sommets enneigés à la côte adriatique. Elle est célèbre pour le lac de Bled et ses grottes souterraines spectaculaires.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Slovène', population: 2119844,
        dates: [
            { year: 1918, event: 'Intégration au futur Royaume de Yougoslavie' },
            { year: 1991, event: 'Déclaration d\'indépendance et victoire lors de la guerre des Dix Jours' },
            { year: 2004, event: 'Adhésion à l\'Union européenne (premier pays de l\'ex-Yougoslavie à l\'intégrer)' }
        ]
    },
    {
        code: 'SO', name_fr: 'Somalie', name_en: 'Somalia', flag: '🇸🇴', capital: 'Mogadishu', mainColor: '#4189DD', latitude: 5.1521, longitude: 46.1996,
        intro_fr: "Située sur la Corne de l'Afrique, la Somalie possède le plus long littoral du continent. Terre de poètes et de commerçants, elle tente de retrouver la stabilité après des décennies de conflit.",
        continentId: 'AFR',
        currency: 'Shilling somalien (SOS)', language: 'Somali, Arabe', population: 17597511,
        dates: [
            { year: 1960, event: 'Indépendance et unification de la Somalie britannique et italienne' },
            { year: 1969, event: 'Coup d\'État menant à la dictature de Siad Barre' },
            { year: 1991, event: 'Chute de Siad Barre, début de la guerre civile et sécession du Somaliland' },
            { year: 2012, event: 'Mise en place d\'un gouvernement fédéral reconnu internationalement' }
        ]
    },
    {
        code: 'SD', name_fr: 'Soudan', name_en: 'Sudan', flag: '🇸🇩', capital: 'Khartoum', mainColor: '#007229', latitude: 12.8628, longitude: 30.2176,
        intro_fr: "Point de rencontre du Nil Bleu et du Nil Blanc, le Soudan abrite plus de pyramides que l'Égypte, vestiges du royaume de Koush. C'est un vaste pays de déserts et d'histoire ancienne, marqué par une diversité ethnique complexe.",
        continentId: 'AFR',
        currency: 'Livre soudanaise (SDG)', language: 'Arabe, Anglais', population: 46874204,
        dates: [
            { year: 1956, event: 'Indépendance vis-à-vis du condominium anglo-égyptien' },
            { year: 1989, event: 'Coup d\'État portant Omar el-Béchir au pouvoir' },
            { year: 2011, event: 'Indépendance du Soudan du Sud après un référendum' },
            { year: 2019, event: 'Révolution soudanaise et destitution d\'Omar el-Béchir' },
            { year: 2023, event: 'Début d\'un nouveau conflit meurtrier entre factions militaires' }
        ]
    },
    {
        code: 'SS', name_fr: 'Soudan du Sud', name_en: 'South Sudan', flag: '🇸🇸', capital: 'Juba', mainColor: '#000000', latitude: 6.8770, longitude: 31.3070,
        intro_fr: "Plus jeune nation du monde (indépendante en 2011), le Soudan du Sud possède de vastes zones humides et une riche faune sauvage. Le pays lutte pour sa stabilité et son développement malgré d'importantes ressources pétrolières.",
        continentId: 'AFR',
        currency: 'Livre sud-soudanaise (SSP)', language: 'Anglais', population: 10913164,
        dates: [
            { year: 2005, event: 'Accord de paix global avec Khartoum accordant l\'autonomie au Sud' },
            { year: 2011, event: 'Indépendance officielle, devenant le plus jeune État membre de l\'ONU' },
            { year: 2013, event: 'Début d\'une guerre civile dévastatrice entre les partisans du président et du vice-président' },
            { year: 2018, event: 'Signature d\'un accord de paix revitalisé pour former un gouvernement d\'union' }
        ]
    },
    {
        code: 'LK', name_fr: 'Sri Lanka', name_en: 'Sri Lanka', flag: '🇱🇰', capital: 'Colombo', mainColor: '#8D153A', latitude: 7.8731, longitude: 80.7718,
        intro_fr: "Île en forme de larme au sud de l'Inde, le Sri Lanka offre une diversité incroyable : plages, plantations de thé, safaris et temples anciens. C'est une destination riche en histoire et en spiritualité bouddhiste.",
        continentId: 'ASI',
        currency: 'Roupie srilankaise (LKR)', language: 'Cingalais, Tamoul', population: 21832143,
        dates: [
            { year: 1948, event: 'Indépendance du Royaume-Uni sous le nom de Ceylan' },
            { year: 1972, event: 'Le pays devient une République et prend le nom de Sri Lanka' },
            { year: 1983, event: 'Début de la guerre civile avec les Tigres tamouls' },
            { year: 2009, event: 'Écrasement de la rébellion et fin de la guerre civile' },
            { year: 2022, event: 'Crise économique sans précédent menant à la fuite du président' }
        ]
    },
    {
        code: 'SE', name_fr: 'Suède', name_en: 'Sweden', flag: '🇸🇪', capital: 'Stockholm', mainColor: '#006AA7', latitude: 60.1282, longitude: 18.6435,
        intro_fr: "Plus grand pays de Scandinavie, la Suède est connue pour ses vastes forêts, ses archipels et son modèle social progressiste. C'est une nation innovante, berceau du prix Nobel, de la pop music et du design fonctionnel.",
        continentId: 'EUR',
        currency: 'Couronne suédoise (SEK)', language: 'Suédois', population: 10481937,
        dates: [
            { year: 1523, event: 'Élection de Gustave Vasa, marquant l\'indépendance de l\'Union de Kalmar' },
            { year: 1814, event: 'Union personnelle avec la Norvège (et dernière guerre de la Suède)' },
            { year: 1995, event: 'Adhésion à l\'Union européenne' },
            { year: 2024, event: 'Adhésion officielle à l\'OTAN, mettant fin à des décennies de non-alignement' }
        ]
    },
    {
        code: 'CH', name_fr: 'Suisse', name_en: 'Switzerland', flag: '🇨🇭', capital: 'Bern', mainColor: '#D52B1E', latitude: 46.8182, longitude: 8.2275,
        intro_fr: "Célèbre pour sa neutralité, ses banques et son chocolat, la Suisse est un pays alpin aux paysages époustouflants. Elle se distingue par sa démocratie directe et sa diversité linguistique (allemand, français, italien, romanche).",
        continentId: 'EUR',
        currency: 'Franc suisse (CHF)', language: 'Allemand, Français, Italien, Romanche', population: 8769741,
        dates: [
            { year: 1291, event: 'Pacte fédéral fondateur (Serment du Grütli)' },
            { year: 1815, event: 'Congrès de Vienne reconnaissant la neutralité perpétuelle du pays' },
            { year: 1848, event: 'Adoption de la Constitution fédérale transformant le pays en État moderne' },
            { year: 2002, event: 'Adhésion à l\'Organisation des Nations Unies par votation populaire' }
        ]
    },
    {
        code: 'SR', name_fr: 'Suriname', name_en: 'Suriname', flag: '🇸🇷', capital: 'Paramaribo', mainColor: '#377E3F', latitude: 3.9193, longitude: -56.0278,
        intro_fr: "Ancienne colonie néerlandaise en Amérique du Sud, le Suriname est couvert presque entièrement par la jungle amazonienne. C'est l'un des pays les plus ethniquement diversifiés de la région, mélangeant cultures indienne, africaine, javanaise et indigène.",
        continentId: 'AME',
        currency: 'Dollar surinamais (SRD)', language: 'Néerlandais', population: 618040,
        dates: [
            { year: 1667, event: 'Traité de Breda (les Pays-Bas cèdent la Nouvelle-Néerlande contre le Suriname)' },
            { year: 1975, event: 'Indépendance vis-à-vis des Pays-Bas' },
            { year: 1980, event: 'Coup d\'État militaire mené par Dési Bouterse' },
            { year: 1991, event: 'Restauration du régime civil démocratique' }
        ]
    },
    {
        code: 'SZ', name_fr: 'Eswatini (Swaziland)', name_en: 'Eswatini', flag: '🇸🇿', capital: 'Mbabane', mainColor: '#3E5EB9', latitude: -26.5225, longitude: 31.4659,
        intro_fr: "Dernière monarchie absolue d'Afrique, ce petit pays enclavé est connu pour ses traditions culturelles vivantes comme la danse des roseaux. Il offre des paysages vallonnés et des réserves naturelles abritant les 'Big Five'.",
        continentId: 'AFR',
        currency: 'Lilangeni (SZL)', language: 'Swati, Anglais', population: 1201670,
        dates: [
            { year: 1968, event: 'Indépendance du Royaume-Uni sous le nom de Swaziland' },
            { year: 1973, event: 'Le roi Sobhuza II abroge la constitution et instaure la monarchie absolue' },
            { year: 2018, event: 'Le roi Mswati III change officiellement le nom du pays en Eswatini' }
        ]
    },
    {
        code: 'SY', name_fr: 'Syrie', name_en: 'Syria', flag: '🇸🇾', capital: 'Damascus', mainColor: '#CE1126', latitude: 34.8021, longitude: 38.9968,
        intro_fr: "Abritant Damas et Alep, parmi les plus vieilles villes habitées au monde, la Syrie possède un patrimoine historique inestimable. Le pays a été profondément marqué par une longue guerre civile qui a dévasté ses trésors et sa population.",
        continentId: 'ASI',
        currency: 'Livre syrienne (SYP)', language: 'Arabe', population: 22125249,
        dates: [
            { year: 1946, event: 'Indépendance et retrait définitif des troupes françaises' },
            { year: 1970, event: 'Coup d\'État portant Hafez al-Assad au pouvoir' },
            { year: 2000, event: 'Mort d\'Hafez al-Assad, son fils Bachar lui succède' },
            { year: 2011, event: 'Début du Printemps arabe syrien qui dégénère en une vaste guerre civile' }
        ]
    },
    {
        code: 'TJ', name_fr: 'Tadjikistan', name_en: 'Tajikistan', flag: '🇹🇯', capital: 'Dushanbe', mainColor: '#CC0000', latitude: 38.8610, longitude: 71.2761,
        intro_fr: "Pays le plus montagneux d'Asie centrale, le Tadjikistan est dominé par la chaîne du Pamir, le 'toit du monde'. De culture persane, il offre des paysages sauvages spectaculaires pour les aventuriers.",
        continentId: 'ASI',
        currency: 'Somoni (TJS)', language: 'Tadjik', population: 9952787,
        dates: [
            { year: 1929, event: 'Création de la République socialiste soviétique du Tadjikistan' },
            { year: 1991, event: 'Déclaration d\'indépendance suite à la dislocation de l\'URSS' },
            { year: 1992, event: 'Début de la guerre civile opposant le gouvernement à l\'opposition unie' },
            { year: 1997, event: 'Accords de paix mettant fin à la guerre civile' }
        ]
    },
    {
        code: 'TW', name_fr: 'Taïwan', name_en: 'Taiwan', flag: '🇹🇼', capital: 'Taipei', mainColor: '#FE0000', latitude: 23.6978, longitude: 120.9605,
        intro_fr: "Île à la pointe de la technologie mondiale, Taïwan combine villes futuristes, marchés de nuit animés et montagnes verdoyantes. C'est une démocratie dynamique qui préserve également une riche culture traditionnelle chinoise et aborigène.",
        continentId: 'ASI',
        currency: 'Nouveau dollar de Taïwan (TWD)', language: 'Mandarin, Taïwanais, Hakka', population: 23893394,
        dates: [
            { year: 1895, event: 'Cession de l\'île au Japon après la guerre sino-japonaise' },
            { year: 1949, event: 'Repli du gouvernement de la République de Chine (KMT) sur l\'île après sa défaite' },
            { year: 1987, event: 'Levée de la loi martiale, ouvrant la voie à la démocratisation' },
            { year: 1996, event: 'Première élection présidentielle au suffrage universel direct' }
        ]
    },
    {
        code: 'TZ', name_fr: 'Tanzanie', name_en: 'Tanzania', flag: '🇹🇿', capital: 'Dodoma', mainColor: '#1EB53A', latitude: -6.3690, longitude: 34.8888,
        intro_fr: "Destination mythique d'Afrique de l'Est, la Tanzanie abrite le Kilimandjaro, plus haut sommet d'Afrique, et les plaines infinies du Serengeti. Au large, l'archipel de Zanzibar offre une histoire d'épices et des plages paradisiaques.",
        continentId: 'AFR',
        currency: 'Shilling tanzanien (TZS)', language: 'Swahili, Anglais', population: 65497748,
        dates: [
            { year: 1961, event: 'Indépendance du Tanganyika' },
            { year: 1963, event: 'Indépendance de Zanzibar' },
            { year: 1964, event: 'Union du Tanganyika et de Zanzibar pour former la Tanzanie' },
            { year: 1992, event: 'Abolition du système à parti unique et instauration du multipartisme' }
        ]
    },
    {
        code: 'TD', name_fr: 'Tchad', name_en: 'Chad', flag: '🇹🇩', capital: 'N\'Djamena', mainColor: '#002664', latitude: 15.4542, longitude: 18.7322,
        intro_fr: "Vaste pays d'Afrique centrale sans accès à la mer, le Tchad s'étend du désert du Sahara au nord aux savanes du sud. Il abrite le lac Tchad et le massif du Tibesti, offrant des paysages désertiques spectaculaires.",
        continentId: 'AFR',
        currency: 'Franc CFA (XAF)', language: 'Français, Arabe', population: 17723315,
        dates: [
            { year: 1960, event: 'Indépendance de la France' },
            { year: 1979, event: 'Début d\'une longue guerre civile et intervention libyenne' },
            { year: 1990, event: 'Prise de pouvoir par Idriss Déby Itno' },
            { year: 2021, event: 'Décès d\'Idriss Déby au front, transition militaire dirigée par son fils' }
        ]
    },
    {
        code: 'TH', name_fr: 'Thaïlande', name_en: 'Thailand', flag: '🇹🇭', capital: 'Bangkok', mainColor: '#2D2A4A', latitude: 15.8700, longitude: 100.9925,
        intro_fr: "Surnommé le 'Pays du Sourire', la Thaïlande est une destination touristique majeure pour ses temples bouddhistes, sa cuisine de rue et ses îles tropicales. Bangkok, sa capitale, est une mégalopole vibrante et contrastée.",
        continentId: 'ASI',
        currency: 'Baht (THB)', language: 'Thaï', population: 71697030,
        dates: [
            { year: 1932, event: 'Révolution pacifique mettant fin à la monarchie absolue du Siam' },
            { year: 1939, event: 'Le Siam est officiellement rebaptisé Thaïlande' },
            { year: 1997, event: 'Épicentre de la crise financière asiatique' },
            { year: 2014, event: 'Coup d\'État militaire (le pays a connu plus d\'une douzaine de putschs réussis)' }
        ]
    },
    {
        code: 'TL', name_fr: 'Timor oriental', name_en: 'Timor-Leste', flag: '🇹🇱', capital: 'Dili', mainColor: '#DC241F', latitude: -8.8742, longitude: 125.7275,
        intro_fr: "Jeune nation d'Asie du Sud-Est, le Timor oriental possède un héritage portugais unique dans la région. C'est une destination émergente offrant des récifs coralliens intacts et des paysages montagneux accidentés.",
        continentId: 'ASI',
        currency: 'Dollar américain (USD)', language: 'Tétoum, Portugais', population: 1341296,
        dates: [
            { year: 1975, event: 'Déclaration d\'indépendance suivie de l\'invasion par l\'Indonésie' },
            { year: 1999, event: 'Référendum d\'autodétermination soutenu par l\'ONU (violences massives)' },
            { year: 2002, event: 'Restauration officielle de l\'indépendance' }
        ]
    },
    {
        code: 'TG', name_fr: 'Togo', name_en: 'Togo', flag: '🇹🇬', capital: 'Lomé', mainColor: '#006A4E', latitude: 8.6195, longitude: 0.8248,
        intro_fr: "Mince bande de terre en Afrique de l'Ouest, le Togo offre une grande diversité de paysages, des plages de cocotiers aux collines verdoyantes. Lomé, sa capitale, est célèbre pour son grand marché et ses féticheurs.",
        continentId: 'AFR',
        currency: 'Franc CFA (XOF)', language: 'Français', population: 8848699,
        dates: [
            { year: 1960, event: 'Indépendance de la tutelle française' },
            { year: 1967, event: 'Coup d\'État portant Gnassingbé Eyadéma au pouvoir (règne de 38 ans)' },
            { year: 2005, event: 'Décès d\'Eyadéma, son fils Faure Gnassingbé lui succède dans un climat de violence' }
        ]
    },
    {
        code: 'TO', name_fr: 'Tonga', name_en: 'Tonga', flag: '🇹🇴', capital: 'Nuku\'alofa', mainColor: '#C10000', latitude: -21.1790, longitude: -175.1982,
        intro_fr: "Seule monarchie du Pacifique à n'avoir jamais été colonisée, les Tonga conservent des traditions polynésiennes authentiques. C'est l'un des rares endroits au monde où l'on peut nager avec les baleines à bosse.",
        continentId: 'OCE',
        currency: 'Paʻanga (TOP)', language: 'Tongan, Anglais', population: 106858,
        dates: [
            { year: 1845, event: 'Unification des îles sous le roi George Tupou Ier' },
            { year: 1970, event: 'Fin du protectorat britannique, le pays rejoint le Commonwealth' },
            { year: 2010, event: 'Réformes constitutionnelles limitant le pouvoir royal (vers la démocratie)' },
            { year: 2022, event: 'Éruption historique du volcan Hunga Tonga-Hunga Ha\'apai' }
        ]
    },
    {
        code: 'TT', name_fr: 'Trinité-et-Tobago', name_en: 'Trinidad and Tobago', flag: '🇹🇹', capital: 'Port of Spain', mainColor: '#CE1126', latitude: 10.6918, longitude: -61.2225,
        intro_fr: "Nation la plus méridionale des Caraïbes, elle est célèbre pour son carnaval spectaculaire et son invention du steelpan. Riche en pétrole et gaz, elle offre aussi une biodiversité exceptionnelle, notamment pour l'observation des oiseaux.",
        continentId: 'AME',
        currency: 'Dollar trinidadien (TTD)', language: 'Anglais', population: 1531044,
        dates: [
            { year: 1889, event: 'Les Britanniques unissent les îles de Trinité et Tobago en une seule colonie' },
            { year: 1962, event: 'Indépendance de l\'Empire britannique' },
            { year: 1976, event: 'Le pays devient une République' }
        ]
    },
    {
        code: 'TN', name_fr: 'Tunisie', name_en: 'Tunisia', flag: '🇹🇳', capital: 'Tunis', mainColor: '#E70013', latitude: 33.8869, longitude: 9.5375,
        intro_fr: "Pays le plus septentrional d'Afrique, la Tunisie mêle plages méditerranéennes, oasis du Sahara et ruines romaines comme Carthage. C'est une destination accueillante à l'histoire riche et à l'architecture aux couleurs bleu et blanc.",
        continentId: 'AFR',
        currency: 'Dinar tunisien (TND)', language: 'Arabe', population: 12356117,
        dates: [
            { year: 1956, event: 'Indépendance vis-à-vis de la France' },
            { year: 1957, event: 'Abolition de la monarchie, proclamation de la République (Habib Bourguiba)' },
            { year: 1987, event: 'Coup d\'État médical de Zine el-Abidine Ben Ali' },
            { year: 2011, event: 'Révolution de Jasmin, déclenchement du Printemps arabe et fuite de Ben Ali' }
        ]
    },
    {
        code: 'TM', name_fr: 'Turkménistan', name_en: 'Turkmenistan', flag: '🇹🇲', capital: 'Ashgabat', mainColor: '#28974E', latitude: 38.9697, longitude: 59.5563,
        intro_fr: "Pays mystérieux d'Asie centrale couvert par le désert du Karakoum, il est connu pour ses réserves de gaz et le cratère en feu de Darvaza. Sa capitale, Achgabat, est célèbre pour son architecture grandiose en marbre blanc.",
        continentId: 'ASI',
        currency: 'Manat turkmène (TMT)', language: 'Turkmène', population: 6430770,
        dates: [
            { year: 1924, event: 'Intégration à l\'Union soviétique (RSS du Turkménistan)' },
            { year: 1991, event: 'Indépendance sous le règne autoritaire de Saparmourat Niazov' },
            { year: 1995, event: 'Reconnaissance de la neutralité permanente du pays par l\'ONU' }
        ]
    },
    {
        code: 'TR', name_fr: 'Turquie', name_en: 'Turkey', flag: '🇹🇷', capital: 'Ankara', mainColor: '#E30A17', latitude: 38.9637, longitude: 35.2433,
        intro_fr: "Pont entre l'Europe et l'Asie, la Turquie possède une histoire immense marquée par les empires byzantin et ottoman. D'Istanbul à la Cappadoce, elle offre une richesse culturelle, culinaire et paysagère exceptionnelle.",
        continentId: 'ASI', // Transcontinental, classé Asie pour cette liste
        currency: 'Livre turque (TRY)', language: 'Turc', population: 85341241,
        dates: [
            { year: 1923, event: 'Fondation de la République de Turquie par Mustafa Kemal Atatürk' },
            { year: 1952, event: 'Adhésion à l\'OTAN' },
            { year: 1974, event: 'Intervention militaire au nord de Chypre' },
            { year: 2016, event: 'Tentative de coup d\'État avortée' }
        ]
    },
    {
        code: 'TV', name_fr: 'Tuvalu', name_en: 'Tuvalu', flag: '🇹🇻', capital: 'Funafuti', mainColor: '#5B96D7', latitude: -7.1095, longitude: 177.6493,
        intro_fr: "L'un des plus petits et des plus isolés pays du monde, Tuvalu est un archipel de minces atolls coralliens dans le Pacifique. Menacé par la montée des océans, il symbolise la fragilité face au changement climatique.",
        continentId: 'OCE',
        currency: 'Dollar tuvaluan (TVD), Dollar australien (AUD)', language: 'Tuvaluan, Anglais', population: 11312,
        dates: [
            { year: 1978, event: 'Indépendance du Royaume-Uni (anciennement Îles Ellice)' },
            { year: 2000, event: 'Adhésion à l\'Organisation des Nations Unies' },
            { year: 2023, event: 'Traité historique avec l\'Australie offrant asile climatique à ses citoyens' }
        ]
    },
    {
        code: 'UA', name_fr: 'Ukraine', name_en: 'Ukraine', flag: '🇺🇦', capital: 'Kyiv', mainColor: '#0057B8', latitude: 48.3794, longitude: 31.1656,
        intro_fr: "Vaste pays d'Europe de l'Est, l'Ukraine est connue pour ses terres agricoles fertiles, ses églises orthodoxes à bulbes dorés et sa culture slave. Elle lutte courageusement pour préserver sa souveraineté et son identité nationale.",
        continentId: 'EUR',
        currency: 'Hryvnia (UAH)', language: 'Ukrainien', population: 41000000,
        dates: [
            { year: 1991, event: 'Déclaration d\'indépendance à la chute de l\'URSS' },
            { year: 2004, event: 'Révolution orange contre les fraudes électorales' },
            { year: 2014, event: 'Révolution d\'Euromaïdan, fuite de Ianoukovytch et annexion de la Crimée par la Russie' },
            { year: 2022, event: 'Invasion à grande échelle par la Russie' }
        ]
    },
    {
        code: 'UY', name_fr: 'Uruguay', name_en: 'Uruguay', flag: '🇺🇾', capital: 'Montevideo', mainColor: '#0038A8', latitude: -32.5228, longitude: -55.7658,
        intro_fr: "Petit pays stable et progressiste d'Amérique du Sud, l'Uruguay est réputé pour ses plages, sa viande de bœuf et sa culture du maté. Montevideo, sa capitale, offre une qualité de vie élevée et une ambiance détendue.",
        continentId: 'AME',
        currency: 'Peso uruguayen (UYU)', language: 'Espagnol', population: 3422794,
        dates: [
            { year: 1825, event: 'Déclaration d\'indépendance face à l\'empire du Brésil' },
            { year: 1930, event: 'Organisation (et victoire) de la première Coupe du monde de football' },
            { year: 1973, event: 'Début d\'une dictature militaire de 12 ans' },
            { year: 1985, event: 'Restauration de la démocratie' }
        ]
    },
    {
        code: 'VU', name_fr: 'Vanuatu', name_en: 'Vanuatu', flag: '🇻🇺', capital: 'Port Vila', mainColor: '#D21034', latitude: -15.3767, longitude: 166.9592,
        intro_fr: "Archipel volcanique de Mélanésie, le Vanuatu est une terre d'aventures avec ses volcans actifs très accessibles comme le mont Yasur. Sa population conserve des coutumes tribales fortes et parle plus de 100 langues locales.",
        continentId: 'OCE',
        currency: 'Vatu (VUV)', language: 'Bislama, Anglais, Français', population: 326740,
        dates: [
            { year: 1906, event: 'Création du Condominium franco-britannique des Nouvelles-Hébrides' },
            { year: 1980, event: 'Indépendance de la France et du Royaume-Uni sous le nom de Vanuatu' },
            { year: 2015, event: 'Destruction massive de l\'archipel par le cyclone Pam' }
        ]
    },
    {
        code: 'VA', name_fr: 'Vatican', name_en: 'Vatican City', flag: '🇻🇦', capital: 'Vatican City', mainColor: '#FFE000', latitude: 41.9029, longitude: 12.4534,
        intro_fr: "Plus petit État souverain du monde, le Vatican est le siège de l'Église catholique et la résidence du Pape. Enclavé dans Rome, il abrite des trésors artistiques inestimables comme la Basilique Saint-Pierre et la Chapelle Sixtine.",
        continentId: 'EUR',
        currency: 'Euro (EUR)', language: 'Latin, Italien', population: 764,
        dates: [
            { year: 1929, event: 'Accords du Latran créant l\'État de la Cité du Vatican' },
            { year: 1962, event: 'Ouverture du Concile Vatican II (modernisation de l\'Église)' },
            { year: 2013, event: 'Élection du Pape François, premier pape d\'origine latino-américaine' }
        ]
    },
    {
        code: 'VE', name_fr: 'Venezuela', name_en: 'Venezuela', flag: '🇻🇪', capital: 'Caracas', mainColor: '#CF142B', latitude: 6.4238, longitude: -66.5897,
        intro_fr: "Doté des plus grandes réserves de pétrole au monde, le Venezuela possède des paysages naturels époustouflants comme les chutes Salto Ángel. Malgré une crise économique profonde, sa culture caribéenne et andine reste vibrante.",
        continentId: 'AME',
        currency: 'Bolívar vénézuélien (VES)', language: 'Espagnol', population: 28301696,
        dates: [
            { year: 1811, event: 'Déclaration d\'indépendance menée notamment par Simón Bolívar' },
            { year: 1998, event: 'Élection d\'Hugo Chávez et début de la révolution bolivarienne' },
            { year: 2019, event: 'Crise présidentielle, deux présidents (Maduro et Guaidó) revendiquent le pouvoir' }
        ]
    },
    {
        code: 'VN', name_fr: 'Viêt Nam', name_en: 'Vietnam', flag: '🇻🇳', capital: 'Hanoi', mainColor: '#DA251D', latitude: 14.0583, longitude: 108.2772,
        intro_fr: "Pays en forme de dragon bordant la mer de Chine méridionale, le Vietnam séduit par sa baie d'Ha Long, ses rizières et sa cuisine savoureuse. C'est une nation dynamique qui mêle histoire coloniale, traditions asiatiques et modernité.",
        continentId: 'ASI',
        currency: 'Dong (VND)', language: 'Vietnamien', population: 98186856,
        dates: [
            { year: 1945, event: 'Déclaration d\'indépendance par Hô Chi Minh' },
            { year: 1954, event: 'Accords de Genève divisant le pays après la guerre d\'Indochine' },
            { year: 1975, event: 'Chute de Saïgon, fin de la guerre du Vietnam et réunification' },
            { year: 1986, event: 'Lancement de la politique du Đổi mới (renouveau économique libéral)' }
        ]
    },
    {
        code: 'YE', name_fr: 'Yémen', name_en: 'Yemen', flag: '🇾🇪', capital: 'Sana\'a', mainColor: '#CE1126', latitude: 15.5527, longitude: 48.5164,
        intro_fr: "Situé au sud de la péninsule arabique, le Yémen possède une architecture unique au monde, avec ses maisons-tours en pisé. Berceau de civilisations anciennes, le pays souffre malheureusement d'un grave conflit humanitaire.",
        continentId: 'ASI',
        currency: 'Rial yéménite (YER)', language: 'Arabe', population: 33696614,
        dates: [
            { year: 1990, event: 'Réunification de la République arabe du Yémen (Nord) et du Yémen du Sud' },
            { year: 2011, event: 'Printemps arabe, contestation menant à la chute du président Saleh' },
            { year: 2014, event: 'Prise de Sanaa par les Houthis et début de la guerre civile' }
        ]
    },
    {
        code: 'ZM', name_fr: 'Zambie', name_en: 'Zambia', flag: '🇿🇲', capital: 'Lusaka', mainColor: '#198A00', latitude: -13.1339, longitude: 27.8493,
        intro_fr: "Pays sans littoral d'Afrique australe, la Zambie est célèbre pour les majestueuses chutes Victoria qu'elle partage avec le Zimbabwe. C'est une destination privilégiée pour les safaris à pied et l'observation de la faune sauvage.",
        continentId: 'AFR',
        currency: 'Kwacha zambien (ZMW)', language: 'Anglais', population: 20017675,
        dates: [
            { year: 1964, event: 'Indépendance du Royaume-Uni (anciennement Rhodésie du Nord)' },
            { year: 1991, event: 'Premières élections multipartites et transition démocratique pacifique' },
            { year: 2021, event: 'Alternance démocratique avec l\'élection de l\'opposant Hakainde Hichilema' }
        ]
    },
    {
        code: 'ZW', name_fr: 'Zimbabwe', name_en: 'Zimbabwe', flag: '🇿🇼', capital: 'Harare', mainColor: '#006433', latitude: -19.0154, longitude: 29.1549,
        intro_fr: "Abritant les spectaculaires chutes Victoria et les ruines médiévales du Grand Zimbabwe, ce pays possède un potentiel touristique immense. Malgré des défis économiques, il reste renommé pour ses parcs nationaux riches en éléphants.",
        continentId: 'AFR',
        currency: 'Dollar américain (USD), Dollar zimbabwéen (ZWL)', language: 'Anglais, Shona, Ndébélé (et 13 autres)', population: 16320537,
        dates: [
            { year: 1965, event: 'Déclaration unilatérale d\'indépendance de la Rhodésie du Sud (régime blanc)' },
            { year: 1980, event: 'Indépendance officielle sous le nom de Zimbabwe, Robert Mugabe au pouvoir' },
            { year: 2000, event: 'Début des expropriations de fermiers blancs (crise économique majeure)' },
            { year: 2017, event: 'Coup de force militaire forçant la démission de Robert Mugabe après 37 ans' }
        ]
    }
];

const Flags: Record<string, any> = {
    AF: require('@/app/assets/flags/af.png'),
    ZA: require('@/app/assets/flags/za.png'),
    AL: require('@/app/assets/flags/al.png'),
    DZ: require('@/app/assets/flags/dz.png'),
    DE: require('@/app/assets/flags/de.png'),
    AD: require('@/app/assets/flags/ad.png'),
    AO: require('@/app/assets/flags/ao.png'),
    SA: require('@/app/assets/flags/sa.png'),
    AR: require('@/app/assets/flags/ar.png'),
    AM: require('@/app/assets/flags/am.png'),
    AU: require('@/app/assets/flags/au.png'),
    AT: require('@/app/assets/flags/at.png'),
    AZ: require('@/app/assets/flags/az.png'),
    BS: require('@/app/assets/flags/bs.png'),
    BH: require('@/app/assets/flags/bh.png'),
    BD: require('@/app/assets/flags/bd.png'),
    BB: require('@/app/assets/flags/bb.png'),
    BE: require('@/app/assets/flags/be.png'),
    BZ: require('@/app/assets/flags/bz.png'),
    BJ: require('@/app/assets/flags/bj.png'),
    BT: require('@/app/assets/flags/bt.png'),
    BY: require('@/app/assets/flags/by.png'),
    MM: require('@/app/assets/flags/mm.png'),
    BO: require('@/app/assets/flags/bo.png'),
    BA: require('@/app/assets/flags/ba.png'),
    BW: require('@/app/assets/flags/bw.png'),
    BR: require('@/app/assets/flags/br.png'),
    BN: require('@/app/assets/flags/bn.png'),
    BG: require('@/app/assets/flags/bg.png'),
    BF: require('@/app/assets/flags/bf.png'),
    BI: require('@/app/assets/flags/bi.png'),
    KH: require('@/app/assets/flags/kh.png'),
    CM: require('@/app/assets/flags/cm.png'),
    CA: require('@/app/assets/flags/ca.png'),
    CV: require('@/app/assets/flags/cv.png'),
    CF: require('@/app/assets/flags/cf.png'),
    CL: require('@/app/assets/flags/cl.png'),
    CN: require('@/app/assets/flags/cn.png'),
    CY: require('@/app/assets/flags/cy.png'),
    CO: require('@/app/assets/flags/co.png'),
    KM: require('@/app/assets/flags/km.png'),
    CG: require('@/app/assets/flags/cg.png'),
    CD: require('@/app/assets/flags/cd.png'),
    KP: require('@/app/assets/flags/kp.png'),
    KR: require('@/app/assets/flags/kr.png'),
    CR: require('@/app/assets/flags/cr.png'),
    CI: require('@/app/assets/flags/ci.png'),
    HR: require('@/app/assets/flags/hr.png'),
    CU: require('@/app/assets/flags/cu.png'),
    DK: require('@/app/assets/flags/dk.png'),
    DJ: require('@/app/assets/flags/dj.png'),
    DM: require('@/app/assets/flags/dm.png'),
    EG: require('@/app/assets/flags/eg.png'),
    AE: require('@/app/assets/flags/ae.png'),
    EC: require('@/app/assets/flags/ec.png'),
    ER: require('@/app/assets/flags/er.png'),
    ES: require('@/app/assets/flags/es.png'),
    EE: require('@/app/assets/flags/ee.png'),
    US: require('@/app/assets/flags/us.png'),
    ET: require('@/app/assets/flags/et.png'),
    FJ: require('@/app/assets/flags/fj.png'),
    FI: require('@/app/assets/flags/fi.png'),
    FR: require('@/app/assets/flags/fr.png'),
    GA: require('@/app/assets/flags/ga.png'),
    GM: require('@/app/assets/flags/gm.png'),
    GE: require('@/app/assets/flags/ge.png'),
    GH: require('@/app/assets/flags/gh.png'),
    GR: require('@/app/assets/flags/gr.png'),
    GD: require('@/app/assets/flags/gd.png'),
    GT: require('@/app/assets/flags/gt.png'),
    GN: require('@/app/assets/flags/gn.png'),
    GW: require('@/app/assets/flags/gw.png'),
    GQ: require('@/app/assets/flags/gq.png'),
    GY: require('@/app/assets/flags/gy.png'),
    HT: require('@/app/assets/flags/ht.png'),
    HN: require('@/app/assets/flags/hn.png'),
    HU: require('@/app/assets/flags/hu.png'),
    IN: require('@/app/assets/flags/in.png'),
    ID: require('@/app/assets/flags/id.png'),
    IQ: require('@/app/assets/flags/iq.png'),
    IR: require('@/app/assets/flags/ir.png'),
    IE: require('@/app/assets/flags/ie.png'),
    IS: require('@/app/assets/flags/is.png'),
    IL: require('@/app/assets/flags/il.png'),
    IT: require('@/app/assets/flags/it.png'),
    JM: require('@/app/assets/flags/jm.png'),
    JP: require('@/app/assets/flags/jp.png'),
    JO: require('@/app/assets/flags/jo.png'),
    KZ: require('@/app/assets/flags/kz.png'),
    KE: require('@/app/assets/flags/ke.png'),
    KG: require('@/app/assets/flags/kg.png'),
    KI: require('@/app/assets/flags/ki.png'),
    XK: require('@/app/assets/flags/xk.png'),
    KW: require('@/app/assets/flags/kw.png'),
    LA: require('@/app/assets/flags/la.png'),
    LS: require('@/app/assets/flags/ls.png'),
    LV: require('@/app/assets/flags/lv.png'),
    LB: require('@/app/assets/flags/lb.png'),
    LR: require('@/app/assets/flags/lr.png'),
    LY: require('@/app/assets/flags/ly.png'),
    LI: require('@/app/assets/flags/li.png'),
    LT: require('@/app/assets/flags/lt.png'),
    LU: require('@/app/assets/flags/lu.png'),
    MK: require('@/app/assets/flags/mk.png'),
    MG: require('@/app/assets/flags/mg.png'),
    MY: require('@/app/assets/flags/my.png'),
    MW: require('@/app/assets/flags/mw.png'),
    MV: require('@/app/assets/flags/mv.png'),
    ML: require('@/app/assets/flags/ml.png'),
    MT: require('@/app/assets/flags/mt.png'),
    MA: require('@/app/assets/flags/ma.png'),
    MH: require('@/app/assets/flags/mh.png'),
    MU: require('@/app/assets/flags/mu.png'),
    MR: require('@/app/assets/flags/mr.png'),
    MX: require('@/app/assets/flags/mx.png'),
    FM: require('@/app/assets/flags/fm.png'),
    MD: require('@/app/assets/flags/md.png'),
    MC: require('@/app/assets/flags/mc.png'),
    MN: require('@/app/assets/flags/mn.png'),
    ME: require('@/app/assets/flags/me.png'),
    MZ: require('@/app/assets/flags/mz.png'),
    NA: require('@/app/assets/flags/na.png'),
    NR: require('@/app/assets/flags/nr.png'),
    NP: require('@/app/assets/flags/np.png'),
    NI: require('@/app/assets/flags/ni.png'),
    NE: require('@/app/assets/flags/ne.png'),
    NG: require('@/app/assets/flags/ng.png'),
    NO: require('@/app/assets/flags/no.png'),
    NZ: require('@/app/assets/flags/nz.png'),
    OM: require('@/app/assets/flags/om.png'),
    UG: require('@/app/assets/flags/ug.png'),
    UZ: require('@/app/assets/flags/uz.png'),
    PK: require('@/app/assets/flags/pk.png'),
    PW: require('@/app/assets/flags/pw.png'),
    PS: require('@/app/assets/flags/ps.png'),
    PA: require('@/app/assets/flags/pa.png'),
    PG: require('@/app/assets/flags/pg.png'),
    PY: require('@/app/assets/flags/py.png'),
    NL: require('@/app/assets/flags/nl.png'),
    PE: require('@/app/assets/flags/pe.png'),
    PH: require('@/app/assets/flags/ph.png'),
    PL: require('@/app/assets/flags/pl.png'),
    PT: require('@/app/assets/flags/pt.png'),
    QA: require('@/app/assets/flags/qa.png'),
    DO: require('@/app/assets/flags/do.png'),
    CZ: require('@/app/assets/flags/cz.png'),
    RO: require('@/app/assets/flags/ro.png'),
    GB: require('@/app/assets/flags/gb.png'),
    RU: require('@/app/assets/flags/ru.png'),
    RW: require('@/app/assets/flags/rw.png'),
    KN: require('@/app/assets/flags/kn.png'),
    SM: require('@/app/assets/flags/sm.png'),
    VC: require('@/app/assets/flags/vc.png'),
    LC: require('@/app/assets/flags/lc.png'),
    SB: require('@/app/assets/flags/sb.png'),
    SV: require('@/app/assets/flags/sv.png'),
    WS: require('@/app/assets/flags/ws.png'),
    ST: require('@/app/assets/flags/st.png'),
    SN: require('@/app/assets/flags/sn.png'),
    RS: require('@/app/assets/flags/rs.png'),
    SC: require('@/app/assets/flags/sc.png'),
    SL: require('@/app/assets/flags/sl.png'),
    SG: require('@/app/assets/flags/sg.png'),
    SK: require('@/app/assets/flags/sk.png'),
    SI: require('@/app/assets/flags/si.png'),
    SO: require('@/app/assets/flags/so.png'),
    SD: require('@/app/assets/flags/sd.png'),
    SS: require('@/app/assets/flags/ss.png'),
    LK: require('@/app/assets/flags/lk.png'),
    SE: require('@/app/assets/flags/se.png'),
    CH: require('@/app/assets/flags/ch.png'),
    SR: require('@/app/assets/flags/sr.png'),
    SZ: require('@/app/assets/flags/sz.png'),
    SY: require('@/app/assets/flags/sy.png'),
    TJ: require('@/app/assets/flags/tj.png'),
    TW: require('@/app/assets/flags/tw.png'),
    TZ: require('@/app/assets/flags/tz.png'),
    TD: require('@/app/assets/flags/td.png'),
    TH: require('@/app/assets/flags/th.png'),
    TL: require('@/app/assets/flags/tl.png'),
    TG: require('@/app/assets/flags/tg.png'),
    TO: require('@/app/assets/flags/to.png'),
    TT: require('@/app/assets/flags/tt.png'),
    TN: require('@/app/assets/flags/tn.png'),
    TM: require('@/app/assets/flags/tm.png'),
    TR: require('@/app/assets/flags/tr.png'),
    TV: require('@/app/assets/flags/tv.png'),
    UA: require('@/app/assets/flags/ua.png'),
    UY: require('@/app/assets/flags/uy.png'),
    VU: require('@/app/assets/flags/vu.png'),
    VA: require('@/app/assets/flags/va.png'),
    VE: require('@/app/assets/flags/ve.png'),
    VN: require('@/app/assets/flags/vn.png'),
    YE: require('@/app/assets/flags/ye.png'),
    ZM: require('@/app/assets/flags/zm.png'),
    ZW: require('@/app/assets/flags/zw.png')
};

export const getFlagImage = (code: string) => {
    // Fallback sur une image "inconnue" si le code manque
    return Flags[code] || require('@/app/assets/flags/unknown_flag.png');
};

export const STARTER_COUNTRIES: Country[] = [
    ALL_COUNTRIES.find(c => c.code === 'FR')!,
    ALL_COUNTRIES.find(c => c.code === 'PE')!,
    ALL_COUNTRIES.find(c => c.code === 'JP')!,
    ALL_COUNTRIES.find(c => c.code === 'EG')!,
];