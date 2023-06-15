import { useState} from "react";
import "./tableBody.css";

export default function TableBody({
  usersPerPage,
  totalUsers,
  EditUserData,
  foundUsers,
  setFoundUsers,
  selectAll,
  multipleRowSelect,
  selectMultipleRows,
  setUsersPerPage
}) {
  const [selectOne, setSelectOne] = useState("");
  let userObject = {};

  // enable edit of user data on single selected row

  const enableEdit = (id) => {
    if (selectOne === id) {
      return "enableEdit";
    } else {
      return "disableEdit";
    }
  };

  // if edit is enabled then to make all other rows disable 
  const disableEditALL = (id) => {
    return (selectOne === '' ? "" : selectOne === id ? '' : "disable-edit-all")
  }


  // deleting user from total useres list single row 

  const deleteUserFromTotalData = (id) => {
    let tdata = totalUsers.filter((user) => {
      if (user.id !== id) {
        return user;
      }
      return;
    });
    EditUserData(tdata);
  };


  const deleteSigleRow = (id) => {
    if (foundUsers) {
      deleteUserFromTotalData(id);
      let fUsers = foundUsers.filter((user) => {
        if (user.id !== id) {
          return user;
        }
        return;
      });
      setFoundUsers(fUsers);
    } else {
      deleteUserFromTotalData(id);
    }
  };

  // change the data on edit state

  const changeData = (text, property) => {
    let data = usersPerPage.map((user) => {
      if (user.id === selectOne) {
        user[property] = text;
      }
      return user;
    });
    setUsersPerPage(data);
  };



  const UpdateTotalUserList = () => {
    let data = totalUsers.map((user) => {
      if (user.id === selectOne) {
        user.name = userObject.name;
        user.email = userObject.email
        user.role = userObject.role
        return user;
      }
      return user;
    });
    return data;
  }


  // on click of save button data saved to total user list
  const saveEditedUser = () => {
    usersPerPage.forEach((user) => {
      if (user.id === selectOne) {
        userObject = { ...user };
      }
    })
    if (userObject.name && userObject.role && userObject.email) {
      let data = UpdateTotalUserList(userObject)
      EditUserData(data);
    } else {
      cancelUpdated();
    }

  }

  // on click of cancel button the chnage is reverted
  const cancelUpdated = () => {
    totalUsers.forEach((user) => {
      if (user.id === selectOne) {
        userObject = { ...user };
      }
    })

    let data = UpdateTotalUserList(userObject)

    setSelectOne('');
    EditUserData(data);
  }


  const selectAndDelsectRows = (id) => {
    let obj = { ...multipleRowSelect };
    if (obj[id]) {
      delete obj[id];
    } else {
      obj[id] = id;
    }
    selectMultipleRows(obj);
  };

  return (
    <tbody>
      {usersPerPage.map((user) => {
        return (
          <tr
            key={user.id}
            className={
              multipleRowSelect[user.id] === user.id
                ? "showBackground"
                : "hideBackground"
            }
          >
            <td>
              <input
                checked={
                  (selectAll && multipleRowSelect[user.id] === user.id) ||
                    multipleRowSelect[user.id] === user.id
                    ? true
                    : false
                }
                type="checkBox"
                onChange={() => {
                  selectAndDelsectRows(user.id);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className={enableEdit(user.id)}
                value={user.name}
                onChange={(e) => {
                  changeData(e.target.value, "name");
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className={enableEdit(user.id)}
                value={user.email}
                onChange={(e) => {
                  changeData(e.target.value, "email");
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className={enableEdit(user.id)}
                value={user.role}
                onChange={(e) => {
                  changeData(e.target.value, "role");
                }}
              />
            </td>
            {!(selectOne === user.id) ? (
              <td>
                {/* edit button */}

                <i
                  className={`fa-solid fa-pen-to-square fa-lg ${disableEditALL(user.id)}`}

                  onClick={() => {
                    setSelectOne(user.id);
                  }}
                ></i>
                {/* delete button */}

                <i
                  className="fa-solid fa-trash fa-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteSigleRow(user.id);
                  }}
                ></i>
              </td>
            ) : (
              <td>
                {/* save button */}
                <i
                  className="fa-solid fa-floppy-disk fa-lg"
                  onClick={() => {
                    saveEditedUser();
                    setSelectOne("");
                  }}
                ></i>

                <i
                  className="fa-solid fa-xmark fa-xl"
                  // <i class="fa-solid fa-xmark fa-lg"></i>
                  onClick={() => {
                    // setSelectOne("");
                    cancelUpdated();
                  }}
                ></i>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
