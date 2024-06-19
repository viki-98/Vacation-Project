# Vacation Project Frontend

This project is called **Vacation**. It resembles a travel agency platform with features such as user registration, login, and vacation listings. Each vacation card displays a name, description, price, and availability dates. Administrators have special privileges including editing, deleting, and adding new vacation cards. Users can like vacation cards, and administrators can view a chart showing the number of likes for each vacation. Additionally, there is a feature to download a CSV file from the site.

## Project Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   git clone https://github.com/viki-98/Vacation-Project

2. Navigate to the project directory:
   cd vacation-project-frontend

3. Install the dependencies:
   npm install or yarn install

### Available Scripts

In the project directory, you can run:

#### `npm run dev` or `yarn dev`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run lint` or `yarn lint`

Lints the codebase using ESLint, checking for any code quality issues and unused disable directives.

#### `npm run preview` or `yarn preview`

Previews the production build locally. Useful for testing the production build before deploying.

## Project Features

- **User Registration and Login**: Users can register and log into the platform.
- **Vacation Listings**: A page that displays vacation spots with details such as name, description, price, and availability.
- **User Interaction**: Users can like vacation cards.
- **Administrator Features**: Admins can edit, delete, and add new vacation cards.
- **Analytics**: Admins can view a chart showing the number of likes for each vacation.
- **CSV Download**: Users can download vacation data as a CSV file.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management.
- **React Router DOM**: For routing.
- **Axios**: For making HTTP requests.
- **Chart.js and React-Chartjs-2**: For data visualization.
- **React Hook Form**: For handling form state.
- **React Notifications Component**: For displaying notifications.
- **React Paginate**: For pagination.
- **Sass**: For styling.
- **Vite**: For fast build tooling.
- **ESLint**: For linting.

## Proxy Setup

The development server is proxied to `http://localhost:5000` to handle API requests.
