import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const newStudent = action.payload;
      const lastId = state.students.length > 0 ? Math.max(...state.students.map((s) => Number(s.id))) + 1 : 1;
      state.students.push({ ...newStudent, id: lastId });
    },
    editStudent: (state, action) => {
      const updatedStudent = action.payload;
      state.students = state.students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { addStudent, editStudent, deleteStudent, setStudents } = studentSlice.actions;
export default studentSlice.reducer;