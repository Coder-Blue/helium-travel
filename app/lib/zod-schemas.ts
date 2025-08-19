import { z } from "zod";

export const SearchSchema = z.object({
  q: z.string().min(1, "Bạn phải nhập từ khóa."),
});

export type SearchSchema = z.infer<typeof SearchSchema>;

export const NameSchema = z.string()
  .min(1, { message: "Tên địa điểm phái có ít nhất 1 kí tự" })
  .max(100, { message: "Tên địa điểm không được nhiều hơn 100 kí tự" });

export const DescriptionSchema = z.string()
  .max(1000, { message: "Mô tả địa điểm không nhiều hơn 1000 kí tự" })
  .or(z.null());

export const LatSchema = z.coerce
  .number()
  .min(-90, { message: "Vĩ độ không được thấp hơn -90 độ" })
  .max(90, { message: "Vĩ độ không được cao hơn 90 độ" });

export const LongSchema = z.coerce
  .number()
  .min(-180, { message: "Kinh độ không được thấp hơn -180 độ" })
  .max(180, { message: "Kinh độ không được cao hơn 180 độ" });
