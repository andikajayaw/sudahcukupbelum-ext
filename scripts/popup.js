// Get references to the slider and its value display
const percentSlider = document.getElementById('percent-slider');
const percentValue = document.getElementById('percent-value');

// Update the displayed number of percent when the slider value changes
percentSlider.addEventListener('input', () => {
  percentValue.textContent = percentSlider.value;
});


document.getElementById("calculate").addEventListener("click", () => {
    const gaji = parseFloat(document.getElementById("gaji").value);
    const percent = parseInt(percentSlider.value); // Get the selected number percent from the slider
  
    if (isNaN(gaji) || gaji <= 0) {
      alert("Masukkan gaji yang valid!");
      return;
    }
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            const priceElement = document.querySelector(".price");
            if (priceElement) {
              const priceText = priceElement.textContent.replace(/[^\d]/g, "");
              return parseFloat(priceText);
            }
            return null;
          },
        },
        (results) => {
          if(results) {
            const price = results[0]?.result;
            let dailyGaji = 0;
            let dayOfWork = 0;
            // const hari = (price / gaji).toFixed(2);
            // const dailySavings = price / days;
            let realGaji = gaji * (percent / 100)
            dailyGaji = realGaji / 5;
            dayOfWork = Math.floor(price / dailyGaji);
            let savings = dailyGaji * (percent / 100);
            let dayOfSaving = Math.floor(Number(price) / savings);
            if (price) {
              document.getElementById("result").innerText = `Gaji bulanan Anda adalah: ${gaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nGaji harian Anda adalah: ${dailyGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nJika disisihkan ${percent}% dari gaji harian diatas untuk ditabung maka jumlahnya adalah: ${savings.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nHarga barang yang ingin Anda beli: ${price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n`
              if (dayOfWork >= 10) {
                document.getElementById("result").innerText +=
                  `Butuh usaha keras untuk barang ini! Pertimbangkan kembali pembelian Anda.\n Harga barang tersebut setara dengan ${dayOfWork} hari kerja Anda dan Anda perlu menabung ${percent}% dari hasil gaji harian Anda sampai ${dayOfSaving} hari.`;
              } else {
                document.getElementById("result").innerText +=
                  `Barang ini cukup terjangkau dengan gaji Anda!. Harga barang tersebut setara dengan ${dayOfWork} hari kerja Anda atau Anda hanya perlu menabung selama ${dayOfSaving} hari.`;
              }
            } else {
              document.getElementById("result").innerText =
                "Silahkan arahkan ke halaman detail barang. Tidak dapat menemukan harga barang di halaman ini.";
            }
          } else {
            document.getElementById("result").innerText =
                "Silahkan arahkan ke halaman detail barang. Tidak dapat menemukan harga barang di halaman ini.";
          }
        }
      );
    });
  });
  