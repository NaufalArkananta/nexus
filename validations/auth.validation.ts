import Joi from "joi";

export const registerSchema = Joi.object({
  nama: Joi.string()
    .min(3)
    .max(100)
    .required(),

  noHp: Joi.string()
    .pattern(/^08[0-9]{8,13}$/)
    .required()
    .messages({
      "string.pattern.base": "Nomor HP harus diawali 08, berupa angka dan memiliki panjang 8-13 karakter",
    }),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),

  provinsi: Joi.string()
    .required(),

  kabupatenKota: Joi.string()
    .required(),

  kecamatan: Joi.string()
    .required(),

  desaKelurahan: Joi.string()
    .required(),

  alamat: Joi.string()
    .allow("")
    .optional(),

  kodePos: Joi.string()
    .pattern(/^[0-9]{5}$/)
    .allow("")
    .optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});