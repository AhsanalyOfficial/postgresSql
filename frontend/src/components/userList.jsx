import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/features/userSlice";
import UserForm from "./userForm";

const UserList = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setOpenDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "User name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "password", headerName: "Password", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className="w-full flex items-center justify-start flex-col"
        style={{ marginTop: "50px" }}
      >
        <div className="m-auto w-max">
          <div>
            <Button
              variant="outlined"
              startIcon={<AccessibilityIcon />}
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </div>

          {users.length > 0 ? (
            <div className="m-auto mt-4">
              <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          ) : (
            <p className="text-center py-2 text-red-500 font-bold">
              No User Found
            </p>
          )}
        </div>
      </div>
      {openDialog && (
        <UserForm
          open={openDialog}
          setOpen={setOpenDialog}
          user={editingUser}
        />
      )}
    </>
  );
};

export default UserList;
