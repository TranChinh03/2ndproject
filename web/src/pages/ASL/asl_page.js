import React, { useEffect, useRef, useState } from "react";
import styles from "./asl_page.module.css";
import { SLRdetect } from "../../utilities/detectASL";
import { letterImages } from "../../assets/const/asl_image";
import { aslAlphabet } from "../../assets/const/asl_detail";
import { drawHand } from "../../utilities/drawHand";

function ASLPage() {
  const canvasRef = useRef(null);
  const [currentLetter, setCurrentLetter] = useState(aslAlphabet[0].letter);
  const [currentDes, setcurrentDes] = useState(aslAlphabet[0].description);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 500;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    console.log("width", width);

    function drawGivensWord() {
      ctx.font = "64px Arial";
      ctx.strokeStyle = "#0ef";
      ctx.strokeText(currentLetter, width / 2 - 55, 125);
      ctx.font = "lighter 12px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(currentDes, width / 5, 175);
      ctx.drawImage(letterImages.a, width / 2 - 15, 50, 100, 100);
    }
    function drawDescription() {
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(currentLetter, width / 2 - 55, 125);
    }

    function drawStartScreen() {
      ctx.clearRect(0, 0, width, height);
      //drawGivensWord(ctx);
    }

    function gameAction(action) {
      // if (gameover) {
      //   if (action === "y" || action === "Y") {
      //     startGame();
      //   } else if (action === "n" || action === "N") {
      //     gameover = false;
      //   }
      // } else {
      //   if (action.length === 1 && /[a-zA-Z]/.test(action)) {
      //     typedWord += action.toLowerCase();
      //     if (typedWord === currentWord) {
      //       player.x = player.x === leftLane ? rightLane : leftLane;
      //       currentWord = words[Math.floor(Math.random() * words.length)];
      //       typedWord = "";
      //       if (speed < 2) speed += 0.01;
      //       score += 100 * speed;
      //     } else if (!currentWord.startsWith(typedWord)) {
      //       typedWord = typedWord.slice(0, -1);
      //     }
      //   }
      // }
    }

    document.addEventListener("keydown", (event) => {
      gameAction(event.key);
    });

    //// Draw start

    drawStartScreen(ctx);

    document.addEventListener("keydown", (event) => {
      gameAction(event.key);
    });

    //
    let detect = new SLRdetect();

    function callback(data) {
      if (data == "Y" || data == "Yes") gameAction("y");
      if (data == "n" || data == "No") gameAction("n");
      gameAction(data.toLowerCase());
      console.log("detect.results", detect.results);
      drawHand(detect.results, ctx);
    }
    detect.init(callback);
    // console.log("detect.results", detect.results);
    // drawHand(detect.results, ctx);
    // const startBtn = document.getElementById("startBtn");
    // const liveView = document.getElementById("liveView");

    // startBtn.addEventListener("click", () => {
    //   console.log("click");
    //   // liveView.style.display = "block";
    //   startBtn.style.display = "none";

    //   gameBegin(ctx);
    // });
    //
    //
    console.log(letterImages[`${currentLetter.toLowerCase()}`].src);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <>
        <p className={styles.instructionsTxt}>
          <b>START LEARNING: </b>Make hand gesture based on letter shown below!
        </p>
      </>
      s
      <div className={styles.givenTxtContainer}>
        <p style={{ width: "250px", textAlign: "center", marginBottom: 0 }}>
          {currentDes}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className={styles.givenText}>{currentLetter}</p>
          <img
            className={styles.imgHand}
            alt=""
            src={letterImages[`${currentLetter.toLowerCase()}`].src}
          />
        </div>
      </div>
      <>
        <div className={styles.container}>
          <canvas ref={canvasRef} className={styles.gameCanvas} />

          <video id="webcam" className={styles.webcam} autoPlay playsInline />
        </div>
      </>
      {/* <button id="startBtn" className={styles.startBtn}>
        Start
      </button> */}
      <div className={styles.outputContainer}>
        <div id="gesture_output" className={styles.gesture_output} />
        <div id="output_Label" />
      </div>
      <div className={styles.grid_container}>
        {aslAlphabet.map((item) => (
          <button
            onClick={() => {
              console.log(item.letter);
              setCurrentLetter(item.letter);
              setcurrentDes(item.description);
            }}
            key={item.letter}
            className={styles.grid_button}
          >
            {item.letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ASLPage;
