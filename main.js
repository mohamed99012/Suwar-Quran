let suwReq = new XMLHttpRequest();
suwReq.open("GET", "https://mp3quran.net/api/v3/suwar?language=ar");
suwReq.send();
suwReq.onerror = function () {
  document.querySelector(".suwar").innerHTML = "تعذر الإتصال بالسيرفر";
};
let arabicDigits = {
  0: "٠",
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
};
function replaceToArDigits(num) {
  let arrFNum = `${num}`.split("");
  let arDigArr = arrFNum.map((n) => arabicDigits[n]);
  return arDigArr.join("");
}
suwReq.onload = function () {
  if (this.readyState === 4 && this.status === 200) {
    let obj = JSON.parse(suwReq.responseText);
    let sArr = obj["suwar"];
    let sDiv = document.querySelector(".suwar");
    console.log(sArr);
    sArr.map(function (sObj) {
      sDiv.innerHTML += `<div class="surah">
      <div class="number">
        <span class="surah-number">رقم السورة</span>
        <span class="number-val">${replaceToArDigits(sObj.id)}</span>
      </div>
      <div class="name">
        <span class="surah-name">اسم السورة</span>
        <span class="name-val">${sObj.name}</span>
      </div>
      <div class="start">
        <span class="page-start">صفحة البداية</span>
        <span class="start-val">${replaceToArDigits(sObj["start_page"])}</span>
      </div>
      <div class="end">
        <span class="page-end">صفحة النهاية</span>
        <span class="end-val">${replaceToArDigits(sObj["end_page"])}</span>
      </div>
      <div class="type">
        <span class="surah-type">مكية / مدنية</span>
        <span class="type">${sObj.makkia === 1 ? "مكية" : "مدنية"}</span>
      </div>
    </div>`;
    });
  } else {
    document.querySelector(".suwar").innerHTML = "انتظر التحميل";
  }
};
