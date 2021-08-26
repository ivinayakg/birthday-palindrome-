import "./styles.css";
import { useState } from "react";
import Footer from "./Footer";
import Palindrome from "./palindrome";

export default function App() {
  const [messg, setMessg] = useState("");
  const [date, setDate] = useState(0);

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const onclickHandler = () => {
    setMessg(Palindrome(date));
  };

  return (
    <div className="App">
      <div className="section">
        <div className="contain">
          <h1>Is Your Birthday Lucky?</h1>
          <div className="inputs">
            <label>
              Birthday Date:
              <input id="date" type="date" onChange={dateHandler} />
            </label>
            <button className="btn" onClick={onclickHandler}>
              Check Birthday Is Palindrome
            </button>
          </div>
          <h3>{messg}</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
}
