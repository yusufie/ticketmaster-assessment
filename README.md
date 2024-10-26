## Ticketmaster Event Search App Documentation

This documentation provides an overview of the Ticketmaster Event Search App, a web application built using Next.js that allows users to search for events from the Ticketmaster API. It outlines the key components and features of the app.

### Inputs

*   **Search Keyword:** Users can input a keyword in the search bar to find events related to a specific topic or performer.
*   **Sort Options:** The app provides a dropdown menu with various options for sorting the search results, such as relevance, date, name, and venue.
*   **Pagination:** Users can navigate through multiple pages of search results using the pagination component.

### Outputs

*   **Event Listing:** The app displays a table of events that match the user's search criteria, including event name, image, price range, segment, date, and actions (view details, buy tickets).
*   **Event Details:** When a user clicks on an event, a detailed view is presented with information such as event name, images, date, venue location, featured attractions, price ranges, ticket limits, additional info, and a link to buy tickets.
*   **Loading State:** While data is being fetched from the API, a skeleton loading effect is shown to provide visual feedback to the user.
*   **Error Handling:** In case of an error during data fetching, an error message is displayed to the user.

### Core Components

*   **SearchBar:** This component allows users to input their search keywords.
*   **SortBar:** This component allows users to select a sorting option for the search results.
*   **EventTable:** This component displays the list of events retrieved from the Ticketmaster API.
*   **Pagination:** This component enables navigation between different pages of search results.
*   **EventDetails:** This component presents the detailed information of a selected event.
*   **TableSkeleton:** This component displays a skeleton loading effect while data is being fetched.
*   **Accessibility, BestImages, CalenderDate, Card, Featuring, InfoEvent, PinMap, PleaseNote, PriceRanges, TicketBuy, TicketLimit:** These components are used to display specific pieces of information in the event details view.

### State Management and Data Fetching

*   **Zustand:** The app utilizes Zustand for state management, keeping track of user interactions such as search keywords, sort options, and current page.
*   **React Query:** This library is used for fetching and caching data from the Ticketmaster API, improving performance and user experience.

### Additional Features

*   **Responsive Design:** The app is designed to be responsive and adapt to different screen sizes, providing a good user experience on desktop, tablet, and mobile devices.
*   **User-Friendly URL:** The app's URL reflects the current search query, sort options, and page number, allowing users to bookmark or share specific search results.

### API Integration

The app integrates with the Ticketmaster Discovery API v2 using an API key for authentication. It performs API calls to fetch events based on the user's input and selected filters.

### Technology Stack

The app is built with:

*   **Next.js:** A React framework for building server-side rendered and statically generated web applications.
*   **TypeScript:** A superset of JavaScript that adds static typing for better code quality and maintainability.
*   **React:** A JavaScript library for building user interfaces.
*   **Zustand:** A state management library for React.
*   **Tailwind CSS:** A utility-first CSS framework for styling.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **React Query:** A library for fetching, caching, and managing data in React applications.
*   **Jest & Testing Library:** Tools for writing unit and integration tests.
