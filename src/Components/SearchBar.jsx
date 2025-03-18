import { TextField } from "@mui/material";
import {useState} from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
   /* const [localSearch, setLocalSearch] = useState(searchTerm);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setLocalSearch(value);
      setSearchTerm(value); // Pass search value to parent (StudentTable)
    };8/*/
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Pass search value to parent (StudentTable)
      };
return (  
    <TextField
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      className="w-[300px] max-w-[500px] mt-3 bg-white"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <span className="text-gray-400 px-2">
            🔍
          </span>
        ),
      }}
    />
  );
};

export default SearchBar;