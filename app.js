window.onload = () => {
  document.getElementById('cypher').disabled = true;
  document.getElementById('decypher').disabled = true;

  document.getElementById('message-box').addEventListener('input', () => {
    enableButtons(); 
    addTextAreaRows();
    clearResults();
  });
  document.getElementById('cypher').addEventListener('click', cypher);
  document.getElementById('decypher').addEventListener('click', decypher);
};

const enableButtons = () => {
  if (getMessage().trim().length !== 0) {
    document.getElementById('cypher').disabled = false;
    document.getElementById('decypher').disabled = false;
  } else {
    document.getElementById('cypher').disabled = true;
    document.getElementById('decypher').disabled = true;
  }
};

const addTextAreaRows = () => {
  const txtArea = document.getElementById('message-box');
  txtArea.style.height = '8vh';
  txtArea.style.height = txtArea.scrollHeight + 'px';
};

const clearResults = () => {
  if (document.getElementById('p-group')) 
    document.getElementById('results').removeChild(document.getElementById('p-group'));
};

const cypher = () => {
  const cypheredCharCodes = cypherCharcodes(getCharcodesFromMessage());
  const resultMessage = transformIntoLetters(cypheredCharCodes);
  const method = 'criptografada';
  showResultOnPage(resultMessage, method);
  clearTextArea();
};

const decypher = () => {
  const decypheredCharCodes = decypherCharcodes(getCharcodesFromMessage());
  const resultMessage = transformIntoLetters(decypheredCharCodes);
  const method = 'descriptografada';
  showResultOnPage(resultMessage, method);
  clearTextArea();
};

const getMessage = () => document.getElementById('message-box').value;
const getCharcodesFromMessage = () => getMessage().split('').map(val => val.charCodeAt());

const cypherCharcodes = charcodesArray => charcodesArray.map((charCode, i) => {
  if (charCode > 47 && charCode < 58) {
    charCode = (charCode - 48 + 3) % 10 + 48;
  } else if (charCode > 64 && charCode < 91) {
    charCode = (charCode - 65 + 3) % 26 + 65;
  } if (charCode > 96 && charCode < 192) {
    charCode = (charCode - 97 + 3) % 26 + 97;
  } else if (charCode > 191 && charCode < 222) {
    charCode = (charCode - 192 + 3) % 30 + 192;
  } else if (charCode > 221 && charCode <= 255) {
    charCode = (charCode - 222 + 3) % 34 + 222;
  } 
  return charCode;
});

const decypherCharcodes = charcodesArray => charcodesArray.map((charCode, i) => {
  if (charCode > 47 && charCode < 58) {
    charCode = (charCode - 57 - 3) % 10 + 57;
  } else if (charCode > 64 && charCode < 91) {
    charCode = (charCode - 90 - 3) % 26 + 90;
  } else if (charCode > 96 && charCode < 192) {
    charCode = (charCode - 122 - 3) % 26 + 122;
  } else if (charCode > 191 && charCode < 222) {
    charCode = (charCode - 221 - 3) % 30 + 221;
  } else if (charCode > 221 && charCode <= 255) {
    charCode = (charCode - 255 - 3) % 34 + 255;
  }
  return charCode;
});

const transformIntoLetters = charcodesArray => String.fromCharCode.apply(this, charcodesArray);

const showResultOnPage = (resultMessage, method) => {
  return document.getElementById('results').innerHTML = `
  <div id="p-group">
    <p class="result-fixed-message w-100">Esta é a sua mensagem ${method}:</p>
    <p class="result-text w-100">${resultMessage}</p>
  </div>`;
};

const clearTextArea = () => { 
  document.getElementById('message-box').value = '';
  enableButtons();
  addTextAreaRows();
};