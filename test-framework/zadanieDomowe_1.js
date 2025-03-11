// część "A"
console.log("----- Zadanie A -----");
class Osoba {
   constructor(name) {
    this.name = name;
   }

   logName() {
    console.log(`Imię: ${this.name}`);
   }
   
   nameEdit() {
    console.log(`Dwie pierwsze litery:  ${this.name.slice(0, 2)}`);

    let poprawioneImie = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    console.log('Poprawiona pisownia: ', poprawioneImie);

    let nazwisko = "Kowalski";
    let dwaSlowa = "pisze zadanie";
    console.log(`Zdanie: ${poprawioneImie} ${nazwisko} ${dwaSlowa}`);
   }

   
}

let osoba1 = new Osoba('Mateusz');
osoba1.logName();
osoba1.nameEdit();

let osoba2 = new Osoba("damian");
osoba2.logName();
osoba2.nameEdit();

let osoba3 = new Osoba("sZYMon");
osoba3.logName();
osoba3.nameEdit();


// część "B"
console.log("----- Zadanie B -----");
let liczba1 = 20;
let liczba2 = 30;
console.log(liczba1 === 50 || liczba2 === 50 || (liczba1 + liczba2) === 50);
