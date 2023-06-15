import "./adminPage.css";
import Pages from "./pages";
import Search from "./search";
import TableBody from "./tableBody";
import TableHeading from "./tableHeading";
import { useEffect, useState } from "react";

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const users = 10;

export default function App() {
  const [totalUsers, setTotalUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [presentPage, setPresentPage] = useState(1);
  const [searchUser, setSearchUser] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [multipleRowSelect, setMultipleRowSelect] = useState({});

  // using this method get the data from api 

  const getAllUsers = async () => {
    try{
      const response = await fetch(URL);
      const data = await response.json();
      setTotalUsers(data);
    }catch(error){
      if(error.response && error.response.status === 500){
        alert(error.response.data.message)
      }else{
        alert("Could not fetch users. Please raise a ticket to solve this issue");
      }
    }
    
  };

  // this function will set the keyword to search the users 

  const handleSearchUser = (text) => {
    setSearchUser(text);
  };


  // this function helps to keep track of page number 

  const getPresentPage = (pageNumber) => {

    if (selectAll) {
      setSelectAll(false);
      setMultipleRowSelect({});
    }
    setPresentPage(pageNumber);
  };

  // this method helps to select the individual row or multiple rows

  const selectMultipleRows = (obj) => {
    setMultipleRowSelect(obj);
  };


  // this function helps to update the user data in allusers data


  const EditUserData = (data) => {
    if (presentPage > Math.ceil(data.length / users)) {
      getPresentPage(presentPage - 1);
      setTotalUsers(data);
      selectMultipleRows({})
      return;
    }
    setTotalUsers(data);
    getPresentPage(presentPage);
    selectMultipleRows({})
  };


//  this useEffect hook is used to get the all users data once when the load the page 
 
  useEffect(() => {
    getAllUsers();

  }, []);


// this useEffect hook is used to update the useres per page on change of total users or page change

  useEffect(() => {


    if (!searchUser) {
      let i = presentPage * users - users;
      let j = presentPage * users;

      let nUsers = totalUsers.slice(i, j).map((obj)=>({...obj}));

      setUsersPerPage(nUsers);
      if (totalUsers.length !== 0) {
        setTotalPage(Math.ceil(totalUsers.length / users));
      } else {
        setTotalPage(1);
      }
    } else {
      getSearchUsersList(foundUsers);
    }

  }, [totalUsers, presentPage]);


  // this function helps to set the useres per page from found data 

  const getSearchUsersList = (data) => {

    setFoundUsers(data);
    let i = 0,
      j = 0;
    if (presentPage > Math.ceil(data.length / users)) {
      i = 1 * users - users;
      j = 1 * users;
      setPresentPage(presentPage-1);
    } else {
      i = presentPage * users - users;
      j = presentPage * users;
    }

    let nUsers = data.slice(i, j).map((obj)=>({...obj}));
    setUsersPerPage(nUsers);

    if (data.length === 0) {
      setTotalPage(1);
    } else {
      setTotalPage(Math.ceil(data.length / users));
    }
  };

  

  return (
    <div className="adminPage">
      <Search
        totalUsers={totalUsers}
        getSearchUsersList={getSearchUsersList}
        handleSearchUser={handleSearchUser}
        searchUser={searchUser}
        getPresentPage={getPresentPage}
      />
      <table>
        <TableHeading
          usersPerPage={usersPerPage}
          setSelectAll={setSelectAll}
          selectAll={selectAll}
          selectMultipleRows={selectMultipleRows}
        />

        <TableBody
          usersPerPage={usersPerPage}
          totalUsers={totalUsers}
          EditUserData={EditUserData}
          foundUsers={foundUsers}
          setFoundUsers={setFoundUsers}
          selectAll={selectAll}
          multipleRowSelect={multipleRowSelect}
          selectMultipleRows={selectMultipleRows}
          setUsersPerPage={setUsersPerPage}
        />
      </table>

      <Pages
        totalPage={totalPage}
        getPresentPage={getPresentPage}
        presentPage={presentPage}
        multipleRowSelect={multipleRowSelect}
        EditUserData={EditUserData}
        totalUsers={totalUsers}
        foundUsers={foundUsers}
        setFoundUsers={setFoundUsers}
      />
    </div>
  );
}
