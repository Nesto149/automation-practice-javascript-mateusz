// zadanie 1.1 
class User {
    constructor(imie, nazwisko, login, numer_tel, wiek) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.login = login;
        this.numer_tel = numer_tel;
        this.wiek = wiek;
    }

    podajDane() {
        return `imie: ${this.imie}, nazwisko: ${this.nazwisko}`;
    }

    ileLat() {
        return `Użytkownik ma już  ${this.wiek} lat!`;
    }

    kierunkowy() {
        return `Numer z kierunkowym: +48 ${this.numer_tel}`;
    }
}

class BasicUser extends User {
    constructor(imie, nazwisko, login, numer_tel, wiek, wzrost) {
        super(imie, nazwisko, login, numer_tel, wiek);
        this.wzrost = wzrost;
    }

    getUserData_1() {
        return `Wybrane dane użytkownika 1- ${super.podajDane()}, wzrost: ${this.wzrost}cm, ${super.kierunkowy()}`;
    }
}

class CartUser extends User {
    constructor(imie, nazwisko, login, numer_tel, wiek, waga) {
        super (imie, nazwisko, login, numer_tel, wiek);
        this.waga = waga;
    }

    getUserData_2() {
        return `wybrane dane użytkownika 2- ${super.podajDane()}, waga: ${this.waga}. ${super.ileLat()}`;
    }
}

let user1 = new BasicUser('Mateusz', 'Kowalski', 'MatKow', '123123123', '29', '182');
console.log(user1.getUserData_1());

let user2 = new CartUser('Damian', 'Nowak', 'DamNow', '456456456', '32', '85');
console.log(user2.getUserData_2());



// zadanie 1.2
let library = {
    'Książka 1': {
        'Tytuł': ['Rok 1984'],
        'Autor': ['George Orwell'],
        'Data wydania': ['1949'],
        'Ilość stron': ['236']
    },
    'Książka 2': {
        'Tytuł': ['Ojciec chrzestny'],
        'Autor': ['Mario Puzo'],
        'Data wydania': ['1969'],
        'Ilość stron': ['480']
    },
    'Książka 3': {
        'Tytuł': ['Bogactwo i nędza narodów'],
        'Autor': ['David S. Landes'],
        'Data wydania': ['2000'],
        'Ilość stron': ['736']
    }
}
for (let key in library) {
    let book = library[key];
    console.log(`Tytuł: ${book["Tytuł"][0]}, Autor: ${book["Autor"][0]}, Data wydania: ${book["Data wydania"][0]}, Ilość stron: ${book["Ilość stron"][0]}`);
}
