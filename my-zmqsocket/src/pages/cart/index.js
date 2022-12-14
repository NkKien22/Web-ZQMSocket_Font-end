import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Select,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API } from "../../utils/common";
import { DeleteOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers";
import { Steps } from "antd";
import { Col, Row } from "react-bootstrap";
import { rest } from "lodash";

const { Search } = Input;
const { Step } = Steps;

export const Cart = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [openFormOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponValid, setCouponValid] = useState(false);
  const [step, setStep] = useState(0);
  const [option, setOption] = useState([]);
  const [disabledCoupon, setDisabledCoupon] = useState(false);


  const onChangeQuantity = (record, val) => {
    data.forEach((x) => {
      if (x.key === record.key) x.quantity = val;
    });
  };

  const onChangeColor = (record, val) => {
    data.forEach((x) => {
      if (x.key === record.key) {
        const colorOps = option.filter((x) => x.optionNameID === 1);
        var newColor = {};
        x.optionCarts.forEach((x) => {
          if (x.optionNameID === 1) {
            x = colorOps.find((x) => x.optionValueID === val);
            newColor = x;
          }
        });
        x.optionCarts[0] = newColor;
      }
    });
  };

  const onChangeRam = (record, val) => {
    data.forEach((x) => {
      if (x.key === record.key) {
        const colorOps = option.filter((x) => x.optionNameID === 2);
        var newRam = {};
        x.optionCarts.forEach((x) => {
          if (x.optionNameID === 1) {
            x = colorOps.find((x) => x.optionValueID === val);
            newRam = x;
          }
        });
        x.optionCarts[1] = newRam;
      }
    });
  };

  const updateCart = (cartId, record) => {
    const payload = {
      cartId,
      quantity: record.quantity,
      optionCarts: record.optionCarts,
    };
    axios
      .put(`${URL_API}/CartItem/update-cartItem`, payload)
      .then((res) => {
        if (res)
          notification.success({
            message: "C???p nh???t gi??? h??ng th??nh c??ng",
          });
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleDeleteItem = (cartId) => {
    axios
      .delete(`${URL_API}/CartItem/delete-cart?cartId=${cartId}`)
      .then((res) => {
        if (res)
          notification.success({
            message: "X??a s???n ph???m gi??? h??ng th??nh c??ng",
          });
      })
      .then(() => {
        window.location.reload();
      });
  };
  //console.log(data);

  const onClose = () => {
    setOpenOrder(false);
  };

  const columns = [
    {
      title: "T??n s???n ph???m",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "M??u",
      dataIndex: "optionCarts",
      key: "optionCarts",
      // 1 => 2
      render: (_, record) => (
        <div>
          <Select
            style={{
              width: 120,
            }}
            defaultValue={option
              .filter((x) => x.optionNameID === 1)
              .map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))
              .find(
                (x) =>
                  x.value ===
                  record.optionCarts.find((x) => x.optionNameID === 1)
                    .optionValueID
              )}
            onChange={(val) => onChangeColor(record, val)}
            options={option
              .filter((x) => x.optionNameID === 1)
              .map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))}
          />
        </div>
      ),
    },
    {
      title: "RAM",
      dataIndex: "optionCarts",
      key: "optionCarts",
      render: (_, record) => (
        <div>
          <Select
            style={{
              width: 120,
            }}
            defaultValue={option
              .filter((x) => x.optionNameID === 2)
              .map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))
              .find(
                (x) =>
                  x.value ===
                  record.optionCarts.find((x) => x.optionNameID === 2)
                    .optionValueID
              )}
            onChange={(val) => onChangeRam(record, val)}
            options={option
              .filter((x) => x.optionNameID === 2)
              .map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))}
          />
        </div>
      ),
    },
    {
      title: "Gi??",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          <InputNumber
            min={1}
            max={10}
            defaultValue={record.quantity}
            onChange={(val) => onChangeQuantity(record, val)}
          />
        </div>
      ),
    },
    {
      title: "Th??nh ti???n",
      dataIndex: "total",
      key: "total",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "C???p nh???t",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button
            className="ms-2"
            onClick={() => updateCart(record.key, record)}
          >
            C???p nh???t
          </Button>
        </div>
      ),
    },
    {
      title: "X??a",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="B???n c?? ch???c ch???n x??a?"
          onConfirm={() => handleDeleteItem(record.key)}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  const getCarts = (userId) => {
    axios
      .get(`${URL_API}/CartItem/getbyid-cartItem?userId=${userId}`)
      .then((res) => {
        setData(
          res?.data?.item.map((x) => ({
            key: x?.cartId,
            productName: x?.productName,
            quantity: x?.quantity,
            price: x?.price,
            total: x?.total,
            optionCarts: x?.optionCarts,
          }))
        );
        setTotalPrice(res?.data?.message);
        // console.log(res);
      });
  };

  const getAllOptions = (userId) => {
    axios.get(`${URL_API}/CartItem/get-all-option`).then((res) => {
      setOption(res.data);
    });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    setLoading(true);
    const product = data
      .filter((x) => selectedRowKeys.includes(x.key))
      .map((x) => ({
        cartID: x.key,
        price: x.price,
        optionCarts: x.optionCarts.map((x) => ({
          optionNameID: x.optionNameID,
          optionValueID: x.optionValueID,
        })),
      }));
    const payload = {
      codeCoupon: coupon,
      userID: userId,
      description: values.description,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email,
      product,
    };
    axios
      .post(`${URL_API}/Order/create-order`, payload)
      .then((res) => {
        if (res) {
          notification.success({
            message: "?????t h??ng th??nh c??ng",
          });
          setOpenOrder(false);
          setStep(3);
          window.location.reload();
        }
      })
      .finally(() => setLoading(true));
  };

  const onSearch = (value) => {
    axios
    .get(`${URL_API}/Coupon/get-coupon-by-code?code=${value}`)   
    .then((res) => {
      // console.log("minimunOrderValue",res.data.item.minimunOrderValue)
      if(res.data.item.minimunOrderValue > totalPrice){
         console.log("M?? gi???m gi?? l???n h??n gi?? tr??? ????n h??ng")
         notification.warning({
          message: "????n h??ng ch??a ?????t t???i " + res.data.item.minimunOrderValue,
         })
      } else {
        if (res?.data?.success) {
          setCoupon(value);
          notification.success({ 
            message: "??p d???ng m?? gi???m gi?? th??nh c??ng",
          });
          setDisabledCoupon(true);
          setTotalPrice((prev) => prev - res.data.item.couponValue);
         const total_sale = totalPrice - res.data.item.minimunOrderValue
         if(total_sale >= 0){
          totalPrice = total_sale
         } else {
          totalPrice = 0
         }
        } else {
          setCouponValid(false);
          notification.warning({
            message: "M?? gi???m gi?? kh??ng h???p l???, vui l??ng nh???p l???i ho???c b??? qua",
          });
        }
      }
      }
     );
  };

  useEffect(() => {
    if (userId) getCarts(userId);
    getAllOptions();
  }, [userId]);

  return (
    <div className="container mt-5">
      <Row>
        <Col sm={12}>
          <Steps current={step}>
            <Step title="Gi??? h??ng" />
            <Step title="??i???n th??ng tin" />
            <Step title="?????t h??ng th??nh c??ng" />
          </Steps>
        </Col>
      </Row>
      <Table
        className="mt-4"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      {data.length > 0 && (
        <>
          <div className="mt-3">
            <Search
              placeholder="M?? gi???m gi??"
              onSearch={onSearch}
              style={{ width: 200 }}
              enterButton="??p d???ng"
              disabled={disabledCoupon}
            />
          </div>
          <h4 className="ms-auto mt-3">T???ng ti???n: {formatPrice(totalPrice)}</h4>
          <Button
            type="primary"
            disabled={selectedRowKeys.length === 0}
            size="large"
            onClick={() => {
              setOpenOrder(true);
              setStep(1);
            }}
          >
            ?????t h??ng
          </Button>
        </>
      )}
      <Drawer
        title="Th??ng tin d???t h??ng"
        placement="right"
        onClose={onClose}
        open={openFormOrder}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p h??? v?? t??n!",
              },
            ]}
          >
            <Input placeholder="H??? v?? T??n" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ?????a ch???!",
              },
            ]}
          >
            <Input placeholder="?????a ch???" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p s??? ??i???n tho???i",
              },
            ]}
          >
            <Input type="number" placeholder="S??? ??i???n tho???i" />
          </Form.Item>
          <Form.Item name="email">
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="M?? t???" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              X??c nh???n
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
