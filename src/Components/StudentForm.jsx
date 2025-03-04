import { useState, useEffect} from "react";
export default function StudentForm({forref ,onSave,actions,selectedStudent}){
const [formData, setFormData] = useState({
      studentID: "",
      name: "",
      branch: "",
      email: "",
    });
useEffect(() => {
    if (actions === "Edit" && selectedStudent) {
        setFormData(selectedStudent);
    } else {
        setFormData({ studentID: "", name: "", branch: "", email: "" });
    }
      }, [actions, selectedStudent]);
const handleChange = (data) => {
        setFormData({ ...formData, [data.target.name]: data.target.value });
      };
const handleSubmit = (data) => {
        data.preventDefault();
        onSave(formData); 
        setFormData({ studentID: "", name: "", branch: "", email: "" }); // Clear form
        forref.current.close();
      };

    return(
    <dialog ref={forref}
    className="w-1/4 h-[90%] items-center justify-center mx-auto my-30 border-none rounded-lg p-8 bg-[#d7fcf8] animate-slide-in backdrop:bg-black/70 backdrop-blur-md">
        <h2 className="text-center top-1/2 left-1/2 text-4xl font-bold py-10">{actions} Student</h2>
        <form onSubmit={handleSubmit} method="dialog" className="text-sky-950 text-[20px] flex flex-col gap-4">

        <label className="mt-4">StudentID</label>
        <input 
        name="studentID" 
        value={formData.studentID}
        onChange={handleChange} 
        className=" border-1 border-stone-800" 
        type="text" 
        placeholder="StudentID"
        disabled={actions === "Edit"}  
        required/>

        <label className="mt-4">Student Name</label>
        <input name="name"
          value={formData.name}
          onChange={handleChange} 
          className=" border-1 border-stone-800" 
          type="text" 
          placeholder="Student Name" 
          required/>

        <label className="mt-4">Branch</label>
        <input name="branch"
          value={formData.branch}
          onChange={handleChange} 
          className=" border-1 border-stone-800" 
          type="text" 
          placeholder="Branch" 
          required/>

        <label className="mt-4">Student EmailID</label>
        <input name="email"
          value={formData.email}
          onChange={handleChange}
          className=" border-1 border-stone-800" 
          type="email" 
          placeholder="EmailID" 
          required/>

        <button type="submit" className="mt-auto px-4 py-2 border-none rounded bg-[#12352f] text-[#edfcfa] text-lg cursor-pointer hover:bg-[#051715]">
  Save
</button>

        </form>
    </dialog>);
}