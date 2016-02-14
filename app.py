from flask import Flask, url_for, render_template, request
import base64
import cv2

app = Flask(__name__)
punch_cascade = cv2.CascadeClassifier("static/punchable_classifier.xml")


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/punch", methods=["POST"])
def punch():
    if request.method == "POST":
        img_64 = request.args["image"]
        image_raw = base64.b64decode(img_64)
        image = cv2.imread(image_raw)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.6,
                minNeighbors=5,
                minSize=(30, 30),
        )
        for x, y, w, h in faces:
            cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 255), 2)
        if len(faces) == 0:
            return False
        else:
            return True


if __name__ == "__main__":
    app.debug = True
    app.run()
