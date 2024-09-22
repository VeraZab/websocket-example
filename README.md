# Example setting up Websockets + React + HTML Table

This is a simple example that spins up a dummy server. Upon a client connection, the server begins generating a dummy stock trade transaction every second and sends it to the client app via WebSocket. The front-end app displays this trade in an HTML table using React.
<br/>
<br/>
For quickly setting up the front-end React app, [Create React App](https://create-react-app.dev/) boilerplate template was used.

## To view

Prerequisites: Node

1. Start the server by `cd`-ing into the `websockets-server` directory, running `npm install`, and then `node index.js`. Main code for the backend is in the `index.js` file.

2. Start the client by `cd`-ing into the `websockets-client` directory, running `npm install` and then `npm run start`. Main code for the front-end is in the `src/App.js` file.

Within a second you should see the front-end app getting populated, each second, with a new dummy trade generated on the backend via WebSocket.

## Some thoughts on Websockets and GraphQL

- Setting up this basic example was very quick, so if the websocket endpoint already exists, displaying a table for it on the front-end doesn't take more than a couple of hours.

- React is very efficient at re-rendering only the changed parts of the table, because it uses the unique key that is present of every row of the table to determine whether from render to render anything has changed, so each second only the new row in our table gets redrawn on the DOM not the full table. I think that framework is ideal for displaying dynamic data.

- One thing that's different here is that in the websocket we're only sending over the new transactions, not any of the old ones. It's more efficient on the network to send less data, but then this would mean that for things like sorting, the front-end would have to handle that. This could be a pretty expensive operation on large arrays (100k+). Sorting is more efficient on the backend, but sending the full table of sorted rows on each backend update every time, can also be pretty resource intensive on both BE and FE. This makes me wondering about how many rows of data the full table is, and if that's too many to be sent over via websocket in real time each time. Would batching transactions and only refreshing every given amount of time would be ok, or real-time is a must have. Paginating or Virtualizing (only showing the rows that fit into viewport and dynamically loading more when needed) our tables would be key to improve performance here I believe too.

- It was really interesting to play around with websockets for a minute. The more I thought about it, the more it seemed appropriate to setup a polling mechanism that would check for updates every `x` milliseconds (or depending on what's appropriate). That way we could avoid overwhelming both FE and BE with requests and sorting. Pagination or Virtualization would also be key here. I also feel that if polling is used, then websockets and real time is less of a must. Then graphql would be a great alternative that would allow for a more standardized and future proof approach in dealing with how the UI evolves.
