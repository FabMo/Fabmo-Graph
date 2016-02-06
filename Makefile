example.fma: clean *.html js/*.js js/lib/*.js css/*.css images/*.png images/*.jpg icon.png package.json
	zip fabmo-beamer-app.fma *.html js/*.js js/lib/*.js css/*.css images/*.png images/*.jpg icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-beamer-app.fma
