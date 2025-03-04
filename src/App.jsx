import { useState, useRef } from 'react'
import './App.css'
import StudentForm from './Components/StudentForm.jsx'
function App() {
  const dialog=useRef();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [StudentDetails,SetStudentDetails]=useState([]);
  const [DisplayForm,SetDisplayForm]=useState({show:false,actions:""});
  function AddStudent(){
    setSelectedStudent(null);
    dialog.current.showModal();
    SetDisplayForm({show:true,actions:"Add"});
  }
  function EditStudent(student){
    setSelectedStudent(student);
    dialog.current.showModal();
    SetDisplayForm({show:true,actions:"Edit"});
  }
  function saveStudent(data) {
    console.log("Saved Student:", data);
    if (DisplayForm.actions === "Edit") {
      SetStudentDetails((prev) =>
        prev.map((s) => (s.studentID === selectedStudent.studentID ? data : s))
      );
    } else {
      SetStudentDetails([...StudentDetails, data]);
    } 
  } 
   
  return (
    <>
    <h1 className="text-3xl text-center font-bold mt-16 text-[#96d8d6]">Student Details</h1>
    <div className="flex justify-end mt-8">
      <button type="button" onClick={AddStudent} className="absolute right-[25%] text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2" >Add Student details</button>
      </div>
      {StudentDetails.length >0 ?(
      <table className="border-separate border-spacing-6 mx-[20%] table-auto w-[50%] mt-16">
        <thead className='text-[#86e2df]'>
          <tr>
            <th>StudentID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>EmailID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='pt-5 text-[#86e2df]'>
        {StudentDetails.map((student, index) => (
              <tr key={index} className="text-center">
                <td>{student.studentID}</td>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.email}</td>
                <td>
                  <button 
                  className=" mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
                  onClick={() => EditStudent(student)}>
                      Edit
                  </button>
                  <button onClick={() =>
                      SetStudentDetails(StudentDetails.filter((s) => s.studentID !== student.studentID))
                    } 
                  className="mx-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                      Delete
                  </button>
                </td>

              </tr>
            ))}
        </tbody>
      </table>):
        (<p className="text-center text-gray-400 mt-16">No student details added yet</p>
      )}
      <StudentForm selectedStudent={selectedStudent} forref={dialog} actions={DisplayForm.actions} onSave={saveStudent}/>
    </>
    )

  }
export default App
