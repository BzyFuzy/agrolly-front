import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { userAuth } from "src/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URI = "/admin/token/"

const Login = () => {
  const history = useHistory();
  const [inputData, setInputData] = useState({username: "", password: ""});
  const havePermisstionRoles = ["ADMIN", "AGRONOMER"];
  const formHandler = async (e) => {
    e.preventDefault();
    const reqBody = {
      username: inputData.username,
      password: inputData.password,
    };

    try {
      const loginReq = await fetch(API_URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      const jsonRes = await loginReq.json();
      console.log(jsonRes.role);
      if (loginReq.ok) {
        if(havePermisstionRoles.some(role => jsonRes.role.includes(role))){
          userAuth.authenticate(jsonRes.access_token, jsonRes.refresh_token, jsonRes.role);
          history.push("/user");
        }
        else{
          toast.error("Нэвтрэх эрхгүй байна");
        }
      } 
      else {
        toast.error("Нэвтрэх нэр нууц үг буруу байна");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="username"
                        type="text"
                        placeholder="Нэвтрэх нэр"
                        autoComplete="username"
                        value={inputData.username}
                        onChange={({ target: { value } }) => setInputData({...inputData, username: value})}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        type="password"
                        placeholder="Нууц үг"
                        autoComplete="current-password"
                        value={inputData.password}
                        onChange={({ target: { value } }) => setInputData({...inputData, password: value})}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
