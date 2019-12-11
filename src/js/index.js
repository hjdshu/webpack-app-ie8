require('../css/main.less');

function component() {
  var element = document.createElement('div');

  element.innerHTML = 'Hello boy webpack4! javascript is runnig!'
  return element;
}

document.body.appendChild(component());