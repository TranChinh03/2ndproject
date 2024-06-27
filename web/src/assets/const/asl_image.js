export const letterImages = {
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

export const loadPromises = Object.values(letterImages).map((img) => {
  return new Promise((resolve) => {
    img.onload = resolve;
  });
});
