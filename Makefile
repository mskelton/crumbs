# Script locations
PACKAGE_MANAGER := yarn
LINTER = $(PACKAGE_MANAGER) eslint
LINTER_OPTS = --ext .ts,.tsx,.js,.jsx

# Directories
SCRIPTS_DIR := scripts
PACKAGES = $(wildcard packages/*)
MAKEFILES = $(foreach p,$(PACKAGES),$(addsuffix /Makefile,$p))

############################################
## PACKAGE_TARGETS #########################
############################################

$(MAKEFILES):
	cp scripts/make/sample.makefile $@

clean-packages: $(MAKEFILES)
	@$(foreach f,$^,$(MAKE) -C $(dir $f) clean;)

test-packages: $(MAKEFILES)
	@$(foreach f,$^,$(MAKE) -C $(dir $f) test;)

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

test: test-packages

clean: clean-packages
	rm -rf node_modules

publish:
	@echo "publishing"

# Install and build all packages
all: node_modules packages

# Will be filled in by pkg-rules
.PHONY: all new lint lint-fix test clean publish

.DEFAULT_GOAL := all
