import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../utils/api/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = {};

    // Validate form fields
    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
      valid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
      valid = false;
    }

    if (!formData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      await registerUser(formData);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 max-w-sm mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {errors.firstname && (
        <p className="text-red-500 text-sm">{errors.firstname}</p>
      )}
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {errors.lastname && (
        <p className="text-red-500 text-sm">{errors.lastname}</p>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
      <input
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password"
        value={formData.confirmpassword}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {errors.confirmpassword && (
        <p className="text-red-500 text-sm">{errors.confirmpassword}</p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Sign Up
      </button>
      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            login
          </a>
        </p>
      </div>
    </form>
  );
};

export default Signup;
