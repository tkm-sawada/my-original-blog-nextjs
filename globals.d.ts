declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    /** microCMS APIKey */
    readonly API_KEY: string;
  }
}