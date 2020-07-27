class BeatKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.play = document.querySelector(".play");
    this.selectedKick = "/sounds/kick/kick-classic.wav";
    this.selectedSnare = "/sounds/snare/snare-808.wav";
    this.selectedHihat = "/sounds/hihat/hihat-808.wav";
    this.selectedClap = "/sounds/clap/clap-808.wav";
    this.selectedTom = "/sounds/tom/tom-808.wav";
    this.selectedMisc = "/sounds/misc/cowbell-808.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.tomAudio = document.querySelector(".tom-sound");
    this.miscAudio = document.querySelector(".misc-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 16;
    const active = document.querySelectorAll(`.b${step}`);
    //loop over bars
    active.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("tom-pad")) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
        if (bar.classList.contains("misc-pad")) {
          this.miscAudio.currentTime = 0;
          this.miscAudio.play();
        }
      }
    });

    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //is playing?
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateButton() {
    if (!this.isPlaying) {
      this.play.innerText = "Stop";
      this.play.classList.add("active");
    } else {
      this.play.innerText = "Play";
      this.play.classList.remove("active");
    }
  }

  changeSound(e) {
    const soundName = e.target.name;
    const soundValue = e.target.value;
    switch (soundName) {
      case "kick-select":
        this.kickAudio.src = soundValue;
        break;
      case "snare-select":
        this.snareAudio.src = soundValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = soundValue;
        break;
      case "clap-select":
        this.clapAudio.src = soundValue;
      case "tom-select":
        this.tomAudio.src = soundValue;
      case "misc-select":
        this.miscAudio.src = soundValue;
    }
  }

  changeTempo(e) {
    const text = document.querySelector(".tempo-num");
    text.innerText = e.target.value;
  }

  updateTempo(e) {
    this.bpm = e.target.value;

    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "4":
          this.tomAudio.volume = 0;
        case "5":
          this.miscAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "4":
          this.tomAudio.volume = 1;
        case "5":
          this.miscAudio.volume = 1;
          break;
      }
    }
  }
}

const beatKit = new BeatKit();

beatKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    beatKit.changeSound(e);
  });
});

beatKit.pads.forEach((pad) => {
  pad.addEventListener("click", beatKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
beatKit.play.addEventListener("click", () => {
  beatKit.updateButton();
  beatKit.start();
});

beatKit.muteButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    beatKit.mute(e);
  });
});

beatKit.tempoSlider.addEventListener("input", function (e) {
  beatKit.changeTempo(e);
});

beatKit.tempoSlider.addEventListener("change", function (e) {
  beatKit.updateTempo(e);
});
