import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("username") ? true : false
  );

  const emptyExpenses = {
    transport: 0,
    makeup: 0,
    food: 0,
    medical: 0,
  };

  const [expenses, setExpenses] = useState(emptyExpenses);

  /* 🔁 تصفير المصروفات عند Reload */
  useEffect(() => {
    setExpenses(emptyExpenses);
  }, []);

  const handleLogin = () => {
    if (username.trim() !== "") {
      localStorage.setItem("username", username);
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
    setExpenses(emptyExpenses);
  };

  /* ❌ منع الأرقام السالبة */
  const handleChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setExpenses({
      ...expenses,
      [e.target.name]: value,
    });
  };

  const weeklyTotal =
    expenses.transport +
    expenses.makeup +
    expenses.food +
    expenses.medical;

  const monthlyTotal = weeklyTotal * 4;

  /* ---------- LOGIN PAGE ---------- */
  if (!loggedIn) {
    return (
      <div className="container login">
        <h1>💗 أهلاً بيچ</h1>
        <input
          type="text"
          placeholder="اسمچ"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>دخول</button>
      </div>
    );
  }

  /* ---------- MAIN APP ---------- */
  return (
    <div className="container">
      <div className="header">
        <span>👋 {username}</span>
        <button className="logout" onClick={handleLogout}>
          خروج
        </button>
      </div>

      <h1>💗 مصروفاتي</h1>

      <div className="card">
        <label>مصروف التنقل</label>
        <input
          type="number"
          min="0"
          name="transport"
          value={expenses.transport}
          onChange={handleChange}
        />
      </div>

      <div className="card">
        <label>مصروف المكياج</label>
        <input
          type="number"
          min="0"
          name="makeup"
          value={expenses.makeup}
          onChange={handleChange}
        />
      </div>

      <div className="card">
        <label>مصروف المشتريات الغذائية</label>
        <input
          type="number"
          min="0"
          name="food"
          value={expenses.food}
          onChange={handleChange}
        />
      </div>

      <div className="card">
        <label>مصروف العلاج</label>
        <input
          type="number"
          min="0"
          name="medical"
          value={expenses.medical}
          onChange={handleChange}
        />
      </div>

      <div className="result">
        <p>المصروف الأسبوعي</p>
        <h2>${weeklyTotal}</h2>

        <p>المصروف الشهري</p>
        <h3>${monthlyTotal}</h3>

        {weeklyTotal > 50 && (
          <div className="warning">
            ⚠️ المصروف ارتفع جداً، يجب الاقتصاد الأسبوع القادم
          </div>
        )}
      </div>
    </div>
  );
}
