import { Asset } from 'expo-asset';
//import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

export const functions = {
    getIconSource,
    getCategoriesource,
    getImageSource,
    shuffleArray,
    addSpacesInNumber,
    formatTime,
    convertImageToBase64,
    dateToString,
    stringDateToString,
    simpleDateToString,
    stringNumber,
    vibrate,
}

function getIconSource(name: string) {
    switch (name) {
        case 'museum':
            return require('@/assets/icons/museum.png');
        case 'airplane-takeoff':
            return require('@/assets/icons/airplane-takeoff.png');
        case 'logo_white':
            return require('@/assets/images/logo_white.png');
        case 'flag':
            return require('@/assets/icons/flag.png');
        case 'capital':
            return require('@/assets/icons/capital.png');
        case 'fuel':
            return require('@/assets/icons/fuel.png');
        case 'target':
            return require('@/assets/icons/target.png');
        case 'clock':
            return require('@/assets/icons/clock.png');
        case 'fingerprint':
            return require('@/assets/icons/fingerprint.png');
        case 'error':
            return require('@/assets/icons/error.png');
        case 'flight-ticket':
            return require('@/assets/icons/flight-ticket.png');
        case 'repeat':
            return require('@/assets/icons/repeat.png');
        case 'gamepad':
            return require('@/assets/icons/gamepad.png');
        case 'profile':
            return require('@/assets/icons/profile.png');
        case 'cards':
            return require('@/assets/icons/cards.png');
        case 'duel':
            return require('@/assets/icons/duel.png');
        case 'books':
            return require('@/assets/icons/books.png');
        case 'mail':
            return require('@/assets/icons/mail.png');
        case 'arrow-left':
            return require('@/assets/icons/arrow-left.png');
        case 'arrow-right':
            return require('@/assets/icons/arrow-right.png');
        case 'king':
            return require('@/assets/icons/king.png');
        case 'student':
            return require('@/assets/icons/student.png');
        case 'compass':
            return require('@/assets/icons/compass.png');
        case 'fire':
            return require('@/assets/icons/fire.png');
        case 'gem':
            return require('@/assets/icons/gem.png');
        case 'change':
            return require('@/assets/icons/change.png');
        case 'lock':
            return require('@/assets/icons/lock.png');
        case 'check':
            return require('@/assets/icons/check.png');
        case 'journey':
            return require('@/assets/icons/journey.png');
        case 'rocket':
            return require('@/assets/icons/rocket.png');
        case 'globe':
            return require('@/assets/icons/globe.png');
        case 'paper_map':
            return require('@/assets/icons/paper_map.png');
        case 'close':
            return require('@/assets/icons/close.png');
        case 'lightning':
            return require('@/assets/icons/lightning.png');
        case 'coin':
            return require('@/assets/icons/coin.png');
        case 'people':
            return require('@/assets/icons/people.png');
        case 'peoples':
            return require('@/assets/icons/peoples.png');
        case 'wallet':
            return require('@/assets/icons/wallet.png');
        case 'messages':
            return require('@/assets/icons/messages.png');
        default:
            return require('@/assets/icons/none.png');
    }
}

function getImageSource(name: string) {
    switch (name) {
        case 'EUR':
            return require('@/assets/continents/europe.png');
        case 'ASI':
            return require('@/assets/continents/asia.png');
        case 'AFR':
            return require('@/assets/continents/africa.png');
        case 'AME':
            return require('@/assets/continents/america.png');
        case 'OCE':
            return require('@/assets/continents/oceania.png');
        case 'WLD':
            return require('@/assets/continents/world.png');
        default:
            return require('@/assets/icons/none.png');
    }
}

function getCategoriesource(name: string) {
    switch (name) {
        case 'lotus':
            return require('@/assets/categories/lotus.png');
        case 'atom':
            return require('@/assets/categories/atom.png');
        case 'chess':
            return require('@/assets/categories/chess.png');
        case 'theatre':
            return require('@/assets/categories/theatre.png');
        case 'owl':
            return require('@/assets/categories/owl.png');
        case 'puzzle':
            return require('@/assets/categories/puzzle.png');
        case 'third-eye':
            return require('@/assets/categories/third-eye.png');
        case 'heart-line':
            return require('@/assets/categories/heart-line.png');
        case 'greek-helmet':
            return require('@/assets/categories/greek-helmet.png');
        case 'globe':
            return require('@/assets/categories/globe.png');
        case 'chart':
            return require('@/assets/categories/chart.png');
        case 'gavel':
            return require('@/assets/categories/gavel.png');
        case 'palette':
            return require('@/assets/categories/palette.png');
        case 'music-note':
            return require('@/assets/categories/music-note.png');
        case 'open-book':
            return require('@/assets/categories/open-book.png');
        case 'film-reel':
            return require('@/assets/categories/film-reel.png');
        case 'sport':
            return require('@/assets/categories/sport.png');
        case 'lightbulb':
            return require('@/assets/categories/lightbulb.png');
        case 'flask':
            return require('@/assets/categories/flask.png');
        case 'compass':
            return require('@/assets/categories/compass.png');
        case 'leaf':
            return require('@/assets/categories/leaf.png');
        default:
            return require('@/assets/icons/none.png');
    }
}


function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function addSpacesInNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatTime(seconds: number): string {
    // 600 return 10min
    // 90 return 1min30

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 0 ? mins + 'min ' : ''}${secs > 0 ? secs + 's' : ''}`.trim();
}



async function convertImageToBase64(imageSource: any) {
    try {
        // 1. Charger l'asset (résout le require('./...'))
        const asset = Asset.fromModule(imageSource);

        // 2. S'assurer que le fichier est téléchargé/copié dans le cache local du téléphone
        // C'est l'étape cruciale qui transforme le "projet" en "fichier réel"
        await asset.downloadAsync();

        // 3. Lire le fichier depuis le chemin local réel (file://...)
        // asset.localUri est le chemin que FileSystem peut lire
        if (!asset.localUri) {
            throw new Error("Impossible de récupérer l'URI local de l'image");
        }

        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: 'base64',
        });

        return `data:image/png;base64,${base64}`;
    } catch (error) {
        console.error("Erreur conversion image:", error);
        return '';
    }
};

function stringDateToString(dateStr: string) {
    // input : 2026-02-03T07:00:00.000Z
    // output : 3 Février 2026
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const month = date.getUTCMonth(); // 0-11
    const year = date.getUTCFullYear();
    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const dateFormatted = `${day} ${monthNames[month]} ${year}`;

    return dateFormatted;
}

function dateToString(date: number) {
    // exemple : -13800000000 -> Il y a 13,8 milliards d'années
    //12000000 -> Il y a 12 millions d'années
    //450000 -> Il y a 450 mille ans
    //-2600 -> 2600 avant J.-C.
    //724 -> 724 après J.-C.
    // 20231224 -> 24 Décembre 2023
    if (date < -1000000000) {
        if (date % 1000000000 === 0) {
            return `Il y a ${(-date / 1000000000).toFixed(0)} milliards d'années`;
        }
        return `Il y a ${(-date / 1000000000).toFixed(1)} milliards d'années`;
    }
    else if (date < -1000000) {
        if (date % 1000000 === 0) {
            return `Il y a ${(-date / 1000000).toFixed(0)} millions d'années`;
        }
        return `Il y a ${(-date / 1000000).toFixed(1)} millions d'années`;
    }
    else if (date < -1000) {
        return `Il y a ${(-date / 1000).toFixed(0)} 000 ans`;
    }
    else if (date < 0) {
        return `${-date} avant J.-C.`;
    }
    else if (date < 1000) {
        return `${date} après J.-C.`;
    }
    else if (date < 3000) {
        return `${date}`;
    }
    else {
        const dateStr = date.toString();
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
    }
}

function simpleDateToString(date: number) {
    // exemple : -13800000000 -> 13,8 Md 
    //12000000 -> 12 M
    //450000 -> 450 k
    //-2600 -> 2600 av. J.-C.
    //724 -> 724
    // 20231224 -> 24/12/2023
    if (date < -1000000000) {
        if (date % 1000000000 === 0) {
            return `${-(-date / 1000000000).toFixed(0)} Md`;
        }
        return `${-(-date / 1000000000).toFixed(1)} Md`;
    }
    else if (date < -1000000) {
        if (date % 1000000 === 0) {
            return `${-(-date / 1000000).toFixed(0)} M`;
        }
        return `${-(-date / 1000000).toFixed(1)} M`;
    }
    else if (date < -1000) {
        if (date % 1000 === 0) {
            return `${-(-date / 1000).toFixed(0)} k`;
        }
        return `${-(-date / 1000).toFixed(1)} k`;
    }
    else if (date < 0) {
        return `${-date} av. J.-C.`;
    }
    else if (date < 10000) {
        return `${date}`;
    }
    else {
        const dateStr = date.toString();
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);
        return `${day}/${month}/${year}`;
    }
}

function stringNumber(num: number): string {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)} Milliards`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)} Millions`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)} 000`;
    } else {
        return num.toString();
    }
}

function vibrate(type:
    'success' |
    'error' |
    'notification' |
    'small-success' |
    'small-error' |
    'small-warning' |
    'click'
    = 'notification',
    withSound: boolean = false) {
    switch (type) {
        case 'success':
            Vibration.vibrate([0, 100, 50, 100, 50, 100, 200, 500]);
            if (withSound) {
                /*const soundObject = new Audio.Sound();
                soundObject.loadAsync(require('@/app/assets/sounds/success3.mp3')).then(() => {
                    soundObject.playAsync();
                });*/
                break;
            }
        case 'error':
            Vibration.vibrate([0, 80, 50, 80, 50, 120]);
            break;
        case 'small-success':
            if (withSound) {
                /*const soundObject = new Audio.Sound();
                soundObject.loadAsync(require('@/app/assets/sounds/success.mp3')).then(() => {
                    soundObject.playAsync();
                });*/
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
        case 'small-error':
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
        case 'small-warning':
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            break;
        case 'click':
            if (withSound) {
                /*const soundObject = new Audio.Sound();
                soundObject.loadAsync(require('@/app/assets/sounds/click.mp3')).then(() => {
                    soundObject.playAsync();
                });*/
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
        case 'notification':
            Vibration.vibrate([0, 100]);
            break;
    }
}