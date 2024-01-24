

// Table.jsx
import React, { useState, useEffect } from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
 // const [ setSelectedUser] = useState(null);
//  const [selectedUser,setSelectedUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/getdb');
        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleViewClick = (userName) => {
    console.log(userName)
    // setSelectedUser(userName);
    navigate(`/detail/${userName}`);
  };
  

  // Filtering data based on the search query and label "cracked"
  const filteredData = data
    ? data.filter(
        (item) =>
          item.predictions.some(
            (prediction) =>
              prediction.label === "cracked" &&
              (item.registration_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Phone_number.toLowerCase().includes(searchQuery.toLowerCase()))
          )
      )
    : [];

  // Pagination logic
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`table-container`}>
      <br/><br/><br/><br/>
      <h1>User Tire Details</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Serial No</th>
              <th scope="col">Registration no</th>
              <th scope="col">Phone No</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{indexOfFirstItem + index + 1}</th>
                <td>{item.registration_number}</td>
                <td>{item.Phone_number}</td>
                <td>
                  <button onClick={() => handleViewClick(item.registration_number)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
              <li key={index} onClick={() => paginate(index + 1)}>
                <a href="#!">{index + 1}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Table;
