## MERN_Stack_Coding_Challenge_Transaction_Dashboard
## NAME : GANESH VAMAN GHODKE
## COLLEGE NAME : PCET"S NMIET

## NOTE: I HAVE DEPLOYED BOTH FRONTEND AND BACKEND ON THE VERCEL

### Links
### if you see No transactions found then wait : The transactions table takes time to load
- **Frontend**: [https://transaction-dashboard-liard.vercel.app/](https://transaction-dashboard-liard.vercel.app/)
- **Backend**: [https://transaction-dashboard-api.vercel.app/](https://transaction-dashboard-api.vercel.app/)

## Overview

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a dashboard interface to manage and analyze product transactions.



## Frontend

The frontend application interacts with the backend APIs to fetch and display transaction data, statistics, and visualizations.

### Usage

To use the frontend application:

1. Ensure the backend API is deployed and accessible.
2. Clone the frontend repository to your local machine.
3. Install dependencies using your preferred package manager:
   ```sh
   npm install
   # or
   yarn install

### Features

#### Transactions Table

- **Select Month Dropdown**
  - Displays months from January to December as selectable options.
  - Defaults to March.
  - Enables selection of different months to view transactions.

- **Transactions List**
  - Utilizes backend APIs to list transactions in a tabular format.
  - Filters transactions based on title, description, or price using the search box.
  - Clears the search to revert to the original list for the selected month.
  - Pagination controls (Next/Previous) for navigating through transaction pages.

#### Transactions Statistics

- Displays:
  - Total sale amount,
  - Total sold items,
  - Total unsold items for the selected month.
- Retrieves data from the backend API to populate the statistics section.

#### Transactions Bar Chart

- Visualizes a bar chart showing:
  - Price range,
  - Number of items within each price range for the selected month.
- Fetches data based on the selected month from the dropdown above the table.
