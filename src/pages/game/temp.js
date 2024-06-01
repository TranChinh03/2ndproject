import { SLRdetect } from "./detect.js";
import { gameAction, gameBegin } from "./game.js";
console.log("detect.js");
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
  liveView.style.display = "block";
  webcamButton.style.display = "none";
  console.log("hi");
  gameBegin();
});
