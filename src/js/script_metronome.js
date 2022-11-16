const metronome = new Audio('./audio/metronome2.wav');
var slider = document.getElementById('bpm');

let playing = false;
let wasPlaying = false;
let cleared = false;

async function play() {
  playing = true;
  console.log(bpm);
  const interval = setInterval(() => {
    if (!playing) {
      clearInterval(interval);
      console.log('stopped');
      cleared = true;
    } else {
      metronome.play();
    }
  }, 60000 / bpm);
}

function stop() {
  playing = false;
}

slider.onmousedown = function () {
  wasPlaying = playing;
  stop();
};

slider.oninput = function () {
  bpm = this.value;
  playing = false;
  document.getElementById('bpm-value').innerHTML = bpm;
};

slider.onmouseup = function () {
  if (wasPlaying && !cleared) {
    console.log('Alsutas liiga ruttu, error');
  } else if (wasPlaying && cleared) {
    play();
    cleared = false;
  }
};
