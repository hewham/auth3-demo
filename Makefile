version_num := $(shell node -p "require('./package.json').version")

help: ## Display help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

version: ## View current version
	@echo "Anonacy App v$(version_num)"

v: ## View current version
	@make version

tag: ## tag current version and push to repo
	@git tag ${version_num} && git push origin ${version_num}

set_version: ## Set new version "$ make set_version VERSION=X.X.X"
	@npm --new-version=$$VERSION run-script set_version

deploy: ## firebase deploy webapp
	@rm -rf www/ && \
		ionic build --prod && \
		ionic deploy manifest && \
		firebase deploy --only hosting:auth3x