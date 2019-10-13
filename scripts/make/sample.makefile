include ../../scripts/make/perf.makefile

# Script locations
PACKAGE_MANAGER = yarn
TRANSPILER = $(PACKAGE_MANAGER) babel
TRANSPILER_OPTS = --source-maps --config-file ../../babel.config.js
LINTER = $(PACKAGE_MANAGER) eslint
LINTER_OPTS = --ext .ts,.tsx,.js,.jsx
TEST_RUNNER = $(PACKAGE_MANAGER) jest
TEST_RUNNER_OPTS =

# Directories
PKG_SRCDIR := src
PKG_LIBDIR := lib
PKG_TESTDIR := test
PKG_TSBUILDINFO := tsconfig.tsbuildinfo

############################################
## HELPER FUNCTIONS ########################
############################################

replace-extensions = $(patsubst %.ts,%.js,$(patsubst %.tsx,%.js,$1))

############################################
## PACKAGE OUTPUTS #########################
############################################

# List of TS source files
SRC_FILES := $(call replace-extensions,$(wildcard $(PKG_SRCDIR)/*.ts*))

# Expands to all output targets for the specified package
PKG_LIBS_JS := $(patsubst $(PKG_SRCDIR)/%,$(PKG_LIBDIR)/%,$(SRC_FILES))

############################################
## PACKAGE TARGETS #########################
############################################

# rule to create the output directory if missing
$(PKG_LIBDIR):
	@mkdir $@

# Build rule for .ts(x) files
$(PKG_LIBDIR)/%.js: $(PKG_SRCDIR)/%.ts* | $(PKG_LIBDIR)
	$(TRANSPILER) $(TRANSPILER_OPTS) --out-file $@ $^

# Build rule to generate TypeScript declarations. We use tsconfig.tsbuildinfo as
# the target since that file will be generated by tsc. This is a conditional rule
# since not all packages are TypeScript projects.
$(PKG_TSBUILDINFO): $(wildcard $(PKG_SRCDIR)/*.ts*)
ifneq (,$(wildcard tsconfig.json))
	$(PACKAGE_MANAGER) tsc
endif

test:
ifneq (,$(wildcard $(PKG_TESTDIR)))
	$(TEST_RUNNER) $(TEST_RUNNER_OPTS) $(PKG_TESTDIR)
endif

clean:
	rm -rf $(PKG_LIBDIR) node_modules
	rm -f $(PKG_TSBUILDINFO) yarn-error.log

# Package rule to build all outputs
all: $(PKG_LIBS_JS) $(PKG_TSBUILDINFO)

.PHONY: all test clean
.DEFAULT_GOAL := all
