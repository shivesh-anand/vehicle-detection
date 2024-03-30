# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Create a virtual environment and activate it
RUN python3 -m venv .venv

# Install dependencies
RUN .venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port Flask will run on
EXPOSE 8080

# Run the Flask app
CMD [".venv/bin/python", "app5.py"]
