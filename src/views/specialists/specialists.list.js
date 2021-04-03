import CIcon from "@coreui/icons-react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { callJwtReq, userAuth } from "src/routes";
import { Datatable } from "src/tools";
const dataFormatter = (data) => {
  try{
    const result = data.map((dat) => ({
      username: dat.user.username,
      province: dat.province.name,
      // fullname: dat.fullname,
      // phone: dat.contact_phone,
      is_verified: dat.is_verified,
      workRequests: dat.work_requests.length,
      about: dat.about,
      skill: dat.skill,
      experience: dat.experience,
      joined: dat.user.date_joined,
      work_requests: dat.work_requests
    }));
    return result;
  }
  catch(e){
    console.log(e);
    return [];
  }
};

const fieldSettings = [{ key: "username", label: "Username" },
// { key: "fullname", label: "Овог нэр" },
{ key: "province", label: "Хариуцсан аймаг" },
{ key: "skill", label: "Ур чадвар" },
{ key: "about", label: "About" },
{ key: "experience", label: "Туршлага" },
{ key: "workRequests", label: "Work requests" },
{ key: "is_verified", label: "төлөв" }]

const SpecialistsList = () => {
  const [agronomers, setAgronomers] = useState([]);
  const [dataLoading, setDataLoading ] = useState(false);
  useEffect(() => {
    setDataLoading(true);
    callJwtReq("/admin/specialist", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataLoading(false);
        setAgronomers(responseJson);
      })
      .catch((error) => {
        setDataLoading(false);
        userAuth.signout();
      });
  }, []);

  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              Мэргэжилтэн
            </h4>
            {/* <div className="small text-muted">November 2017</div> */}
          </CCol>
          <CCol sm="7" className="d-none d-md-block">
            <CButton color="primary" className="float-right">
              <CIcon name="cil-cloud-download" />
            </CButton>
          </CCol>
        </CRow>
        <Datatable tableData={dataFormatter(agronomers)} loading={dataLoading} fieldSettings={fieldSettings}/>
      </CCardBody>
    </CCard>
  );
};


export default SpecialistsList;
