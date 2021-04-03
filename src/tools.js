import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import moment from 'moment';

const Datatable = ({tableData, loading, fieldSettings=[]}) => {
    const [data, setData] = useState(tableData);
    const [details, setDetails] = useState([])
    const [isLoading, setIsLoading] = useState(loading);
    //const [items, setItems] = useState(usersData)
    useEffect(() => {
      setData(tableData);
    },[tableData])
    useEffect(() => {
      setIsLoading(loading);
    },[loading])
  
    const toggleDetails = (index) => {
      const position = details.indexOf(index);
      let newdetails = details.slice();
      if (position !== -1) {
        newdetails.splice(position, 1);
      } else {
        newdetails = [...details, index];
      }
      setDetails(newdetails);
    };
  
    const fields = [
      
      ...fieldSettings,
      // { key: "status",},
      {
        key: "show_details",
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
      },
    ];
  
    const getBadge = (status) => {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          return "primary";
      }
    };
  
    return (
      <CDataTable
        items={data}
        fields={fields}
        columnFilter
        tableFilter={{label: "Хайх", placeholder:"Хайх үгээ оруулна уу"}}
        footer={false}
        itemsPerPageSelect={{ label: "Нэг хуудасанд:" }}
        itemsPerPage={5}
        hover
        sorter
        pagination={{ align: "end" }}
        loading={isLoading}
        scopedSlots={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_username: (item, index) => {
            return <td>{item.user.username}</td>;
          },
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>{item.fullname}</h4>
                  <p className="text-muted">User since: {moment(item.joined).format("YYYY-MM-DD")}</p>
                  <CButton size="sm" color="info">
                    Дэлгэрэнгүй
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Устгах
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        //   details: (item, index) => {
        //     return (
        //       <CCollapse show={details.includes(index)}>
        //         <CCardBody>
        //           <h4>{item.username}</h4>
        //           <p className="text-muted">User since: {item.registered}</p>
        //           <CButton size="sm" color="info">
        //             User Settings
        //           </CButton>
        //           <CButton size="sm" color="danger" className="ml-1">
        //             Delete
        //           </CButton>
        //         </CCardBody>
        //       </CCollapse>
        //     );
        //   },
        }}
      />
    );
  };

  export { Datatable }