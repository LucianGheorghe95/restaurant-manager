Manager de restaurante integrat cu GoogleMaps

INSTRUCTIUNI DE RULARE PROIECT
1.Cerinte minime pe pc:
•	Node.js
•	Git
•	Visual Studio Code
2.Clonarea proiectului din GitHub:
•	git clone https://github.com/LucianGheorghe95/restaurant-manager.git
•	cd restaurant-manager

3. Configurare și rulare BACKEND
Intram in folderul backend  si introducem urmatoarele comenzi in terminal:
•	cd backend
•	npm install
Creem manual fisierul backend/.env cu ormatorul continut
PORT=3001
JWT_SECRET=jwt_secret_restaurant_manager_2026_x9aQp
DATABASE_URL="file:./dev.db"
.env nu este inclus în repository din motive de securitate.

4. Initializeaza baza de date
Introducem comenzile:
•	npx prisma generate
•	npx prisma migrate dev
Acești pași creează baza de date dev.db si creează tabelele necesare aplicației
5. Porneste backend
•	npm run dev
Backend-ul var ula pe http://localhost:3001
Nu inchide acest terminal.
6. Configurare si rulare frontend
•	cd frontend
•	npm install
7. Creeaza fisierul .env in frontend/ cu acest continut:
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_MAPS_API_KEY= API KEY
Cheia Google Maps se obține din Google Cloud Console
Este necesar Maps JavaScript API activat. 
•	npm run dev
Frontend-ul va rula pe: http://localhost:5173
Pentru utilizarea aplicatiei se acceseaza link-ul de deasupra.

Securitate
•	Datele sunt accesibile doar dupa autentificare.
•	Token-ul JWT este trimis prin header Authorization.
•	Fisierele .env si node_modules sunt excluse din repository (.gitignore)

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
