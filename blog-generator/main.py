
import markdown
import argparse
from pathlib import Path
from sys import exit

def getMarkdown(path: str|None):
    if path is None:
        return

    files = []
    path_obj = Path(path)
    for entry in path_obj.iterdir():
        if entry.is_dir():
            files += getMarkdown(entry)
        elif entry.suffix == ".md":
            print(entry)
            files.append(entry)
    
    return files

def convertMarkdown(files: list[Path]):
    py_location = Path(__file__)
    for file in files:
        name = file.stem

        markdown.markdownFromFile(input=str(file), output=str(py_location.parent.joinpath(Path("./output/" + name + ".html"))))

def main():
    print("hey!")
    parser = argparse.ArgumentParser(
        prog="pac's blog build utlity",
        description="builds the blog pages from markdown",
        epilog="completely unnecessary, as i know there's tools that do this already"
    )
    parser.add_argument("input_directory", help="the folder it'll read the markdown files from")
    arg = parser.parse_args().input_directory

    files = getMarkdown(arg)

    if files is None:
        return

    convertMarkdown(files)

if __name__ == '__main__':
    main()
    exit()