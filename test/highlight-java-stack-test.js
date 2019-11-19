const PRISM = require('../prism.js');
const { highlightCode } = require('../code-highlighter.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``);
const document = dom.window.document;

console.log(highlightCode(`java.lang.NoSuchMethodError: org.testng.TestNG.addListener(Lorg/testng/ITestListener;)V
\tat org.pitest.testng.TestNGTestUnit.<clinit>(TestNGTestUnit.java:50)
\tat org.pitest.testng.TestNGTestUnitFinder.findTestUnits(TestNGTestUnitFinder.java:42)
\tat org.pitest.testapi.execute.FindTestUnits.findTestUnits(FindTestUnits.java:57)
\tat org.pitest.testapi.execute.FindTestUnits.getTestUnits(FindTestUnits.java:40)
\tat org.pitest.testapi.execute.FindTestUnits.findTestUnitsForAllSuppliedClasses(FindTestUnits.java:29)
\tat org.pitest.coverage.execute.CoverageMinion.discoverTests(CoverageMinion.java:157)
\tat org.pitest.coverage.execute.CoverageMinion.getTestsFromParent(CoverageMinion.java:138)
\tat org.pitest.coverage.execute.CoverageMinion.main(CoverageMinion.java:84)
`, document, 'javastacktrace'));

