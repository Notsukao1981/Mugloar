/**
 * A congregated collection of assets related to a Dragon (entity) class.
 * */

export class DragonColor {
    name: string;
    hex: string;

    constructor (name: string, hex: string) {
        this.name = name;
        this.hex = hex;
    }
}

export class DragonAssets {
    static colors: DragonColor[] = [
        new DragonColor('red', '#821A1A'),
        new DragonColor('black', '#2b2b2b'),
        new DragonColor('green', '#065620'),
        new DragonColor('azure', '#1a3e6b'),
        new DragonColor('ghostly', 'transparent'),
        new DragonColor('golden', '#dfad01'),
        new DragonColor('onyx', '#67615c'),
        new DragonColor('ivory', '#f9f8d5')
    ];

    static names: string[] = ['Livjatan', 'Lissoth', 'Bayorth', 'Xalanth', 'Beroan', 'Zerelth', 'Livjatan', 'Kyloth',
        'Favnir', 'Keleth', 'Perenth', 'Sonneth', 'Jeruth', 'Mirroth', 'Rhosalth', 'Quenth', 'Zinnath', 'Tharos', 'Dallarth'];

    static titles: string[] = ['The Adamant', 'The Undying', 'The Strong Minded', 'The Ancient', 'The Champion of dragons',
        'The Merciful', 'The Mindful', 'The Kind One', 'The Fearless', 'The Indomitable', 'The Cheeky One', 'The Victorious', 'The Dreaded'];
}
