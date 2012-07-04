#!/bin/bash
### Prompt
BGREEN='\033[1;32m'
GREEN='\033[0;32m'
BRED='\033[1;31m'
RED='\033[0;31m'
BBLUE='\033[1;34m'
BLUE='\033[0;34m'
NORMAL='\033[00m'

#rsync -e ssh --stats --progress  -avz --exclude '.hg' ~/dev/moalaniz/ moalaniz@inter4.unsl.edu.ar:public_html 
echo -e $RED"Syncrizing files"$NORMAL
rsync -e ssh --stats --progress  -avz --exclude '.git' ~/dev/jobs/game4 dsl.puntania.com.ar:dsl.puntania.com.ar
echo -e $RED"Fixing image files permissions"$NORMAL
ssh malaniz@dsl.puntania.com.ar 'cd dsl.puntania.com.ar/game4/; for x in `find -name images`; do chmod 777 $x/*; done'

