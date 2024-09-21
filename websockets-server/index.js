import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const actions = {
  BUY: "BUY",
  SELL: "SELL",
};

const generateTradingData = () => {
  const symbols = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT"];
  const possibleActions = [actions.BUY, actions.SELL];

  const tickerIndex = Math.floor(Math.random() * symbols.length);
  const tickerSymbol = symbols[tickerIndex];
  const price = Math.random() * 400 + 100;
  const amount = Math.floor(Math.random() * 11);
  const action = possibleActions[Math.floor(Math.random() * 2)];
  const total = (amount * price).toFixed(2);

  const data = {
    tickerSymbol,
    action,
    amount,
    price,
    total: action === actions.BUY ? -total : total,
  };

  return JSON.stringify(data);
};

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  const interval = setInterval(() => {
    const data = generateTradingData();
    ws.send(data);
  }, 1000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});
