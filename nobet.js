import https from 'https';

export default async function handler(req, res) {
  const options = {
    hostname: 'www.aydineczaciodasi.org.tr',
    path: '/nobet-rehber',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'
    }
  };

  const request = https.request(options, response => {
    let data = '';
    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(json));
      } catch (e) {
        res.status(500).json({ error: 'Geçersiz JSON' });
      }
    });
  });

  request.on('error', () => {
    res.status(500).json({ error: 'Veri alınamadı' });
  });

  request.end();
}
