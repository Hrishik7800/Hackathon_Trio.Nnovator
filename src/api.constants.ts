import { environment } from './environment.dev';

export const API_BASE_URL = environment.apiUrl;
export const API_BASE_URL_ARAS = environment.apiURLARAS;
export const API_BASE_ODATA_URL_ARAS = environment.apiOdataURLARAS;


export const API_BASE_Iteration = environment.apiUrl + 'api/iterations';
export const API_BASE_Import = environment.apiUrl + 'api/import/fileDetails';
export const API_BASE_Delete =
  environment.apiUrl + 'api/import/deleteFileDetails';
export const API_BASE_DbFetch =
  environment.apiUrl + 'api/import/extractFolderData';
export const API_BASE_CONFLICTREPORT_DbFetch =
  environment.apiUrl + 'api/import/extractConflictData';
export const API_BASE_ASSEMBLYLEVELREPORT_DbFetch =
  environment.apiUrl + 'api/importReport/extractAssemblyLevelData'; 
export const API_BASE_ASSEMBLYCONFLICTREPORT_DbFetch =
  environment.apiUrl + 'api/importReport/extractAssemblyConflictData';   
export const USERNAME = 'userName';
export const ITERATION = 'iteration';
export const API_BASE_ClearAllFiles =
  environment.apiUrl + 'api/import/clearDBTables';
export const API_START_TRANSFORMATION =
  environment.apiUrl + 'api/transformation/start';
export const API_STOP_TRANSFORMATION =
  environment.apiUrl + 'api/transformation/stop';
export const API_GET_TRANSFORMATION_STATUS =
  environment.apiUrl + 'api/transformation/statusupdate';
export const API_GET_TRANSFORMATION_DATA_COUNT =
  environment.apiUrl + 'api/transformation/datacountstatus';
export const API_BASE_SegregateData =
  environment.apiUrl + 'api/import/segregateData';
export const API_BASE_REQUIRED_DATA =
  environment.apiUrl + 'api/import/viewRequiredData';
export const API_BASE_NOT_REQUIRED_DATA =
  environment.apiUrl + 'api/import/viewNonRequiredData';
export const API_BASE_Configuration = environment.apiUrl + 'api/configurations';
// export const API_BASE_SELECTIVE_GET = environment.apiUrl + 'aras/load/getDataTest';
export const API_BASE_SELECTIVE_GET_ARAS = environment.apiUrl + 'aras/load/loadToAras';
export const API_BASE_SELECTIVE_GET = environment.apiUrl + 'api/sdl/getData';
// export const API_BASE_SELECTIVE_GET = environment.apiUrl + 'getData';
export const API_SELECTIVE_GET_TYPE =
  environment.apiUrl + 'api/sdl/getSelectedData';
export const API_SELECTIVE_ADD =
  environment.apiUrl + 'api/sdl/postSelectedData';
export const API_SELECTIVE_LOAD = environment.apiUrl + 'api/sdl/getNodeForLoad';
export const API_BASE_SELECTIVE_GET_DATA = environment.apiUrl + 'api/sdl/';
export const API_BASE_IS_ROOT =
  environment.apiUrl + 'api/import/saveUserInputForIsRoot';
export const API_BASE_MATURITY_STATE =
  environment.apiUrl + 'api/import/saveUserInput';
export const API_BASE_REVISION =
  environment.apiUrl + 'api/import/saveUserInput';
export const API_BASE_DELETE_CONFIGURATION =
  environment.apiUrl + 'api/configurations';
export const API_BASE_RESOLVECONFLICT_DbFetch =
  environment.apiUrl + 'api/importReport/resolveAssemblyConflictData';     
export const API_BASE_NODEIMPORT =
  environment.apiUrl + 'api/upsLoader/getNodeDropdown';
export const API_BASE_GET_RECORD_FOR_TABLE =
  environment.apiUrl + 'api/getRecordsForTable';
export const TYPE_CATPART = 'CATPART';
export const TYPE_CATPRODUCT = 'CATPRODUCT';
export const TYPE_CATDOCUMENTS = 'DOCUMENTS';
export const TYPE_CATDRAWING = 'CATDRAWING';
export const FROZEN = 'FROZEN';
//export const INWORK = 'In Work';
export const INWORK = 'IN_WORK';
export const RELEASED = 'RELEASED';
export const OBSOLETE = 'OBSOLETE';
export const MATURITY_STATE_ANALYSIS = 'Maturity State Analysis';
export const OWNERSHIP_DISTRIBUTION = 'Ownership Distribution';
export const CREATION_TRENDS = 'Creation Trends';
export const MODIFICATION_TRENDS = 'Modification Trends';
export const ASSEMBLY_DATA_INSIGHTS = 'Assembly Data Insights';
export const FILE_SIZE_DISTRIBUTION = 'File Size Distribution';
export const API_BASE_TYPE_MAPPING_GET =
  environment.apiUrl + 'api/typemappings';
export const API_BASE_TYPE_MAPPING_UPDATE =
  environment.apiUrl + 'api/typemapping';
export const API_BASE_TYPE_MAPPING_EDIT =
  environment.apiUrl + 'api/typemappings/loadfromsource';
export const API_BASE_TYPE_MAPPING_ID = environment.apiUrl + 'api/typemapping';
export const API_SELECTIVEDATALOAD_GET_TYPEDATA =
  environment.apiUrl + '/api/sdl/getTypeDataForSelect';
export const API_GET_NODEDATA = environment.apiUrl + 'api/sdl/getNodeForLoad';
export const API_SELECTIVEDATALOAD_POST_DELETESELECTEDDATA =
  environment.apiUrl + 'api/sdl/deleteSelectedData';
export const API_GET_CHART_DATA = environment.apiUrl + 'api/sdl/getAllTypeData';
export const API_IMPORT_Configuration =
  environment.apiUrl + 'api/importExcel/Configurations';
export const API_IMPORT_Config_TYPEMAPPING =
  environment.apiUrl + 'api/importExcel/TypeMappings';
export const API_IMPORT_Config_FIELDMAPPING =
  environment.apiUrl + 'api/importExcel/FieldMappings';
export const API_IMPORT_Config_RULES =
  environment.apiUrl + 'api/importExcel/Rules';
export const API_IMPORT_Config_Special = environment.apiUrl + 'api/importExcel/SpecialCharacters';
export const API_BASE_FIELD_MAPPING_GET =
  environment.apiUrl + 'api/fieldmappings';
  export const API_FIELD_MAPPING_GET =
  environment.apiUrl + 'api/fieldmapping-table';
export const API_PIE_CHART_GET =
  environment.apiUrl + 'api/analytics/getCountForPieChart';
export const API_BAR_CHART_GET =
  environment.apiUrl + 'api/analytics/getCountForBarChart';
export const API_BASE_DELETE_TYPE_MAPPINGS =
  environment.apiUrl + 'api/typemapping';
export const API_PIE_CHART_GET1 =
  environment.apiUrl + 'api/analytics/getPieChartData';
export const API_BAR_CHART_GET1 =
  environment.apiUrl + 'api/analytics/getBarChartData';
export const API_BAR_CHART_COLUMNS_GET =
  environment.apiUrl + 'api/analytics/getCommonColumns';
export const API_TABLE_DATA_GET =
  environment.apiUrl + 'api/analytics/getTableData';
export const API_PIE_CHART_GET_UPS_LOADER =
  environment.apiUrl + 'api/getPieChartData';
export const API_BAR_CHART_PEDNING_GET_UPS_LOADER =
  environment.apiUrl + 'api/getPendingData';
export const API_BAR_CHART_SUCCESS_GET_UPS_LOADER =
  environment.apiUrl + 'api/getSuccessData';
export const API_BAR_CHART_FAILURE_GET_UPS_LOADER =
  environment.apiUrl + 'api/getFailureData';
export const API_BASE_ADD_TYPE_MAPPING = environment.apiUrl + 'api/typemapping';
export const API_GET_UPS_TABLE = environment.apiUrl + 'api/getTableData';
export const API_GET_UPS_TABLE_DATA = environment.apiUrl + 'api/getTableDataUPS';
export const API_GET_FLATSTRUCTURE_TABLE = environment.apiUrl + 'api/importReport/getTableDataForTreeStructure';
export const API_BASE_DELETE_FIELD_MAPPINGS =
  environment.apiUrl + 'api/fieldmappings';

export const API_BASE_SPECIALCHAR_DELETE = environment.apiUrl + 'api/specialcharactermappings';
export const API_BASE_SPECIALCHAR = environment.apiUrl + 'api/specialcharactermappings';
export const API_BASE_SPECIALCHAR_PUT = environment.apiUrl + 'api/specialcharactermapping';
export const API_BASE_BusinessRule = environment.apiUrl + 'api/rules';
export const API_BASE_BUSINESSRULE_GET = environment.apiUrl + 'api/rule';
export const API_BASE_BUSINESSRULE_START = environment.apiUrl + 'api/rule/start';
export const API_BASE_BUSINESSRULE_STOP = environment.apiUrl + 'api/rule/stop';

export const API_POST_DATA_LOAD= environment.apiUrl + 'api/sdl/postDataAfterLoad';

//Selective Data Loading 
export const API_LOAD_MASTER_VALIDATE_UPS= environment.apiUrl + 'api/sdl/loader/master/validate/ups';
export const API_LOAD_MASTER_VALIDATE_VERIFICATION= environment.apiUrl + 'api/sdl/loader/master/validate/verification';
export const API_LOAD_MASTER_VALIDATE_FILE= environment.apiUrl + 'api/sdl/loader/master/validate/file';
export const API_LOAD_MASTER_VALIDATE_HISTORY= environment.apiUrl + 'api/sdl/loader/master/validate/history';
export const API_LOAD_MASTER_VALIDATE_DATA= environment.apiUrl + 'api/sdl/loader/master/validate/data';

export const API_LOAD_MASTER_START_UPS= environment.apiUrl + 'api/sdl/loader/master/start/ups';
export const API_LOAD_MASTER_START_VERIFICATION= environment.apiUrl + 'api/sdl/loader/master/start/verification';
export const API_LOAD_MASTER_START_FILE= environment.apiUrl + 'api/sdl/loader/master/start/file';
export const API_LOAD_MASTER_START_HISTORY= environment.apiUrl + 'api/sdl/loader/master/start/history';
export const API_LOAD_MASTER_START_DATA= environment.apiUrl + 'api/sdl/loader/master/start/data';
export const API_LOAD_MASTER_START_ONSUBMIT= environment.apiUrl + 'api/sdl/loader/master/start/onSubmit';

export const API_LOAD_MASTER_STOP_LOADING= environment.apiUrl + 'api/sdl/loader/master/stop/loading';
export const API_LOAD_MASTER_STOP= environment.apiUrl + 'api/sdl/loader/master/stop/';
export const API_LOAD_SLAVE_STOP= environment.apiUrl + 'api/sdl/loader/slave/stop/';

export const API_LOADER_PROCESS_UPS= environment.apiUrl + 'api/sdl/loader/processdata/ups';
export const API_LOADER_PROCESS_VERIFICATION= environment.apiUrl + 'api/sdl/loader/masprocessdatater/verification';
export const API_LOADER_PROCESS_FILE= environment.apiUrl + 'api/sdl/loader/processdata/file';
export const API_LOADER_PROCESS_HISTORY= environment.apiUrl + 'api/sdl/loader/processdata/history';
export const API_LOADER_PROCESS_DATA= environment.apiUrl + 'api/sdl/loader/processdata/data';

export const API_BULK_DATA_GET_TYPE= environment.apiUrl + 'api/getDataForSelectType';
export const API_BULK_DATA_TYPE_RECORD= environment.apiUrl + 'api/setRecordsInTable';
export const API_NODE_DATA_INFO= environment.apiUrl + 'api/dataLoad';
export const API_BULK_DATA_TYPE_JOBBASED_LOADING = environment.apiUrl + 'api/createJobBasedOnData';

export const API_BULK_DATA_GET_TYPE_OWNERSHIP= environment.apiUrl + 'api/getDataForSelectTypeForOwnership';
export const API_BULK_DATA_TYPE_RECORD_OWNERSHIP= environment.apiUrl + 'api/setRecordsInTableForOwnership';
export const API_BULK_DATA_TYPE_JOBBASED_OWNERSHIP= environment.apiUrl + 'api/createJobBasedOnDataForOwnership';

export const API_BULK_DATA_GET_TYPE_CGR= environment.apiUrl + 'api/getDataForSelectTypeForCGR';
export const API_BULK_DATA_TYPE_RECORD_CGR= environment.apiUrl + 'api/setRecordsInTableForCGR';
export const API_BULK_DATA_TYPE_JOBBASED_CGR= environment.apiUrl + 'api/createJobBasedOnDataForCGR';

export const API_NODE_INFO= environment.apiUrl + 'api/nodes';
export const API_NODE_STOP= environment.apiUrl + 'api//node/stop/';
export const API_BASE_CREATE_DASHBOARD_TABLE = environment.apiUrl + 'createDashTables?';
export const API_BASE_EXTRACT_FROM_SERVER = environment.apiUrl + 'api/import/executeExtrOperation';
export const API_BASE_CHECK_EXTR_ALLOW = environment.apiUrl + 'api/import/checkExtrAllo';
export const API_BASE_TYPE_SELECTIVE_EXTRACTION_DATA = environment.apiUrl + 'api/import/fetchTypeName';
export const API_BASE_LOAD_SELECTIVE_EXTRACTION_DATA = environment.apiUrl + 'api/import/extractSelectedData';
export const API_BASE_CHECK_DASH_TABLE = environment.apiUrl + 'api/import/checkDashboardTables';
export const API_BASE_VIEW_EXTR_TABLE_DATA = environment.apiUrl + 'api/import/extrTableData';
export const API_BASE_DB_TYPE_DATA = environment.apiUrl + 'api/import/fetchAllTables';
export const API_BASE_ADD_ASSEMBLY_DATA = environment.apiUrl + 'api/import/items';
export const API_BASE_CHECK_EXTR_TABLE =environment.apiUrl + 'api/import/checkExtractionTable';
export const API_BASE_GET_TYPE_ENOVIA_XML = environment.apiUrl + 'api/import/fetchTypeNameNoCase';
export const API_BASE_FETCH_ALL_ALIAS = environment.apiUrl + 'api/import/fetchAllExtrConfig';
export const API_BASE_FETCH_ALIAS_TYPE = environment.apiUrl + 'api/import/typesForAlias';
export const API_BASE_PUT_ALIAS_TYPE = environment.apiUrl +'api/import/editExtrConfig';
export const API_BASE_DELETE_ALIAS_TYPE = environment.apiUrl +'api/import/deleteExtrConfig';
export const API_IMPORT_EXEL_ALIAS = environment.apiUrl + 'api/import/importExcel/extrConfigs';
export const API_BASE_POST_ALIAS = environment.apiUrl + 'api/import/addExtrConfig';
export const API_BASE_EDIT_ALIAS = environment.apiUrl + 'api/import/fetchDetailsById';
export const API_BASE_GET_POLICY = environment.apiUrl +'api/import/getTypesPolicy';
export const API_BASE_GET_REL = environment.apiUrl +'api/import/getTypesRel';
export const API_BASE_ALL_REL = environment.apiUrl +'api/import/getAllRel';
export const API_BASE_EXTR_DATA_COUNT = environment.apiUrl + 'api/import/checkExtrTableData';
 