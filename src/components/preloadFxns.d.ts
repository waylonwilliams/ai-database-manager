export interface IMySQLAPI {
    connectAPI: () => Promise<void>,
    queryAPI: {makeQuery: () => Promise<void>},
    dbTableAPI: () => Promise<void>,
    tableAPI: () => Promise<void>,
    columnAPI: () => Promise<void>,
  }

export interface IPostgreAPI {
    queryAPI: () => Number,
}

export interface IGPTAPI {
    gptAPI: {makeRequest: (database_info: string, request: string, openAIKey: any) => Number | Object}, // i feel like this needs to be marked as async somehow
}

export interface IEditorAPI {
    hlight: {makeHighlight: (code: any) => any}
}
  
declare global {
  interface Window {
    mysql: IElectronAPI,
    postgre: IPostgreAPI,
    gpt: IGPTAPI,
    editor: IEditorAPI,
  }
}