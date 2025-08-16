// Compress Image
let compressImg = new Image();
document.getElementById("compressInput").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = event => compressImg.src = event.target.result;
  reader.readAsDataURL(e.target.files[0]);
});
function compressImage() {
  const quality = parseFloat(document.getElementById("qualityInput").value);
  const canvas = document.getElementById("compressCanvas");
  const ctx = canvas.getContext("2d");
  compressImg.onload = () => {
    canvas.width = compressImg.width;
    canvas.height = compressImg.height;
    ctx.drawImage(compressImg,0,0);
    canvas.toBlob(blob=>{
      const url=URL.createObjectURL(blob);
      const link=document.getElementById("compressDownloadBtn");
      link.href=url; link.style.display="inline-block";
    },"image/jpeg",quality);
  };
  if(compressImg.complete) compressImg.onload();
}

// Resize Image
let resizeImg = new Image();
document.getElementById("resizeInput").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = event => resizeImg.src = event.target.result;
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
    ctx.drawImage(resizeImg,0,0,targetWidth,targetHeight);
    canvas.toBlob(blob=>{
      const url=URL.createObjectURL(blob);
      const link=document.getElementById("resizeDownloadBtn");
      link.href=url; link.style.display="inline-block";
    },"image/jpeg",1.0);
  };
  if(resizeImg.complete) resizeImg.onload();
}

// Image Enhancer
let enhanceImg = new Image();
document.getElementById("enhanceInput").addEventListener("change", e=>{
  const reader = new FileReader();
  reader.onload = event => enhanceImg.src = event.target.result;
  reader.readAsDataURL(e.target.files[0]);
});

function enhanceImage() {
  const brightness = document.getElementById("brightness").value;
  const contrast = document.getElementById("contrast").value;
  const saturation = document.getElementById("saturation").value;
  const sharpness = document.getElementById("sharpness").value;
  const filter = document.getElementById("filter").value;

  const canvas = document.getElementById("enhanceCanvas");
  const ctx = canvas.getContext("2d");

  enhanceImg.onload = () => {
    canvas.width = enhanceImg.width;
    canvas.height = enhanceImg.height;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${filter}`;
    ctx.drawImage(enhanceImg,0,0);
    
    // Apply simple sharpness using convolution (basic)
    if(sharpness>0){
      let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      let data = imageData.data;
      for(let i=0;i<data.length;i+=4){
        data[i] = data[i]*1.1; // simple enhancement
        data[i+1] = data[i+1]*1.1;
        data[i+2] = data[i+2]*1.1;
      }
      ctx.putImageData(imageData,0,0);
    }

    const link=document.getElementById("enhanceDownloadBtn");
    canvas.toBlob(blob=>{
      const url=URL.createObjectURL(blob);
      link.href=url; link.style.display="inline-block";
    },"image/jpeg",1.0);
  };
  if(enhanceImg.complete) enhanceImg.onload();
}


// ------ Format Converter ------
let convertImg = new Image();
document.getElementById("convertInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    convertImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function convertImage() {
  const format = document.getElementById("formatSelect").value; // e.g. image/png  
  const canvas = document.getElementById("convertCanvas");
  const ctx = canvas.getContext("2d");

  convertImg.onload = () => {
    canvas.width = convertImg.width;
    canvas.height = convertImg.height;
    ctx.drawImage(convertImg, 0, 0);

    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("convertDownloadBtn");
      link.href = url;
      link.download = `converted.${format.split('/')[1]}`;   // dynamic filename extension
      link.style.display = "inline-block";
    }, format, 1.0);
  };

  if (convertImg.complete) convertImg.onload();
}

//pass post image
let passportImg = new Image();
document.getElementById("passportInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    passportImg.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function generatePassportPhoto() {
  const width = 413;  // standard 35mm
  const height = 531; // standard 45mm

  const canvas = document.getElementById("passportCanvas");
  const ctx = canvas.getContext("2d");

  passportImg.onload = () => {
    canvas.width = width;
    canvas.height = height;

    // Fit image to passport size (center crop)
    const scale = Math.max(width / passportImg.width, height / passportImg.height);
    const x = (width - passportImg.width * scale) / 2;
    const y = (height - passportImg.height * scale) / 2;

    ctx.drawImage(passportImg, x, y, passportImg.width * scale, passportImg.height * scale);

    // Show download link
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("passportDownloadBtn");
      link.href = url;
      link.style.display = "inline-block";
    }, "image/jpeg", 1.0);
  };

  if (passportImg.complete) passportImg.onload();
}

