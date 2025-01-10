function convertToDailySavings(price) {
  const dailySavings = price / 100;
  return dailySavings.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

function getPrice() {
  const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
  const elements = document.body.getElementsByTagName('*');

  for (let element of elements) {
    if (element.childNodes.length > 0) {
      element.childNodes.forEach(node => {
        if (node.nodeType === 3) {
          const text = node.nodeValue;
          const matches = text.match(priceRegex);

          console.log(matches)
          if (matches) {
            matches.forEach(match => {
              console.log(match)
              const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));

              const dailySavings = convertToDailySavings(price);

              const newText = document.createElement('span');
              newText.innerHTML = `${match} (Nabung ${dailySavings} setiap hari selama 100 hari).`;
              newText.style.color = 'green';
              newText.style.cursor = 'pointer';
              newText.title = `Nabung ${dailySavings} setiap hari selama 100 hari.`;

              if (node.parentNode) {
                node.parentNode.replaceChild(newText, node);
              }
              // return price
            });
          }
        }
      });
    }
  }
}

getPrice();

// (() => {
//   function convertToDailySavings(price) {
//     const dailySavings = price / 100;
//     return dailySavings.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
//   }
  
//   function getPrice() {
//     const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
//     const elements = document.body.getElementsByTagName('*');
  
//     for (let element of elements) {
//       if (element.childNodes.length > 0) {
//         element.childNodes.forEach(node => {
//           if (node.nodeType === 3) {
//             const text = node.nodeValue;
//             const matches = text.match(priceRegex);
  
//             console.log(matches)
//             if (matches) {
//               matches.forEach(match => {
//                 console.log(match)
//                 const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
  
//                 const dailySavings = convertToDailySavings(price);
  
//                 const newText = document.createElement('span');
//                 newText.innerHTML = `${match} (Nabung ${dailySavings} setiap hari selama 100 hari).`;
//                 newText.style.color = 'green';
//                 newText.style.cursor = 'pointer';
//                 newText.title = `Nabung ${dailySavings} setiap hari selama 100 hari.`;
  
//                 if (node.parentNode) {
//                   node.parentNode.replaceChild(newText, node);
//                 }
//                 // return price
//               });
//             }
//           }
//         });
//       }
//     }
//   }
  
//   const price = getPrice();
//   if (price) {
//     console.log(`Harga barang: ${price}`);
//     price; // Kirim harga ke popup
//   } else {
//     console.log("Tidak dapat menemukan harga barang.");
//     null; // Tidak ada harga yang ditemukan
//   }
// })();
