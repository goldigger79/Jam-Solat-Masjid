// netlify/functions/waktu-solat.js

// Menggunakan node-fetch untuk membuat permintaan dari server
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // Dapatkan kod zon dari parameter URL (contoh: /api/waktu-solat?zone=WLY01)
  const zone = event.queryStringParameters.zone || 'WLY01';

  // URL API rasmi JAKIM
  const JAKIM_API_URL = `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=${zone}`;

  try {
    const response = await fetch(JAKIM_API_URL);
    const data = await response.json();

    // Hantar data yang diterima dari JAKIM kembali kepada aplikasi web kita
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Benarkan akses dari mana-mana domain
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Uruskan ralat jika gagal menghubungi API JAKIM
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal menghubungi API JAKIM.' }),
    };
  }
};
