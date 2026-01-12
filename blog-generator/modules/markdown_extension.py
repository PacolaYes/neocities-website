
import re
import datetime
from markdown.extensions import Extension
from markdown.preprocessors import Preprocessor

class processBlogStuff(Preprocessor):
    def run(self, lines): # pretty much just the example modified :P
        new_lines = []

        # probably not the best code buuuut, it wooooorks :D
        title_re = re.compile(r"(\[BlogTitle\] )(.*)")
        date_re = re.compile(r"(\[BlogDateTime\] )(.*)")
        for line in lines:
            title = title_re.search(line)
            date = date_re.search(line)
            
            continue_val = False

            if title and not self.md.title:
                self.md.title = title[2]
                continue_val = True

            if date and not self.md.datetime:
                self.md.datetime = datetime.datetime.strptime(date[2], "%d/%m/%Y %H:%M")
                continue_val = True

            if continue_val:
                continue

            new_lines.append(line)
        return new_lines

class blogExtension(Extension): # maybe i should just use the meta extension outright????? def would giv out more stuff 2 do
    def extendMarkdown(self, md):
        md.registerExtension(self)
        self.md = md
        md.preprocessors.register(processBlogStuff(md), 'blog-parse', 27)

    def reset(self) -> None:
        self.md.title = None
        self.md.datetime = None