dev_build:
	cd ./src && yarn build:dev

dev_run: 
	firebase emulators:start

staging_build:
	cd ./src && yarn build:staging

staging_run:
	source /Users/skumar/thimbly/staging.sh && firebase deploy
