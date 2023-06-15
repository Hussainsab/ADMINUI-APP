import "./tableHeading.css";

export default function TableHeading({
  usersPerPage,
  setSelectAll,
  selectAll,
  selectMultipleRows
}) {

  // to select all rows
  const selectAllRows = () => {
    let objOfSelectedRow = {};
    if (!selectAll) {
      usersPerPage.forEach((user) => {
        objOfSelectedRow[user.id] = user.id;
      });
      selectMultipleRows(objOfSelectedRow);
      setSelectAll(!selectAll);
    } else {
      selectMultipleRows(objOfSelectedRow);
      setSelectAll(!selectAll);
    }
  };

  return (
    <thead>
      <tr>
        <th>
          {/* {selectAll} */}
          <input
            onChange={() => {
              selectAllRows();
            }}
            type="checkBox"
            checked={selectAll === true ? true : false}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}
