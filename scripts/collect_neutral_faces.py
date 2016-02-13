import praw
import re

urls = ['rateme']

r = praw.Reddit(user_agent='punchable_faces_hackbu2016')

with open("neutralfaces.txt", "a") as f:
    for subreddit in urls:
        submissions = r.get_subreddit(subreddit).get_hot(limit=1000)
    for submission in submissions:
        if not submission.is_self:
            is_imgur = re.search(r"(imgur\.com)", submission.url)
            if is_imgur is not None:
                f.write(submission.url)
