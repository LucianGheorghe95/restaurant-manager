Cerințe proiect
Realizarea unei aplicații pe una dintre temele specificate, cu back-end RESTful care accesează date
stocate într-o bază relațională sau nerelațională pe baza unui API de persistență și date expuse de
un serviciu extern și frontend SPA realizat cu un framework bazat pe componente.
[Componente + punctaje]
• Persistență date (10%) – cel puțin 2 entități cu relație părinte - copil stocate într-o bază
relațională/nerelațională și accesate prin ORM.
• Operații REST (25%) – implementarea de endpoint-uri CRUD corecte (Create, Read,
Update, Delete) cu răspunsuri JSON și coduri HTTP standard.
• Front-end SPA (25%) – aplicație React.js/Angular care consumă API-ul și oferă interfață
funcțională prin componente și routing.
• Persistență cu autentificare (10%) – datele se accesează doar în urma autentificării
utilizatorului (ex. JWT/OAuth) și se păstrează sesiuni valide.
• Integrare cu un serviciu extern - opțional (dacă integrarea cu serviciul specificat nu este
posibilă se poate utiliza un serviciu similar)
[Stil și calitatea codului] → 20%
• Aplicație reală, coerentă din punct de vedere al logicii de business
• Codul trebuie să fie bine organizat, numele variabilelor trebuie să fie sugestive (și trebuie
să se utilizeze un standard de numire oricare ar fi el e.g. camel case), codul trebuie să fie
indentat pentru a fi ușor citibil
• Opțional: comments în cod
• Opțional: test coverage
[Punctaj din oficiu] → 10%
[Livrabile parțiale] - 3 etape (cadrul didactic coordonator va fi invitat ca un contribuitor la
repository) - nelivrarea la o etapă intermediară reduce punctajul maxim cu 10% (i.e. dacă
punctajul maxim este de 5 puncte din nota finală livrarea direct la final implică un punctaj maxim
de 4 puncte)
• Specificații detaliate, descrierea proiectului, prezența unui proiect în git - se livrează până
la data de 25.11.2025
• Serviciu RESTful funcțional în repository + instrucțiuni de rulare - se livrează până la data
de 20.12.2025
• Aplicația completă - se livrează până la finalul ultimei săptămâni a semestrului NOTA.
Detalii importante:
• Aplicațiile care nu rulează nu primesc punctaj.
• Se poate demonstra doar partea de back-end sau doar partea de front-end, caz în care se
punctează doar ce funcționează.
• Punctajul se acordă strict pe baza codului funcțional demonstrat.
• Persistență cu autentificare – datele protejate trebuie să fie accesibile doar după
autentificare, astfel încât fiecare utilizator să poată vizualiza și modifica exclusiv propriile
date, iar autentificarea să fie păstrată chiar și după refresh-ul browserului.
