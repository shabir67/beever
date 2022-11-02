/*
Membeli makan siang dan menabung

Rusli adalah seorang anak sekolah di SD Beever
Setiap harinya, Rusli diberikan uang jajan oleh orang tuanya 
sebesar Rp. 10.000,- rupiah.

Rusli bisa menabung atau membeli makanan di sekolahnya untuk
makan siang. Kita telah diberikan catatan keuangan Rusli
dalam bentuk text biasa, dan kita diminta menghitung
jumlah uang tabungan Rusli per harinya dan total tabungannya.

OUTPUT:
{
    Senin: 2000,
    Selasa: 5500,
    Rabu: 3500,
    Kamis: 7000,
    Jumat: 5500,
    TotalTabungan: 23500
}

*/

function jumlahTabungan(listHarga, history) {
  const mutasi = history.split(".");
  const matches = [];
  const matches2 = [];
  const matches3 = [];
  const matches4 = [];

  for (let i = 0; i < mutasi.length; i++) {
    const joko = mutasi[i].split("-");
    const wi = joko[1].split(",");
    matches.push(joko);
    matches2.push(wi.flat().toString());
    matches3.push(matches2[i].split(","));
  }
  console.log("Ini arr1 :");
  console.log(matches);
  console.log("----------------------------------");
  console.log("Ini arr2 :");
  console.log(matches2);
  console.log("----------------------------------");
  console.log("Ini arr3 :");
  console.log(matches3);
  console.log("----------------------------------");
  for (let i = 0; i < listHarga.length; i++) {
    for (let j = 0; j < matches3[i].length; j++) {
      console.log(matches3[i][j], "-", j, "-", i, j);
    }
  }
}
// 0,1,2,
// 3,4,
// 0,3,
// 4,
// 3,2,1

var hargaMakanan = [
  {
    nama: "ayam",
    harga: 5000,
  },
  {
    nama: "nasi",
    harga: 2000,
  },
  {
    nama: "cola",
    harga: 1000,
  },
  {
    nama: "chiki",
    harga: 1500,
  },
  {
    nama: "hotdog",
    harga: 3000,
  },
  {
    nama: "aqua",
    harga: 2000,
  },
];

var historyPembelian = `Senin-ayam,nasi,cola.Selasa-chiki,hotdog.Rabu-ayam,chiki.Kamis-hotdog.Jumat-chiki,cola,nasi`;
console.log(jumlahTabungan(hargaMakanan, historyPembelian));
