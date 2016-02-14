from flask import Flask, url_for, render_template, request, jsonify
import base64
import numpy as np
import cv2

app = Flask(__name__)
punch_cascade = cv2.CascadeClassifier("static/punchable_classifier3.xml")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/punch", methods=["POST"])
def punch():
    if request.method == "POST":
        img_64 = request.form["image"]
        img_64 = img_64[22:]
        image_raw = base64.b64decode(img_64)
        nparr = np.fromstring(image_raw, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = punch_cascade.detectMultiScale(
                gray,
                scaleFactor=1.02,
                minSize=(30, 30),
        )
        for x, y, w, h in faces:
            cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 255), 2)
        if len(faces) == 0:
            return jsonify(**{"punchability": "Your face is quite fine."})
        else:
            return jsonify(**{"punchability": "You should be punched. Right. Now."})


if __name__ == "__main__":
    app.debug = True
    app.run()
