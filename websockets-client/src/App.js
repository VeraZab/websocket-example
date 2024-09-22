import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  // in the real app we wouldn't start with an empty array state
  // we'd prepopulate our table with an initial api call and then the
  // table would be updated with each new trade via websocket
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTrades((prevTrades) => [data, ...prevTrades].slice(0, 100));
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h2>React + WebSocket Example</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Ticker Symbol</th>
            <th>Action</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            // this unique trade.id key that we are adding on each row
            // makes it so that React can efficiently compute diffs
            // from render to render and only redraw the DOM elements
            // that changed
            <tr key={trade.id}>
              <td>{new Date(trade.date).toLocaleString()}</td>
              <td>{trade.tickerSymbol}</td>
              <td>{trade.action}</td>
              <td>{trade.amount}</td>
              <td>
                {trade.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>
                {trade.total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
