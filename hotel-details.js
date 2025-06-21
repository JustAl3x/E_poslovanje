document.addEventListener('DOMContentLoaded', () => {
    // Uzimamo parametre iz URL-a
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');

    // Podaci o hotelima (u pravoj aplikaciji ovo bi došlo sa backend-a)
    const hotels = {
        'hotel1': {
            name: 'Hotel Krusevac Smokva',
            price: '100$',
            image: 'images/Hotel1.jpg',
            description: 'Hotel Krusevac Smokva je luksuzni hotel smešten u srcu Kruševca. Sa svojom jedinstvenom atmosferom i prelepim vrtom sa smokvama, ovaj hotel predstavlja savršen spoj tradicionalnog i modernog. Gostima su na raspolaganju spa centar, restoran sa domaćom kuhinjom i prostrane sobe sa pogledom na grad.'
        },
        'hotel2': {
            name: 'Hotel Sombor Ravnica',
            price: '200$',
            image: 'images/Hotel2.jpg',
            description: 'U srcu vojvođanske ravnice, Hotel Sombor Ravnica nudi autentično iskustvo boravka u Vojvodini. Hotel se ponosi svojom tradicionalnom arhitekturom, prostranim sobama i restoranom koji služi najbolja lokalna jela. Idealan je za poslovne putnike i turiste koji žele da istraže lepote Vojvodine.'
        },
        'hotel3': {
            name: 'Hotel Silla Jagodina',
            price: '250$',
            image: 'images/Hotel3.jpg',
            description: 'Hotel Silla u Jagodini je moderan hotel koji kombinuje komfor i eleganciju. Poznat po svom jedinstvenom dizajnu i blizini popularnih turističkih atrakcija, hotel nudi vrhunsku uslugu, moderne konferencijske sale i wellness centar. Posebno se ističe restoran sa panoramskim pogledom na grad.'
        },
        'hotel4': {
            name: 'Hotel BatthanyKastel',
            price: '400$',
            image: 'images/Hotel4.jpg',
            description: 'Smešten u istorijskom zdanju, Hotel BatthanyKastel predstavlja spoj mađarske aristokratske tradicije i modernog luksuza. Svaka soba je jedinstveno uređena i opremljena antiknim nameštajem. Hotel poseduje vinski podrum, spa centar i restoran sa međunarodnom kuhinjom.'
        },
        'hotel5': {
            name: 'LeFtritz Hotel Pirot',
            price: '300$',
            image: 'images/Hotel5.jpg',
            description: 'LeFritz Hotel u Pirotu je ekskluzivni boutique hotel koji spaja lokalnu tradiciju sa modernim luksuzom. Poznat po izuzetnoj usluzi i pažnji prema detaljima, hotel nudi personalizovani pristup svakom gostu. Posebno se ističe restoran sa tradicionalnom pirotskom kuhinjom.'
        },
        'hotel6': {
            name: 'StGeogry Hotel za Bogate',
            price: '780$',
            image: 'images/Hotel6.jpg',
            description: 'StGeogry je vrhunski luksuzni hotel koji postavlja nove standarde u hotelijerstvu. Sa ekskluzivnim apartmanima, privatnim bazenima i 24/7 concierge uslugom, ovaj hotel je dizajniran za najzahtevnije goste. Poseduje michelin zvezdicu restoran i privatni heliodrom.'
        }
    };

    let currentHotel = null;

    // Prikazujemo detalje hotela
    if (hotelId && hotels[hotelId]) {
        currentHotel = hotels[hotelId];
        document.getElementById('hotelName').textContent = currentHotel.name;
        document.getElementById('hotelPrice').textContent = currentHotel.price;
        document.getElementById('hotelDescription').textContent = currentHotel.description;
        document.getElementById('hotelImage').src = currentHotel.image;
    } else {
        // Ako hotel nije pronađen, vraćamo se na početnu stranu
        window.location.href = 'index.html';
    }

    // Postavljamo minimalni datum za check-in na današnji dan
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').min = today;
    document.getElementById('checkOut').min = today;
});

// Funkcije za rad sa modalom
function openModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = 'index.html'; // Vraćamo se na početnu stranu
}

// Funkcija za računanje cene
function calculatePrice() {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    
    if (checkIn && checkOut && checkOut > checkIn) {
        const days = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const pricePerNight = parseInt(document.getElementById('hotelPrice').textContent.replace('$', ''));
        const totalPrice = days * pricePerNight;
        document.getElementById('totalPrice').textContent = totalPrice + ' $';
    }
}

// Funkcija za slanje rezervacije
function submitBooking(event) {
    event.preventDefault();
    
    // Ovde bi u pravoj aplikaciji išao kod za slanje podataka na backend
    
    // Prikazujemo poruku o uspešnoj rezervaciji
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('successModal').style.display = 'block';
    
    // Resetujemo formu
    document.getElementById('bookingForm').reset();
} 