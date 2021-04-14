local_build:
	cd ./src && yarn build:dev

local_run: 
	firebase emulators:start

dev_build:
	cd ./src && yarn build:staging

dev_run:
	source /Users/vishu/Code/thimbly.sh && firebase deploy

prod_build:
	cd ./src && git checkout main -f && yarn build:prod

prod_run:
	source /Users/vishu/Code/thimbly.sh && firebase use thimbly-prod && firebase deploy
