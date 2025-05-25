import { useState } from "react";

export type SignUpFormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignUpFormErrors = Partial<Record<keyof SignUpFormData, string>>;

const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    setSubmitted(true);

    const newErrors: SignUpFormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    handleChange,
    errors,
    validate,
    submitted,
  };
};

export default useSignUpForm;
