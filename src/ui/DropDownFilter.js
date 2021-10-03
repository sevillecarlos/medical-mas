import React, { useState } from "react";
import { Button, FormControl, Dropdown, Form } from "react-bootstrap";

import "./style/DropDownFilter.css";

const DropDownFilter = (props) => {
  const { items, appointmentFormPatient } = props;

  const [dropdownValue, setDropDownValue] = useState("Select Patient");

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className="filter-patient"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </Button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      const changeValue=(e)=>{
        e.preventDefault()
         setValue(e.target.value)
      }

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form autoComplete="off">
            <FormControl
              autoFocus
              className="filter-control-patients"
              placeholder="Type to filter patients"
              onChange={changeValue}
              value={value}
            />
          </Form>
          <ul className="patients-list">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  const selectPatient = (e, patientId) => {
    appointmentFormPatient((prevState) => {
      return { ...prevState, patient_id: patientId };
    });
    setDropDownValue(e.target.innerText);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {dropdownValue.split("|").shift()}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className="menu">
        {items?.map((v) => {
          const fullNameId = `${v.first_name} ${v.last_name} |  ${v.patient_id}`;
          return (
            <Dropdown.Item key={v.id} className='dropdown-filter-item' onClick={(e) => selectPatient(e, v.id)}>
              {fullNameId}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownFilter;
