/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type openPage = typeof import('./fragments/OpenPage.js');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I, openPage: openPage }
  interface CallbackOrder { [0]: CodeceptJS.I; [1]: openPage }
  interface Methods extends CodeceptJS.Puppeteer {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
