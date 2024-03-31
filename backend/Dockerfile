# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Install OpenGL libraries
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Create a virtual environment and activate it
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port Flask will run on
EXPOSE 8080

# Run the Flask app
CMD ["python", "app5.py"]
