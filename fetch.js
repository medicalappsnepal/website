import https from 'https';

https.get('https://www.medicalappsnepal.com/ceemdms/privacy-policy', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data.substring(0, 1000));
  });
});
