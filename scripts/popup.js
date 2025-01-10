document.getElementById("calculate").addEventListener("click", () => {
    const gaji = parseFloat(document.getElementById("gaji").value);
    const percent = 0; // Get the selected number percent from the slider
  
    if (isNaN(gaji) || gaji <= 0) {
      alert("Masukkan gaji yang valid!");
      return;
    }
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: (gaji, percent) => {
              // const priceElement = document.querySelector(".price");
              // if (priceElement) {
              //   const priceText = priceElement.textContent.replace(/[^\d]/g, "");
              //   // return parseFloat(priceText);
              // }
              function getPricesOnPage() {
                const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;

                function getTextNode(node) {
                  const text = node.nodeValue;
                  const matches = text.match(priceRegex);
    
                  if (matches) {
                    console.log(matches, priceElement)
                    let newText = text;
                    let dailySavings = null;
                    // const gaji = parseFloat(document.getElementById("gaji").value);
                    matches.forEach(match => {
                      let dailyGaji = 0;
                      let dayOfWork = 0;
                      const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
                      // const hari = (price / gaji).toFixed(2);
                      // const dailySavings = price / days;
                      dailyGaji = Math.round(gaji / 21);
                      dayOfWork = Math.floor(price / dailyGaji);
                      // let savings = dailyGaji * (percent / 100);
                      // dayOfSaving = Math.floor(Number(price) / savings);
                      // dailySavings = dayOfSaving;
                      const replacementText = `${match} \n= ${dailyGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} * ${dayOfWork} hari kerja`;
                      newText = newText.replace(match, replacementText);

                    });
                    
                    const newSpan = document.createElement('span');
                    newSpan.classList.add('andikajayaw');
                    newSpan.innerHTML = newText;
                    newSpan.style.color = 'green';
                    newSpan.style.cursor = 'pointer';
                    newSpan.title = newText;
                    if (node.parentNode) {
                      node.parentNode.replaceChild(newSpan, node);
                    }
                  }
                }
    
                function walkDOM(node) {
                  if (node.nodeType === 3) {
                    // Text node
                    getTextNode(node);
                  } else if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'script') {
                    // Element node, exclude <script> tags
                    Array.from(node.childNodes).forEach(walkDOM);
                  }
                }
    
                walkDOM(document.body);
              }
    
              getPricesOnPage();
              // return null;
            },
            args: [gaji, percent]
          },
          // (results) => {
          //   if(results) {
          //     // const price = results[0]?.result;
          //     // let dailyGaji = 0;
          //     // let dayOfWork = 0;
          //     // // const hari = (price / gaji).toFixed(2);
          //     // // const dailySavings = price / days;
          //     // let realGaji = gaji * (percent / 100)
          //     // dailyGaji = realGaji / 21;
          //     // dayOfWork = Math.floor(price / dailyGaji);
          //     // let savings = dailyGaji * (percent / 100);
          //     // let dayOfSaving = Math.floor(Number(price) / savings);
          //     // if (price) {
          //     //   document.getElementById("result").innerText = `Gaji bulanan Anda adalah: ${gaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nGaji harian Anda adalah: ${dailyGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nJika disisihkan ${percent}% dari gaji harian diatas untuk ditabung maka jumlahnya adalah: ${savings.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nHarga barang yang ingin Anda beli: ${price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\n`
          //     //   if (dayOfWork >= 10) {
          //     //     document.getElementById("result").innerText +=
          //     //       `Butuh usaha keras untuk barang ini! Pertimbangkan kembali pembelian Anda.\n Harga barang tersebut setara dengan ${dayOfWork} hari kerja Anda dan Anda perlu menabung ${percent}% dari hasil gaji harian Anda sampai ${dayOfSaving} hari.`;
          //     //   } else {
          //     //     document.getElementById("result").innerText +=
          //     //       `Barang ini cukup terjangkau dengan gaji Anda!. Harga barang tersebut setara dengan ${dayOfWork} hari kerja Anda atau Anda hanya perlu menabung selama ${dayOfSaving} hari.`;
          //     //   }
          //     // } else {
          //     //   document.getElementById("result").innerText =
          //     //     "Silahkan arahkan ke halaman detail barang. Tidak dapat menemukan harga barang di halaman ini.";
          //     // }

          //     function convertPricesOnPage() {
          //       const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
    
          //       /**
          //        * Processes a single text node to find prices and convert them.
          //        * @param {Node} node - The text node to process.
          //        */
          //       function processTextNode(node) {
          //         const text = node.nodeValue;
          //         const matches = text.match(priceRegex);
    
          //         if (matches) {
          //           let newText = text;
          //           let dailySavings = null;
          //           // const gaji = parseFloat(document.getElementById("gaji").value);
          //           matches.forEach(match => {
          //             console.log(match);
          //             let dailyGaji = 0;
          //             let dayOfWork = 0;
          //             const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
          //             // const hari = (price / gaji).toFixed(2);
          //             // const dailySavings = price / days;
          //             let realGaji = gaji * (percent / 100)
          //             dailyGaji = realGaji / 5;
          //             dayOfWork = Math.floor(price / dailyGaji);
          //             let savings = dailyGaji * (percent / 100);
          //             let dayOfSaving = Math.floor(Number(price) / savings);
                      
          //             // dailySavings = convertToDailySavings(price, days);
          //             // const replacementText = `${match}`;
          //             const replacementText = `${match} = ${dailyGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} * ${dayOfWork} hari kerja`;
          //             newText = newText.replace(match, replacementText);
          //           });
    
          //           const newSpan = document.createElement('span');
          //           newSpan.classList.add('andikajayaw');
          //           newSpan.innerHTML = newText;
          //           newSpan.style.color = 'green';
          //           newSpan.style.cursor = 'pointer';
          //           newSpan.title = `xxx`;
          //           if (node.parentNode) {
          //             node.parentNode.replaceChild(newSpan, node);
          //           }
          //         }
          //       }
    
          //       /**
          //        * Recursively traverses the DOM tree and processes text nodes to convert prices.
          //        * @param {Node} node - The current node in the DOM tree.
          //        */
          //       function walkDOM(node) {
          //         if (node.nodeType === 3) {
          //           // Text node
          //           processTextNode(node);
          //         } else if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'script') {
          //           // Element node, exclude <script> tags
          //           Array.from(node.childNodes).forEach(walkDOM);
          //         }
          //       }
    
          //       walkDOM(document.body);
          //     }
    
          //     convertPricesOnPage();
          //   } else {
          //     // document.getElementById("result").innerText =
          //     //     "Silahkan arahkan ke halaman detail barang. Tidak dapat menemukan harga barang di halaman ini.";
          //   }
          // }
        );
      } else {
        alert("Tidak ada harga barang yang bisa dihitung.");
      }
    });
  });
  