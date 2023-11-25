import { Howl } from "howler";

// sample rate of the example file
let SAMPLE_RATE = 48000;
let sound: Howl | null = null;

function startMonitoringSeekPosition() {
  if (!sound) {
    return;
  }

  const seekPosition = sound.seek();

  document.querySelector<HTMLDivElement>(
    "#seek-position"
  )!.innerHTML = `Seek position: ${seekPosition}s`;

  if (seekPosition > sound.duration()) {
    document.querySelector(
      "#seeks-beyond-duration"
    )!.innerHTML += `Beyond duration: ${seekPosition}s - delta: ${
      (seekPosition - sound.duration()) * SAMPLE_RATE
    } samples<br>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(startMonitoringSeekPosition, 1);

  document.querySelector("#playButton")!.addEventListener("click", () => {
    if (sound) {
      if (!sound.playing()) {
        sound.play();
      }
    } else {
      sound = new Howl({
        src: ["./sound.wav"],
        autoplay: true,
        loop: true,
        volume: 0.5,
        onload: function () {
          document.querySelector<HTMLDivElement>(
            "#duration"
          )!.innerHTML = `Duration: ${sound!.duration()}s`;
        },
      });
    }
  });

  document.querySelector("#stopButton")!.addEventListener("click", () => {
    if (sound) {
      sound.stop();
    }
  });
});
