
# vanilla python stuff
# 1. idk
import argparse
import os
from sys import exit

# 2. stuff used in the markdown parser
import re
import datetime

# 3. stuff used in the html stuff
from pathlib import Path

# markdown
import markdown
from markdown.extensions import Extension
from markdown.preprocessors import Preprocessor

# the html library
from bs4 import BeautifulSoup, Comment
from bs4.formatter import HTMLFormatter

class processBlogStuff(Preprocessor):
    def run(self, lines): # pretty much just the example modified :P
        new_lines = []

        # probably not the best code buuuut, it wooooorks :D
        title_re = re.compile(r"(\[BlogTitle\] )(.*)")
        date_re = re.compile(r"(\[BlogDateTime\] )(.*)")
        for line in lines:
            title = title_re.search(line)
            date = date_re.search(line)
            

            if title and not self.md.title:
                self.md.title = title[2]
                continue

            if date and not self.md.datetime:
                self.md.datetime = datetime.datetime.strptime(date[2], "%d/%m/%Y %H:%M")
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

def getMarkdown(path: str|None):
    if path is None:
        return

    files = []
    path_obj = Path(path)
    for entry in path_obj.iterdir():
        if entry.is_dir():
            files += getMarkdown(entry)
        elif entry.suffix == ".md":
            print("Found entry: " + entry.name)
            files.append(entry)
    return files

def mdToHTML(files: list[Path], template: Path):
    with open(template, "r", encoding="utf-8") as input_file:
        template_str = input_file.read()
    
    # py_location = Path(__file__)
    md = markdown.Markdown(extensions=[blogExtension()], output_format="html")

    html_files = []
    formatter = HTMLFormatter(indent=4)
    for file in files:
        template_parser = BeautifulSoup(template_str, "html.parser")

        with open(file, "r", encoding="utf-8") as input_file:
            text = input_file.read()
        html = BeautifulSoup(md.reset().convert(text), "html.parser")
        if template_parser.title:
            template_parser.title.string = md.title
        
        found_comment = False
        for comment in template_parser.find_all(string=lambda text: isinstance(text, Comment)):
            if comment.strip() == "insert markdown":
                found_comment = True
                comment.replace_with(html)
                break

        if not found_comment:
            break

        html_files.append({
            "filename": Path(file.stem + ".html"),
            "html": template_parser.prettify(formatter=formatter) # not the most ideal (for me), but it's better than no indentation at all!
        })
        print("Parsed entry: " + file.name)

    return html_files

def main():
    parser = argparse.ArgumentParser(
        prog="pac's blog build utlity",
        description="builds the blog pages from markdown",
        epilog="completely unnecessary, as i know there's tools that do this already"
    )
    parser.add_argument("input_directory", help="the folder it'll read the markdown files from")
    parser.add_argument("output_directory", help="the folder where the blog entries will be in")
    parser.add_argument("template_entry", help="the html file used as a template for the blog entries")

    args = parser.parse_args()
    files = getMarkdown(args.input_directory)
    template = Path(args.template_entry)
    output = Path(args.output_directory)

    if files is None \
    or template.suffix != ".html": # yes, this isn't the best way to do html detection, i'd say
        return "one of the arguments is invalid"

    html_files = mdToHTML(files, template)

    if len(html_files) <= 0:
        return "no HTML files were made"

    os.makedirs(output, exist_ok = True)
    for file in html_files:
        path = str(output.joinpath(file["filename"]))
        with open(path, "w", encoding="utf-8") as output_file:
            output_file.write(file["html"])
        print("Entry written to '" + path + "'!")

if __name__ == '__main__':
    exit(main())