import {
  Dropdown,
  Modal,
  Input,
  Space,
  Menu,
  Badge,
  notification,
  Form,
  Button,
  Select,
} from "antd";
import {
  PhoneOutlined,
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { useEffect, useState } from "react";
import { FormLogin } from "./formLogin";
import { FormRegister } from "./formRegister";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, URL_API } from "../../utils/common";
import Cookies from "js-cookie";
import axios from "axios";
// import "./../../assets/pages/css/components.css";
// import "./../../assets/pages/css/slider.css";
import "./../../assets/pages/css/style-shop.css";
import "./../../assets/plugins/font-awesome/css/font-awesome.min.css";
import "./../../assets/plugins/bootstrap/css/bootstrap.min.css";
import "./../../assets/pages/css/animate.css";
import "./../../assets/plugins/fancybox/source/jquery.fancybox.css";
// import "./../../assets/plugins/owl.carousel/assets/owl.carousel.css";
// import "./../../assets/pages/css/style.css";
import "./../../assets/corporate/css/style.css";
// import "./../../assets/pages/css/themes/red.css";
import "./../../assets/corporate/css/custom.css";
import Logo from "./../../assets/corporate/img/logos/logo-shop-red.png";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers";
const { Search } = Input;
const { Option } = Select;

export const Header = (props) => {
  const {
    loginInfo,
    isLogined,
    setDataSearch,
    countProduct,
    total,
    countCart,
    data,
  } = props;
  const [isOpenFormLogin, setIsOpenFormLogin] = useState(false);
  const [isOpenFormRegister, setIsOpenFormRegister] = useState(false);
  const countProductLocal = localStorage.getItem("COUNT_PRODUCT");

  const onSearch = (value) => {
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=1&pageSize=12&keyworks=${value}`
      )
      .then((res) => {
        setDataSearch(res.data.item);
      });
  };

  const openFormLogin = () => {
    setIsOpenFormLogin(true);
  };

  const openFormRegister = () => {
    setIsOpenFormRegister(true);
  };

  const handleCancelLogin = () => {
    setIsOpenFormLogin(false);
  };

  const handleCancelRegister = () => {
    setIsOpenFormRegister(false);
  };
  const logoutUser = () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    window.location.reload();
  };
  const menu = (
    <Menu
      items={
        loginInfo?.Role === "SuperAdmin"
          ? [
              {
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showModalUser(true)}
                  >
                    T??i kho???n c???a t??i
                  </a>
                ),
                key: "0",
              },
              {
                label: (
                  <Link to="/my-order" rel="noopener noreferrer">
                    ????n h??ng c???a t??i
                  </Link>
                ),
                key: "1",
              },
              {
                label: (
                  <Link to="/QLSanPham" rel="noopener noreferrer">
                    Truy c???p trang admin
                  </Link>
                ),
                key: "2",
              },
              {
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={logoutUser}
                  >
                    ????ng xu???t
                  </a>
                ),
                key: "3",
              },
            ]
          : [
              {
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showModalUser(true)}
                  >
                    T??i kho???n c???a t??i
                  </a>
                ),
                key: "0",
              },
              {
                label: (
                  <Link to="/my-order" rel="noopener noreferrer">
                    ????n h??ng c???a t??i
                  </Link>
                ),
                key: "1",
              },
              {
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={logoutUser}
                  >
                    ????ng xu???t
                  </a>
                ),
                key: "2",
              },
            ]
      }
    />
  );

  const handleDeleteItem = (cartId) => {
    axios
      .delete(`${URL_API}/CartItem/delete-cart?cartId=${cartId}`)
      .then((res) => {
        window.location.reload();
      });
  };

  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const [user, setUser] = useState();

  const showModalUser = () => {
    setIsModalOpenUser(true);
    axios
      .get(`${URL_API}/User/find-user-by-id?id=${loginInfo?.id}`)
      .then((res) => {
        console.log(res.data.item);
        setUser(res.data.item);
        setGender(res.data.item.gender ? "male" : "female");
      });
  };
  console.log(loginInfo);

  const handleOkUser = () => {
    setIsModalOpenUser(false);
  };

  const handleCancelUser = () => {
    setIsModalOpenUser(false);
  };

  const onFinish = (values) => {
    const payload = {
      id: loginInfo?.id,
      username: values.username,
      gender: gender === "male",
      address: values.address,
      phoneNumber: values.phoneNumber,
      email: values.email,
    };
    axios.put(`${URL_API}/User/update-user-by-id`, payload).then((res) => {
      notification.success({
        message: "C???p nh???t th??ng tin th??nh c??ng",
      });
      setIsModalOpenUser(false);
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [gender, setGender] = useState("male");

  const onGenderChange = (value) => {
    setGender(value);
  };
  return (
    <div>
      <div className="header">
        <div className="container d-flex align-items-center">
          <Link to="/">
            <a className="site-logo">
              <img src={Logo} alt="Shop ZMQSocket" />
            </a>
          </Link>
          <div className="w-50" style={{ paddingRight: 80 }}>
            <Search placeholder="T??m ki???m" onSearch={onSearch} enterButton />
          </div>

          <div
            className="top-cart-block ms-auto pb-5 me-4"
            style={{ height: "auto" }}
          >
            <div className="top-cart-info">
              <a href="javascript:void(0);" className="top-cart-info-count">
                {countCart || 0} s???n ph???m
              </a>
              <a href="javascript:void(0);" className="top-cart-info-value">
                {total ? formatPrice(total) : 0}
              </a>
            </div>
            <i className="fa fa-shopping-cart" />
            <div
              className="top-cart-content-wrapper"
              style={{ height: "auto" }}
            >
              <div className="top-cart-content">
                <ul className="scroller">
                  {data?.map((x) => (
                    <li className="w-100 d-flex">
                      <span className="cart-content-count">x {x.quantity}</span>
                      <strong>
                        <a>{x.productName}</a>
                      </strong>
                      <strong>{formatPrice(x.price)}</strong>
                      <a
                        className="del-goods"
                        onClick={() => handleDeleteItem(x.key)}
                      >
                        &nbsp;
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <Link to="/cart" className="cart">
                    <a className="btn btn-default">Xem gi??? h??ng</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="top-cart-block text-center pb-5">
            <div className="top-cart-info">
              {!isLogined ? (
                <>
                  <a onClick={openFormLogin} className="top-cart-info-count">
                    ????ng nh???p
                  </a>
                  <a onClick={openFormRegister} className="top-cart-info-value">
                    ????ng k??
                  </a>
                </>
              ) : (
                <Dropdown overlay={menu}>
                  <Space style={{ fontWeight: "bold", paddingTop: 2 }}>
                    {loginInfo?.username}
                    <DownOutlined />
                  </Space>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link to="/cart" className="cart">
        <div className="login-logout">
          <Badge count={countProduct || countProductLocal}>
            <ShoppingCartOutlined className="login-logout-icon" />
          </Badge>
          <div class="about__box-content">Gi??? h??ng</div>
        </div>
      </Link>
      <Modal
        title="????ng nh???p"
        open={isOpenFormLogin}
        onCancel={handleCancelLogin}
        footer={null}
      >
        <FormLogin setIsOpenFormLogin={setIsOpenFormLogin} />
      </Modal>
      <Modal
        title="????ng k??"
        open={isOpenFormRegister}
        onCancel={handleCancelRegister}
        footer={null}
      >
        <FormRegister setIsOpenFormRegister={setIsOpenFormRegister} />
      </Modal>
      <Modal
        title="Th??ng tin t??i kho???n"
        open={isModalOpenUser}
        onOk={handleOkUser}
        onCancel={handleCancelUser}
        footer={null}
      >
        {user && (
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            {...layout}
            initialValues={{
              username: user?.username,
              email: user?.email,
              phoneNumber: user?.phoneNumber,
              address: user?.address,
            }}
          >
            <Form.Item
              label="T??i kho???n"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??i kho???n!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gi???i T??nh"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder=""
                onChange={onGenderChange}
                allowClear
                value={gender}
              >
                <Option value="male">Nam</Option>
                <Option value="female">Nu</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng nh???p email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="S??? ??i???n Tho???i"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p s??? ??i???n tho???i!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="?????a Ch???"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p ?????a ch???!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                L??u
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};
