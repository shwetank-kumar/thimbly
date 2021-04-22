local_build:
	cd ./src && yarn build:dev

local_run: 
	firebase emulators:start

dev_build:
	cd ./src && yarn build:staging

dev_run:
	firebase use thimbly-dev &&  source /Users/vishu/Code/thimbly.sh && firebase deploy

prod_build:
	cd ./src && yarn build:prod

prod_run:
	firebase use thimbly-prod && source /Users/vishu/Code/thimbly-prod.sh &&  firebase deploy
