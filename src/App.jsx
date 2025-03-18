import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "./store/studentSlice";
import "./App.css";
import StudentTable from "./Components/StudentTable.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  useEffect(() => {
    if (students.length === 0) {
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => {
          const users = data.users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            age: user.age,
            gender: user.gender,
          }));
          dispatch(setStudents(users)); 
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [dispatch, students.length]);


  useEffect(() => {
    if (location.state?.newStudent) {
      const { newStudent, action } = location.state;
      if (action === "Edit") {
        dispatch(editStudent(newStudent));
      } else {
        dispatch(addStudent(newStudent));
      }
      navigate("/", { replace: true }); 
    }
  }, [location.state, dispatch, navigate]);

  const AddStudent = useCallback(() => {
    navigate("/form", { state: { student: null, action: "Add" } });
  }, [navigate]);

  const EditStudent = useCallback(
    
    (student) => {
      navigate("/form", { state: { student, action: "Edit" } });
    },
    [navigate]
  );

  const deleteStudent = (id) => {
    dispatch(deleteStudent(id)); 
  };
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;

    return students.filter((student) =>
      ["id", "firstName", "lastName", "email", "phone"].some((key) =>
        String(student[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [students, searchTerm]);

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-16 text-[#96d8d6]">Student Details</h1>
      <div className="flex justify-end mr-[15%] mt-8">
        <button
          type="button"
          onClick={AddStudent}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus ring-purple-800 font-medium rounded-lg text-sm px-6 py-2 mr-[18%]"
        >
          Add Student details
        </button>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <StudentTable
        students={filteredStudents}
        onEdit={EditStudent}
        searchTerm={searchTerm}
      />
    </>
  );
}

export default App;