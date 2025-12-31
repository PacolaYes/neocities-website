
import markdown
import argparse
from pathlib import Path
from sys import exit

from bs4 import BeautifulSoup, Comment

def getMarkdown(path: str|None):
    if path is None:
        return

    files = []
    path_obj = Path(path)
    for entry in path_obj.iterdir():
        if entry.is_dir():
            files += getMarkdown(entry)
        elif entry.suffix == ".md":
            # print(entry)
            files.append(entry)
    
    return files

def mdToHTML(files: list[Path], template: Path):
    with open(template, "r", encoding="utf-8") as input_file:
        template_str = input_file.read()
    
    # py_location = Path(__file__)
    for file in files:
        template_parser = BeautifulSoup(template_str, "html.parser")
        # name = file.stem

        with open(file, "r", encoding="utf-8") as input_file:
            text = input_file.read()
        html = BeautifulSoup(markdown.markdown(text), "html.parser")
        # html = markdown.markdown(input=str(file), output=str(py_location.parent.joinpath(Path("./output/" + name + ".html"))))
        
        found_comment = False
        for comment in template_parser.find_all(string=lambda text: isinstance(text, Comment)):
            if comment.strip() == "insert markdown":
                found_comment = True
                comment.replace_with(html)
                print(comment)
                break

        if not found_comment:
            break

        print(template_parser.prettify())

def main():
    # print("hey!")
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
    or template.suffix != ".html" \
    or not output.is_dir(): # yes, this isn't the best way to do html detection, i'd say
        return "one of the arguments is invalid"

    mdToHTML(files, template)

if __name__ == '__main__':
    exit(main())