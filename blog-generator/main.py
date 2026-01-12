
# vanilla python stuff
import argparse
import os
from json import dumps
from sys import exit
from pathlib import Path
from datetime import datetime

# markdown
import markdown
from modules.markdown_extension import blogExtension

# the html library
from bs4 import BeautifulSoup, Comment
from bs4.formatter import HTMLFormatter

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
            "metadata": {
                "title": md.title,
                "date": md.datetime
            },
            "html": template_parser.prettify(formatter=formatter) # not the most ideal (for me), but it's better than no indentation at all!
        })
        print("Parsed entry: " + file.name)

    return html_files

def getDateIndex(coollist: list, value):
    found_index = None
    for index, val in enumerate(coollist):
        if val.get("num") == value:
            found_index = index
            break
    return found_index

def getJSON(html_list: list):
    json_list = []
    for html in html_list:
        date: datetime = html["metadata"]["date"]

        yearIndex = getDateIndex(json_list, date.year)
        if yearIndex is None:
            json_list.append({
                "num": date.year,
                "list": []
            })
            yearIndex = len(json_list) - 1
        yearList = json_list[yearIndex]["list"]
        
        monthIndex = getDateIndex(yearList, date.month)
        if monthIndex is None:
            yearList.append({
                "num": date.month,
                "list": []
            })
            monthIndex = len(yearList) - 1
        monthList = yearList[monthIndex]["list"]
        
        monthList.append({
            "name": html["metadata"]["title"],
            "file": str(html["filename"]),
            "timestamp": date.timestamp()
        })
    
    json_list.sort(key=lambda year: year["num"])
    for year in json_list:
        year["list"].sort(key=lambda month: month["num"])
        for month in year["list"]:
            month["list"].sort(key=lambda day: day.pop("timestamp"))
    
    return dumps(json_list, sort_keys=True, indent=4)

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
    
    with open(output.joinpath("blog-list.json"), "w", encoding="utf-8") as output_file:
        output_file.write(getJSON(html_files))

if __name__ == '__main__':
    exit(main())