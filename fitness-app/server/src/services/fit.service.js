const FitParser = require("fit-file-parser").default;

function parseFit(buffer) {
  return new Promise((resolve, reject) => {
    const fitParser = new FitParser({
      force: true,
      speedUnit: "km/h",
      lengthUnit: "km",
      temperatureUnit: "celsius",
      elapsedRecordField: true,
      mode: "cascade"
    });

    fitParser.parse(buffer, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

module.exports = { parseFit };
