/*********************************************************
 * Sissejuhatus erialasse (LTAT.03.002)
 * 2022/2023 sügissemester
 *
 * Veebilehe rühmatöö
 * Metronoomi lehekülje kood
 *
 * Autor: Taavi Künnapuu
 **********************************************************/

const metronome = new Audio('./audio/metronome2.wav'); // Metronoomi heli
var slider = document.getElementById('bpm'); // BPM slaideri objekt

// Muutujad
let playing = false; // Kas metronoom mängib hetkel
let wasPlaying = false; // Kas metronoom mängis enne peatamist
let cleared = false; // Kas interval on tühjendatud
let inited = false; // Kas metronoom on käivitatud
let newBeatAllowed = true; // Kas uus intervall on lubatud.

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
  wasPlaying = playing;
  playing = false;
  inited = false;
}

// Kutsutakse välja kui slaiderile vajutatakse
slider.onmousedown = function () {
  wasPlaying = playing;
  stop();
};

// Kutsutakse välja kui slideri väärtus muutub
slider.oninput = function () {
  bpm = this.value;
  playing = false;
  document.getElementById('bpm-value').innerHTML = bpm;
};

// Funktsioon, mida kutsub välja "Start" nupp
function init() {
  // Kontroll, kas metronoom on käivitatud ja ei tekkiks topelt intervalli
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

// Kutsutakse välja kui slaiderist lahti lastakse
slider.onmouseup = function () {
  if (wasPlaying) {
    play();
    cleared = false;
    newBeatAllowed = false;
  }
};
