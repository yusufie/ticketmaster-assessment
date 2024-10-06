# Events Ticketmaster Web Application

This is a web application that allows users to search for events using the Ticketmaster API. It includes functionality for listing events, viewing event details, and searching for events. The application is built with Next.js, TypeScript, Tailwind CSS, React, Zustand for state management, Axios, and React Query for data fetching and caching. The application also includes a skeleton loading effect to improve the user experience while loading data.

The application is deployed on Netlify and can be accessed at [https://assessment-ticketmaster.netlify.app/](https://assessment-ticketmaster.netlify.app/).

![Overview](/src/lib/assets/images/home.png)
![Overview](/src/lib/assets/images/detail.png)
![Overview](/src/lib/assets/images/skeleton.png)


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)


## Installation

To install and run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yusufie/ticketmaster-assessment.git`
2. Navigate to the project directory: `cd ticketmaster-assessment`
3. Install the project dependencies: `npm install`
4. Start the server: `npm run dev`
5. The application should now be running on `http://localhost:3000`.
6. Open your web browser and go to `http://localhost:3000` to view the application.


## Usage

Once the application is running, you can interact with it as follows:

1. On the homepage, you can see a list of events.
2. To search for events, enter a keyword in the search bar and click the "Search" button.
3. To view more details about an event, click on the lens icon next to the event.
4. On the event detail page, you can see more information about the event, including the name, date, time, venue, and ticket information.
5. To go back to the homepage, click the "Back" button.
6. To navigate between pages of events, use the pagination controls at the bottom of the page.
7. To view the next page of events, click the "Next" button. To view the previous page, click the "Previous" button.
8. To sort events by ascending or descending order, click the "Sort" button and select the desired option.
9. The search, sort, and pagination values are displayed in the URL query parameters, so you can bookmark or share the URL to return to the same state.
10. The application includes a skeleton loading effect to improve the user experience while loading data.
11. The application is responsive and can be used on mobile, tablet, and desktop devices.


## Technologies

- **Next.js**: React framework for building server-side rendered and statically generated web applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: For type safety and better code quality.
- **React Query**: To handle data fetching and caching.
- **Axios**: For making HTTP requests to the Ticketmaster API.
- **Zustand**: For lightweight state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Jest & Testing Library**: For unit and integration testing.
- **ESLint & Prettier**: For code linting and formatting.


## Features

The application includes the following features:

- **Event Search**: Search for events by keyword using the search bar.
- **Pagination**: Navigate between pages of events using the pagination controls.
- **Sorting**: Sort events by ascending or descending order based on date, name, venue, or relevance.
- **User-Friendly URL**: The search, sort, and pagination values are displayed in the URL query parameters.
- **Event Details**: View detailed information about events including images, date, venue location, and ticket information.
- **User State Management**: Zustand is used to manage the global state.
- **Data Fetching**: Uses React Query to fetch events data from the Ticketmaster API.
- **Responsive Design**: The application is fully responsive and works across a variety of devices.
- **Skeleton Loading**: Shows loading skeletons while data is being fetched.
- **Error Handling**: Graceful error handling in case of failed API requests.
- **Testing**: Includes unit and integration tests using Jest and Testing Library.


## API Integration

The application integrates with the Ticketmaster API to fetch event data. The main API request is made to:

- **API URL**: `https://app.ticketmaster.com/discovery/v2/events.json`
- **API Key**: The application uses the provided Ticketmaster API key to authenticate requests.

The API call can be customized using parameters such as:

- `keyword`: Search events by keyword.
- `page`: Pagination for event lists.
- `sort`: Sorting options for event results.
- `size`: Number of events per page.


## Contributing

Contributions to this project are welcome! If you find any issues or have ideas for improvements, please open an issue or submit a pull request. Here’s how you can contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.


## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
