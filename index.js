const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Veri seti (deyimler.json dosyasını oku)
const deyimler = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'deyimler.json'), 'utf8'));

// Ana sayfa route
app.get('/', (req, res) => {
  res.render('index', {
    deyimler: deyimler
  });
});

// Filtreleme route
app.post('/filtrele', (req, res) => {
  const anahtarKelime = req.body.anahtarKelime.toLowerCase().trim();
  const filtrelenmisDeyimler = deyimler.filter(deyim => {
    // Deyim adı içinde anahtar kelimeyi içeren deyimleri filtrele
    return deyim.deyim_adi.toLowerCase().includes(anahtarKelime);
  });
  res.render('index', {
    deyimler: filtrelenmisDeyimler
  });
});

// İletişim formu route
app.get('/iletisim', (req, res) => {
  res.render('iletisim');
});

app.post('/iletisim', (req, res) => {
  // Form verilerini al
  const { adSoyad, email, telefon, mesaj } = req.body;
  // Veritabanına veya başka bir servise kaydetme işlemi burada olabilir
  // Örneğin: console.log(adSoyad, email, telefon, mesaj);
  res.send('İletişim formu başarıyla gönderildi.');
});

// Server dinlemesi
const PORT = 7043;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

