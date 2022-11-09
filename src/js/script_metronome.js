const metronome = new Audio('./audio/metronome2.wav');
var slider = document.getElementById('bpm');

let playing = false;

function play() {
  playing = true;
  console.log(bpm);
  const interval = setInterval(() => {
    if (!playing) {
      clearInterval(interval);
    }
    metronome.play();
  }, 60000 / bpm);
}

function stop() {
  playing = false;
}

slider.oninput = function () {
  bpm = this.value;
  document.getElementById('bpm-value').innerHTML = bpm;
};
