include scripts/make/config.makefile

# Directories
PACKAGES = $(wildcard packages/*)

############################################
## PACKAGE_TARGETS #########################
############################################

clean-packages:
	@$(foreach p,$(PACKAGES),$(MAKE) -C $p clean;)

############################################
## GLOBAL TARGETS ##########################
############################################

# Install all dependencies
node_modules: package.json
	yarn

############################################
## GLOBAL COMMANDS #########################
############################################

new:
	$(SCRIPTS_DIR)/new.sh $(name)

lint:
	@$(LINTER) $(LINTER_OPTS) .

lint-fix:
	@$(LINTER) $(LINTER_OPTS) --fix .

test:
	@$(TEST_RUNNER)

clean: clean-packages
	rm -rf node_modules

publish:
	@echo "publishing"

# Install and build all packages
all: node_modules packages

# Will be filled in by pkg-rules
.PHONY: all new lint lint-fix test clean publish

.DEFAULT_GOAL := all
