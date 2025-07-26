// Compress Image
let compressImg = new Image();
document.getElementById("compressInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    compressImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function compressImage() {
  const quality = parseFloat(document.getElementById("qualityInput").value);
  const canvas = document.getElementById("compressCanvas");
  const ctx = canvas.getContext("2d");

  compressImg.onload = () => {
    canvas.width = compressImg.width;
    canvas.height = compressImg.height;
    ctx.drawImage(compressImg, 0, 0);

    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("compressDownloadBtn");
      link.href = url;
      link.style.display = "inline-block";
    }, "image/jpeg", quality);
  };

  if (compressImg.complete) compressImg.onload();
}

// Resize Image
let resizeImg = new Image();
document.getElementById("resizeInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    resizeImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function resizeImage() {
  const width = parseInt(document.getElementById("resizeWidth").value);
  const height = parseInt(document.getElementById("resizeHeight").value);

  const canvas = document.getElementById("resizeCanvas");
  const ctx = canvas.getContext("2d");

  resizeImg.onload = () => {
    const targetWidth = width || resizeImg.width;
    const targetHeight = height || resizeImg.height;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(resizeImg, 0, 0, targetWidth, targetHeight);

    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("resizeDownloadBtn");
      link.href = url;
      link.style.display = "inline-block";
    }, "image/jpeg", 1.0);
  };

  if (resizeImg.complete) resizeImg.onload();
}
