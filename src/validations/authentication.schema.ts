import { z } from "zod";
import { type TFunction } from "i18next";

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, t("authentication.register.validationErrors.name.required")),
    surname: z
      .string()
      .min(2, t("authentication.register.validationErrors.surname.required")),
    email: z.email(
      t("authentication.register.validationErrors.email.required"),
    ),
    password: z
      .string()
      .min(8, t("authentication.register.validationErrors.password.length"))
      .regex(
        /[0-9]/,
        t("authentication.register.validationErrors.password.number"),
      )
      .regex(
        /[a-z]/,
        t("authentication.register.validationErrors.password.lowercase"),
      )
      .regex(
        /[A-Z]/,
        t("authentication.register.validationErrors.password.uppercase"),
      )
      .regex(
        /[^a-zA-Z0-9]/,
        t("authentication.register.validationErrors.password.character"),
      ),
  });

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.email(t("authentication.login.validationErrors.email.required")),
    password: z
      .string()
      .min(1, t("authentication.login.validationErrors.password.required")),
  });

export const createConfirmAccountSchema = (t: TFunction) =>
  z.object({
    confirmationCode: z
      .string()
      .length(
        6,
        t("authentication.otp.validationErrors.confirmationCode.length"),
      )
      .regex(
        /^\d+$/,
        t("authentication.otp.validationErrors.confirmationCode.numbers"),
      ),
  });

export type RegisterInput = z.infer<ReturnType<typeof createRegisterSchema>>;
export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
export type ConfirmAccountInput = z.infer<
  ReturnType<typeof createConfirmAccountSchema>
>;
