const validate = (name, value, newPwd) => {
    switch (name) {
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value != newPwd) return "Confirm password must be same with new password";
        if (value.length < 8)
          return "Confirm password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Confirm password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Confirm password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Confirm password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Confirm password must contain at least one special character";
        return "";

      case "tempPassword":
        if (!value) return "Temporary password is required";
        if (value.length < 8)
          return "Temporary password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Temporary password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Temporary password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Temporary password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "Temporary password must contain at least one special character";
        return "";

      case "newPassword":
        if (!value) return "New password is required";
        
        if (value.length < 8)
          return "New password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "New password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "New password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "New password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
          return "New password must contain at least one special character";
        return "";

      default:
        return "";
    }
  };