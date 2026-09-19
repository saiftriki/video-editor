const { spawn } = require("node:child_process");

const makeThumbnail = (fullPath, thumbnailPath) => {
  // ffmpeg -i *.mp4 -ss 5 -vframes 1 thumbnail.jpg

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      fullPath,
      "-ss",
      "5",
      "-vframes",
      "1",
      thumbnailPath,
    ]);

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`FFmpeg exited with this code: ${code}`);
      }
    });

    ffmpeg.on("error", (err) => {
      reject(err);
    });
  });
};

const getDimensions = (fullPath) => {
  // ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 *.mp4
  return new Promise((resolve, reject) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=p=0",
      fullPath,
    ]);
    let dimensions = "";

    ffprobe.stdout.on("data", (data) => {
      dimensions += data.toString("utf8");
    });

    ffprobe.on("close", (code) => {
      if (code === 0) {
        dimensions = dimensions.replace(/\s/g, "").split(",");

        resolve({
          width: Number(dimensions[0]),
          height: Number(dimensions[1]),
        });
      } else {
        reject(`FFprobe exited with this code: ${code}`);
      }
    });

    ffprobe.on("error", (err) => {
      reject(err);
    });
  });
};

const extractAudio = (originalVideoPath, targetAudioPath) => {
  // ffmpeg -i video.mp4 -vn -c:a copy audio.aac
  // ffmpeg -i QuickTime_Movie.mov -vn -c:a mp3 -b:a 256k audio.mp3

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      originalVideoPath,
      "-vn",
      "-c:a",
      "mp3",
      "-b:a",
      "256k",
      targetAudioPath,
    ]);

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`FFmpeg exited with this code: ${code}`);
      }
    });

    ffmpeg.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = {
  makeThumbnail,
  getDimensions,
  extractAudio,
};
