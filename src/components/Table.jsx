import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SearchBar from "../components/SearchBar";
import { BiSolidDownload } from "react-icons/bi";
import { FaCircle, FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Avatar from "react-avatar";
import MySVG from "./svg/MySvg";
import { useDispatch } from "react-redux";
import './Table.css'
// import {
//   toggleIsShowAccMaster,
//   toggleIsEditable,
//   setShowLogoutModal,
//   setShowLCloseModal,
//   setOnSavePopubOpen,
// } from "../redux/reducer/AccountMs.reducer.js";
const Table = ({
  columns,
  TableData,
  isDoubleClick,
  sortConfig,
  handleSort,
  myClass,
  pagination,
  generatePDFs,
  refe,
  generatePDFCondition,
  isSearchBar,
  
  onPageChange = () => {},
  onFilterChange = () => {},
  headingDataOnTable,
  TableButton,
}) => { 
  const [filterData, setFilterData] = useState(TableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [,setIsRetrive] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = Array.isArray(filterData) ? filterData.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const [isLoading, setisLoading] = useState(true);
  const handleCheckAll = () => {
    setSelectedRows(isCheckAll ? [] : TableData.map((row) => row.id));
    setIsCheckAll(!isCheckAll);
  };
  // alert(TableData)
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort className="ms-1 text-secondary" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="ms-1 text-secondary" />
    ) : (
      <FaSortDown className="ms-1 text-secondary" />
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);
  
  
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
  );
};

useEffect(() => {
  if (!searchQuery) {
    setFilterData(TableData);
  } else {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = TableData.filter(
      (item) =>
        item.Name?.toLowerCase().includes(lowerQuery) ||
      item._id?.toLowerCase().includes(lowerQuery) ||
      item.date?.toLowerCase().includes(lowerQuery) ||
      item.GroupName?.toLowerCase().includes(lowerQuery)
    );
    setFilterData(filtered);
  }
}, [searchQuery, TableData]);

const showTable = currentItems.length > 0;
  return (
    <div className="container rounded position-relative  pt-2 pb-1 p-2 rounded w-100  ">
      <div className="d-flex w-100 justify-content-between align-items-center">
        {/* {headingDataOnTable && headingDataOnTable} */}
        <div className="d-flex gap-2 mb-2 align-items-center">
          {TableData.length > 0 && isSearchBar && (
            <div className="d-md-flex">
              <SearchBar
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>
          )}
          {TableButton}
          {/* {generatePDFCondition && (
            <button
              style={{ fontSize: "10px" }}
              className="btn btn-outline-danger btn-sm py-1 px-2"
              onClick={generatePDFs}
            >
              <BiSolidDownload className="fs-6" />
              <span className="d-none d-md-inline text-danger hover-text-white">
                Download PDF
              </span>
            </button>
          )} */}
        </div>
      </div>

      
        <div style={{ overflowY: "auto", height: "400px" }}>
          <table
            className={`table table-hover data-table-bottom overflow-y-scroll  border ${
              myClass ? "hover" : ""
            }`}
            ref={refe}
          >
            <thead className="thead-light position-sticky">
              <tr className="bg-row">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    scope="col"
                    onClick={() =>
                      handleSort &&
                      col.key !== "checkbox" &&
                      handleSort(col.key)
                    }
                    style={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      padding: "6px 8px",
                    }}
                    className="fw-semibold small px-2 text-secondary text-slate-700"
                  >
                    {col.key === "checkbox" ? (
                      <input
                        className="form-check-input border border-secondary"
                        type="checkbox"
                        checked={
                          selectedRows.length === TableData.length &&
                          TableData.length > 0
                        }
                        onChange={handleCheckAll}
                      />
                    ) : (
                      <>
                        {col.label}
                        {handleSort && col.key && getSortIcon(col.key)}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: currentItems.length-1 }).map((_, index) => (
                    <tr key={index} className="skeleton-row ps-2">
                      {columns.map((_, i) => (
                        <td key={i}>
                          <div className="skeleton-box"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                : currentItems.map((row, indx) => (
                    <tr
                      key={indx}
                      {...(isDoubleClick && {
                        onDoubleClick: () => isDoubleClick(row),
                      })}
                    >
                      {columns.map((col, colIndex) => (
                        <td key={colIndex}>
                          {col.render ? (
                            col.render(row)
                          ) : col.key === "checkbox" ? (
                            <input
                              className="form-check-input border border-secondary"
                              type="checkbox"
                              checked={selectedRows.includes(row.id)}
                              onChange={() => handleRowSelect(row.id)}
                            />
                          ) : col.key === "status" ? (
                            <span
                              className="badge rounded-4 text-success"
                              style={{
                                backgroundColor: "rgb(150 240 150 / 37%)",
                              }}
                            >
                              <FaCircle className="me-1" />
                              {row[col.key] ? "Active" : "Inactive"}
                            </span>
                          ) : col.key === "name" ? (
                            <div className="d-flex align-items-center">
                              <Avatar
                                name={row[col.key]}
                                size="30"
                                round={true}
                              />
                              <div className="ms-3  small">{row[col.key]}</div>
                            </div>
                          ) : (
                            <div className="p-1 small">{row[col.key]}</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      

      {pagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setItemsPerPage={setItemsPerPage}
          totalPages={totalPages}
          totalItems={filterData.length}
        />
      )}
    </div>
  );
};

export default Table;
