export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Minimum 6 characters",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters",
  },
  maxLength: {
    value: 50,
    message: "Name must be at most 50 characters",
  },
  pattern: {
    value: /^[A-ZА-ЯЁ][a-zа-яё\s-]+$/i,
    message: "Name must contain only letters and dashes",
  },
};

export const lastNameValidation = {
  ...nameValidation,
  required: "Last name is required",
};

export const repeatPasswordValidation = (password: string) => ({
  ...passwordValidation,
  validate: (value: string) =>
    value === password || "Passwords do not match",
});
