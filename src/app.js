import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import { geocode } from "./utils/geocode.js"
import { forecast } from "./utils/prediksiCuaca.js"
import { berita } from "./utils/berita.js"
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); //

const PORT = process.env.PORT || 3000
const app = express();
const direktoriPublic = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", direktoriViews); // ganti lokasi folder views
hbs.registerPartials(direktoriPartials);
app.use(express.static(direktoriPublic));
//ini halaman/page utama
app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Carli Tamba",
  });
});
//ini halaman bantuan/FAQ (Frequently Asked Questions)
app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Bantuan",
    teksBantuan: "ini adalah teks bantuan",
    nama: "Carli Tamba",
  });
});

//ini halaman Info Cuaca
app.get("/infocuaca", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukan lokasi yang ingin dicari",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, dataPrediksi) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          prediksiCuaca: dataPrediksi,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
});

//ini halaman tentang
app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Carli Tamba",
  });
});

app.get("/berita", (req, res) => {
 res.render("berita", {
    judul: "Berita",
    nama: "Carli Tamba",
  });
});

app.get("/dataBerita", (req, res) => {
  berita((error, data) => {
     if (error) {
          return res.send({ error });
        }
        res.send({
          data
        });
  })
});

app.get("/bantuan/{*any}", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Carli Tamba",
    pesanKesalahan: "Artikel yang dicari tidak ditemukan",
  });
});

app.get("/{*any}", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Carli Tamba",
    pesanKesalahan: "Halaman tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.log("Server berjalan pada port 4000.");
});
