// 繪製原始版本的房子
function drawHouse(context, houseX) {
  // 左邊
  context.beginPath();
  context.rect(houseX, 150, 150, 200);
  context.fillStyle = "#fff1b0";
  context.fill();
  context.stroke();

  // 左邊屋頂
  context.beginPath();
  context.moveTo(houseX, 150);
  context.lineTo(houseX + 75, 75);
  context.lineTo(houseX + 150, 150);
  context.fillStyle = "#fff1b0";
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(houseX + 25, 125, 33, 25);
  context.rect(houseX + 58, 125, 33, 25);
  context.rect(houseX + 91, 125, 33, 25);
  context.fillStyle = "#f6ab1c";
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(houseX + 58, 100, 33, 25);
  context.fillStyle = "#8fcedf";
  context.fill();
  context.stroke();

  context.beginPath();
  context.moveTo(houseX, 150);
  context.lineTo(houseX - 25, 150);
  context.lineTo(houseX + 75, 50);
  context.lineTo(houseX + 175, 150);
  context.lineTo(houseX + 150, 150);
  context.lineTo(houseX + 75, 75);
  context.closePath();
  context.fillStyle = "#8fbc6b";
  context.fill();
  context.stroke();

  // 左邊門
  context.beginPath();
  context.rect(houseX + 85, 275, 40, 75);
  context.fillStyle = "#9f815b";
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(houseX + 85, 200, 20, 45);
  context.rect(houseX + 105, 200, 20, 45);

  context.rect(houseX + 25, 200, 20, 45);
  context.rect(houseX + 45, 200, 20, 45);

  context.rect(houseX + 25, 275, 20, 45);
  context.rect(houseX + 45, 275, 20, 45);

  context.fillStyle = "#8fcedf";
  context.fill();
  context.stroke();

  // 右邊
  context.beginPath();
  context.rect(houseX + 150, 250, 150, 100);
  context.fillStyle = "#fde062";
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(houseX + 175, 275, 50, 45);
  context.rect(houseX + 225, 275, 50, 45);
  context.fillStyle = "#8fcedf";
  context.fill();
  context.stroke();

  // 右邊屋頂
  context.beginPath();
  context.moveTo(houseX + 150, 175);
  context.lineTo(houseX + 275, 175);
  context.lineTo(houseX + 310, 250);
  context.lineTo(houseX + 150, 250);
  context.closePath();
  context.fillStyle = "#8fbe62";
  context.fill();
  context.stroke();
}

// 繪製房子倒影效果
function drawReflection(context, houseX) {
  context.save(); // Save the current state of the context
  context.translate(0, 700); // Move the context to the bottom of the canvas
  context.scale(1, -1); // Flip the context vertically

  context.globalAlpha = 0.5;
  drawHouse(context, houseX); // Draw the house with flipped context
  context.restore(); // Restore the context to its original state
}

// 繪製畫面湖面感效果
function drawLake(context) {
  var gradient = context.createLinearGradient(0, 350, 0, canvas.height);
  gradient.addColorStop(0, "#b5d4e9"); // 湖水顏色
  gradient.addColorStop(1, "#ffffff"); // 湖面漸變至白色

  context.fillStyle = gradient;
  context.fillRect(0, 350, canvas.width, canvas.height - 350);
}

function doFirst() {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  // 動態設置 canvas 大小為視窗大小
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 當視窗大小改變時，重新調整 canvas 大小
  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 重新繪製
    drawing();
  });

  setInterval(drawing, 30);

  let timer = 0; // 定義 timer 變數

  // 每一次車子移動都是擦掉重新畫一次
  function drawing() {
    timer++;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawLake(context); // 繪製湖面效果

    // 將房子移到畫布中間
    let houseX = (canvas.width - 200) / 2; // 200 是房子的寬度
    drawHouse(context, houseX); // 繪製房子

    drawReflection(context, houseX); // 繪製倒影效果

    // 計算車子的 X 座標，使其從畫面最左側移動到最右側
    let carX = (timer % (canvas.width + 40)) - 40; // 40 是車子的寬度
    drawCar(context, carX); // 繪製車子
  }

  // 繪製車子的函數，帶有一個參數 carX，用於設置車子的 X 座標
  function drawCar(context, carX) {
    // 車子
    // 車子跑動為x軸移動
    context.fillStyle = "#fff";

    // 畫面寬度為400，車子再x軸上的移動為carX，車身寬40
    // 一開始車子在-40的位置，畫面呈現要到車子尾部跑過最右邊 +40
    context.fillRect(carX, 325, 40, 25);
    context.strokeRect(carX, 325, 40, 25);

    // 輪胎
    // 線必須.beginPath()
    context.beginPath();
    context.arc(carX + 10, 350, 5, 0, 2 * Math.PI);
    context.arc(carX + 30, 350, 5, 0, 2 * Math.PI);

    context.fillStyle = "#333";
    context.stroke();
    context.fill();
  }

  // 繪製車子及其倒影
function drawCar(context, carX) {
  // 車子
  context.fillStyle = "#fff";
  context.fillRect(carX, 325, 40, 25);
  context.strokeRect(carX, 325, 40, 25);

  // 車子倒影
  context.save(); // 儲存當前狀態
  context.translate(0, 700); // 將繪製起點移至畫布底部
  context.scale(1, -1); // 垂直翻轉繪製內容
  context.globalAlpha = 0.5; // 降低透明度以產生倒影效果
  context.fillStyle = "#fff";
  context.fillRect(carX, 325, 40, 25);
  context.strokeRect(carX, 325, 40, 25);
  context.restore(); // 恢復繪製前的狀態

  // 輪胎
  context.beginPath();
  context.arc(carX + 10, 350, 5, 0, 2 * Math.PI);
  context.arc(carX + 30, 350, 5, 0, 2 * Math.PI);
  context.fillStyle = "#333";
  context.stroke();
  context.fill();
}
}



window.addEventListener("load", doFirst);