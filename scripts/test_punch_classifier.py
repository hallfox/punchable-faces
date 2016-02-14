import cv2
import sys

data = sys.argv[1]
cascade = sys.argv[2]

face_cascade = cv2.CascadeClassifier(cascade)

image = cv2.imread(data)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.01,
        minSize=(50, 50),
        )

for x, y, w, h in faces:
    cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 255), 2)

cv2.imshow("This fellow is quite punchable!", image)
cv2.waitKey(0)
