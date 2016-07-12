
const height = window.innerHeight;
const width = window.innerWidth;

console.log(width + " -- " + height);

function draw (startDataArr) {
  ctxSquare.fillStyle = 'white';
  startDataArr.forEach(function(star) {
    ctxSquare.beginPath();
    ctxSquare.arc(star.x, star.y, star.radius, 0, 2* Math.PI, false);
    ctxSquare.fill();
  });
}

function getStarDataArr(starMap) {
  var starArr = [];
  for(const stars of starMap.values())  {
    for(let i = 0; i < stars.count; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      starArr.push({x, y, radius: stars.radius})
    }
  }
  return starArr;
}

function updatePos() {

  ctxSquare.clearRect(0,0,width, height);
  startDataArr.forEach(function(star) {
    // let x = star.x + 0;
    let y = star.y + star.radius;
    // x = x > width ? 0: x;
    y = y > height ? 0: y;
    // star.x = x;
    star.y = Math.floor(y);
  });
  draw(startDataArr);
  window.requestAnimationFrame(updatePos);
}

function init() {
  draw(startDataArr);
  updatePos(startDataArr);
}

const canvas = document.getElementById('canvasBg');
canvas.height = height;
canvas.width = width;

const ctxSquare = canvas.getContext('2d');

const starMap = new Map([
  ["MEDIUM", {count: 80, radius: 2}],
  ["SMALL", {count: 160, radius: 1}]
]);

const startDataArr = getStarDataArr(starMap);

init (startDataArr);


