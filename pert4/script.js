let arrayPenjualan = [];
        let no = 0;

        const dataBarang = {
            "SPT": { nama: "Sepatu", harga: 50000 },
            "SND": { nama: "Sandal", harga: 30000 },
            "TST": { nama: "Tas", harga: 70000 },
            "TOP": { nama: "Topi", harga: 20000 }
        };

        function simpan() {
            let kodeBarang = document.getElementById("kodeBarang").value;
            let jumlahBarang = parseInt(document.getElementById("jumlahBarang").value);

            if (jumlahBarang == "" || jumlahBarang <= 0) {
                alert("Jumlah barang tidak valid");
                return;
            }
            let barang = dataBarang[kodeBarang];
            let namaBarang = barang.nama;
            let hargaBarang = barang.harga;
            let totalHarga = hargaBarang * jumlahBarang;

            let barangExist = arrayPenjualan.find(penjualan => penjualan.kodeBarang === kodeBarang);

            if (barangExist) {
                barangExist.jumlahBarang += jumlahBarang;
                barangExist.totalHarga = barangExist.hargaBarang * barangExist.jumlahBarang;
            } else {
                no++;
                arrayPenjualan.push({ 
                    urut: no, 
                    kodeBarang: kodeBarang, 
                    namaBarang: namaBarang, 
                    hargaBarang: hargaBarang, 
                    jumlahBarang: jumlahBarang, 
                    totalHarga: totalHarga 
                });
            }
            tampilkan();
            kosongkanInputan();
        }

        function tampilkan() {
            let headerTabel = "<table><tr><th>No</th><th>Kode Barang</th><th>Nama Barang</th><th>Harga Barang</th><th>Jumlah Barang</th><th>Total Harga</th><th>Aksi</th></tr>";
            let isiTabel = ""; 
            let subTotal = 0; 

            arrayPenjualan.forEach(function (penjualan, index) {
                let rowColor = index % 2 === 0 ? "style='background-color: white;'" : "style='background-color: lightblue;'";
                isiTabel += `<tr ${rowColor}><td>${penjualan.urut}</td><td>${penjualan.kodeBarang}</td><td>${penjualan.namaBarang}</td><td>${penjualan.hargaBarang}</td><td>${penjualan.jumlahBarang}</td><td>${penjualan.totalHarga}</td><td><button onclick='hapus(${penjualan.urut})'>Hapus</button></td></tr>`;
                subTotal += penjualan.totalHarga; 
            });
            let subTotalTabel = `<tr><td colspan='5'>Subtotal</td><td>Rp ${subTotal}</td><td></td></tr>`;
            let footerTabel = "</table>";

            document.getElementById("dataPenjualan").innerHTML = headerTabel + isiTabel + subTotalTabel + footerTabel;
        }

        function kosongkanInputan() {
            document.getElementById("jumlahBarang").value = "";
        }

        function kosongkan() {
            kosongkanInputan();
            document.getElementById("dataPenjualan").innerHTML = "";
            arrayPenjualan = [];
            no = 0; 
        }

        function hapus(urut) {
            if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
                arrayPenjualan = arrayPenjualan.filter(penjualan => penjualan.urut !== urut);
                tampilkan();
            }
        }