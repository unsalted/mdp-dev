#!/bin/bash
# Generate json file using exiftool

 exiftool -json -r -FileName ./assets/images > ./assets/json/index.json