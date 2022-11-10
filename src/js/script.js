console.log('Hello World');

window.onclick = (e) => {
  if (e.target.id === 'closeMenuBtn') {
    if (
      isHidden(
        e.target.parentNode.parentNode.getElementsByClassName(
          'article-content'
        )[0]
      )
    ) {
      e.target.style.transform = 'rotate(0deg)';
      e.target.parentNode.parentNode.getElementsByClassName(
        'article-content'
      )[0].style.display = 'block';
    } else {
      e.target.style.transform = 'rotate(180deg)';
      e.target.parentNode.parentNode.getElementsByClassName(
        'article-content'
      )[0].style.display = 'none';
    }
  }
};

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return style.display === 'none';
}
