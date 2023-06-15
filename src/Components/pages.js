import "./pages.css";

export default function Pages({
  totalPage,
  getPresentPage,
  presentPage,
  multipleRowSelect,
  EditUserData,
  totalUsers,
  foundUsers,
  setFoundUsers
}) {

// creating the total number of page buttons
  const createPageButtons = (nButtons) => {
    let buttons = [];
    for (let i = 1; i <= nButtons; i++) {
      buttons.push(
        <button
          className={presentPage === i ? "active" : "deactive"}
          key={i}
          value={i}
          onClick={(e) => {
            checkPresentPage(parseInt(e.target.value));
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };


  const checkPresentPage = (pageNumber) => {
    if (presentPage !== pageNumber) {
      getPresentPage(pageNumber);
    }
  };

  // deleting users from total data

  const deleteUserFromTotalData = (objOfMultipleSelect) => {
    let data = totalUsers.filter((user) => {
      if (user.id !== objOfMultipleSelect[user.id]) {
        return user;
      }
      return;
    });
    EditUserData(data);
  };

  // deselecting the selected row
  const deleteSelected = (objOfMultipleSelect) => {
    if (foundUsers) {
      deleteUserFromTotalData(objOfMultipleSelect);

      let data = foundUsers.filter((user) => {
        if (user.id !== objOfMultipleSelect[user.id]) {
          return user;
        }
        return;
      });
      setFoundUsers(data);
    } else {
      deleteUserFromTotalData(objOfMultipleSelect);
    }
  };


  return (
    <div className="pagination">
      <div className="DeleteAll">
        <button
          className={
            Object.keys(multipleRowSelect).length
              ? "enableDelete"
              : "disableDelete"
          }
          onClick={() => {
            if (Object.keys(multipleRowSelect).length) {
              deleteSelected(multipleRowSelect);
            }
          }}
        >
          Delete Selected
        </button>
      </div>
      <div className="pages">
        <button
          className={
            totalPage === 1 || presentPage === 1
              ? "disableButton"
              : "enableButton"
          }
          value={1}
          onClick={(e) => {
            checkPresentPage(parseInt(e.target.value));
          }}
        >
          &lt;&lt;
        </button>
        <button
          className={
            totalPage === 1 || presentPage === 1
              ? "disableButton"
              : "enableButton"
          }
          value={presentPage - 1}
          onClick={(e) => {
            checkPresentPage(parseInt(e.target.value));
          }}
        >
          &lt;
        </button>

        {/* creating page buttons */}
        {createPageButtons(totalPage)}

        <button
          className={
            totalPage === presentPage || totalPage === 1
              ? "disableButton"
              : "enableButton"
          }
          value={presentPage + 1}
          onClick={(e) => {
            checkPresentPage(parseInt(e.target.value));
          }}
        >
          &#62;
        </button>
        <button
          className={
            totalPage === presentPage || totalPage === 1
              ? "disableButton"
              : "enableButton"
          }
          value={totalPage}
          onClick={(e) => {
            checkPresentPage(parseInt(e.target.value));
          }}
        >
          &#62;&#62;
        </button>
      </div>
    </div>
  );
}
