# Vehicle Detection and Counting

A web application built with Next.js for the frontend and Flask for the backend, enabling users to upload images for vehicle detection and counting.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Vehicle Detection**: Upload an image and detect vehicles using YOLO (You Only Look Once) object detection algorithm.
- **Vehicle Counting**: Count the number of cars, trucks, buses, and motorcycles detected in the image.
- **Visual Results**: View the original and processed images with vehicle counts displayed.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python and pip installed on your machine for the backend.
- Docker installed on your machine for containerization.

## Usage

### Navigate to the project directory:

```
cd vehicle-detection
```
1.  Navigate to the project directory:

    
```
    cd vehicle-detection
```

2.  Install frontend dependencies:

    
```
    cd frontend
    npm install
```

3.  Install backend dependencies:

```
    cd ../backend
    pip install -r requirements.txt
```

Usage
-----

1.  Start the backend Flask server:

```
    cd ../backend
    python app.py
```
    The server will start running at `http://localhost:8080`.

2.  Start the frontend Next.js server:

```
    cd ../frontend
    npm run dev
```
    The frontend server will start running at `http://localhost:3000`.

3.  Open your web browser and go to `http://localhost:3000` to access the application.

4.  Upload an image and click "Detect Vehicles" to initiate the vehicle detection process.

Docker
------

You can also run the application using Docker. Follow these steps:

1.  Build the Docker image:

```
    docker-compose build
```
2.  Start the Docker containers:

```
    docker-compose up
```
    The frontend will be accessible at `http://localhost:3000` and the backend at `http://localhost:8080`.

Contributing
------------

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or suggestions.

To contribute to this project, follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add new feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Create a new Pull Request.

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
