require('../css/product.less');

function component() {
  var element = document.createElement('div');

  element.innerHTML = 'Hello product!'
  return element;
}

document.body.appendChild(component());