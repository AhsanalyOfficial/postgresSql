import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserForm = ({ open, setOpen, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(updateUser({ ...user, username, password, email, address }));
    } else {
      dispatch(addUser({ username, password, email, address }));
    }
    setUsername("");
    setPassword("");
    setEmail("");
    setAddress("");
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
      PaperProps={{ style: { width: "40%" } }}
    >
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <TextField
            className="category_input w-full"
            label="Username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            size="small"
            required
          />
          <TextField
            className="category_input w-full"
            label="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            size="small"
            required
          />
          <TextField
            className="category_input w-full"
            label="Password"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            size="small"
            required
          />
          <TextField
            className="category_input w-full"
            label="Address"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            size="small"
            required
          />
          <DialogActions className="w-full flex justify-end">
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              {user ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
