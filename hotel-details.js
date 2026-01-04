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
            description: 'Hotel Krusevac Smokva je luksuzni hotel smešten u srcu Kruševca. Sa svojom jedinstvenom atmosferom i prelepim vrtom sa smokvama, ovaj hotel predstavlja savršen spoj tradicionalnog i modernog. Gostima su na raspolaganju spa centar, restoran sa domaćom kuhinjom i prostrane sobe sa pogledom na grad.',
            additionalImages: [
                { src: 'images/Hotel1Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel1Bathroom.jpg', name: 'Kupatilo' },
                { src: 'images/Hotel1Bedroom.jpg', name: 'Spavaća soba' }
            ]
        },
        'hotel2': {
            name: 'Hotel Sombor Ravnica',
            price: '200$',
            image: 'images/Hotel2.jpg',
            description: 'U srcu vojvođanske ravnice, Hotel Sombor Ravnica nudi autentično iskustvo boravka u Vojvodini. Hotel se ponosi svojom tradicionalnom arhitekturom, prostranim sobama i restoranom koji služi najbolja lokalna jela. Idealan je za poslovne putnike i turiste koji žele da istraže lepote Vojvodine.',
            additionalImages: [
                { src: 'images/Hotel2Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel2Bed.jpg', name: 'Krevet' },
                { src: 'images/Hotel2Kitchen.jpg', name: 'Kuhinja' }
            ]
        },
        'hotel3': {
            name: 'Hotel Silla Jagodina',
            price: '250$',
            image: 'images/Hotel3.jpg',
            description: 'Hotel Silla u Jagodini je moderan hotel koji kombinuje komfor i eleganciju. Poznat po svom jedinstvenom dizajnu i blizini popularnih turističkih atrakcija, hotel nudi vrhunsku uslugu, moderne konferencijske sale i wellness centar. Posebno se ističe restoran sa panoramskim pogledom na grad.',
            additionalImages: [
                { src: 'images/Hotel3Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel3Bathroom.jpg', name: 'Kupatilo' },
                { src: 'images/Hotel3Bed.jpg', name: 'Krevet' }
            ]
        },
        'hotel4': {
            name: 'Hotel BatthanyKastel',
            price: '400$',
            image: 'images/Hotel4.jpg',
            description: 'Smešten u istorijskom zdanju, Hotel BatthanyKastel predstavlja spoj mađarske aristokratske tradicije i modernog luksuza. Svaka soba je jedinstveno uređena i opremljena antiknim nameštajem. Hotel poseduje vinski podrum, spa centar i restoran sa međunarodnom kuhinjom.',
            additionalImages: [
                { src: 'images/Hotel4Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel4Bathroom.jpg', name: 'Kupatilo' },
                { src: 'images/Hotel4Bed.jpg', name: 'Krevet' }
            ]
        },
        'hotel5': {
            name: 'LeFtritz Hotel Pirot',
            price: '300$',
            image: 'images/Hotel5.jpg',
            description: 'LeFritz Hotel u Pirotu je ekskluzivni boutique hotel koji spaja lokalnu tradiciju sa modernim luksuzom. Poznat po izuzetnoj usluzi i pažnji prema detaljima, hotel nudi personalizovani pristup svakom gostu. Posebno se ističe restoran sa tradicionalnom pirotskom kuhinjom.',
            additionalImages: [
                { src: 'images/Hotel5Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel5Bathroom.jpg', name: 'Kupatilo' },
                { src: 'images/Hotel5Bed.jpg', name: 'Krevet' }
            ]
        },
        'hotel6': {
            name: 'StGeogry Hotel za Bogate',
            price: '780$',
            image: 'images/Hotel6.jpg',
            description: 'StGeogry je vrhunski luksuzni hotel koji postavlja nove standarde u hotelijerstvu. Sa ekskluzivnim apartmanima, privatnim bazenima i 24/7 concierge uslugom, ovaj hotel je dizajniran za najzahtevnije goste. Poseduje michelin zvezdicu restoran i privatni heliodrom.',
            additionalImages: [
                { src: 'images/Hotel6Main.jpg', name: 'Glavna slika' },
                { src: 'images/Hotel6Bathroom.jpg', name: 'Kupatilo' },
                { src: 'images/Hotel6Bed.jpg', name: 'Krevet' }
            ]
        }
    };

    let currentHotel = null;
    let additionalImages = [];

    // Funkcija za određivanje naziva slike na osnovu putanje
    function getImageName(imagePath) {
        const fileName = imagePath.split('/').pop().toLowerCase();
        if (fileName.includes('main')) return 'Glavna slika';
        if (fileName.includes('bathroom')) return 'Kupatilo';
        if (fileName.includes('bedroom')) return 'Spavaća soba';
        if (fileName.includes('bed')) return 'Krevet';
        if (fileName.includes('kitchen')) return 'Kuhinja';
        return 'Slika';
    }

    // Funkcija za zamenu slika
    function swapImage(clickedIndex) {
        const mainImage = document.getElementById('hotelImage');
        const currentMainSrc = mainImage.src;
        
        if (clickedIndex < 0 || clickedIndex >= additionalImages.length) return;
        
        // Zameni glavnu sliku sa kliknutom
        const clickedImageData = additionalImages[clickedIndex];
        mainImage.src = clickedImageData.src;
        
        // Dodaj trenutnu glavnu sliku na mesto kliknute
        additionalImages[clickedIndex] = {
            src: currentMainSrc,
            name: getImageName(currentMainSrc)
        };
        
        // Ažuriraj prikaz dodatnih slika
        displayAdditionalImages();
    }

    // Funkcija za prikaz dodatnih slika
    function displayAdditionalImages() {
        const additionalImagesContainer = document.getElementById('additionalImages');
        additionalImagesContainer.innerHTML = '';
        
        additionalImages.forEach((imgData, index) => {
            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.name;
            img.title = imgData.name;
            img.onclick = () => swapImage(index);
            additionalImagesContainer.appendChild(img);
        });
    }

    // Prikazujemo detalje hotela
    if (hotelId && hotels[hotelId]) {
        currentHotel = hotels[hotelId];
        document.getElementById('hotelName').textContent = currentHotel.name;
        document.getElementById('hotelPrice').textContent = currentHotel.price;
        document.getElementById('hotelDescription').textContent = currentHotel.description;
        
        // Postavljamo glavnu sliku
        const mainImage = document.getElementById('hotelImage');
        mainImage.src = currentHotel.image;
        
        // Postavljamo dodatne slike (bez glavne)
        additionalImages = currentHotel.additionalImages ? [...currentHotel.additionalImages] : [];
        
        // Prikazujemo dodatne slike
        displayAdditionalImages();
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
    document.getElementById('bookingModal').style.display = 'flex';
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

// EmailJS konfiguracija
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'qdgRPF7ibOaFcqufZ',      // Vaš Public Key sa EmailJS dashboard-a
    SERVICE_ID: 'service_e8to4ak',        // ID email servisa (Gmail, Outlook, itd.)
    TEMPLATE_ID: 'template_mynbhna',    // ID email template-a
    ENABLED: true                      // Postavite na true kada dodate svoje ključeve
};

// Inicijalizacija EmailJS (samo ako je omogućeno)
if (EMAILJS_CONFIG.ENABLED && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Funkcija za slanje rezervacije
function submitBooking(event) {
    event.preventDefault();
    
    // Uzimamo podatke iz forme
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const totalPrice = document.getElementById('totalPrice').textContent;
    const hotelName = document.getElementById('hotelName').textContent;
    const hotelPrice = document.getElementById('hotelPrice').textContent;
    
    // Proveravamo da li je email unet
    if (!email || email.trim() === '') {
        alert('Molimo unesite email adresu!');
        return;
    }
    
    // Pripremamo podatke za email
    const emailData = {
        to_email: email.trim(),
        to_name: name,
        hotel_name: hotelName,
        check_in: checkIn,
        check_out: checkOut,
        price_per_night: hotelPrice,
        total_price: totalPrice,
        from_name: 'HotelApp',
        reply_to: email.trim()  // Email za odgovore
    };
    
    // Ako je EmailJS omogućen, šaljemo email
    if (EMAILJS_CONFIG.ENABLED && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, emailData)
            .then(function(response) {
                // Prikazujemo poruku o uspešnoj rezervaciji
                document.getElementById('bookingModal').style.display = 'none';
                document.getElementById('successModal').style.display = 'flex';
                
                // Resetujemo formu
                document.getElementById('bookingForm').reset();
            }, function(error) {
                // Detaljno logovanje greške
                console.error('❌ DETALJNA GREŠKA:', {
                    status: error.status,
                    text: error.text,
                    error: error
                });
                
                // Specifične poruke za različite greške
                let errorMessage = 'Greška pri slanju email-a.\n\n';
                
                if (error.status === 400) {
                    errorMessage += 'Greška 400: Neispravni podaci.\n';
                    errorMessage += 'Proverite da li su sve varijable u template-u tačno napisane.';
                } else if (error.status === 401) {
                    errorMessage += 'Greška 401: Neispravan Public Key.\n';
                    errorMessage += 'Proverite da li je PUBLIC_KEY tačan u kodu.';
                } else if (error.status === 404) {
                    errorMessage += 'Greška 404: Servis ili Template nije pronađen.\n';
                    errorMessage += 'Proverite SERVICE_ID i TEMPLATE_ID u kodu.';
                } else if (error.status === 412) {
                    errorMessage += 'Greška 412: Problem sa dozvolama email servisa.\n';
                    errorMessage += 'Ako koristite Gmail, probajte EmailJS servis umesto Gmail-a.';
                } else if (error.text) {
                    errorMessage += `Detalji: ${error.text}`;
                } else {
                    errorMessage += `Status: ${error.status || 'Nepoznata greška'}`;
                }
                
                errorMessage += '\n\nProverite konzolu (F12) za više detalja.';
                
                alert(errorMessage);
            });
    } else {
        // Test mod - EmailJS nije omogućen
        // Prikazujemo poruku o uspešnoj rezervaciji
        document.getElementById('bookingModal').style.display = 'none';
        document.getElementById('successModal').style.display = 'flex';
        
        // Resetujemo formu
        document.getElementById('bookingForm').reset();
    }
} 