import cv2
import sys
import os

positives = sys.argv[1]
cascade = sys.argv[2]

face_cascade = cv2.CascadeClassifier(cascade)

# FIXME
for trainer in os.listdir(positives):
    to_train = os.path.join(positives, trainer)
    image = cv2.imread(to_train)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minSize=(30, 30),
    )

    if len(faces) == 0:
        continue
    print(to_train, len(faces), end=" ")
    for x, y, w, h in faces:
        print(x, y, w, h, end=" ")
    print()
