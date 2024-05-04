function doFirst() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');

    // 顏色，線條
    // context.fillStyle='red';
    context.strokeStyle='blue';
    context.lineWidth=5;
    
    // 位置
    // context.moveTo(100,100);
    // context.lineTo(250,250);

    
    // 定義8角星形的中心座標和大小
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // 外接圓半徑
    let radius = 200; 

    // 內接圓半徑，用於繪製小頂點

    // Math.sin(x) 函式來計算三角函數正弦曲線 sin
    // Math.PI 來參考到圓周率 pi 的常數值
    // sin傳回方法一個 -1 到 1 之間的數值，表示給定角度（單位：弧度）的正弦值。
    let innerRadius = radius * Math.sin(Math.PI / 8); 

    // 計算八角星形頂點座標
    let numberOfSides = 8; // 八角星形的邊數
    let angle = Math.PI / 8; // 八角星形每個頂點的夾角（360度除以邊數）
    let octagramCoordinates = [];

    // 8角星 => 16個頂點座標
    for (let i = 0; i < numberOfSides * 2; i++) {
        // 根據奇偶姓選擇外接圓半徑或內接圓半徑
        let r = i % 2 === 0 ? radius : innerRadius; 
        // Math.cos() 函數用來計算給定角度的餘弦值，這裡乘以 r 是為了根據角度和距離來計算出 x 座標的偏移量。
        // Math.sin() 函數用來計算給定角度的正弦值，這裡乘以 r 是為了根據角度和距離來計算 y 座標的偏移量。
        let x = centerX + r * Math.cos(angle * i);
        let y = centerY + r * Math.sin(angle * i);
        octagramCoordinates.push({x: x, y: y});
    }
    // 獲得16個頂點座標
    // console.log(octagramCoordinates);

    // 繪製8角星形
    context.beginPath();
    context.moveTo(octagramCoordinates[0].x, octagramCoordinates[0].y);
    for (let i = 1; i < octagramCoordinates.length; i++) {
        context.lineTo(octagramCoordinates[i].x, octagramCoordinates[i].y);
    }
    context.closePath();

    // 畫線
    context.stroke();

}
document.addEventListener('click',doFirst);

