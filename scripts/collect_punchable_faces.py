import praw
import re
import imgurpython as imgur

urls = ['punchable', 'awfullypunchablefaces','punchablefaces']

r = praw.Reddit(user_agent='punchable_faces_hackbu2016')

with open("imgur_secrets.txt", "r") as secrets:
    li = secrets.readline().strip()
    CLIENT_ID = li[li.find("=")+1:]
    li = secrets.readline().strip()
    CLIENT_SECRET = li[li.find("=")+1:]

client = imgur.ImgurClient(CLIENT_ID, CLIENT_SECRET)

with open("punchablefaces.txt", "w+") as f:
    for subreddit in urls:
        submissions = r.get_subreddit(subreddit).get_hot(limit=420)
        valid_images = []
        for submission in submissions:
            if not submission.is_self:
                is_imgur = re.match(r"https?://(m|i\.)?imgur\.com/", submission.url)
                if is_imgur is not None:
                    # album
                    match = re.match(r"https?://i\.imgur\.com", submission.url)
                    if match:
                        valid_images.append(submission.url)
                        continue
                    match = re.match(r"https?://(m\.)?imgur\.com/a/(\w+)", submission.url)
                    if match:
                        try:
                            valid_images.extend([x.link for x in client.get_album_images(match.group(2))])
                        except imgur.helpers.error.ImgurClientError:
                            print("404 Not found: {}".format(submission.url))
                        continue
                    match = re.match(r"https?://(m\.)?imgur\.com/(\w+)$", submission.url)
                    if match:
                        try:
                            valid_images.append(client.get_image(match.group(2)).link)
                        except imgur.helpers.error.ImgurClientError:
                            print("404 Not found: {}".format(submission.url))
        f.write("\n".join(valid_images))
