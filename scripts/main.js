import API from "./api.js";
import UI from "./ui.js";

//todo class'ın örneğini al (methodları kullanabilmek için)
const api = new API();
const ui = new UI();

//todo sayfa yüklendiği anda api'den popüler müzikleri al renderla
document.addEventListener("DOMContentLoaded", async () => {
  // 1) then - catch yöntemi

  //todo ekrana loader bas
  ui.renderLoader();

  //todo api isteği at
  api
    .getPopular()
    //todo ekrana kartları bas
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("üzgünüz bir sorun oluştu");
    });

  // 2) async - await yöntemi
  // try {
  //   const data = await api.getPopular();
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  //   alert("üzgünüz bir sorun oluştu");
  // }
});

// todo formdan bir şey aratıldığında api'dan aratılan kelimeye uygun sonuçları al ve renderla
ui.form.addEventListener("submit", (e) => {
  //todo sayfayı yenilemeyi engelle
  e.preventDefault();

  //todo aratılan kelimeye eriş
  const query = e.target[0].value;

  //todo aratılan kelime boşsa fonksiyonu durdur
  if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın");

  //todo ekrana loader bas
  ui.renderLoader();

  //todo başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");

  //todo api'dan verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("üzgünüz bir sorun oluştu");
    });
});

//todo liste alanındaki tıklama olaylarını izle ve
ui.list.addEventListener("click", (e) => {
  //todo eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    //todo oynatılacak şarkının kartına eriş
    const card = e.target.closest(".card");

    //todo oynatılacak şarkının bilgilerini al
    const data = card.dataset;

    console.log(data);

    //todo player alanını tekrar renderla
    ui.renderPlayer(data);
  }
});

//todo liste alanındaki tıklanma olaylarını izle ve
ui.list.addEventListener("click", (e) => {
  //todo eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    //todo oynatılacak şarkının kardına eriş
    const card = e.target.closest(".card");

    //todo oynatılacak şarkının bilgilerini al
    const data = card.dataset;

    //todo player alanını tekrar renderla
    ui.renderPlayer(data);
  }
});
