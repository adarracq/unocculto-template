//import { Audio } from 'expo-av';

export const functions = {
    getIconSource,
    getImageSource,
    formatTime,
    stringDateToString,
    stringNumber,
    addLineBreaks,
}

function getIconSource(name: string) {
    switch (name) {
        case 'logo':
            return require('@/assets/images/logo.png');
        case 'school':
            return require('@/assets/icons/school.png');
        case 'school-outline':
            return require('@/assets/icons/school-outline.png');
        case 'profile':
            return require('@/assets/icons/profile.png');
        case 'profile-outline':
            return require('@/assets/icons/profile-outline.png');
        case 'earth':
            return require('@/assets/icons/earth.png');
        case 'earth-outline':
            return require('@/assets/icons/earth-outline.png');
        case 'id-card':
            return require('@/assets/icons/id-card.png');
        case 'id-card-outline':
            return require('@/assets/icons/id-card-outline.png');
        case 'swords':
            return require('@/assets/icons/swords.png');
        case 'brain':
            return require('@/assets/icons/brain.png');
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

function formatTime(seconds: number): string {
    // 600 return 10min
    // 90 return 1min30
    // 65 return 1min05

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins + 'min '}${secs > 0 ? (secs < 10 ? '0' : '') + secs + 's' : ''}`.trim();
}


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

function stringNumber(num: number): string {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)} Milliards`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)} Millions`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(0)} 000`;
    } else {
        return num.toString();
    }
}

function addLineBreaks(text: string) {
    return text.replace(/\. /g, '.\n\n');
}
