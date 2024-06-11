import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./model_page.module.css";
import axios from "axios";
import { drawRect } from "../../utilities/draw_bbox";

export const ModelPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);

  const [selectedImg, setSelectedImg] = useState(new Image());
  const [selectedFile, setSelectedFile] = useState(null);
  let scale = 2;

  //down load
  function download() {
    var canvas = canvasRef.current;
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "Image.png";
    link.href = url;
    link.click();
  }

  //pick img
  function handleChange(e) {
    //
    console.log("la");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setErrorMessage(null);

    //bbx

    //img
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        if (img.width * scale > 640 || img.height * scale > 640) scale = 0.5;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        setSelectedImg(e.target.files[0]);
        setSelectedFile(img);

        ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
      };
      img.src = event.target.result;
    };
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  }

  // predict
  const predict = async () => {
    var fileData = new FormData();
    fileData.append("file", selectedImg);
    try {
      SetIsLoading(true);
      //const imageSrc = webcamRef.current.getScreenshot();
      //setVideo(imageSrc);
      const url = `https://handgestureserver.onrender.com/predict`;
      const { data } = await axios.post(url, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setErrorMessage(null);
      if (data) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        SetIsLoading(false);
        if (
          selectedFile.width * scale > 640 ||
          selectedFile.height * scale > 640
        )
          scale = 0.5;
        canvas.width = selectedFile.width * scale;
        canvas.height = selectedFile.height * scale;
        ctx.drawImage(
          selectedFile,
          0,
          0,
          selectedFile.width * scale,
          selectedFile.height * scale
        );
        data.map((dt) =>
          drawRect(
            selectedFile,
            dt.box[0],
            dt.box[1],
            dt.box[2],
            dt.box[3],
            dt.class_name,
            scale,
            ctx
          )
        );
      }
    } catch (err) {
      SetIsLoading(false);
      console.log(err);
      setErrorMessage(err.message);
    }
  };
  const renderErrorMessage = () => {
    return (
      <div>
        {errorMessage ? (
          <h1 className={styles.message}>
            Something went wrong. Please wait a minute and try again.
          </h1>
        ) : null}
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.text}>
          HGR, <br /> Hand Gesture <br /> Regconition
        </p>
        {selectedFile ? (
          <div>
            <label className={styles.label}>
              <input
                ref={inputRef}
                type="file"
                required
                onChange={handleChange}
              />
              <span>Import new image</span>
            </label>
            <button
              onClick={predict}
              disabled={isLoading ? true : false}
              className={styles.label}
            >
              Predict
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.imageSec}>
        {selectedFile ? null : (
          <label className={styles.label}>
            <input
              ref={inputRef}
              type="file"
              required
              onChange={handleChange}
            />
            <span>Import your image</span>
          </label>
        )}

        <canvas ref={canvasRef} />
        {isLoading ? <div className={styles.loading}>Loading...</div> : null}

        {renderErrorMessage()}
        {isLoading || !selectedFile ? null : (
          <button onClick={download} className={styles.saveBtn}>
            Download
          </button>
        )}
        {/* {isLoading || !selectedFile ? null : (
          <FacebookShareButton
            url={shareUrl}

            quote={"Title or jo bhi aapko likhna ho"}
            hashtag={"#portfolio..."}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
        )} */}
      </div>
    </div>
  );
};
