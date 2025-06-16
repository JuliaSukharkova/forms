import type { TFunction } from "i18next";

export const emailValidation = (t: TFunction) => ({
  required: t("validation.email.required"),
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: t("validation.email.invalid"),
  },
});

export const passwordValidation = (t: TFunction) => ({
  required: t("validation.password.required"),
  minLength: {
    value: 6,
    message: t("validation.password.minLength"),
  },
});

export const nameValidation = (t: TFunction) => ({
  required: t("validation.name.required"),
  minLength: {
    value: 2,
    message: t("validation.name.min"),
  },
  maxLength: {
    value: 50,
    message: t("validation.name.max"),
  },
  pattern: {
    value: /^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i,
    message: t("validation.name.invalid"),
  },
});

export const lastNameValidation = (t: TFunction) => ({
  ...nameValidation(t),
  required: t("validation.lastName.required"),
});

export const repeatPasswordValidation = (password: string, t: TFunction) => ({
  ...passwordValidation(t),
  validate: (value: string) =>
    value === password || t("validation.repeatPassword.notMatch"),
});
