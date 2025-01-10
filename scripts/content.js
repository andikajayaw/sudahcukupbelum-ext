function getPrice() {
  const priceRegex = /Rp\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/g;
  const elements = document.body.getElementsByTagName('*');

  for (let element of elements) {
    if (element.childNodes.length > 0) {
      element.childNodes.forEach(node => {
        if (node.nodeType === 3) {
          const text = node.nodeValue;
          const matches = text.match(priceRegex);
          let newText = text;

          if (matches) {
            matches.forEach(match => {

              let dailyGaji = 0;
              let dayOfWork = 0;
              const price = parseFloat(match.replace(/[^0-9,-]+/g, '').replace(',', '.'));

              dailyGaji = Math.round(gaji / 21);
              dayOfWork = Math.floor(price / dailyGaji);
              let savings = dailyGaji * (percent / 100);
              dayOfSaving = Math.floor(Number(price) / savings);
              dailySavings = dayOfSaving;
              
              const replacementText = `${match} \n= ${dailyGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} * ${dayOfWork} hari kerja`;
              newText = newText.replace(match, replacementText);

              const newText = document.createElement('span');
              newSpan.classList.add('andikajayaw');
              newText.innerHTML = newText;
              newText.style.color = 'green';
              newText.style.cursor = 'pointer';
              newText.title = newText;

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