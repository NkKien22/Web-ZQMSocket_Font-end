import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Moda } from "react-bootstrap";
import { Drawer, Form, Menu, Pagination, Input } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const items = [
//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//   ]),
// ];
function ClientManager() {
  const LoadAdmin = {
  pageNum: 1,
  pageSize: 10,
  keyworks: "",
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllUser(page, 10);
  };
  // const LoadDetail = (id) => {
  //   navigate("/qltaikhoan/detail/" + id);
  // };
  // const LoadEdit = (id) => {
  //   navigate("/qltaikhoan/edit/" + id);
  // };
  // const Removefunction = (id) => {
  //   if (window.confirm("Bạn có chắn chắn muốn xóa tài khoản này?")) {
  //     fetch("http://localhost:8000/employee/" + id, {
  //       method: "DELETE",
  //     })
  //       .then((res) => {
  //         alert("Removed successfully.");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // };
  const getAllUser = (page, pageSize) => {
    axios.post(`${URL_API}/User/get-all-users`, LoadAdmin)
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split("")[0]));
      });
  };

  useEffect(() => {
    getAllUser(1, 10);
  }, []);
  return (
    <div class="container-fluid">
      <div className="col-sm-2">
        <SideBar isActive="2"/>
      </div>
      <div className="crud shadow-lg p-5 bg-body rounded col-sm-10">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Quản lí khách hàng</b>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                  {data.map((a, index) => (  
                    <tr>
                      <td>{index+1}</td>
                      <img src={a.image} class="img-thumbnail" width={50}></img>
                      <td>{a.username}</td>
                      <td>{a.email}</td>
                      <td>{a.phoneNumber}</td>
                      <td>{a.address}</td>
                      <td>{a.gender===true?'Nam':'Nữ'}</td>
                      <td>{a.dob}</td>
                      <td>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
            {data.length > 0 && (
              <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={total}
                pageSize={10}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientManager;