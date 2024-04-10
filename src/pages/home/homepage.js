import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./homepage.css";
import axios from "axios";
import { drawRect } from "../../utilities/utilities";

export const Homepage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);

  const [selectedImg, setSelectedImg] = useState(new Image());
  const [selectedFile, setSelectedFile] = useState(null);
  let scale = 2;

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

        drawRect(img, 0, 0, 0, 0, "", scale, ctx);
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
      // console.log(data);
      // console.log(data[0].box[0]);
      // console.log(data[0].box[1]);
      // console.log(data[0].box[2]);
      // console.log(data[0].box[3]);
      if (data) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        SetIsLoading(false);
        drawRect(
          selectedFile,
          data[0].box[0],
          data[0].box[1],
          data[0].box[2],
          data[0].box[3],
          data[0].class_name,
          scale,
          ctx
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
          <h1 className="message">
            Something went wrong. Please wait a minute and try again.
          </h1>
        ) : null}
      </div>
    );
  };
  return (
    <div className="container">
      <div>
        <p className="text">
          HGR, <br /> Hand Gesture <br /> Regconition
        </p>
        {selectedFile ? (
          <div>
            <label className="label">
              <input
                ref={inputRef}
                type="file"
                required
                onChange={handleChange}
              />
              <span>Import your image</span>
            </label>
            <button onClick={predict} className="label">
              predict
            </button>
          </div>
        ) : null}
      </div>
      <div className="imageSec">
        {selectedFile ? null : (
          <label className="label">
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
        {isLoading ? <div className="loading">Loading...</div> : null}

        {renderErrorMessage()}
      </div>
    </div>
  );
};
