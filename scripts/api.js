//todo api url'i

const url = "https://shazam.p.rapidapi.com/search?term=tarkan&locale=tr";

//todo  gönderilmesi gereken header'lar
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "2696fd4e26msh1db7ae8950075abp1ab896jsn8653ce0ef5d1",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//todo fonksiyonların bir arada tutulması için class yapısını tercih edelim
export default class API {
  //todo  popüler müzikleri getirecek
  async getPopular() {
    const data1 = await this.searchMusic("tarkan");
    const data2 = await this.searchMusic("müslüm");

    return [...data1, ...data2];
  }

  //todo aratılan kelimeye uygun sonuçları getirecek
  async searchMusic(query) {
    //todo term parametresini dinamik olarak belirledik
    const url = `
    https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

    //todo api isteğini at - gelen cevabı işle
    const res = await fetch(url, options);
    const data = await res.json();

    //todo veriyi formatladık
    const formatted = data.tracks.hits.map((item) => item.track);

    //todo fonksiyonun çağırıldığı yere veriyi döndürdük
    return formatted;
  }
}
