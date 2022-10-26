import React from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

const Test = React.memo(() => {
  console.log("Hello Test Component..");
  return <div>Test</div>;
});

function App() {
  const [products, setProducts] = React.useState([
    {
      name: "Nike CruzrOne",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/cruzrone-unisex-shoe-T2rRwS-removebg-preview.png",
      descrition:
        "Designed for steady, easy-paced movement, the Nike CruzrOne keeps you going. Its rocker-shaped sole and plush, lightweight cushioning let you move naturally and comfortably. The padded collar is lined with soft wool, adding luxury to every step, while mesh details let your foot breathe. There’s no finish line—there’s only you, one step after the next.",
      price: "20000",
    },
    {
      name: "Nike Epic React Flyknit 2",
      image:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/epic-react-flyknit-2-mens-running-shoe-2S0Cn1-removebg-preview.png",
      descrition:
        "Designed for steady, easy-paced movement, the Nike CruzrOne keeps you going. Its rocker-shaped sole and plush, lightweight cushioning let you move naturally and comfortably. The padded collar is lined with soft wool, adding luxury to every step, while mesh details let your foot breathe. There’s no finish line—there’s only you, one step after the next.",
      price: "20000",
    },
  ]);

  const [myCart, setMyCart] = React.useState([]);
  const [showModal, setShowModal] = React.useState({
    show: false,
    image: null,
  });

  React.useEffect(() => {
    const handleModal = (event) => {
      if (event.target.classList.contains("modal-bg")) {
        setShowModal(false);
      }
    };

    window.addEventListener("click", handleModal);

    return () => {
      window.removeEventListener("click", handleModal);
    };
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="screen -left">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png"
            className="logo"
            alt="로고"
          />
          <div className="title">Picked items</div>
          <div className="shop-items">
            {products &&
              products.map((item, index) => {
                return (
                  <div key={`products-${index}`}>
                    <div className="item">
                      <div className="item-block">
                        <div className="image-area">
                          <img
                            onClick={() => {
                              const cloneShowModal = { ...showModal };
                              cloneShowModal.image = item.image;
                              cloneShowModal.show = true;
                              setShowModal(cloneShowModal);
                            }}
                            src={item.image}
                            alt="상품이미지"
                            className="image"
                          />
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="description">{item.descrition}</div>
                        <div
                          className="bottom-area"
                          onClick={async () => {
                            const cloneMyCart = [...myCart];

                            const 이미갖고있는상품 = cloneMyCart.find(
                              (_item) => {
                                return _item.name === item.name;
                              }
                            );

                            if (이미갖고있는상품) {
                              return;
                            }

                            await axios({
                              url: "http://localhost:4000/add/products",
                              params: item,
                            })
                              .then((res) => {})
                              .catch((e) => {
                                console.log(e);
                              });

                            cloneMyCart.push(item);
                            setMyCart(cloneMyCart);
                          }}
                        >
                          <div className="price">{item.price}</div>
                          <div className="button">
                            <p>ADD TO CART</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="screen -right">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/pngwave.png"
            className="logo"
            alt="로고"
          />
          <div className="title">Your Cart</div>
          <div className="shop-items">
            {myCart ? (
              myCart.map((item, index) => {
                return (
                  <div key={`products-${index}`}>
                    <div className="item">
                      <div className="item-block">
                        <div className="image-area">
                          <img
                            onClick={() => {
                              const cloneShowModal = { ...showModal };
                              cloneShowModal.image = item.image;
                              cloneShowModal.show = true;
                              setShowModal(cloneShowModal);
                            }}
                            src={item.image}
                            alt="상품이미지"
                            className="image"
                          />
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="description">{item.descrition}</div>
                        <div className="bottom-area">
                          <div className="price">{item.price}</div>
                          <div
                            className="button"
                            style={{ backgroundColor: "red", color: "#fff" }}
                          >
                            <p>REMOVE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 300,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Your Cart is Empty
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal.show && (
        <React.Fragment>
          <div className="modal-bg" />
          <div className="modal">
            <img src={showModal.image} alt="확대사진" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
