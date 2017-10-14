#! /bin/sh

rm -rf dist/api
mkdir -p dist/api
FILES=`find ./api -type f -name "*.php"`
for FILE in ${FILES}
do
  # Obfuscate!!
  STRIPPED=`php -w ${FILE} | sed -e "s/<?php//" | sed -e "s/'/\"/g"`
  ENCODED=`php -r "echo base64_encode('${STRIPPED}');"`
  OBFUSCATED=`echo "<?php @eval(base64_decode('${ENCODED}'));"`

  # Output!!
  DIRNAME=`dirname ${FILE}`
  FILENAME=`basename ${FILE}`
  mkdir -p dist/${DIRNAME}
  echo ${OBFUSCATED} > dist/${DIRNAME}/${FILENAME}
done

# Copy Other File!!
cp api/.htaccess dist/api/.
cp -r api/bin dist/api/.
cp src/.htaccess src/robots.txt dist/.

# for BASE_DIR
cat dist/api/index.php | sed -e "s/<?php/<?php define('BASE_DIR', '\/api\/');/g" > dist/api/index.php
