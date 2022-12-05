/*********************************************************
 * Sissejuhatus erialasse (LTAT.03.002)
 * 2022/2023 sügissemester
 *
 * Veebilehe rühmatöö
 * Metronoomi lehekülje kood
 *
 * Autor: Taavi Künnapuu
 * Abistas: Gert Kalmus
 *
 **********************************************************/

const metronome = new Audio('./audio/metronome2.wav'); // Metronoomi heli
var slider = document.getElementById('bpm'); // BPM slaideri objekt

// Muutujad
let playing = false; // Kas metronoom mängib hetkel
let wasPlaying = false; // Kas metronoom mängis enne peatamist
let cleared = false; // Kas interval on tühjendatud
let inited = false; // Kas metronoom on käivitatud
let newBeatAllowed = true; // Kas uus intervall on lubatud.
let draggingSlider = false; // Kas slaiderit liigutatakse

var kaheneNupp = document.getElementById('kaheneNupp'); // https://stackoverflow.com/questions/31579700/
kaheneNupp.addEventListener('click', init); // https://stackoverflow.com/questions/31579700/

// Funktioon, mis käivitab metronoomi
async function play() {
  // Muudame "playing" muutuja trueks, et näidata, et metronoom on käivitatud
  playing = true;
  metronome.play();

  // Interval, mis käivitab metronoomi uuesti iga 60/bpm sekundi järel
  const interval = setInterval(() => {
    //Abi interval, mis lõpetab metronoomi intervali õigel ajal.
    const refresh = setInterval(() => {
      if (!playing) {
        clearInterval(refresh);
        clearInterval(interval);
        cleared = true;
      }
    }, 25);

    // Metronoomi interval, mis teeb heli kui "playing" on true, vastasel juhul lõpetab intervali
    if (!playing) {
      clearInterval(interval);
      cleared = true;
    } else {
      metronome.play();
      newBeatAllowed = true;
    }
  }, 60000 / bpm);

  // Kontroll, kas uus intervall on lubatud.
  if (!newBeatAllowed) {
    clearInterval(interval);
  }
}

// Stop funktsioon. Muudab muutujate väärtusi vastavalt.
function stop() {
  if (!draggingSlider) {
    kaheneNupp.removeEventListener('click', stop); // https://stackoverflow.com/questions/31579700/
    kaheneNupp.addEventListener('click', init);
    kaheneNupp.value = 'Start';
  }
  wasPlaying = playing;
  playing = false;
  inited = false;
}

// Kutsutakse välja kui slaiderile vajutatakse
slider.onmousedown = function () {
  wasPlaying = playing;
  draggingSlider = true;
  stop();
};

// Kutsutakse välja kui slideri väärtus muutub
slider.oninput = function () {
  bpm = this.value;
  playing = false;
  document.getElementById('bpm-value').innerHTML = bpm;
};

// Kutsutakse välja kui slaiderist lahti lastakse
slider.onmouseup = function () {
  if (wasPlaying) {
    play();
    cleared = false;
    newBeatAllowed = false;
  }
  draggingSlider = false;
};

// Funktsioon, mida kutsub välja "Start" nupp
function init() {
  // Kontroll, kas metronoom on käivitatud ja ei tekkiks topelt intervalli
  kaheneNupp.removeEventListener('click', init); // https://stackoverflow.com/questions/31579700/
  kaheneNupp.addEventListener('click', stop);
  kaheneNupp.value = 'Stop';

  if (!inited) {
    inited = true;
    play();
  } else {
    if (wasPlaying) {
      play();
      cleared = false;
      newBeatAllowed = false;
    }
  }
}
