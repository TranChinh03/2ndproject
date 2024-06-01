import React, { useEffect, useRef, useState } from "react";
import styles from "./game_page.module.css";
import { SLRdetect } from "../../utilities/detect.js";

const GamePage = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 500;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    const colors = {
      gray: "#646464",
      green: "#4CD038",
      red: "#C80000",
      white: "#FFFFFF",
      yellow: "#FFE800",
    };

    const roadWidth = 200;
    const markerWidth = 10;
    const markerHeight = 50;

    const leftLane = 200;
    const rightLane = 300;
    const lanes = [leftLane, rightLane];

    const playerX = leftLane; // Start in the left lane
    const playerY = 400;
    const fps = 60;
    let gameover = true;
    let speed = 0.9;
    let score = 0;
    let lastTime = Date.now();

    const carImage = new Image();
    carImage.src = require("../../assets/imgs/game_imgs/car.png");

    const crashImage = new Image();
    crashImage.src = require("../../assets/imgs/game_imgs/crash.png");

    const vehicleImages = [
      require("../../assets/imgs/game_imgs/pickup_truck.png"),
      require("../../assets/imgs/game_imgs/semi_trailer.png"),
      require("../../assets/imgs/game_imgs/taxi.png"),
      require("../../assets/imgs/game_imgs/van.png"),
    ].map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const player = { x: playerX, y: playerY, width: 45, height: 90 };

    let vehicles = [];
    let laneMarkerMoveY = 0;
    let crashRect = { x: 0, y: 0, width: 0, height: 0 };

    const words = ["cat", "eat", "vet", "bat", "rat", "cow", "owl", "bee"];
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let typedWord = "";

    const letterImages = {
      a: new Image(),
      b: new Image(),
      c: new Image(),
      d: new Image(),
      e: new Image(),
      f: new Image(),
      g: new Image(),
      h: new Image(),
      i: new Image(),
      j: new Image(),
      k: new Image(),
      l: new Image(),
      m: new Image(),
      n: new Image(),
      o: new Image(),
      p: new Image(),
      q: new Image(),
      r: new Image(),
      s: new Image(),
      t: new Image(),
      u: new Image(),
      v: new Image(),
      w: new Image(),
      x: new Image(),
      y: new Image(),
      z: new Image(),
      yes: new Image(),
    };

    letterImages[
      "a"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/A.png");
    letterImages[
      "b"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/B.png");
    letterImages[
      "c"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/C.png");
    letterImages[
      "d"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/D.png");
    letterImages[
      "e"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/E.png");
    letterImages[
      "f"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/F.png");
    letterImages[
      "g"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/G.png");
    letterImages[
      "h"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/H.png");
    letterImages[
      "i"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/I.png");
    letterImages[
      "j"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/J.png");
    letterImages[
      "k"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/K.png");
    letterImages[
      "l"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/L.png");
    letterImages[
      "m"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/M.png");
    letterImages[
      "n"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/N.png");
    letterImages[
      "o"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/O.png");
    letterImages[
      "p"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/P.png");
    letterImages[
      "q"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/Q.png");
    letterImages[
      "r"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/R.png");
    letterImages[
      "s"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/S.png");
    letterImages[
      "t"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/T.png");
    letterImages[
      "u"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/U.png");
    letterImages[
      "v"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/V.png");
    letterImages[
      "w"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/W.png");
    letterImages[
      "x"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/X.png");
    letterImages[
      "y"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/Y.png");
    letterImages[
      "z"
    ].src = require("../../assets/imgs/game_imgs/hand_gesture/Z.png");
    letterImages.yes.src = require("../../assets/imgs/game_imgs/hand_gesture/YES.png");

    function drawRoad() {
      ctx.fillStyle = "#fbfbee";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = colors.gray;
      ctx.fillRect(150, 0, roadWidth, height);

      ctx.fillStyle = colors.yellow;
      ctx.fillRect(145, 0, markerWidth, height);
      ctx.fillRect(345, 0, markerWidth, height);
    }

    function drawLaneMarkers() {
      laneMarkerMoveY += speed * 2;
      if (laneMarkerMoveY >= markerHeight * 2) {
        laneMarkerMoveY = 0;
      }
      ctx.fillStyle = colors.white;
      for (let y = markerHeight * -2; y < height; y += markerHeight * 2) {
        ctx.fillRect(
          width / 2 - markerWidth / 2,
          y + laneMarkerMoveY,
          markerWidth,
          markerHeight
        );
      }
    }

    function drawPlayer() {
      ctx.drawImage(
        carImage,
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
      );
    }

    function drawVehicles() {
      vehicles.forEach((vehicle) => {
        ctx.drawImage(
          vehicle.image,
          vehicle.x - vehicle.width / 2,
          vehicle.y - vehicle.height / 2,
          vehicle.width,
          vehicle.height
        );
      });
    }

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(`Điểm số: ${Math.round(score * 100) / 100}`, 50, 50);
      ctx.fillText(`Tốc độ: ${Math.round(speed * 100) / 100}`, 50, 70);
    }

    function drawWord() {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(`Bạn cần gõ chữ: ${currentWord}`, width / 2 - 80, 50);
    }

    function drawTypedWord() {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(`Đã gõ: ${typedWord}`, 20, 100);

      let xPos = 20;
      let nextCharacter = currentWord[typedWord.length];
      const image = letterImages[nextCharacter];
      ctx.drawImage(image, xPos, 120, 50, 50);
    }

    function drawGameOver() {
      ctx.drawImage(
        crashImage,
        crashRect.x - crashRect.width / 2,
        crashRect.y - crashRect.height / 2
      );
      ctx.fillStyle = colors.red;
      ctx.fillRect(0, 50, width, 100);
      ctx.font = "16px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(
        "Bạn đã thua. Sử dụng 'Có' để bắt đầu!",
        width / 2 - 120,
        100
      );
      const image = letterImages["yes"];
      ctx.drawImage(image, 180, 180, 80, 80);
    }

    function drawStartScreen() {
      ctx.fillStyle = colors.gray;
      ctx.fillRect(0, 0, width, height);
      ctx.font = "30px Arial";
      ctx.fillStyle = "#000000";
      ctx.clearRect(0, 0, width, height);
      drawRoad(ctx);
      drawLaneMarkers(ctx);
      drawPlayer(ctx);
      drawVehicles(ctx);
    }

    function gameBegin() {
      ctx.fillStyle = "#fff";
      ctx.fillText("Sử dụng Có để bắt đầu!", width / 2 - 160, 100);
      ctx.fillStyle = "#fff";
      const image = letterImages["yes"];
      ctx.drawImage(image, 220, 180, 80, 80);
    }

    function updateVehicles() {
      if (vehicles.length < 2) {
        let addVehicle = true;
        for (let vehicle of vehicles) {
          if (vehicle.y < vehicle.height * 1.5) {
            addVehicle = false;
          }
        }
        if (addVehicle) {
          const lane = lanes[Math.floor(Math.random() * lanes.length)];
          const image =
            vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
          vehicles.push({
            image,
            x: lane,
            y: -image.height / 2,
            width: 45,
            height: 90,
          });
        }
      }
      vehicles = vehicles
        .map((vehicle) => {
          vehicle.y += speed;
          return vehicle;
        })
        .filter((vehicle) => {
          if (vehicle.y >= height) {
            score++;
            if (score % 5 === 0) speed++;
            return false;
          }
          return true;
        });
    }
    function gameLoop() {
      ctx.clearRect(0, 0, width, height);
      drawRoad();
      drawLaneMarkers();
      drawPlayer();
      drawVehicles();
      drawScore();
      drawWord();
      drawTypedWord();

      if (checkCollisions()) {
        drawGameOver();
      } else {
        updateVehicles();
        requestAnimationFrame(gameLoop);
      }
    }

    function startGame() {
      gameover = false;
      score = 0;
      vehicles = [];
      player.x = leftLane;
      player.y = playerY;
      currentWord = words[Math.floor(Math.random() * words.length)];
      typedWord = "";
      requestAnimationFrame(gameLoop);
    }

    function gameAction(action) {
      if (gameover) {
        if (action === "y" || action === "Y") {
          startGame();
        } else if (action === "n" || action === "N") {
          gameover = false;
        }
      } else {
        if (action.length === 1 && /[a-zA-Z]/.test(action)) {
          typedWord += action.toLowerCase();
          if (typedWord === currentWord) {
            player.x = player.x === leftLane ? rightLane : leftLane;
            currentWord = words[Math.floor(Math.random() * words.length)];
            typedWord = "";
            if (speed < 2) speed += 0.01;
            score += 100 * speed;
          } else if (!currentWord.startsWith(typedWord)) {
            typedWord = typedWord.slice(0, -1);
          }
        }
      }
    }

    function checkCollisions() {
      for (let vehicle of vehicles) {
        if (
          Math.abs(vehicle.x - player.x) < player.width &&
          Math.abs(vehicle.y - player.y) < player.height
        ) {
          gameover = true;
          crashRect = {
            x: player.x,
            y: (player.y + vehicle.y) / 2,
            width: crashImage.width,
            height: crashImage.height,
          };
          return true;
        }
      }
      return false;
    }

    document.addEventListener("keydown", (event) => {
      gameAction(event.key);
    });

    ////
    const loadPromises = Object.values(letterImages).map((img) => {
      return new Promise((resolve) => {
        console.log("k");
        img.onload = resolve;
      });
    });

    Promise.all(loadPromises).then(() => {
      console.log("kk");
      // Draw the start screen once all images are loaded
      drawStartScreen(ctx);
    });

    document.addEventListener("keydown", (event) => {
      gameAction(event.key);
    });

    //
    let detect = new SLRdetect();
    function callback(data) {
      if (data == "Y" || data == "Yes") gameAction("y");
      if (data == "n" || data == "No") gameAction("n");
      gameAction(data.toLowerCase());
    }
    detect.init(callback);

    const webcamButton = document.getElementById("webcamButton");
    const liveView = document.getElementById("liveView");

    webcamButton.addEventListener("click", () => {
      console.log("click");
      liveView.style.display = "block";
      webcamButton.style.display = "none";

      gameBegin(ctx);
    });
    //
  }, [1]);

  return (
    <div className={styles.mainContainer}>
      <>
        <div className={styles.container}>
          <canvas ref={canvasRef} className={styles.gameCanvas} />
          <div id="liveView" className={styles.liveView}>
            <div>
              <video
                id="webcam"
                className={styles.webcam}
                autoPlay
                playsInline
              ></video>
              <canvas
                id="output_canvas"
                className={styles.output_canvas}
                width="1280"
                height="720"
              />
            </div>
          </div>
        </div>
      </>

      <button id="webcamButton" className={styles.webcamButton}>
        Bắt đầu
      </button>

      <>
        <div id="gesture_output" className={styles.gesture_output}>
          <p>Nhấn bắt đầu sau đó cho tay lên màn hình !</p>
        </div>
      </>
    </div>
  );
};

export default GamePage;
