import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  authAction,
  updateUser,
  deleteUser,
} from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  Form,
  Modal,
  Card,
  InputGroup,
} from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import RemoveConfModal from "../ui/RemoveConfModal";
import "./style/UserList.css";

const UserList = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const dispatch = useDispatch();

  const [ableShowPassword, setAbleShowPassword] = useState(Array<any>());

  const [showPassword, setShowPassword] = useState(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const addAbleShowPassword = (id: any) => {
    setAbleShowPassword((prevState: any) => {
      const indexId = prevState.indexOf(id);
      if (indexId !== -1) {
        const newArrWithoutId = prevState?.filter((v: any) => v !== id);
        return newArrWithoutId;
      } else {
        return [...prevState, id];
      }
    });
  };

  const changeModifyForm = (e: any) => {
    setModifyData({ ...modifyData, [e.target.name]: e.target.value });
  };

  const handleRemoveModalClose = () => {
    setShowRemoveModal(false);
  };
  const [modifyData, setModifyData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    id: "",
  });

  const [userDate, setUserDate] = useState({
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (auth.reload) {
      dispatch(fetchUsers());
      dispatch(authAction.clearReload());
    }
  }, [auth.reload, dispatch]);

  const submitModify = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(modifyData));
    setShowModalModify(false);
  };

  const removeUser = () => {
    dispatch(deleteUser(modifyData.id));
    setShowModalModify(false);
    setShowRemoveModal(false);
  };
  const [showModalModify, setShowModalModify] = useState(false);

  const handleCloseModify = () => setShowModalModify(false);

  const modifyUser = (userData: any) => {
    setShowModalModify(!showModalModify);
    const {
      first_name,
      last_name,
      password,
      username,
      id,
      created_at,
      updated_at,
    } = userData;

    setModifyData({
      first_name,
      last_name,
      password,
      username,
      id,
    });
    setUserDate({
      created_at: new Date(created_at).toLocaleString(),
      updated_at,
    });
  };

  return (
    <>
      <Modal
        show={showModalModify}
        className="modal-modify-supply"
        onHide={handleCloseModify}
        backdrop="static"
      >
        <RemoveConfModal
          show={showRemoveModal}
          handleClose={handleRemoveModalClose}
          onClickRemove={removeUser}
        />
        <Modal.Header closeButton>
          <Modal.Title>Modify Staff User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitModify}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                className="form-input-add-supply"
                type="text"
                value={modifyData.first_name}
                onChange={changeModifyForm}
                name="first_name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                min={1}
                onChange={changeModifyForm}
                name="last_name"
                type="text"
                value={modifyData.last_name}
                className="form-input-add-supply"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={changeModifyForm}
                value={modifyData.username}
                className="form-input-add-supply"
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                onChange={changeModifyForm}
                value={modifyData.password}
                className="form-input-add-supply"
                name="password"
              />
              <Form.Check
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                label="Show Password"
              ></Form.Check>
            </Form.Group>
            <div>
              <span>Created at: {userDate.created_at}</span>
            </div>

            <Button type="submit" className="add-supply-btn">
              Modify User
              <AiOutlineEdit style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
          <Button
            onClick={() => setShowRemoveModal(true)}
            type="button"
            className="remove-supply-btn"
          >
            Remove User
            <MdDelete style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Modal.Body>
      </Modal>

      <div className="user-list">
        {auth.usernames?.map((v: any) => {
          return (
            <Card key={v.id} className="users-card" style={{ width: "70rem" }}>
              <Card.Body>
                <Card.Text>
                  {" "}
                  <span className="user-info-label">
                    {" "}
                    First Name:{" "}
                    <span className="user-info">{v.first_name}</span>{" "}
                  </span>
                  {"        "}
                  <span className="user-info-label">
                    Last Name: <span className="user-info">{v.last_name}</span>{" "}
                  </span>
                  <span className="user-info-label">
                    Username: <span className="user-info">{v.username} </span>{" "}
                  </span>
                  <Button
                    className="edit-user-list"
                    onClick={() => modifyUser(v)}
                  >
                    Edit user <AiOutlineEdit />{" "}
                  </Button>
                  <span>
                    <InputGroup className="password-user-list">
                      <FormControl
                        placeholder="Username"
                        readOnly
                        type={
                          ableShowPassword.includes(v.id) ? "text" : "password"
                        }
                        value={v.password}
                        aria-label="Username"
                        name={v.username}
                        className="input-show-user-password"
                        style={{ borderRadius: "20px" }}
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text className="text-show-password">
                        <Button
                          className="show-password-user"
                          onClick={() => addAbleShowPassword(v.id)}
                        >
                          {ableShowPassword.includes(v.id) ? (
                            <span>
                              Hide <AiFillEyeInvisible />{" "}
                            </span>
                          ) : (
                            <span>
                              Show <AiFillEye />
                            </span>
                          )}
                        </Button>
                      </InputGroup.Text>
                    </InputGroup>
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default UserList;
