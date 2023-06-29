declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        URI: string
        USERNAME: string
        PASSWORD: string
        AURA_INSTANCEID: string
        AURA_INSTANCENAME: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}