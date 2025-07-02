import React from "react";
import './SearchBar.css'
import { CiSearch } from "react-icons/ci";

const SearchBar = ({setSearchQuery,searchQuery}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center"
        style={{ 
          height: "27px",
          border: "1px solid rgb(236 236 236)",
          borderRadius: "5px",
          paddingLeft: "9px",
          position: "relative", 
        }}
      >
        <input
          type="text"
          placeholder="Search Table"
          onChange={(e)=>setSearchQuery(e.target.value)}
          value={searchQuery}
          className="border-0"
          style={{
            height: "25px",
            fontSize: "12px",
            outline: "none",
            paddingRight: "30px", 
            width: "100%",
          }}
        />
        <CiSearch
          className="fs-5 fw-bold"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            height:"15px",
            transform: "translateY(-50%)",
            pointerEvents: "none", 
          }}
        />
      </div>
    </>
  );
};

export default SearchBar;
