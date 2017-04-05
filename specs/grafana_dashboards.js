//var graphMongoDbRocks = require('../page_objects/mainQan.po.js')
var graphMainDash = require('../page_objects/graphMainDash.po.js')
var graphMariaDb = require('../page_objects/graphMariaDbDash.po.js')
var graphDiskSpace = require('../page_objects/graphDiskSpaceDash.po.js')

describe('Selenium Test Case', function() {
  beforeEach(function () {
    graphMainDash.get(browser.baseUrl);
    browser.ignoreSynchronization = true;
    browser.sleep(15000);
       browser.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /cross-server-graphs/.test(url);
      });
    });
  });

  afterEach(function () {

  });


  it('should check main (Cross Server Graphs) dashboard', function() {
    browser.sleep(25000);
    expect(browser.getCurrentUrl()).toContain('dashboard/db/cross-server-graphs');
    expect(graphMainDash.graphPage.loadAvgChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.memUsgChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.mysqlConnChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.mysqlQueryChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.mysqlTrafChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.netTrafChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.sysInfoChart.isDisplayed()).toBeTruthy();
    expect(graphMainDash.graphPage.mysqlInfoChart.isDisplayed()).toBeTruthy();
  });

  it('should check Disk Space dashboard', function() {
element(by.css('[ng-click="openSearch()"]')).click();   
//element(by.linkText("Cross Server Graphs")).click();
graphMainDash.searchDashboard("Disk Space");
browser.sleep(25000);   
// element(by.linkText("MySQL Percona   MariaDB")).click();
    text = element(by.tagName('html')).getText();
    expect(text).toContain("" + "Mountpoint Usage");
    expect(element(by.xpath('//span[contains(@class, "panel-title-text drag-handle") and (text()) = "Mountpoint Usage"]')).isDisplayed()).toBeTruthy();
    expect(graphDiskSpace.graphPage.mntPntUsgChart.isDisplayed()).toBeTruthy();
    expect(graphDiskSpace.graphPage.mntPntChart.isDisplayed()).toBeTruthy();
    expect(graphDiskSpace.getHostnameTitle().isDisplayed()).toBeTruthy();
 });

  it('should check MariaDB', function() {
    //graphMainDash.clickPmmDemo();
    element(by.linkText("Cross Server Graphs")).click();
    //graphMainDash.clickOpenSearch();
    graphMainDash.searchDashboard("MariaDB");
    expect(browser.getCurrentUrl()).toContain('dashboard/db/mariadb');
    browser.sleep(25000);
    expect(areaPageCacheTitle.isDisplayed()).toBeTruthy();

  }); 
});
