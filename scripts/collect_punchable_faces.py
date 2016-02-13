import praw
import re

urls = ['punchable', 'awfullypunchablefaces','punchablefaces']

f = open("punchablefaces.txt", "a")
r = praw.Reddit(user_agent='punchable_faces_hackbu2016')

for subreddit in urls:
    submissions = r.get_subreddit(subreddit).get_hot(limit=100000000)
    for submission in submissions:
        if not submission.is_self:
            is_imgur = re.search("(imgur\.com)", submission.url)
            if is_imgur is not None:
                print(submission.url, file=f)

f.close()
