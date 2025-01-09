(() => {
  function getPrice() {
    const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
    const elements = document.body.getElementsByTagName('*');

    for (let element of elements) {
      if (element.childNodes.length > 0) {
        element.childNodes.forEach(node => {
          if (node.nodeType === 3) {
            const text = node.nodeValue;
            const matches = text.match(priceRegex);
  
            if (matches) {
              matches.forEach(match => {
                const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));
                return price
              });
            }
          }
        });
      }
    }
  }
  
  const price = getPrice();
  if (price) {
    console.log(`Harga barang: ${price}`);
    price; // Kirim harga ke popup
  } else {
    console.log("Tidak dapat menemukan harga barang.");
    null; // Tidak ada harga yang ditemukan
  }
})();
  