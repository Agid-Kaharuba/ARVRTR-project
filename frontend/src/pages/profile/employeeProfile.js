import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Container, Typography, Avatar } from "@material-ui/core";
import Profile from '../../components/profile'
import UploadImageForm from "../../components/upload";
import api from '../../helpers/api'
import { AuthContext } from "../../context/auth";

export default function EmployeeProfile(props) {
  const { authState } = useContext(AuthContext);
  const [employee, setEmployeeDetails] = useState(undefined);
  const [resultState, setResultState] = React.useState(undefined);
  const pImage = useState({
    profileImg: 'https://cdn3.iconfinder.com/data/icons/gradient-general-pack/512/user-01-512.png'
  });
  // const {profileImg} = this.pImage;

  const fetchData = async () => {
    const res = await api.user.current(authState.token);
    res.data.password = "";
    setEmployeeDetails(res.data);
  };

  useEffect(() => {
    if (employee === undefined) {
      fetchData();
    }
  });

  function handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;

    setEmployeeDetails({
      ...employee, [name]: value,
    });
    console.log(name, value, employee);
  }

  async function saveChanges(event) {
    event.preventDefault();
    setResultState("Submitting");
    try {
      await api.user.update(authState.token, authState.user._id, employee);
      setResultState("Success");
    }
    catch (err) {
      setResultState(err.response.data.err);
    }
  }

  const buildResult = () => {
    return (
      <>
        <p>{resultState}</p>
      </>
    );
  };

  // TODO: I dont know what these are for
  // But they are 
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    employee ?
      <>
        <Profile employee={employee} handleChange={handleChange} handleImageUpload={handleImageUpload} saveChanges={saveChanges}
          // TODO: figure out props below
          uploadedImage={uploadedImage} imageUploader={imageUploader}
        />
        {resultState !== undefined && buildResult()}
      </>
      :
      // TODO: someone put in a loader or sort this out
      <>
        <h1>LOADING</h1>
      </>
  );
}