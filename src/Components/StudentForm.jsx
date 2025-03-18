import { useState, useEffect,  } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addStudent, editStudent } from "../store/studentSlice.js";
import PhoneInput from "react-phone-number-input";
import { useLocation, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
export default function StudentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { student, action } = location.state || { student: null, action: "Add" };
  const students = useSelector((state) => state.students.students); 
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
  });
  useEffect(() => {
    if (action === "Edit" && student) {
      const parsedPhone = parsePhoneNumberFromString(student.phone);
      setFormData({
        ...student,
        phone: parsedPhone ? parsedPhone.number : "", // Ensure it's in E.164 format
        gender: student.gender.charAt(0).toUpperCase() + student.gender.slice(1), // Fix gender not pre-populating
      });
    }
  }, [action, student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Before Submit:", formData); 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format! Example: user@example.com");
      return;
    }
  

    const parsedPhone = parsePhoneNumberFromString(formData.phone);
    if (!parsedPhone || !parsedPhone.isValid()) {
      alert("Invalid phone number format!");
      return;
    }

    const formattedPhone = `+${parsedPhone.countryCallingCode} ${parsedPhone.nationalNumber.slice(0, 3)}-${parsedPhone.nationalNumber.slice(3, 6)}-${parsedPhone.nationalNumber.slice(6)}`;


     
  const newStudent = {
      ...formData,
      phone: formattedPhone,
      id: action === "Add" ? (students.length > 0 ? Math.max(...students.map((s) => Number(s.id))) + 1 : 1) : formData.id, 
    };
  if (action === "Add") {
    dispatch(addStudent(newStudent));
  } else {
    dispatch(editStudent(newStudent));
    
  }

  navigate("/");
};


  return (
    <div className="max-w-[500px] mx-auto p-6 bg-[#d7fcf8] rounded-lg shadow-lg mt-10">
      <button
            type="button"
            onClick={() => navigate("/")} // Go back to home page
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >Back</button>
          <h2 className="text-center text-2xl font-bold mb-4">{action} Student</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>First Name</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" required className="border p-2 rounded" />

        <label>Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" required className="border p-2 rounded" />

        <label>Phone</label>
        <PhoneInput
          international
          defaultCountry="US"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="border p-2 rounded"
        />

        <label>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
          className="border p-2 rounded"
          onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address.  :)")}
          onInput={(e) => e.target.setCustomValidity("")}
        />

        <label>Age</label>
        <input 
         name="age"
         min="5" 
         max="60" 
         value={formData.age} 
         onChange={handleChange} 
         type="number" required 
         className="border p-2 rounded" />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
}