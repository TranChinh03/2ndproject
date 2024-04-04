// Define a drawing function
export const drawRect = (img, x, y, h, w, label, scale, ctx) => {
  const IMG_SIZE = 640;
  if (img.width * scale > 640 || img.height * scale > 640) scale = 0.5;
  const imgScaleX = img.width / IMG_SIZE;
  const imgScaleY = img.height / IMG_SIZE;

  const left = imgScaleX * (x - w / 2);
  const top = imgScaleY * (y - h / 2);
  const right = imgScaleX * (x + w / 2);
  const bottom = imgScaleY * (y + h / 2);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "red";
  ctx.font = "16px sans-serif";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.clearRect(0, 0, img.width * scale, img.height * scale);
  ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
  ctx.rect(
    left * scale,
    top * scale,
    (right - left) * scale,
    (bottom - top) * scale
  );
  ctx.stroke();
  ctx.fillText(label, left * scale, top * scale);

  console.log(left / scale);
  console.log(top / scale);
};
