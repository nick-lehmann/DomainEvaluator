export interface Domain {
  domain: string;
  preSLD: string;
  postSLD: string;

  length: number;
  hyphen: number;
  words: number;
  age: number;
  year: number;
  
  visitors: number; // intervall-transformed
  deGooglePreSLD: number;
  enGooglePreSLD: number;
  preMDLS: number;
  postMDLS: number;
  preCPC: number;
  postCPC: number;
  preCOMP: number;
  HDAX: number;
  googleAge: number;
  wordsHypen: number;
  price: number;
}
