# TransportVic2 Architecture

TransportVic2 is a comprehensive public transport tracking and journey planning web application built for Victoria, Australia. It aggregates static scheduled GTFS data with real-time API feeds to provide accurate departure boards and journey planning.

## High-Level Overview

The system is built on a **Node.js** architecture using **Express.js** for the web server and **MongoDB** as the primary data store. The user interface is server-side rendered using **Pug** templates, with vanilla JavaScript and CSS on the client side.

### Core Data Flow
1. **Static Data Ingestion:** Bash and Node.js scripts download and parse massive static GTFS drops from Public Transport Victoria (PTV) and V/Line. This data is cleaned, mapped (e.g., merging stops), and loaded into MongoDB.
2. **Real-Time Data Fetching:** When a user requests a departure board or a route, the backend queries the PTV API or specific operator endpoints (like TramTracker or Smartrak) for live updates, cross-referencing this against the static GTFS data in MongoDB.
3. **Application Rendering:** The Express server processes the merged data and renders a Pug template, sending HTML to the client to display the information.

## Directory Structure

The repository is modularized to separate concerns:

- `application/`: Contains the core web server logic.
  - `routes/`: Express route definitions connecting URLs to controllers.
  - `static/`: Client-side assets (CSS, JS, images, fonts).
  - `views/`: Pug templates used for server-side rendering the HTML.
- `cronjobs/`: Background tasks that periodically fetch and update data (e.g., fetching disruption data or updating real-time caches).
- `database/`: Scripts and models for connecting to and interacting with the MongoDB instance.
- `load-gtfs/`: Massive suite of scripts used to download, parse, and ingest GTFS timetable data into MongoDB. This includes specific loaders for Metro Trains, V/Line, Trams, and Buses.
- `modules/`: The core business logic and integrations of the app.
  - Contains sub-modules for each transport mode (`bus`, `tram`, `metro-trains`, `vline`, `regional-coach`).
  - Contains integrations with external APIs (`trackers`, `discord-integration.mjs`).
  - Contains the underlying logic for journey planning.
- `server/`: Initialization files for the HTTP/HTTPS Express server.
- `test/`: Mocha test suite for testing utility functions and core logic.

## Key Concepts

### Stop Merging
Because GTFS data often represents physical sites as multiple separate "stops" (e.g., different bus bays at an interchange), TransportVic2 implements a complex stop merging algorithm to group these together logically, making interchanges easier to navigate for users.

### Real-Time Overlays
The application excels at overlaying real-time, undocumented changes on top of the static timetable. For example, it attempts to match raw V/Line Network Status Portal (NSP) run IDs with scheduled trains, mapping real-time alterations even when they aren't fully present in the GTFS feeds. This logic heavily resides within the `modules/` directory.

### Offline Mode
The application is designed to function with limited capabilities even if the PTV API is down or the server loses internet access, falling back entirely on the static TT data stored in MongoDB.
