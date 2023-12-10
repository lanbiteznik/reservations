# Pregled
Sistem Rezervacij je celovita aplikacija, namenjena upravljanju in načrtovanju rezervacij. Sestavljajo ga dve glavni komponenti: strežnik na platformi Spring Boot (Java) in uporabniški vmesnik, ustvarjen z Angularjem.

## Backend
### Tehnologija: 
- Spring Boot, 
- Java 21
### Baza podatkov: 
MySQL
### Ključne značilnosti:
- RESTful API končne točke za upravljanje rezervacij
- Validacija podatkov
- Globalno upravljanje izjem
- DataLoader za razvojno okolje
### Zagon strežnika:
- Zagotovite, da je MySQL nastavljen in deluje
- Posodobite application.properties z akreditivi za bazo podatkov
- Za zagon Spring Boot aplikacije uporabite mvn spring-boot:run ali IDE
- 
## Frontend
### Tehnologija: 
 - Angular
 - TypeScript

### Knjižnice: 
- FullCalendar za prikaz rezervacij,
- PrimeNG za UI komponente

### Ključne značilnosti:
- Interaktivni koledar za ogled, ustvarjanje in upravljanje rezervacij
- Validacija obrazca
 -Podpora lokalizaciji (angleški in slovenski jezik)
  
### Zagon odjemalca:
- Za namestitev odvisnosti zaženite npm install
- Za zagon Angularjevega razvojnega strežnika zaženite ng serve

## Backend testi:
- Nahajajo se v src/test/java
- Uporaba JUnit in Mockito za testiranje
- Za izvedbo testov zaženite mvn test

## Opombe za razvoj
- Za samodejne ponovne zagonke med razvojem backenda uporabite Spring Boot DevTools
- CORS je nastavljen za lokalni razvoj; za produkcijsko okolje prilagodite allowedOrigins v WebConfig

### Predpogoji
- Java JDK 21
- Maven (za backend)
- Node.js in npm (za frontend)
- Angular CLI
- MySQL
## Namestitev in nastavitev
1. Klonirajte repozitorij
2. Navigirajte v direktorij backenda in posodobite application.properties z vašimi nastavitvami baze podatkov
3. Zaženite backend strežnik
4. Navigirajte v direktorij frontenda, zaženite npm install in nato ng serve
5. Dostop do frontenda preko http://localhost:4200/
## Opombe
- Pred zagonom backenda zagotovite, da MySQL deluje
- Prilagodite nastavitve CORS za različna okolja
