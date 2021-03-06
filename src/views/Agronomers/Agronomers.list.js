import CIcon from "@coreui/icons-react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { callJwtReq, userAuth } from "src/routes";
import { Datatable } from "src/tools";
const dataFormatter = (data) => {
  try {
    const result = data.map((dat) => ({
      username: dat.user.username,
      province: dat.ref_province.name,
      fullname: dat.fullname,
      phone: dat.contact_phone,
      joined: dat.user.date_joined,
    }));
    return result;
  } catch (e) {
    return [];
  }
};

const fieldSettings = [
  { key: "username", label: "Username" },
  { key: "fullname", label: "Овог нэр" },
  { key: "province", label: "Хариуцсан аймаг" },
];

const AgronomersList = () => {
  const [agronomers, setAgronomers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    setDataLoading(true);
    callJwtReq("/admin/agronomer", {
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
              Агрономичид
            </h4>
            {/* <div className="small text-muted">November 2017</div> */}
          </CCol>
          <CCol sm="7" className="d-none d-md-block">
            <CButton color="primary" className="float-right">
              <CIcon name="cil-cloud-download" />
            </CButton>
            {/* <CButtonGroup className="float-right mr-3">
              {["Day", "Month", "Year"].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  className="mx-0"
                  active={value === "Month"}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup> */}
          </CCol>
        </CRow>
        <Datatable
          tableData={dataFormatter(agronomers)}
          loading={dataLoading}
          fieldSettings={fieldSettings}
        />
      </CCardBody>
    </CCard>
  );
};

export default AgronomersList;
