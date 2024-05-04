$("figure").on("click", function () {
  let pic = $(this).find("img").attr("src");
  $("#mainPic").attr("src", pic);
  $(this).addClass("active").siblings().removeClass("active");
});

$(document).ready(function () {
  var quantityInput = $("#quantityInput");

  $("#plusBtn").click(function () {
    quantityInput.val(parseInt(quantityInput.val()) + 1);
  });

  $("#minusBtn").click(function () {
    var currentValue = parseInt(quantityInput.val());
    if (currentValue > 1) {
      quantityInput.val(currentValue - 1);
    }
  });
});
