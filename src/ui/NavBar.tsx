import React, { useEffect } from "react";
import {
  Navbar,
  Image,
  Nav,
  NavDropdown,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import logo from "../assets/img/logo-sarrs.png";
import { authAction, fetchSignUp } from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useHistory } from "react-router";
import AlertModal from "./AlertModal";
import "./style/NavBar.css";

import { jwtDecoded } from "../helpers/jwtDecoded";
import { useState } from "react";

const NavBar = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userType, setUserType] = useState("");

  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    user_type: "",
  });

  const [onFocusUsername, setOnFocusUsername] = useState(false);
  const [showModalAddUser, setShowModalAddUser] = useState(false);

  const [usernameSuggestion, setUserSuggestion] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const changeUserForm = (e: any) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch(authAction.getToken());
    return () => {
      // cleanup;
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      const { first_name, username, user_type } = jwtDecoded(auth.token);
      setFirstName(first_name);
      setUserName(username);
      setUserType(user_type);
    }
    return () => {
      // cleanup;
    };
  }, [auth.token]);

  useEffect(() => {
    if (auth.msg) {
      setTimeout(() => {
        dispatch(authAction?.clearMsg());
      }, 3000);
    }
  }, [auth.msg, dispatch]);

  const signOut = () => {
    dispatch(authAction.clearToken());
    history.push("/");
  };

  const handleCloseAddUser = () => setShowModalAddUser(false);

  const usernameSuggestions = () => {
    const checkUsernameExist = auth.usernames?.filter(
      (v: any) => v.username === userForm.username
    );
    if (checkUsernameExist.length !== 0) {
    } else {
      const fullName = `${userForm.first_name} ${userForm.last_name}`;

      const usernameSuggestion: any = fullName
        .split(" ")
        .map((v: any, i: number) => (i !== 0 ? v[0] : `${v[0]}${v[1]}`))
        .join("")
        .toLowerCase();
      setUserSuggestion(usernameSuggestion);
    }
  };

  const setSuggestUsername = () => {
    setUserForm((prevState: any) => {
      return { ...prevState, username: usernameSuggestion };
    });
    setOnFocusUsername(false);
  };

  const generateUsername = () => {
    usernameSuggestions();
    setOnFocusUsername(true);
  };

  const showSuggestionUsername = () =>
    onFocusUsername && userForm.username === "";

  const submitAddUser = (e: any) => {
    e.preventDefault();
    dispatch(fetchSignUp(userForm));
    setShowModalAddUser(false);
    setUserForm({
      first_name: "",
      last_name: "",
      password: "",
      username: "",
      user_type: "",
    });
  };

  return (
    <>
      <AlertModal showCondition={auth.msg !== ""} msg={auth.msg} />
      <Modal
        show={showModalAddUser}
        className="modal-add-supply"
        onHide={handleCloseAddUser}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" onSubmit={submitAddUser}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type="text"
                onChange={changeUserForm}
                name="first_name"
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type="text"
                onChange={changeUserForm}
                name="last_name"
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type="text"
                onChange={changeUserForm}
                onFocus={generateUsername}
                name="username"
                value={userForm.username}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Text>
              {showSuggestionUsername() && (
                <div>
                  <span>Suggestion:</span>
                  <Button
                    onClick={setSuggestUsername}
                    className="suggestion-username-btn"
                  >
                    {" "}
                    {usernameSuggestion}
                  </Button>
                </div>
              )}
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type={showPassword ? "text" : "password"}
                onChange={changeUserForm}
                name="password"
                placeholder="Enter password"
              />
              <Form.Check
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                label="Show Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User type</Form.Label>
              <Form.Select
                className="form-input-add-user"
                onChange={changeUserForm}
                name="user_type"
                required={true}
              >
                <option value="">Select the user type</option>
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="add-user-btn">
              Add User
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Navbar className="nav-bar">
        <Navbar.Brand href="/">
          <Image src={logo} className="logo-image" rounded /> Medical
          Appointment System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {auth.token && (
              <>
                {" "}
               
                <NavDropdown
                  className="user-dropdown"
                  title={`Hi ${firstName.split(" ").shift()}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.ItemText>
                    Login as
                    <span className="badge-user"> {userName}</span>
                  </NavDropdown.ItemText>
                  {userType === "admin" && (
                    <>
                      <NavDropdown.Item
                        onClick={() => setShowModalAddUser(true)}
                      >
                        Add Users
                      </NavDropdown.Item>
                      <NavDropdown.Item href="userlist">
                        User list
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
