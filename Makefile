
all: clean copyWeb addLibs

copyWeb:
	cp -r web-src/ build/

addLibs:
	git submodule update --recursive --remote
	mkdir -p build/assets/js/libs

clean:
	rm -rf build/
