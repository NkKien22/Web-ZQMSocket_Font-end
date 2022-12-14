import { Row, Col, Card, Button, Spin, Tag, Select, Tabs, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

export const ProductList = (props) => {
  const { dataSearch } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataSell, setDataSell] = useState([]);
  const [dataSell1, setDataSell1] = useState([]);

  const getAllProduct = (page, pageSize) => {
    setLoading(true);
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(" ")[0]));
      })
      .finally(() => setLoading(false));
  };

  const getProductByCategory = (page, pageSize, tacagoryName) => {
    setLoading(true);
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}&keyworks=${tacagoryName}`
      )
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(" ")[0]));
      })
      .finally(() => setLoading(false));
  };

  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 12);
  };
  // https://localhost:7018/api/Product/get-category

  const getAllCategory = () => {
    axios.get(`${URL_API}/Product/get-category`).then((res) => {
      setDataCategory(res.data.item);
    });
  };

  useEffect(() => {
    getAllProduct(1, 12);
    getAllCategory();
    getTopProductSell();
    getTopProductSell1();
    //getAllproductDiscount();
  }, []);

  const onFilterByCategory = (tacagoryName) => {
    getProductByCategory(1, 12, tacagoryName);
  };

  const handleChange = (value) => {
    let startPrice = 0;
    let endPrice = 0;
    if (value === 1) {
      startPrice = 0;
      endPrice = 999000;
    }
    if (value === 2) {
      startPrice = 1000000;
      endPrice = 3000000;
    }
    if (value === 3) {
      startPrice = 3000001;
      endPrice = 5000000;
    }
    if (value === 4) {
      startPrice = 5000001;
      endPrice = 10000000;
    }
    if (value === 5) {
      startPrice = 10000001;
      endPrice = 100000000;
    }
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=1&pageSize=12&startPrice=${startPrice}&endPrice=${endPrice}`
      )
      .then((res) => {
        setData(res.data.item);
      });
  };

  const getTopProductSell = () => {
    const start = "2020-12-02 10:10:10";
    const end = "2023-12-02 10:10:10";
    axios
      .get(`${URL_API}/Order/best-selling-product?Start=${start}&End=${end}`)
      .then((res) => {
        setDataSell(res.data.item);
      });
  };

  // const getAllproductDiscount = () => {
  //   axios.post(`${URL_API}/Discount/add-ProductDiscount`).then((res) => {
  //     console.log(res)
  //   });
  // };

  const getTopProductSell1 = () => {
    const start = "2020-12-02 10:10:10";
    const end = "2023-12-02 10:10:10";
    axios
      .get(`${URL_API}/Order/customer-buy-the-most?Start=${start}&End=${end}`)
      .then((res) => {
        setDataSell1(res.data.item);
      });
  };

  const columns = [
    {
      title: "Th??? t???",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "???nh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          alt="example"
          src="https://cf.shopee.vn/file/2c4d98eeff0be7f6eaeb25f919e13c44"
          style={{ height: 50, width: 50 }}
        />
      ),
    },
    {
      title: "T??n s???n ph???m",
      dataIndex: "productName",
      key: "productName",
    },
    ,
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const columns1 = [
    {
      title: "Th??? t???",
      dataIndex: "index",
      key: "index",
      render: (_, record) => console.log(record),
    },
    {
      title: "Anh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          alt="example"
          src="https://cf.shopee.vn/file/2c4d98eeff0be7f6eaeb25f919e13c44"
          style={{ height: 50, width: 50 }}
        />
      ),
    },
    {
      title: "T??n kh??ch h??ng",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ti???n",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div className="container mt-5">
      <Tabs centered>
        <Tabs.TabPane tab="S???n ph???m b??n ch???y nh???t" key="item-1">
          <Table
            className="mt-4"
            columns={columns}
            dataSource={dataSell}
            scroll={{ y: 200 }}
            pagination={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Top kh??ch h??ng mua h??ng nhi???u nh???t" key="item-2">
          <Table
            className="mt-4"
            columns={columns1}
            dataSource={dataSell1}
            scroll={{ y: 200 }}
            pagination={false}
          />
        </Tabs.TabPane>
      </Tabs>
      <Row className="mt-5">
        <Col style={{ fontWeight: "bold" }}>??I???N THO???I N???I B???T NH???T</Col>
        <Col className="ms-auto">
          {dataCategory.map((x) => (
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => onFilterByCategory(x.tacagoryName)}
            >
              {x.tacagoryName}
            </Button>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          L???c theo gi??:
          <Select
            style={{ width: 200, marginLeft: 5 }}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: "D?????i 1 tri???u",
              },
              {
                value: 2,
                label: "T??? 1 ?????n 3 tri???u",
              },
              {
                value: 3,
                label: "T??? 3 ?????n 5 tri???u",
              },
              {
                value: 4,
                label: "T??? 5 ?????n 10 tri???u",
              },
              {
                value: 5,
                label: "Tr??n 10 tri???u",
              },
            ]}
          />
        </Col>
      </Row>
      <Row className="mt-5" justify="space-evenly" xs={1} sm={6} md={6} lg={6}>
        {loading ? (
          <Spin className="text-center" />
        ) : (
          <>
            {((dataSearch.length > 0 && dataSearch) || data).map((x) => {
              return (
                <Col>
                  <Link to={`/product/${x.productID}`}>
                    <Card
                      hoverable
                      style={{ width: 250 }}
                      cover={
                        <img
                          alt="example"
                          src="https://cf.shopee.vn/file/2c4d98eeff0be7f6eaeb25f919e13c44"
                          style={{ height: 200 }}
                        />
                      }
                    >
                      <div className="text-center fw-bold">
                        {x.productName}{" "}
                        <Tag color="#108ee9">SL : {x.quantity}</Tag>
                      </div>
                      <div className="d-flex">
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {formatPrice(x.price)}
                        </span>
                        <span
                          style={{ color: "red", fontWeight: "bold" }}
                          className="text-decoration-line-through ms-5"
                        >
                          {formatPrice(x.fakePrice)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </>
        )}
      </Row>

      <div className="w-100 ms-auto mt-5">
        {(dataSearch?.length > 0 || data.length > 0) && (
          <Pagination
            current={currentPage}
            onChange={onChangePage}
            total={total}
            pageSize={12}
            style={{ float: "right" }}
          />
        )}
      </div>
    </div>
  );
};
