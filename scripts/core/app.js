export class App {
  constructor() {
    this.filters = [];
    this.activeFilters = [];
    this.rawLogs = "";
    this.parsedLogs = "";
  }

  parseRawLogs() {
    this.parsedLogs = JSON.parse(this.rawLogs);
  }

  get parsedLogsSource() {
    return this.parsedLogs._source;
  }
}
