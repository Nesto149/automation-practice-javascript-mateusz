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