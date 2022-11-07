const metronome = new Audio('metronome.wav');

let playing = false;

function play() {
  playing = true;
  const interval = setInterval(() => {
    if (!playing) {
      clearInterval(interval);
    }
    metronome.play();
  }, 1000);
}

function stop() {
  playing = false;
}
