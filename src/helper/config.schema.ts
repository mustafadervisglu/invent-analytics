import { JoiD } from "src/helper/joi";

export const configValidationSchema = JoiD.object({
  DB_HOST: JoiD.string().required(),
  DB_PORT: JoiD.number().default(5432).required(),
  DB_USERNAME: JoiD.string().required(),
  DB_PASSWORD: JoiD.string().required(),
  DB_DATABASE: JoiD.string().required(),
});
