## Example using Cypress GitHub Action when Cypress is installed in a subfolder

# Todos

[Link](https://zapier.com/blog/best-todo-list-apps/) do aplikacji (z racji tego że aplikacja odpala się lokalnie, wrzuciłem losowy link do innych aplikacji typu "todo")

Aplikacja o nazwie "Todos" sprawia, że użytkownik może w polu tekstowym dodać tekst, który po zatwierdzeniu Enterem zostaje dodany do listy "Active", a lista ta jest od razu aktualizowana pod polem do wprowadzania tekstu. Obok każdego z elementów dodanych do listy można kliknąć pole typu check-box, a następnie wybrane elementy za pomocą przycisku "Clear completed" znajdującego się w prawym dolnym rogu zostaną przekreślone (ale nie wyrzucone z listy). Aplikacja oprócz widoku wszystkich elementów na liście (tryb "All") może wyodrębnić elementy oznaczone  (tryb "Complete"), jak i te niezaznaczone wspomnianym wcześniej check-boxem (tryb "Active"). W lewym dolnym rogu jest licznik liczący tylko elementy "Active", czyli te które nie zostały oznaczone jako "Completed".


**Lista (tytuły) przypadków testowych:**

1. Sprawdzenie, czy pole “Counter” poprawnie liczy stan listy po użyciu przycisku “Clear completed”.
2. Sprawdzenie zabezpieczenia przed SQL Injection/złośliwymi linkami.
3. Sprawdzenie, czy aplikacja pozwoli na stworzenie tego samego elementu w liście (duplikatu).
4. Sprawdzenie, czy aplikacja pozwoli zmienić nazwę elementu na już istniejący na liście (edycja na duplikat).
