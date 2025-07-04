import https from 'https';

export default async function handler(req, res) {
  https.get('https://www.aydineczaciodasi.org.tr/nobet-rehber', resp => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => {
      try {
        JSON.parse(data);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
      } catch (e) {
        res.status(500).json({ error: 'Geçersiz JSON' });
      }
    });
  }).on('error', () => {
    res.status(500).json({ error: 'Veri alınamadı' });
  });
}
