export const IMPORT_DATA_TABLE_HEADERS = [
  /* { field: 'key', header: 'key' },*/
  { field: 'fileName', header: 'File Name' },
  { field: 'filePath', header: 'File Path' },
  { field: 'parentFolder', header: 'Parent Folder' },
  { field: 'fileExtension', header: 'File Extention' },
  { field: 'fileSize', header: 'File Size' },
  { field: 'createdDate', header: 'Created Date' },
  { field: 'modifiedDate', header: 'Modified Date' },
];

export const SEGREGATED_TABLE_HEADERS = [
  /*  { field: 'key', header: 'Key' },*/
  { field: 'fileName', header: 'File Name' },
  { field: 'isRoot', header: 'Is Root' },
  { field: 'parent', header: 'Root (Top Level)' },
  { field: 'filePath', header: 'File Path' },
  { field: 'parentFolder', header: 'Parent Folder' },
  { field: 'fileExtension', header: 'File Extention' },
  { field: 'maturityState', header: 'Maturity State' },
  { field: 'revision', header: 'Revision' },
  { field: 'fileSize', header: 'File Size' },
  { field: 'createdDate', header: 'Created Date' },
  { field: 'modifiedDate', header: 'Modified Date' },
];

export const CONFIGURATION_DATA_TABLE_HEADERS = [
  //{ field: 'id', header: 'id' },
  { field: 'name', header: ' Name' },
  { field: 'value', header: ' Value' },
  { field: 'scope', header: ' Scope' },
  { field: 'type', header: ' Type' },
];

export const TYPEMAPPING_DATA_TABLE_HEADERS = [
  { field: 'type', header: ' Name' },
  { field: 'adminType', header: 'Admin Type' },
  { field: 'sourceTable', header: ' Source Table' },
  { field: 'condition', header: ' SQL Where Clause' },
  { field: 'sequence', header: ' Sequence' },
  { field: 'scope', header: ' Scope' },
  { field: 'sqlName', header: ' SQL Name' },
  { field: 'status', header: ' Status' },
  { field: 'comments', header: ' Comments' },
  { field: 'enable', header: ' Is Enabled' },
  { field: 'hasFile', header: ' Has File' },
  { field: 'hasComposed', header: ' Has Composed' },
];

export const SELECTIVE_DATA_TABLE_HEADERS = [
  { field: 'type', header: 'Type' },
  { field: 'name', header: ' Name' },
  { field: 'revision', header: 'Revision' },
  { field: 'loadingstatus', header: 'Loading Status' },
  { field: 'ownershipstatus', header: 'Ownership Status' },
  { field: 'thumbnailstatus', header: 'Thumbnail Status' },
];

export const SELECTIVE_DATA_TABLE_SECOND_HEADERS = [
  { field: 'type', header: 'Type' },
  { field: 'name', header: ' Name' },
  { field: 'revision', header: 'Revision' },
  { field: 'loadingstatus', header: 'Loading Status' },
  { field: 'ownershipstatus', header: 'Ownership Status' },
  { field: 'thumbnailstatus', header: 'Thumbnail Status' },
];

export const UPS_LOADER_TABLE_HEADERS = [
  { field: 'jobID', header: 'Job ID' },
  { field: 'assemblyName', header: 'Assembly Name' },
  { field: 'jobStatus', header: 'Job Status' },
  { field: 'nodeName', header: 'Node Name' },
  { field: 'xmlGenerated', header: 'XML Generated' },
  { field: 'loadingStatus', header: 'Loading Status' },
  { field: 'ownershipStatus', header: 'Ownership Status' },
  { field: 'thumbnailStatus', header: 'Thumbnail Status' },
  { field: 'verified', header: 'Verfied' },
  { field: 'view', header: 'View' },
  { field: 'errorCode', header: 'Error Code' },
  { field: 'executionTime', header: 'Execution Time (ms)' },
  { field: 'executedOn', header: 'Executed On' },
];

export const SELECTIVE_DATA_TABLE_LOAD = [
  { field: 'name', header: 'Name' },
  { field: 'totalram', header: 'Total RAM' },
  { field: 'usableram', header: 'Usable RAM' },
  { field: 'cpuusage', header: 'CPu Usage' },
  { field: 'pendingjobs', header: 'Pending Jobs' },
];

export const UPS_LOADER_DETAILS_TABLE = [
  { field: 'id', header: 'ID' },
  { field: 'jobId', header: 'Job ID' },
  { field: 'name', header: ' Name' },
  { field: 'type', header: 'Type' },
  { field: 'revision', header: 'Revision' },
  { field: 'policy', header: 'Policy' },
  { field: 'created', header: 'Created Date' },
  { field: 'modified', header: 'Modified Date' },
  { field: 'status', header: 'Job Status' },
  { field: 'nodeName', header: 'Node Name' },
  { field: 'xmlStatus', header: 'XML Generated' },
  { field: 'loadingStatus', header: 'Loading Status' },
  { field: 'ownershipStatus', header: 'Ownership Status' },
  { field: 'thumbnailStatus', header: 'Thumbnail Status' },
  { field: 'verifiedStatus', header: 'Verified Status' },
  { field: 'executionTime', header: 'Execution Time in (ms)' },
  { field: 'executedOn', header: 'Executed On' },
  { field: 'errorCode', header: 'Error Code' },
];

export const ANALYSTICS_TABLE = [
  { field: 'name', header: ' Name' },
  { field: 'type', header: 'Type' },
  { field: 'revision', header: 'Revision' },
  { field: 'policy', header: 'Policy' },
  { field: 'maturity', header: 'Maturity State' },
  { field: 'owner', header: 'Owner' },
  { field: 'xmlStatus', header: 'XML Generated' },
  { field: 'loadingStatus', header: 'Loading Status' },
  { field: 'ownershipStatus', header: 'Ownership Status' },
  { field: 'thumbnailStatus', header: 'Thumbnail Status' },
  { field: 'verifiedStatus', header: 'Verified Status' },
  { field: 'created', header: 'Created Date' },
  { field: 'modified', header: 'Modified Date' },
];

export const NODE_DATA_TABLE = [
  { field: 'name', header: ' Name' },
  { field: 'totalRam', header: 'Total RAM' },
  { field: 'freeRam', header: 'Free RAM' },
  { field: 'cpuUsage', header: 'CPU Usage' },
  { field: 'pendingJobs', header: 'Pending Jobs' },
  { field: 'itemsAllocation', header: 'Items Allocation' },
  { field: 'ownershipTransfer', header: 'Ownership Transfer' },
  { field: 'cgrGeneration', header: 'CGR Generation' },
];

export const FIELDMAPPING_TABLE_HEADERS = [
  { field: 'id', header: 'ID' },
  { field: 'type', header: 'Type' },
  // { field: 'adminType', header: 'Admin Type' },
  { field: 'sourceTable', header: 'Source Table' },
  { field: 'target', header: 'Target' },
  { field: 'source', header: 'Source' },
  { field: 'sqlName', header: 'SQL Name' },
  { field: 'mappingType', header: 'Mapping Type' },
  { field: 'datatype', header: 'Data Type' },
  { field: 'multiValueSeperator', header: 'Multie-value Seperator' },
  { field: 'joinCriteria', header: 'Join Criteria' },
  { field: 'status', header: 'Status' },
  { field: 'comments', header: 'Comments' },
  { field: 'rules', header: 'Rules' },
  { field: 'fieldLength', header: 'Field Length' },
  { field: 'indexed', header: 'Indexed' },
  { field: 'unique', header: 'Is Unique' },
  { field: 'reports', header: 'Reports' },
];

export const ANALYSTICS_CONSTANTS = [
  { field: 'type', header: 'Type' },
  { field: 'maturity', header: 'Maturity State' },
  /*{ field: 'created', header: 'Created Date' },
  { field: 'modified', header: 'Modified Date' },*/
  { field: 'owner', header: 'Owner' },
  /*{ field: 'level', header: 'Level' },
  { field: 'count', header: 'Count' },
  { field: 'filesize', header: 'File Size' },*/
];

export const BUSINESS_RULE_TABLE_HEADERS = [
  //{ field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'description', header: 'Description' },
  { field: 'inputParameter', header: 'Input Parameter' },
  { field: 'className', header: 'Class Name' },
  { field: 'isEnabled', header: 'Is Enable' },
  { field: 'executionType', header: 'Execution Type' },
  { field: 'type', header: 'Type' },
  { field: 'lastExecutedOn', header: 'Last Execution' },
  { field: 'executionSequence', header: 'Execution Sequence' },
];

export const NODES_TABLE_HEADER = [
  { field: 'name ', header: 'Name' },
  { field: 'host', header: 'Host' },
  { field: 'port', header: 'Port' },
  { field: 'threadId', header: 'Thread Id' },
  { field: 'totalRam', header: 'Total RAM' },
  { field: 'cpuUsage', header: 'CPU Usage' },
  { field: 'freeRam', header: 'Free RAM' },
  { field: 'pendingJobs', header: 'Pending Jobs' },
];

export const SPECIAL_CHAR_TABLE_HEADERS = [
  { field: 'id', header: 'ID' },
  // { field: 'id', header: 'ID' },
  // { field: 'name ', header: 'Name' },
  { field: 'specialChar', header: 'Special Character' },
  // { field: 'host', header: 'Host' },
  { field: 'replacement', header: 'Replacement Character' },
  // { field: 'port', header: 'Port' },
  { field: 'setName', header: 'Set Name' },
];

export const ITERATION_HEADERS = [
  { field: 'name', header: 'Name' },
  { field: 'description', header: 'Description' },
];

export const REPORT_TABLE_HEADERS = [
  { field: 'id', header: 'ID' },
  { field: 'name ', header: 'Name' },
  { field: 'description', header: 'Description' },
  { field: 'scope', header: 'Scope' },
  { field: 'executionType', header: 'Execution Type' },
  { field: 'reportFormatType ', header: 'Report Format Type' },
  { field: 'classNameSQLQuery', header: 'Class Name/ SQL Query' },
  { field: 'isEnable', header: 'Is Enable' },
  { field: 'type', header: 'Type' },
  { field: 'lastExecutedOn ', header: 'Last Executed On' },
];

export const CONFLICT_REPORT_TABLE_HEADERS = [
    { field: 'CONNECTION_ID', header: 'Connection ID' },
    { field: 'ROOT_NAME', header: 'Root Assembly Name' },
    { field: 'ROOT_REVISION', header: 'Root Assembly Revision' },
    { field: 'BAS_FROM_ID', header: 'BAS FROM ID' },
    { field: 'BAS_FROM_NAME', header: 'BAS FROM Name' },
    { field: 'BAS_FROM_REVISION', header: 'BAS FROM Revision' },
    { field: 'BAS_TO_ID', header: 'BAS To ID' },
    { field: 'BAS_TO_NAME', header: 'BAS To Name' },
    { field: 'BAS_TO_REVISION', header: 'BAS To Revision' },
    { field: 'REPLACE_CONNECTION_ID', header: 'Replace Connection ID' },
];

export const TRANSFORMATION_REPORT_TABLE_HEADERS = [
  { field: 'BAS_FROM_TYPE', header: 'Type'},
  { field: 'ROOT_FROM_NAME', header: 'Assembly Name'},
  { field: 'DEEPEST_LEVEL', header: 'Assembly Level'},
  { field: 'ID_COUNT', header: 'Total Count'},
  { field: 'WHERE_USED_COUNT', header: 'Where Used'},
  { field: 'TOTAL_IMPORTED_COUNT', header: 'Imported'},
  { field: 'TOTAL_IMPORT_FAILED_COUNT', header: 'Import Failed'},
];

export const ASSEMBLY_DETAILS_TABLE = [
  { field: 'level', header: 'Level' },
  { field: 'Parenttype', header: 'From Type' },
  { field: 'Parentname', header: 'From Name' },
  { field: 'Parentrevision', header: 'From Revision' },
  { field: 'Childtype', header: 'To Type' },
  { field: 'Childname', header: 'To Name' },
  { field: 'Childrevision', header: 'To Revision' },
];
export const SELECTIVE_DATA_EXTRACTION = [
  { field: 'id', header: 'Id' },
  { field: 'type', header: 'Type' },
  { field: 'name', header: 'Name' },
  { field: 'revision', header: 'Revision' },
  { field: 'maturity', header: 'State' },
];

export const VIEW_EXTR_TABLE_DATA = [
  //{ field: 'TRANSACTION_ID', header: 'Transaction ID' },
  //{ field: 'R_STATUS', header: 'R Status' },
  { field: 'TYPE', header: 'Type' },
  { field: 'NAME', header: 'Name' },
  { field: 'REVISION', header: 'Revision' },
  { field: 'POLICY', header: 'Policy' },
  { field: 'OWNER', header: 'Owner' },
  { field: 'ORIGINATED', header: 'Originated' },
  { field: 'MODIFIED', header: 'Modified' },
  { field: 'ATT_CURRENT', header: 'Maturity' },
];

export const DSE_CONFIGURATION_DATA_TABLE_HEADERS = [
  // { field: 'ID', header: 'ID' },
  { field: 'typeName', header: 'TYPE / RELATIONSHIP' },
  { field: 'alias', header: 'ALIAS' },
  { field: 'relationship', header: 'RELATIONSIP' },
  { field: 'policy', header: 'POLICY' },
];
