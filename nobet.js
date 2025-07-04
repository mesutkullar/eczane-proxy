import https from "https";

// Ön bellek verisi
let cache = null;
let lastUpdate = 0;

export default async function handler(req, res) {
  const now = Date.now();
  // 10 dakika güncelleme aralığı
  if (!cache || now - lastUpdate > 600000) {
    cache = await fetchData();
    lastUpdate = now;
  }

  if (cache.error) {
    res.status(500).json({ error: cache.error });
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(cache));
  }
}

function fetchData() {
  return new Promise(resolve => {
    const options = {
      hostname: "www.aydineczaciodasi.org.tr",
      path: "/nobet-rehber",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)"
      }
    };
    https
      .get(options, resp => {
        let data = "";
        resp.on("data", chunk => (data += chunk));
        resp.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch {
            resolve({ error: "Geçersiz JSON" });
          }
        });
      })
      .on("error", () => resolve({ error: "Veri alınamadı" }));
  });
}
