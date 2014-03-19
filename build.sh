#!/bin/bash

THUMB_SETTINGS="-thumbnail 300x200> -background black -gravity center -extent 300x200"
LARGE_SETTINGS="-background black -gravity center -resize 1920x1080 -extent 1920x1080"

rm gallery/*.jpg
cd source
for i in *.jpg; do
  WIDTH=`identify -format '%w' $i`
  HEIGHT=`identify -format '%h' $i`
  convert $i $LARGE_SETTINGS ../gallery/$i
  convert $i $THUMB_SETTINGS ../gallery/`basename $i .jpg`_th.jpg
  jhead -q -te $i ../gallery/`basename $i .jpg`_th.jpg
done

cd ..

cd gallery
  jhead -q -n%y%m%d_%H%M%S_%f *
cd ..

# gallery xml generation
echo "<?xml version=\"1.0\"?>" > gallery.xml
echo "<gallery>" >> gallery.xml

for i in `ls gallery/*[0-9].jpg | sort -n`; do
  METADATA=`jhead $i | egrep "(Object Name|Caption)"`
  NAME=`echo $METADATA | grep "Object Name" | cut -d : -f 2 | sed -e 's/^[[:space:]]*//'`
  CAPTION=`echo $METADATA | grep "Caption" | cut -d : -f 2 | sed -e 's/^[[:space:]]*//'`

  echo -e "\t<media>"  >> gallery.xml

  echo -e "\t\t<fullsize>$i</fullsize>" >> gallery.xml
  echo -e "\t\t<thumbnail>gallery/`basename $i .jpg`_th.jpg</thumbnail>" >> gallery.xml
  echo -e "\t\t<title><![CDATA[$NAME]]></title>" >> gallery.xml
  echo -e "\t\t<description><![CDATA[$CAPTION]]></description>" >> gallery.xml

  echo -e "\t</media>" >> gallery.xml
done

echo "</gallery>" >> gallery.xml


#for i in gallery/*.jpg; do
#  jhead -q -purejpg $i
#done
 
