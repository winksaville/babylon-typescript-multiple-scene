TSC_FLAGS += --target ES5
TSC_FLAGS += --noEmitOnError
TSC_FLAGS += --noUnusedLocals
TSC_FLAGS += --noUnusedParameters
TSC_FLAGS += --noIMplicitAny
TSC_FLAGS += --noImplicitReturns
TSC_FLAGS += --NoImplicitThis
TSC_FLAGS += --alwaysStrict
#TSC_FLAGS += --allowJs # is not allowed if --declaration is also set
TSC_FLAGS += --declaration
TSC_FLAGS += --experimentalDecorators
TSC_FLAGS += --forceConsistentCasingInFileNames
TSC_FLAGS += --strictNullChecks

test.js: test.ts js/babylon.d.ts Makefile
	rm -f test.js test.d.ts # Remove so on errors we won't see old files
	tsc $(TSC_FLAGS) test.ts js/babylon.d.ts

.PHONY: clean
clean:
	rm test.js test.d.ts

