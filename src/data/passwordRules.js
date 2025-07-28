export const passwordRules = [
    {
      label: "Minimum 8 characters",
      test: (pwd) => pwd.length >= 8,
    },
    {
      label: "At least 1 uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "At least 1 lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
    },
    {
      label: "At least 1 number",
      test: (pwd) => /\d/.test(pwd),
    },
    {
      label: "At least 1 special character (!@#$...)",
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
    },
  ];
