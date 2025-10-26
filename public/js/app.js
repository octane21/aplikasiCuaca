const berita = document.getElementById("berita");
const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const pesanSatu = document.querySelector("#pesan-1");
const pesanDua = document.querySelector("#pesan-2");
const beritaContainer = document.querySelector(".beritaContainer");

// pesanSatu.textContent = 'From javascript'
if(weatherform){
  weatherform.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    pesanSatu.textContent = "Sedang mencari lokasi ..";
    pesanDua.textContent = "";
    fetch("http://localhost:4000/infocuaca?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            pesanSatu.textContent = data.error;
          } else {
            pesanSatu.textContent = data.lokasi;
            pesanDua.textContent = data.prediksiCuaca;
          }
        });
      }
    );
  });

}
const formatTanggal = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const defaultImage = "/img/default-berita.png";
const currentPage = window.location.pathname;
console.log(currentPage)
if(currentPage == "/berita"){
  beritaContainer.innerHTML = "Sedang Memuat Berita...";
    fetch("http://localhost:4000/dataBerita").then(
      (response) => {
      response.json().then((data) => {
        if (data.error) {
          beritaContainer.innerHTML = data.error;
        } else {
          console.log(data)
          beritaContainer.innerHTML = data.data.data.map((b)=>`
              <div class="beritaCard">
        <img class='beritaImg' src=${b.image || defaultImage}>
        <div class="beritaSpoil">
        <div class="tanggalAuthor">
        <p class="tanggal">${formatTanggal(b.published_at)}</p>
        <p class="author">By ${b.author || "-"}</p>
        </div>
        <h3 class="judulBerita">${b.title}</h3>
        <p class="deskripsi">${b.description}</p>
        <br>
        <br>
        <a class="bacaBerita" target="_blank" href=${b.url}>Baca</a>
        </div>   
    </div>`
          ).join("");
        }
      });
    }
  );
}