import praw
import re

urls = ['rateme']

f = open("neutralfaces.txt", "a")
r = praw.Reddit(user_agent='punchable_faces_hackbu2016')

for subreddit in urls:
    submissions = r.get_subreddit(subreddit).get_hot(limit=1000)
    for submission in submissions:
        if not submission.is_self:
            is_imgur = re.search("(imgur\.com)", submission.url)
            if is_imgur is not None:
                print(submission.url, file=f)

f.close()
