const { defineConfig } = require('cypress');

module.exports = defineConfig({
	animationDistanceThreshold: 20,
	chromeWebSecurity: true,
	defaultCommandTimeout: 4000,
	execTimeout: 60000,
	fixturesFolder: 'cypress/fixtures',
	hosts: null,
	modifyObstructiveCode: true,
	numTestsKeptInMemory: 20,
	pageLoadTimeout: 30000,
	port: null,
	projectId: 'null',
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/results/reports',
		overwrite: false,
		html: true,
		json: true,
	},
	requestTimeout: 5000,
	responseTimeout: 30000,
	screenshotsFolder: 'cypress/results/screenshots',
	taskTimeout: 60000,
	trashAssetsBeforeRuns: true,
	userAgent: null,
	video: false,
	videoCompression: 32,
	videosFolder: 'cypress/videos',
	viewportHeight: 1080,
	viewportWidth: 1920,
	waitForAnimations: true,
	watchForFileChanges: false,
	e2e: {
		setupNodeEvents(on, config) {},
		baseUrl: 'https://testerzy.pl/',
		excludeSpecPattern: '*.hot-update.js',
		specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
		supportFile: './cypress/support/support.js',
	},
});
