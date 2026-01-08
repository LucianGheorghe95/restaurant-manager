INSTRUCTIUNI DE RULARE PROIECT
Pentru activarea backend-ului trebuie sa deschidem un terminal unde sa introducem urmatoarele comenzi:
•	cd backend
•	npm install
•	npm run dev
Backend-ul va rula implicit pe http://localhost:port

Pentru activarea frontend-ului trebuie sa deschidem un terminal nou unde sa introducem urmatoare comenzi:
•	cd frontend
•	npm install
•	npm run dev
Frontend-ul va rula pe http://localhost:port 
Se acceseaza link-ul pentru frontend.

Securitate
•	Datele sunt accesibile doar dupa autentificare.
•	Token-ul JWT este trimis prin header Authorization.
•	Fisierele .env si node_modules sunt excluse din repository.

DESCRIERE PROIECT
Restaurant Manager este o aplicatie web de tip SPA (Single Page Application) dezvoltata pentru gestionarea restaurantelor, care include:
•	autentificare cu JWT,
•	backend RESTful,
•	frontend React,
•	integrare cu Google Maps pentru afisarea locatiei restaurantelor.
Proiectul utilizeaza o arhitectura completa frontend + backend, cu persistenta datelor si autentificare.

TEHNOLOGII
Backend
•	Node.js
•	Express.js
•	Prisma ORM
•	JWT (JSON Web Token) pentru autentificare
•	SQLite / PostgreSQL (prin Prisma)
Frontend
•	React.js
•	React Router
•	Axios
•	Vite
•	Google Maps JavaScript API

FUNCTIONALITATI
Autentificare
•	Inregistrare utilizator
•	Login cu email si parola
•	Autentificare pe baza de JWT
•	Acces restrictionat la date (doar utilizatorul logat)
Restaurante
•	Creare restaurant
•	Afisare lista restaurante
•	Detalii restaurant
•	Stergere restaurant

Adresa
•	Fiecare restaurant are o singura adresa
•	Salvare strada, oras, tara, latitudine, longitudine
•	Afisare locatie pe Google Maps

Meniu 
Un restaurant poate avea mai multe produse in meniu
Fiecare produs are:
•	nume
•	categorie (doar categorie General)
•	pret

Integrare Google Maps
Aplicatia foloseste Google Maps JavaScript API pentru:
•	afisarea hartii
•	plasarea markerelor pe baza coordonatelor (lat/lng)
Cheia API este pastrata in fisierul .env si NU este inclusa in repository.
Exemplu .env:
VITE_API_URL=http://localhost:port
VITE_GOOGLE_MAPS_API_KEY= API KEY
