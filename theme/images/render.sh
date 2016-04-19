#!/bin/bash
set -e -u

# Color variations to be generated
COLORS="000000 ffffff"

# Check for required commands
COMMANDS="inkscape pngquant"
for COMMAND in $COMMANDS; do
    if [ -z $(which $COMMAND) ]; then
        echo "Command '$COMMAND' not found."
        exit 1
    fi
done

BASE="$(dirname $0)"

echo ""

for COLOR in $COLORS; do
    # Render SVG color variations (skip black and use original icons.svg)
    if [ $COLOR != "000000" ]; then
        SVG="$BASE/icons-$COLOR.svg"
        sed "s/#000000/#$COLOR/g" < $BASE/icons.svg > $SVG
        echo -e "\033[01;33m✔ saved $SVG"
    else
        SVG="$BASE/icons.svg"
    fi

    # Render PNG
    inkscape \
        --export-dpi=180 \
        --export-png="$BASE/icons-$COLOR@2x.png" \
        $SVG > /dev/null

    # Quantize to 8-bit
    pngquant 32 $BASE/icons-$COLOR@2x.png -o $BASE/icons-$COLOR@2x.png -f

    echo -e "\033[01;33m✔ saved $BASE/icons-$COLOR@2x.png"
done

echo -e "\n\033[00;33mCOMPLETE! Don't forget to update the \`background-size\` property if the sprite size changed\033[0m"
