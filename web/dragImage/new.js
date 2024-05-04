let fileName = document.getElementById("fileName");
let dropZone = document.getElementById("dropZone");
let image = document.getElementById("image");

// 按鈕
let scaleUpBtn = document.getElementById("scaleUpBtn");
let scaleDownBtn = document.getElementById("scaleDownBtn");
let rotateLeftBtn = document.getElementById("rotateLeftBtn");
let rotateRightBtn = document.getElementById("rotateRightBtn");
let deleteBtn = document.getElementById("deleteBtn");

// 圖片狀態
let scale = 1.0;
let rotation = 0;

function doFirst() {
  // 拖放功能 dragover和 drop一定要發生 =>要讓瀏覽器允許可以執行
  dropZone.ondragover = dragOver;
  dropZone.ondrop = dropped;
  dropZone.ondragenter = dragEnter;

  // 縮放按鈕
  scaleUpBtn.addEventListener("click", scaleUp);
  scaleDownBtn.addEventListener("click", scaleDown);

  // 旋轉按鈕
  rotateLeftBtn.addEventListener("click", rotateLeft);
  rotateRightBtn.addEventListener("click", rotateRight);

  // 刪除按鈕
  deleteBtn.addEventListener("click", deleteImage);
}

// 圖片拖曳
function dragOver(e) {
  // 解除瀏覽器預設
  e.preventDefault();
}

// 拖曳進入區域
function dragEnter(e) {
  e.preventDefault();
}

function dropped(e) {
  // 解除瀏覽器預設
  e.preventDefault();

  // dataTransfer物件中獲取拖放的檔案
  let file = e.dataTransfer.files[0];

  fileName.innerText = file.name;

  let reader = new FileReader();

  // reader.readAsText(file);        // 3ducks.png
  // 找路徑+檔名

  // 以DataURL的格式讀取檔案，將其轉換為Base64編碼的字串
  reader.readAsDataURL(file); // 3ducks.png + 圖片
  reader.addEventListener("load", function () {
    // result會是一個包含檔案數據的DataURL字串。
    // 這個DataURL字串包含了一個Base64編碼的檔案內容，
    // 可以直接用於指定<img>元素的src屬性，從而在網頁上顯示圖片。
    document.getElementById("image").src = reader.result;
  });
}

// 圖片狀態
function transformImage() {
  image.style.transform = `rotate(${rotation}deg) scale(${scale})`;
}

// 縮放 function
function scaleUp() {
  scale += 0.1;
  // 在放大時檢查圖片是否超出 dropZone 的範圍
  transformImage();
}

function scaleDown() {
  scale -= 0.1;
  // 在縮小時檢查圖片是否小於 dropZone 的範圍
  transformImage();
}

// 旋轉 function
function rotateLeft() {
  rotation -= 45;
  transformImage();
}

function rotateRight() {
  rotation += 45;
  transformImage();
}

// 刪除 function
function deleteImage() {
  fileName.innerText = "";
  image.src = "";
}

window.addEventListener("load", doFirst);
