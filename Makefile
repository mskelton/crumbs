NPM_BIN = $(shell yarn bin)
TRANSPILER = $(NPM_BIN)/babel
TRANSPILER_OPTS = --source-maps
LINTER = $(NPM_BIN)/eslint
LINTER_OPTS =
TEST_RUNNER = $(NPM_BIN)/jest
TEST_RUNNER_OPTS =

# Directories
PKGS_ROOT := packages
PKGS_SRCDIR := src
PKGS_LIBDIR := lib
PKGS_TESTDIR := test

############################################
## HELPER FUNCTIONS ########################
############################################

replace-extensions = $(patsubst %.ts,%.js,$(patsubst %.tsx,%.js,$1))
get-src-files = $(call replace-extensions,$(wildcard $(call pkg-srcdir,$1)/*.ts*))

############################################
## PACKAGE DIRECTORIES AND FILES ###########
############################################

# Expands to the root directory for the specified package
pkg-dir = $(PKGS_ROOT)/$1
# Expands to the source directory for the specified package
pkg-srcdir = $(PKGS_ROOT)/$1/$(PKGS_SRCDIR)
# Expands to the output directory	for the specified package
pkg-libdir = $(PKGS_ROOT)/$1/$(PKGS_LIBDIR)
# Expands to the test directory for the specified package
pkg-testdir = $(PKGS_ROOT)/$1/$(PKGS_TESTDIR)
# Expands to the tsconfig.tsbuildinfo file for the specified package
pkg-tsbuildinfo = $(PKGS_ROOT)/$1/tsconfig.tsbuildinfo

############################################
## PACKAGE OUTPUTS #########################
############################################

# Expands to all output targets for the specified package
pkg-libs-js = $(subst /$(PKGS_SRCDIR)/,/$(PKGS_LIBDIR)/,$(call get-src-files,$1))

############################################
## PACKAGE TARGETS #########################
############################################

define pkg-rules

# rule to create the output directory if missing
$(call pkg-libdir,$1):
	@mkdir $$@

# Build rule for .ts(x) files
$(call pkg-libdir,$1)/%.js: $(call pkg-srcdir,$1)/%.ts* | $(call pkg-libdir,$1)
	$(TRANSPILER) $(TRANSPILER_OPTS) --out-file $$@ $$^

# Build rule to generate TypeScript declarations. We use tsconfig.tsbuildinfo as
# the target since that file will be generated by tsc. This is a conditional rule
# since not all packages are TypeScript projects.
$(call pkg-tsbuildinfo,$1): $(wildcard (call pkg-srcdir,$1)/*.ts*)
ifneq (,$(wildcard $(call pkg-dir,$1)/tsconfig.json))
	$(NPM_BIN)/tsc --project $(call pkg-dir,$1)
endif

# Package rule to build all outputs
$1: $(call pkg-libs-js,$1) $(call pkg-tsbuildinfo,$1)

test-$1:
ifneq (,$(wildcard $(call pkg-testdir,$1)))
	$(TEST_RUNNER) $(TEST_RUNNER_OPTS) $(call pkg-testdir,$1)
endif

clean-$1:
	rm -rf $(call pkg-libdir,$1) $(call pkg-dir,$1)/node_modules
	rm -f $(call pkg-tsbuildinfo,$1)

# Phony targets used for the global
clean-packages: clean-$1
test-packages: test-$1

packages: $1

.PHONY: $1 test-$1 clean-$1 clean-packages test-packages packages
endef

############################################
## SETUP ALL PACKAGES ######################
############################################

# Creates rules for the specified package
add-pkg = $(eval $(call pkg-rules,$1))

# Create rules for all packages
PKGS := $(notdir $(wildcard $(PKGS_ROOT)/*))
$(foreach p,$(PKGS),$(call add-pkg,$p))

############################################
## GLOBAL RULES ############################
############################################

# Prevent make from trying to use the Makefile as a target
Makefile: ;

# Install all dependencies
node_modules: package.json
	yarn

lint:
	$(LINTER) $(LINTER_OPTS) .

lint-fix:
	$(LINTER) $(LINTER_OPTS) --fix .

test: test-packages

clean: clean-packages
	rm -rf node_modules

publish:
	@echo "publishing"

# Install and build all packages
all: node_modules packages

# Will be filled in by pkg-rules
.PHONY: all lint test clean publish

.DEFAULT_GOAL := all
