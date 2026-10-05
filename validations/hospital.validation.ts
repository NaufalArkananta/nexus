import Joi from "joi";

export const rumahSakitRegisterSchema = Joi.object({
  namaRumahSakit: Joi.string().min(3).max(150).required(),

  jenisRumahSakit: Joi.string().min(2).max(100).required(),

  kelasTipe: Joi.string().min(1).max(50).required(),

  statusKepemilikan: Joi.string().min(2).max(100).required(),

  nomorIzinOperasional: Joi.string()
    .min(3)
    .max(100)
    .required(),

  alamatLengkap: Joi.string()
    .min(5)
    .max(255)
    .required(),

  provinsi: Joi.string()
    .min(2)
    .max(100)
    .required(),

  kabupatenKota: Joi.string()
    .min(2)
    .max(100)
    .required(),

  kecamatan: Joi.string()
    .min(2)
    .max(100)
    .required(),

  desaKelurahan: Joi.string()
    .min(2)
    .max(100)
    .required(),

  nomorTelepon: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Nomor telepon tidak valid",
    }),

  emailResmi: Joi.string()
    .email()
    .required(),

  namaPIC: Joi.string()
    .min(3)
    .max(100)
    .required(),

  emailPIC: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(100)
    .required(),

  persetujuan: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only":
        "Persetujuan data wajib dicentang",
    }),
});