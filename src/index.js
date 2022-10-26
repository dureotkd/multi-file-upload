import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

const StoreContext = React.createContext("");

const initState = {
  inputs: {
    name: "",
    email: "",
  },
  users: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
}

const Test2 = React.memo(() => {
  let file = React.useRef({
    file: [],
  });

  const [a, setA] = React.useState("");

  const handleChange = (e) => {
    file.current.file.push(e.target.files[0]);
  };

  const submitFile = async () => {
    const form = new FormData();

    for (let a in file.current.file) {
      form.append("file", file.current.file[a]);
    }

    form.append("zzz", "zzzzzzz");

    axios.post("http://localhost:4000/photo", form, {
      "Content-Type": "multipart/form-data",
    });
  };

  return (
    <div>
      <input id="test" type="file" onChange={handleChange} />
      <input id="test" type="file" onChange={handleChange} />
      <button type="button" onClick={submitFile}>
        전송
      </button>
      <button
        type="button"
        onClick={async () => {
          window.location.href =
            "http://localhost:4000/photo?fileName=file_1666765529951.png";

          // await axios
          //   .get("http://localhost:4000/photo", {
          //     params: {
          //       fileName: "file_1666765529951.png",
          //     },
          //     responseType :
          //   })
          //   .then((res) => {
          //     alert("z");
          //   });
        }}
      >
        다운로드
      </button>
    </div>
  );
});

function Apps() {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const value = React.useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <StoreContext.Provider value={value}>
      <Test2 />
    </StoreContext.Provider>
  );
}

root.render(<Apps />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
