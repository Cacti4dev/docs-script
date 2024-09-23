function getSpreadsheet(spreadsheetId, sheetName, x, y) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  Logger.log("Spreadsheet name: " + spreadsheet.getName());
  
  const allSheets = spreadsheet.getSheets();
  allSheets.forEach(sheet => Logger.log("Found sheet: " + sheet.getName()));

  const sheet = spreadsheet.getSheetByName(sheetName);
  
  if (sheet) {
    Logger.log("Target sheet found: " + sheet.getName());
        
    var value = sheet.getRange(x + 1, y + 1).getValue();
    
    return value;
  } else {
    Logger.log("Sheet not found: " + sheetName);
    return null;
  }
}

function main() {
  var spreadsheetId = "REPLACE";  
  var sheetName = "REPLACE"; // This is not the name of your google sheet file, but the page, which is called a sheet 
  var result = getSpreadsheet(spreadsheetId, sheetName, 2, 2);  
  
  if (result) {
    Logger.log("Value: " + result);

    var docId = "REPLACE"; 
    var doc = DocumentApp.openById(docId);
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();

    for (var i = 0; i < paragraphs.length; i++) {
      var text = paragraphs[i].getText();
      
      if (text.includes("a")) {
        body.insertParagraph(i, "Test Here");
      }
    }
  } else {
    Logger.log("No value found at the coordinates.");
  }
}
