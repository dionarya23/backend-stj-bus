const HttpStatus = require("http-status-codes");
const ApiError = require("../helpers/ApiError");

const PermintaanSukuCadangRepository = require("../repositories/permintaa_suku_cadang.repository")
const StockBengkelRepository = require("../repositories/stockBengkel.repository")
const SukuCadangRepository = require("../repositories/suku_cadang.repository");

module.exports = {
    async createPermintaan(req) {
        try {
            const { id_bengkel, permintaan } = req.body;

            if (permintaan.length <= 0) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message : "permintaan cannot be empty"
                }
            }
            let id_stock_bengkels = [];
            permintaan.map((element) => {
                const stockBengkel = await StockBengkelRepository.getStockBySukuCadangandBengkel({id_suku_cadang : element.id_suku_cadang, id_bengkel})
                const sukuCadang = await SukuCadangRepository.getById(element.id_suku_cadang)

                if (!sukuCadang) {
                    return {
                        status: HttpStatus.NOT_FOUND,
                        message: "suku cadang not found"
                    }
                }else{
                if (stockBengkel) {
                    id_stock_bengkels.push({id_stock_bengkel : stockBengkel.id_stock_bengkel, jumlah_permintaan: element.jumlah_permintaan})
                }else{
                    await StockBengkelRepository.createNewStock({
                        id_bengkel       : id_bengkel,
                        id_suku_cadang   : element.id_suku_cadang,
                        total_suku_cadang: 0
                    });
                    const stock = await StockBengkelRepository.getStockBySukuCadangandBengkel({id_suku_cadang : element.id_suku_cadang, id_bengkel})
                    id_stock_bengkels.push({id_stock_bengkel : stock.id_stock_bengkel, jumlah_permintaan: element.jumlah_permintaan})
                }
            }
            });

            for(let i=0;i < id_stock_bengkels.length;i++) {
                PermintaanSukuCadangRepository.insertPermintaan({
                    id_stock_bengkel  : id_stock_bengkels[i].id_stock_bengkel,
                    jumlah_permintaan : id_stock_bengkels[i].jumlah_permintaan,
                })
            }

            return {
                status  : HttpStatus.CREATED,
                message : "success create permintaan"
            }

        }catch(err) {
            console.log("Error createPermintaan : ", err)
            throw new ApiError(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    },


    async updatePermintaan(req) {
        try {
            const {id_permintaan_suku_cadang} = req.params
            const { persetujuan } = req.body;

            const permintaan = await PermintaanSukuCadangRepository.getPermintaanById(id_permintaan_suku_cadang);
            if (!permintaan) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: "permintaan not found"
                }
            }else if (permintaan.persetujuan === persetujuan) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: "permintaan sudah di update"
                }
            }
            const stockSukuCadang = await StockBengkelRepository.getStockSukuCadangById(permintaan.id_stock_bengkel);
            await StockBengkelRepository.updateStockBengkel({id_stock_bengkel: stockSukuCadang.id_stock_bengkel, total_suku_cadang: stockSukuCadang.total_suku_cadang+permintaan.jumlah_permintaan})
            
            return {
                status: HttpStatus.OK,
                message: "success update"
            }
        }catch(err) {
            console.log("Error updatePermintaan permintaan_suku_cadang controller : ", err);
            throw new ApiError(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
