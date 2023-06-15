import { useEffect, useState } from "react";
import "./search.css";

export default function Pages({
  totalUsers,
  getSearchUsersList,
  handleSearchUser,
  searchUser,
  getPresentPage
}) {


  useEffect(() => {
    let foundData = totalUsers.filter((user) => {
      if (
        user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.role.toLowerCase().includes(searchUser.toLowerCase())
      ) {
        return user;
      }
    });
    getSearchUsersList(foundData);
    getPresentPage(1);
    return;
  }, [searchUser]);

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search by name, email or role"
        value={searchUser}
        onChange={(e) => {
          handleSearchUser(e.target.value);
        }}
      />
    </div>
  );
}
