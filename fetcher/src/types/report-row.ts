export type ReportRow = {
  DocumentId: number;
  
  CodeFile?: number;
  DocStatus?: number;
  DocumentCode?: number;
  DocumentName?: string;
  EntHistLevel?: number;
  EntityId?: number;
  EventDate?: string;
  EventId?: number;
  FunctionCode?: number;
  InvestmentNumber?: number;
  LegalId?: string;
  LicenseCode?: number;
  LicenseId?: number;
  LicenseStatusId?: number;
  Name?: string;
  ParentCorpLegalId?: "570005959"
  ParentCorpName?: string;
  ProductNum?: number;
  ReportFor?: number;
  ReportHistLevel?: number;
  ReportPeriodCode?: number;
  ReportPeriodDesc?: string;
  ShortName?: string;
  StatusDate?: string;
  SystemCode?: number;
  SystemName?: string;
  fileExt?: string;
  
  // TODO: not sure about these types
  DateFinish?: any;
  DateStart?: any;
  EntityName?: any;
  ParentCorpEntlId?: any;
};
