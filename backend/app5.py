from flask import Flask, request, jsonify
from pathlib import Path
from ultralytics import YOLO
from flask_cors import CORS
import os

model_path = Path("yolov8n.pt")
image_folder = Path("images")

app = Flask(__name__)
CORS(app)

@app.route("/detect", methods=["POST"])
def detect_vehicles():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    image_file = request.files["image"]
    image_path = Path(f"{image_file.filename}")
    image_file.save(image_path)
    
    model = YOLO(model_path)
    results = model(image_path, save=True, classes=[2, 3, 5, 7])
    
    vehicles = ["car", "truck", "bus", "motorcycle"]
    vehicle_counts = {"car": 0, "truck": 0, "bus": 0, "motorcycle": 0}
    for r in results:
        for b in r.boxes.cls:
            x = int(b.item())
            name = r.names[x]
            if name in vehicles:
                vehicle_counts[name] += 1
    
    folder_path = 'runs/detect'
    subfolders = [f for f in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, f))]    
    latest_subfolder = max(subfolders, key=lambda x: os.path.getctime(os.path.join(folder_path, x)))    
    processed_image_path = folder_path + '/' + latest_subfolder + '/' + image_file.filename
    
    response_data = {
        "vehicle_counts": vehicle_counts,
        "image_path": processed_image_path
    }
    print(response_data)
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
